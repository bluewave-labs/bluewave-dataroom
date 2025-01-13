import { BarDataItem, DocumentType } from '@/utils/shared/models';

export const mockGraphData: BarDataItem[] = [
	{ month: 'Jan', Views: 13, Downloads: 5, date: new Date('Jan 1, 2024') },
	{ month: 'Feb', Views: 24, Downloads: 9, date: new Date('Feb 1, 2024') },
	{ month: 'Mar', Views: 16, Downloads: 27, date: new Date('Mar 1, 2024') },
	{ month: 'Apr', Views: 3, Downloads: 8, date: new Date('Apr 1, 2024') },
	{ month: 'May', Views: 2, Downloads: 6, date: new Date('May 1, 2024') },
	{ month: 'Jun', Views: 9, Downloads: 8, date: new Date('Jun 1, 2024') },
	{ month: 'Jul', Views: 9, Downloads: 3, date: new Date('Jul 1, 2024') },
	{ month: 'Aug', Views: 18, Downloads: 15, date: new Date('Aug 1, 2024') },
	{ month: 'Sep', Views: 12, Downloads: 19, date: new Date('Sep 1, 2024') },
	{ month: 'Oct', Views: 38, Downloads: 31, date: new Date('Oct 1, 2024') },
	{ month: 'Nov', Views: 35, Downloads: 32, date: new Date('Nov 1, 2024') },
	{ month: 'Dec', Views: 45, Downloads: 37, date: new Date('Dec 1, 2024') },
];

// export const dummyData: DocumentType[] = [
// 	{
// 		id: 1,
// 		document_id: '1',
// 		fileName: '2024 Information Fair Exhibitor Guidelines',
// 		filePath: '/uploads/2024_information_fair.pdf',
// 		fileType: 'application/pdf',
// 		size: 1048576, // 1 MB
// 		createdAt: '2024-07-01T10:00:00Z',
// 		updatedAt: '2024-07-01T12:00:00Z',
// 		uploader: {
// 			name: 'You',
// 			avatar: '/assets/icons/sidebar/sidebar-avatar-icon.svg',
// 		},
// 		links: 2,
// 		viewers: 2,
// 		views: 4,
// 		createdLinks: [
// 			{
// 				id: 1,
// 				createdLink: 'https://github.com/bluewave-labs/bluewave-dataroom',
// 				lastViewed: new Date('2024-09-15T00:00:00Z'),
// 				linkViews: 14,
// 			},
// 		],
// 		visitors: [
// 			{
// 				id: 1,
// 				visitor: 'gorkem@bwl.ca',
// 				downloads: 0,
// 				lastViewed: new Date('2024-07-15T04:30:00Z'),
// 				duration: '3 minutes 4 seconds',
// 				completion: '15%',
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		document_id: '1',

// 		fileName: 'Data Application Scenarios',
// 		filePath: '/uploads/data_application_scenarios.pdf',
// 		fileType: 'application/pdf',
// 		size: 204800, // 200 KB
// 		createdAt: '2024-07-01T15:00:00Z',
// 		updatedAt: '2024-07-01T16:00:00Z',
// 		uploader: { name: 'Neeraj Sunil', avatar: null },
// 		links: 0,
// 		viewers: 4,
// 		views: 9,
// 		createdLinks: [],
// 		visitors: [],
// 	},
// 	{
// 		id: 3,
// 		document_id: '1',

// 		fileName: 'AI Outlook 2025 and Beyond',
// 		filePath: '/uploads/ai_outlook_2025.docx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 		size: 307200, // 300 KB
// 		createdAt: '2024-06-28T09:00:00Z',
// 		updatedAt: '2024-06-28T10:00:00Z',
// 		uploader: { name: 'Mahid Ahmad', avatar: null },
// 		links: 2,
// 		viewers: 0,
// 		views: 11,
// 		createdLinks: [],
// 		visitors: [
// 			{
// 				id: 1,
// 				visitor: 'Gorkem Cetin',
// 				downloads: 0,
// 				lastViewed: new Date('2024-07-15T06:02:00Z'),
// 				duration: '3 minutes 4 seconds',
// 				completion: '15%',
// 			},
// 		],
// 	},
// 	{
// 		id: 4,
// 		document_id: '1',

