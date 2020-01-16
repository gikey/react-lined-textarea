
import { ChangeEvent, ReactNode, TextareaHTMLAttributes } from "react";

export type UnionOmit<T, K> = T & Omit<K, keyof T>;

export interface ILinedTextarea {
    lineHeight?: string | number;
    value?: string;
    width?: string;
    height?: string;
    renderLineNum?: (line: number, item: string) => ReactNode;
    renderAddon?: (line: number, item: string) => ReactNode;
    onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export type IInPutProps = UnionOmit<ILinedTextarea, TextareaHTMLAttributes<HTMLTextAreaElement>>;

export default function LinedTextarea(props: IInPutProps): JSX.Element;