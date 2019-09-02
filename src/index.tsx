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
    renderLineNum?: (line: number) => ReactNode;
    renderAddon?: (line: number) => ReactNode;
    onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export type IInPutProps = UnionOmit<ILinedTextarea, TextareaHTMLAttributes<HTMLTextAreaElement>>;

export default function LinedTextarea(props: IInPutProps) {

    const textareaEl = useRef<HTMLTextAreaElement>(null);

    const linenumEl = useRef<HTMLDivElement>(null);

    const addonEl = useRef<HTMLDivElement>(null);

    const [lines, setLines] = useState(1);

    const [textareaValue, setTextareaValue] = useState("");

    const {
        className,
        value = "",
        lineHeight = 1.5,
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

        setLines(content.split("\n").length);
        setTextareaValue(content);

        onChange && onChange(content, event);

    }, []);

    const renderLineNumContent = useCallback((item) => {
        if (renderLineNum) {
            return renderLineNum(item);
        }
        return (<div key={item} className="lined-textarea__linenum__item">{item + 1}</div>);
    }, []);

    useEffect(() => {
        setTextareaValue(value);
    }, [value]);

    return (
        <div className={cls} style={{lineHeight}}>
            <Sidebar
                sidebarRef={linenumEl}
                className="lined-textarea__linenum"
                lines={lines}
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
                        className="lined-textarea__addon"
                        lines={lines}
                        renderItem={renderAddon}
                    />
                ) : null
            }
        </div>
    );
}
