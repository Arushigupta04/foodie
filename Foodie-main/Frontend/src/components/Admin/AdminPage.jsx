import React, { useState, useEffect } from 'react';
import AddItemImg from "../../assets/add-items.svg"
import { useUser } from '../userContext';

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000"

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${serverURL}/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${serverURL}/api/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
    fetchOrders();
  }, []);

  const totalEarnings = orders.reduce((total, order) => {
    return total + (parseFloat(order.price) * parseInt(order.quantity));
  }, 0);

  const { user } = useUser();

  return (
    <>
      {error ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {user && user.role === "Admin" ?
            (
              <>
                <div id="wrapper">
                  <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                      <div className="container-fluid" style={{ display: "contents" }}>
                        <div className="d-sm-flex align-items-center justify-content-center mb-4">
                          <h1 className="h3 mb-0 text-gray-800 " style={{ textAlign: "center" }}>Dashboard</h1>
                        </div>

                        <div className="row" style={{ justifyContent: "center" }}>
                          {/* Earnings (Total) Card */}
                          <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                      Earnings (Total)
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">₹{totalEarnings}</div>
                                  </div>
                                  <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Total Orders Card */}
                          <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                              <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                  <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                      Total Orders
                                    </div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{orders.length}</div>
                                  </div>
                                  <div className="col-auto">
                                    <i className="fa-solid fa-cart-shopping fa-2x"></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Users Overview */}
                        <div className="row" style={{ justifyContent: "center" }}>
                          <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Users Overview</h6>
                              </div>
                              <div className="card-body">
                                {users.map((user) => (
                                  <div className="card mb-3" key={user._id}>
                                    <div className="row no-gutters">
                                      <div className="col-md-8">
                                        <div className="card-body">
                                          <h5 className="card-title">{user.fullName ? user.fullName : 'N/A'}</h5>
                                          <div className="text-container">
                                            <h6>Email:</h6>
                                            <p>&nbsp;&nbsp;{user.email}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Mobile:</h6>
                                            <p>&nbsp;&nbsp;{user.mobile}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Orders Overview */}
                        <div className="row" style={{ justifyContent: "center" }}>
                          <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Orders Overview</h6>
                              </div>
                              <div className="card-body">
                                {orders.map((order) => (
                                  <div className="card mb-3" key={order._id}>
                                    <div className="row no-gutters">
                                      <div className="col-md-4" style={{ alignSelf: 'center' }}>
                                        <img src={order.image} className="card-img" alt="Product" />
                                      </div>
                                      <div className="col-md-8">
                                        <div className="card-body">
                                          <h5 className="card-title">{order.name}</h5>
                                          <div className="text-container">
                                            <h6>User Name:</h6>
                                            <p>&nbsp;&nbsp;{user.fullName ?user.fullName : 'N/A'}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Email:</h6>
                                            <p>&nbsp;&nbsp;{user.email}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Price:</h6>
                                            <p>&nbsp;&nbsp;₹{order.price}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Address:</h6>
                                            <p>&nbsp;&nbsp;{order.delivery_address}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Quantity:</h6>
                                            <p>&nbsp;&nbsp;{order.quantity}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Total Price:</h6>
                                            <p>&nbsp;&nbsp;₹{order.price * order.quantity}</p>
                                          </div>
                                          <div className="text-container">
                                            <h6>Order ID:</h6>
                                            <p>&nbsp;&nbsp;{order._id}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                  <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Add New Items</h6>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: '25rem' }} src={AddItemImg} alt="Add Items" />
                        </div>
                        <p>Add New Food Items and Categories to explore</p>
                        <a target="_blank" rel="nofollow" href="/admin/add-items">Browse Add Items &rarr;</a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : <div className="access-forbidden" style={{ height: "80vh" }}>
              <h3>Access Forbidden</h3>
              <p>Only Admin can Access this page...</p>
            </div>
          }
        </>
      )}
    </>
  );
}

export default AdminDashboard;
