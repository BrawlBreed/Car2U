import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import BrandForm from './BrandForm';
import { Modal } from 'antd';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';

const CreateCategory = () => {
  const [brands, setBrands] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/brand/getAll-brand`
      );
      if (data.success) setBrands(data.brands.reverse());
    } catch (err) {
      console.error(err);
      toast.error('Грешка при зареждане на марки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
    window.scrollTo(0, 0);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/brand/update-brand/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success('Марката беше актуализирана успешно');
        setVisible(false);
        setSelected(null);
        setUpdatedName('');
        fetchBrands();
      } else {
        toast.error('Грешка при актуализиране на марката');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/brand/delete-brand/${id}`
      );
      if (data.success) {
        toast.success('Марката беше изтрита успешно');
        fetchBrands();
      } else {
        toast.error('Грешка при изтриване на марката');
      }
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
            <h1 className="text-center">Списък с марки</h1>
            {loading ? (
              <div className="h-100 d-flex align-items-center justify-content-center">
                <ColorRing
                  visible={true}
                  colors={['#000435', '#0ea5e9', '#f3f4f6', '#000435', '#0ea5e9']}
                />
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Изображение</th>
                        <th>Име на марка</th>
                        <th>Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {brands.map((b) => (
                        <tr key={b._id}>
                          <td>
                            <img
                              src={b.brandPictures}
                              alt={b.name}
                              style={{ maxWidth: '100%', maxHeight: '50px', objectFit: 'contain' }}
                            />
                          </td>
                          <td>{b.name}</td>
                          <td>
                            <button
                              className="btn btn-primary me-2"
                              onClick={() => {
                                setSelected(b);
                                setUpdatedName(b.name);
                                setVisible(true);
                              }}
                            >
                              Редакция
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(b._id)}
                            >
                              Изтриване
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Modal
                    visible={visible}
                    footer={null}
                    onCancel={() => setVisible(false)}
                  >
                    <BrandForm
                      value={updatedName}
                      setValue={setUpdatedName}
                      handleSubmit={handleUpdate}
                    />
                  </Modal>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
