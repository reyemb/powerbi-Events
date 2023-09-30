import { Stats } from './interfaces';
export declare function calculateStats(data: number[]): any;
export declare function drawStatLines(stats: Stats, settings: any, drawHistogram: any): void;
export declare function addLegend(stats: {
    [key: string]: number;
}, statsSettings: any, width: number, formatter: any, svg: any): void;
