import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import ProductHome from '../CRUD/ProductHome';
import ProductCreate from '../CRUD/ProductCreate';
import ProductUpdate from '../CRUD/ProductUpdate';
// ----------------------------------------------------------------------

export default function ProductPage() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<ProductHome />} />
        <Route path="/ProductCreate" element={<ProductCreate />} />
        <Route path="/ProductUpdate" element={<ProductUpdate />} />

        {/* Add more routes as needed */}
      </Routes>
    </Container>
  );
}
// subblog-view.jsx

// ORIGINAl
// So this is the page which can act as app.jsx for each file you want to create else
// the thing is that like blgog user and some other files mahmoud you will see
// what and how many items you want to add on the table and what is this item for
// email image text password
