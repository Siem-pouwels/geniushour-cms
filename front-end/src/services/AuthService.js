import axios from 'axios'
import Cookies from "js-cookie"
// import { R } from "react-router";
// import Login from "../components/Login";

export const IsLoggedIn = () => {
    if (Cookies.get("Bearertoken")) axios.defaults.headers.common = { 'Authorization': 'Bearer ' + Cookies.get("Bearertoken") }
    // else return
    // else return (<Redirect
    //     to={{
    //         pathname: "/login",
    //     }}
    // />);

}