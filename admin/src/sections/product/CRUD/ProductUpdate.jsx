/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
/* eslint-disable jsx-a11y/label-has-associated-control */
import Select from 'react-select';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies

import { updateProduct } from './ProductReducer';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
const token = localStorage.getItem('userToken');

const getCategoryOptions = async () => {
  const response = await axios(`${baseUrl}/category`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { categories } = await response.data;
  return categories.map((c) => ({ label: c.name, value: c._id }));
};

function ProductUpdate() {
  const { id } = useParams();
  // eslint-disable-next-line eqeqeq, no-debugger
  const productsState = useSelector((state) => state.products);
  console.log(productsState);

  const product = productsState.products.find((b) => b._id === id);
  console.log(product);

  let categoryOptions = [];
  getCategoryOptions().then((res) => {
    categoryOptions = res;
  });

  console.log(categoryOptions);

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

  const { name, price, stock, discount, colors, size } = product;

  const [uname, setName] = useState(name);
  const [uprimImg, setPrimImg] = useState(null);
  const [uSubImages, setSubImages] = useState([]);
  const [selectedColors, setSelectedColors] = useState(
    colors.map((color) =>
      colors[color] ? { label: color, value: color } : { label: color, value: color }
    )
  );
  const [selectedSizes, setSelectedSizes] = useState(
    size.map((s) => (size[s] ? { label: s, value: s } : { label: s, value: s }))
  );
  const [uprice, setPrice] = useState(price);
  const [ustock, setStock] = useState(stock);
  // const [ucategoryId, setCategoryId] = useState(categoryId.id);
  // const [ubrandId, setBrandId] = useState(brandId._id);
  // const [usubCategoryId, setSubCategoryId] = useState(subCategoryId._id);
  const [udiscount, setDiscount] = useState(discount);
  const [successMessage] = useState('');

  console.log(selectedSizes);
  console.log(selectedColors);

  const dispatch = useDispatch();

  const productToUpdate = {
    id,
    name: uname,
    mainImage: uprimImg,
    subImages: uSubImages,
    price: uprice,
    stock: ustock,
    // brandId: ubrandId,
    // categoryId: ucategoryId,
    // subCategoryId: usubCategoryId,
    discount: udiscount,
    sizes: selectedSizes.map((item) => item.value),
    colors: selectedColors.map((item) => item.value),
  };

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateProduct(productToUpdate)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('product has been updated successfully!');
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
          <h3>Edit Product</h3>
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
                value={uname}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="primImg">Image :</label>
              <input
                type="file"
                id="primImg"
                name="primImg"
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
                className="form-control"
                value={ustock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* <div>
              <label htmlFor="categoryId">Category ID:</label>
              <input
                type="text"
                id="categoryId"
                name="categoryId"
                className="form-control"
                value={ucategoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </div> */}

            {/* <div>
              <label htmlFor="subCategoryId">Sub-Category ID:</label>
              <input
                type="text"
                id="subCategoryId"
                name="subCategoryId"
                className="form-control"
                value={usubCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
              />
            </div> */}

            {/* <div>
              <label htmlFor="brandId">Brand ID:</label>
              <input
                type="text"
                id="brandId"
                name="brandId"
                className="form-control"
                value={ubrandId}
                onChange={(e) => setBrandId(e.target.value)}
              />
            </div> */}

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
                options={sizeOptions}
                value={selectedSizes}
                required
                isMulti
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
                options={colorOptions}
                value={selectedColors}
                required
                isMulti
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
              Update
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </Container>
  );
}

export default ProductUpdate;
