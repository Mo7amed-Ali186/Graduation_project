import React, { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { wishlistContext } from "./WishlistContext";
import { cartContext } from "./CartContext";

export function Wishlist() {
    const { wishlistProducts, deleteWishlistItem } =
        useContext(wishlistContext);
    const { addProductToCart } = useContext(cartContext);

    if (wishlistProducts === null) {
        return (
            <div className=" vh-100 d-flex align-items-center justify-content-center">
                <ColorRing
                    visible={true}
                    hight="80"
                    width="80"
                    arialLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                    ]}
                />
            </div>
        );
    }

    if (wishlistProducts.length === 0) {
        return (
            <>
                <div className=" container py-5" style={{ height: "100vh" }}>
                    <h1 className="pt-5"> Wishlist</h1>
                    <h3>your Wishlist is empty</h3>
                </div>
            </>
        );
    }

    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.message === "Done") {
            toast.success("product was added to cart", {
                position: "top-right",
            });
        } else {
            toast.error("already in cart");
        }
    }

    async function deleteWish(id) {
        const res = await deleteWishlistItem(id);
        if (res.message === "remove to Wishlist") {
            toast.success("product Removed Successfully");
        } else {
            toast.error("Error occurred");
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mb-5">
                    <div
                        className="col-8 offset-2  p-5"
                        style={{ height: "fit-content" }}
                    >
                        <div className="fw-bold shopping-cart-header  d-flex justify-content-between align-items-center p-3">
                            <div className="fs-4">My Wish List</div>
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
                                    <div className="col-2">Stock Status</div>
                                    <div className="col-2">Actions</div>
                                </div>
                            </div>
                            <div className="table-body p-3">
                                {wishlistProducts.map((product) => {
                                    return (
                                        <div className="table-row">
                                            <div
                                                className="row mt-5"
                                                key={product.id}
                                            >
                                                <div className="col-6 d-flex flex-row">
                                                    <div className="col-6">
                                                        <img
                                                            style={{
                                                                width: "auto",
                                                                maxWidth:
                                                                    "200px",
                                                                height: "150px",
                                                            }}
                                                            src={
                                                                product
                                                                    .mainImage
                                                                    .secure_url
                                                            }
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
                                                        <h6 className="fw-bold">
                                                            {product.name}
                                                        </h6>
                                                        <p>
                                                            {
                                                                product
                                                                    .categoryId
                                                                    ?.name
                                                            }
                                                        </p>
                                                        {/* <div className="text-danger">
                                                            {displayDiscount(
                                                                product
                                                            )}
                                                        </div> */}
                                                        <Link
                                                            onClick={() =>
                                                                deleteWish(
                                                                    product._id
                                                                )
                                                            }
                                                            className="text-danger"
                                                        >
                                                            {" "}
                                                            <i className="fa-solid fa-trash-can "></i>{" "}
                                                            Remove{" "}
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-2 fw-bold">
                                                    {product.price}
                                                </div>
                                                <div className="col-2 fw-bold">
                                                    {product.stock > 0
                                                        ? "In Stock"
                                                        : "Out of Stock"}
                                                </div>
                                                <div className="col-2 fw-bold">
                                                    <button
                                                        onClick={() =>
                                                            addProduct(
                                                                product._id
                                                            )
                                                        }
                                                        className="btn btn-sm btn-outline-success w-100 "
                                                    >
                                                        {" "}
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
