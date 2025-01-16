import React from 'react';

interface EmptyStateIconProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
}

const EmptyStateIcon: React.FC<EmptyStateIconProps> = ({ width = 140, height = 110, ...props }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='12 7 150 120'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<rect
				width='138'
				height='107'
				fill='#F5F5F5'
			/>
			<g clip-path='url(#clip0_0_1)'>
				<rect
					width='1440'
					height='1054'
					transform='translate(-711 -175)'
					fill='#FCFCFD'
				/>
				<rect
					x='-415.5'
					y='-41.5'
					width='1096'
					height='262'
					fill='white'
				/>
				<rect
					x='-415.5'
					y='-41.5'
					width='1096'
					height='262'
					stroke='#ECECEC'
				/>
				<g
					clip-path='url(#bgblur_1_0_1_clip_path)'
					data-figma-skip-parse='true'>
					<foreignObject
						x='0.553192'
						y='0.0425539'
						width='138'
						height='107'>
						<div style={{ backdropFilter: 'blur(1.74px)', height: '100%', width: '100%' }}></div>
					</foreignObject>
				</g>
				<g
					filter='url(#filter0_d_0_1)'
					data-figma-bg-blur-radius='3.48936'>
					<rect
						x='18'
						y='14'
						width='138'
						height='107'
						rx='4'
						fill='white'
						fill-opacity='0.5'
						shape-rendering='crispEdges'
					/>
					<rect
						x='18.4362'
						y='14.4362'
						width='137.128'
						height='106.128'
						rx='3.56383'
						stroke='#F2F2F2'
						stroke-width='0.87234'
						shape-rendering='crispEdges'
					/>
				</g>
				<rect
					x='38'
					y='73'
					width='73'
					height='10'
					rx='4'
					fill='#E4E5E9'
					fill-opacity='0.5'
				/>
				<rect
					x='38'
					y='89'
					width='62'
					height='10'
					rx='4'
					fill='#E4E5E9'
					fill-opacity='0.5'
				/>
				<path
					d='M120 49C120 49 121.5 51 124 51C126.5 51 128 49 128 49M129 44.24C128.605 44.725 128.065 45 127.5 45C126.935 45 126.41 44.725 126 44.24M122 44.24C121.605 44.725 121.065 45 120.5 45C119.935 45 119.41 44.725 119 44.24M134 47C134 52.5228 129.523 57 124 57C118.477 57 114 52.5228 114 47C114 41.4772 118.477 37 124 37C129.523 37 134 41.4772 134 47Z'
					stroke='#A3A3A3'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M46 49C46 49 47.5 51 50 51C52.5 51 54 49 54 49M53 44H53.01M47 44H47.01M60 47C60 52.5228 55.5228 57 50 57C44.4772 57 40 52.5228 40 47C40 41.4772 44.4772 37 50 37C55.5228 37 60 41.4772 60 47ZM53.5 44C53.5 44.2761 53.2761 44.5 53 44.5C52.7239 44.5 52.5 44.2761 52.5 44C52.5 43.7239 52.7239 43.5 53 43.5C53.2761 43.5 53.5 43.7239 53.5 44ZM47.5 44C47.5 44.2761 47.2761 44.5 47 44.5C46.7239 44.5 46.5 44.2761 46.5 44C46.5 43.7239 46.7239 43.5 47 43.5C47.2761 43.5 47.5 43.7239 47.5 44Z'
					stroke='#A3A3A3'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M83 49C83 49 84.5 51 87 51C89.5 51 91 49 91 49M90 44H90.01M83 44H85M97 47C97 52.5228 92.5228 57 87 57C81.4772 57 77 52.5228 77 47C77 41.4772 81.4772 37 87 37C92.5228 37 97 41.4772 97 47ZM90.5 44C90.5 44.2761 90.2761 44.5 90 44.5C89.7239 44.5 89.5 44.2761 89.5 44C89.5 43.7239 89.7239 43.5 90 43.5C90.2761 43.5 90.5 43.7239 90.5 44Z'
					stroke='#A3A3A3'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</g>
			<defs>
				<filter
					id='filter0_d_0_1'
					x='0.553192'
					y='0.0425539'
					width='172.894'
					height='141.894'
					filterUnits='userSpaceOnUse'
					color-interpolation-filters='sRGB'>
					<feFlood
						flood-opacity='0'
						result='BackgroundImageFix'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feOffset dy='3.48936' />
					<feGaussianBlur stdDeviation='8.7234' />
					<feComposite
						in2='hardAlpha'
						operator='out'
					/>
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_0_1'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_0_1'
						result='shape'
					/>
				</filter>
				<clipPath id='bgblur_1_0_1_clip_path'>
					<rect
						x='18'
						y='14'
						width='138'
						height='107'
						rx='4'
					/>
				</clipPath>
				<clipPath id='clip0_0_1'>
					<rect
						width='1440'
						height='1054'
						fill='white'
						transform='translate(-711 -175)'
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default EmptyStateIcon;
