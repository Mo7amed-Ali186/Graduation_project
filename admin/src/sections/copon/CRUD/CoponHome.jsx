/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getCoupons, deleteCoupon } from './CoponReducer';

function CouponHome() {
  const couponState = useSelector((state) => state.coupons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [couponsPerPage] = useState(10); // Change this as needed

  useEffect(() => {
    if (couponState.status === 'idle') {
      dispatch(getCoupons());
    }
  }, [couponState.status, dispatch]);

  const handleDelete = (id) => {
    console.log('Deleting coupon with ID:', id);
    dispatch(deleteCoupon(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Coupon has been deleted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate('/CoponHome');
      } else {
        toast.error('An error has occurred');
      }
    });
  };

  function convertUtcToLocal(utcTimeString) {
    const utcDate = new Date(utcTimeString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleString(); // Adjust options as needed
  }

  let content;
  if (couponState.loading) {
    content = <Spinner text="Loading" />;
  } else if (couponState.status === 'rejected') {
    content = <h2>Error in fetching data {couponState.error}</h2>;
  } else {
    const { coupons } = couponState;

    // Pagination logic
    const indexOfLastCoupon = currentPage * couponsPerPage;
    const indexOfFirstCoupon = indexOfLastCoupon - couponsPerPage;
    const currentCoupons = coupons.slice(indexOfFirstCoupon, indexOfLastCoupon);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Expire In</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCoupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon._id}</td>
                <td>{coupon.name}</td>
                <td>{coupon.amount}</td>
                <td>{convertUtcToLocal(coupon.expireIn)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/CoponUpdate/${coupon._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(coupon._id)}
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
          {Array.from({ length: Math.ceil(coupons.length / couponsPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(coupons.length / couponsPerPage)}
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
      <h2>Coupons Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/CoponCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {content}
    </div>
  );
}

export default CouponHome;
