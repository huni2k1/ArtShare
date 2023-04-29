import axios from 'axios';
import "./GeneratePage.css"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React from 'react';
import MenuBar from '../../components/MenuBar/MenuBar';
export default function GeneratePage() {
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState("")
    const [imgUrls, setImgUrls] = useState([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("")
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // Prevent page reload
        event.preventDefault();
        setError("")
        setImgUrls([])
        if(!loading){
        setLoading(true)
        axios
            .post('https://api.openai.com/v1/images/generations', { prompt: prompt, n: 3 ,response_format: "b64_json",size:"512x512"}, { headers: { Authorization: 'Bearer ' + process.env.REACT_APP_DALLE_API_KEY } })
            .then(response => {
                let imageArr = response.data.data.map((obj: { b64_json: string; }) =>{ 
                    return obj.b64_json})
                setImgUrls(imageArr)
                setLoading(false)
            }).catch(({ response: { data: { error: { message } } } }) => {
                console.error(`Error: ${message}`);
                setError(`Error: ${message}`)
                setLoading(false);
              })
        }
    };
    const handleClick = (imgUrl: string) => {
        navigate("/edit", {state:{ img: imgUrl}})
    }
    return (
        <div className="homepage">
            <MenuBar page="create"/>
            <div className="container">
            <div className='searchbar-container'>
                <form onSubmit={handleSubmit}>
                    <div className='prompt'>Generate artwork with a detailed instruction</div>
                    <input required className="generate-bar" type="text" name="prompt" value={prompt} onChange={(e) => { setPrompt(e.target.value) }}></input>
                    <div className="button-container">
                        <input type="submit" value="Generate" />
                    </div>
                </form>
            </div>
            {loading && <div className="loading-container">Loading</div>}
            {imgUrls.length > 0 && !loading &&
                <div className="pictures-container">
                    <div className="prompt2">Pick the artwork you want to edit. Don't like these ones? <div onClick={(e)=>handleSubmit(e)} className='regenerate inline'>Regenerate</div></div>
                    <div>
                        {imgUrls.map((imgUrl,index) => <div key={index} className="artwork-container" onClick={() => handleClick(imgUrl)}><img className="artwork" src={`data:image/jpeg;base64,${imgUrl}`}/></div>)
                        }
                    </div>
                </div>
            }
            {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}
