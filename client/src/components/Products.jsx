import React, { useContext } from "react";
import toast from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { ProductCard } from "./ProductCard";
export function Products(props) {
  var token = localStorage.getItem("tkn");
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);

  async function addProduct(id) {
    debugger;
    token = localStorage.getItem("tkn");
    if (!token) {
      toast.error("Please log in to add product to cart");
      return;
    }
    const res = await addProductToCart(id);
    if (!res) {
      toast.error("this product is out of stock");
    } else if (res === "already in cart") {
      toast.error("already in cart");
    } else if (res && res.message && res.message === "Done") {
      toast.success("product was added to cart");
    } else {
      toast.error("error occured");
    }
  }

  async function wishProduct(id) {
    if (!token) {
      toast.error("Please log in to add product to wishlist");
      return;
    }
    const res = await addProductToWishlist(id);
    if (!res) {
      toast.error("error occured while adding product to wishlist");
    }
    if (res === "already in wishlist") {
      toast.error("already in wishlist");
    }
  }

  let { products } = props;

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center d-flex gy-5">
          {products?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                product={product}
                addProduct={addProduct}
                wishProduct={wishProduct}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
