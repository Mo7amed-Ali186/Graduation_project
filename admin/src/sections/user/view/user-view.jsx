
import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';

import UserHome from '../CRUD/UserHome';
import UserCreate from '../CRUD/UserCreate';
import UserUpdate from '../CRUD/UserUpdate';
// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <Container>
        <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/Usercreate" element={<UserCreate />} />
      <Route path="/UserUpdate" element={<UserUpdate />} />

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