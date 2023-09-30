import { interactivitySelectionService } from "powerbi-visuals-utils-interactivityutils";
import { BaseDataPoint, IBehaviorOptions } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";
import { Selection, BaseType } from 'd3-selection';
export interface IMargin {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface IDataPoint {
    deviceId: string;
    deviceIdDisplayname: string;
    time: Date;
    timeDisplayname: string;
    event: string;
    eventDisplayname: string;
    tooltips: string[];
    tooltipDisplaynames: string[];
    color: string;
    selectableDatapoint: interactivitySelectionService.SelectableDataPoint;
}
export interface IEventBoxData {
    startTime: Date;
    endTime: Date;
    deviceId: string;
    event: string;
    color: string;
    dataPoints: IDataPoint[];
    selected: boolean;
}
export interface EventBehaviorOption<SelectableDataPointType extends BaseDataPoint> extends IBehaviorOptions<SelectableDataPointType> {
    elementsSelection: Selection<any, SelectableDataPointType, any, any>;
    eventBoxesSelection: Selection<BaseType, IEventBoxData, BaseType, IEventBoxData>;
    clearCatcherSelection: d3.Selection<any, any, any, any>;
}
