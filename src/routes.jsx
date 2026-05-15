import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="single/:type/:uid" element={<Single />} />
            <Route path="*" element={<h1 className="text-center mt-5 text-light">Not found!</h1>} />
        </Route>
    )
);