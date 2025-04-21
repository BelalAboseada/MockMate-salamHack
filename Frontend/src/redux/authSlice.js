import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

// Async Thunk for Registering
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register", userData);

      // تخزين البيانات في `sessionStorage`
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Registration successful!"); 

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Network error. Please try again!";
      toast.error(errorMessage); 
      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/log-in", userData);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login successful!"); 

      return response.data;
    } catch (error) {
      console.error("API Error:", error);

      const errorMessage = error.response?.data?.Error || "Login failed!";

      return rejectWithValue(errorMessage);
    }
  }
);

// Async Thunk for Logout
export const logoutUser = createAsyncThunk("auth/logout", () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");

  toast.success("Logged out successfully!"); 
 

});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: sessionStorage.getItem("user"),
    accessToken: sessionStorage.getItem("accessToken") || null,
    isAuthenticated: !!sessionStorage.getItem("accessToken"),
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout Case
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });
  },
});



export default authSlice.reducer;