// 		fileName: 'Market Analysis 2024 Q1',
// 		filePath: '/uploads/market_analysis_q1.xlsx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
// 		size: 512000, // 500 KB
// 		createdAt: '2024-05-15T08:00:00Z',
// 		updatedAt: '2024-05-15T09:00:00Z',
// 		uploader: { name: 'Alice Brown', avatar: null },
// 		links: 3,
// 		viewers: 5,
// 		views: 15,
// 		createdLinks: [
// 			{
// 				id: 1,
// 				createdLink: 'https://github.com/bluewave-labs/bluewave-dataroom',
// 				lastViewed: new Date('2024-07-15T00:00:00Z'),
// 				linkViews: 14,
// 			},
// 		],
// 		visitors: [],
// 	},
// 	{
// 		id: 5,
// 		document_id: '1',

// 		fileName: 'Company Strategy Presentation',
// 		filePath: '/uploads/company_strategy.pptx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
// 		size: 1024000, // 1 MB
// 		createdAt: '2024-04-22T14:00:00Z',
// 		updatedAt: '2024-04-22T15:00:00Z',
// 		uploader: { name: 'John Doe', avatar: null },
// 		links: 1,
// 		viewers: 3,
// 		views: 7,
// 		createdLinks: [
// 			{
// 				id: 1,
// 				createdLink: 'https://github.com/bluewave-labs/bluewave-dataroom',
// 				lastViewed: new Date('2024-07-15T00:00:00Z'),
// 				linkViews: 14,
// 			},
// 		],
// 		visitors: [],
// 	},
// 	{
// 		id: 6,
// 		document_id: '1',

// 		fileName: 'Employee Handbook 2024',
// 		filePath: '/uploads/employee_handbook.pdf',
// 		fileType: 'application/pdf',
// 		size: 2097152, // 2 MB
// 		createdAt: '2024-07-10T10:00:00Z',
// 		updatedAt: '2024-07-10T12:00:00Z',
// 		uploader: {
// 			name: 'Sarah Lee',
// 			avatar: null,
// 		},
// 		links: 2,
// 		viewers: 3,
// 		views: 14,
// 		createdLinks: [],
// 		visitors: [
// 			{
// 				id: 1,
// 				visitor: 'Gorkem Cetin',
// 				downloads: 0,
// 				lastViewed: new Date('2024-07-15T06:02:00Z'),
// 				duration: '3 minutes 4 seconds',
// 				completion: '15%',
// 			},
// 		],
// 	},
// 	{
// 		id: 7,
// 		document_id: '1',

// 		fileName: 'Technical Specifications Document',
// 		filePath: '/uploads/technical_specifications.pdf',
// 		fileType: 'application/pdf',
// 		size: 1572864, // 1.5 MB
// 		createdAt: '2024-07-12T11:00:00Z',
// 		updatedAt: '2024-07-12T12:00:00Z',
// 		uploader: {
// 			name: 'Michael Chen',
// 			avatar: null,
// 		},
// 		links: 3,
// 		viewers: 5,
// 		views: 18,
// 		createdLinks: [],
// 		visitors: [],
// 	},
// 	{
// 		id: 8,
// 		document_id: '1',

// 		fileName: 'Budget Forecast Q3 2024',
// 		filePath: '/uploads/budget_forecast_q3.xlsx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
// 		size: 614400, // 600 KB
// 		createdAt: '2024-07-14T09:30:00Z',
// 		updatedAt: '2024-07-14T10:30:00Z',
// 		uploader: {
// 			name: 'Linda Thompson',
// 			avatar: null,
// 		},
// 		links: 1,
// 		viewers: 4,
// 		views: 9,
// 		createdLinks: [],
// 		visitors: [],
// 	},
// 	{
// 		id: 9,
// 		document_id: '1',

// 		fileName: 'Sales Pitch Presentation',
// 		filePath: '/uploads/sales_pitch.pptx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
// 		size: 819200, // 800 KB
// 		createdAt: '2024-07-16T13:00:00Z',
// 		updatedAt: '2024-07-16T14:00:00Z',
// 		uploader: {
// 			name: 'David Wilson',
// 			avatar: null,
// 		},
// 		links: 2,
// 		viewers: 7,
// 		views: 16,
// 		createdLinks: [],
// 		visitors: [],
// 	},
// 	{
// 		id: 10,
// 		document_id: '1',

// 		fileName: 'Product Launch Plan',
// 		filePath: '/uploads/product_launch_plan.docx',
// 		fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 		size: 256000, // 250 KB
// 		createdAt: '2024-07-20T09:00:00Z',
// 		updatedAt: '2024-07-20T10:00:00Z',
// 		uploader: {
// 			name: 'Oliver Martinez',
// 			avatar: null,
// 		},
// 		links: 4,
// 		viewers: 3,
// 		views: 11,
// 		createdLinks: [],
// 		visitors: [],
// 	},
// ];
