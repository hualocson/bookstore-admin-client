import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  username: "",
  rank: "",
  expire: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setUser: (state, action) => {
      const { username, rank, expire } = action.payload;

      state.username = username;
      state.rank = rank;
      state.expire = expire;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
