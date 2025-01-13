import React from 'react';

interface IconProps {
	width?: number;
	height?: number;
	color?: string;
	stroke?: string;
	className?: string;
}

const XCircleIcon: React.FC<IconProps> = ({
	width = 24,
	height = 24,
	color = 'none',
	stroke = 'white',
	className = '',
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill={color}
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			<path
				d='M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
				stroke={stroke}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default XCircleIcon;
