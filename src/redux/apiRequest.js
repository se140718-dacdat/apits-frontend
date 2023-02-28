import axios from "../api/axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/account/auth/login", user);
        dispatch(loginSuccess(res.data.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const loginUserByGoogle = async(result, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        console.log(result.user.accessToken);
        const res = await axios.post("/account/auth/loginGoogle", {
            "token": result.user.accessToken
        });
        dispatch(loginSuccess(res.data.data));
        navigate("/");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const logoutUser = async(dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed());
    }
}