/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateUser } from './UserReducer';

function UserUpdate() {
  const { id } = useParams();
  const usersState = useSelector((state) => state.users);
  // eslint-disable-next-line eqeqeq
  const existingUser = usersState.users.find((f) => f._id === id);
  console.log(existingUser);

  // Initialize state for username, mobile number, and DOB
  const [uname, setName] = useState(existingUser.userName);
  const [mobile, setMobile] = useState(existingUser.mobileNumber || '');
  const [dob, setDOB] = useState(existingUser.DOB || '');
  const {email} = existingUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    // Validate mobile number and DOB format here if needed
    // For simplicity, assuming format validation is done on the backend

    const userToBeUpdated = {
      id,
      userName: uname,
      mobileNumber: mobile,
      DOB: dob,
    };
    // Pass updated user data to the updateUser function
    dispatch(updateUser(userToBeUpdated)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('User has been updated successfully!');
        setTimeout(() => {
          navigate('/user');
        }, 1500);
      } else {
        toast.error(`${res.payload.response.data.globalMessage}`);
      }
    });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Update User</h3>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Username:</label>
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
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              disabled
              name="email"
              className="form-control"
              placeholder={email}
            />
          </div>

          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="form-control"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dob">Date of Birth (YYYY-MM-DD):</label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              id="dob"
              name="dob"
              className="form-control"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
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

export default UserUpdate;
