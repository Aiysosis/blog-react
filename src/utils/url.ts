export const getUrl = (path: string) => {
	if (!path) return "";
	else return import.meta.env.VITE_BASE_API + "/files?path=" + path;
};
