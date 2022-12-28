
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },
        hideMiniCart(state) {
            state.hideMiniCart = false;
        },
        addToCart(state, action) {
            // newItems = { id, product, quantity }
            const newItem = action.payload;
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);

            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
                console.log(state.cartItems[index])
            } else {
                state.cartItems.push(newItem)
            }

        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;

            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },

        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            state.cartItems = state.cartItems.filter((x => x.id !== idNeedToRemove))
        }
    }
})

const { actions, reducer } = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions;
export default reducer;
