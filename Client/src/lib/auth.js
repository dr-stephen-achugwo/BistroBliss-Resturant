import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const getIsAdmin = (token) => {
  if (!token) {
    return false;
  }
  try {
    const { isAdmin } = jwtDecode(token);
    return isAdmin;
  } catch (error) {
    console.error("Token decoding error",error);
    return false;
  }
  
}

const getUsername = () => {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  try {
    const { username } = jwtDecode(token);
    return username;
  } catch (error) {
    console.error("Token decoding error",error);
    return null;
  }
  
}

const isTokenValid = () => {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  }
  try {
    const { exp } = jwtDecode(token);
    return (exp * 1000) > Date.now();
  } catch (error) {
    console.error("Token decoding error",error);
    return false;
  }
  
}

export { getIsAdmin, getUsername, isTokenValid };