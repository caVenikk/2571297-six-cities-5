import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers, toggleFavorite, logout } from '../action';
import { RequestError } from '../../types/error';
import { DEFAULT_REQUEST_ERROR } from '../../constants';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: RequestError | null;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

export const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
    })
    .addCase(toggleFavorite.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const offerIndex = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
      }
      state.error = null;
    })
    .addCase(toggleFavorite.rejected, (state, action) => {
      state.error = action.payload ?? DEFAULT_REQUEST_ERROR;
    })
    .addCase(logout.fulfilled, (state) => {
      state.offers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: false,
      }));
    });
});
