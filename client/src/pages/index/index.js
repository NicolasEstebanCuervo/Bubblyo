import { useEffect, useState } from "react";
import Post from "../../components/post";

function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/post/").then((response) => {
            response.json().then((posts) => {
                setPosts(posts);
            });
        });
    }, []);

    return (
        <>
            {posts.map((post,index) => (
                <Post key={index} {...post} />
            ))}
        </>
    );
}

export default IndexPage;
