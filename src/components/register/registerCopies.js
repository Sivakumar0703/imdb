
import "./register.css"
import { useState } from "react"
import { registerUser } from "../../logics/user.logics"

const Register = () => {

  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const url = "http://localhost:8080/api";
  const today = new Date().toISOString().split("T")[0];

   function register(e){
    e.preventDefault()
    console.log("function called")
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log("form-data",formObject)
    // registerUser(url , formObject);
    // setName("")
    // setEmail("")
    // setPassword("")
  }

  function togglePage(e){
    e.preventDefault();
    const isBlock2Active = e.target.value == "next" ? true : false;
    const block1 = window.document.getElementById("block1");
    const block2 = window.document.getElementById("block2");
    block1.style.display = isBlock2Active ? "none" : "block";
    block2.style.display = isBlock2Active ? "block" : "none";
  }

  return (
    <div id="register-page">

      <div id="form-container">
        <div>
            <h2>    REGISTERATION    </h2>
        </div>

        <form onSubmit={register}>

        <div id="block1">
        <div className="input-container">
          <label htmlFor="username" className="label">USERNAME</label> <br/>
          <input className="input-field" 
          id="username" type="text" 
          placeholder="Username" 
          name="name" value={name} 
          onChange={e => setName(e.target.value)} 
          autoComplete="off" 
          minLength="3" 
          pattern="^[A-Za-z][A-Za-z0-9]*$" 
          title="user name should only contain alphabets and numbers only"
          required
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
          <p style={{marginBottom:"0px"}}>GENDER</p> 
          <label>  <input type="radio" name="gender" value="male" required /> Male   </label> &nbsp;
          <label>  <input type="radio" name="gender" value="female" required /> Female   </label> &nbsp; 
          <label>  <input type="radio" name="gender" value="others" required /> Others   </label> 
        </div>

        <div>
            <button className="btn btn-primary register-btn" value="next" onClick={togglePage}>NEXT</button>
        </div>
        </div>

        <div id="block2">

         <div>
         <label htmlFor="dob" className="label">DATE OF BIRTH</label> <br/>
         <input type="date" name="dob" id="dob" max={today} />
         </div> <br/>

         <div>
          <p style={{marginBottom:"0px"}}>CATEGORY</p> 
          <label htmlFor="category-user">  <input type="radio" id="category-user" name="category" value="user" required /> USER   </label> &nbsp;
          <label htmlFor="category-actor">  <input type="radio" id="category-actor" name="category" value="actor" required /> ACTOR   </label> &nbsp; 
          <label htmlFor="category-producer">  <input type="radio" id="category-producer" name="category" value="producer" required /> PRODUCER   </label> 
         </div>  <br/>

         <div>
         <label htmlFor="bio" className="label">BIO</label> <br/>
         <textarea type="textarea" name="bio" id="bio" minLength="200" rows="4"> </textarea>  
         </div>  <br/>  

         <div>
         <button className="btn btn-warning register-btn" id="back-btn" value="previous" onClick={togglePage}>GO TO PREVIOUS PAGE</button>
         </div>  

         <div className="input-container">
            <button className="btn btn-success register-btn" type="submit" >REGISTER</button>
         </div>

        </div>

        
        </form>
      </div>
        
    </div>
  )
}

export default Register