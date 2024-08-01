/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { updateBlog } from './BlogReducer';

function BlogUpdate() {
  // eslint-disable-next-line no-debugger
  const { id } = useParams();
  // eslint-disable-next-line eqeqeq, no-debugger
  const blogsState = useSelector((state) => state.blogs);
  console.log(blogsState);

  const blog = blogsState.blogs.find((b) => b._id === id);
  console.log(blog);

  const { name } = blog;

  const [uname, setName] = useState(name);
  const [uimg, setImg] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  if (name === uname) {
    alert('name must be unique');
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(
      updateBlog({
        id,
        name: uname,
        img: uimg,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('category has been updated successfully!');
        navigate('/blog');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
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
        <h3>Edit Category</h3>
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
              placeholder={uname}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="img">Image :</label>
            <input
              type="file"
              id="img"
              name="img"
              className="form-control"
              onChange={(e) => setImg(e.target.files[0])}
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
export default BlogUpdate;
