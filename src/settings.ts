/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";
import { Subject } from 'rxjs';
import { formattingSettings} from "powerbi-visuals-utils-formattingmodel-community";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsModel = formattingSettings.Model;
import CompositeCard = formattingSettings.CompositeCard;
import SimpleCard = formattingSettings.SimpleCard;

export class ColorSettings extends SimpleCard {
    public useColorJson = new formattingSettings.ToggleSwitch({
        name: "useColorJson",
        displayNameKey: "UseColorJsonKey",
        descriptionKey: "UseColorJsonDescriptionKey",
        value: false,
    });
    public colorJson = new formattingSettings.TextInput({  
        name: "colorJson",
        displayNameKey: "ColorJsonKey",
        descriptionKey: "ColorJsonDescriptionKey",
        value: "",
        placeholder: "{ \"event1\": \"#ff0000\", \"event2\": \"#00ff00\", \"event3\": \"#0000ff\"}}",
    });

    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.useColorJson;
    name: string = "color";
    displayNameKey: string = "colorKey";
    descriptionKey: string = "colorDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.useColorJson, this.colorJson];
}

export class MarginSettings extends SimpleCard {
    public leftMargin = new formattingSettings.NumUpDown({
        name: "leftMargin",
        displayNameKey: "LeftMarginKey",
        descriptionKey: "LeftMarginDescriptionKey",
        value: 120,
    });
    public rightMargin = new formattingSettings.NumUpDown({
        name: "rightMargin",
        displayNameKey: "RightMarginKey",
        descriptionKey: "RightMarginDescriptionKey",
        value: 10,
    });
    public topMargin = new formattingSettings.NumUpDown({
        name: "topMargin",
        displayNameKey: "TopMarginKey",
        descriptionKey: "TopMarginDescriptionKey",
        value: 10,
    });
    public bottomMargin = new formattingSettings.NumUpDown({
        name: "bottomMargin",
        displayNameKey: "BottomMarginKey",
        descriptionKey: "BottomMarginDescriptionKey",
        value: 20,
    });
    name: string = "margin";
    displayNameKey: string = "marginKey";
    descriptionKey: string = "marginDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.leftMargin, this.rightMargin, this.topMargin, this.bottomMargin];
}

