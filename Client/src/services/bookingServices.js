import { isTokenValid } from "@/lib/auth";
import Cookies from "js-cookie";
import { logout } from "./userServices";
import { format } from "date-fns";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createBooking = async (bookingData) => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({
        name: bookingData.name,
        phone: bookingData.phone,
        date: format(new Date(bookingData.date), "yyyy-MM-dd"),
        time: bookingData.time,
        capacity: bookingData.totalPerson
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Could not book a table: ${error.message}`);
  }
}

const getUserBookings = async () => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    return await result.data.bookings;

  } catch (error) {
    throw new Error(`Could not get user bookings: ${error.message}`);
  }
}

const getPendingBookings = async () => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    return await result.data.bookings;
  } catch (error) {
    throw new Error(`Could not get pending bookings: ${error.message}`);
  }
}

const updateBookingStatus = async (id, status) => {
  if (!isTokenValid()) {
    await logout();
    window.location.href = '/';
    return null;
  }
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      body: JSON.stringify({
        status: status
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong. Please try again.');
    }

    setInterval(() => {
      window.location.reload();
    }, 2500);

    return await result.data.updatedBooking;
  } catch (error) {
    throw new Error(`Could not update booking status: ${error.message}`);
  }
}

export{
  createBooking,
  getUserBookings,
  getPendingBookings,
  updateBookingStatus
}