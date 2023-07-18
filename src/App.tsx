import { useState , useEffect, SetStateAction} from 'react'
import reactLogo from './assets/react.svg'
import './index.css'

function App() {
  const [user,setUSer]=useState("");
  const [password,setPassword]=useState("");
  const [msg,setMsg]=useState("");
  const [error,setError]=useState("");
  const handleInputChange=(e: { target: { value: SetStateAction<string>; }; },type: any)=>{
    switch(type){
      case "user":
        setError("");
        setUSer(e.target.value);
        if(e.target.value===""){
          setError("Username has left blank")
        }
        break;
      case "password" :
        setError("");
        setPassword(e.target.value);
        if(e.target.value===""){
          setError("Username has left blank")
        }
        break;
      default:
    }
  }
  function loginSubmit(){
    if (user !=="" && password != ""){
      var url = "http://localhost:5173/login.php"
      var headres = {
        "Accept":"application/json",
        "Content-type":"application/json"
      }
      var data = {
        user : user,
        password : password
      }
      fetch(url,{
        method:"POST",
        headers:headres,
        body:JSON.stringify(data)
      }).then((response)=>response.json())
      .then((response)=>{
        if(response[0].result !== "invalid username!" || response[0].result !== "invalid password!"){
          setMsg(response[0].result)
        }
        else{
          setError(response[0].result)
        }
      }).catch((error)=>{
        setError(error);
        console.log(error);
      })
    }
    else{
      setError("All field are required!!")
    }
  }
  useEffect (()=>{
    setTimeout(function(){
      setMsg("");
    },5000)
  },[msg])
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form action="" className="login-from">
            <span className="login-form-title">Login</span>
            <span className="login-form-title">
              <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="img" className='img'/>
            </span>
            <div className="wrap-input">
              <input className='input' type="username" value={user} onChange={e =>setUSer(e.target.value)} required/>
              <span className="focus-input" data-placeholder='Email'></span>
            </div>
            <div className="wrap-input">
              <input className='input' type="password"value={password} onChange={e =>setPassword(e.target.value)} required/>
              <span className="focus-input" data-placeholder='password'></span>
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={loginSubmit}>Login</button>
            </div>

            <div className="text-center">
              <span className="text1"></span>
            </div>

          </form>
        </div>
      </div>
    </div>
    
  )
}
 
export default App
