import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { toast } from "react-hot-toast";

export function Register() {
  let user = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const navigate = useNavigate();

  async function regesterNewUser(values) {
    console.log("submit", values);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/signUp`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.message === "Done") {
        toast.success("Account has created successfully");
        toast.success("Please confirm your email to login");
        setTimeout(function () {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.log("error", err.response.data.details);
      toast.error(err.response.data.globalMessage);
    }
  }

  const formikObj = useFormik({
    initialValues: { ...user, role: "User" },
    onSubmit: regesterNewUser,

    validate: function (values) {
      setErrMsg(null);

      const errors = {};

      if (values.userName.length < 3) {
        errors.userName = "Username must be at least 3 letters";
      }

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "This email is invalid";
      }

      if (values.cPassword !== values.password) {
        errors.cPassword = "the password doesn't match";
      }

      return errors;
    },
  });

  return (
    <>
      <div
        className="row bg-primary"
        style={{
          height: "120vh",
        }}
      >
        <div
          className="col-lg-6 login-image-section d-flex justify-content-center align-items-center"
          style={{
            paddingLeft: "100px",
          }}
        >
          <img
            src={require("../assets/images/login.png")}
            alt=""
            style={{
              height: "600px",
              width: "auto",
              marginBottom: "150px",
            }}
          />
        </div>
        <div
          className="col-lg-6 col-md-12 "
          style={{
            padding: "20px 40px",
          }}
        >
          <div className="login-form-section">
            <div className="">
              {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}
              {successMsg ? (
                <div className="alert alert-success">{successMsg}</div>
              ) : (
                ""
              )}
              <h3 className="pt-5">Create an account</h3>
              <p className="mb-5">Enter your details below</p>

              <form onSubmit={formikObj.handleSubmit}>
                <label htmlFor="userName" className="form-label">
                  Username :
                </label>
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  id="userName"
                  value={formikObj.values.userName}
                  className="form-control w-75"
                  type="text"
                  placeholder="Enter Your Username"
                  aria-label="default input example"
                />
                {formikObj.errors.userName && formikObj.touched.userName ? (
                  <div className="text-danger" style={{ fontSize: "14px" }}>
                    {formikObj.errors.userName}
                  </div>
                ) : (
                  ""
                )}

                <div className="my-3">
                  <label htmlFor="email" className="form-label">
                    Email :
                  </label>
                  <input
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.email}
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control w-75"
                  />
                  {formikObj.errors.email && formikObj.touched.email ? (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {formikObj.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <label htmlFor="password" className="form-label">
                  Password :
                </label>
                <input
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  placeholder="Enter Your Password"
                  id="password"
                  type="password"
                  className="form-control w-75"
                />
                {formikObj.errors.password && formikObj.touched.password ? (
                  <div className="text-danger" style={{ fontSize: "14px" }}>
                    {formikObj.errors.password}
                  </div>
                ) : (
                  ""
                )}

                <div className="my-3">
                  <label htmlFor="cPassword" className="form-label">
                    Re-password :
                  </label>
                  <input
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.cPassword}
                    id="cPassword"
                    placeholder="Confirm Your Password"
                    type="password"
                    className="form-control w-75"
                  />
                  {formikObj.errors.cPassword && formikObj.touched.cPassword ? (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {formikObj.errors.cPassword}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="action">
                  <button
                    type="submit"
                    id="submit"
                    className="btn btn-danger mt-3 w-75 py-2"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
