import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Base_URL } from '../server'
import { toast } from 'react-toastify'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleregister = async () => {

        try {

            const data = {
                name,
                email,
                password
            }

            const res = await axios.post(
                `${Base_URL}/user/register`,
                data
            )

            if (res.data.success) {
                toast.success("User Registered Successfully")
                navigate("/")
            }

        } catch (error) {

            console.error("Error in Register:", error)

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            )
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleregister}>
                Register
            </button>
        </div>
    )
}

export default Register