declare namespace AppContent.GeneratedForm {
  interface Content extends BaseContent {
    title?: string;
    subtitle?: string;
    fields: Field[];
    submitButton: AppContent.CTAContent;
    resetButton?: AppContent.CTAContent;
  }

  export interface Field {
    type: FieldType;
    name: string;
    label?: string;
    placeholder?: string;
    hint?: string;
    defaultValue?: string | number | boolean;
    value?: string | number | boolean;
    options?: {
      label: string;
      value: string;
    }[];
    fieldset?: string;
    validationRules?: Rule[];
  }

  export interface Rule {
    type: 'required' | 'pattern' | 'maxLength' | 'minLength' | 'email';
    value?: any;
    errorMessage?: string;
    errorCode?: string;
  }

  type FieldType =
    | 'description'
    | 'text'
    | 'number'
    | 'email'
    | 'tel'
    | 'checkbox'
    | 'radio'
    | 'password'
    | 'select'
    | 'hidden'
    | 'fieldset'
    | 'capcha';
}
