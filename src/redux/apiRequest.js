import { async } from "@firebase/util";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";
import { specialtyStart, specialtySuccess } from "./specialtySlice";
import { userFailed, userStart, userSuccess } from "./userSlice";

export const loginUser = async (user, dispatch, navigate, isRegister) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/account/auth/login", user);
        console.log(res.data.message);
        if (res.data.data) {
            dispatch(loginSuccess(res.data.data));
            dispatch(userSuccess(res.data.data.information));
            if (!isRegister) {
                navigate("/");
            } else {
                navigate("/update-candidate");
            }
        } else {
            return res.data.message;
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
        navigate("/")
    } catch (error) {
        return error
    }
}

export const loginUserByGoogle = async (result, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        console.log(result.user.accessToken);
        const res = await axios.post("/account/auth/loginGoogle", {
            "token": result.user.accessToken
        });
        dispatch(loginSuccess(res.data.data));
        dispatch(userSuccess(null));
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
        dispatch(userSuccess(null));
        navigate("/");
    } catch (err) {
        dispatch(logoutFailed());
    }
}

export const updateCandidate = async (id, navigate, data, dispatch, specialties) => {
    dispatch(userStart());
    try {
        const res = await axios.put(`/candidate/update?id=${id}`, data)
        dispatch(userSuccess(res.data.data));
        addSpecialtiesCandidate(id, specialties)
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

export const getSpecialtiesByCandidateId = async (id) => {
    try {
        const res = await axios.get(`/canspec/getListSpecsWithCan/${id}`)
        return res
    } catch (error) {
        return error
    }
}


export const getSpecialties = async (dispatch) => {
    try {
        const res = await axios.get("/special-skill/getAllSpecDetails")
        console.log(res.data.data)
        dispatch(specialtySuccess(res.data.data));
    } catch (error) {
        return error
    }
}

export const addSpecialtiesCandidate = async (id, specialties) => {
    try {
        specialties.forEach(async specialty => {
            const res = await axios.post("/canspec/create", {
                candidateId: id,
                specialId: specialty.id
            })
            console.log(res)
        });
    } catch (error) {
        return error
    }
}