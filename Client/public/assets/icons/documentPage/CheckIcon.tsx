import React from 'react';

const CheckIcon = ({ width = 18, height = 15, ...props }: { width?: number; height?: number }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 18 15'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M17 1L6 12L1 7'
				stroke='#667085'
				stroke-width='1'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default CheckIcon;
