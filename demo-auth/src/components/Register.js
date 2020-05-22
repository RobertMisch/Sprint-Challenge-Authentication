import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Register(props) {
    const [registerState, setRegisterState] = useState({ username: '', password: '' })

    // console.log(loginState.credentals.username)
    const changeHandler = (e) => {
        e.preventDefault()
        setRegisterState({ ...registerState, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setRegisterState({ ...registerState })
        console.log(registerState)
        axiosWithAuth()
            .post('/api/auth/register', registerState)
            .then(res => {
                console.log(res.data)
                props.history.push('/login');
            })
            .catch(err => console.log({ err }));

        //reseting form
        setRegisterState({
            username: '',
            password: ''
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="username"
                    value={setRegisterState.username}
                    onChange={changeHandler}
                />
                <input
                    type="password"
                    name="password"
                    value={setRegisterState.password}
                    onChange={changeHandler}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}

export default Register