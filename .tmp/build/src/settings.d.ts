import { formattingSettings } from "powerbi-visuals-utils-formattingmodel-community";
import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsModel = formattingSettings.Model;
import CompositeCard = formattingSettings.CompositeCard;
import SimpleCard = formattingSettings.SimpleCard;
export declare class ColorSettings extends SimpleCard {
    useColorJson: formattingSettings.ToggleSwitch;
    colorJson: formattingSettings.TextInput;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class MarginSettings extends SimpleCard {
    leftMargin: formattingSettings.NumUpDown;
    rightMargin: formattingSettings.NumUpDown;
    topMargin: formattingSettings.NumUpDown;
    bottomMargin: formattingSettings.NumUpDown;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class TimeTickerCustomRangesSettings extends formattingSettings.Group {
    timepickerUse: formattingSettings.ToggleSwitch;
    timepickerStart: formattingSettings.TextInput;
    timepickerEnd: formattingSettings.TextInput;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class TimeTickerRangesSettings extends formattingSettings.Group {
    timeTickerRangesUse: formattingSettings.ToggleSwitch;
    timetTickerRangesPufferLeft: formattingSettings.NumUpDown;
    timeTickerRangesPufferRight: formattingSettings.NumUpDown;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class TimeTickerFormattingSettings extends formattingSettings.Group {
    timeTickerFontSize: formattingSettings.NumUpDown;
    timeTickerFormat: formattingSettings.TextInput;
    tickerSpeed: formattingSettings.NumUpDown;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class TimeTickerSetting extends formattingSettings.CompositeCard {
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    timeTickerFormattingSettings: TimeTickerFormattingSettings;
    timeTickerRangesSettings: TimeTickerRangesSettings;
    timeTickerCustomRangesSettings: TimeTickerCustomRangesSettings;
    groups: formattingSettings.Group[];
}
export declare class EventGroupingSettings extends formattingSettings.Group {
    groupSameEvents: formattingSettings.ToggleSwitch;
    groupSameEventsUseThreshold: formattingSettings.ToggleSwitch;
    groupSameEventsThreshold: formattingSettings.NumUpDown;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class EventCustomEventHightSettings extends formattingSettings.Group {
    useCustomEventHightSettings: formattingSettings.ToggleSwitch;
    eventHight: formattingSettings.NumUpDown;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class EventSortingSettings extends formattingSettings.Group {
    eventSorting: formattingSettings.ToggleSwitch;
    topLevelSlice?: formattingSettings.SimpleSlice<any>;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class EventSettings extends CompositeCard {
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    eventSortingSettings: EventSortingSettings;
    eventGroupingSettings: EventGroupingSettings;
    eventCustomEventHightSettings: EventCustomEventHightSettings;
    groups: formattingSettings.Group[];
}
export declare class YAxisSettings extends SimpleCard {
    yAxisFontInnerSize: formattingSettings.NumUpDown;
    yAxisFontOuterSize: formattingSettings.NumUpDown;
    yAxisFontOuterShow: formattingSettings.ToggleSwitch;
    SwitchDatesDevices: formattingSettings.ToggleSwitch;
    name: string;
    displayNameKey: string;
    descriptionKey: string;
    slices: Array<formattingSettings.Slice>;
}
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    displayNameKey: string;
    discriptionKey: string;
    marginSettings: MarginSettings;
    timeTickerSetting: TimeTickerSetting;
    colorSettings: ColorSettings;
    yAxisSettings: YAxisSettings;
    eventSettings: EventSettings;
    cards: FormattingSettingsCard[];
}
