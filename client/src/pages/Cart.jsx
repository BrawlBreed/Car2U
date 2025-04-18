import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { HiOutlineTrash } from 'react-icons/hi'
import toast from 'react-hot-toast';
import ContactForm from './ContactForm';

const Cart = () => {
    const [cart, setcart] = useCart();
    const [auth, setAuth] = useAuth();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                const po = item.price.replace(' lakh', '')
                total = total + parseInt(po);
            });
            return total.toLocaleString("bg-BG", {
                style: "currency",
                currency: "EUR",
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setcart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (err) {
            console.log(err)
        }
    }
    
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_URL ?  process.env.REACT_APP_URL : process.env.REACT_APP_API_URL}/api/car/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getToken();
        window.scrollTo(0, 0)
    }, [auth?.token]);
    
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_URL ?  process.env.REACT_APP_URL : process.env.REACT_APP_API_URL}/api/car/braintree/payment`, {
                nonce,
                cart
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setcart([]);
            navigate("/dashboard/user/order");
            toast.success("Плащането беше успешно завършено");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    
    const notify = () => toast.success('Артикулът беше премахнат успешно')
    
    return (
        <div className='my-5'>
            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <h5 style={{ fontWeight: 'bold'}} className="mb-3">{!auth?.user
                                                ? "Здравейте, Гост"
                                                : `Здравей, ${auth?.token && auth?.user?.name}`}
                                            </h5>
                                            <hr />
    
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p style={{ fontWeight: 'bold'}} className="mb-1">Артикули</p>
                                                    <p className="mb-0">{cart?.length
                                                        ? `Имате ${cart.length} ${cart.length > 1 ? "артикула" : "артикул"} в запитването си ${auth?.token ? "" : ", моля влезте в профила си за да завършите поръчката!"}`
                                                        : "Количката ви е празна"}
                                                    </p>
                                                </div>
                                            </div>
    
                                            {cart?.map((p) => (
                                                <div className="card my-3 mb-lg-0">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row align-items-center">
                                                                <div>
                                                                    <Link to={`/car/${p.slug}`} className='text-center'>
                                                                        <img
                                                                            src={p.productPictures[0]}
                                                                            className="card-img-top"
                                                                            alt={p.name}
                                                                            style={{ maxWidth: '100%', maxHeight: '80px', objectFit: 'contain' }}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className="mx-2">
                                                                    <p className='sizePrice'><span className='badge rounded-pill text-bg-primary'>{p.brand.name}</span></p>
                                                                    <p className="sizePrice">{p.name}</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="sizePrice">{p.price} Евро</p>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => { removeCartItem(p._id); notify() }}
                                                                >
                                                                    <HiOutlineTrash size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
    
                                        {/* <div className="col-lg-5">
                                            <div className="card text-white rounded-3 cartStyle">
                                                <div className='card-body'>
                                                    <div className="text-center text-black">
                                                        <h2 style={{ fontWeight: 'bold'}}>Общо</h2>
                                                        <p style={{ fontWeight: 'bold'}}>Обща сума | Плащане</p>
                                                        <hr />
                                                        <h4>Общо : {totalPrice()} Евро</h4>
                                                        {auth?.user?.address ? (
                                                            <>
                                                                <div className="mb-3">
                                                                    <h4>Настоящ адрес</h4>
                                                                    <h5>{auth?.user?.address}</h5>
                                                                    <button
                                                                        className="btn btn-secondary my-2"
                                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                                    >
                                                                        Обнови адреса
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="mb-3">
                                                                {auth?.token ? (
                                                                    <button
                                                                        className="btn btn-outline-warning"
                                                                        onClick={() => navigate("/dashboard/user/profile")}
                                                                    >
                                                                        Добави адрес
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() =>
                                                                            navigate("/login", {
                                                                                state: "/cart",
                                                                            })
                                                                        }
                                                                    >
                                                                        Влез, за да завършиш поръчката
                                                                    </button>
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="mt-2">
                                                            {!clientToken || !auth?.token || !cart?.length ? (
                                                                ""
                                                            ) : (
                                                                <>
                                                                    <DropIn
                                                                        options={{
                                                                            authorization: clientToken,
                                                                            paypal: {
                                                                                flow: "vault",
                                                                            },
                                                                        }}
                                                                        onInstance={(instance) => setInstance(instance)}
                                                                    />
    
                                                                    <button
                                                                        className="btn btn-dark mt-3"
                                                                        onClick={handlePayment}
                                                                        disabled={loading || !instance || !auth?.user?.address}
                                                                    >
                                                                        {loading ? "Обработка ...." : "Извърши плащане"}
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>*/}
                                        <ContactForm/>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Cart
