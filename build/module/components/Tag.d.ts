import React from "react";
interface Props {
    value: string;
    index: number;
    editable: boolean;
    readOnly: boolean;
    inputRef: React.RefObject<HTMLInputElement>;
    update: (i: number, value: string) => void;
    remove: (i: number) => void;
    validator?: (val: string) => boolean;
    removeOnBackspace?: boolean;
    delimiters?: number[];
}
export declare const CloseIcon: () => JSX.Element;
export declare class Tag extends React.Component<Props> {
    innerEditableRef: React.RefObject<HTMLDivElement>;
    remove: () => void;
    render(): JSX.Element;
}
export {};
