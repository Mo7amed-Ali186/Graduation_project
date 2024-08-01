import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Container from '@mui/material/Container';

import BlogHome from '../CRUD/BlogHome';
import BlogCreate from '../CRUD/BlogCreate';
import BlogUpdate from '../CRUD/BlogUpdate';
import BlogShowSubBlogs from '../CRUD/BlogShowSubBlogs';
import BlogCreateSubBlog from '../CRUD/BlogCreateSubBlog';
// ----------------------------------------------------------------------

export default function BlogView() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<BlogHome />} />
        <Route path="/BlogCreate" element={<BlogCreate />} />
        <Route path="/BlogUpdate" element={<BlogUpdate />} />
        <Route path="/BlogCreateSubCategory" element={<BlogCreateSubBlog />} />
        <Route path="/BlogShowSubCategories" element={<BlogShowSubBlogs />} />

        {/* Add more routes as needed */}
      </Routes>
    </Container>
  );
}
