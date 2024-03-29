import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FC, FormEvent, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authentication, firebaseNotificationConfig } from '../../../../firebase-config';
import { Login } from '../../../../model';
import { loginUser, loginUserByGoogle, registerCandidate, } from '../../../../redux/apiRequest';
import "./Popup.css"

import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from 'firebase/app';

interface Props {
    display: string,
    popup: Number,
    isDisplay: Dispatch<SetStateAction<string>>,
    isPopup: Dispatch<SetStateAction<Number>>
}
const Popup: FC<Props> = (props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [messageRegister, setMessageRegister] = useState<string>("");
    const [messageLogin, setMessageLogin] = useState<string>("");
    const [notificationToken, setNotificationToken] = useState<string>("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setMessageLogin("");
        setMessageRegister("");
        const requestPermission = () => {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    const app = initializeApp(firebaseNotificationConfig);
                    const messaging = getMessaging(app);
                    getToken(messaging, {
                        vapidKey: "BKEIv2eA8FfmrUKN8kDCrB5ZmAwb_6K3OsutWog-nSRAUNXzVI-POuN7QqDaAsAAppQbJXA_tqe-J2M7TBenTYM",
                    }).then((currentToken) => {
                        if (currentToken) {
                            setNotificationToken(currentToken);
                        }
                    });
                }
            });
        }
        requestPermission()
    }, [props.popup])

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userLogin : Login = {
                email: username,
                password: password,
                notificationToken: notificationToken
            }
            if (await loginUser(userLogin, dispatch, navigate, false) == "Login Fail") {
                setMessageLogin("The user or password that you've entered is incorrect.")
            }
            else if (await loginUser(userLogin, dispatch, navigate, false) == "DISABLE") {
                setMessageLogin("Your account is disable, please contact to us!");
            }
            else {
                props.isDisplay('');
                props.isPopup(0);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = (isRegister: boolean) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider).then((result) => {
            loginUserByGoogle(result, notificationToken, dispatch, navigate, isRegister)
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
                password: password,
                notificationToken: notificationToken
            }
            registerCandidate(newUser, navigate, dispatch);
            setMessageRegister("");
        }
        else {
            setMessageRegister("Password confirm and password not match!");
        }
    }

    const popupHandler = () => {
        switch (props.popup) {
            case 1:
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
                        <p style={{ color: "red" }}>{messageLogin}</p>
                        <button type='submit' className="btn-submit">
                            Login
                        </button>
                        <div className="or">
                            <div className="distance"></div>
                            <span>OR</span>
                            <div className="distance"></div>
                        </div>
                        <div className="btn-login-google btn" onClick={() => signInWithGoogle(false)}>
                            <img src="images/google-icon.svg" alt="google icon" />
                            <div className="google">Log in with Google</div>
                        </div>
                    </form>
                )
            default:
                return (
                    <div className="popup-container" style={{ height: "40%" }}>
                        <i className="pi pi-times icon-close" onClick={() => {
                            props.isDisplay('');
                            props.isPopup(0);
                        }}></i>
                        <div className="logo"><img className='logo' src="/images/ApitsLogo.png" alt="logo" /></div>
                        <h4>Sign Up</h4>
                        <input type="text" className='input' placeholder='Email' onChange={(e) => { setUsername(e.target.value) }} />
                        <input type="password" className='input' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} autoComplete="on" />
                        <input type="password" className='input' placeholder='Confirm Password' onChange={(e) => { setConfirm(e.target.value) }} autoComplete="on" />
                        <p style={{ color: "red" }}>{messageRegister}</p>
                        <button className="btn-submit" onClick={registerHandler}>
                            Join APITS
                        </button>
                        <div className="or">
                            <div className="distance"></div>
                            <span>OR</span>
                            <div className="distance"></div>
                        </div>
                        <div className="btn-login-google btn" onClick={() => signInWithGoogle(true)}>
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