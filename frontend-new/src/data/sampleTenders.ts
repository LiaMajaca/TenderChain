/**
 * SAMPLE DATA NOTICE
 * This dataset contains realistic sample tenders based on actual South African
 * government procurement types and departments. All tender IDs, wallet addresses,
 * and specific details are fictional and for demonstration purposes only.
 * 
 * In production, this would be replaced with:
 * - Real-time data from eTender Portal API
 * - Integration with National Treasury systems
 * - Live blockchain data from Solana program
 * 
 * Data reflects typical SA government procurement including:
 * - PPPFA compliance requirements
 * - BEE/BBBEE considerations
 * - CIDB registration for construction
 * - Provincial and municipal variations
 */

export interface Tender {
  id: string;
  title: string;
  description: string;
  department: string;
  province: string;
  municipality?: string;
  budget: number; // in ZAR
  status: 'Open' | 'Under Review' | 'Awarded' | 'Closed';
  createdAt: number; // Unix timestamp
  deadline: number; // Unix timestamp
  applicationCount: number;
  awardedTo?: string; // Wallet address
  category: string;
  requirements?: string[];
}

export interface Application {
  id: string;
  tenderId: string;
  applicantWallet: string;
  proposalIpfsHash: string;
  submittedAt: number; // Unix timestamp
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Rejected' | 'Awarded';
}

// Helper: make timestamps readable and valid
// Now ~ 2025-06-30 for reference; adjust as needed

