import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  connectWalletToSite,
  getProvider,
  getWalletAddress,
} from "../utils/wallet";
import { createUser } from "../api/user";
import bs58 from "bs58";

export const Signin = () => {
  const navigate = useNavigate();

  async function connectSite() {
    let token = localStorage.getItem("token");
    await connectWalletToSite();
    if (token && token !== "" && token !== "undefined") {
      return navigate("/home");
    }
    const address = await getWalletAddress();
    if (address && address !== "") {
      if (!token || token === "" || token === "undefined") {
        await createUser(address);
      }
      token = localStorage.getItem("token");
      if (token && token !== "" && token !== "undefined") {
        navigate("/home");
      }
    }
  }

  useEffect(() => {
    connectSite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box>signin</Box>;
};
