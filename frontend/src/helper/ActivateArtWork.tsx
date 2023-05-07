import axios from 'axios';

export function activateArtWork(artWorkID: any) {
  return axios.put(process.env.REACT_APP_BACKEND_URL+`/api/artworks/${artWorkID}/activate`);
}