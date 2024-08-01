/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getBrands, deleteBrand } from './BrandReducer';

function BrandHome() {
  const brandState = useSelector((state) => state.brands);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(10); // Change this as needed

  useEffect(() => {
    if (brandState.status === 'idle') {
      dispatch(getBrands());
    }
  }, [brandState.status, dispatch]);

  const handleDelete = (id) => {
    console.log('Deleting brand with ID:', id);
    dispatch(deleteBrand(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Brand has been deleted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate('/BrandHome');
      } else {
        toast.error('An error has occurred');
      }
    });
  };

  let content;

  if (brandState.loading) {
    content = <Spinner text="Loading" />;
  } else if (brandState.status === 'rejected') {
    content = <h2>Error in fetching data {brandState.error}</h2>;
  } else {
    const { brands } = brandState;

    // Pagination logic
    const indexOfLastBrand = currentPage * brandsPerPage;
    const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
    const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((brand) => (
              <tr key={brand._id}>
                <td>{brand._id}</td>
                <td>{brand.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {brand.image ? (
                    <img
                      src={brand.image.secure_url}
                      alt="brand logo"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    <div>No Image</div>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/BrandUpdate/${brand._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(brand._id)}
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
          {Array.from({ length: Math.ceil(brands.length / brandsPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(brands.length / brandsPerPage)}
          >
            Next
          </button>
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <div className="container">
      <h2>Brands</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/BrandCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {content}
    </div>
  );
}

export default BrandHome;
