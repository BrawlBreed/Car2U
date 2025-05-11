import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../context/auth';
import moment from 'moment';
import axios from 'axios';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const { Option } = Select;

const AdminOrders = () => {
  const [statusOptions, setStatusOptions] = useState([
    'Необработена',
    'В процес на обработка',
    'Изпратена',
    'Доставена',
    'Отказана',
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/user/allOrders`
      );
      setOrders(data);
    } catch (err) {
      toast.error('Грешка на сървъра');
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
    window.scrollTo(0, 0);
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/user/orderStatus/${orderId}`,
        { status: value }
      );
      fetchOrders();
      toast.success(`Статусът е променен на ${value}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container marginStyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 my-3">
            <h1 className="text-center">Управление на поръчки</h1>
            {orders.map((order, i) => (
              <React.Fragment key={order._id}>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Статус</th>
                        <th>Клиент</th>
                        <th>Дата</th>
                        <th>Плащане</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            defaultValue={order.status}
                            onChange={(value) => handleChange(order._id, value)}
                          >
                            {statusOptions.map((s, idx) => (
                              <Option key={idx} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order.buyer?.name}</td>
                        <td>{moment(order.createdAt).fromNow()}</td>
                        <td>
                          <span className={
                            order.payment.success
                              ? 'badge bg-success'
                              : 'badge bg-danger'
                          }>
                            {order.payment.success ? 'Успех' : 'Неуспех'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container">
                  <div className="row">
                    {order.products.map((p) => (
                      <div className="col-md-4 my-2" key={p._id}>
                        <div className="card p-3 text-center">
                          <Link to={`/car/${p.slug}`}>
                            <img
                              src={`${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/${p.productPictures[0]}`}
                              alt={p.name}
                              style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                            />
                          </Link>
                          <p className="mt-2 mb-1">{p.name}</p>
                          <p>{p.price} €</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
