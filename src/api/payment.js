import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createPayment = async function (amount) {
    try {
        let a = parseFloat(amount);
        if (typeof a !== "number") return alert("Invalid amount type")

        let address = localStorage.getItem("solana_address");
        const response = await axios.post(SERVER_URL + "/payment", { address, amount }, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
        if (response.status === 200) {
            alert("Created payment");
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};

export const getPayments = async function () {
    try {
        let address = localStorage.getItem("solana_address");
        const response = await axios.get(SERVER_URL + `/payment/${address}`, {
            headers: {
                "Content-Type": `application/json`,
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error.message);
    }
};