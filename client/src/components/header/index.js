import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../userContext";
import styled from "@emotion/styled";

function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const username = userInfo?.username;

    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    function logout() {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
    }

    return (
        <HeaderContainer>
            <NavbarLink to="/">Bubblyo</NavbarLink>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout} role="button" tabIndex="0">
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0 3rem 0;

    nav {
        display: flex;
        gap: 1rem;
    }
`;

const NavbarLink = styled(Link)`
    font-weight: bold;
    font-size: 1.5rem;
`;
