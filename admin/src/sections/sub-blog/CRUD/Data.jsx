import axios from 'axios';

// eslint-disable-next-line import/no-mutable-exports
let subblogList = [];
const baseUrl = import.meta.env.VITE_BASE_API_URL;
console.log(baseUrl);

// Function to fetch subcategories
async function fetchSubcategories() {
  try {
    const response = await axios.get(`${baseUrl}/category/65d491ae7d597cdac7f67bf6/subcategory`);
    const subcategories = response.data.subCategories; // Assuming subCategories is the array of subcategories in the response
    console.log(subcategories);
    subblogList = subcategories; // Add subcategories to subblogList
  } catch (error) {
    console.error('Error fetching subcategories:', error.message);
  }
}

// Call the fetchSubcategories function to fetch the subcategories

export { subblogList, fetchSubcategories };
