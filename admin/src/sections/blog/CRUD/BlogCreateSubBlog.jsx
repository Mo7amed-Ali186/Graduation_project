/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { addSubBlog } from 'src/sections/sub-blog/CRUD/SubblogReducer';

function BlogCreateSubBlog() {
  const { id } = useParams();

  const [name, setName] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(null); // State to store the selected image file
  const [imgPreview, setImgPreview] = useState(null); // State to store the base64 image preview
  const [successMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if name and imgPreview are provided
    if (!name || !imgPreview) {
      alert('Please provide a name and select an image.');
      return;
    }

    const newSubBlog = {
      id,
      name,
      img,
    };

    dispatch(addSubBlog(newSubBlog)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('a new subcategory has been created successfully!');
        navigate('/subblog');
      } else {
        const errors = res.payload.response.data.details;
        let errorMessage = '';
        errors.forEach((error) => {
          errorMessage += error.message;
        });
        toast.error(`${res.payload.response.data.globalMessage}\n${errorMessage}`);
      }
    });
  };

  const handleFileChange = (event) => {
    // Set the selected image file to the state
    const file = event.target.files[0];
    setImg(file);

    // Convert the file to base64 string for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add New Sub-Category</h3>
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
            <label htmlFor="img">Image:</label>
            <input
              type="file"
              id="img"
              name="img"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <br />
          <Link to="/SubblogHome" className="btn btn-sm btn-primary mx-1">
            Go To subCategories
          </Link>

          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default BlogCreateSubBlog;
