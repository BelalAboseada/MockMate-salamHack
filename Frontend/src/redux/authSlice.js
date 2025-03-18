import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

// Async Thunk for Registering
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", userData);

      // Store token & user info
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Network error. Please try again!"
      );
    }
  }
);

// Async Thunk for Logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await apiClient.post("/auth/logout");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    accessToken: sessionStorage.getItem("accessToken") || null,
    isAuthenticated: !!sessionStorage.getItem("accessToken"),
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload); // Show error notification
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export default authSlice.reducer;
