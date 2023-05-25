declare module 'react-credit-card-primitives' {
  export interface NumberChangeEvent {
    type: string;
    value: string;
    valid: boolean;
    setValue: any;
    getInputProps: any;
  }

  interface NumberProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: NumberChangeEvent) => void;
    render: (value: NumberChangeEvent) => React.ReactNode;
    masked?: boolean;
    cardTypes?: Array<string>;
    creditcards?: any;
  }

  export interface ExpirationChangeEvent {
    month: number;
    year: number;
    valid: boolean;
    getInputProps: any;
    error: any;
  }

  interface ExpirationProps {
    month?: number;
    year?: number;
    defaultMonth?: number;
    defaultYear?: number;
    onChange?: (value: ExpirationChangeEvent) => void;
    render: (value: ExpirationChangeEvent) => React.ReactNode;
    creditcards?: any;
  }

  export interface CvcChangeEvent {
    focused: boolean;
    value: number;
    valid: boolean;
    setValue: any;
    getInputProps: any;
  }

  interface CvcProps {
    value?: string;
    defaultValue?: string;
    masked?: boolean;
    cardType?: string;
    onChange?: (value: CvcChangeEvent) => void;
    render: (value: CvcChangeEvent) => React.ReactNode;
    creditcards?: any;
  }

  export class Number extends React.Component<NumberProps> {}

  export class Expiration extends React.Component<ExpirationProps> {}

  export class Cvc extends React.Component<CvcProps> {}
}
