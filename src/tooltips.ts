import {createTooltipServiceWrapper, ITooltipServiceWrapper} from "powerbi-visuals-utils-tooltiputils";
import { IEventBoxData } from "./interfaces";
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import powerbi from "powerbi-visuals-api";

export function addTooltip(eventBoxes: any, host: IVisualHost, localizationManager: powerbi.extensibility.ILocalizationManager) {
    const tooltipServiceWrapper: ITooltipServiceWrapper = createTooltipServiceWrapper(host.tooltipService, eventBoxes);
    tooltipServiceWrapper.addTooltip(
        eventBoxes,
        (tooltipEvent: IEventBoxData) => getTooltipData(tooltipEvent, localizationManager),
    );
}

function getTooltipData(eventBoxData: IEventBoxData, localizationManager): powerbi.extensibility.VisualTooltipDataItem[] {
    const firstDataPoint = eventBoxData.dataPoints[0];
    const formattedTooltips = formatTooltips(firstDataPoint);
    return [{
        displayName: localizationManager.getDisplayName('Device ID'),
        value: eventBoxData.deviceId,
    }, {
        displayName: localizationManager.getDisplayName('StartTime'),
        value: eventBoxData.startTime.toLocaleString(),
    }, {
        displayName: localizationManager.getDisplayName('EndTime'),
        value: eventBoxData.endTime.toLocaleString(),
    },
    {
        displayName: localizationManager.getDisplayName('Event'),
        value: eventBoxData.event,
    },
    ...formattedTooltips
    ];
    }
/**
 * Converts tooltips and tooltipDisplaynames into an array of objects with specific layout.
 *
 * @param {Object} data - The input data containing "tooltips" and "tooltipDisplaynames" fields.
 * @returns {Array} An array of objects in the format { displayName, value }
 */
function formatTooltips(data) {
    const { tooltips, tooltipDisplaynames } = data;

    if (!tooltips || !tooltipDisplaynames || tooltips.length !== tooltipDisplaynames.length) {
        return [];
    }

    return tooltips.map((value, index) => ({
        displayName: tooltipDisplaynames[index],
        value,
    }));
    }
  

  