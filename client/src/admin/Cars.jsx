import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsFuelPumpFill } from 'react-icons/bs';
import { PiCurrencyInrFill } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/car/getAll-car`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );
      const data = await res.json();
      setCars(data.cars.reverse());
    } catch (err) {
      console.error(err);
      toast.error('Грешка при зареждане на автомобилите');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/car/delete-car/${id}`
      );
      if (data.success) {
        toast.success('Автомобилът беше изтрит успешно');
        fetchCars();
      } else {
        toast.error('Грешка при изтриване на автомобил');
      }
    } catch (err) {
      console.error(err);
      toast.error('Грешка при изтриване на автомобил');
    }
  };

  useEffect(() => {
    fetchCars();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container marginStyle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center my-3">Списък с автомобили</h1>
            {loading ? (
              <div className="h-100 d-flex align-items-center justify-content-center">
                <ColorRing
                  visible={true}
                  colors={['#000435', '#0ea5e9', '#f3f4f6', '#000435', '#0ea5e9']}
                />
              </div>
            ) : (
              <div className="row mt-0">
                {cars.map((car) => (
                  <div key={car._id} className="col-md-12 col-lg-4 my-3">
                    <div className="card">
                      <div className="d-flex justify-content-between p-3">
                        <p className="lead mb-0">{car.brand.name}</p>
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center shadow"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <Link to={`/brand/${car.brand.name}`}> 
                            <img
                              src={car.brand.brandPictures}
                              alt={car.brand.name}
                              style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }}
                            />
                          </Link>
                        </div>
                      </div>
                      <Link to={`/dashboard/admin/car/${car.slug}`}>
                        <img
                          className="border rounded mx-auto d-block"
                          src={car.productPictures[0]}
                          alt={car.name}
                          style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
                        />
                      </Link>
                      <div className="card-body text-center">
                        <h4 className="mb-4">{car.name}</h4>
                        <div className="d-flex justify-content-between">
                          <h6><PiCurrencyInrFill /> {car.price} €</h6>
                          <h6><BsFuelPumpFill /> {car.fuelType}</h6>
                        </div>
                        <div className="mt-2">
                          <Link
                            to={`/car/${car.slug}`}
                            className="btn btn-secondary me-2"
                          >
                            Преглед
                          </Link>
                          <Link
                            to={`/dashboard/admin/car/${car.slug}`}
                            className="btn btn-primary me-2"
                          >
                            Редактирай
                          </Link>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="btn btn-danger"
                          >
                            Изтрий
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
