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
            .range([5+this.margin.left, this.viewport.width- this.margin.right-15]) 
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
          .attr("transform", `translate(0, ${this.viewport.height - this.margin.bottom - 20 })`)
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
    public drawYAxis(data: IDataPoint[], swapLabels: boolean) {
        const deviceDateMap = new Map<string, any>();

        if (!swapLabels) {
            groupDataAndUpdateMap(data, d => d.deviceId, d => d.time.toLocaleDateString(), deviceDateMap);
          } else {
            groupDataAndUpdateMap(data, d => d.time.toLocaleDateString(), d => d.deviceId, deviceDateMap);
        }

        const yDomain: string[] = [];
        deviceDateMap.forEach((value, key) => {
            value.forEach((v, k) => {
                yDomain.push(`${key},${k}`);
            });
        });

        this.yScale = d3.scaleBand()
        .domain(yDomain)
        .range([15 + this.margin.top, this.viewport.height - this.margin.bottom - 5]);

        const yAxis = d3.axisLeft(this.yScale)
        .tickSize(0)
        .tickFormat(d => {
            const parts = d.split(',');
            return parts[1];  
        });


        this.svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${this.margin.left + 5}, -${this.margin.bottom - 5})`)
        .call(yAxis)
        .call(g => {
            g.selectAll(".y-axis .tick text")
            .style("text-anchor", "end")
            .attr("transform", "translate(-10, 0)")
            .style("font-size", `${this.formattingSettings.yAxisSettings.yAxisFontInnerSize.value}px`);
          });
    }

    /**
     * Draws the Y-Axis labels for the chart.
     * @param {IDataPoint[]} data - The data points to use for drawing the Y-Axis.
     * @param {boolean} swapLabels - Whether to swap the positions of device and date labels.
     */
    public drawGroupLabels(data: IDataPoint[], swapLabels: boolean) {
        const deviceDateMap = new Map<string, any>();

        if (!swapLabels) {
            groupDataAndUpdateMap(data, d => d.deviceId, d => d.time.toLocaleDateString(), deviceDateMap);
          } else {
            groupDataAndUpdateMap(data, d => d.time.toLocaleDateString(), d => d.deviceId, deviceDateMap);
            } 
    
        const deviceXPos = 10;
    
        const labelsGroup = this.svg.append("g").attr("class", "labels");
    
        let currentY =  this.margin.top;
    
        deviceDateMap.forEach((value, deviceKey) => {
        const numDates = value.size;
        const labelHeight = this.yScale.bandwidth() * numDates;
    
        if (this.formattingSettings.yAxisSettings.yAxisFontOuterShow.value) {
        labelsGroup.append("text")
            .attr("class", "grouping-label")
            .attr("x", deviceXPos)
            .attr("y", currentY + (labelHeight / 2) + 1)
            .attr("dominant-baseline", "middle")
            .text(deviceKey)
            .style("font-size", `${this.formattingSettings.yAxisSettings.yAxisFontOuterSize.value}px`);
        }
        currentY += labelHeight;
        });
    }
  
    /**
     * Draws boxes based on data points and a switching condition.
     * @param {IDataPoint[]} data - The data points to consider.
     * @param {any} switchDatesDevices - A condition to switch between dates and devices.
     * @returns {d3.Selection} - The selection of event boxes.
     */
    public drawBoxes(data: IDataPoint[], switchDatesDevices) {
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
        console.log(data)
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
                        this.drawRect(startTime, dateData[i].time, deviceId, currentEvent, currentColor, dataPoints, switchDatesDevices);
                        startTime = dateData[i].time;
                        currentEvent = dateData[i].event;
                        currentColor = dateData[i].color;
                        dataPoints = [];
                        sameEventCount = 0;
                        dataPoints.push(dateData[i]);
                    } else {
                        dataPoints.push(dateData[i]);
                    }
                }
                this.drawRect(startTime, dateData[dateData.length - 1].time, deviceId, currentEvent, currentColor, dataPoints, switchDatesDevices);
                dataPoints = [];
            });
        });
        this.eventBoxesSelection = this.svg.selectAll(".event-box");
    }


    
    public drawRect(startTime: Date, endTime: Date, deviceId: string, event: string, color: string, dataPoints: IDataPoint[], switchDatesDevices: boolean) {
        let y: number;
        if (switchDatesDevices) {
            y = this.yScale(`${startTime.toLocaleDateString()},${deviceId}`);
        } else
        {
            y = this.yScale(`${deviceId},${startTime.toLocaleDateString()}`);
        }
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
            height = this.yScale.bandwidth()-20;
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
 * Groups and updates the data map.
 * 
 * @param {Array} data - The data to group.
 * @param {Function} keyFunc1 - The primary key function.
 * @param {Function} keyFunc2 - The secondary key function.
 * @param {Map} mapToUpdate - The map to update.
 */
function groupDataAndUpdateMap(data, keyFunc1, keyFunc2, mapToUpdate) {
    // Sort data based on the first and second grouping keys
    data.sort((a, b) => {
      const keyA = keyFunc1(a);
      const keyB = keyFunc1(b);
      if (keyA === keyB) {
        const timeA = new Date(keyFunc2(a)).getTime();
        const timeB = new Date(keyFunc2(b)).getTime();
        return timeA - timeB;
      }
      return keyA > keyB ? 1 : -1;
    });
  
    const primaryGroup = d3.group(data, keyFunc1);
    primaryGroup.forEach((value, key) => {
      const secondaryGroup = d3.group(value, keyFunc2);
      mapToUpdate.set(key, secondaryGroup);
    });
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