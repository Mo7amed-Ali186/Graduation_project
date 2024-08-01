import React from "react";
import { API_BASE_URL } from "../config";
import axios from "axios";
import { useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

export const Orders = () => {
  // Function to fetch all orders
  async function getAllOrders() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/order/orders/myOrders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Could not fetch orders");
    }
  }

  // Using react-query to manage data fetching and caching
  const { isLoading, data, error } = useQuery("allOrders", getAllOrders);

  // Handling loading state
  if (isLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  // Handling error state
  if (error) {
    return <div>Error fetching orders: {error.message}</div>;
  }

  // Checking if orders data exists
  if (!data || !data.data || !data.data.order) {
    return <div>No orders found.</div>;
  }

  // Handling order cancellation
  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("tkn");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const config = {
        method: "patch",
        url: `${API_BASE_URL}/order/${orderId}/canceled`,
        headers,
      };

      const response = await axios(config);
      if (response && response.status === 200) {
        toast.success("Order has been canceled successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (response && response.status === 400) {
        if (response?.data?.globalMessage) {
          toast.error(response.data?.globalMessage);
        }
      }
    } catch (e) {
      toast.error("Error occurred while canceling the order");
    }
  };

  // Extracting orders from the response data
  let orders = data.data.order;

  return (
    <div className="container py-5">
      <div className="section-heading">My Orders</div>
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-md-4 mb-4">
            <div className="order-card card h-100 p-3">
              <div className="card-body">
                <h5 className="fw-bolder text-center mb-5">{order._id}</h5>
                <strong className="card-title">Products: </strong>
                <ul className="py-1">
                  {order.products.map((product, index) => (
                    <li key={index} className="text-dark">
                      {product.name} - Quantity: {product.quantity}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Address: </strong>
                  {order.address}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {order.phone.join(", ")}
                </p>
                <p>
                  <strong>Payment Type: </strong>
                  {order.paymentTypes}
                </p>
                <p>
                  <strong>Final Price: </strong>
                  {order.finalPrice}
                </p>
                <p>
                  <strong>Status: </strong>
                  {order.status}
                </p>
                {order.status === "waitForPayment" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
