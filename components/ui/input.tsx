export function Input({ label, ref = null, name, ...props }) {
	return (
		<div className="mt-2 w-full">
			<label htmlFor={name} className="block text-sm capitalize">
				{label}
			</label>
			<input
				name={name}
				ref={ref}
				className="border px-4 w-full py-2 mb-3 rounded placeholder:capitalize focus:outline-none focus:ring focus:ring-[#1e8fff94] transition"
				type="text"
				{...props}
			/>
		</div>
	);
}
