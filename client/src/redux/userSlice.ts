import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../apis/axiosInstance";
import { User } from "../utils/types";


interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
};

export const fetchUser=createAsyncThunk('user/fetchUser',async()=> {
   const response=await API.get("/user/validate-me");
       
      return response.data.user || response.data.company;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    await API.post("/auth/logout");
    return null;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
    .addCase(fetchUser.pending, (state)=> {
      state.loading=true;
      state.error=null;
    })
     .addCase(fetchUser.fulfilled, (state, action) => {
       state.user= action.payload;
       state.loading=false;
       state.error=null;
     })

     .addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user";
    })

    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });


  }
});


export default userSlice.reducer;

