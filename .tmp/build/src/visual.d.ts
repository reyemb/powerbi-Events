import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
export declare class Visual implements IVisual {
    target: HTMLElement;
    private formattingSettings;
    private formattingSettingsService;
    private DrawEvents;
    private behavior;
    private host;
    private formatterFloat;
    private formatterInt;
    private interactivityService;
    private localizationManager;
    constructor(options: VisualConstructorOptions);
    update(options: powerbi.extensibility.visual.VisualUpdateOptions): void;
    private applySelectionAfterResizing;
    private reset;
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
