import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Loading } from "./pages/loading";
import router from "./router";
import "./styles/app.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<RouterProvider router={router} fallbackElement={<Loading />} />
	</>
);
