import { Document } from '@/app/documents/components/DocumentsTable'; // Adjust the path based on your actual structure

export const dummyData: Document[] = [
	{
		id: '1',
		type: 'PDF',
		name: '2024 Information Fair Exhibitor Guidelines',
		createdAt: new Date('July 1, 2024'),
		links: 2,
		viewers: 2,
		uploader: { name: 'You', avatar: '/' },
		views: 4,
	},
	{
		id: '2',
		type: 'PDF',
		name: 'Data Application Scenarios',
		createdAt: new Date('July 1, 2024'),
		links: 0,
		viewers: 4,
		uploader: { name: 'Neeraj Sunil', avatar: '/' },
		views: 9,
	},
	{
		id: '3',
		type: 'DOC',
		name: 'AI Outlook 2025 and Beyond',
		createdAt: new Date('June 28, 2024'),
		links: 2,
		viewers: 0,
		uploader: { name: 'Mahid Ahmad', avatar: '/' },
		views: 11,
	},
	{
		id: '4',
		type: 'XLSX',
		name: 'Market Analysis 2024 Q1',
		createdAt: new Date('May 15, 2024'),
		links: 3,
		viewers: 5,
		uploader: { name: 'Alice Brown', avatar: '/' },
		views: 15,
	},
	{
		id: '5',
		type: 'PPT',
		name: 'Company Strategy Presentation',
		createdAt: new Date('April 22, 2024'),
		links: 1,
		viewers: 3,
		uploader: { name: 'John Doe', avatar: '/' },
		views: 7,
	},
	{
		id: '6',
		type: 'DOC',
		name: 'Project Plan Template',
		createdAt: new Date('March 10, 2024'),
		links: 4,
		viewers: 6,
		uploader: { name: 'Neeraj Sunil', avatar: '/' },
		views: 12,
	},
	{
		id: '7',
		type: 'XLSX',
		name: 'Financial Report 2023',
		createdAt: new Date('February 28, 2024'),
		links: 0,
		viewers: 1,
		uploader: { name: 'Alice Brown', avatar: '/' },
		views: 3,
	},
	{
		id: '8',
		type: 'PDF',
		name: 'Employee Handbook 2024',
		createdAt: new Date('July 10, 2024'),
		links: 2,
		viewers: 3,
		uploader: { name: 'Sarah Lee', avatar: '/' },
		views: 14,
	},
	{
		id: '9',
		type: 'DOC',
		name: 'Technical Specifications Document',
		createdAt: new Date('July 12, 2024'),
		links: 3,
		viewers: 5,
		uploader: { name: 'Michael Chen', avatar: '/' },
		views: 18,
	},
	{
		id: '10',
		type: 'XLSX',
		name: 'Budget Forecast Q3 2024',
		createdAt: new Date('July 14, 2024'),
		links: 1,
		viewers: 4,
		uploader: { name: 'Linda Thompson', avatar: '/' },
		views: 9,
	},
	{
		id: '11',
		type: 'PPT',
		name: 'Sales Pitch Presentation',
		createdAt: new Date('July 16, 2024'),
		links: 2,
		viewers: 7,
		uploader: { name: 'David Wilson', avatar: '/' },
		views: 16,
	},
	{
		id: '12',
		type: 'PDF',
		name: 'Quarterly Financial Report Q2 2024',
		createdAt: new Date('July 18, 2024'),
		links: 3,
		viewers: 6,
		uploader: { name: 'Emma Davis', avatar: '/' },
		views: 20,
	},
	{
		id: '13',
		type: 'DOC',
		name: 'Product Launch Plan',
		createdAt: new Date('July 20, 2024'),
		links: 4,
		viewers: 3,
		uploader: { name: 'Oliver Martinez', avatar: '/' },
		views: 11,
	},
	{
		id: '14',
		type: 'XLSX',
		name: 'Year-End Financial Statements 2023',
		createdAt: new Date('July 22, 2024'),
		links: 0,
		viewers: 2,
		uploader: { name: 'Sophia White', avatar: '/' },
		views: 6,
	},
	{
		id: '15',
		type: 'PPT',
		name: 'Project Kickoff Presentation',
		createdAt: new Date('July 24, 2024'),
		links: 1,
		viewers: 4,
		uploader: { name: 'James Moore', avatar: '/' },
		views: 9,
	},
	{
		id: '16',
		type: 'PDF',
		name: 'Market Research Report 2024',
		createdAt: new Date('July 26, 2024'),
		links: 2,
		viewers: 1,
		uploader: { name: 'Mia Garcia', avatar: '/' },
		views: 10,
	},
	{
		id: '17',
		type: 'DOC',
		name: 'Internal Audit Report 2024',
		createdAt: new Date('July 28, 2024'),
		links: 3,
		viewers: 3,
		uploader: { name: 'Lucas Robinson', avatar: '/' },
		views: 8,
	},
	{
		id: '18',
		type: 'XLSX',
		name: 'Revenue Analysis Q2 2024',
		createdAt: new Date('July 30, 2024'),
		links: 4,
		viewers: 5,
		uploader: { name: 'Amelia Clark', avatar: '/' },
		views: 15,
	},
	{
		id: '19',
		type: 'PPT',
		name: 'Executive Summary Presentation',
		createdAt: new Date('August 1, 2024'),
		links: 0,
		viewers: 6,
		uploader: { name: 'Henry Young', avatar: '/' },
		views: 4,
	},
	{
		id: '20',
		type: 'PDF',
		name: 'Operational Efficiency Report',
		createdAt: new Date('August 3, 2024'),
		links: 1,
		viewers: 2,
		uploader: { name: 'Harper Harris', avatar: '/' },
		views: 13,
	},
	{
		id: '21',
		type: 'DOC',
		name: 'Employee Onboarding Guide 2024',
		createdAt: new Date('August 5, 2024'),
		links: 2,
		viewers: 4,
		uploader: { name: 'Evelyn Lewis', avatar: '/' },
		views: 12,
	},
	{
		id: '22',
		type: 'XLSX',
		name: 'Cost-Benefit Analysis 2024',
		createdAt: new Date('August 7, 2024'),
		links: 3,
		viewers: 3,
		uploader: { name: 'Mason Walker', avatar: '/' },
		views: 7,
	},
	{
		id: '23',
		type: 'PPT',
		name: 'Strategic Planning Presentation',
		createdAt: new Date('August 9, 2024'),
		links: 4,
		viewers: 5,
		uploader: { name: 'Zack Martinez', avatar: '/' },
		views: 18,
	},
	{
		id: '24',
		type: 'PDF',
		name: 'Compliance Report 2024',
		createdAt: new Date('August 11, 2024'),
		links: 0,
		viewers: 2,
		uploader: { name: 'William Allen', avatar: '/' },
		views: 6,
	},
];
