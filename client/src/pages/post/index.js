import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { UserContext } from "../../userContext";

function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(
                    `http://localhost:4000/post/${id}`
                );
                const post = await response.json();
                setPostInfo(post);
            } catch (error) {
                console.error("Error al obtener el post:", error);
            }
        }
        fetchPost();
    }, []);

    if (!postInfo) return "";

    return (
        <PostContainer>
            <PostTitle>{postInfo.title}</PostTitle>
            <Info>
                <time>
                    {format(new Date(postInfo.createdAt), "yyyy-MM-dd hh:mm")}
                </time>

                <h5>By @{postInfo.author.username}</h5>
            </Info>

            {userInfo.id === postInfo.author._id && (
                <EditButton to={`/edit/${postInfo._id}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                    Edit this post
                </EditButton>
            )}

            <ImageContainer>
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
            </ImageContainer>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </PostContainer>
    );
}

export default PostPage;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostTitle = styled.h1`
    font-size: 2.3rem;
    text-align: center;
    margin: 0;
`;

const Info = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    font-size: 1.3rem;
    font-weight: bold;
`;

const EditButton = styled(Link)`
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    background: #333;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;

    svg {
        height: 2rem;
    }
`;

const ImageContainer = styled.div`
    margin: 1rem 0;
    width: 100%;
    img {
        object-fit: cover;
        max-height: 300px;
        margin: auto;
        width: 100%;
        height: 100%;
    }
`;
