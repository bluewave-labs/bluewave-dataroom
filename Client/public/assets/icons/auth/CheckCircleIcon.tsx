type IconColor = 'error' | 'success' | 'default' | 'outline';

const colorMap: Record<IconColor, string> = {
	error: '#F04438',
	success: '#067647',
	default: '#D0D5DD',
	outline: '#344054',
};

const CheckCircleIcon = ({
	width = 24,
	height = 24,
	color = 'default',
	...props
}: {
	width?: number;
	height?: number;
	color?: IconColor;
}) => {
	const isOutline = color === 'outline';
	const fillColor = isOutline ? 'none' : colorMap[color];
	const strokeColor = isOutline ? colorMap['outline'] : 'none';

	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill='none'
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
				d='M8 12L10.5 14.5L16 9'
				stroke={isOutline ? colorMap['outline'] : 'white'}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CheckCircleIcon;
