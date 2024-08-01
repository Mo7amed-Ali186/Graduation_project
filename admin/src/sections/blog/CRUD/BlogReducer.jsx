import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line no-debugger

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

// eslint-disable-next-line arrow-body-style
export const getBlogs = createAsyncThunk('blogs/getBlogs', () => {
  return axios
    .get(`${baseUrl}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.categories);
});

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
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
      url: `${baseUrl}/category/${id}`,
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

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const config = {
    method: 'delete',
    url: `${baseUrl}/category/${id}`,
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
    return rejectWithValue(error);
  }
});

export const addSubBlog = createAsyncThunk(
  'blogs/addSubblog',
  async ({ id, name, img }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', img);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
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

export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async ({ name, img }, { rejectWithValue }) => {
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
      method: 'post',
      url: `${baseUrl}/category`,
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

const initialState = {
  blogs: [],
  loading: false,
  status: 'idle',
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSubBlog.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(updateBlog.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(addBlog.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(getBlogs.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.blogs = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const selectAllBlogs = (state) => state.blogs;
export default blogSlice.reducer;
