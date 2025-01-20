type IconColor = 'error' | 'success' | 'disabled' | 'outline';

const colorMap: Record<IconColor, string> = {
	error: '#F04438',
	success: '#067647',
	disabled: '#D0D5DD',
	outline: '#344054',
};

const XCircleIcon = ({
	width = 24,
	height = 24,
	color = 'disabled',
	...props
}: {
	width?: number;
	height?: number;
	color?: IconColor;
}) => {
	const isOutline = color === 'outline';
	const fillColor = isOutline ? 'none' : colorMap[color];
	const strokeColor = isOutline ? colorMap['outline'] : colorMap[color];

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill={fillColor}
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<circle
				cx='12'
				cy='12'
				r='11'
				fill={fillColor}
				stroke={strokeColor}
				strokeWidth={isOutline ? 2 : 0}
			/>
			<path
				d='M15 9L9 15M9 9L15 15'
				stroke={isOutline ? colorMap['outline'] : 'white'}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default XCircleIcon;
