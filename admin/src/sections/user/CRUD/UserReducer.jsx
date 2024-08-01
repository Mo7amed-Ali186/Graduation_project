import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

// eslint-disable-next-line arrow-body-style
export const getUsers = createAsyncThunk('users/getUsers', () => {
  return axios
    .get(`${baseUrl}/user/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.users);
});

export const updateUser = createAsyncThunk(
  'brands/updateUser',
  async (updatedUser, { rejectWithValue }) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
,
    };
    // eslint-disable-next-line no-debugger
     
    const { id } = updatedUser;
    const { userName, mobileNumber, DOB } = updatedUser;
    const body = {};
    if (userName !== '') {
      body.userName = userName;
    }
    if (mobileNumber !== '') {
      body.mobileNumber = mobileNumber;
    }
    if (DOB !== '') {
      body.DOB = DOB.slice(0, 10);
    }
    const config = {
      method: 'put',
      url: `${baseUrl}/user/${id}`,
      headers,
      data: body,
    };

    console.log(config);

    // Send the request using Axios
    try {
      const response = await axios(config);
      if (response.status === 200 || response.status === 201 || response.status === 202) {
        return response.data;
      }
      throw new Error(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addUser = createAsyncThunk('brands/addUser', async (newUser, { rejectWithValue }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
,
  };
  // eslint-disable-next-line no-debugger
   

  const config = {
    method: 'post',
    url: `${baseUrl}/auth/signUp`,
    headers,
    data: newUser,
  };

  newUser.role = newUser.role.value;

  console.log(newUser);

  // Send the request using Axios
  try {
    const response = await axios(config);
    if (response.status === 200 || response.status === 201 || response.status === 202) {
      return response.data;
    }
    throw new Error(response.data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const initialState = {
  users: [],
  loading: false,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { deleteUser } = userSlice.actions;
export const selectAllUsers = (state) => state.users;
export default userSlice.reducer;
