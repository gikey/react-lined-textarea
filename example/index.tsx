import React, { useState } from "react";
import ReactDom from "react-dom";
import LinedTextarea from "../src/index";
import "./style.scss";

function App() {
    const [value] = useState("react-lined-textarea");

    return (
        <div className="lined-textarea-demo">
            <LinedTextarea
                value={value}
                renderAddon={(line, item) => {
                    if (item.length > 10) {
                        return <div key={line} className="dot"></div>
                    }
                    return null;
                }}
            />
        </div>
    );
}

ReactDom.render(<App />, document.getElementById("root"));
