import { RouterProvider, useLocation } from "react-router-dom";
import { Loading } from "./pages/loading";
import router from "./router";
import "./styles/app.scss";

function App() {
	return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default App;
