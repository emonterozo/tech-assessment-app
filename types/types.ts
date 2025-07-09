export type H1Field = {
  Type: "H1";
  Text: string;
};

export type TextField = {
  ID: string;
  Type: "Text";
  Placeholder: string;
};

export type ButtonField = {
  ID: string;
  Type: "Button";
  Title: string;
  AlertMessage: string;
};

export type FormField = H1Field | TextField | ButtonField;

export type FormConfig = {
  Title: string;
  Subtitle: string;
  Fields: FormField[];
};
