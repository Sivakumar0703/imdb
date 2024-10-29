
import "./register.css"
import { useState } from "react"
import { registerUser } from "../../logics/user.logics"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const {url} = useSelector(state => state.userReducer)
  const navigate = useNavigate();

   function register(e){
    e.preventDefault()
    console.log("function called")
    const payload = {
      name,
      email,
      password
    }
    registerUser({url , data:payload});
    navigate('/login');
    setName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div id="register-page">

      <div id="form-container">
        <div>
            <h2>    REGISTERATION    </h2>
        </div>

        <form onSubmit={register}>
        <div className="input-container">
          <label htmlFor="username" className="label">USERNAME</label> <br/>
          <input className="input-field" 
          id="username" type="text" 
          placeholder="Username" 
          name="name" value={name} 
          onChange={e => setName(e.target.value)} 
          autoComplete="off"
          required 
          minLength="3" 
          pattern="^[A-Za-z][A-Za-z0-9]*$" 
          title="user name should only contain alphabets and numbers only"
          />
        </div>

        <div className="input-container">
         <label htmlFor="email" className="label">EMAIL</label> <br/>
          <input className="input-field" 
          id="email"  
          placeholder="Email" 
          type="text"
          name="email" 
          value={email} 
          autoComplete="off"
          onChange={e => setEmail(e.target.value)}
          required />
        </div>

        <div className="input-container">
        <label htmlFor="password" className="label">PASSWORD</label> <br/>
          <input className="input-field" 
          id="password" 
          type="password" 
          placeholder="Password" 
          name="password" 
          autoComplete="off"
          minLength="8"
          value={password} 
          onChange={e => setPassword(e.target.value)}           
          required  />
        </div>

        <div>
          <p> <a href="/login">click here</a> to go login page</p>
        </div>

        <div className="input-container">
          <button className="btn btn-success register-btn" type="submit" >REGISTER</button>
        </div>
        </form>
      </div>
        
    </div>
  )
}

export default Register