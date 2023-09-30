import { IDataPoint } from "./interfaces";
export declare function createDataPoints(dataview: any, host: any, timeFieldIndex: number, deviceFieldIndex: number, eventFieldIndex: number, tooltipFieldIndexes: number[], colorFieldIndex: number, useColorJson: boolean, colorJson: string): {
    dataPoints: IDataPoint[];
    minMaxTime: {
        min: string;
        max: string;
    };
};
