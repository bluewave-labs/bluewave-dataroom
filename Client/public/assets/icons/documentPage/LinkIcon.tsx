const LinkIcon = ({
	width = 16,
	height = 16,
	disabled = false,
	...props
}: {
	width?: number;
	height?: number;
	disabled?: boolean;
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 18 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M9.58955 14.3034L8.41104 15.4819C6.78386 17.1091 4.14567 17.1091 2.51848 15.4819C0.891299 13.8547 0.8913 11.2165 2.51848 9.58931L3.697 8.4108M14.3036 9.58931L15.4821 8.4108C17.1093 6.78361 17.1093 4.14542 15.4821 2.51824C13.8549 0.891055 11.2167 0.891056 9.58955 2.51824L8.41104 3.69675M6.08363 11.9167L11.917 6.08337"
				stroke={disabled ? '#A1AFC6' : '#344054'}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default LinkIcon;
