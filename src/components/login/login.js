
import "../register/register.css"
import { useEffect, useState } from "react"
import { useDispatch , useSelector } from "react-redux"
import { getUser } from "../../redux/middleware/user.thunk"
import { Navigate, useNavigate } from "react-router-dom"
import { getMoviesCreatedByMe } from "../../redux/middleware/movie.thunk"
import { toast } from "react-toastify"

const Login = () => {

  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {url,isLoading} = useSelector(state => state.userReducer);
  const {myUrl} = useSelector(state => state.movieReducer);

  const token = sessionStorage.getItem("user");

  function login(){
    const data = {email,password,url};
    dispatch(getUser(data))
    navigate('/')
  }


  if(token){
    return <Navigate to="/" />
  }


  return (
    <div id="register-page">

      <div id="form-container">

        <h2 style={{textAlign:"center"}}> LOGIN </h2>

        <div className="input-container">
         <label htmlFor="name" className="label">EMAIL</label> <br/>
          <input className="input-field" id="email" type="text" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}  required />
        </div>

        <div className="input-container">
        <label htmlFor="name" className="label">PASSWORD</label> <br/>
          <input className="input-field" id="password" type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} required  />
        </div>

        <div>
          <p> <a href="/sign-up">Click here</a> if you don't have an account</p>
        </div>

        <div className="input-container">
          <button className="btn btn-success register-btn"  onClick={login} >LOGIN</button>
        </div>

      </div>
        
    </div>
  )
}

export default Login