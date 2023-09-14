import { useState } from "react";
import axios from "../config/config";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";

function Home() {
    
    const [title, setTitle] = useState("");
    const [alias, setAlias] = useState("");
    const [snip, setSnip] = useState("");
    const navigate = useNavigate();
    const userid = useGetUserID();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/snip", {
                title,
                alias,
                snip,
                userid
            });
            if(response.data.id){
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

                <button type="submit">Create</button><br></br>
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
  
export default Home;