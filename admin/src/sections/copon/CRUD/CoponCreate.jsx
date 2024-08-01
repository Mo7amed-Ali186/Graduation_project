/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DatePicker } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { addCoupon } from './CoponReducer'; // Importing addBlog action creator from the reducer file

function CoponCreate() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [expireDate, setExpireDate] = useState('');
  const [successMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !amount || !expireDate) {
      toast.error('Please provide all data');
      return;
    }
    if (amount > 100) {
      toast.error('amount be less than or equal to 100');
      return;
    }
    const newCopon = {
      name,
      amount,
      expireDate,
    };

    console.log(newCopon);

    dispatch(addCoupon(newCopon)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('copon has been created successfully!');
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

    setName('');
    setAmount(0);
    setExpireDate('');
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add New Coupon</h3>
        {successMessage && <p style={{ color: '#66ff99' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="amount">Amount :</label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              placeholder="must be less than or equal to 100"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="expireDate">Expiration Date:</label>
            <input
              type="datetime-local"
              title="Please use the format yyyy/mm/dd"
              id="expireDate"
              name="expireDate"
              className="form-control"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </div>

          <br />
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default CoponCreate;
