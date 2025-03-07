// import axios from "axios";
import axios from './axios.customize';

const createUserAPI = (email, username, password, phone, role) => {
    const URL_BACKEND = "/v2/api/register";
    const data = {
        email: email,
        password: password,
        username: username,
        phone: phone,
        role: role
    }
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (id, username, email, phone, role) => {
    const URL_BACKEND = "/v2/api/update-user";
    const data = {
        id: id,
        username: username,
        email: email,
        phone: phone,
        role: role,
    }
    return axios.put(URL_BACKEND, data);
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/v2/api/delete-user/${id}`;//backtick
    return axios.delete(URL_BACKEND);
}

const fetchAllUserAPI = () => {
    const URL_BACKEND = "/v2/api/user-all";
    return axios.get(URL_BACKEND);

}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)

    return axios.post(URL_BACKEND, bodyFormData, config);
}

const fetchAllRoleAPI = () => {
    const URL_BACKEND = "/v2/api/role-all";
    return axios.get(URL_BACKEND);
}

const loginApi = (email, password) => {
    const URL_BACKEND = "/v2/api/login";
    const data = {
        email: email,
        password: password
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/v2/api/verify-token";
    return axios.get(URL_BACKEND);
}

const fetchAllProductsAPI = () => {
    const URL_BACKEND = "/v2/api/product-all";
    return axios.get(URL_BACKEND);
}

const fetchProductByIdAPI = (id) => {
    const URL_BACKEND = `/v2/api/product/${id}`;
    return axios.get(URL_BACKEND);
}

export {
    createUserAPI,
    updateUserAPI,
    fetchAllUserAPI,
    deleteUserAPI,
    handleUploadFile,
    fetchAllRoleAPI,
    loginApi,
    getAccountAPI,
    fetchAllProductsAPI,
    fetchProductByIdAPI
}