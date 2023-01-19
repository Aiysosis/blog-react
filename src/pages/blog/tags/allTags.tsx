import { TagsList } from ".";
import { RightBar } from "../../../components/rightBar";
import { Blog } from "../../../types/data";
import { useTagsData } from "./tags";

type AllTagsProps = {
	setBlogList: (list: Blog[]) => void;
	setLoading: () => void;
	resetBlogList: () => void;
	needResetList: () => boolean;
	rightbarState: boolean;
	closeRightbar: () => void;
};

export function AllTags(props: AllTagsProps) {
	const {
		setBlogList,
		resetBlogList,
		setLoading,
		needResetList,
		rightbarState,
		closeRightbar,
	} = props;

	const { tagsState, fetchData, handleSelectChange } = useTagsData(
		setBlogList,
		resetBlogList,
		setLoading,
		needResetList
	);

	return (
		<RightBar
			show={rightbarState}
			closeFn={closeRightbar}
			hasWrapper={false}
			width={320}
			title="All Tags"
		>
			<div className="side-tags-main">
				<TagsList
					fetchAll={true}
					tagsState={tagsState}
					fetchData={fetchData}
					handleSelectChange={handleSelectChange}
				/>
			</div>
		</RightBar>
	);
}
