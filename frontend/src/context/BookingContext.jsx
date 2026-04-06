import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useSocket } from './SocketContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { socket } = useSocket();

  const fetchRooms = async () => {
    try {
      const { data } = await API.get('/rooms');
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/bookings/my');
      setMyBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      setMyBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const { data } = await API.post('/bookings', bookingData);
      setMyBookings([...myBookings, data]);
      if (socket) {
        socket.emit('roomBooked', data);
      }
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const { data } = await API.delete(`/bookings/${id}`);
      setMyBookings(myBookings.map(b => b._id === id ? { ...b, status: 'cancelled' } : b));
      if (socket) {
        socket.emit('roomBooked', { id, status: 'cancelled' });
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('roomUpdated', (data) => {
        fetchRooms(); // Refresh rooms list for all users
      });
    }
  }, [socket]);

  return (
    <BookingContext.Provider value={{ 
      rooms, 
      myBookings, 
      loading, 
      fetchRooms, 
      fetchMyBookings, 
      createBooking, 
      cancelBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
