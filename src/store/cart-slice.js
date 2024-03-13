import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const initialCartState = {
  items: [],
  totalCartQuantity: 0,
  totalCartAmount: 0,
  changed: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    replaceCartData(state, action) {
      state.items = action.payload.items;
      state.totalCartQuantity = action.payload.totalCartQuantity;
      state.totalCartAmount = action.payload.totalCartAmount;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if(!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
      state.changed = true;
      state.totalCartQuantity++;
      state.totalCartAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find(item => item.id === id);
      if(existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      } else {
        state.items = state.items.filter(item => item.id !== id);
      }
      state.changed = true;
      state.totalCartQuantity--;
      state.totalCartAmount -= existingItem.price;
    }
  }
});

export const cartActions = cartSlice.actions;

export const storeCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }));

    const sendRequest = async () => {
      const response = await fetch('https://redux-practice-52d31-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalCartQuantity: cart.totalCartQuantity,
          totalCartAmount: cart.totalCartAmount
        })
      });

      if(!response.ok) {
        throw new Error('Failed to send card Data');
      }
    }

    try {
      await sendRequest();
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sent Cart data successfully.'
      }));
    } catch(error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }));
    }
  }
};

export const getCartData = () => {
  return async dispatch => {
    const fetchData = async () => {
      const response = await fetch('https://redux-practice-52d31-default-rtdb.firebaseio.com/cart.json');

      if(!response.ok) {
        throw new Error('Failed to fetch data!')
      }
      const resData = await response.json(); 
      return resData;
    }
    try {
      const cart = await fetchData();
      dispatch(cartActions.replaceCartData({
        items: cart.items || [],
        totalCartQuantity: cart.totalCartQuantity,
        totalCartAmount: cart.totalCartAmount
      }));
    } catch(error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: error.message
      }));
    }
  }
};

export default cartSlice.reducer;