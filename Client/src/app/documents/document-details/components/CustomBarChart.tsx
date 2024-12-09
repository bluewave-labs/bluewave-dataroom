import { BarChart } from '@mui/x-charts/BarChart';

export const barChartData = [
	{ month: 'Jan', Views: 13, Downloads: 5, date: new Date('Jan 1, 2024') },
	{ month: 'Feb', Views: 24, Downloads: 9, date: new Date('Feb 1, 2024') },
	{ month: 'Mar', Views: 16, Downloads: 27, date: new Date('Mar 1, 2024') },
	{ month: 'Apr', Views: 3, Downloads: 8, date: new Date('Apr 1, 2024') },
	{ month: 'May', Views: 2, Downloads: 6, date: new Date('May 1, 2024') },
	{ month: 'Jun', Views: 9, Downloads: 8, date: new Date('Jun 1, 2024') },
	{ month: 'Jul', Views: 9, Downloads: 3, date: new Date('Jul 1, 2024') },
	{ month: 'Aug', Views: 18, Downloads: 26, date: new Date('Aug 1, 2024') },
	{ month: 'Sep', Views: 32, Downloads: 22, date: new Date('Sep 1, 2024') },
	{ month: 'Oct', Views: 38, Downloads: 31, date: new Date('Oct 1, 2024') },
	{ month: 'Nov', Views: 35, Downloads: 32, date: new Date('Nov 1, 2024') },
	// { month: 'Dec', Views: 0, Downloads: 0, date: new Date('Dec 1, 2024') },
];

interface CustomBarChartProps {
	filteredBarChartData: { month: string; Views: number; Downloads: number; date: Date }[];
}

export default function CustomBarChart({ filteredBarChartData }: CustomBarChartProps) {
	return (
		<>
			<BarChart
				width={1208}
				height={300}
				dataset={filteredBarChartData}
				xAxis={[
					{
						scaleType: 'band',
						dataKey: 'month',
						...({ categoryGapRatio: 0.7 } as any),
						barGapRatio: 0.4,
					},
				]}
				series={[
					{ dataKey: 'Views', label: 'Views', color: '#01AFFF' },
					{ dataKey: 'Downloads', label: 'Downloads', color: '#1570EF' },
				]}
				slotProps={{
					legend: {
						itemMarkWidth: 12,
						itemMarkHeight: 12,
						itemGap: 20,
						padding: -5,
					},
				}}
			/>
		</>
	);
}
