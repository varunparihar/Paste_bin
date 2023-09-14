import { useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "../config/config";

function Snip() {
    // const hostURL = "http://localhost:3000";
    const hostURL = window.location.host;
    const [title, setTitle] = useState("");
    const [snip, setSnip] = useState("");
    const [copyButtonText, setCopyButtonText] = useState("Copy URL");
    const [snipCopyButtonText, setSnipCopyButtonText] = useState("Copy Text");
    const { id } = useParams();

    useEffect(() => {
      
        const fetchData = async () => {
            try {
                const response = await axios.get("/snip/" + id);
                if(!response.data){
                  alert("Requested page does not exist");
                }
                setTitle(response.data.title);
                setSnip(response.data.snip);
                console.log(response.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchData();
      });

      const handleUrlCopy = () => {
        navigator.clipboard.writeText(hostURL + "/" + id);
        setCopyButtonText("URL Copied!");
      };

      const handleSnipCopy = () => {
        navigator.clipboard.writeText(snip);
        setSnipCopyButtonText("Text Copied!");
      };

    return (
      <div className="home">
        <div className="form-head">            
            <input type="text" value={title} readOnly/>
            <input type="text" value={hostURL + "/" + id} readOnly/>
            <button onClick={handleUrlCopy}>{copyButtonText}</button>
            <button onClick={handleSnipCopy}>{snipCopyButtonText}</button>
        </div>
        <textarea id="sniptext"
        value={snip}
        readOnly/>
      </div>
    );
}
  
export default Snip;