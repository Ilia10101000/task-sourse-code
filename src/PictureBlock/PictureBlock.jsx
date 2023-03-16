import React from "react";
import Button from "../Header/Button";

export default function PictureBlock({scrollToComponent}){

    return (
        <div className="picture-block-container">
            <div className="discription-container">
                <div className="title discription-title">Test assignment for front-end developer</div>
                <div className="discription-text">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</div>
                <div className="picture-block-button-container"><Button callback={() => scrollToComponent('.form-block-container')} text='Sign up'/></div>
            </div>
        </div>
    )
}