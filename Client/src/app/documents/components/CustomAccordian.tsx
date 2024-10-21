import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Divider,
	Typography,
} from '@mui/material';

interface CustomAccordionProps extends AccordionProps {
	title: string;
}

const CustomAccordion = ({ title, children, ...props }: CustomAccordionProps) => {
	return (
		<Accordion {...props}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="body1" color="text.brand" sx={{ paddingY: 3, paddingX: 4 }}>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
			<Divider />
		</Accordion>
	);
};

export default CustomAccordion;
