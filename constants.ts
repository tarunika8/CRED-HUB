
import type { Certificate, UserProfile, Job } from './types';

export const mockUser: UserProfile = {
  name: 'Alex Doe',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  title: 'Lifelong Learner',
};

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: '2023-10-15',
    verificationCode: 'UC-ABC-123',
    level: 'Advanced',
    relevance: 9,
    reputation: 8,
    imageUrl: 'https://picsum.photos/seed/react/400/250',
  },
  {
    id: 'cert-2',
    title: 'Google Project Management',
    issuer: 'Coursera',
    date: '2023-08-20',
    verificationCode: 'COUR-XYZ-789',
    level: 'Intermediate',
    relevance: 7,
    reputation: 9,
    imageUrl: 'https://picsum.photos/seed/googlepm/400/250',
  },
  {
    id: 'cert-3',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024-01-05',
    verificationCode: 'AWS-PQR-456',
    level: 'Beginner',
    relevance: 8,
    reputation: 10,
    imageUrl: 'https://picsum.photos/seed/aws/400/250',
  },
    {
    id: 'cert-4',
    title: 'UX Design Professional Certificate',
    issuer: 'Google',
    date: '2022-11-30',
    verificationCode: 'GOOG-UX-101',
    level: 'Intermediate',
    relevance: 8,
    reputation: 9,
    imageUrl: 'https://picsum.photos/seed/ux/400/250',
  },
];

export const mockJobs: Job[] = [
    {
        id: 'job-1',
        title: 'Frontend Developer (React)',
        company: 'Innovate Inc.',
        location: 'Remote',
        matchScore: 92,
        requiredSkills: ['React', 'TypeScript', 'Tailwind CSS'],
        link: '#',
    },
    {
        id: 'job-2',
        title: 'Cloud Support Associate',
        company: 'CloudFlow',
        location: 'New York, NY',
        matchScore: 78,
        requiredSkills: ['AWS', 'Networking', 'Linux'],
        link: '#',
    },
    {
        id: 'job-3',
        title: 'Technical Project Manager',
        company: 'Solutions Corp.',
        location: 'San Francisco, CA',
        matchScore: 85,
        requiredSkills: ['Agile', 'Project Management', 'JIRA'],
        link: '#',
    },
     {
        id: 'job-4',
        title: 'UI/UX Designer',
        company: 'Creative Visions',
        location: 'Remote',
        matchScore: 65,
        requiredSkills: ['Figma', 'User Research', 'Prototyping'],
        link: '#',
    }
]
