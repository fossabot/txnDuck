import { Props as FieldTipProps } from "./FieldTip";

/** General properties for the form inputs in *Field components */
interface InputProps {
  /** If the field is required to be non-empty */
  required?: boolean;
  /** `id` attribute that is assigned to the input element */
  id?: string;
  /** Classes to add to the input element for the field */
  inputClass?: string;
  /** Classes to add to the label element for the field */
  labelClass?: string;
  /** Classes to add to the element for the text content of the label for the field */
  labelTextClass?: string;
  /** Data key */
  name?: string;
  /** Default value */
  defaultValue?: string | number | boolean;
  /** Current value */
  value?: string | number | boolean;
  /** If the field is disabled */
  disabled?: boolean;
  /** Event handler function for the when the field value is changed */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Event handler function for the when the field is focused on */
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
  /** Event handler function for the when the field loses focus */
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  /** Properties for the field tip. If undefined, there will no field tip */
  tip?: FieldTipProps;
}
/** General properties for fields */
interface FieldProps {
  /** Text for the main label */
  label?: string;
  /**
   * If the input should be inside in the label. If set to `false`, the `id` for the input needs to
   * be set for the label to function properly
   */
  inputInsideLabel?: boolean;
  /** ID to assign to the container */
  containerId?: string;
  /** Classes to add to the container for the field */
  containerClass?: string;
  /**
   * Text for the `title` attribute of the asterisk shown when the field is required.
   * Example: "Required"
   */
  requiredText?: string;
  /** Text for the helper message */
  helpMsg?: string;
}

/** Properties for *Fields that have side-labels */
interface SideLabelProp {
  /**
   * A side-label attached to the left side (right side in right-to-left languages) of the input
   */
  beforeSideLabel?: string;
  /**
   * A side-label attached to the right side (left side in right-to-left languages) of the input
   */
  afterSideLabel?: string;
}

/** Properties for the TextField component */
export interface TextFieldProps extends InputProps, FieldProps, SideLabelProp {
  defaultValue?: string | number;
  value?: string | number;
  type?: 'text'|'email'|'password'|'tel'|'url'

  /** Placeholder text for the input */
  placeholder?: string;
  /**
   * Type of auto-complete. Set to 'off' to turn off auto-complete.
   *
   * More information:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
   */
  autoComplete?: string;
  /** If spell-check should be enabled */
  spellCheck?: boolean;
  /** The type of keyboard to use when a virtual keyboard is used */
  inputMode?: 'none'|'text'|'decimal'|'numeric'|'tel'|'search'|'email'|'url'
  /** Maximum number of characters allowed */
  maxLength?: number;
}

/** Properties for the NumberField component */
export interface NumberFieldProps extends InputProps, FieldProps, SideLabelProp {
  defaultValue?: number | string;
  value?: number | string;

  /** Minimum value allowed */
  min?: number | null;
  /** Maximum value allowed */
  max?: number | null;
  /** Specifies the granularity that the value must adhere to */
  step?: number | 'any' | null;
  /**
   * Type of auto-complete. Set to 'off' to turn off auto-complete.
   *
   * More information:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values
   */
  autoComplete?: string;
}

/** Properties for the SelectField component */
export interface SelectFieldProps
extends Omit<TextFieldProps, 'spellcheck'|'onChange'|'onFocus'|'onBlur'|'type'> {
  /** Event handler function for the when the field value is changed */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  /** Event handler function for the when the field is focused on */
  onFocus?: React.ChangeEventHandler<HTMLSelectElement>;
  /** Event handler function for the when the field loses focus */
  onBlur?: React.ChangeEventHandler<HTMLSelectElement>;
  /** List of options available to select. The `value` of each option should be unique */
  options?: {
    /** Value of the option */
    value: string | number,
    /** Display text for the option */
    text?: string
  }[];
}

/** Properties for the TextAreaField component */
export interface TextAreaFieldProps
extends  Omit<TextFieldProps, 'onChange'|'onFocus'|'onBlur'|'type'> {
  /** Event handler function for the when the field value is changed */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /** Event handler function for the when the field is focused on */
  onFocus?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /** Event handler function for the when the field loses focus */
  onBlur?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

/** Properties for the CheckboxField component */
export interface CheckboxFieldProps extends InputProps, FieldProps {
  /** If the field should be checked by default */
  defaultValue?: boolean;
  /** If the field is checked or unchecked */
  value?: boolean;
  /**
   * The position of the input relative to the label.
   *
   * `start` = input positioned before the label
   *
   * `end` = input positioned after the label
   */
  inputPosition?: 'start' | 'end';
}

/** Properties for the ToggleField component */
export interface ToggleFieldProps extends CheckboxFieldProps {}

/** Properties for the RadioButtonGroupField component */
export interface RadioButtonGroupFieldProps
extends Omit<InputProps, 'id'|'inputClass'>, Omit<FieldProps, 'inputInsideLabel'> {
  /** Classes to add to each option */
  optionClass?: string;
  /** List of options. The `value` of each option should be unique */
  options?: {
    /** Value of the option */
    value: string | number,
    /** Display text for the option */
    text?: string
  }[];
}

/** Properties for the FieldGroup component */
export interface FieldGroupProps {
  /** Fields and other things inside the group */
  children?: React.ReactNode;
  /** Text of the heading */
  heading?: string;
  /** The level of the heading. Ranges from `1` (an `<h1>` heading) to `6` (an `<h6>`) */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6 ;
  /** Classes to add to the heading */
  headingClass?: string;
  /** The `id` for the heading */
  headingId?: string;
  /** ID to assign to the container the field group */
  containerId?: string;
  /** Classes to add to the container the field group */
  containerClass?: string;
  /** If all inputs contained within the group should be disabled */
  disabled?: boolean;
  /** Properties for the field group tip. If undefined, there will no field group tip */
  tip?: FieldTipProps;
}
