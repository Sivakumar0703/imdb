import {useState} from 'react'
import { registerUser, userLogicsTogglePage, userLogicsValidateInputDiv } from '../../logics/user.logics'
import { getAllUser } from '../../redux/middleware/user.thunk';
import { useDispatch, useSelector } from 'react-redux';

const InputComponent = () => {

  const token = sessionStorage.getItem("user");
  const today = new Date().toISOString().split("T")[0];
  const [newPerson , setNewPerson] = useState({name:"",email:"",password:"",bio:""});
  const dispatch = useDispatch();
  const {userList,url} = useSelector(state => state.userReducer);

  console.log("user-list",userList)


  function handleChange(e){
    setNewPerson(prev => ({...prev , [e.target.name]:e.target.value}))
  }

  
// const validateFirstDiv = (block) => {
//     const firstDiv = document.getElementById(block);
//     const inputs = firstDiv.querySelectorAll('input');
//     for (let input of inputs) {
//         if (!input.checkValidity()) {
//             input.reportValidity();
//             return false;
//         }
//     }
//     return true;
// };

//     async function register(e){
//         e.preventDefault();
//      if(userLogicsValidateInputDiv("block2")){
//         const closeModalButton = document.getElementById("close-the-modal");
//         console.log("function called")
//         console.log("form-data",newPerson)
//         registerUser(url,newPerson); // register new actor/producer in db
//         let data = {url:url,token:token}
//         dispatch(getAllUser(data)); // receive update user list to choose the new actor/producer
//         closeModalButton?.click(); // close the modal
//     }  
//   }

  async function register(e){
    try {
        e.preventDefault();
        if(userLogicsValidateInputDiv("block2")){
        const closeModalButton = document.getElementById("close-the-modal");
        console.log("function called")
        console.log("form-data",newPerson)
        let registerationResult = await registerUser({url,data:newPerson}); // register new actor/producer in db
        let data = {url:url,token:token};
        if(registerationResult){
            dispatch(getAllUser(data)); // receive update user list to choose the new actor/producer
            closeModalButton?.click(); // close the modal
        }     
        }    
    } catch (error) {
        console.log(error)
    }
  }

//   function togglePage(e){
//     if(userLogicsValidateInputDiv("block1")){
//     const isBlock2Active = e.target.value == "next" ? true : false;
//     const block1 = window.document.getElementById("block1");
//     const block2 = window.document.getElementById("block2");
//     block1.style.display = isBlock2Active ? "none" : "block";
//     block2.style.display = isBlock2Active ? "block" : "none";
//     }
//   }


  return (
    <div id="register-page" style={{minHeight:"auto"}}>

    <div id="form-container">

      <form action='#' onSubmit={register}>

      <div id="block1">
      <div className="input-container">
        <label htmlFor="username" className="label">USERNAME</label> <br/>
        <input className="input-field" 
        id="username" type="text" 
        placeholder="Username" 
        name="name" value={newPerson.name} 
        onChange={handleChange} 
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
        value={newPerson.email} 
        autoComplete="off"
        onChange={handleChange}
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
        value={newPerson.password} 
        onChange={handleChange}           
        required  />
      </div>

      <div>
        <p style={{marginBottom:"0px"}}>GENDER</p> 
        <label>  <input type="radio" name="gender" value="male" required  onChange={handleChange}/> Male   </label> &nbsp;
        <label>  <input type="radio" name="gender" value="female" required onChange={handleChange} /> Female   </label> &nbsp; 
        <label>  <input type="radio" name="gender" value="others" required onChange={handleChange} /> Others   </label> 
      </div>

      <div>
          <button type='button' className="btn btn-primary register-btn" value="next" onClick={(e) => userLogicsTogglePage(e)}>NEXT</button>
      </div>
      </div>

      <div id="block2">

       <div>
       <label htmlFor="dob" className="label">DATE OF BIRTH</label> <br/>
       <input type="date" name="dob" id="dob" max={today} required onChange={handleChange} style={{padding:"5px",width:"100%",borderRadius:"5px"}} />
       </div> <br/>

       <div>
        <p style={{marginBottom:"0px"}}>CATEGORY</p> 
        <label htmlFor="category-actor">  <input type="radio" id="category-actor" name="category" value="actor" required onChange={handleChange} /> ACTOR   </label> &nbsp; 
        <label htmlFor="category-producer">  <input type="radio" id="category-producer" name="category" value="producer" required onChange={handleChange} /> PRODUCER   </label> 
       </div>  <br/>

       <div>
       <label htmlFor="bio" className="label">BIO</label> <br/>
       <textarea value={newPerson.bio} name="bio" id="bio" minLength="200" rows="4" placeholder='Write Your Bio' required onChange={handleChange} style={{padding:"5px"}}>  </textarea> 
       </div>  <br/>  

       <div>
       <button type='button' className="btn btn-warning register-btn" id="back-btn" value="previous" onClick={(e) => userLogicsTogglePage(e)}>GO TO PREVIOUS PAGE</button>
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

export default InputComponent