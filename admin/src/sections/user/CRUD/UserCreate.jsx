/* eslint-disable import/no-extraneous-dependencies */
import Select from 'react-select';
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { addUser } from 'src/sections/user/CRUD/UserReducer';

function UserCreate() {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleChange = (selectedOption) => {
    setRole(selectedOption);
  };

  const roleOptions = [
    {
      label: 'User',
      value: 'User',
    },
    {
      label: 'Admin',
      value: 'Admin',
    },
  ];
  const newUser = {
    userName: name,
    email,
    password,
    cPassword: confirmPassword,
    role,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUser(newUser)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('user has been created successfully!');
        setTimeout(() => {
          navigate('/user');
        }, 1500);
      } else {
        alert(`${res.payload.response.data.globalMessage}`);
      }
    });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              required
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="email"
              className="form-control"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="Confirm Password"
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Role :</label>
            <Select
              defaultValue={roleOptions[0]}
              value={role}
              options={roleOptions}
              onChange={handleRoleChange}
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
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default UserCreate;
