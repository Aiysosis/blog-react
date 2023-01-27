import { useNavigate } from "react-router-dom";
import { Serie } from "../../../types/data";
import { formatTime } from "../../../utils/time";
import { getUrl } from "../../../utils/url";
import "./index.scss";

export function SerieCard(props: { serie: Serie }) {
	const { finished, coverSmall, serieName, createdTime, description, id } =
		props.serie;

	const navigate = useNavigate();

	const visitDetail = (id: number) => {
		navigate(`/series/seriedetail/${id}`);
	};

	return (
		<div className="serie-card">
			<div className="img-wrapper">
				<div className={`state ${finished ? "finished" : "active"}`}>
					{finished ? "已完结" : "连载中"}
				</div>

				<img
					src={getUrl(coverSmall)}
					className="pic"
					onClick={() => {
						visitDetail(id);
					}}
				/>
			</div>
			<div className="card-main">
				<div
					className="name"
					onClick={() => {
						visitDetail(id);
					}}
				>
					{serieName}
					<div className="underline"></div>
				</div>
				<div className="time">
					{formatTime(createdTime, "YYYY-MM-DD")}
				</div>
				<div className="discription">{description}</div>
			</div>
		</div>
	);
}
