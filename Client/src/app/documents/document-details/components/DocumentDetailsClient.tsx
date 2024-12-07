'use client';

import { Box, Typography } from '@mui/material';
import { dummyData } from '@/data/dummyDocuments';
import { useMemo, useState } from 'react';
import CustomBarChart, { barChartData } from './CustomBarChart';
import DocumentDetailsTable from './DocumentDetailsTable';
import FilterToggle from './FilterToggle';

export default function DocumentDetailsClient() {
	const [filterPeriod, setFilterPeriod] = useState<'fromStart' | 'last30Days' | 'last7Days'>(
		'fromStart'
	);

	//Filter the BarChart data based on last 30 and 7 days
	const filteredBarChartData = useMemo(() => {
		const currentDate = new Date();

		switch (filterPeriod) {
			case 'last30Days':
				return barChartData.filter(
					(data) => currentDate.getTime() - data.date.getTime() <= 30 * 24 * 60 * 60 * 1000
				);
			case 'last7Days':
				return barChartData.filter(
					(data) => currentDate.getTime() - data.date.getTime() <= 7 * 24 * 60 * 60 * 1000
				);
			case 'fromStart':
			default:
				return barChartData;
		}
	}, [filterPeriod, barChartData]);

	//Change the filter
	const handleFilterChange = (period: 'fromStart' | 'last30Days' | 'last7Days') => {
		setFilterPeriod(period);
	};

	//Fromat the date
	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	};

	return (
		<Box>
			<Box display="flex" justifyContent="space-between">
				<Box>
					<Typography variant="h2">
						{dummyData[0].name}
						{dummyData[0].fileFormat}
					</Typography>
					<Typography variant="body2" component="div" display="flex" gap={4} mt={5}>
						<span>Version {dummyData[0].id}</span>
						<span>-</span>
						<span>Last updated: {formatDate(dummyData[0].createdAt)}</span>
					</Typography>
				</Box>
				<Box>
					<FilterToggle currentFilter={filterPeriod} onFilterChange={handleFilterChange} />
				</Box>
			</Box>
			<Box mt={15}>
				<CustomBarChart filteredBarChartData={filteredBarChartData} />
			</Box>
			<Box mt={15}>
				<Typography variant="h2" mb={5} pl={7}>
					Link
				</Typography>
				<DocumentDetailsTable variant="linkTable" />
			</Box>
			<Box mt={15}>
				<Typography variant="h2" mb={5} pl={7}>
					All visitors
				</Typography>
				<DocumentDetailsTable variant="visitorTable" />
			</Box>
		</Box>
	);
}
