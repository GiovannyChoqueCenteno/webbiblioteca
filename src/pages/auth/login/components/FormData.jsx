import React, { useContext } from 'react'
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import { usuarioContext } from '../../../../context/usuarioContext';
import useForm from '../../../../hooks/useForm';

const FormData = (props) => {

    const { setstep } = props;
    const { value, onChange } = useForm({ email: "", password: "" });
    const { login } = useContext(usuarioContext);

    function OnSubmit(e) {
        e.preventDefault();
        login(value, (ok) => {
            if (ok) setstep((s) => s + 1);
        });
    }

    return (
        <Animated animationOut={"bounceOutLeft"} animationOutDelay={1000} isVisible={true}>
            <div>
                <form onSubmit={OnSubmit} className={"p-2"}>

                    <div className={"px-5"}>
                        <label className="label">
                            <small className="label-text">Email</small>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name={"email"}
                            value={value.email}
                            onChange={onChange}
                            className="input input-sm w-full bg-theme-box"
                            required
                        />
                    </div>

                    <div className={"px-5"}>
                        <label className="label">
                            <small className="label-text">Password</small>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            name={"password"}
                            value={value.password}
                            onChange={onChange}
                            className="input input-sm w-full bg-theme-box"
                            minLength={8}
                            required
                        />
                    </div>

                    <div className={"text-center my-2 hover:underline "}>
                        <Link to={"/auth/register"}>
                            <small>¿No tienes cuenta? Register</small>
                        </Link>
                    </div>

                    <div className={"px-4 mt-3"}>
                        <button className="btn  btn-sm btn-primary">next</button>
                    </div>

                </form>
            </div>
        </Animated>
    )
}

export default FormData