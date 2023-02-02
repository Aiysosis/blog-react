import { Location, matchRoutes } from "react-router-dom";
import { routes } from ".";

export function getRouteObjectByLocation(location: Location) {
	const matched = matchRoutes(routes, location);
	const n = matched.length;
	if (n > 0) return matched[n - 1].route;
	else return null;
}
