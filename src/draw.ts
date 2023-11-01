import * as d3 from 'd3';
import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import {VisualFormattingSettingsModel} from "./settings";
import { IMargin, IDataPoint, IEventBoxData } from './interfaces';


export class DrawEvents {
    private target: d3.Selection<HTMLElement, any, any, any>;
    private root: d3.Selection<HTMLElement, any, any, any>;
    private svg: d3.Selection<SVGSVGElement, any, any, any>;
    private formattingSettings: VisualFormattingSettingsModel;
    private width: number;
    private height: number;
    private viewport: VisualUpdateOptions["viewport"];
    private margin: IMargin;
    private xScale: d3.ScaleTime<number, number>;
    private yScale: d3.ScaleBand<string>;
    private eventBoxesSelection: d3.Selection<any, IEventBoxData, any, IEventBoxData>;

    constructor(target: HTMLElement) {
        this.target = d3.select(target);
    }

    public init(formattingSettings: VisualFormattingSettingsModel, viewPort: VisualUpdateOptions["viewport"]) {
        this.formattingSettings = formattingSettings;
        this.viewport = viewPort;
        this.margin = {
            top: this.formattingSettings.marginSettings.topMargin.value,
            right: this.formattingSettings.marginSettings.rightMargin.value,
            bottom: this.formattingSettings.marginSettings.bottomMargin.value,
            left: this.formattingSettings.marginSettings.leftMargin.value
        };
        this.width = this.viewport.width - this.margin.left - this.margin.right;
        this.height = this.viewport.height - this.margin.top -this.margin.bottom;

        this.root = this.target
            .append('div')
            .attr('id', 'events_visual')
            .style('width', `${this.viewport.width}px`)
            .style('height', `${this.viewport.height}px`);
        this.svg = this.root
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
    }

