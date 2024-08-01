/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getProducts, deleteProduct } from './ProductReducer';

function ProductHome() {
  const productsState = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [, setPrimImage] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Change this as needed

  useEffect(() => {
    if (productsState.status === 'idle') {
      dispatch(getProducts());
    }
  }, [productsState.status, dispatch]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPrimImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    console.log('Deleting product with ID:', id);
    dispatch(deleteProduct(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Product has been deleted successfully!');
      } else {
        toast.error('An error has occurred');
      }
    });
  };

  let content;
  if (productsState.loading) {
    content = <Spinner text="Loading" />;
  } else if (productsState.status === 'rejected') {
    content = <h2>Error in fetching data {productsState.error}</h2>;
  } else {
    const { products } = productsState;

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  {product.mainImage ? (
                    <img
                      src={product.mainImage.secure_url}
                      alt="Uploaded"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.categoryId?.name}</td>
                <td>{product.subCategoryId?.name}</td>
                <td>{product.brandId?.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/ProductUpdate/${product._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination" style={{ gap: '3px' }}>
          <button
            style={{ gap: '20px' }}
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
            <button
              style={{
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                padding: '10px',
                marginRight: '5px',
                transition: 'background-color 0.3s ease',
                backgroundColor: currentPage === i + 1 ? '#224f34' : 'transparent',
                color: currentPage === i + 1 ? 'white' : 'black',
              }}
              type="button"
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={{ gap: '20px' }}
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          >
            Next
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <h2>Products Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/ProductCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {content}
      <Toaster />
    </div>
  );
}

export default ProductHome;
