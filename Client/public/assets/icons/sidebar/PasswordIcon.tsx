import React, { FC, SVGProps } from 'react';

interface PasswordIconProps extends SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	color?: string;
	strokeWidth?: number;
}

/**
 * A reusable SVG icon component for rendering an icon.
 *
 * @param {number} [width=16] - The width of the icon in pixels. Optional.
 * @param {number} [height=16] - The height of the icon in pixels. Optional.
 * @param {string} [color='#667085'] - The stroke color of the icon. Accepts any valid CSS color value. Optional.
 * @param {number} [strokeWidth=1.5] - The stroke width of the icon's path. Optional.
 * @param {SVGProps<SVGSVGElement>} props - Additional SVG props such as `className`, `style`, or custom attributes.
 *
 * @returns {JSX.Element} A scalable vector graphic (SVG) element representing the icon.
 */

const PasswordIcon: FC<PasswordIconProps> = ({
	width = 16,
	height = 16,
	color = '#667085',
	strokeWidth = 1.5,
	...props
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-label="Password Icon"
			role="img"
			{...props}>
			<path
				d="M11.3333 6.66667V5.33333C11.3333 3.49238 9.84095 2 8 2C6.15906 2 4.66667 3.49238 4.66667 5.33333V6.66667M8 9.66667V11M5.86667 14H10.1333C11.2534 14 11.8135 14 12.2413 13.782C12.6176 13.5903 12.9236 13.2843 13.1154 12.908C13.3333 12.4802 13.3333 11.9201 13.3333 10.8V9.86667C13.3333 8.74656 13.3333 8.18651 13.1154 7.75869C12.9236 7.38236 12.6176 7.0764 12.2413 6.88465C11.8135 6.66667 11.2534 6.66667 10.1333 6.66667H5.86667C4.74657 6.66667 4.18651 6.66667 3.75869 6.88465C3.38237 7.0764 3.07641 7.38236 2.88466 7.75869C2.66667 8.18651 2.66667 8.74656 2.66667 9.86667V10.8C2.66667 11.9201 2.66667 12.4802 2.88466 12.908C3.07641 13.2843 3.38237 13.5903 3.75869 13.782C4.18651 14 4.74657 14 5.86667 14Z"
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default PasswordIcon;
