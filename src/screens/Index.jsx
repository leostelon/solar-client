import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Drawer } from "../components/Drawer";
import { MdAddCircleOutline } from "react-icons/md";
import Cardbg from "../assets/cardbg.png";
import Logo from "../assets/logo.png";
import { shortText } from "../utils/shortText";
import { LineChart } from "@mui/x-charts/LineChart";
import { getTransactions } from "../api/user";

export const Index = () => {
	const [address, setAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [transactions, setTransactions] = useState({
		amount: [],
		time: [],
	});

	function getAddress() {
		const ad = localStorage.getItem("solana_address");
		setAddress(ad);
		gT(ad);
	}

	async function gT(ad) {
		const res = await getTransactions(ad);
		const amount = res.map((r) => r.amount / 10 ** 9).reverse();
		const time = res.map((r) => new Date(r.blockTime * 1000));
		console.log({ amount, time });
		setTransactions({ amount, time });
	}

	useEffect(() => {
		getAddress();
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<Drawer />
			<Box style={{ width: `calc(100vw - 280px)` }}>
				<Box
					sx={{
						p: 2,
						display: "flex",
						color: "#4c4848",
					}}
				>
					<Box display="flex" sx={{ flexDirection: "column", width: "100%" }}>
						<h1>Dashboard</h1>
						<br />
						<Box sx={{ display: "flex", width: "100%", height: "100%" }}>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									maxHeight: "50vh",
									flex: 4,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								<LineChart
									sx={{
										"& .MuiAreaElement-root": {
											fill: "#E4E4FC",
										},
										"& .MuiLineElement-root": {
											strokeWidth: 4,
										},
									}}
									xAxis={[{ data: [1, 2, 3, 5] }]}
									// xAxis={[{ data: transactions.time }]}
									series={[
										{
											data: transactions.amount,
											area: true,
											color: "#4443FF",
										},
									]}
									width={700}
								/>
							</Box>
							<Box
								sx={{
									width: "100%",
									height: "50vh",
									flex: 2,
									p: 2,
									m: 1,
									boxShadow: "0 1px 6px rgba(0,0,0,.1)",
								}}
							>
								<h2>Your Account</h2>
								<br />
								<Box
									sx={{
										borderRadius: 4,
										backgroundImage: `url(${Cardbg})`,
										backgroundPosition: "center",
										backgroundSize: "cover",
										backgroundColor: "blue",
										width: "100%",
										height: "55%",
										mb: 1,
										p: 2,
										color: "white",
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
									}}
								>
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<h2>Solana Devnet</h2>
										<h2>{balance}ETH</h2>
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<h3>{shortText(address)}</h3>
										<img src={Logo} alt="logo" height="45px" />
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Box>
										<IconButton sx={{ cursor: "no-drop" }}>
											<MdAddCircleOutline size={"35"} />
										</IconButton>
									</Box>
									<small>Support for multiple accounts coming soon.</small>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
