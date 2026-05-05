export const MOCK_COURSES = [
  {
    id: 'course_1',
    title: 'Full-Stack React & Node.js Masterclass',
    description: 'Learn to build scalable full-stack applications from scratch using React, Node.js, Express, and MongoDB.',
    instructor: { name: 'Sarah Drasner', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    duration: '40 hours',
    level: 'Advanced',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    price: '$99.99',
    priceType: 'Paid',
    students_enrolled: 15420,
    studentCount: 15420,
    rating: 4.9,
    reviewCount: 3200,
    modules: 12,
    prerequisites: 'Basic JavaScript knowledge',
    start_date: '2026-04-01',
    end_date: '2026-06-01',
    status: 'Active',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-02-20T14:30:00Z'
  },
  {
    id: 'course_2',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design using Figma and industry best practices.',
    instructor: { name: 'Gary Simon', avatar: 'https://i.pravatar.cc/150?u=gary' },
    duration: '25 hours',
    level: 'Beginner',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    price: 'Free',
    priceType: 'Free',
    students_enrolled: 28900,
    studentCount: 28900,
    rating: 4.8,
    reviewCount: 5100,
    modules: 8,
    prerequisites: 'None',
    start_date: 'Available Now',
    end_date: 'Self-paced',
    status: 'Active',
    created_at: '2025-11-10T09:00:00Z',
    updated_at: '2026-03-01T11:15:00Z'
  },
  {
    id: 'course_3',
    title: 'Machine Learning with Python',
    description: 'A comprehensive guide to implementing machine learning algorithms using Python, Scikit-Learn, and TensorFlow.',
    instructor: { name: 'Andrew Ng', avatar: 'https://i.pravatar.cc/150?u=andrew' },
    duration: '55 hours',
    level: 'Intermediate',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    price: '$149.99',
    priceType: 'Paid',
    students_enrolled: 8400,
    studentCount: 8400,
    rating: 4.7,
    reviewCount: 1850,
    modules: 15,
    prerequisites: 'Python basics, Linear Algebra',
    start_date: '2026-05-15',
    end_date: '2026-08-15',
    status: 'Active',
    created_at: '2026-02-05T08:45:00Z',
    updated_at: '2026-03-05T16:20:00Z'
  },
  {
    id: 'course_4',
    title: 'Digital Marketing Mastery',
    description: 'Learn SEO, SEM, Social Media Marketing, and Google Analytics to grow any business online.',
    instructor: { name: 'Neil Patel', avatar: 'https://i.pravatar.cc/150?u=neil' },
    duration: '30 hours',
    level: 'Beginner',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
    price: '$49.99',
    priceType: 'Paid',
    students_enrolled: 12300,
    studentCount: 12300,
    rating: 4.6,
    reviewCount: 2400,
    modules: 10,
    prerequisites: 'None',
    start_date: 'Available Now',
    end_date: 'Self-paced',
    status: 'Draft',
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-07T09:30:00Z'
  },
  {
    id: 'course_5',
    title: 'Advanced Cloud Architecture (AWS)',
    description: 'Deep dive into AWS services, cloud architecture patterns, security, and deployment strategies.',
    instructor: { name: 'Kelsey Hightower', avatar: 'https://i.pravatar.cc/150?u=kelsey' },
    duration: '45 hours',
    level: 'Advanced',
    category: 'IT & Software',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    price: '$129.99',
    priceType: 'Paid',
    students_enrolled: 5600,
    studentCount: 5600,
    rating: 4.9,
    reviewCount: 980,
    modules: 14,
    prerequisites: 'Basic Cloud Knowledge',
    start_date: '2026-06-01',
    end_date: '2026-08-01',
    status: 'Active',
    created_at: '2025-12-20T14:00:00Z',
    updated_at: '2026-01-25T11:00:00Z'
  }
];

export const MOCK_PROJECTS = [
  {
    id: 'proj_1',
    title: 'Open Source AI Assistant',
    description: 'A privacy-first, locally run AI assistant built for developers. We are looking for contributors to help with the Rust backend and React frontend.',
    category: 'Open Source',
    author: 'DevCollect',
    publishedDate: '2026-02-25',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'
  },
  {
    id: 'proj_2',
    title: 'EcoTracker Mobile App',
    description: 'Tracking daily carbon footprints made easy. Currently in beta testing phase, seeking UX researchers and beta testers.',
    category: 'Mobile App',
    author: 'GreenTech Solutions',
    publishedDate: '2026-02-20',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80'
  }
];

export const MOCK_COMMUNITIES = [
  {
    id: 'c1',
    name: 'Tech Innovators Network',
    type: 'Organization',
    location: 'Global',
    activityLevel: 'High',
    memberCount: 1250,
    verified: true,
    description: 'A global network of technologists, founders, and developers building the next generation of software products.',
    tags: ['Technology', 'Startups', 'Networking'],
    avatar: 'https://ui-avatars.com/api/?name=Tech+Innovators&background=6366f1&color=fff'
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'The Future of Remote Work and Collaboration',
    excerpt: 'Explore how distributed teams are leveraging new tools and methodologies.',
    category: 'Future of Work',
    author: 'Sarah Jenkins',
    date: 'Feb 24, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1504983875-d3b163aba9e6?w=800&q=80'
  }
];

export const MOCK_JOBS = [
  {
    id: 'job_1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $150k',
    postedDate: '2026-03-01'
  }
];