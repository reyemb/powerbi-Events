import { IDataPoint } from "./interfaces";
import powerbi from "powerbi-visuals-api";
import ISelectionId = powerbi.visuals.ISelectionId;
import { interactivitySelectionService } from "powerbi-visuals-utils-interactivityutils";

function createEventDictionary(data: any[], eventFieldIndex: number){
    const eventsDict: Record<string, number> = {};
    let eventCounter = 0;

    for (let row of data) {
        const event = row[eventFieldIndex];
        if (!eventsDict.hasOwnProperty(event)) {
            eventsDict[event] = eventCounter++;
        }
    }
    return eventsDict;    
}

/*function generateSelectionId(data: any, host: any,  timeFieldIndex: number, deviceFieldIndex: number, eventFieldIndex: number, deviceIdIndex: number, timeIndex: number, eventIndex: number): ISelectionId {
    console.log(data, host, timeFieldIndex, deviceFieldIndex, eventFieldIndex, deviceIdIndex, timeIndex, eventIndex)
    console.log(data.table.identityFields[deviceFieldIndex])
    return host.SelectionIdBuilder.builder()
        .withCategory(data.table.identityFields[deviceFieldIndex], deviceIdIndex)
        .withCategory(data.table.identityFields[timeFieldIndex], timeIndex)
        .withCategory(data.table.identityFields[eventFieldIndex], eventIndex)
        .createSelectionId();
    
   return host.createSelectionIdBuilder().withTable(data.table, rowIndex)
        .createSelectionId();
}*/
function generateSelectionId(data: any, host:any, rowIndex: number): ISelectionId {
    return host.createSelectionIdBuilder().withTable(data.table, rowIndex)
    .createSelectionId();
}

function generateColorDict(eventCount: number): { [event: string]: string } {
    const colors: { [event: string]: string } = {};

    for (let i = 0; i < eventCount; i++) {
        // Distribute the colors evenly throughout the hue range (0-360)
        const hue = (i * 360) / eventCount;
        colors[i] = hslToHex(hue, 100, 50);
    }

    return colors;
}

export function createDataPoints(dataview: any, host: any, timeFieldIndex: number, deviceFieldIndex: number, eventFieldIndex: number, tooltipFieldIndexes: number[], colorFieldIndex: number, useColorJson: boolean, colorJson: string): { dataPoints: IDataPoint[], minMaxTime: { min: string, max: string } } {
    const rows = dataview.table.rows;
    try {
        var colorDict = JSON.parse(colorJson);
        var isParseable = true;
    } catch (error) {
        var isParseable = false;
    }
    const dataPoints: IDataPoint[] = [];
    const dateTimes: string[] = [];
    const eventsDict = createEventDictionary(rows, eventFieldIndex);
    const colordict = generateColorDict(Object.keys(eventsDict).length)
    for (let row of rows) {
        const time = row[timeFieldIndex];
        const event = row[eventFieldIndex];
        const device = row[deviceFieldIndex];
        const color = useColorJson && isParseable ? colorDict[event] : (colorFieldIndex !== -1 ? row[colorFieldIndex] : colordict[eventsDict[event]]); 
        const selectableDatapoints: interactivitySelectionService.SelectableDataPoint = {identity: generateSelectionId(dataview, host, rows.indexOf(row)), selected: false};      
        const dataPoint: IDataPoint = {
            deviceId: device,
            deviceIdDisplayname: dataview.table.columns[deviceFieldIndex].displayName,
            time: new Date(time),
            timeDisplayname: dataview.table.columns[timeFieldIndex].displayName,
            event: event,
            eventDisplayname: dataview.table.columns[eventFieldIndex].displayName,
            tooltips: tooltipFieldIndexes.map(index => row[index]),
            tooltipDisplaynames: tooltipFieldIndexes.map(index => dataview.table.columns[index].displayName),
            color: color,
            // selectionId: generateSelectionId(dataview, host, timeFieldIndex, deviceFieldIndex, eventFieldIndex, devicesDict[device], timesDict[time], eventsDict[event])
            selectableDatapoint: selectableDatapoints
        };
        dataPoints.push(dataPoint);        

        dateTimes.push(dataPoint.time.toISOString());
    }
    
    const minMaxTime = getMinMaxTime(dateTimes);

    return { 
        dataPoints: dataPoints, 
        minMaxTime: minMaxTime 
    };
}

function getMinMaxTime(dates) {
    let sortedTimes = dates.map(dateStr => {
        let date = new Date(dateStr);
        return date.getUTCHours() * 60 + 120 + date.getUTCMinutes();
    }).sort((a, b) => a - b);

    function toHHMM(minutes) {
        let hh = Math.floor(minutes / 60);
        let mm = minutes % 60;
        return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
    }

    return {
        min: toHHMM(sortedTimes[0]),
        max: toHHMM(sortedTimes[sortedTimes.length - 1])
    };
}
function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}