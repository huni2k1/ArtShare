import axios from "axios"
async function GetCategories(){
    return axios.get(process.env.REACT_APP_BACKEND_URL+"/api/categories").then(response=>{
        return response.data
    })
}
export default GetCategories