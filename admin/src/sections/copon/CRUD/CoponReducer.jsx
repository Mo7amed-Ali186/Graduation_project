import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

// eslint-disable-next-line arrow-body-style
export const getCoupons = createAsyncThunk('coupons/getCoupons', () => {
  return axios.get(`${baseUrl}/coupon`).then((res) => res.data.coupon);
});
export const deleteCoupon = createAsyncThunk(
  'brands/deleteCoupon',
  async (id, { rejectWithValue }) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // eslint-disable-next-line no-debugger
     
    const config = {
      method: 'delete',
      url: `${baseUrl}/coupon/${id}`,
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
export const updateCoupon = createAsyncThunk(
  'coupons/updateCoupon',
  async ({ id, name, amount }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);

    const headers = {
      'Content-Type': 'multipart/form-data', // Set the Content-Type header
      Authorization: `Bearer ${token}`,
      // Set the Authorization header
    };

    // Define request configuration object
    const config = {
      method: 'put',
      url: `${baseUrl}/coupon/${id}`,
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

export const addCoupon = createAsyncThunk(
  'coupons/addCoupon',
  async ({ name, amount, expireDate }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('expireIn', expireDate);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
,
    };

    const config = {
      method: 'post',
      url: `${baseUrl}/coupon`,
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
  coupons: [],
  loading: false,
  status: 'idle',
  error: null,
};

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCoupon.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(updateCoupon.fulfilled, (state, action) => {
      state.status = 'idle';
    });

    builder.addCase(getCoupons.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.coupons = action.payload;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      state.loading = false;
      state.coupons = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const selectAllCoupons = (state) => state.coupons;
export default couponSlice.reducer;
