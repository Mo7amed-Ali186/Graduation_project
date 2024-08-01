import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;
const baseUrl = import.meta.env.VITE_BASE_API_URL;

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const config = {
      method: 'post',
      url: `${baseUrl}/auth/logInAdmin`,
      headers,
      data: { email, password },
    };

    console.log(config);

    // Send the request using Axios
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201 || response.status === 202) {
        localStorage.setItem('userToken', `${response.data.token}`);
        dispatch(authSlice.actions.loginSuccess()); // dispatch action to update login state
        return response.data;
      }

      throw new Error(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { loginSuccess } = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Define selector
