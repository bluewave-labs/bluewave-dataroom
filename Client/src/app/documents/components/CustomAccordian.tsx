import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Divider,
	Typography,
} from '@mui/material';
import ArrowLeftIcon from '../../../../public/assets/icons/documentPage/ArrowLeftIcon';

interface CustomAccordionProps extends AccordionProps {
	title: string;
}

const CustomAccordion = ({ title, children, ...props }: CustomAccordionProps) => {
	return (
		<Accordion {...props}>
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
				expandIcon={<ArrowLeftIcon />}>
				<Typography variant="body1" color="text.brand" sx={{ py: 3, px: 4 }}>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
			<Divider />
		</Accordion>
	);
};

export default CustomAccordion;
