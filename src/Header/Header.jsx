import React from "react";
import Button from "./Button";
import Logo from "./Logo";

const buttons = [{text: 'Users',element: '.usersblock-container'}, {text: 'Sign up', element: '.form-block-container'}]

export default function Header({scrollToComponent}){

    return(
        <header className="header">
            <div className="brand-container">
                <Logo/>
            </div>
            <div className="buttons-container">
                {buttons.map( button => <Button callback={() => scrollToComponent(button.element) } key={button.text} text={button.text}/>)}
            </div>
        </header>
    )

}