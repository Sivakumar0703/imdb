import {useState} from 'react'
import { useSelector } from 'react-redux'

const AutoCompleteSearch = ({selectedUsers , setSelectedUsers,isProducer,setFormData}) => {
    const {userList} = useSelector(state => state.userReducer);
    const [search , setSearch] = useState("");
    const filteredUsers = userList?.filter((user) => user.name.toLowerCase().includes(search.toLocaleLowerCase()));

    function handleChange(user){
        
        if(isProducer){
            console.log("handle change",user)
            setSelectedUsers([user]) 
            setFormData((prev) => ({...prev , producer:[user]}))  
        } else {
            setSelectedUsers((prev) => 
                prev.some((storedUser) => storedUser.email === user.email) ? 
                prev.filter((storedUser) => storedUser.email !== user.email) :                  
                [...prev , user])

                if(selectedUsers.some((storedUser) => storedUser.email === user.email)){
                    const updatedActorList = selectedUsers.filter((prev) => prev.email !== user.email )
                    setFormData((prev) => ({...prev,stars:updatedActorList}))
                } else {
                    setFormData((prev) => ({...prev,stars:[...selectedUsers , user]}))
                }
        }     
        setSearch("");
    }


  return (
    <div>
          <div>
            {/* search */}
            <input className='input-field' type="text" placeholder="Search.."  value={search} onChange={e => setSearch(e.target.value)} style={{width:"50%"}}  />
            {/* dropdown */}
            {
                search.length ? <>
                    <div className="auto-complete-dropdown">
                 {
                    filteredUsers.map((user) => {
                        return <div key={user.email} style={{margin:"2px"}}>
                            <label >
                            <input type="checkbox" value={user.name} onChange={() => handleChange(user)} checked={selectedUsers.some(storedUser => storedUser.name === user.name)} /> &nbsp;
                            {user.name}
                            </label> <br/>
                            </div>
                    })
                 }
            </div>
                </> : ""
            }
            
          </div>
    </div>
  )
}

export default AutoCompleteSearch