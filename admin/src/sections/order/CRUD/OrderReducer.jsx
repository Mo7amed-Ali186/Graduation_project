import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

// eslint-disable-next-line arrow-body-style
export const getOrders = createAsyncThunk('orders/getOrders', () => {
  return axios
    .get(`${baseUrl}/order/orders/All`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.order);
});

export const rejectOrder = createAsyncThunk(
  'orders/rejectOrder',
  async (id, { rejectWithValue }) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
,
    };

    const config = {
      method: 'patch',
      url: `${baseUrl}/order/${id}/rejected`,
      headers,
    };

    console.log(config);

    // eslint-disable-next-line no-useless-catch
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
  orders: [],
  loading: false,
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rejectOrder.fulfilled, (state) => {
      state.status = 'idle';
    });
    builder.addCase(rejectOrder.rejected, (state, action) => {
      state.error = action.payload.response.data;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.status = 'working';
      console.log('loading now is true');
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      console.log('loading now is true fulfilled');
      state.status = 'fulfilled';
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.status = 'rejected';
      console.log('loading now is false rejected');
      state.error = action.error.message;
    });
  },
});

export const { deleteOrder } = orderSlice.actions;
export const selectAllOrders = (state) => state.orders;
export default orderSlice.reducer;
