import React from "react";
import UsersBlock from "../UsersBlock/UsersBlock";
import FormBlock from "../FormBlock/FormBlock";

const urlUsersData = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';
const urlPositions = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'

export default function RequestBlocks({token, scrollToComponent}){

    const actualState = React.useRef([]);
    const [positions, setPositions] = React.useState([])
    const [users, setUsers] = React.useState([]);

    const [isShowButton, setIsShowButton] = React.useState(true);

    function fetchPositionsData(){
        fetch(urlPositions).
        then(data => data.json()).
        then(response => {
            if(response.success){
                setPositions(response.positions)
            }
        }).catch(error => console.log(error))
    }

    function fetchUsersData(){
        fetch(urlUsersData).
        then(data => data.json()).
        then(response => {
            actualState.current = response;
            setUsers(response.users)
        }).
        catch( error => console.log(error))
    }
    function updateData(){
        fetch(actualState.current.links.next_url).
        then(data => data.json()).
        then(response => {
            actualState.current = response;
            if(!actualState.current.links.next_url){
                setIsShowButton(false)
            }
            setUsers(response.users)

            
        }).catch(e => console.log(e.message))
    }
    React.useEffect(() => {
        fetchUsersData();
    },[])
    React.useEffect(() => {
        fetchPositionsData()
    },[])
    return (
        <>
        <UsersBlock users={users} updateData={updateData} isShowButton={isShowButton}/>
        <FormBlock scrollToComponent={scrollToComponent} token={token} updateData={fetchUsersData} personalId={positions.length?positions[3].id:''}/>
        </>
    )

}