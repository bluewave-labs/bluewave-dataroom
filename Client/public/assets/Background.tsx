import { Box } from '@mui/material';
import React from 'react';

const Background = ({
	width = 768,
	height = 768,
	backgroundPosition = 0,
	zIndex = -1,
	...props
}) => (
	<Box
		position='absolute'
		top={backgroundPosition}
		left='50%'
		display='flex'
		justifyContent='center'
		zIndex={zIndex}
		sx={{ transform: 'translate(-50%, -50%)', backgroundPosition: 'center' }}>
		<svg
			width={width}
			height={height}
			viewBox='0 0 768 768'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<mask
				id='mask0_97_2282'
				style={{ maskType: 'alpha' }}
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='768'
				height='768'>
				<rect
					width='768'
					height='768'
					fill='url(#paint0_radial_97_2282)'
				/>
			</mask>
			<g mask='url(#mask0_97_2282)'>
				<g clipPath='url(#clip0_97_2282)'>
					<g clipPath='url(#clip1_97_2282)'>
						{[...Array(16)].map((_, i) => (
							<line
								key={i}
								x1={`${i * 48 + 0.5}`}
								x2={`${i * 48 + 0.5}`}
								y2='768'
								stroke='#EAECF0'
							/>
						))}
					</g>
					<rect
						x='0.5'
						y='0.5'
						width='767'
						height='767'
						stroke='#EAECF0'
					/>
					<g clipPath='url(#clip2_97_2282)'>
						{[...Array(16)].map((_, i) => (
							<line
								key={i}
								y1={`${i * 48 - 0.5}`}
								x2='768'
								y2={`${i * 48 - 0.5}`}
								stroke='#EAECF0'
							/>
						))}
					</g>
					<rect
						x='0.5'
						y='0.5'
						width='767'
						height='767'
						stroke='#EAECF0'
					/>
				</g>
			</g>
			<defs>
				<radialGradient
					id='paint0_radial_97_2282'
					cx='0'
					cy='0'
					r='1'
					gradientUnits='userSpaceOnUse'
					gradientTransform='translate(384 384) rotate(90) scale(384 384)'>
					<stop />
					<stop
						offset='1'
						stopOpacity='0'
					/>
				</radialGradient>
				<clipPath id='clip0_97_2282'>
					<rect
						width='768'
						height='768'
						fill='white'
					/>
				</clipPath>
				<clipPath id='clip1_97_2282'>
					<rect
						width='768'
						height='768'
						fill='white'
					/>
				</clipPath>
				<clipPath id='clip2_97_2282'>
					<rect
						width='768'
						height='768'
						fill='white'
					/>
				</clipPath>
			</defs>
		</svg>
	</Box>
);

export default Background;
