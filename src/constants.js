const solanaWeb3 = require("@solana/web3.js");

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const PrimaryGrey = "#828488";
export const solanaConnection = new solanaWeb3.Connection(
	process.env.REACT_APP_RPC_URL
);
