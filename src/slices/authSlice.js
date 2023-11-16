import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  refreshToken,
  register,
  sendMessageToAllUsers,
  sendMessageToUser,
} from '../thunks/authThunk';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(sendMessageToAllUsers.fulfilled, (state, action) => {
        // Handle the success message as needed
      })
      .addCase(sendMessageToUser.fulfilled, (state, action) => {
        // Handle the success message as needed
      });
  },
});

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
