import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const __getComments = createAsyncThunk(
//   "comments/getComments",
//   async (payload, thunkAPI) => {
//     try {
//       const data = await axios.get(
//         `http://52.79.247.187:8080/api/posts/${payload}`
//       );
//       console.log(data);
//       return data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

export const comments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    createComment(state, action) {
      state.comments.push(action.payload);
      axios.post("http://52.79.247.187:8080/api/auth/comments");
    },
    removeComment(state, action) {
      let index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comments.splice(index, 1);
      axios.delete(
        `http://52.79.247.187:8080/api/auth/comments/${action.payload}`
      );
    },
    updateComment(state, action) {
      let index = state.comments.findIndex(
        (post) => post.id === action.payload.id
      );
      state.comments.splice(index, 1, action.payload);
      axios.patch(
        `http://52.79.247.187:8080/api/auth/comments/${action.payload.id}`,
        action.payload
      );
    },
  },
  // extraReducers: {
  //   [__getComments.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [__getComments.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.comments = action.payload;
  //   },
  //   [__getComments.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});

export let { createComment, removeComment, updateComment } = comments.actions;

export default comments;
