import axios from "axios";

function follow(followerID: any, followeeID: any) {
    console.log(followerID,followeeID)
    axios.post(process.env.REACT_APP_BACKEND_URL+"/api/relationships", { followeeID: followerID,followerID:followeeID }).then(response => {
        return response.data
    })
}
export default follow