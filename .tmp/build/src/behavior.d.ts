import { ISelectionHandler } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";
import { baseBehavior } from "powerbi-visuals-utils-interactivityutils";
import { EventBehaviorOption } from "./interfaces";
import { SelectableDataPoint } from "powerbi-visuals-utils-interactivityutils/lib/interactivitySelectionService";
export declare class EventBehavior extends baseBehavior.BaseBehavior<SelectableDataPoint> {
    protected options: EventBehaviorOption<SelectableDataPoint>;
    protected selectionHandler: ISelectionHandler;
    protected bindClick(): void;
    protected bindContextMenu(): void;
    protected bindClearCatcher(): void;
    bindEvents(options: EventBehaviorOption<SelectableDataPoint>, selectionHandler: ISelectionHandler): void;
    renderSelection(hasSelection: boolean): void;
}
