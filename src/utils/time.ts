import moment from "moment";

// export enum TimeFormats {
//   YMD = "YYYY-MM-DD",
// }

export function formatTime(time: string, format: string) {
	return moment(time).format(format);
}
