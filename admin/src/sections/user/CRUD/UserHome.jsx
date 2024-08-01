import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getUsers } from './UserReducer';

function UserHome() {
  const usersState = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usersState.status === 'idle') {
      dispatch(getUsers());
    }
  }, [usersState.status, dispatch]);

  let content;
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Change this as needed

  if (usersState.loading) {
    content = <Spinner text="Loading" />;
  } else if (usersState.status === 'rejected') {
    content = <h2>Error in fetching data {usersState.error}</h2>;
  } else {
    const { users } = usersState;

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`/UserUpdate/${user._id}`} className="btn btn-sm btn-primary">
                    Edit
                  </Link>
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
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          >
            Next
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container">
      <h2>Users Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/UserCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>
      {content}
    </div>
  );
}

export default UserHome;
