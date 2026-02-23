import {useState} from "react";
import axios from "axios";

const AudioUploader = () => {

    const [file,setFile] = useState(null);
    const [transcription, setTranscription] = useState("");

    const handleFileChange = (event)=>{setFile(event.target.files[0].name);console.log('File selected : '+event.target.files[0].name);}

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        try{
            const response = await axios.post("http://localhost:8080/api/transcribe", formData, {
                headers:{'Content-type':'multipart/form-data'}
            })
            setTranscription(response.data); //updating the transcription state with response from the backend
        }
        catch(error){
            console.error("Error in transcribing audio file:",error);
        }
    }

    return (
        <div className="container">
            <h1>Audio To Text Transcriber</h1>
            <div className="file-input">
                <input type="file" accept="audio/*" onChange={handleFileChange}/>{file && <p>{file}</p>}
            </div>
            <button className="upload-button" onClick={handleUpload}>Upload and transcribe</button>
            <div className="transcription-result">
                <h2>Transcription Result</h2>
                <p>{transcription}</p>
            </div>
        </div>
    );
}
export default AudioUploader;