import React from "react";
interface Props {
    value: string;
    className: string;
    innerEditableRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    change: (value: string) => void;
    remove: () => void;
    validator?: (value: string) => boolean;
    removeOnBackspace?: boolean;
    delimiters?: number[];
}
export declare class ContentEditable extends React.Component<Props> {
    focused: boolean;
    removed: boolean;
    preFocusedValue: string;
    componentDidMount(): void;
    onPaste: (e: React.ClipboardEvent<HTMLDivElement>) => void;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onFocus: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    getValue: () => string;
    getRef: () => HTMLDivElement | null;
    focusInputRef: () => void;
    render(): JSX.Element;
}
export {};
