import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { authContext } from "./authen";

import { API_BASE_URL } from "../config";

export function Login() {
  const { setToken } = useContext(authContext);

  let user = {
    email: "",
    password: "",
  };

  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setsuccessMsg] = useState(null);
  const navigate = useNavigate();
  const responseGoogleMessage = async (response) => {
    const { credential } = response;
    await loginUserWithGoogle(credential);
  };
  const errorGoogleMessage = (error) => {
    toast.error("error occored while logging in with google");
  };
  async function loginUser(values) {
    debugger;
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/logIn`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.message === "Done") {
        toast.success("Login Successful");
        debugger;
        localStorage.setItem("tkn", data.token);
        setToken(data.token);

        setTimeout(function () {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      toast.error(err.response.data.globalMessage);
      console.log("error", err.response.data);
    }
  }

  async function loginUserWithGoogle(idToken) {
    //google login
    //token
    const body = { idToken };
    debugger;
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/loginWithGmail`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data && data.message === "Done") {
        toast.success("Login Successful");
        debugger;
        localStorage.setItem("tkn", data.token);
        setToken(data.token);

        setTimeout(function () {
          navigate("/");
        }, 500);
      } else {
        toast.error("login with google failed");
      }
    } catch (err) {
      toast.error("Error occured while logging in");
      console.log("error", err.response.data);
    }
  }

  const formikObj = useFormik({
    initialValues: user,

    onSubmit: loginUser,

    validate: function (values) {
      setErrMsg(null);

      const errors = {};

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "This email is invalid";
      }

      if (values.password.length < 8 || values.password.length > 10) {
        errors.password =
          "password must be betweent 8 characters to 10 characters ";
      }

      return errors;
    },
  });

  return (
    <>
      <div
        className="row bg-primary"
        style={{
          height: "100vh",
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
            padding: "80px",
          }}
        >
          <h5
            style={{
              /* Welcome Back :) */
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "30px",
              lineHeight: "24px",
            }}
          >
            Welcome Back :)
          </h5>
          <p className="pt-3">
            To keep connected with us please login with your personal
            information by email address and password 🔔.
          </p>
          <div className="login-form-section">
            <div className="">
              <h3 className="pt-5">Log in to Exclusive</h3>
              <p>Enter your details below</p>

              <form onSubmit={formikObj.handleSubmit}>
                <div className="my-3">
                  {/* <label
                                style={{ color: "#6F6F6F" }}
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label> */}
                  <input
                    placeholder="Enter your email"
                    onBlur={formikObj.handleBlur}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.email}
                    id="email"
                    type="email"
                    className="form-control mb-1 w-75"
                  />
                  {formikObj.errors.email && formikObj.touched.email ? (
                    <div className="text-danger" style={{ fontSize: "14px" }}>
                      {formikObj.errors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* <label
                            style={{ color: "#6F6F6F" }}
                            htmlFor="email"
                            className="form-label"
                        >
                            Password
                        </label> */}
                <input
                  placeholder="Enter your password"
                  onBlur={formikObj.handleBlur}
                  onChange={formikObj.handleChange}
                  value={formikObj.values.password}
                  id="password"
                  type="password"
                  className="form-control mb-1 w-75"
                />
                {formikObj.errors.password && formikObj.touched.password ? (
                  <div className="text-danger" style={{ fontSize: "14px" }}>
                    {formikObj.errors.password}
                  </div>
                ) : (
                  ""
                )}

                <div className="actions mt-5 ">
                  <div
                    onBlur={formikObj.handleBlur}
                    className="d-flex justify-content-between align-items-center  mt-3"
                  >
                    <button
                      type="submit"
                      id="submit"
                      // disabled={
                      //     formikObj.isValid === false ||
                      //     formikObj.dirty === false
                      // }
                      className="btn btn-danger px-5 py-2"
                    >
                      Login Now
                    </button>
                    <Link
                      to={"/forgot-password"}
                      className="text-danger fw-semibold passHov text-decoration-none mx-auto"
                    >
                      Forget Password?
                    </Link>
                  </div>
                </div>
              </form>
              <div className="w-75 mt-3 ">
                <div className="d-flex justify-content-between align-items-center ">
                  <GoogleLogin
                    onSuccess={responseGoogleMessage}
                    onError={errorGoogleMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
