/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { addProduct } from './ProductReducer';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

function ProductCreate() {
  // eslint-disable-next-line eqeqeq, no-debugger

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      try {
        const res = await axios.get(`${baseUrl}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const Options = res.data.categories.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        console.log(Options);
        setCategoryOptions(Options);
      } catch (error) {
        console.error('Error fetching category options:', error);
      }
    };
    const fetchBrandOptions = async () => {
      try {
        const res = await axios.get(`${baseUrl}/brand`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const Options = res.data.brand.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }));
        console.log(Options);
        setBrandOptions(Options);
      } catch (error) {
        console.error('Error fetching category options:', error);
        console.error('Error fetching brand options:', error);
      }
    };

    fetchCategoryOptions();
    fetchBrandOptions();
  }, []);

  const handleCategoryChange = async (selectedOption) => {
    console.log(selectedOption);
    setSelectedCategory(selectedOption);
    const res = await axios.get(`${baseUrl}/category/${selectedOption.value}/subcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const Options = res.data.subCategories.map((subcategory) => ({
      label: subcategory.name,
      value: subcategory._id,
    }));
    console.log(Options);
    setSubCategoryOptions(Options);
  };
  const handleBrandChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedBrand(selectedOption);
  };
  const handleSubCategoryChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedSubCategory(selectedOption);
  };

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Black', value: 'black' },
    { label: 'White', value: 'white' },
    { label: 'Brown', value: 'brown' },
  ];

  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'X-Large', value: 'x-large' },
    { label: 'XX-Large', value: 'xx-large' },
    { label: 'XXX-Large', value: 'xxx-large' },
  ];

  const [uname, setName] = useState('');
  const [uprimImg, setPrimImg] = useState(null);
  const [uSubImages, setSubImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [uprice, setPrice] = useState('');
  const [ustock, setStock] = useState('');
  const [uDescription, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [udiscount, setDiscount] = useState('');
  const [successMessage] = useState('');

  console.log(selectedColors);

  const dispatch = useDispatch();

  const productToCreate = {
    name: uname,
    mainImage: uprimImg,
    subImages: uSubImages,
    price: uprice,
    stock: ustock,
    brandId: selectedBrand,
    categoryId: selectedCategory,
    subCategoryId: selectedSubCategory,
    description: uDescription,
    discount: udiscount,
    sizes: selectedSizes.map((item) => item.value),
    colors: selectedColors.map((item) => item.value),
  };

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(addProduct(productToCreate)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('product has been created successfully!', {
          duration: 5000,
        });
        navigate('/products');
      } else {
        const errors = res.payload.response.data.details;
        let errorMessage = '';
        errors.forEach((error) => {
          errorMessage += `${error.message}\n`;
        });
        toast.error(`${res.payload.response.data.globalMessage}\n${errorMessage}`);
      }
    });
  };

  const handleSubImageChange = (e) => {
    const { files } = e.target;
    setSubImages(Array.from(files));
    // You can handle these subImages however you need, perhaps uploading to a server or storing locally.
    console.log(uSubImages);
  };

  return (
    <Container style={{ marginTop: '200px' }}>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-secondary text-white p-5">
          <h3>Create Product</h3>
          {successMessage && <p style={{ color: '#66ff99' }}>{successMessage}</p>}

          <form onSubmit={handleUpdate}>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
                value={uname}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="description">Description:</label>
              <textarea
                type="txtar"
                required
                id="description"
                name="description"
                className="form-control"
                value={uDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="primImg">Image :</label>
              <input
                type="file"
                id="primImg"
                name="primImg"
                required
                className="form-control"
                onChange={(e) => setPrimImg(e.target.files[0])}
              />
            </div>

            <div>
              <label htmlFor="subImages">Sub-Images:</label>
              <input
                type="file"
                id="subImages"
                
                name="subImages"
                className="form-control"
                multiple // Allows multiple file selection
                onChange={handleSubImageChange} // Handles file selection
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="price">Price :</label>
              <input
                type="number"
                id="price"
                required
                name="price"
                className="form-control"
                value={uprice}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="stock">Stock :</label>
              <input
                type="number"
                id="stock"
                name="stock"
                required
                className="form-control"
                value={ustock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category">Category :</label>
              <Select
                value={selectedCategory}
                required
                options={categoryOptions}
                onChange={handleCategoryChange}
                styles={{
                  option: (base) => ({
                    ...base,
                    color: 'black',
                  }),
                }}
              />
            </div>
            <div>
              <label htmlFor="SubCategory">SubCategory :</label>
              <Select
                value={selectedSubCategory}
                required
                options={subCategoryOptions}
                onChange={handleSubCategoryChange}
                styles={{
                  option: (base) => ({
                    ...base,
                    color: 'black',
                  }),
                }}
              />
            </div>
            <div>
              <label htmlFor="brand">Brand :</label>
              <Select
                defaultValue={brandOptions[0]}
                required
                value={selectedBrand}
                options={brandOptions}
                onChange={handleBrandChange}
                styles={{
                  option: (base) => ({
                    ...base,
                    color: 'black',
                  }),
                }}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="discount">Discount:</label>
              <input
                type="number"
                id="discount"
                name="discount"
                
                className="form-control"
                value={udiscount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="size">Sizes:</label>
              <Select
                isMulti
                options={sizeOptions}
                required
                value={selectedSizes}
                onChange={setSelectedSizes}
                labelledBy="Select"
                styles={{
                  option: (base) => ({
                    ...base,
                    color: 'black',
                  }),
                }}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="color">Colors:</label>
              <Select
                isMulti
                options={colorOptions}
                value={selectedColors}
                required
                onChange={setSelectedColors}
                labelledBy="Select"
                styles={{
                  option: (base) => ({
                    ...base,
                    color: 'black',
                  }),
                }}
              />
            </div>

            <br />

            <button type="submit" className="btn btn-info">
              Create
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default ProductCreate;
