import { isTokenValid } from "@/lib/auth";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signUp = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        password: data.password,
        isAdmin: data.admin,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Something went wrong. Please try again.");
    }

    // * Save token to a cookie (valid for 7 days)
    Cookies.set("token", result.data.token, { expires: 7, secure: true });

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);

  } catch (error) {
    throw new Error(error.message);
  }
}

const login = async (data) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong. Please try again.");
    }

    Cookies.set("token", result.data.token.token);

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);

  } catch (error) {
    throw new Error(error.message);
  }
}

const logout = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  } 
  catch (error) {
    console.error('Logout failed', error);
  }
};

const getProfile = async () => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/users/profile`, { 
      credentials: 'include',
      headers: { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      } 
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    return result;
  } 
  catch (error) {
    throw new Error(error.message);
  }
};

const updateProfile = async (data) => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    } 

    Cookies.set("token", result.data.token, { expires: 7, secure: true });

    setTimeout(() => {
      window.location.reload();
    }, 2500);

  }
  catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/users`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }
    return result.data.users;
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  signUp,
  login,
  logout,
  getProfile,
  updateProfile,
  getAllUsers
}