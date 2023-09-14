import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/login");
    }

    const redirectHome = () => {
        navigate("/");
    };

    return (
        <div className="navbar">
            <h2 id="mainHead" onClick={redirectHome}>Paste bin</h2>
            <div className="navdiv">
                {!cookies.access_token ? (<></>):
                (<Link to="/all"> My Snips</Link>)}
                {!cookies.access_token ? (<Link to="/login"> Login</Link>):
                (<button onClick={logout}>Logout</button>)}
            </div>            
        </div>
    );
}