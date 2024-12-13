import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../components/editor";

function EditPage() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(
                    `http://localhost:4000/post/${id}`
                );
                const post = await response.json();
                setTitle(post.title);
                setSummary(post.summary);
                setContent(post.content);
            } catch (error) {
                console.error("Error al obtener el post:", error);
            }
        }
        fetchPost();
    }, []);

    if (redirect) {
        return <Navigate to="/" />;
    }

    async function updatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("id",id);

        if (files?.[0]) {
            data.set("file", files?.[0]);
        }

        const response = await fetch("http://localhost:4000/post", {
            method: "PUT",
            body: data,
            credentials: "include",
        });

        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={"/post/"+id} />
    }

    return (
        <form onSubmit={updatePost}>
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
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
            <Editor onChange={(e) => setContent(e)} value={content} />
            <button style={{ marginTop: "5px" }}>Update post</button>
        </form>
    );
}

export default EditPage;
