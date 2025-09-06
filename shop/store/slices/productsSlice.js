import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex(product => product.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    updateProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.stock = Math.max(0, product.stock - quantity);
      }
    },
    restoreProductStock: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.stock += quantity;
      }
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  restoreProductStock,
} = productsSlice.actions;


export const selectProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId);

export default productsSlice.reducer;
