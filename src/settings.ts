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
    
    public timeTickerFormattingSettings = new TimeTickerFormattingSettings(Object);
    public timeTickerRangesSettings = new TimeTickerRangesSettings(Object);
    public timeTickerCustomRangesSettings = new TimeTickerCustomRangesSettings(Object);

    groups: formattingSettings.Group[] = [this.timeTickerFormattingSettings, this.timeTickerRangesSettings, this.timeTickerCustomRangesSettings];
}

export class EventGroupingSettings extends formattingSettings.Group {
    public groupSameEvents = new formattingSettings.ToggleSwitch({
        name: "groupEvents",
        displayNameKey: "GroupEventsKey",
        descriptionKey: "GroupEventsDescriptionKey",
        value: false,
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

export class EventSettings extends CompositeCard {
    name: string = "eventSettings";
    displayNameKey: string = "eventSettingsKey";
    descriptionKey: string = "eventSettingsDescriptionKey";
    
    public eventGroupingSettings = new EventGroupingSettings(Object);
    public eventCustomEventHightSettings = new EventCustomEventHightSettings(Object);

    groups: formattingSettings.Group[] = [this.eventGroupingSettings, this.eventCustomEventHightSettings];
}

export class YAxisSettings extends SimpleCard {
    public yAxisFontInnerSize = new formattingSettings.NumUpDown({
        name: "yAxisFontInnerSize",
        displayNameKey: "yAxisFontInnerSizeKey",
        descriptionKey: "yAxisFontInnerSizeDescriptionKey",
        value: 12,
    });
    public yAxisFontOuterSize = new formattingSettings.NumUpDown({
        name: "yAxisFontOuterSize",
        displayNameKey: "yAxisFontOuterSizeKey",
        descriptionKey: "yAxisFontOuterSizeDescriptionKey",
        value: 14,
    });
    public yAxisFontOuterShow = new formattingSettings.ToggleSwitch({
        name: "yAxisFontOuterShow",
        displayNameKey: "yAxisFontOuterShowKey",
        descriptionKey: "yAxisFontOuterShowDescriptionKey",
        value: true,
    });
    public SwitchDatesDevices = new formattingSettings.ToggleSwitch({
        name: "SwitchDatesDevices",
        displayNameKey: "SwitchDatesDevicesKey",
        descriptionKey: "SwitchDatesDevicesDescriptionKey",
        value: false,
    });
    name = "yAxis";
    displayNameKey = "yAxisKey";
    descriptionKey = "yAxisDescriptionKey";
    slices: Array<formattingSettings.Slice> = [this.SwitchDatesDevices, this.yAxisFontOuterShow, this.yAxisFontOuterSize, this.yAxisFontInnerSize];
}

export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    displayNameKey: string = "FormattingKey";
    discriptionKey: string = "FormattingDescriptionKey";

    public marginSettings: MarginSettings = new MarginSettings();
    public timeTickerSetting: TimeTickerSetting = new TimeTickerSetting();
    public colorSettings: ColorSettings = new ColorSettings();
    public yAxisSettings: YAxisSettings = new YAxisSettings();
    public eventSettings: EventSettings = new EventSettings();
    public cards: FormattingSettingsCard[] = [
        this.marginSettings,
        this.timeTickerSetting,
        this.colorSettings,
        this.yAxisSettings,
        this.eventSettings
    ];
}