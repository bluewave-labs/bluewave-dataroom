import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface Props {
	currentFilter: 'All' | 'Administrator' | 'Member';
	onFilterChange: (role: 'All' | 'Administrator' | 'Member') => void;
}

const FilterToggle = ({ currentFilter, onFilterChange }: Props) => {
	return (
		<ToggleButtonGroup
			value={currentFilter}
			exclusive
			onChange={(event, newRole) => {
				if (newRole !== null) {
					onFilterChange(newRole);
				}
			}}
			aria-label="Filter by role"
			size="small"
			sx={{
				backgroundColor: 'white',
				'& .MuiToggleButton-root': {
					color: 'black',
					textTransform: 'none',
					paddingX: '1.25rem',
					paddingY: '0.25rem',
				},
				'& .MuiToggleButton-root.Mui-selected': {
					fontWeight: 'bold',
				},
			}}>
			<ToggleButton value="All">All</ToggleButton>
			<ToggleButton value="Administrator">Administrator</ToggleButton>
			<ToggleButton value="Member">Member</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default FilterToggle;
