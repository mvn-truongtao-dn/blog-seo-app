import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface initialStateType {
  works: any[];
}
const works: any[] = [];
const initialState: initialStateType = {
  works,
};

export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    getAllWork: (state, action: PayloadAction<any>) => {
      state.works = [...action.payload];
      // state.works = action.payload;
      console.log('data store', state.works);

      // return action.payload
    },
    addNewWork: (state, action: PayloadAction<any>) => {
      console.log("data create",action.payload);
      state.works = [...state.works, action.payload];
      console.log('data create', state.works);
    },
    updateWork: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      console.log('works', state.works);
      const index = state.works.findIndex(
        (object) => object.id === action.payload.id
      );
      console.log('index', index);
      state.works[index] = { ...state.works[index], ...action.payload.data };
      console.log('update', state.works[index]);
    },
    deleteWork: (state, action: PayloadAction<any>) => {
      console.log(typeof action.payload);

      const index = state.works.findIndex(
        (object) => object.id === action.payload
      );

      console.log(index);
      state.works.splice(index, 1);
    },
  },
});

export const { getAllWork, addNewWork, deleteWork, updateWork } =
  worksSlice.actions;
export default worksSlice.reducer;
