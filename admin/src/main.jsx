import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import LoginPage from './sections/auth/LoginPage';
import authReducer from './sections/auth/authReducer';
import UserReducer from './sections/user/CRUD/UserReducer';
import BlogReducer from './sections/blog/CRUD/BlogReducer';
import BrandReducer from './sections/brand/CRUD/BrandReducer';
import CoponReducer from './sections/copon/CRUD/CoponReducer';
import OrderReducer from './sections/order/CRUD/OrderReducer';
import ProductReducer from './sections/product/CRUD/ProductReducer';
import SubblogReducer from './sections/sub-blog/CRUD/SubblogReducer';

const store = configureStore({
  reducer: {
    users: UserReducer,
    brands: BrandReducer,
    blogs: BlogReducer,
    subBlogs: SubblogReducer,
    coupons: CoponReducer,
    products: ProductReducer,
    orders: OrderReducer,
    auth: authReducer,
  },
});

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

const HomePage = () => {
  // eslint-disable-next-line no-debugger
  
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? <App /> : <LoginPage />;
};

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
          <HomePage /> {/* Use HomePage component directly */}
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
