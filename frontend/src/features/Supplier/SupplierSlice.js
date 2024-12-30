import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SupplierService from "./SupplierService";

export const getSuppliers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await SupplierService.getSuppliers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const supplierSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default supplierSlice.reducer;
