import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createInvoice = async function (payment) {
    try {
        let token = localStorage.getItem("token");
        const response = await axios.post(SERVER_URL + `/invoice/solinvoice`, { payment }, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization": "Bearer "+ token,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getInvoice = async function (id) {
    try {
        let token = localStorage.getItem("token");
        const response = await axios.get(SERVER_URL + `/invoice/${id}`, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization": "Bearer "+ token,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getInvoices = async function (id) {
    try {
        let token = localStorage.getItem("token");
        const response = await axios.get(SERVER_URL + `/invoice`, {
            headers: {
                "Content-Type": `application/json`,
                "Authorization": "Bearer "+ token,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};