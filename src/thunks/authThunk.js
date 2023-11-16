import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../api/axiosClient';

export const login = createAsyncThunk('auth/login', async (loginRequest) => {
  const response = await axiosClient.post('/auth/login', loginRequest);
  return response.data;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (refreshTokenRequest) => {
  const response = await axiosClient.post('/auth/refresh-token', refreshTokenRequest);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userCreateDto) => {
  const response = await axiosClient.post('/auth/register', userCreateDto);
  return response.data;
});

export const sendMessageToAllUsers = createAsyncThunk('auth/sendMessageToAllUsers', async (messageDto) => {
  const response = await axiosClient.post('/auth/send/message/all-users', messageDto);
  return response.data;
});

export const sendMessageToUser = createAsyncThunk('auth/sendMessageToUser', async ({ mail, messageDto }) => {
  const response = await axiosClient.post(`/auth/send/message/${mail}`, messageDto);
  return response.data;
});
