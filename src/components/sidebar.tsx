import React, {
    HTMLAttributes,
    ReactNode,
    Ref,
    useMemo,
    useRef,
} from "react";
import { classnames } from "../../utils";

interface ISidebar extends HTMLAttributes<HTMLDivElement> {
    values: string[];
    lineHeight: string | number;
    sidebarRef?: Ref<HTMLDivElement>;
    renderItem: (line: number, item: string) => ReactNode;
}

export function Sidebar(props: ISidebar) {

    const {
        values = [],
        lineHeight,
        renderItem,
        sidebarRef = useRef<HTMLDivElement>(null),
        className,
        ...extra
    } = props;

    const cls = classnames({
        "lined-textarea__sidebar": true,
    }, className);

    const height = useMemo(() => `${parseFloat(lineHeight.toString())}em`, [lineHeight]);

    return (
        <div ref={sidebarRef} className={cls} {...extra}>
            <ul className="lined-textarea__sidebar__list">
                {
                    values.map((item, index) => {
                        return <li style={{height}}>{renderItem(index, item)}</li>;
                    })
                }
            </ul>
        </div>
    );
}
