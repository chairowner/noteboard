import { IViewer } from "@/interfaces/IViewer";
import { FC, ReactElement } from "react";
import s from "./View.module.scss";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import cns from "classnames";
import { IViewerView } from "@/interfaces/IViewerView";

const CodeComponent = (value: string, language: string): ReactElement => {
	return (
		<SyntaxHighlighter language={language} children={value} style={dark} />
	);
};

export const View: FC<IViewerView> = ({ page, className, onScroll }) => {
	if (!page) {
		return null;
	}

	return (
		<div
			className={cns(s.wrapper, className ?? null)}
			onScroll={onScroll ? (e) => onScroll(e.target) : null}
		>
			<Markdown
				children={page.body}
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={{
					code(props) {
						const { children, className, node, ...rest } = props;
						const match = /language-(\w+)/.exec(className || "");
						return match ? (
							CodeComponent(String(children).replace(/\n$/, ""), match[1])
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						);
					},
				}}
			/>
		</div>
	);
};
