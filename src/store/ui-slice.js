import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  cartVisible: false,
  notification: null,
}

const uiSlice = createSlice({
  name: 'UI',
  initialState: initialUiState,
  reducers: {
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;