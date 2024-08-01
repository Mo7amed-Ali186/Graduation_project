import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";
import { ML_BASE_URL } from "../config";
import { Products } from "./Products";
import { Spinner } from "react-bootstrap";
import { Slideshow } from "../SlideShow";
import Select from "react-select";

export function ProductDetails() {
  const token = localStorage.getItem("tkn");
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();
  const [counter, setCounter] = useState(1);

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log(id);
    // Function to fetch recommended products
    async function fetchRecommendedProducts() {
      try {
        const products = await getSimilarProducts();
        setRecommendedProducts(products); // Update the state with the fetched products
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    }

    // Function to fetch product details
    async function fetchProductDetails() {
      try {
        debugger;
        const response = await getProductDetails();
        console.log(response);
        setProduct(response.data.product);
        // Update your state with the fetched product details
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchRecommendedProducts();
    fetchProductDetails();
  }, [id]);

  async function addProduct(id, qty, color, size) {
    if (!token) {
      toast.error("Please log in to add product to cart");
      return;
    }
    if (!color) {
      toast.error("select color");
      return;
    } else if (!size) {
      toast.error("select size");
      return;
    }
    const res = await addProductToCart(id, qty, color, size);
    if (!res) {
      toast.error("error occured while adding product to cart");
    } else if (res === "already in cart") {
      toast.error("already in cart");
    }
    // console.log(res);
    else if (res?.message === "Done") {
      toast.success("product was added to cart");
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
    } else if (res === "already in wishlist") {
      toast.error("already in wishlist");
    } else if (res.status === "success") {
      toast.success(res.message, {
        position: "top-right",
      });
    }
  }

  async function getSimilarProductIds(id) {
    const formData = new FormData();
    formData.append("image_id", id);
    try {
      const response = await axios.post(
        `${ML_BASE_URL}/photo-recommendation`,
        formData
      );
      const recommenedProductsIds = response.data.image_ids;
      return recommenedProductsIds;
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  }

  async function getSimilarProducts() {
    debugger;
    const ids = await getSimilarProductIds(id);
    const params = ids.reduce((acc, curr, index) => {
      acc[`productIds[${index}]`] = curr;
      return acc;
    }, {});
    const response = await axios.get(`${API_BASE_URL}/product/products/list`, {
      params: params,
      // headers: {
      //     Authorization: `Bearer ${token}`,
      // },
    });
    return response.data.products;
  }

  async function getProductDetails() {
    return await axios.get(`${API_BASE_URL}/product/${id}`);
  }

  const productColors = product?.colors;
  const productSizes = product?.size;

  const colorOptions = productColors?.map((color) => {
    return {
      value: color,
      label: color,
    };
  });
  const sizeOptions = productSizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  // Increase counter
  const increaseCounter = () => {
    if (counter < product.stock) setCounter(counter + 1);
  };

  // Decrease counter
  const decreaseCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
  return !product ? (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h2 style={{ textAlign: "center" }}>Product Not Found</h2>
      </div>
    </>
  ) : (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <figure className="text-center">
              {/* <img
                                    className="img-fluid"
                                    src={product.mainImage.secure_url}
                                    alt={data.data.product.name}
                                />
                                */}
              {Slideshow([product.mainImage, ...product.subImage])}
            </figure>
          </div>
          <div className="col-md-4" style={{ marginLeft: "40px" }}>
            <div className="details">
              <h1 className="mb-4 text-uppercase">{product.name}</h1>
              <p>Description: {product.description}</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                {product.discount ? (
                  <p className="m-0 font-weight-bold">
                    <span
                      style={{
                        textDecoration: "line-through",
                      }}
                    >
                      {" "}
                      {product.price} EGP
                    </span>{" "}
                    <span style={{ color: "red" }}>
                      {product.discount}% OFF
                    </span>{" "}
                    {product.finalPrice} EGP
                  </p>
                ) : (
                  <p className="m-0 fw-bold">{product.price} EGP</p>
                )}
                {/* Add ratings here */}
              </div>
              <div className="d-flex justify-content-start align-items-center mb-4">
                <button
                  onClick={decreaseCounter}
                  className="btn btn-secondary rounded-circle mr-2"
                >
                  -
                </button>
                <span className="mx-2">{counter}</span>
                <button
                  onClick={increaseCounter}
                  className="btn btn-secondary rounded-circle mr-2"
                >
                  +
                </button>
                <span className="mx-1"> </span>

                <span className="mx-1"> </span>

                <span> </span>
                <Link
                  onMouseEnter={(e) => e.target.classList.add("fa-solid")}
                  onMouseLeave={(e) => e.target.classList.remove("fa-solid")}
                  onClick={() => wishProduct(product._id)}
                >
                  <i className="pointer fa-regular fa-heart d-flex justify-content-end fs-3"></i>
                </Link>
              </div>
              <div>
                <span style={{ fontWeight: "bold" }}> Stock: </span>
                {product.stock === 0 ? "out of stock" : product.stock}
              </div>
              <div className="mt-2">
                <span style={{ fontWeight: "bold" }}> Available Colors: </span>
                <Select
                  defaultValue={selectedColor}
                  required="true"
                  onChange={setSelectedColor}
                  options={colorOptions}
                />
              </div>
              <div className="mt-2">
                <span style={{ fontWeight: "bold" }}> Available Sizes: </span>

                <Select
                  defaultValue={selectedSize}
                  required="true"
                  onChange={setSelectedSize}
                  options={sizeOptions}
                />
              </div>
              <button
                onClick={() =>
                  addProduct(product._id, counter, selectedColor, selectedSize)
                }
                className="btn btn-outline-success w-100 mt-3"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="mt-5">
            <h3 class="recommended-products-title section-heading">
              Explore Similar Products
            </h3>
            <Products
              products={recommendedProducts
                .filter((p) => p._id !== id)
                .slice(0, 4)}
            />{" "}
          </div>
        </div>
      </div>
    </>
  );
}
