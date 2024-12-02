import { createSlice } from '@reduxjs/toolkit';
import { Cities, SortOption, DEFAULT_SORT_OPTION } from '../../constants';
import { setSortOption, setActiveCity } from '../action';

type CommonState = {
  city: Cities;
  sortOption: SortOption;
};

const initialState: CommonState = {
  city: Cities.Paris,
  sortOption: DEFAULT_SORT_OPTION,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setActiveCity, (state, action) => {
        state.city = action.payload;
        state.sortOption = DEFAULT_SORT_OPTION;
      })
      .addCase(setSortOption, (state, action) => {
        state.sortOption = action.payload;
      });
  },
});

export const commonReducer = commonSlice.reducer;