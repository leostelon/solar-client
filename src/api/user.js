import { default as axios } from "axios";
import { SERVER_URL } from "../constants";
import { getProvider } from "../utils/wallet";
import bs58 from "bs58";

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
		const message = "Solar, click sign-in to login. \n \nNonce:\n" + nonce;
		const provider = await getProvider();
		const { signature, publicKey } = await provider.signMessage(
			new TextEncoder().encode(message),
			"utf8"
		);

		const response = await axios.post(
			`${SERVER_URL}/user/signin`,
			{
				displayName: "Unnamed",
				public_key: publicKey.toBase58(),
				sign: bs58.encode(signature),
				nonce,
			},
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

export const getUser = async function () {
	try {
		const token = localStorage.getItem("token");
		await axios.get(`${SERVER_URL}/user`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ` + token,
			},
		});
		return 200;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			return 401;
		}
	}
};
