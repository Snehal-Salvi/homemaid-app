import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ORDERS_URL } from '../../constants';
import styles from './MyOrders.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faCalendarAlt, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  // State variables to manage orders, loading state, and errors
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user info from Redux store
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    // Function to fetch user orders from the backend
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Fetch user orders using their user ID
        const response = await fetch(`${ORDERS_URL}/user/${userInfo._id}`);
        const data = await response.json();
        // Handle different cases based on the response
        if (!response.ok) {
          if (response.status === 404) {
            setOrders([]);
            setError('No orders found for the user');
          } else {
            throw new Error(data.message || 'Failed to fetch orders');
          }
        } else {
          setOrders(data);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch orders');
        setIsLoading(false);
      }
    };

    // Fetch user orders when the component mounts or user info changes
    fetchOrders();
  }, [userInfo._id]);

  // Function to handle deleting an order
  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${ORDERS_URL}/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      // Remove the deleted order from the orders state
      setOrders(orders.filter((order) => order._id !== orderId));
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error.message);
      toast.error('Failed to delete order');
    }
  };

  return (
    <div className={styles.container}>
      {/* Render loading message while loading */}
      {isLoading && <div>Loading...</div>}
      {/* Render error message if there's an error fetching orders */}
      {error && error !== 'No orders found for the user' && <div>Error: {error}</div>}
      {/* Render message if no orders are found */}
      {orders.length === 0 && !isLoading && !error && (
        <p>No orders placed yet. Start booking now!</p>
      )}
      {/* Render orders table if there are orders */}
      {orders.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Maid</th>
              <th>Price</th>
              <th>Booking Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {order.orderItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {/* Render order details */}
                    <td className={styles.imageCell}>
                      <img src={item.image} alt="Maid" className={styles.image} />
                    </td>
                    <td>{item.maid}</td>
                    <td>
                      <FontAwesomeIcon icon={faDollarSign} /> {item.price}
                    </td>
                    <td>
                      <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                      {new Date(order.bookingDate).toLocaleString()}
                    </td>
                    {/* Button to delete the order */}
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
