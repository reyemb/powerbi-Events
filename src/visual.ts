"use strict";

import powerbi from "powerbi-visuals-api";

// custom imports
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel-community";
import { DrawEvents } from './draw';
import { createDataPoints } from './converter';
import { addTooltip } from './tooltips';
import { IEventBoxData } from "./interfaces";
import { VisualFormattingSettingsModel } from "./settings";
import { EventBehavior } from "./behavior";

// d3.js
import * as d3 from 'd3';

// powerbi.extensibility.visual
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

// powerbi-visuals-utils-interactivityutils
import { interactivitySelectionService, interactivityBaseService} from "powerbi-visuals-utils-interactivityutils";
import IInteractiveBehavior = interactivityBaseService.IInteractiveBehavior;
import IInteractivityService = interactivityBaseService.IInteractivityService;
import createInteractivitySelectionService = interactivitySelectionService.createInteractivitySelectionService;
import { BaseDataPoint } from "powerbi-visuals-utils-interactivityutils/lib/interactivityBaseService";

import { BaseBehaviorOptions } from "powerbi-visuals-utils-interactivityutils/lib/baseBehavior";
import { SelectableDataPoint } from "powerbi-visuals-utils-interactivityutils/lib/interactivitySelectionService";

export class Visual implements IVisual {
    target: HTMLElement;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private DrawEvents: any;
    private behavior: IInteractiveBehavior;
    private host: IVisualHost;
    private formatterFloat: (n: number) => string;
    private formatterInt: (n: number) => string;
    private interactivityService: IInteractivityService<BaseDataPoint> | any;
    private localizationManager: powerbi.extensibility.ILocalizationManager;
    private locale: string

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.locale = options.host.locale;
        this.localizationManager = options.host.createLocalizationManager();
        this.formattingSettingsService = new FormattingSettingsService(this.localizationManager);
        this.target = options.element;
        this.host = options.host;
        this.behavior = new EventBehavior()
        this.interactivityService = createInteractivitySelectionService(this.host);
        if (document) {
            this.DrawEvents = new DrawEvents(this.target);
        }
        
    }


    public update(options: powerbi.extensibility.visual.VisualUpdateOptions): void {
        console.log('Visual update', options);
        this.reset();
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
            VisualFormattingSettingsModel,
            options.dataViews[0]
        );   
        const dataView  = options.dataViews[0];
        const columns = dataView.table.columns;

        // Set the right indexes for the fields
        const timeFieldIndex = columns.findIndex(column => column.roles['times']);
        const deviceFieldIndex = columns.findIndex(column => column.roles['devices']);
        const eventFieldIndex = columns.findIndex(column => column.roles['events']);
        const colorFieldIndex = columns.findIndex(column => column.roles['color']);
        const tooltipFieldIndexes = columns.map((column, index) => column.roles['tooltips'] ? index : -1).filter(index => index !== -1);

        // Prepare Datapoints
        const {dataPoints, minMaxTime: {min, max}} = createDataPoints(
            dataView, 
            this.host, 
            timeFieldIndex, 
            deviceFieldIndex, 
            eventFieldIndex, 
            tooltipFieldIndexes, 
            colorFieldIndex, 
            this.formattingSettings.colorSettings.useColorJson.value,
            this.formattingSettings.colorSettings.colorJson.value
        );


        // Draw the visual
        this.DrawEvents.init(this.formattingSettings, options.viewport);
        this.DrawEvents.drawXAxis(min, max);
        this.DrawEvents.drawYAxis(dataPoints);
        this.DrawEvents.drawGroupLabels(dataPoints);
        const eventBoxes = this.DrawEvents.drawBoxes(dataPoints);

        // Add tooltips
        addTooltip(this.DrawEvents.eventBoxesSelection, this.host, this.localizationManager);

        // Add selection
        this.interactivityService.bind(<BaseBehaviorOptions<SelectableDataPoint>>{
            behavior: this.behavior,
            dataPoints: dataPoints.map(d => d.selectableDatapoint),
            clearCatcherSelection: this.DrawEvents.root,
            target: this.DrawEvents.target,
            elementsSelection: this.DrawEvents.eventBoxesSelection,
            eventBoxesSelection: this.DrawEvents.eventBoxesSelection,
            interactivityService: this.interactivityService
        });
        this.interactivityService.applySelectionStateToData(dataPoints.map(d => d.selectableDatapoint));
        this.applySelectionAfterResizing();
    }
    


    private applySelectionAfterResizing() {
        this.DrawEvents.eventBoxesSelection.style("opacity", (eventboxes: IEventBoxData) => {
        if (!this.interactivityService.hasSelection()) {
            return 1;
          } else if (eventboxes.dataPoints.some((d) => d.selectableDatapoint.selected)) {
            return 1;
          } else {
            return 0.5;
          }
        });
    }     

    private reset(){
        d3.selectAll("#events_visual")
        .remove();
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}