    public drawXAxis(startTimeString: string, endTimeString: string) {
        // Assume startTimeString and endTimeString are in the format "HH:mm"
        const parseTime = d3.timeParse("%H:%M");    

        if (this.formattingSettings.timeTickerSetting.timeTickerCustomRangesSettings.timepickerUse.value) {
            startTimeString = this.formattingSettings.timeTickerSetting.timeTickerCustomRangesSettings.timepickerStart.value;
            endTimeString = this.formattingSettings.timeTickerSetting.timeTickerCustomRangesSettings.timepickerEnd.value;
        }
        const startTime = this.sanitizeDate(parseTime(startTimeString));
        let endTime = this.sanitizeDate(parseTime(endTimeString));
        
        if (startTime.getTime() === endTime.getTime()) {
            endTime.setHours(endTime.getHours() + 24);
        }
        if (this.formattingSettings.timeTickerSetting.timeTickerCustomRangesSettings.timepickerUse.value || !(this.formattingSettings.timeTickerSetting.timeTickerRangesSettings.timeTickerRangesUse.value)) {
        this.xScale = d3.scaleTime()
          .domain([startTime, endTime])
          .range([5+this.margin.left, this.viewport.width- this.margin.right-15]) 
        }
        else {
            this.xScale = d3.scaleTime()
            .domain([
                startTime.setMinutes(startTime.getMinutes() - this.formattingSettings.timeTickerSetting.timeTickerRangesSettings.timetTickerRangesPufferLeft.value), 
                endTime.setMinutes(startTime.getMinutes() + this.formattingSettings.timeTickerSetting.timeTickerRangesSettings.timetTickerRangesPufferLeft.value),
            ])
            .range([5 + this.margin.left, this.viewport.width- this.margin.right - 15]) 
        }
    
        const intervalValue = this.formattingSettings.timeTickerSetting.timeTickerFormattingSettings.tickerSpeed.value;

        let intervalFunction;
        if (intervalValue < 60) {
            intervalFunction = d3.timeMinute.every(intervalValue);
        } else {
            intervalFunction = d3.timeHour.every(intervalValue / 60);
        }

        const xAxis = d3.axisBottom(this.xScale)
          .ticks(intervalFunction) 
          .tickFormat(d3.timeFormat("%H:%M")); 
    
        
        this.svg
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(${this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value ? 55 : 0}, ${this.viewport.height - this.margin.bottom - 20 })`)
          .call(xAxis)
          .call(g => {
            g.selectAll(".x-axis .tick text")
              .style("font-size", `${this.formattingSettings.timeTickerSetting.timeTickerFormattingSettings.timeTickerFontSize.value}px`);
          });
    }
/**
 * Draws the Y-Axis for the chart.
 * @param {IDataPoint[]} data - The data points to use for drawing the Y-Axis.
 */
public drawYAxis(data: IDataPoint[]) {
    let hierarchy: any;
    // Define hierarchy based on formatting settings
    if (this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value) {
      hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisHierarchy.value.value;
    } else {
      hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisHierarchy.value.value;
    }  
    const yDomain = getUniqueCombinations(data, hierarchy);

    // Existing D3.js code for drawing Y-Axis
    this.yScale = d3.scaleBand()
      .domain(yDomain)
      .range([15 + this.margin.top, this.viewport.height - this.margin.bottom - 5]);
  
    const yAxis = d3.axisLeft(this.yScale)
      .tickSize(0)
      .tickFormat(d => {
        const parts = d.split(',');
        if ((this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value && this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel3Toggle.value) ||
        (!this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value && this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisInnerShow.value)) {
          return parts[parts.length - 1];
        }
        {
          return ''
        }
      });
  
    this.svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${this.margin.left + 5 + (this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value ? 55 : 0)}, -${this.margin.bottom - 5})`)
      .call(yAxis)
      .call(g => {
        g.selectAll(".y-axis .tick text")
          .style("text-anchor", "end")
          .attr("transform", "translate(-10, 0)")
          .style("font-size", `${this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value ? this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel3FontSize.value : this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisFontInnerSize.value}px`);
      });
  }
  

    /**
     * Draws the Y-Axis labels for the chart.
     * @param {IDataPoint[]} data - The data points to use for drawing the Y-Axis.
     * @param {boolean} swapLabels - Whether to swap the positions of device and date labels.
     */
    public drawGroupLabels(data: IDataPoint[]) {
        let hierarchy: any;
        // Define hierarchy based on formatting settings
        if (this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value) {
          hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisHierarchy.value.value;
        } else {
          hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisHierarchy.value.value;
        }  
        const yDomain = getUniqueCombinations(data, hierarchy);
        const deviceXPos = 10;    
        const labelsGroup = this.svg.append("g").attr("class", "labels");    
        let currentY =  this.formattingSettings.marginSettings.topMargin.value +5 ;
        const countmap = countValueOccurrence(yDomain.map(d => d.split(',')));
        const bandwidth = this.yScale.bandwidth();
        const countNestedKeys = countLowestLevelKeys(countmap);
        
        for (const outer in countmap) {
          const innerMap = countmap[outer];
          let numOfChildElements = 0;
        
          // Calculate total number of child elements for this outer element
          if (typeof innerMap === 'object') {
            numOfChildElements = countNestedKeys[outer];
          } else {
            numOfChildElements = innerMap;
          }
          // Calculate the mid-point for the device label
          const midY = currentY + (numOfChildElements * bandwidth) / 2;
        
          if ((this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value && this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel1Toggle.value) ||
           (!this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value && this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisOuterShow.value)) {
          // Create deviceLabel at the mid-point
          const deviceLabel = labelsGroup.append("text")
            .attr("class", "device-label")
            .attr("x", deviceXPos)
            .attr("y", midY)
            .attr("text-anchor", "start")
            .text(outer)
            .style("font-size", `${this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel1FontSize.value}px`);
           }
          // If we have inner elements, loop through them
          if (this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value && typeof innerMap === 'object' && this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel2Toggle.value) {
            for (const inner in innerMap) {
              // This assumes that you also want to place the inner (date) label at the midpoint of its own children
              const numOfInnerChildElements = Object.keys(innerMap[inner]).length;
              const innerMidY = currentY + (numOfInnerChildElements * bandwidth) / 2;
        
              const dateLabel = labelsGroup.append("text")
                .attr("class", "date-label")
                .attr("x", deviceXPos + this.formattingSettings.marginSettings.leftMargin.value / 3)
                .attr("y", innerMidY)
                .attr("text-anchor", "start")
                .text(inner)
                .style("font-size", `${this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisLevel2FontSize.value}px`);
        
              currentY += numOfInnerChildElements * bandwidth;
            }
            
          } else {
            currentY += numOfChildElements * bandwidth;
          }
        }
    }
  
    /**
     * Draws boxes based on data points and a switching condition.
     * @param {IDataPoint[]} data - The data points to consider.
     * @param {any} switchDatesDevices - A condition to switch between dates and devices.
     * @returns {d3.Selection} - The selection of event boxes.
     */
    public drawBoxes(data: IDataPoint[]) {
        let threshold: number;
        let useThreshold: boolean;
        
        if (this.formattingSettings.eventSettings.eventGroupingSettings.groupSameEvents.value) {
            if (this.formattingSettings.eventSettings.eventGroupingSettings.groupSameEventsUseThreshold.value) {
                threshold = this.formattingSettings.eventSettings.eventGroupingSettings.groupSameEventsThreshold.value;
                useThreshold = true;
            } else {
                threshold = 1;
                useThreshold = false;
            }
        } else {
            threshold = 1;
            useThreshold = true;
        }
        if (this.formattingSettings.eventSettings.eventSortingSettings.eventSorting.value) {
            data.sort((a, b) => {
              if (a.deviceId < b.deviceId) {
                return -1;
              }
              if (a.deviceId > b.deviceId) {
                return 1;
              }
              return a.time.getTime() - b.time.getTime();
            });
        } else {
            data.sort((a, b) => a.time.getTime() - b.time.getTime());
        }
        
        const groupedByDevice = d3.group(data, d => d.deviceId);
    
        groupedByDevice.forEach((deviceData, deviceId) => {
            const groupedByDate = d3.group(deviceData, d => d.time.toDateString());
    
            groupedByDate.forEach((dateData, date) => {
                let dataPoints: IDataPoint[] = [];
                let startTime = dateData[0].time;
                let currentEvent = dateData[0].event;
                let currentColor = dateData[0].color;
                let sameEventCount = 0;
                dataPoints.push(dateData[0]);
    
                for (let i = 1; i < dateData.length; i++) {
                    sameEventCount++;
                    if (dateData[i].event !== currentEvent || (useThreshold && sameEventCount >= threshold)) {
                      if (this.formattingSettings.eventSettings.eventTimeStampSettings.eventTimeStamp.value) {
                        this.drawRect(startTime, dateData[i-1].time, deviceId, currentEvent, currentColor, dataPoints);
                        startTime = dateData[i-1].time;
                      }else {
                        this.drawRect(startTime, dateData[i].time, deviceId, currentEvent, currentColor, dataPoints);
                        startTime = dateData[i].time;
                      }                        
                        currentEvent = dateData[i].event;
                        currentColor = dateData[i].color;
                        dataPoints = [];
                        sameEventCount = 0;
                        dataPoints.push(dateData[i]);
                    } else {
                        dataPoints.push(dateData[i]);
                  }
                }
                
                this.drawRect(startTime, dateData[dateData.length - 1].time, deviceId, currentEvent, currentColor, dataPoints);
                dataPoints = [];
            });
        });
        this.eventBoxesSelection = this.svg.selectAll(".event-box");
    }


    
    public drawRect(startTime: Date, endTime: Date, deviceId: string, event: string, color: string, dataPoints: IDataPoint[]) {
        let y: number;
        let hierarchy: any;
        let yLabel: string = "";        
        if (this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisEventOnAxis.value) {
          hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventOnAxis.yAxisEventOnAxisHierarchy.value.value;
        } else {
          hierarchy = this.formattingSettings.YAxisSettings.YAxisSettingsEventNotOnAxis.yAxisEventNotOnAxisHierarchy.value.value;
        }  
          // Generate label based on hierarchy format
        let hierarchyComponents = hierarchy.split('-');
        for (const component of hierarchyComponents) {
            switch (component.toLowerCase()) {
                case "event":
                  yLabel += event;
                    break;
                case "deviceid":
                    yLabel += deviceId;
                    break;
                case "time":
                  yLabel += startTime.toLocaleDateString();
                    break;
                default:
                    break;
            }
            yLabel += ",";
        }

        // Remove the trailing comma
        yLabel = yLabel.slice(0, -1);
        y = this.yScale(yLabel);
        const rectData: IEventBoxData= {
            startTime: startTime,
            endTime: endTime,
            deviceId: deviceId,
            event: event,
            color: color,
            dataPoints: dataPoints,
            selected: false
        }     
        endTime = this.sanitizeDate(endTime);   
        let height: number;
        if (this.formattingSettings.eventSettings.eventCustomEventHightSettings.useCustomEventHightSettings.value) {
            height = this.formattingSettings.eventSettings.eventCustomEventHightSettings.eventHight.value;
        }
        else {
            height = this.yScale.bandwidth() - 20 ;
        }
        this.svg.append("rect")
            .attr("x", this.xScale(this.sanitizeDate(startTime)))
            .attr("y", y-5)
            .attr("width", this.xScale(this.sanitizeDate(endTime)) - this.xScale(this.sanitizeDate(startTime)))
            .attr("height", height)
            .attr("fill", color)
            .attr("stroke", "black")
            .attr("class", "event-box")
            .data([rectData])
        }


    public sanitizeDate(input: Date): Date {
        const baseDate = new Date(1970, 0, 1); // Jan 1, 1970
        return new Date(baseDate.setHours(input.getHours(), input.getMinutes(), input.getSeconds(), input.getMilliseconds()));   }
}
/**
 * Get unique combinations based on provided data and hierarchy.
 *
 * @param {IDataPoint[]} data - The data points to consider.
 * @param {string} hierarchy - The hierarchy specified as a string, like "time-deviceId".
 * @return {string[]} An array of unique combinations sorted lexicographically.
 */
