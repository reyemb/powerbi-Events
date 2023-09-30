import powerbi from "powerbi-visuals-api";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import { VisualFormattingSettingsModel } from "./settings";
import { IDataPoint } from './interfaces';
export declare class DrawEvents {
    private target;
    private root;
    private svg;
    private formattingSettings;
    private width;
    private height;
    private viewport;
    private margin;
    private xScale;
    private yScale;
    private eventBoxesSelection;
    constructor(target: HTMLElement);
    init(formattingSettings: VisualFormattingSettingsModel, viewPort: VisualUpdateOptions["viewport"]): void;
    drawXAxis(startTimeString: string, endTimeString: string): void;
    /**
     * Draws the Y-Axis for the chart.
     * @param {IDataPoint[]} data - The data points to use for drawing the Y-Axis.
     */
    drawYAxis(data: IDataPoint[], swapLabels: boolean): void;
    /**
     * Draws the Y-Axis labels for the chart.
     * @param {IDataPoint[]} data - The data points to use for drawing the Y-Axis.
     * @param {boolean} swapLabels - Whether to swap the positions of device and date labels.
     */
    drawGroupLabels(data: IDataPoint[], swapLabels: boolean): void;
    /**
     * Draws boxes based on data points and a switching condition.
     * @param {IDataPoint[]} data - The data points to consider.
     * @param {any} switchDatesDevices - A condition to switch between dates and devices.
     * @returns {d3.Selection} - The selection of event boxes.
     */
    drawBoxes(data: IDataPoint[], switchDatesDevices: any): void;
    drawRect(startTime: Date, endTime: Date, deviceId: string, event: string, color: string, dataPoints: IDataPoint[], switchDatesDevices: boolean): void;
    sanitizeDate(input: Date): Date;
}
