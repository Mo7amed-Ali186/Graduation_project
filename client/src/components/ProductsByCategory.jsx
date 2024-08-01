import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "./CartContext";
import { wishlistContext } from "./WishlistContext";
import { Products } from "./Products";
import { Spinner } from "./Spinner";
import { API_BASE_URL } from "../config";

export function ProductsByCategory() {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
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

  let products = data?.data?.products || []; // Ensure products is defined
  products = products.filter((product) => product?.categoryId?._id === id);
  let categoryName = products.length > 0 ? products[0]?.categoryId?.name : "";

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Filter products based on selected brand
  const filteredProductsByBrand = selectedBrand
    ? filteredProducts.filter(
        (product) =>
          product.brandId &&
          product.brandId.name.toLowerCase() === selectedBrand.toLowerCase()
      )
    : filteredProducts;

  // Filter products based on selected price
  const filteredProductsByPrice = selectedPrice
    ? filteredProductsByBrand.filter(
        (product) =>
          product.finalPrice &&
          parseFloat(product.finalPrice) <= parseFloat(selectedPrice)
      )
    : filteredProductsByBrand;

  // Filter products based on selected color
  const filteredProductsByColor = selectedColor
    ? filteredProductsByPrice.filter((product) => {
        if (product.colors && Array.isArray(product.colors)) {
          return product.colors
            .map((color) => color.toLowerCase())
            .includes(selectedColor.toLowerCase());
        }
        return false;
      })
    : filteredProductsByPrice;

  // Filter products based on selected size
  const filteredProductsBySize = selectedSize
    ? filteredProductsByColor.filter((product) => {
        if (product.size && Array.isArray(product.size)) {
          return product.size
            .map((size) => size.toLowerCase())
            .includes(selectedSize.toLowerCase());
        }
        return false;
      })
    : filteredProductsByColor;

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsBySize.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique brand, size, and color options for filtering
  const brands = [...new Set(products.map((product) => product.brandId?.name))];
  const sizes = [...new Set(products.flatMap((product) => product.size))];
  const colors = [...new Set(products.flatMap((product) => product.colors))];

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
        {categoryName}
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
        {/* Search bar */}
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
          {/* Brand filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={{
              marginRight: "0.5em",
              border: "none",
              padding: "0 1em",
              width: "12em",
              height: "3.25em",
              borderRadius: "3.25em",
              background: "#b2d1ff",
              color: "#224f34",
              fontFamily: "century gothic, verdana, arial, sans-serif",
              transition: "0.65s",
            }}
          >
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Price filter */}
          <input
            type="number"
            value={selectedPrice}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSelectedPrice(Math.max(0, value)); // Ensure non-negative value
            }}
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

          {/* Color filter */}
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
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>

          {/* Size filter */}
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
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Products */}
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
                  transition: "background-color 0.3s ease",
                  backgroundColor:
                    currentPage === i + 1 ? "#224f34" : "transparent",
                  color: currentPage === i + 1 ? "white" : "black",
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
