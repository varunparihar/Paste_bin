import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "../config/config";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Editsnip() {
    const [title, setTitle] = useState("");
    const [alias, setAlias] = useState("");
    const [snip, setSnip] = useState("");
    const [snipID, setSnipID] = useState("");
    const navigate = useNavigate();
    const [cookies] = useCookies(["access_token"]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/snip/" + id);
                setTitle(response.data.title);
                setSnip(response.data.snip);
                setAlias(response.data.alias);
                setSnipID(response.data._id);
                console.log(response.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch("/snip", {
                snipID,
                title,
                alias,
                snip
            }, {headers: {authorization: cookies.access_token}});
            if(response.data.id){
                alert(response.data.message);
                navigate("/" + response.data.id);
                console.log(response.data.message);
            }
            else{
                alert(response.data.message);
            }            
        } catch(err) {
            console.log(err);
        }
    };

    return (
      <div className="home">
        <form onSubmit={handleSubmit}>
            <div className="form-head">
                <input type="text" placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)} required/>

                <input type="text" placeholder="Alias (Optional)"
                value={alias}
                onChange={(event) => setAlias(event.target.value)}/>

                <button type="submit">Update Snip</button><br></br>
            </div>

            <div className="area-container">
                <textarea id="sniptext"
                value={snip}
                onChange={(event) => setSnip(event.target.value)} required/>
            </div>
        </form>
      </div>
    );
}
  
export default Editsnip;