// import {useState} from 'react'
// import { useSelector } from 'react-redux'

// const AutoCompleteSearch = ({selectedUsers , setSelectedUsers,isProducer=false}) => {
//     const {userList} = useSelector(state => state.userReducer);
//     const [search , setSearch] = useState("");
//     const filteredUsers = userList?.filter((user) => user.name.toLowerCase().includes(search.toLocaleLowerCase()));

//     function handleChange(userName){
        
//         if(isProducer){
//             console.log("handle change",userName)
//             setSelectedUsers([userName])   
//         } else {
//             setSelectedUsers((prev) => 
//                 prev.includes(userName) ? prev.filter((person) => person !== userName) : [...prev , userName]
//             )
//         }     
//         setSearch("");
//     }


//   return (
//     <div>
//           <div>
//             {/* search */}
//             <input className='input-field' type="text" placeholder="Search.."  value={search} onChange={e => setSearch(e.target.value)} style={{width:"50%"}}  />
//             {/* dropdown */}
//             {
//                 search.length ? <>
//                     <div className="auto-complete-dropdown">
//                  {
//                     filteredUsers.map((user) => {
//                         return <div key={user.email} style={{margin:"2px"}}>
//                             <label >
//                             <input type="checkbox" value={user.name} onChange={() => handleChange(user.name)} checked={selectedUsers.includes(user.name)} /> &nbsp;
//                             {user.name}
//                             </label> <br/>
//                             </div>
//                     })
//                  }
//             </div>
//                 </> : ""
//             }
            
//           </div>
//     </div>
//   )
// }

// export default AutoCompleteSearch