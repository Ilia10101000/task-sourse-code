import React from "react";

export default function Button({text, callback = null, isShow = true, disabled = false}){
    return (
        <button className={`button ${isShow?null: 'hiddenElement'}`} onClick={callback} disabled={disabled}>{text}</button>
    )
}