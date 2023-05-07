import axios from 'axios';

export function activateUser(userId: any) {
  return axios.put(process.env.REACT_APP_BACKEND_URL+`/api/users/${userId}/activate`);
}