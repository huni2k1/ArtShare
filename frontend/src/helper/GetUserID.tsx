import axios from "axios";

function GetUserID(userName:String){
    return axios.get(process.env.REACT_APP_BACKEND_URL+"/api/users/getID/"+userName).then(response=>{
        return response.data.id
    }).catch(err=>console.log(err))
}
export default GetUserID