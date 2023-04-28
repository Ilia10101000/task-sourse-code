import React from "react";
import photo_cover from '../img/photo-cover.svg'

export default function User({img,name,position,email,phone}){
    return (
        <div className="user-container">
            <div className="user-photo"><img src={img?img:photo_cover} alt='user-img'/></div>
            <div className="user-name user-data-description">
                {name}
            </div>
            <div className="user-discription">
                <div className="user-data-description">{position}</div>
                <div className="user-data-description">{email}</div>
                <div className="user-data-description">{phone}</div>
            </div>
        </div>
    )
}