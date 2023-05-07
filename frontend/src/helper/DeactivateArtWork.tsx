import axios from 'axios';

export function deactivateArtWork(artWorkID: any) {
  return axios.put(process.env.REACT_APP_BACKEND_URL+`/api/artworks/${artWorkID}/deactivate`);
}