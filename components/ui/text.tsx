import React from "react";

type Props = {
	children: React.ReactNode;
	variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	color?: "black" | "gray";
	capitalize?: boolean;
};

export function Text({
	children,
	variant = 7,
	color = "gray",
	capitalize = false,
}: Props) {
	let className = ``;

	if (capitalize) className += ` uppercase font-medium tacking-wide text-lg`;

	if (variant === 1) className += ` text-3xl font-bold`;
	else if (variant === 2) className += ` text-xl font-bold`;
	else if (variant === 3) className += ` text-lg font-bold`;

	if (color == "black") className += ` text-black`;
	else if (color == "gray") className += ` text-gray-600`;

	return <span className={className}>{children}</span>;
}
