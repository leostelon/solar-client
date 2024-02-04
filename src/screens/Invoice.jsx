import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createInvoice, getInvoice } from "../api/invoice";
import { Box, CircularProgress, Tooltip } from "@mui/material";
import QRCode from "react-qr-code";
import { useState } from "react";
import { useRef } from "react";
import { PrimaryGrey } from "../constants";
import { MdContentCopy } from "react-icons/md";

export const Invoice = () => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const { id } = useParams();
	const [bill, setBill] = useState(false);
	const billRef = useRef({});
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}

	async function gB(id) {
		const response = await createInvoice(id);
		setBill(response);
		console.log(response);
		billRef.current = response;
		checkStatus(billRef.current);
	}

	async function checkStatus(bill) {
		if (!bill) return;
		const timer = setInterval(async () => {
			const response = await getInvoice(bill.uid);
			if (response.status !== "created") {
				setLoading(false);
				setBill(response);
				clearInterval(timer);
			}
		}, 10000);
	}

	useEffect(() => {
		gB(id);
	}, [id]);

	return (
		<Box
			sx={{
				display: "flex",
				height: "100vh",
				width: "100vw",
				justifyContent: "center",
			}}
		>
			{bill ? (
				<Box
					sx={{
						// backgroundColor: "#FDE9E9",
						maxWidth: "420px",
						minWidth: "420px",
						width: "100%",
						p: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h1>Payment Request</h1>
					<br />
					<br />
					<h2 style={{ color: "grey" }}>{bill.payment.amount}SOL</h2>
					<QRCode
						value={`http://localhost:3000/checkout/${bill.uid ? bill.uid : ""}`}
						size={150}
					/>
					<br />
					<p style={{ fontWeight: 500 }}>Scan and pay using any Solana app</p>
					<br />
					<Box
						sx={{
							borderRadius: 50,
							backgroundColor: "lightgreen",
							color: "darkgreen",
							display: "flex",
							height: "35px",
							width: "35px",
							alignItems: "center",
							justifyContent: "center",
							mb: 2,
						}}
					>
						<p>or</p>
					</Box>
					<Box
						mt={2}
						textAlign="center"
						onMouseEnter={toggleCopy}
						onMouseLeave={toggleCopy}
					>
						<Tooltip
							title="Copied!"
							placement="top"
							open={open}
							onClose={() => setOpen(false)}
						>
							<Box
								onClick={() => {
									navigator.clipboard.writeText(bill.payment.address);
									setOpen(true);
								}}
								sx={{ display: "flex" }}
							>
								<small>{bill.payment.address}</small>
								<MdContentCopy
									style={{
										color: PrimaryGrey,
										visibility: copyEnabled ? "visible" : "hidden",
										cursor: "pointer",
									}}
									size={16}
								/>
							</Box>
						</Tooltip>
					</Box>
					{loading ? (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CircularProgress size={15} sx={{ mr: 1 }} />
							<h4>Waiting for payment</h4>
						</Box>
					) : (
						<h4 style={{ textDecoration: "underline" }}>
							"Payment completed✅"
						</h4>
					)}
					<Box mt={2} textAlign="center">
						<small style={{ color: PrimaryGrey }}>Powered by Solar🔥</small>
						<br />
						<br />
						<small style={{ color: PrimaryGrey, fontSize: "12px" }}>
							ID: {bill.uid ? bill.uid : ""}
						</small>
					</Box>
				</Box>
			) : (
				<Box sx={{ p: 2 }}>
					<CircularProgress />
				</Box>
			)}
		</Box>
	);
};
