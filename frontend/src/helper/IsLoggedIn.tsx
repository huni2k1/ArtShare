import jwtDecode, { JwtPayload } from 'jwt-decode';

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decodedToken: JwtPayload = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp < Date.now() / 1000) 
          return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
