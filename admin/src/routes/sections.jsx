import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import UserHome from 'src/sections/user/CRUD/UserHome';
import BlogHome from 'src/sections/blog/CRUD/BlogHome';
import BrandHome from 'src/sections/brand/CRUD/BrandHome';
import OrderHome from 'src/sections/order/CRUD/OrderHome';
import UserUpdate from 'src/sections/user/CRUD/UserUpdate';
import UserCreate from 'src/sections/user/CRUD/UserCreate';
import BlogCreate from 'src/sections/blog/CRUD/BlogCreate';
import BlogUpdate from 'src/sections/blog/CRUD/BlogUpdate';
import CouponHome from 'src/sections/copon/CRUD/CoponHome';
import BrandCreate from 'src/sections/brand/CRUD/BrandCreate';
import BrandUpdate from 'src/sections/brand/CRUD/BrandUpdate';
import CoponUpdate from 'src/sections/copon/CRUD/CoponUpdate';
import CoponCreate from 'src/sections/copon/CRUD/CoponCreate';
import ProductHome from 'src/sections/product/CRUD/ProductHome';
import SubblogHome from 'src/sections/sub-blog/CRUD/SubblogHome';
import ProductUpdate from 'src/sections/product/CRUD/ProductUpdate';
import ProductCreate from 'src/sections/product/CRUD/ProductCreate';
import SubblogUpdate from 'src/sections/sub-blog/CRUD/SubblogUpdate';
import BlogShowSubBlogs from 'src/sections/blog/CRUD/BlogShowSubBlogs';
import BlogCreateSubBlog from 'src/sections/blog/CRUD/BlogCreateSubBlog';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SubBlogPage = lazy(() => import('src/pages/subblog'));
export const BrandPage = lazy(() => import('src/pages/brand'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const CoponPage = lazy(() => import('src/pages/copon'));

// export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // nottice the change happened here mahmoud
        { element: <IndexPage />, index: true },
        { path: 'products/*', element: <ProductsPage /> },
        { path: 'brand/*', element: <BrandPage /> },
        { path: 'user/*', element: <UserPage /> },
        { path: 'blog/*', element: <BlogPage /> },
        { path: 'subblog/*', element: <SubBlogPage /> },
        { path: 'order/*', element: <OrderPage /> },
        { path: 'copon/*', element: <CoponPage /> },

        // Home here
        { path: 'UserHome', element: <UserHome /> },
        { path: 'BlogHome', element: <BlogHome /> },
        { path: 'SubblogHome', element: <SubblogHome /> },
        { path: 'BrandHome', element: <BrandHome /> },
        { path: 'ProductHome', element: <ProductHome /> },
        { path: 'OrderHome', element: <OrderHome /> },
        { path: 'CoponHome', element: <CouponHome /> },

        // Update Paths Here:
        { path: '/UserUpdate/:id', element: <UserUpdate /> },
        { path: '/BlogUpdate/:id', element: <BlogUpdate /> },
        { path: '/BrandUpdate/:id', element: <BrandUpdate /> },
        { path: '/ProductUpdate/:id', element: <ProductUpdate /> },
        { path: '/SubblogUpdate/:id', element: <SubblogUpdate /> },
        { path: '/CoponUpdate/:id', element: <CoponUpdate /> },

        // Create Paths Here:
        { path: 'UserCreate', element: <UserCreate /> },
        { path: 'BlogCreate', element: <BlogCreate /> },
        { path: 'BrandCreate', element: <BrandCreate /> },
        { path: 'ProductCreate', element: <ProductCreate /> },
        { path: 'CoponCreate', element: <CoponCreate /> },
        { path: 'BlogCreateSubCategory/:id', element: <BlogCreateSubBlog /> },
        { path: 'BlogShowSubCategories/:id', element: <BlogShowSubBlogs /> },
      ],
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
