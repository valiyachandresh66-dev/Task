import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        if (!email || !password) {
            return toast.error("Please fill all fields");
        }

        try {

            const data = {
                email,
                password
            };

            const res = await axios.post(
                "http://localhost:4000/api/v1/user/login",
                data
            );

            if (res.data.success) {

                
                localStorage.setItem(
                    "token",
                    res.data.token
                );

               
                localStorage.setItem("user",JSON.stringify(res.data.user));

                toast.success("Login Successfully");

                navigate("/task");
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div>

            <h2>Login Page</h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <h4>
                Don't Have an Account?{" "}
                <Link to="/register">
                    Register Now
                </Link>
            </h4>

        </div>
    );
};

export default Login;

