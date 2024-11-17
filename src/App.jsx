import "./App.css";
import {Header} from './components/Header'
import { Body } from "./components/Body";
import { useEffect } from "react";

function App() {


  // useEffect(()=>{
    // console.log("app reders then after this function is called")
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition((pos)=>{
    //     console.log(pos.coords.latitude);
    //     console.log(pos.coords.longitude);
    //   },(errr)=>{
    //     console.log(errr)
    //   })
    // }
    
  // },[])

  return (
  <>
    <div className="app">
      <Header/>
      <Body/>
    </div>
  </>

)}

export default App;
