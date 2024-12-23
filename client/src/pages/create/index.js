import { useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../../components/editor";

function CreatePage() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function createNewPost (e) {
        e.preventDefault()
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        const response = await fetch("http://localhost:4000/post",{
            method: "POST",
            body: data,
            credentials: "include",
        })

        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                maxLength={100}
            />
            <input
                type="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Sumamary"
                maxLength={300}
            />
            <input type="file" onChange={e => setFiles(e.target.files)}/>
            <Editor onChange={e => setContent(e)} value={content}/>
            <button style={{ marginTop: "5px" }}>Create post</button>
        </form>
    );
}

export default CreatePage;
