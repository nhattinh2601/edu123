import { createSlice } from '@reduxjs/toolkit';
import { forgetPassword } from '../thunks/authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    resetPasswordStatus: 'idle',
    resetPasswordError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.resetPasswordStatus = 'loading';
        state.resetPasswordError = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.resetPasswordStatus = 'succeeded';
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.resetPasswordStatus = 'failed';
        state.resetPasswordError = action.error.message;
      });
  },
});

export default authSlice.reducer;
