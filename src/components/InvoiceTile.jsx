import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Box, Tooltip } from "@mui/material";
import { shortText } from "../utils/shortText";
import { PrimaryGrey } from "../constants";

export const InvoiceTile = ({ invoice }) => {
	const [copyEnabled, setCopyEnabled] = useState(false);
	const [open, setOpen] = useState(false);

	function toggleCopy() {
		setCopyEnabled(!copyEnabled);
	}

	return (
		<tr>
			<td>{shortText(invoice._id)}</td>
			<td>{invoice.status}</td>
			<td>{invoice.payment.amount} SOL</td>
			<td
				style={{ fontWeight: "500", color: "#303031", display: "flex" }}
				onMouseEnter={toggleCopy}
				onMouseLeave={toggleCopy}
			>
				Copy
				<Tooltip
					title="Copied!"
					placement="top"
					open={open}
					onClose={() => setOpen(false)}
				>
					<Box
						onClick={() => {
							navigator.clipboard.writeText(
								`http://localhost:3000/payment/${invoice._id}`
							);
							setOpen(true);
						}}
					>
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
			</td>
			<td>{shortText(invoice.uid)}</td>
			{/* <td>09/04/2023 20:29</td> */}
			<td>{new Date(invoice.createdAt).toDateString()}</td>
		</tr>
	);
};