import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Spinner } from "./Spinner";
import { Products } from "./Products";
import { API_BASE_URL } from "../config";

export function ProductsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const { isLoading, data } = useQuery("allProducts", getAllProducts);

  function getAllProducts() {
    return axios.get(`${API_BASE_URL}/product`);
  }

  if (isLoading) {
    return <Spinner />;
  }

  // Add a check to ensure data and data.data.products are not undefined
  let products = data?.data?.products || [];

  // Filtering logic
  const filteredProducts = products.filter((product) =>
    product?.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProductsByCategory = selectedCategory
    ? filteredProducts.filter(
        (product) =>
          product.categoryId &&
          product.categoryId?.name.toLowerCase() ===
            selectedCategory.toLowerCase()
      )
    : filteredProducts;

  const filteredProductsByBrand = selectedBrand
    ? filteredProductsByCategory.filter(
        (product) =>
          product.brandId &&
          product.brandId?.name.toLowerCase() === selectedBrand.toLowerCase()
      )
    : filteredProductsByCategory;

  const filteredProductsByPrices = selectedPrice
    ? filteredProductsByBrand.filter(
        (product) =>
          product.finalPrice &&
          parseFloat(product.finalPrice) <= parseFloat(selectedPrice)
      )
    : filteredProductsByBrand;

  const filteredProductsByColors = selectedColor
    ? filteredProductsByPrices.filter((product) => {
        if (product.colors && Array.isArray(product.colors)) {
          return product.colors
            .map((color) => color.toLowerCase())
            .includes(selectedColor.toLowerCase());
        }
        return false;
      })
    : filteredProductsByPrices;

  const filteredProductsBySizes = selectedSize
    ? filteredProductsByColors.filter((product) => {
        if (product.size && Array.isArray(product.size)) {
          return product.size
            .map((size) => size.toLowerCase())
            .includes(selectedSize.toLowerCase());
        }
        return false;
      })
    : filteredProductsByColors;

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductsBySizes.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique colors and sizes
  const uniqueColors = [
    ...new Set(products.flatMap((product) => product.colors)),
  ];
  const uniqueSizes = [...new Set(products.flatMap((product) => product.size))];

  // Get unique category names and brand names
  const uniqueCategories = [
    ...new Set(products.flatMap((product) => product.categoryId?.name)),
  ];
  const uniqueBrands = [
    ...new Set(products.flatMap((product) => product.brandId?.name)),
  ];

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
        All Products
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
          type="checkbox"
          id="search-btn"
          style={{ position: "absolute", left: "-100vw" }}
        />
        <input
          type="text"
          id="search-bar"
          placeholder="Search..."
          className="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            alignContent: "center",
            border: "none",
            padding: "0 1em",
            width: "37em",
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
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
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
                filteredProductsBySizes.length / productsPerPage
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
