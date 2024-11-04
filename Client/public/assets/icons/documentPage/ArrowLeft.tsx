import React from 'react';

interface ArrowIconProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	strokeColor?: string;
	strokeWidth?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
	width = '20',
	height = '20',
	strokeColor = '#667085',

	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				d="M7.5 15L12.5 10L7.5 5"
				stroke={strokeColor}
				stroke-width="1.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default ArrowIcon;
