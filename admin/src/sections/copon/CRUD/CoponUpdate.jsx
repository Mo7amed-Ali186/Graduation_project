import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateCoupon } from './CoponReducer';

function CoponUpdate() {
  const { id } = useParams();
  // eslint-disable-next-line eqeqeq
  console.log(`updating coupon with id!!! ${id}`);
  const couponState = useSelector((state) => state.coupons);
  console.log(couponState);

  const coupon = couponState.coupons.find((b) => b._id === id);
  console.log(coupon);

  const { name, amount } = coupon;
  const [uname, setName] = useState(name);
  const [uamount, setAmount] = useState(amount);
  const [successMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateCoupon({
        id,
        name: uname,
        amount: uamount,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('coupon has been updated successfully!');
        navigate('/copon');
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
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Edit Copon</h3>
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
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              value={uamount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" className="btn btn-info">
            Update
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default CoponUpdate;
