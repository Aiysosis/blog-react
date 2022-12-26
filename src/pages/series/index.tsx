import { useLocation } from "react-router-dom";

function SeriePage() {
	const location = useLocation();
	return <h1>{location.pathname}</h1>;
}

export default SeriePage;
