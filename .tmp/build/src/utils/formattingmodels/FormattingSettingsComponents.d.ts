/**
 * Powerbi utils components classes for custom visual formatting pane objects
 *
 */
import powerbi from "powerbi-visuals-api";
import { IFormattingSettingsSlice } from "./FormattingSettingsInterfaces";
import data = powerbi.data;
import visuals = powerbi.visuals;
declare class NamedEntity {
    displayName?: string;
    displayNameKey?: string;
    description?: string;
    descriptionKey?: string;
}
export declare class CardGroupEntity extends NamedEntity {
    /** name should be the exact same object name from capabilities objects that this formatting card is representing */
    name: string;
    slices?: Array<Slice>;
    container?: Container;
    disabled?: boolean;
    /** group disabled reason */
    disabledReason?: string;
    /**
     * If delaySaveSlices is true, then this group's slices' value changes won't be saved to the visual until a
     * signal action is taken. E.g., for an Analytics Pane forecast, the forecast parameter values shouldn't be
     * saved to the visual until the Apply button is clicked. Note that this applies to all slices in the group.
     */
    delaySaveSlices?: boolean;
    /** Group can expand/collapse */
    collapsible?: boolean;
    /** if true, this group will be populated into the formatting pane */
    visible?: boolean;
    /** Slice, usually a ToggleSwitch, to be rendered at the top of the card/group */
    topLevelSlice?: SimpleSlice;
}
export declare class Model {
    cards: Array<Card>;
}
/** CompositeCard is use to populate a card into the formatting pane with multiple groups */
export declare abstract class CompositeCard extends NamedEntity {
    /** name should be the exact same object name from capabilities objects that this formatting card is representing */
    name: string;
    abstract groups: Array<Group>;
    /** if true, this card will be populated into the formatting pane */
    visible?: boolean;
    /** if true, this card should be populated into the analytics pane */
    analyticsPane?: boolean;
    /** Slice, usually a ToggleSwitch, to be rendered at the top of the card/group */
    topLevelSlice?: SimpleSlice;
    /**
     * Called before the card is populated.
     * This is useful for setting the card's slices' visibility before the card is populated into the formatting pane.
    */
    onPreProcess?(): void;
}
export declare class Group extends CardGroupEntity {
    constructor(object: Group);
}
/** SimpleCard is use to populate a card into the formatting pane in a single group */
export declare class SimpleCard extends CardGroupEntity {
    /** if true, this card should be populated into the analytics pane */
    analyticsPane?: boolean;
    /**
     * Called before the card is populated.
     * This is useful for setting the card's slices' visibility before the card is populated into the formatting pane.
    */
    onPreProcess?(): void;
}
export type Card = SimpleCard | CompositeCard;
export type Slice = SimpleSlice | CompositeSlice;
export declare abstract class SimpleSlice<T = any> extends NamedEntity implements IFormattingSettingsSlice {
    /** name should be the exact same property name from capabilities object properties list that this formatting slice is representing */
    name: string;
    value: T;
    selector?: data.Selector;
    altConstantSelector?: data.Selector;
    instanceKind?: powerbi.VisualEnumerationInstanceKinds;
    /** if true, this slice will be populated into the formatting pane */
    visible?: boolean;
    /** type declared in each slice sub class, No need to declare it in initializing object */
    type?: visuals.FormattingComponent;
    constructor(object: SimpleSlice<any>);
    getFormattingSlice?(objectName: string, localizationManager?: powerbi.extensibility.ILocalizationManager): visuals.SimpleVisualFormattingSlice;
    getFormattingComponent?(objectName: string, localizationManager?: powerbi.extensibility.ILocalizationManager): visuals.SimpleComponentBase<any>;
    getRevertToDefaultDescriptor?(objectName: string): visuals.FormattingDescriptor[];
    setPropertiesValues?(dataViewObjects: powerbi.DataViewObjects, objectName: string): void;
}
export declare class AlignmentGroup extends SimpleSlice<string> {
    mode: visuals.AlignmentGroupMode;
    supportsNoSelection?: boolean;
    type?: visuals.FormattingComponent;
    constructor(object: AlignmentGroup);
    getFormattingComponent?(objectName: string): visuals.AlignmentGroup;
}
export declare class ToggleSwitch extends SimpleSlice<boolean> {
    type?: visuals.FormattingComponent;
    constructor(object: ToggleSwitch);
}
export declare class ColorPicker extends SimpleSlice<powerbi.ThemeColorData> {
    defaultColor?: powerbi.ThemeColorData;
    isNoFillItemSupported?: boolean;
    type?: visuals.FormattingComponent;
    constructor(object: ColorPicker);
    getFormattingComponent?(objectName: string): visuals.ColorPicker;
}
export declare class NumUpDown extends SimpleSlice<number> {
    options?: visuals.NumUpDownFormat;
    type?: visuals.FormattingComponent;
    constructor(object: NumUpDown);
    getFormattingComponent?(objectName: string): visuals.NumUpDown;
}
export declare class Slider extends NumUpDown {
    type?: visuals.FormattingComponent;
}
export declare class DatePicker extends SimpleSlice<Date> {
    placeholder: string;
    placeholderKey?: string;
    validators?: {
        max?: visuals.MaxValidator<Date>;
        min?: visuals.MinValidator<Date>;
    };
    type?: visuals.FormattingComponent;
    constructor(object: DatePicker);
    getFormattingComponent?(objectName: string, localizationManager?: powerbi.extensibility.ILocalizationManager): visuals.DatePicker;
}
export declare class ItemDropdown extends SimpleSlice<powerbi.IEnumMember> {
    items: powerbi.IEnumMember[];
    type?: visuals.FormattingComponent;
    constructor(object: ItemDropdown);
    getFormattingComponent?(objectName: string): visuals.ItemDropdown;
}
export declare class AutoDropdown extends SimpleSlice<powerbi.EnumMemberValue> {
    mergeValues?: powerbi.IEnumMember[];
    filterValues?: powerbi.EnumMemberValue[];
    type?: visuals.FormattingComponent;
    constructor(object: AutoDropdown);
    getFormattingComponent?(objectName: string): visuals.AutoDropdown;
}
export declare class DurationPicker extends SimpleSlice<string> {
    validators?: {
        min?: string;
        max?: string;
        integer?: boolean;
    };
    type?: visuals.FormattingComponent;
    constructor(object: DurationPicker);
    getFormattingComponent?(objectName: string): visuals.DurationPicker;
}
export declare class ErrorRangeControl extends SimpleSlice<undefined> {
    validators: powerbi.explore.directives.ValidationInfo;
    type?: visuals.FormattingComponent;
    constructor(object: ErrorRangeControl);
    getFormattingComponent?(objectName: string): visuals.ErrorRangeControl;
}
export declare class FieldPicker extends SimpleSlice<data.ISQExpr[]> {
    validators: powerbi.explore.directives.ValidationInfo;
    allowMultipleValues?: boolean;
    type?: visuals.FormattingComponent;
    constructor(object: FieldPicker);
    getFormattingComponent?(objectName: string): visuals.FieldPicker;
}
export declare class ItemFlagsSelection extends SimpleSlice<string> {
    items: powerbi.IEnumMember[];
    type?: visuals.FormattingComponent;
    constructor(object: ItemFlagsSelection);
    getFormattingComponent?(objectName: string): visuals.ItemFlagsSelection;
}
export declare class AutoFlagsSelection extends SimpleSlice<powerbi.EnumMemberValue> {
    type?: visuals.FormattingComponent;
}
export declare class TextInput extends SimpleSlice<string> {
    placeholder: string;
    type?: visuals.FormattingComponent;
    constructor(object: TextInput);
    getFormattingComponent?(objectName: string): visuals.TextInput;
}
export declare class TextArea extends TextInput {
    type?: visuals.FormattingComponent;
}
export declare class FontPicker extends SimpleSlice<string> {
    type?: visuals.FormattingComponent;
}
export declare class GradientBar extends SimpleSlice<string> {
    type?: visuals.FormattingComponent;
}
export declare class ImageUpload extends SimpleSlice<powerbi.ImageValue> {
    type?: visuals.FormattingComponent;
}
export declare class ListEditor extends SimpleSlice<visuals.ListEditorValue> {
    constructor(object: ListEditor);
    type?: visuals.FormattingComponent;
}
export declare class ReadOnlyText extends SimpleSlice<string> {
    type?: visuals.FormattingComponent;
}
export declare class ShapeMapSelector extends SimpleSlice<powerbi.GeoJson> {
    isAzMapReferenceSelector?: boolean;
    type?: visuals.FormattingComponent;
    constructor(object: ShapeMapSelector);
    getFormattingComponent?(objectName: string): visuals.ShapeMapSelector;
}
export declare abstract class CompositeSlice extends NamedEntity implements IFormattingSettingsSlice {
    /** composite slice name isn't required to be from capabilities
     * it will only be used for building formatting slice uid*/
    name: string;
    type?: visuals.FormattingComponent;
    visible?: boolean;
    constructor(object: CompositeSlice);
    getFormattingSlice?(objectName: string): visuals.CompositeVisualFormattingSlice;
    getFormattingComponent?(objectName: string): visuals.CompositeComponentPropertyType;
    getRevertToDefaultDescriptor?(objectName: string): visuals.FormattingDescriptor[];
    setPropertiesValues?(dataViewObjects: powerbi.DataViewObjects, objectName: string): any;
}
export declare class FontControl extends CompositeSlice {
    fontFamily: FontPicker;
    fontSize: NumUpDown;
    bold?: ToggleSwitch;
    italic?: ToggleSwitch;
    underline?: ToggleSwitch;
    type?: visuals.FormattingComponent;
    constructor(object: FontControl);
    getFormattingComponent?(objectName: string): visuals.FontControl;
    getRevertToDefaultDescriptor?(objectName: string): visuals.FormattingDescriptor[];
    setPropertiesValues?(dataViewObjects: powerbi.DataViewObjects, objectName: string): void;
}
export declare class MarginPadding extends CompositeSlice {
    left: NumUpDown;
    right: NumUpDown;
    top: NumUpDown;
    bottom: NumUpDown;
    type?: visuals.FormattingComponent;
    constructor(object: MarginPadding);
    getFormattingComponent?(objectName: string): visuals.MarginPadding;
    getRevertToDefaultDescriptor?(objectName: string): visuals.FormattingDescriptor[];
    setPropertiesValues?(dataViewObjects: powerbi.DataViewObjects, objectName: string): void;
}
export declare class Container extends NamedEntity {
    constructor(object: Container);
    containerItems: ContainerItem[];
    /**
     * Whether this container allows editing, including add/remove container items, and
     * edit of individual container item's value itself.
     */
    isEditable?: boolean;
}
export declare class ContainerItem extends NamedEntity {
    slices?: Slice[];
}
export {};
