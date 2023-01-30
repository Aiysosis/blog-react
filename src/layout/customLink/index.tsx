import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import css from "./index.module.scss";

function CustomLink({ children, to, ...props }: LinkProps) {
	//* 如果外部调用是 <CustomLink>...</CustomLink>，那么children就是内部的元素
	//* to 和 Link相同（就是继承过来的）
	//* 其他不关键的属性解构并统一放到props内部
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	const { navItem, active } = css;
	return (
		<Link
			className={`${navItem} ${match ? active : ""}`}
			to={to}
			{...props}
		>
			{children}
		</Link>
	);
}

function NavLink({ children, to, ...props }: LinkProps) {
	const { underline } = css;
	return (
		<CustomLink to={to} {...props}>
			{children}
			<div className={underline}></div>
		</CustomLink>
	);
}

export default NavLink;