export const SAMPLE_TENDERS: Tender[] = [
  {
    id: 'GP/2024/001',
    title: 'Johannesburg CBD Road Resurfacing',
    description: 'Resurfacing major CBD roads in Johannesburg over 30km, including line markings, signage and pedestrian crossings to improve safety.',
    department: 'Department of Transport (Gauteng)',
    province: 'Gauteng',
    municipality: 'City of Johannesburg Metropolitan Municipality',
    budget: 12450000,
    status: 'Open',
    createdAt: 1711324800,
    deadline: 1720112400,
    applicationCount: 6,
    category: 'Infrastructure',
    requirements: ['CIDB Level 7 required', 'Must comply with PPPFA regulations', 'BEE Level 2 preferred'],
  },
  {
    id: 'GP/2024/002',
    title: 'Medical Equipment for Chris Hani Baragwanath Hospital',
    description: 'Procurement of diagnostic and surgical equipment to upgrade trauma and maternity wards; includes installation and training.',
    department: 'Department of Health (Gauteng)',
    province: 'Gauteng',
    municipality: 'City of Johannesburg Metropolitan Municipality',
    budget: 3400000,
    status: 'Awarded',
    createdAt: 1708310400,
    deadline: 1712889600,
    applicationCount: 10,
    awardedTo: 'G7SYxNJf3kTDrwBhevSmKFAjDyKavCQ4BzQU89u5gwHf',
    category: 'Supplies',
    requirements: ['BEE Level 2 preferred', 'Public-sector hospital references required'],
  },
  {
    id: 'WC/2024/010',
    title: 'Bridge Rehabilitation – N1 Paarl',
    description: 'Structural repairs and resurfacing on the N1 bridge at Paarl, with drainage improvements and barrier replacements for safety.',
    department: 'Department of Transport (Western Cape)',
    province: 'Western Cape',
    municipality: 'Drakenstein Local Municipality',
    budget: 9200000,
    status: 'Open',
    createdAt: 1712467200,
    deadline: 1720917600,
    applicationCount: 5,
    category: 'Infrastructure',
    requirements: ['CIDB Level 7 required'],
  },
  {
    id: 'WC/2024/012',
    title: 'Upgrade of Philippi Wastewater Treatment Works',
    description: 'Expansion and modernization of wastewater treatment infrastructure in Philippi, Cape Town to improve water safety and resilience.',
    department: 'City of Cape Town Metropolitan Municipality',
    province: 'Western Cape',
    municipality: 'City of Cape Town Metropolitan Municipality',
    budget: 15300000,
    status: 'Awarded',
    createdAt: 1708675200,
    deadline: 1715376000,
    applicationCount: 13,
    awardedTo: '8hRmXH1oceXwCe6pEq5FrEk4cmJ8ArpUkhtHAuDMk2jw',
    category: 'Infrastructure',
    requirements: ['CIDB 8 or above', 'Municipal infrastructure experience'],
  },
  {
    id: 'KZN/2024/021',
    title: 'Catering Services for SAPS KwaMashu',
    description: '12-month contract for daily catering and canteen services for police personnel at KwaMashu SAPS.',
    department: 'South African Police Service (SAPS)',
    province: 'KwaZulu-Natal',
    municipality: 'eThekwini Metropolitan Municipality',
    budget: 320000,
    status: 'Awarded',
    createdAt: 1712625600,
    deadline: 1717915200,
    applicationCount: 5,
    awardedTo: 'GqgAbmaWth4yKt3qmAp66kTs7ztfNenuZ9kQXUFVGv2X',
    category: 'Services',
    requirements: ['Food safety certification required'],
  },
  {
    id: 'KZN/2024/020',
    title: 'Durban North Stormwater Rehabilitation',
    description: 'Rehabilitation of stormwater drainage in Durban North to reduce flood risk; includes culvert repair and channel lining.',
    department: 'eThekwini Metropolitan Municipality',
    province: 'KwaZulu-Natal',
    municipality: 'eThekwini Metropolitan Municipality',
    budget: 8000000,
    status: 'Under Review',
    createdAt: 1712284800,
    deadline: 1720214400,
    applicationCount: 3,
    category: 'Infrastructure',
    requirements: ['CIDB Level 6 required'],
  },
  {
    id: 'EC/2024/031',
    title: 'Police Vehicles – Fleet Expansion',
    description: 'Supply and delivery of 45 marked police vehicles (sedans and bakkies) for SAPS Eastern Cape; includes maintenance and spares kit.',
    department: 'South African Police Service (SAPS)',
    province: 'Eastern Cape',
    municipality: 'Nelson Mandela Bay Municipality',
    budget: 3720000,
    status: 'Awarded',
    createdAt: 1708765200,
    deadline: 1713525600,
    applicationCount: 14,
    awardedTo: 'Cby7DG7Y9wWdcLJhQua5kZG6z4QuTY6QA1cQPSNXSWk8',
    category: 'Supplies',
    requirements: ['SAPS Fleet accreditation required'],
  },
  {
    id: 'NW/2024/070',
    title: 'School Renovations – Mahikeng',
    description: 'Renovation of 3 schools in Mahikeng focusing on roofing, plumbing, and classroom upgrades, including accessibility improvements.',
    department: 'Department of Education (North West)',
    province: 'North West',
    municipality: 'Mahikeng Local Municipality',
    budget: 2150000,
    status: 'Open',
    createdAt: 1712784000,
    deadline: 1720728000,
    applicationCount: 4,
    category: 'Infrastructure',
    requirements: ['Site visit scheduled for 2024-06-25'],
  },
  {
    id: 'LP/2024/050',
    title: 'IT Equipment and Software – Limpopo Education',
    description: 'Procurement of desktops, laptops, antivirus and educational software for 24 rural schools across the province.',
    department: 'Department of Education (Limpopo)',
    province: 'Limpopo',
    municipality: 'Polokwane Local Municipality',
    budget: 980000,
    status: 'Closed',
    createdAt: 1711622400,
    deadline: 1717257600,
    applicationCount: 8,
    awardedTo: 'B7MfizdJkVy2Sb8HhXatDzMtGiATp6fcAvDSAKMyJkU7',
    category: 'Supplies',
    requirements: ['BEE Level 1 required'],
  },
  {
    id: 'WC/2024/013',
    title: 'Cleaning Services – Provincial Offices',
    description: 'Daily cleaning and periodic deep cleaning for Western Cape government office buildings for 12 months.',
    department: 'Department of Public Works',
    province: 'Western Cape',
    municipality: 'City of Cape Town Metropolitan Municipality',
    budget: 340000,
    status: 'Open',
    createdAt: 1714108800,
    deadline: 1720396800,
    applicationCount: 4,
    category: 'Services',
    requirements: [],
  },
];

