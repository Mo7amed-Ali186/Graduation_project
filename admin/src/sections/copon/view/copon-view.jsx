import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import CoponHome from '../CRUD/CoponHome';
import CoponCreate from '../CRUD/CoponCreate';
import CoponUpdate from '../CRUD/CoponUpdate';

// ----------------------------------------------------------------------

export default function CoponView() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<CoponHome />} />
        <Route path="/CoponCreate" element={<CoponCreate />} />
        <Route path="/CoponUpdate" element={<CoponUpdate />} />

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
