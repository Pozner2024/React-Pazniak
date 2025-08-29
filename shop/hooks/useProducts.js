import { useSelector, useDispatch } from 'react-redux';
import { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  setLoading,
  setError 
} from '../store/slices/productsSlice';
import { 
  selectProducts, 
  selectProductsLoading, 
  selectProductsError,
  selectProductById 
} from '../store/slices/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const initializeProducts = (productsData) => {
    dispatch(setProducts(productsData));
  };

  const createProduct = (productData) => {
    dispatch(addProduct(productData));
  };

  const editProduct = (id, updatedProduct) => {
    dispatch(updateProduct({ id, updatedProduct }));
  };

  const removeProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProductsLoading = (isLoading) => {
    dispatch(setLoading(isLoading));
  };

  const setProductsError = (errorMessage) => {
    dispatch(setError(errorMessage));
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  return {
    products,
    loading,
    error,
    initializeProducts,
    createProduct,
    editProduct,
    removeProduct,
    setProductsLoading,
    setProductsError,
    getProductById,
  };
};
