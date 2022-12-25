import axios, { AxiosError, AxiosResponse } from "axios";

// create an axios instance
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
	timeout: 8000, // request timeout
	headers: {
		"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
	},
});

// request interceptor
service.interceptors.request.use();

//respone interceptor
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (!response.data.status) {
			//everything is ok
			//! do not handle response.data.data here
			return response.data;
		} else {
			//failed
			console.warn("Axios response Error: ", response);
			return Promise.reject(response.data);
		}
	},
	(error: AxiosError) => {
		if (error.response && error.response.status) {
			console.warn("Axios error:", error);
			return Promise.reject(error.response);
		}
	}
);

export default service;
