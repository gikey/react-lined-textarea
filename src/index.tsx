import React, {
    ChangeEvent,
    ReactNode,
    TextareaHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { classnames, UnionOmit } from "../utils";
import { Sidebar } from "./components/sidebar";

import "./style.scss";

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

export default function LinedTextarea(props: IInPutProps) {

    const textareaEl = useRef<HTMLTextAreaElement>(null);

    const linenumEl = useRef<HTMLDivElement>(null);

    const addonEl = useRef<HTMLDivElement>(null);

    const [textareaValue, setTextareaValue] = useState("");

    const {
        className,
        value = "",
        lineHeight = 1.5,
        width = "100%",
        height = "200px",
        onScroll,
        onChange,
        renderLineNum,
        renderAddon,
        ...extra
    } = props;

    const cls = classnames({
        "has-addon": !!renderAddon,
        "lined-textarea": true,
    }, className);

    const handleScroll = useCallback((event) => {
        if (!textareaEl.current || !linenumEl.current) {
            return;
        }

        const scrollTop = textareaEl.current.scrollTop;

        linenumEl.current.scrollTop = scrollTop;

        if (addonEl.current) {
            addonEl.current.scrollTop = scrollTop;
        }

        onScroll && onScroll(event);
    }, []);

    const handleChange = useCallback((event) => {

        const content = event.target.value;

        setTextareaValue(content);

        onChange && onChange(content, event);

    }, []);

    const renderLineNumContent = useCallback((line, item) => {
        if (renderLineNum) {
            return renderLineNum(line, item);
        }
        return (<div key={line} className="lined-textarea__linenum__item">{line + 1}</div>);
    }, []);

    useEffect(() => {
        setTextareaValue(value);
    }, [value]);

    return (
        <div className={cls} style={{lineHeight, width, height}}>
            <Sidebar
                sidebarRef={linenumEl}
                lineHeight={lineHeight}
                className="lined-textarea__linenum"
                values={textareaValue.split("\n")}
                renderItem={renderLineNumContent}
            />
            <textarea
                value={textareaValue}
                ref={textareaEl}
                className="lined-textarea__inner"
                onScroll={handleScroll}
                onChange={handleChange}
                {...extra}
            />
            {
                renderAddon ? (
                    <Sidebar
                        sidebarRef={addonEl}
                        lineHeight={lineHeight}
                        className="lined-textarea__addon"
                        values={textareaValue.split("\n")}
                        renderItem={renderAddon}
                    />
                ) : null
            }
        </div>
    );
}
