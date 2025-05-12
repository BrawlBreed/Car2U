import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { Select, Modal } from 'antd';
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
    if (!brand.trim()) { toast.error('Необходима е марка'); return false; }
    if (productPictures.length === 0) { toast.error('Добавете поне една снимка'); return false; }
    if (!name.trim()) { toast.error('Необходимо е име'); return false; }
    if (!price.trim()) { toast.error('Необходима е цена'); return false; }
    if (!fuelType.trim()) { toast.error('Необходимо е тип гориво'); return false; }
    if (!transmission.trim()) { toast.error('Необходима е трансмисия'); return false; }
    if (!engineSize.trim()) { toast.error('Необходим е обем двигател'); return false; }
    if (!mileage.trim()) { toast.error('Необходимо е пробег'); return false; }
    if (!seater.trim()) { toast.error('Необходим е брой места'); return false; }
    if (!size.trim()) { toast.error('Необходими са размери'); return false; }
    if (!fuelTank.trim()) { toast.error('Необходим е резервоар'); return false; }
    if (!description.trim()) { toast.error('Необходимо е описание'); return false; }
    if (!shipping.trim()) { toast.error('Необходимо е доставка'); return false; }
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

  const handleImageChange = (e) => {
    setProductPictures(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const carData = new FormData();
      carData.append('name', name);
      carData.append('description', description);
      carData.append('shipping', shipping);
      carData.append('brand', brand);
      carData.append('price', price);
      carData.append('fuelType', fuelType);
      carData.append('transmission', transmission);
      carData.append('engineSize', engineSize);
      carData.append('mileage', mileage);
      carData.append('seater', seater);
      carData.append('size', size);
      carData.append('fuelTank', fuelTank);
      productPictures.forEach(image => carData.append('productPictures', image));
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getAllCar(); window.scrollTo(0, 0); }, []);

  return (
    <div className="container marginStyle">
      {loading ? <Loading /> : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"><AdminMenu /></div>
            <div className="col-md-9 my-3">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  {productPictures.map((img,i)=>(
                    <img key={i} src={URL.createObjectURL(img)} alt={i} className="img-fluid" />
                  ))}
                </div>
                <label className="btn btn-outline-primary mb-3">
                  Качи снимки
                  <input type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
                </label>
                {/** text inputs **/}
                <div className="mb-3"><input type="text" placeholder="Име на автомобила" className="form-control" value={name} onChange={e=>setName(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Цена" className="form-control" value={price} onChange={e=>setPrice(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Тип гориво" className="form-control" value={fuelType} onChange={e=>setFuelType(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Трансмисия" className="form-control" value={transmission} onChange={e=>setTransmission(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Обем двигател" className="form-control" value={engineSize} onChange={e=>setEngineSize(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Пробег" className="form-control" value={mileage} onChange={e=>setMileage(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Брой места" className="form-control" value={seater} onChange={e=>setSeater(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Размери" className="form-control" value={size} onChange={e=>setSize(e.target.value)} /></div>
                <div className="mb-3"><input type="text" placeholder="Резервоар" className="form-control" value={fuelTank} onChange={e=>setFuelTank(e.target.value)} /></div>
                <div className="mb-3"><textarea rows={3} placeholder="Описание" className="form-control" value={description} onChange={e=>setDescription(e.target.value)} /></div>
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
