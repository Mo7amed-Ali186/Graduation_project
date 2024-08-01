// App.js
import { Component } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Brands } from "./components/Brands";
import { Wishlist } from "./components/Wishlist";
import { Home } from "./components/Home";
import { Categories } from "./components/Categories";
import { AuthContextProvider } from "./components/authen";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductDetails } from "./components/ProductDetails";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { CartContextProvider } from "./components/CartContext";
import { Cart } from "./components/Cart";
import { WishlistContextProvider } from "./components/WishlistContext";
import { CheckOut } from "./components/CheckOut";
import { Subcategories } from "./components/Subcategories";
import { ProductsByCategory } from "./components/ProductsByCategory";
import { ProductsBySubCategory } from "./components/ProductsBySubCategory";
import { ProductsByBrand } from "./components/ProductsByBrand";
import { Orders } from "./components/Orders";
import { ProductsPage } from "./components/ProductsPage";
import { ForgetPassword } from "./components/ForgetPassword";
import { ResetPassword } from "./components/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      // { path: "Home", element: <Home /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "productDetailes/:id", element: <ProductDetails /> },
      { index: true, element: <Home /> },
      { path: "products", element: <ProductsPage /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "subcategories", element: <Subcategories /> },
      { path: "productsByCategory/:id", element: <ProductsByCategory /> },
      {
        path: "productsBySubCategory/:id",
        element: <ProductsBySubCategory />,
      },
      { path: "productsByBrand/:id", element: <ProductsByBrand /> },
      { path: "orders", element: <Orders /> },

      {
        path: "*",
        element: (
          <h1 className="d-flex vh-100 justify-content-center align-items-center">
            Not Found
            <br /> Error 404
          </h1>
        ),
      },
    ],
  },
]);

export class App extends Component {
  render() {
    let queryClient = new QueryClient();
    return (
      <GoogleOAuthProvider clientId="49257914113-2k9uvh7srjul3ivvt3nftjgpkserrukt.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <CartContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={router}>
                  <ScrollToTop>
                    {/* Your app's content goes here */}
                  </ScrollToTop>
                </RouterProvider>
              </WishlistContextProvider>
            </CartContextProvider>
          </AuthContextProvider>
          <Toaster />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    );
  }
}
