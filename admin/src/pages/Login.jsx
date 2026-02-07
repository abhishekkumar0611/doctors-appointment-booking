import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

const Login = () => {

    const [state, setSate] = useState('Admin')
    return (
        <form>
            <div>
                <p>
                    <span>{state}</span>Login
                </p>
                <div>
                    <p>Email</p>
                    <input type="email" required />
                </div>
                <div>
                    <p>Password</p>
                    <input type="password" required />
                </div>
                <button>Login</button>

            </div>
        </form>

    )
}

export default Login
