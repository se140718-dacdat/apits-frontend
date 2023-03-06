import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate, isRegister) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/account/auth/login", user);
        dispatch(loginSuccess(res.data.data));
        if (!isRegister) {
            navigate("/");
        } else {
            navigate("/register-candidate");
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerCandidate = async (newUser, navigate, dispatch) => {
    try {
        await axios.post("/account/auth/register", newUser)
        loginUser(newUser, dispatch, navigate, true);
    } catch (error) {
        return error
    }
}

export const loginUserByGoogle = async (result, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        console.log(result.user.accessToken);
        const res = await axios.post("/account/auth/loginGoogle", {
            "token": result.user.accessToken
        });
        dispatch(loginSuccess(res.data.data));
        navigate("");
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed());
    }
}

export const updateCandidate = async (id, navigate, data) => {
    console.log(data)
    try {
        const res = await axios.put(`/candidate/update?id=${id}`, data)
        console.log(res)
        navigate("/");
    } catch (err) {
        return err
    }
}

export const adminRegisterCandidate = async (newUser, navigate) => {
    try {
        const res = await axios.post("/candidate/create", newUser)
        navigate("/")
        console.log(res)
    } catch (error) {
        return error
    }
}