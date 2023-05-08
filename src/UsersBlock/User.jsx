import React from "react";
import photo_cover from '../img/photo-cover.svg'

export default function User({img,name,position,email,phone}){

    function hundlerPhoneNumber(number){
        if(number.startsWith('+')){
            return `${number.slice(0,3)} (${number.slice(3,6)}) ${number.slice(6,9)} ${number.slice(9,11)} ${number.slice(11,13)}`
        } 
        return `+${number.slice(0,2)} (${number.slice(2,5)}) ${number.slice(5,8)} ${number.slice(8,10)} ${number.slice(10,12)}`
    }
    return (
        <div className="user-container">
            <div className="user-photo"><img src={img && (img.endsWith('.jpeg') || img.endsWith('.jpg'))?img:photo_cover} alt='user-img'/></div>
            <div className="user-data-description">
                {name}
            </div>
            <div className="user-discription">
                <div className="user-data-description">{position}</div>
                <div className="user-data-description">{email}</div>
                <div className="user-data-description">{hundlerPhoneNumber(phone)}</div>
            </div>
        </div>
    )
}
