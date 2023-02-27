import React, { FC, FormEvent, useState, Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../../redux/apiRequest';
import "./Popup.css"

interface Props {
    display: string,
    popup: Number,
    isDisplay: Dispatch<SetStateAction<string>>,
    isPopup: Dispatch<SetStateAction<Number>>

}
const Popup: FC<Props> = (props) => {
    const [username, setUsername] = useState<String>();
    const [password, setPassword] = useState<String>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userLogin = {
                email: username,
                password: password
            }
            loginUser(userLogin, dispatch, navigate);
            props.isDisplay('');
            props.isPopup(0);
        } catch (error) {
            console.log(error)
        }
    }

    const popupHandler = () => {
        if (props.popup == 1) {
            return (
                <form className="popup-container" onSubmit={loginHandler}>
                    <i className="pi pi-times icon-close" onClick={() => {
                        props.isDisplay('');
                        props.isPopup(0);
                    }}></i>
                    <div className="logo"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></div>
                    <h4>Login</h4>
                    <input type="text" className='input' placeholder='Email' onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="password" className='input' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button type='submit' className="btn-submit">
                        Login
                    </button>
                    <div className="or">
                        <div className="distance"></div>
                        <span>OR</span>
                        <div className="distance"></div>
                    </div>
                    <div className="btn-login-google btn">
                        <img src="images/google-icon.svg" alt="google icon" />
                        <div className="google">Log in with Google</div>
                    </div>
                </form>
            )
        }
        else {
            return (
                <form className="popup-container" onSubmit={loginHandler} style={{ height: "95%" }}>
                    <i className="pi pi-times icon-close" onClick={() => {
                        props.isDisplay('');
                        props.isPopup(0);
                    }}></i>
                    <div className="logo"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></div>
                    <h4>Sign Up</h4>
                    <input type="text" className='input' placeholder='Email' onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="password" className='input' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" className='input' placeholder='Confirm Password' onChange={(e) => { setPassword(e.target.value) }} />
                    <button type='submit' className="btn-submit">
                        Join APITS
                    </button>
                    <div className="or">
                        <div className="distance"></div>
                        <span>OR</span>
                        <div className="distance"></div>
                    </div>
                    <div className="btn-login-google btn">
                        <img src="images/google-icon.svg" alt="google icon" />
                        <div className="google">Log in with Google</div>
                    </div>
                </form>
            )
        }
    }

    return (
        <div id="Popup" className={`${props.display}`}>
            {popupHandler()}
        </div>
    )
}

export default Popup;