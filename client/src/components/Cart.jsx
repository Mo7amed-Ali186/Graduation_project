import React, { useContext, useState, useRef } from "react";
import { cartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Spinner } from "./Spinner";
import axios from "axios";
import { API_BASE_URL } from "../config";

export function Cart() {
  const [couponName, setCouponName] = useState("");
  const couponNameRef = useRef();

  let {
    cartProducts,
    clearCart,
    totalCartPrice,
    numOfCartItems,
    deleteCartItem,
    getCouponData,
    setTotalCartPrice,
    updateCartItemQuantity, // Added function to update item quantity
  } = useContext(cartContext);

  if (cartProducts.length === null) {
    return (
      <>
        <div className="container py-5" style={{ height: "100vh" }}>
          <Spinner></Spinner>
        </div>
      </>
    );
  }
  if (cartProducts.length === 0) {
    return (
      <>
        <div className="container py-5" style={{ height: "100vh" }}>
          <h3> Cart is empty</h3>
        </div>
      </>
    );
  }

  async function getCoupon(name) {
    debugger;
    if (name.trim() === "") {
      // Check if coupon name is not empty
      toast.error("Please enter a coupon code");
      return;
    }

    const res = await getCouponData(name);
    console.log(res);

    if (res?.message === "Done") {
      toast.success("Coupon has been applied successfully");
      const discount = res.coupon.amount;
      setTotalCartPrice(totalCartPrice * ((100 - discount) / 100));
      couponNameRef.current.disabled = true;
    } else {
      toast.error("Coupon isn't found or expired");
    }
  }

  async function clearCartItems() {
    const res = await clearCart();
    console.log(res);

    if (res.message === "Done") {
      toast.success("cart has been cleared");
    } else {
      toast.error("Error occurred");
    }

    cartProducts = [];
    numOfCartItems = 0;
    totalCartPrice = 0;
  }

  async function deleteItem(id) {
    debugger;
    const res = await deleteCartItem(id);
    console.log(res);
    try {
      if (res.message === "Done") {
        toast.success("product Removed Successfully");
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const displayDiscount = (product) => {
    if (product.discount !== 0) {
      return <h6>Discount:{product.discount}%</h6>;
    }
  };

  console.log(cartProducts);
  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-9  p-5" style={{ height: "fit-content" }}>
            <div className="fw-bold shopping-cart-header  d-flex justify-content-between align-items-center p-3">
              <div className="fs-4">Shopping Cart</div>
              <span className="fs-4">{numOfCartItems} Items</span>
            </div>
            <hr style={{ backgroundColor: "transparent" }} />
            <div className="shopping-cart-table mt-3">
              <div
                className="table-header p-3 fw-medium"
                style={{ color: "#6f6f6f" }}
              >
                <div className="row">
                  <div className="col-6">Product Details</div>
                  <div className="col-2">Price</div>
                  <div className="col-2">Quantity</div>
                  <div className="col-2">Total</div>
                </div>
              </div>
              <div className="table-body p-3">
                {cartProducts.map((product) => {
                  return (
                    <div className="table-row" key={product._id}>
                      <div className="row mt-5">
                        <div className="col-6 d-flex flex-row">
                          <div className="col-6">
                            <img
                              style={{
                                width: "auto",
                                maxWidth: "200px",
                                height: "150px",
                              }}
                              src={product.mainImage.secure_url}
                              alt=""
                            />
                          </div>
                          <div
                            className="col-6 d-flex flex-column align-items-start justify-content-around
                                                    "
                            style={{
                              paddingLeft: "20px",
                            }}
                          >
                            <h6 className="fw-bold">{product.name}</h6>
                            <p>{product.categoryId?.name}</p>
                            <div className="text-danger">
                              {displayDiscount(product)}
                            </div>
                            <Link
                              onClick={() => deleteItem(product._id)}
                              className="text-danger"
                            >
                              {" "}
                              <i className="fa-solid fa-trash-can "></i> Remove{" "}
                            </Link>
                          </div>
                        </div>
                        <div className="col-2 fw-bold">{product.price}</div>
                        <div className="col-2 fw-bold d-flex justify-content-start align-items-center">
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() =>
                              updateCartItemQuantity(
                                product._id,
                                product.qty - 1
                              )
                            }
                            disabled={product.qty === 1}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                          <span>{product.qty}</span>
                          <button
                            className="btn btn-outline-primary btn-sm ms-2"
                            onClick={() =>
                              updateCartItemQuantity(
                                product._id,
                                product.qty + 1
                              )
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </div>

                        <div className="col-2 fw-bold">
                          {product.price *
                            product.qty *
                            ((100 - product.discount) / 100)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-3 bg-light p-5">
            <div className="cart-summary-title p-3 fw-bold">
              <div className="fs-4">Order Summary</div>
            </div>
            <hr />
            <div className="p-3 card-summary-header d-flex flex-row justify-content-between">
              <h6 className="fw-medium">{numOfCartItems} ITEMS</h6>
              <h6 className="fw-medium">{totalCartPrice} EGP</h6>
            </div>
            <h6 className="mt-5 fw-bold">Coupon</h6>
            <input
              type="text"
              className="form-control mt-3"
              required
              minLength={3}
              style={{ backgroundColor: "white" }}
              value={couponName} // Bind input value to couponName state
              onChange={(e) => setCouponName(e.target.value)} // Update couponName state on change
            />
            <button
              ref={couponNameRef}
              className="btn btn-primary w-50 mt-3"
              onClick={() => getCoupon(couponName)} // Call applyCoupon function on button click
            >
              APPLY
            </button>
            <hr className="mt-5" />
            <div className="card-summary-header d-flex flex-row justify-content-between">
              <h6 className="mt-1 fw-bold">TOTAL COST</h6>
              <div className="fw-bold">{totalCartPrice}</div>
            </div>
            <Link
              to={"/checkout"}
              className="btn btn-outline-primary w-100 mt-3"
              style={{ color: "white !important" }}
              // Call applyCoupon function on button click
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
