import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminInfo: localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("adminInfo"))
      : null,
    usersList: [],
    loggedIn: false,
    loading: true,
    error: "",
    api_token: "",
  },

  reducers: {
    setAdminInfo(state, action) {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    setbotToken(state, action) {
      state.api_token = action.payload;
    },

    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },

    setUsers(state, action) {
      state.usersList = action.payload.list;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice;
