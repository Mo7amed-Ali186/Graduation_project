/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';

import Iconify from 'src/components/iconify/iconify';

import { getBlogs, deleteBlog } from './BlogReducer';

function BlogHome() {
  const blogsState = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10); // Change this as needed

  useEffect(() => {
    if (blogsState.status === 'idle') {
      dispatch(getBlogs());
    }
  }, [blogsState.status, dispatch]);

  // eslint-disable-next-line no-unused-vars
  const [img, setImage] = useState(null);

  const handleDelete = (id) => {
    console.log('Deleting blog with ID:', id);
    dispatch(deleteBlog(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Blog has been deleted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate('/BlogHome');
      } else {
        alert('An error has occurred');
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  let content;
  if (blogsState.loading) {
    content = <Spinner text="Loading" />;
  } else if (blogsState.status === 'rejected') {
    content = <h2>Error in fetching data {blogsState.error}</h2>;
  } else {
    const { blogs } = blogsState;

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

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
            {currentBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {blog.image ? (
                    <img src={blog.image.secure_url} alt="Uploaded" style={{ maxWidth: '100px' }} />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link
                      to={`/BlogCreateSubCategory/${blog._id}`}
                      className="btn btn-sm btn-primary mx-1"
                    >
                      Add SubCategory
                    </Link>
                    <Link to={`/BlogUpdate/${blog._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(blog._id)}
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
          {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(blogs.length / blogsPerPage)}
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
      <h2>Category Page</h2>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/BlogCreate"
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Create
      </Button>

      {content}
    </div>
  );
}

export default BlogHome;
