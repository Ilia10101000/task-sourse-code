import React from "react";
import UsersBlock from "../UsersBlock/UsersBlock";
import FormBlock from "../FormBlock/FormBlock";

export default function RequestBlocks({token, scrollToComponent}){

    const [actualState, setActualState] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    console.log(actualState)

    function fetchPositionsData(){
        fetch(process.env.REACT_APP_POSITIONS ).
        then(data => data.json()).
        then(response => {
            if(response.success){
                setPositions(response.positions)
            }
        }).catch(error => console.log(error))
    }

    function fetchUsersData(){
        fetch(process.env.REACT_APP_URL_USERS_DATA).
        then(data => data.json()).
        then(response => {
            setActualState(response);
        }).
        catch( error => console.log(error))
    }
    function updateData(){
        if(actualState.links.next_url){
            fetch(actualState.links.next_url).
            then(data => data.json()).
            then(response => {
                setActualState(response);     
            }).catch(e => console.log(e.message))
        }
    }

    React.useEffect(() => {
        fetchUsersData();
    },[])
    React.useEffect(() => {
        fetchPositionsData()
    },[])
    return (
        <>
        <UsersBlock users={actualState.users} updateData={updateData} isShowButton={!!actualState?.links?.next_url}/>
        <FormBlock scrollToComponent={scrollToComponent} token={token} updateData={fetchUsersData} positions={positions}/>
        </>
    )

}