export class TimeTickerCustomRangesSettings extends formattingSettings.Group {
    public timepickerUse = new formattingSettings.ToggleSwitch({
        name: "timepickerUse",
        displayNameKey: "TimepickerUseKey",
        descriptionKey: "TimepickerUseDescriptionKey",
        value: false,
    });
    public timepickerStart = new formattingSettings.TextInput({
        name: "timepickerStart",
        displayNameKey: "TimepickerStartKey",
        descriptionKey: "TimepickerStartDescriptionKey",
        placeholder: "00:00",
        value: "00:00",
    });
    public timepickerEnd = new formattingSettings.TextInput({
        name: "timepickerEnd",
        displayNameKey: "TimepickerEndKey",
        descriptionKey: "TimepickerEndDescriptionKey",
        placeholder: "24:00",
        value: "24:00",
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.timepickerUse;
    name: string = "timepicker";
    displayNameKey: string = "timepickerKey";
    descriptionKey: string = "timepickerDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.timepickerUse, this.timepickerStart, this.timepickerEnd];
}

export class TimeTickerRangesSettings extends formattingSettings.Group {
    public timeTickerRangesUse = new formattingSettings.ToggleSwitch({
        name: "timeTickerRangesUse",
        displayNameKey: "TimeTickerRangesUseKey",
        descriptionKey: "TimeTickerRangesUseDescriptionKey",
        value: true,
    });
    public timetTickerRangesPufferLeft = new formattingSettings.NumUpDown({
        name: "timetTickerRangesPufferLeft",
        displayNameKey: "TimeTickerRangesPufferLeftKey",
        descriptionKey: "TimeTickerRangesPufferLeftDescriptionKey",
        value: 60,
    });
    public timeTickerRangesPufferRight = new formattingSettings.NumUpDown({
        name: "timeTickerRangesPufferRight",
        displayNameKey: "TimeTickerRangesPufferRightKey",
        descriptionKey: "TimeTickerRangesPufferRightDescriptionKey",
        value: 60,
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.timeTickerRangesUse;
    name: string = "timeTickerRangesSettings";
    displayNameKey: string = "timeTickerRangesSettingspickerKey";
    descriptionKey: string = "timeTickerRangesSettingsDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.timetTickerRangesPufferLeft, this.timeTickerRangesPufferRight];
}

export class TimeTickerFormattingSettings extends formattingSettings.Group {
    public timeTickerFontSize = new formattingSettings.NumUpDown({
        name: "timeTickerFontSize",
        displayNameKey: "TimeTickerFontSizeKey",
        descriptionKey: "TimeTickerFontSizeDescriptionKey",
        value: 12,
    });
    public timeTickerFormat = new formattingSettings.TextInput({
        name: "timeTickerFormat",
        displayNameKey: "TimeTickerFormatKey",
        descriptionKey: "TimeTickerFormatDescriptionKey",
        placeholder: "HH:mm",
        value: "HH:mm",
    });

    public tickerSpeed = new formattingSettings.NumUpDown({
        name: "tickerSpeed",
        displayNameKey: "TickerSpeedKey",
        descriptionKey: "TickerSpeedDescriptionKey",
        value: 120,
    });
    name: string = "timeTickerFormattingSettings";
    displayNameKey: string = "timeTickerFormattingSettingsKey";
    descriptionKey: string = "timeTickerFormattingSettingsDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.tickerSpeed, this.timeTickerFontSize, this.timeTickerFormat];

}

export class TimeTickerSetting extends formattingSettings.CompositeCard {
    name: string = "timeTickerSetting";
    displayNameKey: string = "timeTickerSettingKey";
    descriptionKey: string = "TimeTickerSettingDescriptionKey";
    
    public timeTickerFormattingSettings = new TimeTickerFormattingSettings(Object);EventCustomEventHightSettings 
    public timeTickerRangesSettings = new TimeTickerRangesSettings(Object);
    public timeTickerCustomRangesSettings = new TimeTickerCustomRangesSettings(Object);

    groups: formattingSettings.Group[] = [this.timeTickerFormattingSettings, this.timeTickerRangesSettings, this.timeTickerCustomRangesSettings];
}
export class EventTimeStampSettings extends formattingSettings.Group {
    public eventTimeStamp = new formattingSettings.ToggleSwitch({
        name: "EventTimeStamp",
        displayNameKey: "EventTimeStampKey",
        descriptionKey: "EventTimeStampDescriptionKey",
        value: false,
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.eventTimeStamp;
    name: string = "EventTimeStampSettings";
    displayNameKey: string = "EventTimeStampSettingsKey";
    descriptionKey: string = "EventTimeStampSettingsDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.eventTimeStamp];
}

export class EventGroupingSettings extends formattingSettings.Group {
    public groupSameEvents = new formattingSettings.ToggleSwitch({
        name: "groupEvents",
        displayNameKey: "GroupEventsKey",
        descriptionKey: "GroupEventsDescriptionKey",
        value: true,
    });
    public groupSameEventsUseThreshold = new formattingSettings.ToggleSwitch({
        name: "groupSameEventsUseThreshold",
        displayNameKey: "groupSameEventsUseThresholdKey",
        descriptionKey: "groupSameEventsUseThresholdDescriptionKey",
        value: false,
    });
    public groupSameEventsThreshold= new formattingSettings.NumUpDown({
        name: "groupSameEventsThreshold",
        displayNameKey: "groupSameEventsThresholdKey",
        descriptionKey: "groupSameEventsThresholdDescriptionKey",
        value: 5,
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.groupSameEvents;
    name: string = "eventGrouping";
    displayNameKey: string = "eventGroupingKey";
    descriptionKey: string = "eventGroupingDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.groupSameEvents, this.groupSameEventsUseThreshold, this.groupSameEventsThreshold];
}

export class EventCustomEventHightSettings extends formattingSettings.Group {
    public useCustomEventHightSettings = new formattingSettings.ToggleSwitch({
        name: "useCustomEventHightSettings",
        displayNameKey: "UseCustomEventHightSettingsKey",
        descriptionKey: "UseCustomEventHightSettingsDescriptionKey",
        value: false,
    });
    public eventHight = new formattingSettings.NumUpDown({
        name: "eventHight",
        displayNameKey: "EventHightKey",
        descriptionKey: "EventHightDescriptionKey",
        value: 20,
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.useCustomEventHightSettings;
    name: string = "eventCustomEventHight";
    displayNameKey: string = "eventCustomEventHightKey";
    descriptionKey: string = "eventCustomEventHightDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.eventHight];
}

export class EventSortingSettings extends formattingSettings.Group {
    public eventSorting = new formattingSettings.ToggleSwitch({
        name: "DoEventSorting",
        displayNameKey: "DoEventSortingSettingsKey",
        descriptionKey: "DoEventSortingSettingsDescriptionKey",
        value: true,
    });
    topLevelSlice?: formattingSettings.SimpleSlice<any> = this.eventSorting;
    name: string = "DoEventSortingGroup";
    displayNameKey: string = "DoEventSortingGroupSettingsKey";
    descriptionKey: string = "DoEventSortingGroupSettingsDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.eventSorting];
}

export class EventSettings extends CompositeCard {
    name: string = "eventSettings";
    displayNameKey: string = "eventSettingsKey";
    descriptionKey: string = "eventSettingsDescriptionKey";
    
    public eventTimeStampSettings = new EventTimeStampSettings(Object);
    public eventSortingSettings = new EventSortingSettings(Object);
    public eventGroupingSettings = new EventGroupingSettings(Object);
    public eventCustomEventHightSettings = new EventCustomEventHightSettings(Object);

    groups: formattingSettings.Group[] = [this.eventTimeStampSettings, this.eventSortingSettings, this.eventGroupingSettings, this.eventCustomEventHightSettings];
}

export class YAxisSettings extends CompositeCard {
    name: string = "YAxisSettings";
    displayNameKey: string = "YAxisSettingsKey";
    descriptionKey: string = "YAxisSettingsDescriptionKey";
    
    public YAxisSettingsEventNotOnAxis = new YAxisSettingsEventNotOnAxis(Object);
    public YAxisSettingsEventOnAxis = new YAxisSettingsEventOnAxis(Object);

    groups: formattingSettings.Group[] = [this.YAxisSettingsEventNotOnAxis, this.YAxisSettingsEventOnAxis];
}

export class YAxisSettingsEventNotOnAxis extends formattingSettings.Group {
    public yAxisEventNotOnAxisFontInnerSize = new formattingSettings.NumUpDown({
        name: "yAxisEventNotOnAxisFontInnerSize",
        displayNameKey: "yAxisEventNotOnAxisFontInnerSizeKey",
        descriptionKey: "yAxisEventNotOnAxisFontInnerSizeDescriptionKey",
        value: 12,
    });
    public yAxisEventNotOnAxisFontOuterSize = new formattingSettings.NumUpDown({
        name: "yAxisEventNotOnAxisFontOuterSize",
        displayNameKey: "yAxisEventNotOnAxisFontOuterSizeKey",
        descriptionKey: "yAxisEventNotOnAxisFontOuterSizeDescriptionKey",
        value: 14,
    });
    public yAxisEventNotOnAxisInnerLabelWidth = new formattingSettings.NumUpDown({
        name: "yAxisEventNotOnAxisInnerLabelWidth",
        displayNameKey: "yAxisEventNotOnAxisInnerLabelWidthKey",
        descriptionKey: "yAxisEventNotOnAxisInnerLabelWidthDescriptionKey",
        value: 12,
    });
    public yAxisEventNotOnAxisOuterLabelWidth = new formattingSettings.NumUpDown({
        name: "yAxisEventNotOnAxisOuterLabelWidth",
        displayNameKey: "yAxisEventNotOnAxisOuterLabelWidthKey",
        descriptionKey: "yAxisEventNotOnAxisOuterLabelWidthDescriptionKey",
        value: 12,
    });
    public yAxisEventNotOnAxisOuterShow = new formattingSettings.ToggleSwitch({
        name: "yAxisEventNotOnAxisOuterShow",
        displayNameKey: "yAxisEventNotOnAxisOuterShowKey",
        descriptionKey: "yAxisEventNotOnAxisOuterShowDescriptionKey",
        value: true,
    });
    public yAxisEventNotOnAxisInnerShow = new formattingSettings.ToggleSwitch({
        name: "yAxisEventNotOnAxisInnerShow",
        displayNameKey: "yAxisEventNotOnAxisInnerShowKey",
        descriptionKey: "yAxisEventNotOnAxisInnerShowDescriptionKey",
        value: true,
    });
    public yAxisEventNotOnAxisHierarchy = new formattingSettings.ItemDropdown({
        name: "yAxisEventNotOnAxisHierarchy",
        displayNameKey: "yAxisEventNotOnAxisHierarchyKey",
        descriptionKey: "yAxisEventNotOnAxisHierarchyDescriptionKey",
        items: [
            {displayName: 'Datum-Device', value: 'time-deviceId'},
            {displayName: 'Device-Datum', value: 'deviceId-time'}
        ],
        value: {displayName: 'Device-Datum', value: 'deviceId-time'}
    });
    name = "yAxisEventNotOnAxis";
    displayNameKey = "yAxisEventNotOnAxisKey";
    descriptionKey = "yAxisEventNotOnAxisDescriptionKey";
    slices: Array<formattingSettings.Slice> = [
        this.yAxisEventNotOnAxisOuterLabelWidth,
        this.yAxisEventNotOnAxisInnerLabelWidth,
        this.yAxisEventNotOnAxisHierarchy,
        this.yAxisEventNotOnAxisFontOuterSize,
        this.yAxisEventNotOnAxisFontInnerSize,
        this.yAxisEventNotOnAxisInnerShow,
        this.yAxisEventNotOnAxisOuterShow
    ];
  }  
    
/**
 * YAxisSettingsEventOnAxis class
 */
export class YAxisSettingsEventOnAxis extends formattingSettings.Group {
    public yAxisEventOnAxisEventOnAxis = new formattingSettings.ToggleSwitch({
        name: "yAxisEventOnAxisEventOnAxis",
        displayNameKey: "yAxisEventOnAxisEventOnAxisKey",
        descriptionKey: "yAxisEventOnAxisEventOnAxisDescriptionKey",
        value: false,
    });
    public yAxisEventOnAxisLevel1FontSize = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel1FontSize",
        displayNameKey: "yAxisEventOnAxisLevel1FontSizeKey",
        descriptionKey: "yAxisEventOnAxisLevel1FontSizeDescriptionKey",
        value: 16,
    });
    public yAxisEventOnAxisLevel1LabelWidth = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel1LabelWidth",
        displayNameKey: "yAxisEventOnAxisLevel1LabelWidthKey",
        descriptionKey: "yAxisEventOnAxisLevel1LabelWidthDescriptionKey",
        value: 12,
    });
    public yAxisEventOnAxisLevel2FontSize = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel2FontSize",
        displayNameKey: "yAxisEventOnAxisLevel2FontSizeKey",
        descriptionKey: "yAxisEventOnAxisLevel2FontSizeDescriptionKey",
        value: 14,
    });
    public yAxisEventOnAxisLevel2LabelWidth = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel2LabelWidth",
        displayNameKey: "yAxisEventOnAxisLevel2LabelWidthKey",
        descriptionKey: "yAxisEventOnAxisLevel2LabelWidthDescriptionKey",
        value: 14,
    });
    public yAxisEventOnAxisLevel3FontSize = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel3FontSize",
        displayNameKey: "yAxisEventOnAxisLevel3FontSizeKey",
        descriptionKey: "yAxisEventOnAxisLevel3FontSizeDescriptionKey",
        value: 12,
    });
    public yAxisEventOnAxisLevel3LabelWidth = new formattingSettings.NumUpDown({
        name: "yAxisEventOnAxisLevel3LabelWidth",
        displayNameKey: "yAxisEventOnAxisLevel3LabelWidthKey",
        descriptionKey: "yAxisEventOnAxisLevel3LabelWidthDescriptionKey",
        value: 16,
    });
    public yAxisEventOnAxisLevel1Toggle = new formattingSettings.ToggleSwitch({
        name: "yAxisEventOnAxisLevel1Toggle",
        displayNameKey: "yAxisEventOnAxisLevel1ToggleKey",
        descriptionKey: "yAxisEventOnAxisLevel1ToggleDescriptionKey",
        value: true,
    });
    public yAxisEventOnAxisLevel2Toggle = new formattingSettings.ToggleSwitch({
        name: "yAxisEventOnAxisLevel2Toggle",
        displayNameKey: "yAxisEventOnAxisLevel2ToggleKey",
        descriptionKey: "yAxisEventOnAxisLevel2ToggleDescriptionKey",
        value: true,
    });
    public yAxisEventOnAxisLevel3Toggle = new formattingSettings.ToggleSwitch({
        name: "yAxisEventOnAxisLevel3Toggle",
        displayNameKey: "yAxisEventOnAxisLevel3ToggleKey",
        descriptionKey: "yAxisEventOnAxisLevel3ToggleDescriptionKey",
        value: true,
    });
    public yAxisEventOnAxisHierarchy = new formattingSettings.ItemDropdown({
        name: "yAxisEventOnAxisHierarchy",
        displayNameKey: "yAxisEventOnAxisHierarchyKey",
        descriptionKey: "yAxisEventOnAxisHierarchyDescriptionKey",
        items: [
            {displayName: 'Events-Device-Date', value: 'event-deviceId-time'},
            {displayName: 'Events-Date-Device', value: 'event-time-deviceId'},
            {displayName: 'Device-Events-Date', value: 'deviceId-event-time'},
            {displayName: 'Device-Date-Events', value: 'deviceId-time-event'},
            {displayName: 'Date-Events-Device', value: 'time-event-deviceId'},
            {displayName: 'Date-Device-Events', value: 'time-deviceId-event'}
        ],
        value: {displayName: 'Events-Device-Date', value: 'event-deviceId-time'}
    });
    name = "yAxisEventOnAxis";
    displayNameKey = "yAxisEventOnAxisKey";
    descriptionKey = "yAxisEventOnAxisDescriptionKey";
    topLevelSlice = this.yAxisEventOnAxisEventOnAxis;
    slices: Array<formattingSettings.Slice> = [
        this.yAxisEventOnAxisEventOnAxis,
        this.yAxisEventOnAxisHierarchy,
        this.yAxisEventOnAxisLevel1FontSize,
        this.yAxisEventOnAxisLevel2FontSize,
        this.yAxisEventOnAxisLevel3FontSize,
        this.yAxisEventOnAxisLevel1LabelWidth,
        this.yAxisEventOnAxisLevel2LabelWidth,
        this.yAxisEventOnAxisLevel3LabelWidth,
        this.yAxisEventOnAxisLevel1Toggle,
        this.yAxisEventOnAxisLevel2Toggle,
        this.yAxisEventOnAxisLevel3Toggle
    ];
  }
  
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    displayNameKey: string = "FormattingKey";
    discriptionKey: string = "FormattingDescriptionKey";

    public marginSettings: MarginSettings = new MarginSettings();
    public timeTickerSetting: TimeTickerSetting = new TimeTickerSetting();
    public colorSettings: ColorSettings = new ColorSettings();
    public YAxisSettings: YAxisSettings = new YAxisSettings();
    public eventSettings: EventSettings = new EventSettings();
    public cards: FormattingSettingsCard[] = [
        this.marginSettings,
        this.timeTickerSetting,
        this.colorSettings,
        this.YAxisSettings,
        this.eventSettings
    ];
}
