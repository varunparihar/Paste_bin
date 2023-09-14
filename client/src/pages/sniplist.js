import { useState, useEffect } from "react";
import axios from "../config/config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";

function SnipList() {
    
    const [snipList, setSnipList] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(["access_token"]);
    const userid = useGetUserID();
    const [toggleRefresh, setToggleRefresh] = useState(0);

    useEffect(() => {
        axios.get("/snip/user/" + userid, {headers: {authorization: cookies.access_token}})
        .then(response => {
            setSnipList(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, [cookies, userid, toggleRefresh]);

    const handleClick = async (item) => {
        navigate("/" + item.alias);
    };

    const editOnClick = async (item) => {
        navigate("/edit/" + item.alias);
    };

    const deleteOnClick = async (item) => {
        const snipID = item._id;
        try {
            const response = await axios.delete("/snip/" + snipID,
                {headers: {authorization: cookies.access_token}});
            // alert(response.data.message);
            console.log(response.data);
            setToggleRefresh(!toggleRefresh);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="snip-item-container">
            <h2>All Snips</h2>
            <div>
                {snipList.map(item => (
                    <div className="snip-item" key={item.alias}>
                        <div className="horizontal-div">
                            <h3>{item.title}</h3>
                            <div className="snip-item-div">
                                <button className="snip-item-button" onClick={() => handleClick(item)}>View</button>
                                <button className="snip-item-button" onClick={() => editOnClick(item)}>Edit</button>
                                <button className="snip-item-button" onClick={() => deleteOnClick(item)}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <textarea className="item-textarea" value={item.snip} readOnly></textarea>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
  
export default SnipList;