import { async } from "@firebase/util";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";
import { userFailed, userStart, userSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate, isRegister) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/account/auth/login", user);
        dispatch(loginSuccess(res.data.data));
        console.log(res.data.message);
        if(res.data.data) {
            if (!isRegister) {
                navigate("/");
            } else {
                navigate("/update-candidate");
            }
        } else {
            return res.data.data;
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerCandidate = async (newUser, navigate, dispatch) => {
    try {
        console.log(newUser)
        await axios.post("/account/auth/registerForCandidate", newUser)
        loginUser(newUser, dispatch, navigate, true);
    } catch (error) {
        return error
    }
}

export const registerEnterprise = async (newUser, navigate) => {
    try {
        const res = await axios.post("/account/auth/registerForEnterprise", newUser);
        console.log(res.data);
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
        console.log(res.data.data)
        navigate("/update-candidate");
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

export const updateCandidate = async (id, navigate, data, dispatch) => {
    dispatch(userStart());
    try {
        const res = await axios.put(`/candidate/update?id=${id}`, data)
        console.log(res.data.data);
        dispatch(userSuccess(res.data.data));
        navigate("/");
    } catch (err) {
        dispatch(userFailed())
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

export const getCandidateById = async (id) => {
    try {
        const res = await axios.get(`/candidate/getCandidateByID?id=${id}`)
        return res.data
    } catch (error) {
        return error
    }
}