export const SAMPLE_APPLICATIONS: Application[] = [
  {
    id: 'APP-001',
    tenderId: 'GP/2024/001',
    applicantWallet: 'F8gM93tJkt6yTzcE4HCe6JKYpgUxvaQ13YXiaZTdaTgLa',
    proposalIpfsHash: 'QmWVwjxrZoDrRuLyij3p1FJPuZcQkuLLJHs5Tu4zdt7hKY',
    submittedAt: 1716920000,
    status: 'Pending',
  },
  {
    id: 'APP-002',
    tenderId: 'GP/2024/001',
    applicantWallet: 'EDm53t8thbs6yjQMSJLxxjNZ2vRv8hc8vYfgh5AYZvtb',
    proposalIpfsHash: 'QmaRJV4JGcLzpU4BxKQFS8SNePJMXmKaxsNrsBADpDHf2u',
    submittedAt: 1717520000,
    status: 'Under Review',
  },
  {
    id: 'APP-003',
    tenderId: 'GP/2024/002',
    applicantWallet: '3xsi7vAmymirTWqLq7WTJzdAzZ3YAnTfJQdoELoLjW8W',
    proposalIpfsHash: 'Qmdkk3u9HG5WuzuMJ266kftNGoHvF4BQ5QJKrVtFNwbgVW',
    submittedAt: 1708810400,
    status: 'Awarded',
  },
  {
    id: 'APP-004',
    tenderId: 'WC/2024/012',
    applicantWallet: '7iGqoF8cXGdVNk8rGA6DZXAV2pB9ePLVwyrduBmqGGam',
    proposalIpfsHash: 'QmTa2fQ6PgFb6ZKBFhKQdpqWKBy7z8KEWosz5bqK5FhR5e',
    submittedAt: 1712390000,
    status: 'Awarded',
  },
  {
    id: 'APP-005',
    tenderId: 'KZN/2024/021',
    applicantWallet: 'HK9jfTys4wsx8ctTWQ2kZGzTQ5oArRYguUrtodAWm8iT',
    proposalIpfsHash: 'QmUZJH12ScqbFBePWxu9g3dEwwd5eqDeSPXkMxvJdBrT6L',
    submittedAt: 1716733400,
    status: 'Awarded',
  },
  {
    id: 'APP-006',
    tenderId: 'KZN/2024/020',
    applicantWallet: 'ArkA5vVCqcDbW65RUg8o9vDY18CAcmx3rT9e5kXj2WaV',
    proposalIpfsHash: 'QmavhFGBfDPe1yNnX9Wok8D6fKZ9RYwWTFn3Zrj1SvbfhB',
    submittedAt: 1716900000,
    status: 'Pending',
  },
  {
    id: 'APP-007',
    tenderId: 'EC/2024/031',
    applicantWallet: 'EtfNZbrVq9gZZHsJ56pviWTVXJCuQUGzxwcwj3PX1UzT',
    proposalIpfsHash: 'QmcXu7HxksUTVAWMifsNgEMCyd9MNHp9pda9tga36XQobZ',
    submittedAt: 1714893200,
    status: 'Pending',
  },
  {
    id: 'APP-008',
    tenderId: 'NW/2024/070',
    applicantWallet: 'Bz7p5A1beqdghfg7mNdwKzcTiTfPK2o56CJJVQoVZzTZ',
    proposalIpfsHash: 'QmaViEu6tnQgAqEWHzbpMpW2AS4b7WE1aLh1su3wUATwud',
    submittedAt: 1718900000,
    status: 'Pending',
  },
  {
    id: 'APP-009',
    tenderId: 'WC/2024/010',
    applicantWallet: '5aVdugAD6qgxcB1mEdXswdwAzTjDo3Jf46KvZZV6wQ1H',
    proposalIpfsHash: 'Qmf3nP9A9Kxu5VfFYrGCRdebAYwcHQxRduDSPVfNSx9fdu',
    submittedAt: 1718600000,
    status: 'Under Review',
  },
  {
    id: 'APP-010',
    tenderId: 'LP/2024/050',
    applicantWallet: 'GrVDmZHxB6MJAQLbwtBtZviMRzZ8LTWTARtiQuHpbiSc',
    proposalIpfsHash: 'QmY7m93Wtfy6o8MWVJm1oet4M9j9T3JgkGqg1k8fKAS3xQ',
    submittedAt: 1717000000,
    status: 'Rejected',
  },
];
