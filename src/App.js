import React from "react";
import Header from "./Header/Header";
import PictureBlock from "./PictureBlock/PictureBlock";
import RequestBlocks from "./RequestBlocks/RequestBlocks";

function App() {
  const [token, setToken] = React.useState('');
  
  React.useEffect(() => {
    fetch(process.env.REACT_APP_TOKEN).
    then(data => data.json()).
    then(response => {
      if(response.success){
        setToken(response.token)
      }
    })
  },[])

  function scrollToComponent (element){
    let component = document.querySelector(element)
    component.scrollIntoView({ behavior: "smooth", block: "end"})
}

  return (
    <div className="blocks-container">
      <Header scrollToComponent={scrollToComponent}/>
      <PictureBlock scrollToComponent={scrollToComponent}/>
      <RequestBlocks scrollToComponent={scrollToComponent} token={token}/>
    </div>
  );
}

export default App;
