import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import powerbi from "powerbi-visuals-api";
export declare function addTooltip(bars: any, host: IVisualHost, localizationManager: powerbi.extensibility.ILocalizationManager, formatterFloat: (n: number) => string, formatterInt: (n: number) => string): void;
