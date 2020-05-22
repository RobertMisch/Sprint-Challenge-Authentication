import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Login(props) {
    const [loginState, setLoginState] = useState({ credentals: { username: '', password: '' }, isLoading: false })

    // console.log(loginState.credentals.username)
    const changeHandler = (e) => {
        e.preventDefault()
        setLoginState({ credentals: { ...loginState.credentals, [e.target.name]: e.target.value } })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setLoginState({ ...loginState, isLoading: true })
        axiosWithAuth()
            .post('/api/auth/login', loginState.credentals)
            .then(res => {
                console.log(res.data.payload)
                localStorage.setItem('token', res.data.token);
                props.history.push('/jokes');
            })
            .catch(err => console.log({ err }));

        //reseting form
        setLoginState({
            credentals: {
                username: '',
                password: ''
            },
            isLoading: false
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="username"
                    value={loginState.credentals.username}
                    onChange={changeHandler}
                />
                <input
                    type="password"
                    name="password"
                    value={loginState.credentals.password}
                    onChange={changeHandler}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Login