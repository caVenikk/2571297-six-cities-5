import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchNearbyOffers } from './actions';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type NearbyOffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: NearbyOffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

const nearbyOffersSlice = createSlice({
  name: 'nearbyOffers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchNearbyOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
      });
  },
});

export const nearbyOffersReducer = nearbyOffersSlice.reducer;
