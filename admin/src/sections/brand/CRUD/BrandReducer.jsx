import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const createAsyncThunk = from require("@reduxjs/toolkit").createAsyncThunk ;

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

export const getBrands = createAsyncThunk('brands/getBrands', () =>
  axios.get(`${baseUrl}/brand`).then((res) => res.data.brand)
);

export const deleteBrand = createAsyncThunk(
  'brands/deleteBrand',
  async (id, { rejectWithValue }) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method: 'delete',
      url: `${baseUrl}/brand/${id}`,
      headers,
    };

    console.log(config);
    // eslint-disable-next-line no-debugger
     

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

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async ({ id, name, img }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    if (img !== null) {
      formData.append('file', img);
    }

    const headers = {
      'Content-Type': 'multipart/form-data', // Set the Content-Type header
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method: 'put',
      url: `${baseUrl}/brand/${id}`,
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

export const addBrand = createAsyncThunk(
  'brands/addBrand',
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
      url: `${baseUrl}/brand`,
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
  brands: [],
  loading: false,
  status: 'idle',
  error: null,
};

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(getBrands.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.brands = action.payload;
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});
export const selectAllBrands = (state) => state.brands;

export default brandSlice.reducer;
