import React from "react";

export default function User({img,name,position,email,phone}){
    return (
        <div className="user-container">
            <div className="user-photo"><img src={img} alt='user-img'/></div>
            <div className="user-name">
                {name}
            </div>
            <div className="user-discription">
                <div>{position}</div>
                <div>{email}</div>
                <div>{phone}</div>
            </div>
        </div>
    )
}