import './App.css';
import Footer from './Home/Footer';
import HomeMain from './Home/HomeMain';
import Navbar from './Home/Navbar';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './admin/AdminDashboard';
import CreateCar from './admin/CreateCar';
import UpdateCar from './admin/UpdateCar';
import Cars from './admin/Cars';
import AdminOrders from './admin/AdminOrders';
import CreateBrands from './admin/CreateBrands';
import BrandsList from './admin/BrandsList';
import Brands from './Home/Brands';
import About from './Home/About';
import PrivateRoute from './Routes/PrivateRoute';
import UserDashboard from './common/UserDashboard';
import UserOrder from './common/UserOrder';
import UserProfile from './common/UserProfile';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import CarsFilterpage from './Home/CarsFilterpage';
import CarView from './pages/CarView';
import { Toaster } from 'react-hot-toast';
import CarInBrand from './pages/CarInBrand';
import PrivacyPolicy from './Links/PrivacyPolicy';
import TermsConditions from './Links/Terms';
import CookiePolicy from './Links/Cookies';
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <Router>
      <Navbar/>
      <>
        <CookieConsent
          location="bottom"
          buttonText="Приемам"
          declineButtonText="Отхвърлям"
          cookieName="car2u_cookie_consent"
          style={{ background: '#fff', color: '#333', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)' }}
          buttonStyle={{ background: '#CC2B52', color: '#fff', fontSize: '14px', padding: '8px 16px' }}
          declineButtonStyle={{ background: 'transparent', color: '#CC2B52', border: '1px solid #CC2B52', padding: '8px 16px' }}
          enableDeclineButton
          onAccept={() => {
            console.log('cookies accepted')
          }}
          onDecline={() => {
            console.log('cookies declined')
          }}
        >
          Използваме бисквитки, за да подобрим вашето преживяване на сайта. 
          <a href="/cookies" style={{ textDecoration: 'underline', marginLeft: '4px' }}>
            Научете повече
          </a>
        </CookieConsent>
      </>
      <Routes>
      <Route path='/' element={<HomeMain />} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/brands' element={<Brands />} />
      <Route path='/about' element={<About />} />
      <Route path='/cars' element={<CarsFilterpage />} />
      <Route path='/car/:slug' element={<CarView/>} />
      <Route path='/brand/:slug' element={<CarInBrand/>} />
      <Route path='/*' element={<NotFound/>} />
      {/* Links */}
      <Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>
      <Route path='/terms' element={<TermsConditions/>}/>
      <Route path='/cookies' element={<CookiePolicy/>}/>
      <Route path='/dashboard' element={<AdminRoutes/>}>
            <Route path='admin' element={<AdminDashboard/>} />
            <Route path='admin/allbrands' element={<BrandsList/>} />
            <Route path='admin/cars' element={<Cars/>} />
            <Route path='admin/create-brand' element={<CreateBrands/>} />
            <Route path='admin/create-product' element={<CreateCar/>} />
            <Route path='admin/car/:slug' element={<UpdateCar/>} />
            <Route path='admin/userorders' element={<AdminOrders/>} />
      </Route>
      <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<UserDashboard/>} />
            <Route path='user/order' element={<UserOrder/>} />
            <Route path='user/profile' element={<UserProfile/>} />
      </Route>
      </Routes>
      <Toaster containerStyle={{zIndex:'9999999'}} reverseOrder={true}/>
      <Footer/>
    </Router>
  );
}

export default App;
