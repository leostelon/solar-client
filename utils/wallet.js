export const isPhantomInstalled = window.phantom?.solana?.isPhantom;

export const getProvider = () => {
  if ("phantom" in window) {
    const provider = window.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};

export const connectWalletToSite = async () => {
  const provider = getProvider(); // see "Detecting the Provider"
  try {
    const resp = await provider.connect();
    console.log(resp.publicKey.toString());
    // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    window.localStorage.setItem("solana_address", resp.publicKey.toString());
  } catch (err) {
    alert("User rejected the request.");
  }
};

export async function getWalletAddress() {
  try {
    let address = window.localStorage.getItem("solana_address");
    return address;
  } catch (error) {
    console.log(error);
  }
}
