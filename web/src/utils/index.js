import Cookies from "js-cookie";


export const setTokenToCookies = (token) => {
    const inMinutes = new Date(new Date().getTime() + 14 * 60 * 1000);
    Cookies.set("_t", token, { expires: inMinutes });
};

export const getTokenFromCookies = () => {
    return Cookies.get("_t");
  };