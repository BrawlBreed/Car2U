import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import toast from 'react-hot-toast';

const CreateBrands = () => {
  const [name, setName] = useState('');
  const [brandPictures, setBrandPictures] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrandPictures([file]);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error('Необходимо е име на марката');
      return false;
    }
    if (brandPictures.length === 0) {
      toast.error('Моля, качете изображение на марката');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const base64Image = await convertToBase64(brandPictures[0]);

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/brand/create-brand`,
        { name, brandBase64Image: base64Image }
      );

      if (data.success) {
        toast.success('Марка създадена успешно');
        navigate('/dashboard/admin/allbrands');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Възникна грешка при създаването');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container marginStyle">
      {loading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 my-3">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Създай марка</h1>
                <div className="m-1">
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      placeholder="Въведете име на марката"
                      className="form-control"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  {previewImage && (
                    <div className="mb-3 text-center">
                      <img src={previewImage} alt="preview" className="img img-fluid" />
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="btn btn-outline-primary col-md-12">
                      Качи изображение
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-success">Създай марка</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBrands;
