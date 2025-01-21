import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Typography,
} from '@mui/material';
import ArrowLeft from '../../../../public/assets/icons/documentPage/ArrowLeft';

interface CustomAccordionProps extends AccordionProps {
	title: string;
}

const CustomAccordion = ({ title, children, ...props }: CustomAccordionProps) => {
	return (
		<Accordion
			slotProps={{ transition: { unmountOnExit: true } }}
			{...props}>
			<AccordionSummary
				sx={{
					flexDirection: 'row-reverse',
					'& .MuiAccordionSummary-expandIconWrapper': {
						transform: 'rotate(0deg)',
						transition: 'transform 0.3s ease',
					},
					'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
						transform: 'rotate(90deg)',
						transition: 'transform 0.3s ease',
					},
				}}
				expandIcon={<ArrowLeft />}>
				<Typography
					variant='body1'
					color='text.brand'
					py={3}
					px={4}>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</Accordion>
	);
};

export default CustomAccordion;
