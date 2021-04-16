import React, { useState } from 'react'
import styled from 'styled-components'
import {FaWhatsapp} from 'react-icons/fa'
import fire from '../firebase'
import {FcGoogle} from 'react-icons/fc'
import  'firebase/auth'
import firebase from 'firebase/app';

const Logo = styled.div`
width : 100%;
height : auto;
text-align : center;
padding-top : 20px
`

const Alldiv = styled.div`
width : 30%;
height : 400px;
margin : 20px auto;

@media (max-width: 768px) {
 width : 100%;
height : 600px;
margin-top : 60px

}
`
function Register() {

   const [open,setopen] = useState(false)
   const [email,setemail] = useState("")
   const [username,setusername] = useState("")
   const [password,setpassword] = useState("")
   const [signerror,setsignerror] = useState("")
   const [Loginerror,setLoginerror] = useState("")

          const Sigin = () => {
            fire.auth().createUserWithEmailAndPassword(email,password).then((User) => {

              return User.user.updateProfile({
                displayName : username
              })


              window.location.reload()
              


            }).catch(err => {
              setsignerror(err.message)
              setemail("")
              setpassword("")
              setusername("")
            })
              
         
          }

        const Login = () => {
        
          fire.auth().signInWithEmailAndPassword(email,password).then(() =>  {
            console.log("giris basarili")
            window.location.reload()
              
          }).catch(err =>  {
            setLoginerror(err.message)
          })
        }



        const onSubmit = () => {
   
          const provider = new firebase .auth.GoogleAuthProvider();

                            
        fire.auth()
        .signInWithPopup(provider)
        .then((result) => {
        console.log(result)
        }).catch((error) => {
        console.log(error)
        });

        }






     

  return (
    <div>
    <Logo>
    <FaWhatsapp style = {{fontSize : "80px",color : "white"}}/>
    </Logo>

    <Alldiv>
        
    {
      open ? (
        <div>
        <h1 style = {{color : "white",textAlign  :"center",paddingTop : "10px",color : "green"}}>Login in</h1>
        <br/>
        <input type = "text" placeholder = "email" className = "form-control" onChange = {(e) => {setemail(e.target.value)}} value = {email}/>
        <br/>
        <input type = "password" placeholder = "password" className = "form-control" onChange = {(e) => {setpassword(e.target.value)}} value = {password}/>
        <br/>
   
     
        <button className = "btn btn-success" style = {{float : "right",marginRight : "30px"}} onClick = {Login}>Login in</button>
        <p style = {{color : "white",fontWeight : "700"}}>You dont have an account? <span style = {{color: "green",cursor : "pointer"}} onClick= {() => {setopen(!open)}}>Sign in</span></p>   
        <p className = "alert alert-danger" style =  {{marginTop : "30px",display : Loginerror ? "block" : "none"}}>{Loginerror}</p>
    
        </div>
      ) :  (
        <div>
        <h1 style = {{color : "white",textAlign  :"center",paddingTop : "10px",color : "green"}}>Sign in</h1>
        <br/>
        <input type = "text" placeholder = "username" className = "form-control" onChange = {(e) => {setusername(e.target.value)}} value = {username}/>
        <br/>
        <input type = "text" placeholder = "email" className = "form-control" onChange = {(e) => {setemail(e.target.value)}} value = {email}/>
        <br/>
        <input type = "password" placeholder = "password" className = "form-control" onChange = {(e) => {setpassword(e.target.value)}} value = {password}/>
        <br/>
       
        
        <button className = "btn btn-success" style = {{float : "right",marginRight : "30px"}} onClick = {Sigin}>Sign in</button>
        <p style = {{color : "white",fontWeight : "700"}}>You have an account? <span style = {{color: "green",cursor : "pointer"}} onClick= {() => {setopen(!open)}}>Login</span></p>
       <p className = "alert alert-danger" style =  {{marginTop : "30px",display : signerror ? "block" : "none"}}>{signerror}</p>
      
      


        </div>
      )
    }
    <button className = "btn btn-primary" style = {{width : "100%",marginTop : "30px"}} onClick = {() => onSubmit()}>
       <FcGoogle/>
       <span style = {{marginLeft : "10px"}}>Google</span>
       </button>

    </Alldiv>






      
    </div>
  )
}

export default Register
