
import './App.css';
import Navbar from './layouts/Navbar'
import {Context} from './Context'
import { useEffect, useState } from 'react';
import Register from './layouts/Register'
import Home from './Home'
import fire from './firebase'
import {
  BrowserRouter,
  BrowserRouter as Router,

} from "react-router-dom";
function App() {


  const [user,setuser] = useState()
  const [clicktoggle,setclicktoggle] = useState(false) 
  const [allrooms,setallrooms] = useState([])

  const [username,setusername] = useState("")
   
     useEffect(() =>  {
       fire.auth().onAuthStateChanged((token) => {
         if(token){
          setuser(token)
          setusername(token.displayName)
         }else{  
          setuser(null)
         }

       })

     },[])



     useEffect(() =>  {
      fire.firestore().collection("Rooms").onSnapshot(snapshot => (
        setallrooms(snapshot.docs.map(doc => doc.data()))
      ))
    },[])






         
 


      
  return (

<BrowserRouter>
<div className="App">
      <Context.Provider value = {{clicktoggle,setclicktoggle,user,allrooms}}>

        {
          user ? (
            <div>
            <Navbar/>
            <div style = {{width : "100%",height : "60px"}}></div>
            <Home/>
            </div>
          ) : (
            <div>
              <Register/>
            </div>
          )
        }
      </Context.Provider>
    </div>


</BrowserRouter>


  );
}

export default App;
