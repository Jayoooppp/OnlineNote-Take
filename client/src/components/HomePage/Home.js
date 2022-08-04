import React from 'react';
import axios from "axios";
import "./master.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from '../Error';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

const Home = () => {

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {

            if (loading) {
                await new Promise((r) => setTimeout(r, 1000));

            }
            setLoading(false);
        };

        loadData();

        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            navigate("/main");
        }
    })



    function handlSubmit(e) {
        e.preventDefault();
        setLoading(true)

        axios.post(
            "/login", { email, password })
            .then(res => {
                localStorage.setItem("userInfo", JSON.stringify(res.data))

                console.log(res.data);
            })
            .catch(error => {
                setError(error.response.data.message)

            });

    }



    return (
        <>
            {loading && (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>)}
            {error && <Error variant='danger'>{error}</Error>}
            <Header />
            <div class="jumbotron heading">
                <h1 class="display-4">Welcome To Keeper App</h1>
                <p class="lead">Keeper App allows users to make notes online and store them privately</p>
            </div>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <form class="login100-form validate-form" method='post' onSubmit={handlSubmit}>
                            <span class="login100-form-title p-b-26">
                                Login
                            </span>
                            <span class="login100-form-title p-b-48">
                                <i class="zmdi zmdi-font"></i>
                            </span>
                            <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                <label></label>
                                <input class="input100" type="email" name="email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} value={email} required />
                                <span class="focus-input100" data-placeholder="Email"></span>
                            </div>

                            <div class="wrap-input100 validate-input" data-validate="Enter password">
                                <span class="btn-show-pass">
                                    <i class="zmdi zmdi-eye"></i>
                                </span>
                                <label></label>

                                <input class="input100" type="password" name="pass" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} value={password} required />
                                <span class="focus-input100" data-placeholder="Password"></span>
                            </div>

                            <div class="container-login100-form-btn">
                                <button class="login100-form-btn">
                                    Login
                                </button>

                            </div>

                            <div class="text-center p-t-115 bottom">
                                <span class="txt1">
                                    Don’t have an account?
                                </span>
                                &nbsp;&nbsp;
                                <a class="txt2" href="/signup">
                                    Sign Up
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home