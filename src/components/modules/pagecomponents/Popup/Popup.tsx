import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { FC, FormEvent, useState, Dispatch, SetStateAction } from 'react'
import { NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authentication } from '../../../../firebase-config';
import { Login } from '../../../../model';
import { loginUser, loginUserByGoogle, registerCandidate } from '../../../../redux/apiRequest';
import CandidateRegister from '../../../pages/Candidate/CandidateRegister';
import "./Popup.css"

interface Props {
    display: string,
    popup: Number,
    isDisplay: Dispatch<SetStateAction<string>>,
    isPopup: Dispatch<SetStateAction<Number>>

}
const Popup: FC<Props> = (props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userLogin = {
                email: username,
                password: password
            }
            loginUser(userLogin, dispatch, navigate, false);
            props.isDisplay('');
            props.isPopup(0);
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider).then((result) => {
            loginUserByGoogle(result, dispatch, navigate)
            props.isDisplay('');
            props.isPopup(0);
        }).catch((error) => {
            console.log(error);
        });
    }

    const registerHandler = () => {
        if (password == confirm) {
            const newUser: Login = {
                email: username,
                password: password
            }
            registerCandidate(newUser, navigate, dispatch);
        }
        else {
            console.log("password confirm and password not match!")
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
                    <div className="btn-login-google btn" onClick={signInWithGoogle}>
                        <img src="images/google-icon.svg" alt="google icon" />
                        <div className="google">Log in with Google</div>
                    </div>
                </form>
            )
        }
        else {
            return (
                <div className="popup-container" style={{ height: "95%" }}>
                    <i className="pi pi-times icon-close" onClick={() => {
                        props.isDisplay('');
                        props.isPopup(0);
                    }}></i>
                    <div className="logo"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></div>
                    <h4>Sign Up</h4>
                    <input type="text" className='input' placeholder='Email' onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="password" className='input' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} autoComplete="on" />
                    <input type="password" className='input' placeholder='Confirm Password' onChange={(e) => { setConfirm(e.target.value) }} autoComplete="on" />
                    <button className="btn-submit" onClick={registerHandler}>
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
                </div>
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