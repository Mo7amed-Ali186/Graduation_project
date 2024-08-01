import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { Products } from "./Products";
import { API_BASE_URL } from "../config";
import { Spinner } from "./Spinner";

export function ProductsByBrand() {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  useContext(cartContext);
  useContext(wishlistContext);

  useEffect(() => {
    // Reset current page when category changes
    setCurrentPage(1);
  }, [id]); // Reset when id changes

  function getAllProducts() {
    return axios.get(`${API_BASE_URL}/product`);
  }

  const { isLoading, data } = useQuery("allProducts", getAllProducts);

  if (isLoading) {
    return <Spinner />;
  }

  let products = data?.data?.products;
  if (!products) {
    return <div>No products found.</div>;
  }

  products = products.filter((product) => product.brandId?._id === id);
  let brandName = products ? products[0]?.brandId?.name : "";

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProductsByCategory = selectedCategory
    ? filteredProducts.filter(
        (product) =>
          product.categoryId &&
          product.categoryId.name.toLowerCase() ===
            selectedCategory.toLowerCase()
      )
    : filteredProducts;

  const filteredProductsByPrice = selectedPrice
    ? filteredProductsByCategory.filter(
        (product) =>
          product.finalPrice &&
          parseFloat(product.finalPrice) <= parseFloat(selectedPrice)
      )
    : filteredProductsByCategory;

  const filteredProductsByColor = selectedColor
    ? filteredProductsByPrice.filter((product) =>
        product.colors
          ? product.colors
              .map((color) => color.toLowerCase())
              .includes(selectedColor.toLowerCase())
          : false
      )
    : filteredProductsByPrice;

  const filteredProductsBySize = selectedSize
    ? filteredProductsByColor.filter((product) =>
        product.size
          ? product.size
              .map((size) => size.toLowerCase())
              .includes(selectedSize.toLowerCase())
          : false
      )
    : filteredProductsByColor;

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsBySize
    ? filteredProductsBySize.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique categories, colors, and sizes for filtering
  const uniqueCategories = [
    ...new Set(products.map((product) => product.categoryId?.name)),
  ];
  const uniqueColors = [
    ...new Set(products.flatMap((product) => product.colors)),
  ];
  const uniqueSizes = [...new Set(products.flatMap((product) => product.size))];

  return (
    <>
      <h3
        style={{
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "40px",
          textTransform: "capitalize",
          color: "#224f34",
          fontWeight: "700",
        }}
      >
        {brandName}
      </h3>
      <div
        className="app"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          type="text"
          id="search-bar"
          placeholder="Search..."
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            marginBottom: "1em",
            border: "none",
            padding: "0 1em",
            width: "25em",
            height: "3.25em",
            borderRadius: "3.25em",
            background: "#EFD4C2",
            color: "#224f34",
            fontFamily: "century gothic, verdana, arial, sans-serif",
            transition: "0.65s",
          }}
        />
        <div style={{ display: "flex", marginTop: "12px" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              marginRight: "0.5em",
              border: "none",
              padding: "0 1em",
              width: "12em",
              height: "3.25em",
              borderRadius: "3.25em",
              background: "#c2efea",
              color: "#224f34",
              fontFamily: "century gothic, verdana, arial, sans-serif",
              transition: "0.65s",
            }}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedPrice}
            onChange={(e) =>
              e.target.value >= 0 && setSelectedPrice(e.target.value)
            }
            placeholder="Max Price"
            style={{
              marginRight: "0.5em",
              border: "none",
              padding: "0 1em",
              width: "12em",
              height: "3.25em",
              borderRadius: "3.25em",
              background: "#e0b2ff",
              color: "#224f34",
              fontFamily: "century gothic, verdana, arial, sans-serif",
              transition: "0.65s",
            }}
          />
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            style={{
              marginRight: "0.5em",
              border: "none",
              padding: "0 1em",
              width: "12em",
              height: "3.25em",
              borderRadius: "3.25em",
              background: "#ffd6b2",
              color: "#224f34",
              fontFamily: "century gothic, verdana, arial, sans-serif",
              transition: "0.65s",
            }}
          >
            <option value="">All Colors</option>
            {uniqueColors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            style={{
              border: "none",
              padding: "0 1em",
              width: "12em",
              height: "3.25em",
              borderRadius: "3.25em",
              background: "#d9b3ff",
              color: "#224f34",
              fontFamily: "century gothic, verdana, arial, sans-serif",
              transition: "0.65s",
            }}
          >
            <option value="">All Sizes</option>
            {uniqueSizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <Products products={currentProducts} />
        {/* Pagination */}
        <div style={{ marginBottom: "40px" }}>
          {Array.from(
            {
              length: Math.ceil(
                filteredProductsBySize.length / productsPerPage
              ),
            },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                style={{
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  padding: "10px",
                  marginRight: "5px",
                  transition: "background-color 0.3s ease", // Add transition for background color change
                  backgroundColor:
                    currentPage === i + 1 ? "#224f34" : "transparent", // Change background color for selected button
                  color: currentPage === i + 1 ? "white" : "black", // Change text color for selected button
                }}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
