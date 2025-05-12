import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import toast from 'react-hot-toast';

const { Option } = Select;

const CreateCar = () => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [price, setPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [mileage, setMileage] = useState('');
  const [seater, setSeater] = useState('');
  const [size, setSize] = useState('');
  const [fuelTank, setFuelTank] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!brand.trim()) return toast.error('Необходима е марка') || false;
    if (productPictures.length === 0) return toast.error('Добавете поне една снимка') || false;
    if (!name.trim()) return toast.error('Необходимо е име') || false;
    if (!price.trim()) return toast.error('Необходима е цена') || false;
    if (!fuelType.trim()) return toast.error('Необходимо е тип гориво') || false;
    if (!transmission.trim()) return toast.error('Необходима е трансмисия') || false;
    if (!engineSize.trim()) return toast.error('Необходим е обем двигател') || false;
    if (!mileage.trim()) return toast.error('Необходимо е пробег') || false;
    if (!seater.trim()) return toast.error('Необходим е брой места') || false;
    if (!size.trim()) return toast.error('Необходими са размери') || false;
    if (!fuelTank.trim()) return toast.error('Необходим е резервоар') || false;
    if (!description.trim()) return toast.error('Необходимо е описание') || false;
    if (!shipping.trim()) return toast.error('Необходимо е доставка') || false;
    return true;
  };

  const getAllCar = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/brand/getAll-brand`
      );
      if (data.success) setBrands(data.brands);
    } catch (err) {
      console.error(err);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setProductPictures(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);

      const base64Images = await Promise.all(
        productPictures.map((file) => convertToBase64(file))
      );

      const carData = {
        name,
        description,
        shipping,
        brand,
        price,
        fuelType,
        transmission,
        engineSize,
        mileage,
        seater,
        size,
        fuelTank,
        productBase64Images: base64Images,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_URL || process.env.REACT_APP_API_URL}/api/car/create-car`,
        carData
      );

      if (data.success) {
        toast.success('Автомобилът беше създаден успешно');
        navigate('/dashboard/admin/cars');
      } else {
        toast.error('Грешка при създаване на автомобил');
      }
    } catch (err) {
      console.error(err.message);
      toast.error('Възникна грешка при създаването');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCar();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container marginStyle">
      {loading ? <Loading /> : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"><AdminMenu /></div>
            <div className="col-md-9 my-3">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Създаване на автомобил</h1>
                <Select
                  bordered={false}
                  placeholder="Изберете марка"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={setBrand}
                >
                  {brands.map(c => (
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))}
                </Select>

                <div className="mb-3">
                  {previewImages.map((img, i) => (
                    <img key={i} src={img} alt={`preview-${i}`} className="img-fluid" />
                  ))}
                </div>

                <label className="btn btn-outline-primary mb-3">
                  Качи снимки
                  <input type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
                </label>

                <div className="mb-3"><input type="text" placeholder="Име на автомобила" className="form-control" value={name} onChange={e => setName(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Цена" className="form-control" value={price} onChange={e => setPrice(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Тип гориво" className="form-control" value={fuelType} onChange={e => setFuelType(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Трансмисия" className="form-control" value={transmission} onChange={e => setTransmission(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Обем двигател" className="form-control" value={engineSize} onChange={e => setEngineSize(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Пробег" className="form-control" value={mileage} onChange={e => setMileage(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Брой места" className="form-control" value={seater} onChange={e => setSeater(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Размери" className="form-control" value={size} onChange={e => setSize(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Резервоар" className="form-control" value={fuelTank} onChange={e => setFuelTank(e.target.value)} /></div>
                <div className="mb-3"><textarea rows={3} placeholder="Описание" className="form-control" value={description} onChange={e => setDescription(e.target.value)} /></div>
                <Select
                  bordered={false}
                  placeholder="Доставка"
                  size="large"
                  className="form-select mb-3"
                  onChange={setShipping}
                >
                  <Option value="0">Не</Option>
                  <Option value="1">Да</Option>
                </Select>
                <button type="submit" className="btn btn-success">Създай автомобил</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCar;
