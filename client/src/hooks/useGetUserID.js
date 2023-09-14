import { useCookies } from "react-cookie";

export const useGetUserID = () => {
    const [cookies] = useCookies(["access_token"]);
    if(!cookies.access_token) return null;
    return window.localStorage.getItem("userID");
};