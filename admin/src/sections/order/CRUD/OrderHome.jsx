/* eslint-disable react/button-has-type */
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOrders, rejectOrder } from './OrderReducer';

function OrderHome() {
  const ordersState = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // Change this as needed

  function convertUtcToLocal(utcTimeString) {
    const utcDate = new Date(utcTimeString);
    const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return localDate.toLocaleString(); // Adjust options as needed
  }

  useEffect(() => {
    if (ordersState.status === 'idle') {
      dispatch(getOrders());
    }
  }, [ordersState.status, dispatch]);

  const handleRejection = (id) => {
    dispatch(rejectOrder(id))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          toast.success('Order has been rejected successfully');
        } else {
          toast.error(res.payload.response.data.globalMessage);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  let content;
  if (ordersState.loading) {
    content = <Spinner text="Loading" />;
  } else if (ordersState.status === 'rejected') {
    content = <h2>Error in fetching data {ordersState.error}</h2>;
  } else {
    const { orders } = ordersState;

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    content = (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Id</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Payment Type</th>
              <th>Final Price</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>{order.paymentTypes}</td>
                <td>{order.finalPrice}</td>
                <td>{order.status}</td>
                <td>{convertUtcToLocal(order.createdAt)}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => handleRejection(order._id)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      Reject Order
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination" style={{ gap: '3px' }}>
          <button
            style={{ gap: '20px' }}
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
            <button
              style={{
                borderTopLeftRadius: '5px',
                borderBottomLeftRadius: '5px',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
                padding: '10px',
                marginRight: '5px',
                transition: 'background-color 0.3s ease',
                backgroundColor: currentPage === i + 1 ? '#224f34' : 'transparent',
                color: currentPage === i + 1 ? 'white' : 'black',
              }}
              type="button"
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
          <button
            style={{ gap: '20px' }}
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          >
            Next
          </button>
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <div className="container">
      <h2>Order Page</h2>
      {content}
    </div>
  );
}

export default OrderHome;
