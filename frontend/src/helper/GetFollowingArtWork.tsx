import axios from "axios"

async function getFollowingArtWork(artWork:any){
    axios.get(process.env.REACT_APP_BACKEND_URL+"/api/relationships/"+localStorage.getItem("userID")).then(response=>{
        console.log(response.data)
    })
     
}
export default getFollowingArtWork