function getUniqueCombinations(data: IDataPoint[], hierarchy: string): string[] {
    const uniqueCombinations = new Set<string>();
    const hierarchyElements = hierarchy.split('-');
  
    data.forEach(item => {
      const elements = hierarchyElements.map(key => {
        // Handle the time key specifically
        if (key === "time") {
          return item.time.toLocaleDateString();
        }
        
        // Handle other keys; make sure the key exists in item
        if (item.hasOwnProperty(key)) {
          return item[key];
        } else {
          console.warn(`Key ${key} not found in data point.`);
          return '';
        }
      });
  
      const combination = elements.join(',');
      uniqueCombinations.add(combination);
    });
  
    return Array.from(uniqueCombinations).sort();
  }

/**
 * Counts occurrences of values in a 2D array and produces a nested object.
 *
 * @param arr - The 2D array containing unique combinations of values.
 * @returns A nested object with one or two levels.
 */
function countValueOccurrence(arr: string[][]): Record<string, Record<string, number> | number> {
  const countMap: Record<string, Record<string, number> | number> = {};

  for (const subArr of arr) {
    if (subArr.length === 2) {
      const [val1, val2] = subArr;
      if (!countMap[val1]) {
        countMap[val1] = {};
      }

      if (!countMap[val1][val2]) {
        countMap[val1][val2] = 0;
      }

      countMap[val1][val2]++;
    } else if (subArr.length === 3) {
      const [val1, val2, val3] = subArr;
      if (!countMap[val1]) {
        countMap[val1] = {};
      }

      if (!countMap[val1][val2]) {
        countMap[val1][val2] = {};
      }

      if (!countMap[val1][val2][val3]) {
        countMap[val1][val2][val3] = 0;
      }

      countMap[val1][val2][val3]++;
    }
  }
  
  return countMap;
}
/**
 * Checks if two Date objects have the same date.
 *
 * @param {Date} date1 - First Date object to compare.
 * @param {Date} date2 - Second Date object to compare.
 * @returns {boolean} True if both dates are the same, otherwise false.
 */
function sameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

/**
 * Count the total number of keys at the lowest level of a nested object.
 * @param {Record<string, any>} obj - The object to count keys for.
 * @returns {Record<string, number>} - Object with counts of lowest-level keys for each top-level key.
 */
function countLowestLevelKeys(obj: Record<string, any>): Record<string, number> {
  const counts: Record<string, number> = {};

  function recursiveCount(subObj: Record<string, any>, level: number): number {
    let count = 0;
    for (const key in subObj) {
      if (typeof subObj[key] === "object" && subObj[key] !== null) {
        count += recursiveCount(subObj[key], level + 1);
      } else {
        count++;
      }
    }
    return count;
  }

  for (const topKey in obj) {
    counts[topKey] = recursiveCount(obj[topKey], 1);
  }

  return counts;
}