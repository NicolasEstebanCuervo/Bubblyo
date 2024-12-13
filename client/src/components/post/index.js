import { Link } from "react-router-dom";
import { format } from "date-fns";
import styled from "@emotion/styled";

function Post({ title, summary, cover, createdAt, author, _id }) {
    return (
        <PostContainer>
            <ImageContainer >
                <img src={"http://localhost:4000/" + cover} alt="" />
            </ImageContainer>
            <TextsContainer >
                <Link to={`/post/${_id}`}>{title}</Link>
                <div>
                    <h5>{author.username}</h5>
                    <time>
                        {format(new Date(createdAt), "yyyy-MM-dd hh:mm")}
                    </time>
                </div>
                <p>{summary}</p>
            </TextsContainer>
        </PostContainer>
    );
}

export default Post;

const PostContainer = styled.div`
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    gap: 20px;
    margin-bottom: 30px;
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;

    img {
        border-radius: 10px;
        margin: 0 1rem;
        object-fit: cover;
        max-height: 20 0px;
    }
`;

const TextsContainer = styled.div`
    a {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration-line: none;
    }

    div {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin: 0.3rem 0;

        h5 {
            font-size: 0.9rem;
            font-weight: bold;
        }

        time {
            font-size: 0.9rem;
            font-weight: bold;
            margin: 0;
        }
    }

    p{
        margin: 0;
        line-height: 1.4rem;
    }
`;
