import axios from "axios";

function GetUserName (userID:String){
    return axios.get(process.env.REACT_APP_BACKEND_URL+"/api/users/"+userID).then(response=>{
        return response.data.name
    }).catch(err=>console.log(err))
}
export default GetUserName