import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export async function verifyAdmin() {
    try{
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL+"/api/verifyAdmin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return response.data === "Authorized"
    }
    catch(err){
        console.log(err)
        return false
    }
}
