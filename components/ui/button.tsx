export function Button({ children, full = false, outline = false }) {
	return (
		<button
			className={
				" border-[3px] px-3 py-[3px] rounded border-[dodgerblue] transition " +
				(outline
					? "bg-white text-[dodgerblue] font-bold "
					: "bg-[dodgerblue] text-[white] ") +
				(full && " w-full")
			}
		>
			{children}
		</button>
	);
}
