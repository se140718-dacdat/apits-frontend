import axios from "../api/axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "./authSlice";
import { specialtySuccess } from "./specialtySlice";
import { userFailed, userStart, userSuccess } from "./userSlice";

//Authentication
export const loginUser = async (user, dispatch, navigate, isRegister) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/account/auth/login", user);
        console.log(res.data.message);
        if(res.data.message == "Login Fail") {
            return res.data.message;
        } else {
            if (res.data.data) {
                dispatch(loginSuccess(res.data.data));
                dispatch(userSuccess(res.data.data.information));
                if (!isRegister && res.data.message !== "Login Fail") {
                    navigate("/");
                } else {
                    navigate("/update-candidate");
                }
            } else {
                return res.data.message;
            }
        }
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const loginUserByGoogle = async (result, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        console.log(result.user.accessToken);
        const res = await axios.post("/account/auth/loginGoogle", {
            "token": result.user.accessToken
        });
        dispatch(loginSuccess(res.data.data));
        dispatch(userSuccess(res.data.data.candidate));
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

//Candidate


export const adminRegisterCandidate = async (newUser, navigate) => {
    try {
        const res = await axios.post("/candidate/create", newUser)
        navigate("/")
        console.log(res)
    } catch (error) {
        return error
    }
}

export const registerCandidate = async (newUser, navigate, dispatch) => {
    try {
        console.log(newUser)
        await axios.post("/account/auth/registerForCandidate", newUser)
        loginUser(newUser, dispatch, navigate, true);
    } catch (error) {
        return error
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

export const getCandidateBySpecialtyId = async (id) => {
    try {
        const res = await axios.get(`/canspec/getListCansWithSpec?specId=${id}`)
        return res.data.data.candidates
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

export const getAllCandidates = async () => {
    try {
        const res = await axios.post("/candidate/getAll")
        console.log(res)
    } catch (error) {
        return error
    }
}

export const getCandidateByListSkill = async (params) => {
    try {
        const res = await axios.get(`/candidate/getListCandidateBySkill?${params}`)
        console.log(res);
        return res
    } catch (error) {
        return error
    }
}

export const getListCandidateAssign = async (params) => {
    try {
        const res = await axios.post(`/assign/getRecruitmentRequestById/{id}?requestId=${params}`)
        console.log(res);
        return res
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

export const getCandidateCourseProcessing = async () => {
    try {
        const res = await axios.get(`/status-candidate-course/getListSCCByStatusPROCESSING`)
        return res.data.data
    } catch (error) {
        return error
    }
}

//Skill
export const getAllSkill = async () => {
    try {
        const res = await axios.get("/skill/getAllPaging")
        return res.data.data
    } catch (error) {
        return error
    }
}

//Specialty

export const getSpecialties = async () => {
    try {
        const res = await axios.get("/specialty/getAll")
        console.log(res.data.data);
        return res.data.data
    } catch (error) {
        return error
    }
}

export const getSpecialtiesDetail = async (dispatch) => {
    try {
        const res = await axios.get("/special-skill/getAllSpecDetails")
        dispatch(specialtySuccess(res.data.data));
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

//Course

export const getCandidateCourses = async (id) => {
    try {
        const res = await axios.get(`/status-candidate-course/getListCourseByCandidateId?id=${id}`)
        return res
    } catch (error) {
        return error
    }
}

export const startCourse = async (params) => {
    try {
        const res = await axios.post('/status-candidate-course/create', params)
        return res.data.message
    } catch (error) {
        return error
    }
}

export const submitCertificate = async (params) => {
    try {
        const res = await axios.put('/status-candidate-course/updateCertificate', params)
        console.log(res.data.message)
        return res.data.message
    } catch (error) {
        return error
    }
}

//Employee

export const getAllEmployee = async () => {
    try {
        const res = await axios.get("/employee/getAllEmployees")
        console.log(res.data.data.responseList)
    } catch (error) {
        return error
    }
}

export const getAllEmployees = async () => {
    try {
        const res = await axios.get("/employee/getAllEmployees")
        return res.data.data.responseList;
    } catch (error) {
        return error
    }
}

//Enterprise

export const registerEnterprise = async (newUser, navigate) => {
    try {
        console.log(newUser);
        const res = await axios.post("/account/auth/registerForEnterprise", newUser);
        navigate("/")
    } catch (error) {
        return error
    }
}

export const getAllEnterprise = async () => {
    try {
        const res = await axios.post("/enterprise/getAll")
        console.log(res)
    } catch (error) {
        return error
    }
}

//Post

export const createPost = async (params, navigate) => {
    try {
        const res = await axios.post('/recruitmentRequest/create', params)
        navigate("/enterprise-recruitment");
        return res
    } catch (error) {
        return error
    }
}

export const getListPostByEnterpriseId = async (id) => {
    try {
        const res = await axios.get(`/recruitmentRequest/getByCreator?id=${id}`)
        return res.data.data
    } catch (error) {
        return error
    }
}

export const getPostByPostId = async (id) => {
    try {
        const res = await axios.get(`/recruitmentRequest/getById?id=${id}`)
        return res.data.data
    } catch (error) {
        return error
    }
}

export const getAllPost = async () => {
    try {
        const res = await axios.get("/recruitmentRequest/getAll?pageNo=0&pageSize=40")
        return res.data.data.responseList
    } catch (error) {
        return error
    }
}

//Assign

export const assignCandidates = async (params) => {
    try {
        const res = await axios.post("/assign/create", params)
        console.log(res);
        return res
    } catch (error) {
        return error
    }
}

export const getAllAssign = async () => {
    try {
        const res = await axios.post("/assign/getAll")
        console.log(res.data);
        return res
    } catch (error) {
        return error
    }
}

export const confirmAssign = async (id, candidateId) => {
    try {
        const res = await axios.put(`/assign/approvedByCandidate/{id}?id=${id}&candidateId=${candidateId}`)
        console.log(res);
    } catch (err) {
        return err
    }
}

export const getListAssignByCandidateId = async (params) => {
    try {
        const res = await axios.get(`/assign/getListAssignByCandidateId?candidateId=${params}`)
        return res
    } catch (error) {
        return error
    }
}

export const getCandidatesConfirmed = async (params) => {
    try {
        const res = await axios.get(`/assign/getListCandidateConfirmByRRId?recruitment_request_id=${params}`)
        return res
    } catch (error) {
        return error
    }
}

export const approveCandidate = async (params) => {
    try {
        const res = await axios.get(`/assign/approvedAssignEnterprise?id=${params}`)
    } catch (error) {
        return error
    }
}

export const rejectCandidate = async (assignId, candidateId) => {
    try {
        const res = await axios.put(`/assign/rejectedByCandidate/{id}?id=${assignId}&candidateId=${candidateId}`)
    } catch (error) {
        return error
    }
}

export const getAllAssignApproved = async () => {
    try {
        const res = await axios.get("/assign/getListCandidateAPPROVE")
        return res.data.data
    } catch (error) {
        return error
    }
}

//New Candidate

export const getAllNewCandidate = async () => {
    try {
        const res = await axios.get("/waiting-list/getAllStatusByUnCheck");
        return res.data.data;
    } catch (error) {
        return error
    }
}

// Interview
