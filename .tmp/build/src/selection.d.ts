import { BaseType } from "d3";
import * as d3 from 'd3';
import powerbiVisualsApi from "powerbi-visuals-api";
import ISelectionManager = powerbiVisualsApi.extensibility.ISelectionManager;
export declare function applyContextMenu(bars: d3.Selection<BaseType, any, BaseType, any>, selectionManager: ISelectionManager): void;
export declare function applySelection(bars: any, selectionManager: ISelectionManager): void;
