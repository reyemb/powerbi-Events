import { ISelectionHandler } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";
import { baseBehavior } from "powerbi-visuals-utils-interactivityutils";
import { EventBehaviorOption, IEventBoxData } from "./interfaces";
import { SelectableDataPoint } from "powerbi-visuals-utils-interactivityutils/lib/interactivitySelectionService";


export class EventBehavior extends baseBehavior.BaseBehavior<SelectableDataPoint> {
    protected options: EventBehaviorOption<SelectableDataPoint>;
    protected selectionHandler: ISelectionHandler;
    protected bindClick() {
    const { eventBoxesSelection } = this.options;
    eventBoxesSelection.on("click", (event, data) => {
        const mouseEvent: MouseEvent = event as MouseEvent;
        const statusSelected = !data.selected;
        if (mouseEvent) {
        if (!event.ctrlKey) {
            eventBoxesSelection.each(function (d) {
            d.selected = false;
            });
        }
        data.selected = statusSelected;
        const datapoints = data.dataPoints.map((d) => d.selectableDatapoint);
        const isCtrlPressed: boolean = (<MouseEvent>event).ctrlKey;
        this.selectionHandler.handleSelection(datapoints, isCtrlPressed);
        }
        event.stopPropagation();
    });
    }

  protected bindContextMenu() {
    const { elementsSelection } = this.options;
    elementsSelection.on("contextmenu", (event, data: SelectableDataPoint) => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      if (event) {
        this.selectionHandler.handleContextMenu(data, {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY,
        });
        event.preventDefault();
      }
    });
  }

  protected bindClearCatcher() {
    const { clearCatcherSelection } = this.options;
    clearCatcherSelection.on("click", (event) => {
      const mouseEvent: MouseEvent = event as MouseEvent;
      if (mouseEvent) {
        this.selectionHandler.handleClearSelection();
      }
    });
  }

  public bindEvents(options: EventBehaviorOption<SelectableDataPoint>, selectionHandler: ISelectionHandler): void {
    this.options = options;
    this.selectionHandler = selectionHandler;
    this.bindClearCatcher();
    this.bindClick();
    this.bindContextMenu();
  }

  public renderSelection(hasSelection: boolean): void {
    this.options.eventBoxesSelection.style("opacity", (eventboxes: IEventBoxData) => {
      if (!hasSelection) {
        return 1;
      } else if (eventboxes.dataPoints.some((d) => d.selectableDatapoint.selected)) {
        return 1;
      } else {
        return 0.5;
      }
    });
  }
}