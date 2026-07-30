import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import {
  Search,
  Globe,
  Filter,
  ChevronDown,
  ChevronLeft,
  Info,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Calendar,
  Layers,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

// Data Types
export interface RegistryRegionData {
  id: string;
  name: string;
  regionCategory: string; // e.g. 'ASIA', 'EUROPE', 'NORTHERN AMERICA', etc.
  activeProjects: number;
  totalReductionMtCO2: number;
  annualEstReductionMtCO2: number;
  sectorBreakdown: { label: string; percentage: number; color: string }[];
  registryBreakdown: { name: string; percentage: number; color: string }[];
  countries?: {
    id: string;
    name: string;
    activeProjects: number;
    totalReductionMtCO2: number;
    annualEstReductionMtCO2: number;
    sectorBreakdown: { label: string; percentage: number; color: string }[];
    registryBreakdown: { name: string; percentage: number; color: string }[];
  }[];
}

// Global World Stats
const WORLD_STATS = {
  activeProjects: 16440,
  totalReductionMtCO2: 3723,
  annualEstReductionMtCO2: 2357,
  issuedUnitsBillion: 3.72,
  retiredUnitsMillion: 819,
  sectorBreakdown: [
    { label: 'Energy Demand', percentage: 27.78, color: '#059669' },
    { label: 'Agriculture; forestry and fishing', percentage: 18.36, color: '#10B981' },
    { label: 'Energy industries (renewable)', percentage: 16.96, color: '#34D399' },
    { label: 'Waste handling and disposal', percentage: 14.20, color: '#6EE7B7' },
    { label: 'Others', percentage: 22.70, color: '#9CA3AF' },
  ],
  registryBreakdown: [
    { name: 'Verra', percentage: 55.83, color: '#10B981' },
    { name: 'Gold Standard', percentage: 27.50, color: '#059669' },
    { name: 'CDM Registry', percentage: 16.67, color: '#34D399' },
  ],
};

// Detailed Regional & Country Data
const REGIONS_DATABASE: RegistryRegionData[] = [
  {
    id: 'central_asia',
    name: 'Central Asia',
    regionCategory: 'ASIA',
    activeProjects: 420,
    totalReductionMtCO2: 112,
    annualEstReductionMtCO2: 78,
    sectorBreakdown: [
      { label: 'Energy industries (renewable)', percentage: 42.5, color: '#059669' },
      { label: 'Energy Demand', percentage: 31.2, color: '#10B981' },
      { label: 'Waste handling', percentage: 15.1, color: '#34D399' },
      { label: 'Agriculture & Forestry', percentage: 11.2, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Verra', percentage: 62.0, color: '#10B981' },
      { name: 'Gold Standard', percentage: 25.0, color: '#059669' },
      { name: 'CDM Registry', percentage: 13.0, color: '#34D399' },
    ],
    countries: [
      {
        id: 'kazakhstan',
        name: 'Kazakhstan',
        activeProjects: 240,
        totalReductionMtCO2: 68,
        annualEstReductionMtCO2: 45,
        sectorBreakdown: [
          { label: 'Energy Efficiency', percentage: 48.2, color: '#059669' },
          { label: 'Renewables', percentage: 35.8, color: '#10B981' },
          { label: 'Others', percentage: 16.0, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 71.5, color: '#10B981' },
          { name: 'Gold Standard', percentage: 28.5, color: '#059669' },
        ],
      },
      {
        id: 'uzbekistan',
        name: 'Uzbekistan',
        activeProjects: 180,
        totalReductionMtCO2: 44,
        annualEstReductionMtCO2: 33,
        sectorBreakdown: [
          { label: 'Solar & Wind', percentage: 52.0, color: '#059669' },
          { label: 'Agriculture', percentage: 30.0, color: '#10B981' },
          { label: 'Waste', percentage: 18.0, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 58.0, color: '#10B981' },
          { name: 'CDM Registry', percentage: 42.0, color: '#34D399' },
        ],
      },
    ],
  },
  {
    id: 'southern_asia',
    name: 'Southern Asia',
    regionCategory: 'ASIA',
    activeProjects: 4620,
    totalReductionMtCO2: 780,
    annualEstReductionMtCO2: 420,
    sectorBreakdown: [
      { label: 'Energy Demand', percentage: 32.58, color: '#059669' },
      { label: 'Energy industries (renewable)', percentage: 23.90, color: '#10B981' },
      { label: 'Energy Industries (non-renewable/efficiency)', percentage: 16.98, color: '#34D399' },
      { label: 'Others', percentage: 26.54, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Verra', percentage: 47.49, color: '#10B981' },
      { name: 'Gold Standard', percentage: 26.63, color: '#059669' },
      { name: 'CDM Registry', percentage: 25.88, color: '#34D399' },
    ],
    countries: [
      {
        id: 'india',
        name: 'India',
        activeProjects: 3895,
        totalReductionMtCO2: 633,
        annualEstReductionMtCO2: 351,
        sectorBreakdown: [
          { label: 'Energy Demand', percentage: 32.58, color: '#059669' },
          { label: 'Energy industries (renewable)', percentage: 23.90, color: '#10B981' },
          { label: 'Energy Industries (non-renewable/efficiency)', percentage: 16.98, color: '#34D399' },
          { label: 'Others', percentage: 26.54, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 47.49, color: '#10B981' },
          { name: 'Gold Standard', percentage: 26.63, color: '#059669' },
          { name: 'CDM Registry', percentage: 25.88, color: '#34D399' },
        ],
      },
      {
        id: 'pakistan',
        name: 'Pakistan',
        activeProjects: 410,
        totalReductionMtCO2: 82,
        annualEstReductionMtCO2: 41,
        sectorBreakdown: [
          { label: 'Hydro & Solar', percentage: 41.0, color: '#059669' },
          { label: 'Forestry & Mangroves', percentage: 38.0, color: '#10B981' },
          { label: 'Waste', percentage: 21.0, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 52.0, color: '#10B981' },
          { name: 'Gold Standard', percentage: 48.0, color: '#059669' },
        ],
      },
    ],
  },
  {
    id: 'eastern_asia',
    name: 'Eastern Asia',
    regionCategory: 'ASIA',
    activeProjects: 3150,
    totalReductionMtCO2: 890,
    annualEstReductionMtCO2: 580,
    sectorBreakdown: [
      { label: 'Solar & Wind Generation', percentage: 45.2, color: '#059669' },
      { label: 'Methane Capture & Industrial', percentage: 28.6, color: '#10B981' },
      { label: 'Afforestation', percentage: 18.2, color: '#34D399' },
      { label: 'Others', percentage: 8.0, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Verra', percentage: 51.2, color: '#10B981' },
      { name: 'CDM Registry', percentage: 32.8, color: '#34D399' },
      { name: 'Gold Standard', percentage: 16.0, color: '#059669' },
    ],
    countries: [
      {
        id: 'china',
        name: 'China',
        activeProjects: 2840,
        totalReductionMtCO2: 810,
        annualEstReductionMtCO2: 520,
        sectorBreakdown: [
          { label: 'Renewable Power', percentage: 48.0, color: '#059669' },
          { label: 'Industrial Methane', percentage: 26.5, color: '#10B981' },
          { label: 'Forestry', percentage: 17.5, color: '#34D399' },
          { label: 'Others', percentage: 8.0, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 53.0, color: '#10B981' },
          { name: 'CDM Registry', percentage: 31.0, color: '#34D399' },
          { name: 'Gold Standard', percentage: 16.0, color: '#059669' },
        ],
      },
    ],
  },
  {
    id: 'eastern_europe',
    name: 'Eastern Europe',
    regionCategory: 'EUROPE',
    activeProjects: 185,
    totalReductionMtCO2: 42,
    annualEstReductionMtCO2: 24,
    sectorBreakdown: [
      { label: 'Agriculture; forestry and fishing', percentage: 49.50, color: '#059669' },
      { label: 'Energy Demand', percentage: 11.63, color: '#10B981' },
      { label: 'Afforestation', percentage: 8.31, color: '#34D399' },
      { label: 'Others', percentage: 30.56, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Verra', percentage: 55.83, color: '#10B981' },
      { name: 'Gold Standard', percentage: 27.50, color: '#059669' },
      { name: 'CDM Registry', percentage: 16.67, color: '#34D399' },
    ],
    countries: [
      {
        id: 'russian_federation',
        name: 'Russian Federation',
        activeProjects: 35,
        totalReductionMtCO2: 6,
        annualEstReductionMtCO2: 4,
        sectorBreakdown: [
          { label: 'Agriculture; forestry and fishing', percentage: 49.50, color: '#059669' },
          { label: 'Energy Demand', percentage: 11.63, color: '#10B981' },
          { label: 'Afforestation', percentage: 8.31, color: '#34D399' },
          { label: 'Others', percentage: 30.56, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 55.83, color: '#10B981' },
          { name: 'Gold Standard', percentage: 27.50, color: '#059669' },
          { name: 'CDM Registry', percentage: 16.67, color: '#34D399' },
        ],
      },
    ],
  },
  {
    id: 'northern_america',
    name: 'Northern America',
    regionCategory: 'NORTHERN AMERICA',
    activeProjects: 2840,
    totalReductionMtCO2: 640,
    annualEstReductionMtCO2: 340,
    sectorBreakdown: [
      { label: 'Forestry & Land Use', percentage: 41.2, color: '#059669' },
      { label: 'Methane Capture', percentage: 28.4, color: '#10B981' },
      { label: 'Renewable Energy', percentage: 18.1, color: '#34D399' },
      { label: 'Industrial Efficiency', percentage: 12.3, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'American Carbon Registry', percentage: 42.1, color: '#10B981' },
      { name: 'CAR', percentage: 35.4, color: '#059669' },
      { name: 'Verra', percentage: 22.5, color: '#34D399' },
    ],
    countries: [
      {
        id: 'united_states',
        name: 'United States',
        activeProjects: 2450,
        totalReductionMtCO2: 580,
        annualEstReductionMtCO2: 310,
        sectorBreakdown: [
          { label: 'Forestry & Land Use', percentage: 41.2, color: '#059669' },
          { label: 'Methane Capture', percentage: 28.4, color: '#10B981' },
          { label: 'Renewable Energy', percentage: 18.1, color: '#34D399' },
          { label: 'Industrial Efficiency', percentage: 12.3, color: '#9CA3AF' },
        ],
        registryBreakdown: [
          { name: 'American Carbon Registry', percentage: 42.1, color: '#10B981' },
          { name: 'CAR', percentage: 35.4, color: '#059669' },
          { name: 'Verra', percentage: 22.5, color: '#34D399' },
        ],
      },
    ],
  },
  {
    id: 'latin_america',
    name: 'Latin America & Caribbean',
    regionCategory: 'LATIN AMERICA AND THE CARIBBEAN',
    activeProjects: 2150,
    totalReductionMtCO2: 520,
    annualEstReductionMtCO2: 290,
    sectorBreakdown: [
      { label: 'REDD+ & Rainforest Protection', percentage: 58.4, color: '#059669' },
      { label: 'Renewable Energy', percentage: 22.1, color: '#10B981' },
      { label: 'Agriculture', percentage: 12.3, color: '#34D399' },
      { label: 'Waste handling', percentage: 7.2, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Verra', percentage: 68.2, color: '#10B981' },
      { name: 'Gold Standard', percentage: 21.4, color: '#059669' },
      { name: 'BioCarbon Registry', percentage: 10.4, color: '#34D399' },
    ],
    countries: [
      {
        id: 'brazil',
        name: 'Brazil',
        activeProjects: 1420,
        totalReductionMtCO2: 380,
        annualEstReductionMtCO2: 210,
        sectorBreakdown: [
          { label: 'Amazon REDD+ Forestry', percentage: 64.0, color: '#059669' },
          { label: 'Bioenergy & Wind', percentage: 20.0, color: '#10B981' },
          { label: 'Agriculture', percentage: 16.0, color: '#34D399' },
        ],
        registryBreakdown: [
          { name: 'Verra', percentage: 72.0, color: '#10B981' },
          { name: 'Gold Standard', percentage: 18.0, color: '#059669' },
          { name: 'BioCarbon Registry', percentage: 10.0, color: '#34D399' },
        ],
      },
      {
        id: 'colombia',
        name: 'Colombia',
        activeProjects: 380,
        totalReductionMtCO2: 75,
        annualEstReductionMtCO2: 42,
        sectorBreakdown: [
          { label: 'Afforestation', percentage: 51.0, color: '#059669' },
          { label: 'BioCarbon Projects', percentage: 32.0, color: '#10B981' },
          { label: 'Energy Demand', percentage: 17.0, color: '#34D399' },
        ],
        registryBreakdown: [
          { name: 'BioCarbon Registry', percentage: 54.0, color: '#10B981' },
          { name: 'Verra', percentage: 36.0, color: '#059669' },
          { name: 'Gold Standard', percentage: 10.0, color: '#34D399' },
        ],
      },
    ],
  },
  {
    id: 'africa',
    name: 'Africa',
    regionCategory: 'AFRICA',
    activeProjects: 1620,
    totalReductionMtCO2: 380,
    annualEstReductionMtCO2: 210,
    sectorBreakdown: [
      { label: 'Clean Cookstoves & Water', percentage: 45.2, color: '#059669' },
      { label: 'Agroforestry & Soil Carbon', percentage: 28.1, color: '#10B981' },
      { label: 'Solar & Off-grid Power', percentage: 18.4, color: '#34D399' },
      { label: 'Others', percentage: 8.3, color: '#9CA3AF' },
    ],
    registryBreakdown: [
      { name: 'Gold Standard', percentage: 52.3, color: '#10B981' },
      { name: 'Verra', percentage: 38.1, color: '#059669' },
      { name: 'Plan Vivo', percentage: 9.6, color: '#34D399' },
    ],
    countries: [
      {
        id: 'kenya',
        name: 'Kenya',
        activeProjects: 580,
        totalReductionMtCO2: 140,
        annualEstReductionMtCO2: 85,
        sectorBreakdown: [
          { label: 'Household Energy', percentage: 48.0, color: '#059669' },
          { label: 'Geothermal & Solar', percentage: 30.0, color: '#10B981' },
          { label: 'Forestry', percentage: 22.0, color: '#34D399' },
        ],
        registryBreakdown: [
          { name: 'Gold Standard', percentage: 58.0, color: '#10B981' },
          { name: 'Verra', percentage: 34.0, color: '#059669' },
          { name: 'Plan Vivo', percentage: 8.0, color: '#34D399' },
        ],
      },
    ],
  },
];

// World Atlas TopoJSON
const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Mapping regions and countries to coordinates for zooming
const MAP_CONFIG: Record<string, { center: [number, number], zoom: number }> = {
  world: { center: [0, 15], zoom: 1 },
  northern_america: { center: [-95, 45], zoom: 2.2 },
  latin_america: { center: [-65, -15], zoom: 2.2 },
  eastern_europe: { center: [75, 60], zoom: 1.8 },
  central_asia: { center: [65, 45], zoom: 3.5 },
  southern_asia: { center: [80, 20], zoom: 4 },
  eastern_asia: { center: [105, 35], zoom: 2.5 },
  africa: { center: [20, 0], zoom: 2.2 },
};

// Map topojson name matching
const COUNTRY_NAME_MAP: Record<string, string> = {
  'United States': 'United States of America',
  'Russian Federation': 'Russia',
};

const WORLD_MAP_DATA = REGIONS_DATABASE.flatMap(r => r.countries?.map(c => ({
  id: c.id,
  name: c.name,
  topoName: COUNTRY_NAME_MAP[c.name] || c.name,
  regionId: r.id,
  regionName: r.name,
  activeProjects: c.activeProjects
})) || []);

export const CarbonRegistryExplorer: React.FC = () => {
  // Navigation & Filter States
  const [viewMode, setViewMode] = useState<'project' | 'unit'>('project');
  const [selectedRegistry, setSelectedRegistry] = useState<string>('All');
  const [selectedMethodology, setSelectedMethodology] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Map Selection
  const [selectedRegionId, setSelectedRegionId] = useState<string>('world');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [hoveredCountryId, setHoveredCountryId] = useState<string>('');
  const [timeRange, setTimeRange] = useState<'max' | '12m' | '6m' | '1m'>('max');

  // Compute Active Selection Details
  const activeRegion = REGIONS_DATABASE.find((r) => r.id === selectedRegionId);
  const activeCountry = activeRegion?.countries?.find((c) => c.id === selectedCountryId);

  // Compute Active Metrics
  const activeMetrics = activeCountry
    ? {
        name: activeCountry.name,
        activeProjects: activeCountry.activeProjects,
        totalReductionMtCO2: activeCountry.totalReductionMtCO2,
        annualEstReductionMtCO2: activeCountry.annualEstReductionMtCO2,
        sectorBreakdown: activeCountry.sectorBreakdown,
        registryBreakdown: activeCountry.registryBreakdown,
      }
    : activeRegion
    ? {
        name: activeRegion.name,
        activeProjects: activeRegion.activeProjects,
        totalReductionMtCO2: activeRegion.totalReductionMtCO2,
        annualEstReductionMtCO2: activeRegion.annualEstReductionMtCO2,
        sectorBreakdown: activeRegion.sectorBreakdown,
        registryBreakdown: activeRegion.registryBreakdown,
      }
    : {
        name: 'World',
        activeProjects: WORLD_STATS.activeProjects,
        totalReductionMtCO2: WORLD_STATS.totalReductionMtCO2,
        annualEstReductionMtCO2: WORLD_STATS.annualEstReductionMtCO2,
        sectorBreakdown: WORLD_STATS.sectorBreakdown,
        registryBreakdown: WORLD_STATS.registryBreakdown,
      };

  // Reset filter back to world
  const handleResetToWorld = () => {
    setSelectedRegionId('world');
    setSelectedCountryId('');
  };

  const handleBackToRegion = () => {
    setSelectedCountryId('');
  };

  return (
    <div className="space-y-6 font-sans text-slate-900">
      
      {/* CAD Trust Top View Toggle Header */}
      <div className="flex items-center justify-center space-x-6 pb-2">
        <button
          onClick={() => setViewMode('project')}
          className={`flex items-center space-x-2 text-sm font-bold transition cursor-pointer ${
            viewMode === 'project' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${viewMode === 'project' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          <span>Project View</span>
        </button>

        <button
          onClick={() => setViewMode('unit')}
          className={`flex items-center space-x-2 text-sm font-bold transition cursor-pointer ${
            viewMode === 'unit' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${viewMode === 'unit' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          <span>Unit View</span>
        </button>
      </div>

      {/* FLOATING WHITE SHADOW FILTER BAR */}
      <div className="bg-transparent space-y-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between">
          
          {/* Registry Dropdown */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Registry</label>
            <select
              value={selectedRegistry}
              onChange={(e) => setSelectedRegistry(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Registries</option>
              <option value="Verra">Verra (VCS)</option>
              <option value="Gold Standard">Gold Standard</option>
              <option value="CDM Registry">CDM Registry</option>
              <option value="BioCarbon">BioCarbon Registry</option>
              <option value="ACR">American Carbon Registry</option>
              <option value="CAR">Climate Action Reserve</option>
            </select>
          </div>

          {/* Methodology Dropdown */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Methodology</label>
            <select
              value={selectedMethodology}
              onChange={(e) => setSelectedMethodology(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Methodologies</option>
              <option value="Energy Demand">Energy Demand Efficiency</option>
              <option value="Afforestation">Afforestation & REDD+</option>
              <option value="Solar PV">Solar & Wind Power</option>
              <option value="Methane">Methane Landfill Gas</option>
              <option value="Cookstoves">Clean Cookstoves</option>
            </select>
          </div>

          {/* Sector Dropdown */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Sector</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Sectors</option>
              <option value="Energy Demand">Energy Demand</option>
              <option value="Forestry">Agriculture; forestry and fishing</option>
              <option value="Renewables">Energy industries (renewable)</option>
              <option value="Waste">Waste handling & disposal</option>
            </select>
          </div>

          {/* Country Dropdown */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Country</label>
            <select
              value={selectedCountryId}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCountryId(val);
                if (val) {
                  // find corresponding region
                  const foundReg = REGIONS_DATABASE.find((r) => r.countries?.some((c) => c.id === val));
                  if (foundReg) setSelectedRegionId(foundReg.id);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="">All Countries</option>
              <option value="india">India</option>
              <option value="russian_federation">Russian Federation</option>
              <option value="united_states">United States</option>
              <option value="brazil">Brazil</option>
              <option value="china">China</option>
              <option value="kazakhstan">Kazakhstan</option>
              <option value="uzbekistan">Uzbekistan</option>
              <option value="colombia">Colombia</option>
              <option value="kenya">Kenya</option>
            </select>
          </div>

          {/* Crediting Period */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Crediting Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Periods</option>
              <option value="2020-2026">2020 – 2026</option>
              <option value="2015-2020">2015 – 2020</option>
              <option value="2010-2015">2010 – 2015</option>
            </select>
          </div>

          {/* Green Search Action Button */}
          <div className="pt-4 sm:pt-5">
            <button
              onClick={() => {}}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 shadow-sm"
            >
              <span>Search</span>
              <Search className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Search by Keywords input bar */}
        <div className="pt-1 flex items-center justify-center border-t border-slate-100">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search carbon projects by keywords, ISIN, or registry ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

      </div>

      {/* UNIT VIEW: HISTORICAL ISSUED & RETIRED GRAPH CARD */}
      {viewMode === 'unit' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-slate-900 border-r border-slate-200 pr-3">World</span>
              
              {/* Region Selector */}
              <select
                value={selectedRegionId}
                onChange={(e) => {
                  setSelectedRegionId(e.target.value);
                  setSelectedCountryId('');
                }}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer"
              >
                <option value="world">Select region</option>
                {REGIONS_DATABASE.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* Time Filter Pill buttons */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full text-xs font-bold">
              {(['max', '12m', '6m', '1m'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-full capitalize transition cursor-pointer ${
                    timeRange === t ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            
            {/* Big Stats Column */}
            <div className="space-y-6 lg:border-r border-slate-100 pr-6">
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-500 tracking-tight">
                  {WORLD_STATS.issuedUnitsBillion} <span className="text-2xl font-bold">B</span>
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">Issued Units</p>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 tracking-tight">
                  {WORLD_STATS.retiredUnitsMillion} <span className="text-xl font-bold">MM</span>
                </p>
                <p className="text-sm font-bold text-slate-700 mt-1">Retired Units</p>
              </div>
            </div>

            {/* Time Series SVG Line Chart */}
            <div className="lg:col-span-3 h-64 relative bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
              
              {/* Floating Tooltip Mock */}
              <div className="absolute top-4 left-1/3 bg-slate-900 text-white text-[11px] font-mono px-3 py-1 rounded-lg shadow-lg flex items-center space-x-2 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>x: 2006-09-01, y: 150M</span>
              </div>

              {/* Grid Lines */}
              <div className="w-full h-full flex flex-col justify-between absolute inset-0 p-6 pointer-events-none opacity-20">
                <div className="border-b border-slate-400 border-dashed w-full" />
                <div className="border-b border-slate-400 border-dashed w-full" />
                <div className="border-b border-slate-400 border-dashed w-full" />
                <div className="border-b border-slate-400 border-dashed w-full" />
              </div>

              {/* SVG Line Chart Path */}
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="chartGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M 10 130 Q 50 120 80 110 T 130 90 T 170 30 L 180 10 L 190 60 L 200 25 L 210 80 T 260 90 L 280 40 L 300 95 T 350 70 L 380 120 T 430 85 L 460 110 L 490 60"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M 10 130 Q 50 120 80 110 T 130 90 T 170 30 L 180 10 L 190 60 L 200 25 L 210 80 T 260 90 L 280 40 L 300 95 T 350 70 L 380 120 T 430 85 L 460 110 L 490 60 L 490 140 L 10 140 Z"
                  fill="url(#chartGreenGrad)"
                />

                {/* Key Points */}
                <circle cx="180" cy="10" r="4" fill="#10B981" className="animate-ping" />
                <circle cx="180" cy="10" r="4" fill="#10B981" />
                <circle cx="200" cy="25" r="3" fill="#10B981" />
                <circle cx="280" cy="40" r="3" fill="#10B981" />
                <circle cx="490" cy="60" r="3.5" fill="#10B981" />
              </svg>

              {/* X Axis Years */}
              <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 pt-2 border-t border-slate-200">
                <span>Jan 2002</span>
                <span>Jan 2006</span>
                <span>Jan 2010</span>
                <span>Jan 2014</span>
                <span>Jan 2018</span>
                <span>Jan 2022</span>
                <span>Jan 2026</span>
              </div>
            </div>

          </div>

          <div className="text-right text-[10px] text-slate-400 font-mono">
            Data represented as of {new Date().toLocaleDateString('en-US')} CAD Trust Protocol
          </div>
        </div>
      )}

      {/* PROJECT VIEW: DOTTED MATRIX MAP & REGIONAL STATS CARD */}
      <div className="space-y-6">
        
        {/* Card Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          
          <div className="flex items-center space-x-3">
            {/* Back Button if Country or Region is drilled in */}
            {hoveredCountryId ? (
              <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                {WORLD_MAP_DATA.find((d) => d.id === hoveredCountryId)?.name || 'Region'}
              </span>
            ) : selectedCountryId ? (
              <button
                onClick={handleBackToRegion}
                className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{activeRegion?.name || 'Region'}</span>
              </button>
            ) : selectedRegionId !== 'world' ? (
              <button
                onClick={handleResetToWorld}
                className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>World</span>
              </button>
            ) : (
              <span className="text-sm font-extrabold text-slate-900">Region</span>
            )}

            {/* Region / Country Hierarchical Dropdown */}
            <select
              value={selectedCountryId || selectedRegionId}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'world') {
                  handleResetToWorld();
                } else if (REGIONS_DATABASE.some((r) => r.id === val)) {
                  setSelectedRegionId(val);
                  setSelectedCountryId('');
                } else {
                  // Country selected
                  const parentReg = REGIONS_DATABASE.find((r) => r.countries?.some((c) => c.id === val));
                  if (parentReg) {
                    setSelectedRegionId(parentReg.id);
                    setSelectedCountryId(val);
                  }
                }
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-emerald-500 max-w-xs"
            >
              <option value="world">Select region / World</option>

              {REGIONS_DATABASE.map((reg) => (
                <optgroup key={reg.id} label={reg.regionCategory + ' — ' + reg.name}>
                  <option value={reg.id}>{reg.name} (Region)</option>
                  {reg.countries?.map((c) => (
                    <option key={c.id} value={c.id}>
                      &nbsp;&nbsp;↳ {c.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Time Filter Controls */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-full text-xs font-bold">
            {(['max', '12m', '6m', '1m'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`px-3 py-1 rounded-full capitalize transition cursor-pointer ${
                  timeRange === t ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* MAP & METRICS CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 8 COLUMNS: INTERACTIVE DOTTED WORLD MATRIX MAP */}
          <div className="lg:col-span-8 relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-center items-center p-2">
            
            <div className="w-full h-[450px] relative flex items-center justify-center overflow-hidden py-4 rounded-xl">
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }} style={{ width: "100%", height: "100%" }}>
                <ZoomableGroup
                  center={MAP_CONFIG[selectedRegionId]?.center || MAP_CONFIG.world.center}
                  zoom={MAP_CONFIG[selectedRegionId]?.zoom || MAP_CONFIG.world.zoom}
                  className="transition-all duration-700 ease-in-out"
                >
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const geoName = geo.properties.name;
                        const matchData = WORLD_MAP_DATA.find((d) => d.topoName === geoName);
                        
                        const isHovered = hoveredCountryId === matchData?.id;
                        const isSelected = selectedCountryId === matchData?.id || (selectedRegionId !== 'world' && selectedRegionId === matchData?.regionId);

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => {
                              if (matchData) {
                                setHoveredCountryId(matchData.id);
                              }
                            }}
                            onMouseLeave={() => {
                              setHoveredCountryId('');
                            }}
                            onClick={() => {
                              if (matchData) {
                                setSelectedRegionId(matchData.regionId);
                                setSelectedCountryId(matchData.id);
                              } else {
                                setSelectedRegionId('world');
                                setSelectedCountryId('');
                              }
                            }}
                            style={{
                              default: {
                                fill: isSelected ? "#10B981" : matchData ? "#A7F3D0" : "#F1F5F9",
                                stroke: "#CBD5E1",
                                strokeWidth: 0.5,
                                outline: "none",
                                transition: "all 0.3s ease",
                              },
                              hover: {
                                fill: "#059669",
                                stroke: "#10B981",
                                strokeWidth: 1,
                                outline: "none",
                                cursor: "pointer",
                                filter: "drop-shadow(0px 0px 4px rgba(16,185,129,0.5))",
                              },
                              pressed: {
                                fill: "#047857",
                                outline: "none",
                              },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Map Legend / Reset button */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
                  <span>Landmass</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-xs" />
                  <span>Active Registry Assets (Glow)</span>
                </span>
              </div>

              {(selectedRegionId !== 'world' || selectedCountryId) && (
                <button
                  onClick={handleResetToWorld}
                  className="text-emerald-600 font-bold hover:underline cursor-pointer"
                >
                  Reset Map View
                </button>
              )}
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: REGISTRY & SECTOR METRICS PANEL */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Active Projects Big Metric */}
            <div className="space-y-1">
              <p className="text-4xl font-black text-emerald-500 tracking-tight">
                {activeMetrics.activeProjects.toLocaleString('en-US')}
              </p>
              <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Active Projects {activeMetrics.name !== 'World' ? `in ${activeMetrics.name}` : ''}
              </p>
            </div>

            <div className="border-t border-slate-200/80 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-black text-emerald-600">
                  {activeMetrics.totalReductionMtCO2.toLocaleString('en-US')}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">MtCO2 Total Reduction</p>
              </div>

              <div>
                <p className="text-2xl font-black text-emerald-600">
                  {activeMetrics.annualEstReductionMtCO2.toLocaleString('en-US')}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">MtCO2 Annual Est. Reduction</p>
              </div>
            </div>

            {/* Sector Donut Chart Breakdown */}
            <div className="border-t border-slate-200/80 pt-4 space-y-3">
              <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Sector</p>
              
              <div className="flex items-center gap-4">
                {/* SVG Donut Chart */}
                <div className="w-20 h-20 shrink-0 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                    {activeMetrics.sectorBreakdown.reduce(
                      (acc, sec, idx) => {
                        const dasharray = `${sec.percentage} ${100 - sec.percentage}`;
                        const dashoffset = 100 - acc.cumulativeOffset;
                        acc.elements.push(
                          <circle
                            key={idx}
                            cx="18"
                            cy="18"
                            r="15.915"
                            fill="transparent"
                            stroke={sec.color}
                            strokeWidth="4"
                            strokeDasharray={dasharray}
                            strokeDashoffset={dashoffset}
                          />
                        );
                        acc.cumulativeOffset += sec.percentage;
                        return acc;
                      },
                      { elements: [] as React.ReactNode[], cumulativeOffset: 0 }
                    ).elements}
                  </svg>
                </div>

                {/* Sector Legend */}
                <div className="space-y-1.5 text-[11px] font-medium flex-1">
                  {activeMetrics.sectorBreakdown.slice(0, 3).map((sec, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5 truncate max-w-[130px]">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sec.color }} />
                        <span className="text-slate-700 truncate">{sec.label}</span>
                      </span>
                      <span className="font-bold text-slate-900 font-mono ml-1">{sec.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Registry Share Percentages */}
            <div className="border-t border-slate-200/80 pt-4 space-y-2">
              <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Registry</p>

              <div className="flex items-center justify-between text-center pt-1 font-mono">
                {activeMetrics.registryBreakdown.map((reg, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-lg font-black text-emerald-600">{reg.percentage}%</p>
                    <p className="text-[10px] font-bold text-slate-600">{reg.name}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
