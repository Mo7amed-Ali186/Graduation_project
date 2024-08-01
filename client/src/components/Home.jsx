import React from "react";
import { Products } from "./Products";
import axios from "axios";
import { Spinner } from "./Spinner";
import { Link } from "react-router-dom";

import { API_BASE_URL } from "../config";
import { useQueries } from "react-query";
import { Brands } from "./Brands";

const token = localStorage.getItem("tkn");
const getAllProducts = () => {
  return axios.get(`${API_BASE_URL}/product`);
};

const getAllBrands = () => {
  return axios.get(`${API_BASE_URL}/brand`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function Home({ categoryId }) {
  const queries = useQueries([
    { queryKey: "products", queryFn: getAllProducts },
    { queryKey: "brands", queryFn: getAllBrands },
  ]);

  const isLoading = queries.some((query) => query.isLoading);
  const [productsQuery, brandsQuery] = queries;

  if (isLoading) {
    return <Spinner />;
  }

  const products = productsQuery.data.data.products;
  const brands = brandsQuery.data.data.brand;

  const categoryProducts = categoryId
    ? products.filter((product) => product.categoryId.name === categoryId)
    : products;

  // Get the category name (assuming each product has a categoryId and categoryName)

  return (
    <>
      <div className="landing">
        <div className="row">
          <div className="col-lg-6 col-md-12 p-5">
            <div className="landing-text">
              <p className="landing-title">
                Discover and Find Your Own Fashion!
              </p>
              <p className="landing-paragraph">
                Explore our curated collection of stylish clothing and
                accessories tailored to your unique taste.
              </p>
            </div>
            <Link
              to={"/products"}
              className="btn btn-secondary text-light"
              style={{
                borderRadius: 0,
                padding: "10px 20px",
                width: "200px",
                fontWeight: 500,
                color: "wthie",
              }}
            >
              EXPLORE NOW
            </Link>
          </div>
          <div className="model-photo-container col-lg-6 p-5">
            <img
              src={require("../assets/model.png")}
              alt="model"
              style={{ height: "500px", width: "auto" }}
            />
          </div>
        </div>
      </div>

      <div
        className="recommended-products-section"
        style={{ marginBottom: "-35px" }}
      >
        <h3 className="recommended-products-title section-heading">
          Recommended Products
        </h3>
        <p className="recommended-products-text section-text">
          Get in on the trend with our various selection of recommended
          products.
        </p>
        <h4 style={{ color: "#224f34", fontSize: "40px", fontWeight: "bold" }}>
          Men
        </h4>

        <Products
          products={categoryProducts
            .filter((product) => product.categoryId.name === "Men")
            .slice(0, 4)}
        />

        <Link
          to={`/productsByCategory/661409e5f7cfde0dbff3c504`}
          className="btn btn-outline-info"
          style={{
            display: "block",
            margin: "20px auto",
            width: "fit-content",
            padding: "10px 20px",
            borderRadius: 0,
          }}
        >
          SEE MORE
        </Link>
      </div>
      {/* anaaaaaaaaaaaaaaaa */}

      <div
        className="recommended-products-section"
        style={{ marginBottom: "-35px" }}
      >
        <h4 style={{ color: "#224f34", fontSize: "40px", fontWeight: "bold" }}>
          Women
        </h4>
        <Products
          products={categoryProducts
            .filter((product) => product.categoryId.name === "Women")
            .slice(0, 4)}
        />
        <Link
          to={`/productsByCategory/66140a12f7cfde0dbff3c510`}
          className="btn btn-outline-info"
          style={{
            display: "block",
            margin: "20px auto",
            width: "fit-content",
            padding: "10px 20px",
            borderRadius: 0,
          }}
        >
          SEE MORE
        </Link>
      </div>
      {/* anaaaaaaaaaaaaaaaa */}

      <div
        className="recommended-products-section"
        style={{ marginBottom: "50px" }}
      >
        <h4 style={{ color: "#224f34", fontSize: "40px", fontWeight: "bold" }}>
          Kids
        </h4>
        <Products
          products={categoryProducts
            .filter((product) => product.categoryId.name === "Kids")
            .slice(0, 4)}
        />
        <Link
          to={`/productsByCategory/6623bb175129f623f50734c8`}
          className="btn btn-outline-info"
          style={{
            display: "block",
            margin: "20px auto",
            width: "fit-content",
            padding: "10px 20px",
            borderRadius: 0,
          }}
        >
          SEE MORE
        </Link>
      </div>

      <div className="feedback-section">
        <h3 className="feedback-section-title section-heading">
          Feedback Corner
        </h3>
        <div className="feedback-section-container">
          <div className="feedback-item">
            <h5 className="feedback-author">Emily Wilson</h5>
            <div className="feedback-content">
              The customer experience was exceptional from start to finish. The
              website is user-friendly, the checkout process was smooth, and the
              clothes I ordered fit perfectly. I'm beyond satisfied!
            </div>
          </div>
          <div className="feedback-item">
            <h5 className="feedback-author">Sarah Thompson</h5>
            <div className="feedback-content">
              The customer experience was exceptional from start to finish. The
              website is user-friendly, the checkout process was smooth, and the
              clothes I ordered fit perfectly. I'm beyond satisfied!
            </div>
          </div>
          <div className="feedback-item">
            <h5 className="feedback-author">David Hanks</h5>
            <div className="feedback-content">
              I've received numerous compliments whenever I wear items from your
              store. It's gratifying to know that I can always count on your
              store to help me stand out with stylish pieces.
            </div>
          </div>
        </div>
      </div>

      <div className="brands-section" style={{ marginBottom: "150px" }}>
        <h3 className="brands-section-title section-heading">Our Brands</h3>
        <p className="brands-section-text section-text ">
          Embracing diversity with inclusive and versatile collections.
        </p>
        <Brands brands={brands.slice(0, 4)} />
      </div>
    </>
  );
}
