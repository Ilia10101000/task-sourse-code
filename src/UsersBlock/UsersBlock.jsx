import React from "react";
import Button from "../Header/Button";
import User from "./User";


export default function UsersBlock({users, updateData, isShowButton}){

    let result;

    if(users.length){
        result = users.map( user => <User key={user.id} name={user.name} img={user.photo} phone={user.phone} position={user.position} email={user.email}/>)
    } else {
        result = <div className="custom-loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    }
    return (
        <div className="usersblock-container">
            <div className="title request-title">Working with GET request</div>
            <div className="users-list">
                {result}
            </div>
            <Button callback={updateData} isShow={isShowButton} text='Show more'/>
        </div>
    )
}