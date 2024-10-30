import { toast } from "react-toastify";
import { userLogicAddRecentlyActedMovie } from "./user.logics";

export async function getMoviesData(data){
    try {
        console.log("logic fn called")
        const url = data.isMyOwndata ? `${data.myUrl}` : `${data.imdbUrl}/searchIMDB?query=${data.search}`
        const imdbHeaders = {
            'x-rapidapi-key': '57f68575bbmsh783b205447e4fa8p16c696jsn58c36ad95b02',
            // 'x-rapidapi-key': '4e9b43402amsh6dabe02cedef1edp11f478jsne491166ac673',
            'x-rapidapi-host': 'imdb188.p.rapidapi.com'
        }
        
        const myOwnHeaders = {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${data.token}`,
        }
        const getMovies = await fetch(url, {
        method: 'GET', 
        headers: data.isMyOwndata ? myOwnHeaders  : imdbHeaders
    });
    const response = await getMovies.json();
    console.log("logic response",response)
    return response.data       
    } catch (error) {
        toast.error(error.message.toUpperCase());
    }
}

// show movies on homepage
export async function getSampleMoviesData(){
    try {
        console.log("sample fn called")
        const url = `https://imdb188.p.rapidapi.com/api/v1/searchIMDB`
        const imdbHeaders = {
            'x-rapidapi-key': '57f68575bbmsh783b205447e4fa8p16c696jsn58c36ad95b02',
            'x-rapidapi-host': 'imdb188.p.rapidapi.com'
        }
        const getMovies = await fetch(url, {
        method: 'GET', 
        headers: imdbHeaders
    });
    const response = await getMovies.json();
    console.log("logic response",response)
    return response.data       
    } catch (error) {
        toast.error(error.message.toUpperCase());
    }
}

// if the string length is > 23 the truncate the string
export function shrinkTheString(str) {
    if (str.length > 23) {
        return str.slice(0, 23 - 3) + '...';
    }
    return str;
}

// handle image for add new movie 
export async function movieLogicHandleImage(handleImageData){
    try {
        console.log(handleImageData)
        handleImageData.setImageLoading(true);
     const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dxqmt9w7m/image/upload`
     const image = handleImageData.imageFile;
     if(!image){
       toast.warn("image file missing".toUpperCase());
       return
      }
     const data = new FormData()
     data.append("file",image)
     data.append("upload_preset","imdb_project")
     data.append("cloud_name","dxqmt9w7m")

      const imageData = await fetch(cloudinaryUrl , {
      method:"POST",
      body:data
     })

     const uploadedImageResponse = await imageData.json()
     console.log("image",uploadedImageResponse,uploadedImageResponse.url)
     handleImageData.setFormData((prev) => ({...prev , image:uploadedImageResponse.url}))
     handleImageData.setImageLoading(false);
    } catch (error) {
        handleImageData.setImageLoading(false);
      console.log(error)
    }
}

export async function movieLogicAddNewMovie(data){ 
    console.log(data.formData) 
    try {
        if(data.formData.image){
            
            for(const key in data.formData){
                if(!data.formData[key]){
                  toast.warn("please fill all the fields".toUpperCase())
                  return
                }
            }
          
              if(!data.formData.stars.length){
                toast.warn("please fill all the fields".toUpperCase());
                return
              }
          
              if(!data.formData.producer.length){
                toast.warn("please fill all the fields".toUpperCase());
                return
              }

           const starsId = data.formData.stars.map((star) => star._id);   
           const producerId = data.formData.producer[0]._id;
           data.formData.stars =   starsId; 
           data.formData.producer =   producerId; 
        //    console.log("*******",data.formData)

         const addNewMovie = await fetch(`${data.url}/register_movie`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${data.token}`
            },
            body: JSON.stringify(data.formData),
         });
         
         const response = await addNewMovie.json();

         const latestMovie = response.movies.reverse();
         console.log("post movie",response.movies)
         const recentlyActedPayload = {
            myUrl:data.userUrl,
            starsId:starsId ,
            producerId:producerId,
            token:data.token,
            movieId:latestMovie[0]._id,
            setSelectedUsers:data.setSelectedUsers,
            setSelectedProducer:data.setSelectedProducer,
            setFormData:data.setFormData,
            ref:data.inputRef,
            navigate:data.navigate
         }
         userLogicAddRecentlyActedMovie(recentlyActedPayload)
        
         return response.movies
        } else {
            return toast.warn("please select the image".toUpperCase());
        }
        
    } catch (error) {
        console.log("adding new movie failed",error);
        toast.error("adding new movie failed".toUpperCase());
    }      
}

// logics to get movies create by me
export async function movieLogicGetMoviesCreatedByMe(data){
    try {
        const getAllMovie = await fetch(`${data.url}/get_all_movies`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${data.token}`
            },            
        });
        const response = await getAllMovie.json();
        console.log("movies from db",response.movies)
        return response.movies 
    } catch (error) {
        toast.error("error in fetching movies data".toUpperCase());
        console.log("error in fetching movies data",error)
    }
}

// incase if we want to categorize the search get additional param(title/actor/director) so we can match the search
export function searchResultOnMyMovies(movies,searchString){
    if(searchString.length){
      const result = movies.filter((movie) => movie.title.includes(searchString));
      return result
    }
    return movies
}