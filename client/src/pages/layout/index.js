import { Outlet } from "react-router-dom";
import Header from "../../components/header";
import styled from "@emotion/styled";

function Layout() {
    return (
        <Main>
            <Header />
            <Outlet />
        </Main>
    );
}

export default Layout;

const Main = styled.main`
    padding: 10px;
    max-width: 700px;
    margin: 0 auto;
`
