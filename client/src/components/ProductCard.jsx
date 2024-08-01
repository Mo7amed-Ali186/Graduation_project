/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { API_BASE_URL } from "../config";

export function ProductCard({ product, addProduct, wishProduct }) {
  const navigate = useNavigate();
  const renderProductPrice = (product) => {
    if (product.discount) {
      return (
        <p className="m-0 fw-bold">
          <span
            className="bg-light"
            style={{
              textDecoration: "line-through",
              padding: "5px 10px",
              fontWeight: "500",
            }}
          >
            {product.price} EGP
          </span>{" "}
          <span
            className="bg-light"
            style={{ padding: "5px 10px", fontWeight: "500" }}
          >
            {product.price * ((100 - product.discount) / 100)} EGP
          </span>{" "}
        </p>
      );
    } else {
      return (
        <span
          className="bg-light"
          style={{ padding: "5px 10px", fontWeight: "500" }}
        >
          {product.price} EGP
        </span>
      );
    }
  };

  return (
    <div key={product._id} className="col-lg-3 col-md-4 col-sm-6">
      <div
        data-discount={product.discount + "% OFF"}
        className="product-card card mx-3"
      >
        <Link
          // to={`/productDetailes/${product._id}`}
          onClick={(e) => navigate(`/productDetailes/${product._id}`)}
        >
          <img
            src={product.mainImage.secure_url}
            className="product-image card-img-top img-fluid"
            style={{
              maxWidth: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />
          <div className="card-body " style={{ height: "150px" }}>
            <div className="card-title onlyOneLine">
              <h5
                className="py-1 text-center text-uppercase text"
                color=""
                style={{
                  fontWeight: 600,
                }}
              >
                {product?.name.slice(0, 15)}
              </h5>
              <div
                className="tags d-flex flex-wrap flex-start onlyOneLine"
                style={{
                  color: "lightgrey",
                  fontWeight: 100,
                  width: "100%",
                  display: "inline-flex",
                  flexDirection: "row",
                }}
              >
                <span class="tag badge rounded-pill bg-info">
                  {product?.categoryId?.name}
                </span>
                <span class="tag badge rounded-pill bg-info ">
                  {product?.subCategoryId?.name}
                </span>
                <span class="tag badge rounded-pill bg-info">
                  {product?.brandId?.name}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3 hideOverFlow">
                <span
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {" "}
                  PRICE{" "}
                </span>
                {renderProductPrice(product)}
              </div>
            </div>
          </div>
        </Link>
        <div
          className="card-footer d-flex justify-content-between"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "red !important",
          }}
        >
          <button
            onClick={() => addProduct(product._id)}
            className="btn btn-outline-danger mb-2"
          >
            {" "}
            + Add
          </button>
          <Link
            onMouseEnter={(e) => e.target.classList.add("fa-solid")}
            onMouseLeave={(e) => e.target.classList.remove("fa-solid")}
            onClick={() => wishProduct(product._id)}
          >
            <i className="pointer fa-regular fa-heart d-flex justify-content-end fs-3"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
