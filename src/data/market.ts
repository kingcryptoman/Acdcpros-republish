export interface Affiliate {
  id: string;
  name: string;
  logo: string;
  url: string;
  color: string; // Tailwind color class prefix (e.g., 'orange', 'blue')
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  desc: string;
  type: 'physical' | 'digital';
  affiliateId?: string;
  affiliateUrl?: string;
  downloadUrl?: string;
  hasTutorial: boolean;
}

export const AFFILIATES: Affiliate[] = [
  {
    id: 'homedepot',
    name: 'Home Depot',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/TheHomeDepot.svg',
    url: 'https://www.homedepot.com',
    color: 'orange',
  },
  {
    id: 'lowes',
    name: 'Lowe\'s',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Lowe%27s_logo_2008.svg',
    url: 'https://www.lowes.com',
    color: 'blue',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "ACDC-X1 Smart Multimeter",
    price: 249,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    desc: "Precision-engineered diagnostic tool with AI-powered fault detection.",
    type: 'physical',
    affiliateId: 'homedepot',
    affiliateUrl: "https://www.homedepot.com/s/multimeter",
    hasTutorial: true
  },
  {
    id: "02",
    name: "Elite Disaster Relief Kit",
    price: 899,
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800",
    desc: "Complete sensor suite for water mitigation, cleanup, and structural stabilization.",
    type: 'physical',
    affiliateId: 'lowes',
    affiliateUrl: "https://www.lowes.com/search?searchTerm=disaster+relief+tools",
    hasTutorial: true
  },
  {
    id: "03",
    name: "Pro-Series Drill Set",
    price: 450,
    category: "Pros & Handyman",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
    desc: "High-torque, brushless motor technology for relentless performance.",
    type: 'physical',
    affiliateId: 'homedepot',
    affiliateUrl: "https://www.homedepot.com/s/drill+set",
    hasTutorial: false
  },
  {
    id: "04",
    name: "Smart Plumbing Camera",
    price: 1200,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    desc: "4K resolution with real-time AI pipe analysis and obstruction detection.",
    type: 'physical',
    affiliateId: 'lowes',
    affiliateUrl: "https://www.lowes.com/search?searchTerm=plumbing+camera",
    hasTutorial: true
  },
  {
    id: "05",
    name: "Elite Career Strategy Guide",
    price: 49,
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800",
    desc: "The definitive roadmap for scaling your career in professional services.",
    type: 'digital',
    downloadUrl: "#",
    hasTutorial: false
  },
  {
    id: "06",
    name: "Water Mitigation Blueprint",
    price: 129,
    category: "Emergency",
    image: "https://images.unsplash.com/photo-1503387762-592dec5832f2?auto=format&fit=crop&q=80&w=800",
    desc: "Comprehensive digital blueprints for high-efficiency water mitigation and disaster cleanup.",
    type: 'digital',
    downloadUrl: "#",
    hasTutorial: true
  },
  {
    id: "07",
    name: "DIY: Master Bathroom Remodel",
    price: 199,
    category: "Step-by-Step",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    desc: "Complete elite guide to a full bathroom renovation from demolition to final tile.",
    type: 'digital',
    downloadUrl: "#",
    hasTutorial: true
  },
  {
    id: "08",
    name: "DIY: Smart Home Integration",
    price: 149,
    category: "Step-by-Step",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    desc: "Strategic blueprint for wiring and configuring a fully automated smart home ecosystem.",
    type: 'digital',
    downloadUrl: "#",
    hasTutorial: true
  },
  {
    id: "09",
    name: "DIY: Emergency Roof Repair",
    price: 89,
    category: "Step-by-Step",
    image: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&q=80&w=800",
    desc: "Immediate action guide for stabilizing and repairing roof damage during disaster events.",
    type: 'digital',
    downloadUrl: "#",
    hasTutorial: true
  }
];
