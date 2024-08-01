/* eslint-disable import/no-extraneous-dependencies */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getsubBlogs, deleteSubBlog } from './SubblogReducer';

function SubblogHome() {
  const subBlogsState = useSelector((state) => state.subBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [subBlogsPerPage] = useState(10); // Change this as needed

  useEffect(() => {
    if (subBlogsState.status === 'idle') {
      dispatch(getsubBlogs());
    }
  }, [subBlogsState.status, dispatch]);

  const handleDelete = (parentId, id) => {
    console.log('Deleting sub-blog with ID:', id);
    dispatch(deleteSubBlog({ parentId, id })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Subcategory has been deleted successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        navigate('/SubBlogHome');
      } else {
        toast.error('An error has occurred');
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  let content;
  if (subBlogsState.loading) {
    content = <Spinner text="Loading" />;
  } else if (subBlogsState.status === 'rejected') {
    content = <h2>Error in fetching data {subBlogsState.error}</h2>;
  } else {
    const { subBlogs } = subBlogsState;

    // Pagination logic
    const indexOfLastSubBlog = currentPage * subBlogsPerPage;
    const indexOfFirstSubBlog = indexOfLastSubBlog - subBlogsPerPage;
    const currentSubBlogs = subBlogs.slice(indexOfFirstSubBlog, indexOfLastSubBlog);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Parent Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSubBlogs.map((subblog) => (
              <tr key={subblog._id}>
                <td>{subblog._id}</td>
                <td>{subblog.name}</td>
                <td>
                  {/* Display uploaded image or placeholder */}
                  {subblog.image ? (
                    <img
                      src={subblog.image.secure_url}
                      alt="Uploaded"
                      style={{ maxWidth: '100px' }}
                    />
                  ) : (
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                  )}
                </td>
                <td>{subblog?.categoryId?.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`/SubblogUpdate/${subblog._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={() => handleDelete(subblog?.categoryId?._id, subblog._id)}
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
          {Array.from({ length: Math.ceil(subBlogs.length / subBlogsPerPage) }, (_, i) => (
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
            disabled={currentPage === Math.ceil(subBlogs.length / subBlogsPerPage)}
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
      <h2>Sub-Category Page</h2>
      {content}
    </div>
  );
}

export default SubblogHome;
