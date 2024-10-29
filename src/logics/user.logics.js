import { toast } from "react-toastify"

export  async function registerUser(payload){
    try {
        const response = await fetch(`${payload.url}/register_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.data),
        });
            // response
            // .then((res) => res.json())
            // .then((data) => toast(data.message.toUpperCase()) )
            // .catch(error => {console.log(error.message); toast.error("RESGISTERATION FAILED")})  
           const data =  await response.json()    
           toast(data.message.toUpperCase())
           return true
    } catch (error) {
        console.log(error)
        toast.error("RESGISTERATION FAILED")
    }
        
} 

export async function getUserData(data){
    try {
        let payload = {email:data.email , password:data.password}
      const login = await fetch(`${data.url}/login`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload) 
    });
    const response = await login.json();
    console.log("response",response.userData)
    sessionStorage.setItem("user",response.userData.token);
    toast.success(response.message); 
    return response.userData       
    } catch (error) {
        toast.error(error.message.toUpperCase());
    }
}

export async function getUserDataByToken(data){
    try {
      const getUser = await fetch(`${data.url}/getUser`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${data.token}`
        },
    });
    const response = await getUser.json();
    return response.userData       
    } catch (error) {
        toast.error(error.message.toUpperCase());
    }
}

export async function updateUserByToken(data){
    try {
        const url = data.url;
        const token = data.token;
        delete data.url;
        delete data.token;
        console.log("to backend",data)
      const getUser = await fetch(`${url}/update_user`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        
        body: JSON.stringify(data),
    });
    const response = await getUser.json();
    console.log("response from db",response.updatedUser)
    return response.updatedUser       
    } catch (error) {
        toast.error(error.message.toUpperCase());
    }
}
 
export async function getAllUserByToken(data){
    try {
        console.log("logic called",data.url)
        const getAllUser = await fetch(`${data.url}/get_all_user`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${data.token}`
            },            
        });
        const response = await getAllUser.json();
        return response.userList  
    } catch (error) {
        toast.error(error.message.toUpperCase())
    }
}

// username @ domain . extension
// username(atleast 3 characters) = a-z | A-Z | 0-9 | . | - | _
// domain(atleast 2 charcters) = a-z
// extension = a-z 
export function emailVerification(email){
    const firstOccuranceOfAt = email.indexOf('@');
    const lastOccuranceOfAt = email.lastIndexOf('@');
    const lastOccuranceOfPeriod = email.lastIndexOf('.');
    const username = email.split('@')[0];
    const domainName = email.substring(lastOccuranceOfAt , lastOccuranceOfPeriod);
    const extension = email.substring(lastOccuranceOfPeriod);

    // if @ symbol is used more than once | @ is used as the first character
    if( firstOccuranceOfAt != lastOccuranceOfAt && firstOccuranceOfAt < 3){
        return "improper usage of  @ symbol"
    }

    // checking the length of domain name
    if(!(lastOccuranceOfPeriod > lastOccuranceOfAt + 3) ){
        return "domain name should contain atleast 3 characters"
    }
    
}

// adding new person using input component

 export function userLogicsValidateInputDiv(block){
        const firstDiv = document.getElementById(block);
        const inputs = firstDiv.querySelectorAll('input');
        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }
        return true;
}

export function userLogicsTogglePage(e){
    if(userLogicsValidateInputDiv("block1")){
    const isBlock2Active = e.target.value == "next" ? true : false;
    const block1 = window.document.getElementById("block1");
    const block2 = window.document.getElementById("block2");
    block1.style.display = isBlock2Active ? "none" : "block";
    block2.style.display = isBlock2Active ? "block" : "none";
    }
  }

// add newly acted movie into movie list
// selectedProducer,selectedUsers,movieName:formData.title,movie:lastAddedMovie[0],token,myUrl
export async function userLogicAddRecentlyActedMovie(data){
    try {
        const starsId = data.selectedUsers.map((movieStar) => movieStar._id);
        const producerId = data.selectedProducer[0]._id;
        if(data.movieName == data.movie.title){

            for(let i=0; i<starsId.length; i++){
                let payload = {actorId:starsId[i] , movieId:data.movie._id , isProducer:false }
                await fetch(`${data.myUrl}/update_acted_movie`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${data.token}`
                    },
                    body: JSON.stringify(payload),
                });
            }

            // for producer
            const newData = await fetch(`${data.myUrl}/update_acted_movie`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${data.token}`
                },
                body: JSON.stringify({actorId:producerId , movieId:data.movie._id , isProducer:true}),
            });
            const response = await newData.json();
            return response.users
        } else {
            toast.error("movie title miss match".toUpperCase());
        }
    } catch (error) {
        
    }
}