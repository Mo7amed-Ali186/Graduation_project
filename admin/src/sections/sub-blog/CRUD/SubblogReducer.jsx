import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');
// eslint-disable-next-line arrow-body-style
export const getsubBlogs = createAsyncThunk('subblogs/getsubBlogs', (id, { dispatch }) => {
  return axios.get(`${baseUrl}/category/subcategories/all`).then((res) => res.data.subCategories);
});

export const updateSubblog = createAsyncThunk(
  'subblogs/updateSubblog',
  async ({ id, name, img }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    if (img !== null) {
      formData.append('file', img);
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method: 'put',
      url: `${baseUrl}/category/65d491ae7d597cdac7f67bf6/subcategory/${id}`,
      headers,
      data: formData,
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

export const deleteSubBlog = createAsyncThunk(
  'brands/deleteSubBlog',
  async ({ parentId, id }, { rejectWithValue }) => {
    // eslint-disable-next-line no-debugger
     
    const headers = {
      Authorization: `Bearer ${token}`
,
    };

    const config = {
      method: 'delete',
      url: `${baseUrl}/category/subcategories/delete/${id}`,
      headers,
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
      return rejectWithValue('error');
    }
  }
);

export const addSubBlog = createAsyncThunk(
  'blogs/addSubblog',
  async ({ id, name, img }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', img);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
,
    };

    const config = {
      method: 'post',
      url: `${baseUrl}/category/${id}/subcategory`,
      headers,
      data: formData,
    };

    console.log(config);

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

const initialState = {
  subBlogs: [],
  loading: false,
  status: 'idle',
  updated: false,
  error: null,
};

const subblogSlice = createSlice({
  name: 'subblogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateSubblog.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(addSubBlog.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(getsubBlogs.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getsubBlogs.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.subBlogs = action.payload;
    });
    builder.addCase(getsubBlogs.rejected, (state, action) => {
      state.loading = false;
      state.subBlogs = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const selectAllSubBlogs = (state) => state.subBlogs;
export default subblogSlice.reducer;
