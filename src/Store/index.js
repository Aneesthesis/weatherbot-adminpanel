import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./admin-slice";

export const store = configureStore({ reducer: { admin: adminSlice.reducer } });
