import { default as axios } from "axios";
import { SERVER_URL } from "../constants";

export const createUser = async function (address) {
	try {
		const nonceResponse = await axios.post(
			`${SERVER_URL}/user/generateNonce`,
			{ address },
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
			}
		);
		const formattedNonceResponse = nonceResponse.data;
		const nonce = formattedNonceResponse.nonce;

		const sign = await window.ethereum.request({
			method: "personal_sign",
			params: [address, "Solar, click sign-in to login. \n \nNonce:\n" + nonce],
		});

		const response = await axios.post(
			`${SERVER_URL}/user/signin`,
			{ displayName: "Unnamed", sign, nonce },
			{
				method: "POST",
				headers: {
					"Content-Type": `application/json`,
				},
			}
		);
		if (response.status === 201) {
			localStorage.setItem("token", response.data.token);

			return response.data;
		}
	} catch (error) {
		console.log(error.message);
	}
};