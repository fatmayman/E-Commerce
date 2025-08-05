const API_BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchBrands = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

