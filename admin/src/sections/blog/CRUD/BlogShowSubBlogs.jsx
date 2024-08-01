/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getsubBlogs } from 'src/sections/sub-blog/CRUD/SubblogReducer';

function BlogShowSubBlogs() {
  const { id } = useParams();

  const subBlogsState = useSelector((state) => state.subBlogs);

  console.log(`sub-blog state`);
  console.log(subBlogsState);

  const dispatch = useDispatch();

  useEffect(() => {
    if (subBlogsState.status === 'idle') {
      dispatch(getsubBlogs(id));
    }
  }, [subBlogsState.status, dispatch, id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  let content;
  if (subBlogsState.loading) {
    // eslint-disable-next-line react/jsx-no-undef
    content = <Spinner text="loading" />;
  } else if (subBlogsState.status === 'rejected') {
    content = <h2> error in fetching data {subBlogsState.error}</h2>;
  } else {
    const { subBlogs } = subBlogsState;
    console.log(subBlogs);
    content = (
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
          {subBlogs &&
            subBlogs.map((subblog) => (
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
                <td>{subblog.categoryId.name}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link to={`/BlogUpdate/${blogList.id}`} className='btn btn-sm btn-primary'>Edit</Link> */}
                    <Link to={`/SubblogUpdate/${subblog._id}`} className="btn btn-sm btn-primary">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  return <div className="container">{content}</div>;
}

export default BlogShowSubBlogs;
