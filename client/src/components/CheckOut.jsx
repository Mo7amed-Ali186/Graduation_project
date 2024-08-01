import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cartContext } from "./CartContext";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

export function CheckOut() {
  const {
    cartId,
    getUserCart,
    setCartProducts,
    setTotalCartPrice,
    setNumOfCartItems,
    clearCart,
    couponName,
  } = useContext(cartContext);
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const navigate = useNavigate();

  async function confirmPayment(values) {
    console.log("submit", values);

    try {
      debugger;
      const cartData = await getUserCart();
      const products = cartData.cart.products.map((p) => {
        return { productId: p.productId, quantity: p.quantity };
      });
      const token = localStorage.getItem("tkn");

      values = { ...values, products };
      const phone = values.phone;
      values.phone = [phone];

      // Only include the coupon name if it's not empty
      if (couponName) {
        values.couponName = couponName;
      }

      console.log(values);

      const { data } = await axios.post(`${API_BASE_URL}/order`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.message === "Done") {
        toast.success("order placed successfully");

        await clearCart();

        window.open(data.session.url, "_self");
      }
    } catch (err) {
      toast.error(err.response.data.globalMessage);
      console.log("error", err);
    }
  }

  const formikObj = useFormik({
    initialValues: { paymentTypes: "card" },

    onSubmit: confirmPayment,

    validate: function (values) {
      setErrMsg(null);

      const errors = {};

      if (values && values.address && values.address.length < 20) {
        errors.address = "address must be at least 20 letters";
      }

      if (
        values &&
        values.phone &&
        !values.phone.match(/^(02)?01[0125][0-9]{8}$/)
      ) {
        errors.phone = "phone not valid";
      }

      return errors;
    },
  });

  return (
    <>
      <div className="container-fluid">
        <div className="row col-md-6 offset-md-3 p-5">
          <h1 className="text-uppercase">Shipping Details</h1>
          {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
          {successMsg ? (
            <div className="alert alert-success">{successMsg}</div>
          ) : (
            ""
          )}

          <form onSubmit={formikObj.handleSubmit}>
            <label htmlFor="address" className="form-label mt-5">
              Address
            </label>
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              id="address"
              value={formikObj.values.address}
              className="form-control"
              type="text"
              aria-label="default input example"
            />
            {formikObj.errors.address && formikObj.touched.address ? (
              <div className="text-danger mt-1">{formikObj.errors.address}</div>
            ) : (
              ""
            )}

            <label htmlFor="phone" className="form-label mt-3">
              Phone
            </label>
            <input
              onBlur={formikObj.handleBlur}
              onChange={formikObj.handleChange}
              id="phone"
              value={formikObj.values.phone}
              className="form-control"
              type="text"
              aria-label="default input example"
            />
            {formikObj.errors.phone && formikObj.touched.phone ? (
              <div className="text-danger mt-1">{formikObj.errors.phone}</div>
            ) : (
              ""
            )}

            <div
              onBlur={formikObj.handleBlur}
              className="d-flex justify-content-end mt-3"
            >
              <button
                type="submit"
                id="submit"
                disabled={
                  formikObj.isValid === false || formikObj.dirty === false
                }
                className="btn btn-primary w-100 mt-3"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
