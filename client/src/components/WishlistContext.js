import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { toast } from "react-hot-toast";

export const wishlistContext = createContext();

export function WishlistContextProvider({ children }) {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const token = localStorage.getItem("tkn");

  async function getProductsByIds(productIds) {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/product/products/list/?${productIds
          .map((id) => `productIds=${id}`)
          .join("&")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tkn"),
          },
        }
      );

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }
  async function addProductToWishlist(productId) {
    debugger;
    if (!token) return;
    if (wishlistProducts.map((p) => p._id).includes(productId)) {
      return "already in wishlist";
    }

    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/user/addToWishList/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("product was added to wishlist", {
        position: "top-right",
      });
      console.log(data);
      getUserWishlist();

      return data;
    } catch (e) {
      console.log("error", e);
      // toast.error("error occured");
    }
  }

  async function getUserWishlist() {
    if (!token) return;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/user/WishList/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { products } = await getProductsByIds(data.wishList);
      setWishlistProducts(products);

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  async function deleteWishlistItem(productId) {
    try {
      const { data } = await axios.patch(
        `${API_BASE_URL}/user/removeFromWishList/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getUserWishlist();

      return data;
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(function () {
    getUserWishlist();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        getUserWishlist,
        addProductToWishlist,
        deleteWishlistItem,
        wishlistProducts,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
