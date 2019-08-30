import React, {
    HTMLAttributes,
    ReactNode,
    useRef,
} from "react";
import { classnames } from "../../utils";

interface ISidebar extends HTMLAttributes<HTMLDivElement> {
    lines: number;
    sidebarRef?: any;
    renderItem: (line: number) => ReactNode;
}

export function Sidebar(props: ISidebar) {

    const {
        lines,
        renderItem,
        sidebarRef = useRef<HTMLDivElement>(null),
        className,
        ...extra
    } = props;

    const cls = classnames({
        "lined-textarea__sidebar": true,
    }, className);

    return (
        <div ref={sidebarRef} className={cls} {...extra}>
            <ul className="lined-textarea__sidebar__list">
                {
                    [...Array(lines).keys()].map((item) => {
                        return <li>{renderItem(item)}</li>;
                    })
                }
            </ul>
        </div>
    );
}
