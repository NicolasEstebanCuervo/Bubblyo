import Layout from "./pages/layout";
import LoginPage from "./pages/login";
import IndexPage from "./pages/index";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register";
import { UserContextProvider } from "./userContext";
import CreatePage from "./pages/create";
import PostPage from "./pages/post";
import EditPage from "./pages/edit";

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/edit/:id" element={<EditPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

export default App;
