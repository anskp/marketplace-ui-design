import React, { useState, useEffect } from 'react';
import { RwaAsset } from '../types';
import { RwaCard } from './RwaCard';
import {
  ArrowUp,
  Leaf,
  Building2,
  Palette,
  TrendingUp,
  Filter,
  CheckCircle2,
  Building,
  Coins,
  ShieldCheck,
  LayoutGrid,
  List,
  Flame,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface MarketplaceViewProps {
  assets: RwaAsset[];
  searchQuery: string;
  onSelectAsset: (asset: RwaAsset) => void;
  onOpenKycModal: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  assets,
  searchQuery,
  onSelectAsset,
  onOpenKycModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    'issuer-1': true,
  });

  const toggleFollow = (id: string) => {
    setFollowingMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Auto cycle hero slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Trending Tokens Data (Screenshot 1 & 2 style)
  const trendingTokens = [
    {
      id: 'trend-1',
      assetId: 'rwa-carbon-01',
      title: 'Amazon CO2 Pool',
      symbol: 'AMZ-CO2',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=100&q=80',
      priceOrFdv: '$12.5M FDV',
      change: '+14.8%',
      isPositive: true,
      sparkline: 'M0,25 Q15,5 30,18 T60,8 T90,20 T120,4',
    },
    {
      id: 'trend-2',
      assetId: 'rwa-treasury-01',
      title: 'BlackRock T-Bill',
      symbol: 'BUIDL-TBILL',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=100&q=80',
      priceOrFdv: '$185M FDV',
      change: '+5.35%',
      isPositive: true,
      sparkline: 'M0,20 Q20,15 40,12 T80,8 T120,2',
    },
    {
      id: 'trend-3',
      assetId: 'rwa-realestate-01',
      title: 'Manhattan Tower',
      symbol: 'MNHT-RWA',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=100&q=80',
      priceOrFdv: '$45.0M FDV',
      change: '+9.2%',
      isPositive: true,
      sparkline: 'M0,28 Q30,20 60,15 T120,5',
    },
    {
      id: 'trend-4',
      assetId: 'rwa-art-01',
      title: 'Picasso 1932 Vault',
      symbol: 'ART-PCS',
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=100&q=80',
      priceOrFdv: '$18.5M FDV',
      change: '+12.4%',
      isPositive: true,
      sparkline: 'M0,22 Q25,18 50,24 T100,10 T120,6',
    },
    {
      id: 'trend-5',
      assetId: 'rwa-collectibles-01',
      title: 'Ferrari 250 GTO',
      symbol: 'CAR-GTO62',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=100&q=80',
      priceOrFdv: '$48.0M FDV',
      change: '+15.2%',
      isPositive: true,
      sparkline: 'M0,30 Q30,22 60,18 T120,2',
    },
  ];

  // Institutional Verified Issuers (Companies / Institutional SPVs / Brokers)
  const topIssuers = [
    {
      id: 'issuer-1',
      rank: 1,
      name: 'Verra BioCarbon SPV #401',
      subtitle: 'Verified Environmental Registry',
      amount: '$12.4M Volume',
      avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=80&q=80',
      rankClass: 'bg-[#24c287] text-white',
      btnType: 'follow' as const,
    },
    {
      id: 'issuer-2',
      rank: 2,
      name: 'BlackRock Prime Treasury Subnet',
      subtitle: 'US Short-Term T-Bills Pool',
      amount: '$45.8M Volume',
      avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=80&q=80',
      rankClass: 'bg-[#6c5dd3] text-white',
      btnType: 'orange-arrow' as const,
    },
    {
      id: 'issuer-3',
      rank: 3,
      name: 'Lexington Commercial PropCo LLC',
      subtitle: 'Commercial Real Estate SPV',
      amount: '$28.1M Volume',
      avatar: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=80&q=80',
      rankClass: 'bg-[#ff7a45] text-white',
      btnType: 'green-arrow' as const,
    },
  ];

  // Secondary Hot Assets Sellers (Peer investors)
  const secondarySellers = [
    { sellerName: '@alex_vaults', sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80' },
    { sellerName: '@sarah_capital', sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
  ];

  // Hero Slider Data
  const slides = [
    {
      id: 1,
      title: 'Miami Coastal Villa',
      issuer: 'By Miami RWA Properties SPV',
      bgImg: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      floorPrice: '$100.00',
      tokens: '5,000',
      volume: '$500,000',
      yieldApy: '8.4% APY',
      yieldColor: 'text-blue-400',
      category: 'Real Estate',
      thumbs: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=150',
      ],
    },
    {
      id: 2,
      title: 'MicroEnergy Carbon Credits',
      issuer: 'By Verra Registry Offsets',
      bgImg: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
      floorPrice: '$0.0005',
      tokens: '8,000,000',
      volume: '$4,000,000',
      yieldApy: '240t Offset',
      yieldColor: 'text-emerald-400',
      category: 'Carbon Credits',
      thumbs: [
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=150',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=150',
      ],
    },
    {
      id: 3,
      title: 'Red Clock Fine Art Canvas',
      issuer: 'By Fine Art Vaults SPV',
      bgImg: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80',
      floorPrice: '$0.000001',
      tokens: '20,000,000',
      volume: '$200,000',
      yieldApy: '12.5% Est.',
      yieldColor: 'text-pink-400',
      category: 'Fine Art',
      thumbs: [
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=150',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150',
      ],
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* 1. AUTOCHANGE ROTATING HERO SLIDE BANNER */}
      <div className="relative w-full h-[320px] md:h-[350px] rounded-[24px] overflow-hidden shadow-md group">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out flex items-end p-6 md:p-8 bg-cover bg-center ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${slide.bgImg})` }}
          >
            {/* Dark Gradient Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b2f]/90 via-[#1b1b2f]/30 to-transparent z-1" />

            {/* Left Content Box */}
            <div className="relative z-10 max-w-xl space-y-3 text-white">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-extrabold flex items-center space-x-2 text-white">
                  <span>{slide.title}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                </h2>
                <div className="text-xs text-slate-300 font-medium">{slide.issuer}</div>
              </div>

              {/* Stats Bar Container */}
              <div className="bg-[#1b1b2f]/80 backdrop-blur-md border border-white/10 rounded-[14px] px-4 py-2.5 flex flex-wrap gap-5 w-fit">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Floor Price</span>
                  <span className="text-xs font-extrabold text-white">{slide.floorPrice}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Tokens</span>
                  <span className="text-xs font-extrabold text-white">{slide.tokens}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Total Pool</span>
                  <span className="text-xs font-extrabold text-white">{slide.volume}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Yield / Offset</span>
                  <span className={`text-xs font-extrabold ${slide.yieldColor}`}>{slide.yieldApy}</span>
                </div>
              </div>
            </div>

            {/* Right Thumbnails Preview */}
            <div className="hidden md:flex absolute right-8 bottom-8 z-10 space-x-3">
              {slide.thumbs.map((thumb, tIdx) => (
                <div key={tIdx} className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/40 shadow-lg">
                  <img src={thumb} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Bottom Slider Dash Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'w-8 bg-white' : 'w-4 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. CATEGORY FILTER PILLS & VIEW STYLE BAR */}
      <div className="bg-white rounded-[22px] p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1.5 mr-2 text-xs font-extrabold text-slate-900">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Category:</span>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            All Assets ({assets.length})
          </button>

          <button
            onClick={() => setSelectedCategory('real_estate')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'real_estate'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Real Estate</span>
          </button>

          <button
            onClick={() => setSelectedCategory('treasury')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'treasury'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Treasury & T-Bills</span>
          </button>

          <button
            onClick={() => setSelectedCategory('carbon')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'carbon'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Carbon Credits</span>
          </button>

          <button
            onClick={() => setSelectedCategory('fine_art')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'fine_art'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Fine Art</span>
          </button>

          <button
            onClick={() => setSelectedCategory('commodities')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'commodities'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Commodities</span>
          </button>

          <button
            onClick={() => setSelectedCategory('collectibles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              selectedCategory === 'collectibles'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collectibles</span>
          </button>
        </div>

        {/* Display Style Toggle (Grid vs List) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewStyle('grid')}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              viewStyle === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setViewStyle('list')}
            className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
              viewStyle === 'list' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* 3. MAIN FILTERED ASSET DISPLAY SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              {selectedCategory === 'all' ? 'All Tokenized RWA Assets' : `${selectedCategory.toUpperCase().replace('_', ' ')} Assets`}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs">
              {filteredAssets.length} Available
            </span>
          </div>

          {searchQuery && (
            <span className="text-xs text-slate-500 font-mono">
              Filtered by: "<span className="font-bold text-slate-800">{searchQuery}</span>"
            </span>
          )}
        </div>

        {filteredAssets.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Coins className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No assets found matching criteria</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search query or switching category filter to view other tokenized pools.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewStyle === 'grid' ? (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredAssets.map((asset) => (
              <RwaCard key={asset.id} asset={asset} onSelectAsset={onSelectAsset} />
            ))}
          </div>
        ) : (
          /* Table / List View Mode */
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-extrabold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Asset Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price / Token</th>
                    <th className="py-3.5 px-4">Annual APY</th>
                    <th className="py-3.5 px-4">Total Pool Market Cap</th>
                    <th className="py-3.5 px-4">Issuer Company</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-900">
                  {filteredAssets.map((asset) => (
                    <tr
                      key={`list-${asset.id}`}
                      onClick={() => onSelectAsset(asset)}
                      className="hover:bg-blue-50/50 transition cursor-pointer font-medium"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img src={asset.image} alt={asset.title} className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200" />
                          <div>
                            <div className="font-extrabold text-slate-900">{asset.title}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{asset.symbol} • {asset.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                          {asset.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-extrabold text-slate-900">
                        ${asset.pricePerToken.toFixed(2)} USDC
                      </td>
                      <td className="py-3 px-4 font-extrabold text-emerald-600">
                        {asset.annualYieldApy}% APY
                      </td>
                      <td className="py-3 px-4 font-mono">
                        ${(asset.totalMarketCap / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {asset.company.name}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1 ml-auto">
                          <span>Trade</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. SECONDARY MARKET & TOP ISSUERS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Top Verified Institutional Issuers */}
        <div className="lg:col-span-6 bg-white rounded-[24px] p-5 shadow-2xs space-y-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Top Verified Institutional Issuers</h3>
            <span className="text-xs text-blue-600 font-bold">SPV Audited</span>
          </div>

          <div className="space-y-3.5">
            {topIssuers.map((issuer) => (
              <div key={issuer.id} className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center shrink-0 ${issuer.rankClass}`}>
                    {issuer.rank}
                  </div>

                  <img
                    src={issuer.avatar}
                    alt={issuer.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />

                  <div className="flex flex-col">
                    <span className="text-xs font-extrabold text-slate-900 leading-tight">{issuer.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{issuer.subtitle}</span>
                  </div>
                </div>

                {issuer.btnType === 'follow' ? (
                  <button
                    onClick={() => toggleFollow(issuer.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      followingMap[issuer.id]
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {followingMap[issuer.id] ? 'Following' : 'Follow'}
                  </button>
                ) : (
                  <button className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Hot Assets P2P */}
        <div className="lg:col-span-6 bg-white rounded-[24px] p-5 shadow-2xs space-y-4 border border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Secondary Peer-to-Peer Market</h3>
            <span className="text-xs text-purple-600 font-bold">P2P Escrow Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {assets.slice(0, 2).map((asset, idx) => (
              <RwaCard
                key={`secondary-${asset.id}`}
                asset={asset}
                onSelectAsset={onSelectAsset}
                isSecondaryMarket={true}
                sellerName={secondarySellers[idx]?.sellerName || '@investor_vault'}
                sellerAvatar={secondarySellers[idx]?.sellerAvatar}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 5. COURTYARD PHYSICAL VAULTS SPOTLIGHT (MOVED DOWN) */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-[24px] p-6 text-white border border-blue-800/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 space-y-4">
          <div>
            <h3 className="text-lg font-black text-white tracking-tight">Courtyard Physical Vaults</h3>
            <p className="text-xs text-blue-300 font-medium mt-0.5">7d sales: $109,680 • <span className="text-emerald-400 font-bold">+16.7%</span></p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            First-of-its-kind tokenization service that enables anyone to easily own and trade physical real-world assets, luxury collectibles, and LBMA gold on the blockchain.
          </p>

          <div className="text-xs font-semibold text-blue-200 bg-blue-950/80 px-3 py-2 rounded-xl border border-blue-800/60 w-fit">
            Keep them vaulted, trade with a click, or burn the NFT for physical delivery.
          </div>
        </div>

        {/* 3 Side-by-Side Physical Vault Items */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {assets.slice(0, 3).map((ast) => (
            <div
              key={`spotlight-${ast.id}`}
              onClick={() => onSelectAsset(ast)}
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-3 space-y-2.5 transition cursor-pointer group shadow-sm"
            >
              <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-950">
                <img src={ast.image} alt={ast.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-600 text-white font-extrabold text-[9px] uppercase tracking-wider">
                  {ast.category}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-400 transition">
                  {ast.title}
                </h4>
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className="font-mono font-extrabold text-blue-300">${ast.pricePerToken.toFixed(2)} USDC</span>
                  <span className="text-[10px] text-emerald-400 font-bold">{ast.annualYieldApy}% APY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. TRENDING TOKENS STRIP (MOVED DOWN) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Trending Tokens</h2>
            <p className="text-xs text-slate-500 font-medium">Real World Assets with highest volume & momentum today</p>
          </div>
          <span className="text-xs font-bold text-slate-400 font-mono">Live On-Chain Feed</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {trendingTokens.map((item) => {
            const linkedAsset = assets.find((a) => a.id === item.assetId) || assets[0];
            return (
              <div
                key={item.id}
                onClick={() => onSelectAsset(linkedAsset)}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-2 group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate group-hover:text-blue-600 transition">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-mono font-medium">{item.priceOrFdv}</span>
                      <span className="text-[10px] font-extrabold text-emerald-600">{item.change}</span>
                    </div>
                  </div>
                </div>

                {/* Mini Sparkline Chart */}
                <div className="w-12 h-6 shrink-0">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 120 30">
                    <path
                      d={item.sparkline}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. RWA 101 EDUCATIONAL CARDS WITH ILLUSTRATED BANNERS */}
      <div className="space-y-4 pt-2">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">RWA 101</h3>
          <p className="text-xs text-slate-500 font-medium">Learn about RWAs, Web3, and more.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: What is an RWA? */}
          <div className="group cursor-pointer">
            <div className="h-48 md:h-52 w-full rounded-2xl bg-gradient-to-tr from-sky-400 via-cyan-400 to-blue-500 overflow-hidden relative flex items-center justify-center p-4 shadow-2xs group-hover:shadow-md transition duration-300">
              {/* Floating Sparkles & Background Orbs */}
              <div className="absolute top-3 left-4 text-white/70 text-sm font-black animate-pulse">✦</div>
              <div className="absolute bottom-4 right-5 text-white/80 text-xs font-black">✦</div>

              {/* 3D Polaroid Card */}
              <div className="-rotate-3 shadow-2xl bg-white p-2.5 rounded-2xl w-36 md:w-40 flex flex-col items-center gap-2 border border-slate-100 group-hover:scale-105 group-hover:-rotate-1 transition duration-300">
                <div className="w-full h-24 rounded-xl overflow-hidden bg-sky-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80"
                    alt="RWA Property"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/10" />
                </div>
                <div className="w-16 h-2 rounded-full bg-slate-200" />
                <div className="w-10 h-1.5 rounded-full bg-slate-100" />
              </div>

              {/* Floating 3D Elements */}
              <div className="absolute top-5 right-6 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xs shadow-lg flex items-center justify-center text-sky-600 font-black text-lg rotate-12 border border-white">
                <Building2 className="w-5 h-5 text-sky-600" />
              </div>
              <div className="absolute bottom-6 left-6 w-9 h-9 rounded-2xl bg-white/90 backdrop-blur-xs shadow-lg flex items-center justify-center text-blue-600 font-black text-base -rotate-12 border border-white">
                <Coins className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-2.5 tracking-tight group-hover:text-blue-600 transition">
              What is an RWA?
            </h4>
          </div>

          {/* Card 2: How to buy an RWA */}
          <div className="group cursor-pointer">
            <div className="h-48 md:h-52 w-full rounded-2xl bg-gradient-to-tr from-amber-300 via-yellow-400 to-orange-400 overflow-hidden relative flex items-center justify-center p-4 shadow-2xs group-hover:shadow-md transition duration-300">
              <div className="absolute top-4 left-5 text-white/80 text-sm font-black">✦</div>
              <div className="absolute bottom-3 right-6 text-white/70 text-xs font-black animate-pulse">✦</div>

              {/* 3D Polaroid Card */}
              <div className="rotate-2 shadow-2xl bg-white p-2.5 rounded-2xl w-36 md:w-40 flex flex-col items-center gap-2 border border-slate-100 group-hover:scale-105 group-hover:rotate-4 transition duration-300">
                <div className="w-full h-24 rounded-xl overflow-hidden bg-amber-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="RWA Investor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-amber-500/10" />
                </div>
                <div className="w-16 h-2 rounded-full bg-slate-200" />
                <div className="w-10 h-1.5 rounded-full bg-slate-100" />
              </div>

              {/* Floating glossy golden USDC coin */}
              <div className="absolute bottom-5 right-5 w-14 h-14 bg-gradient-to-b from-amber-200 via-yellow-400 to-amber-600 rounded-full border-2 border-yellow-100 shadow-xl flex items-center justify-center text-amber-950 font-black text-xl -rotate-12 group-hover:scale-110 transition duration-300">
                $
              </div>
            </div>
            <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-2.5 tracking-tight group-hover:text-blue-600 transition">
              How to buy an RWA
            </h4>
          </div>

          {/* Card 3: What is SPV Custody? */}
          <div className="group cursor-pointer">
            <div className="h-48 md:h-52 w-full rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-400 to-green-500 overflow-hidden relative flex items-center justify-center p-4 shadow-2xs group-hover:shadow-md transition duration-300">
              <div className="absolute top-3 right-4 text-white/80 text-xs font-black">✦</div>
              <div className="absolute bottom-5 left-5 text-white/70 text-sm font-black animate-pulse">✦</div>

              {/* 3D Polaroid Card */}
              <div className="-rotate-1 shadow-2xl bg-white p-2.5 rounded-2xl w-36 md:w-40 flex flex-col items-center gap-2 border border-slate-100 group-hover:scale-105 group-hover:rotate-1 transition duration-300">
                <div className="w-full h-24 rounded-xl overflow-hidden bg-emerald-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
                    alt="SPV Structure"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-emerald-600/10" />
                </div>
                <div className="w-16 h-2 rounded-full bg-slate-200" />
                <div className="w-10 h-1.5 rounded-full bg-slate-100" />
              </div>

              {/* Floating Green Plus Badge */}
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-emerald-400 rounded-full shadow-xl flex items-center justify-center text-white font-black text-2xl border-2 border-emerald-200 group-hover:scale-110 transition duration-300">
                +
              </div>
            </div>
            <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-2.5 tracking-tight group-hover:text-blue-600 transition">
              What is SPV Custody?
            </h4>
          </div>

          {/* Card 4: How to stay protected in web3 */}
          <div className="group cursor-pointer">
            <div className="h-48 md:h-52 w-full rounded-2xl bg-gradient-to-tr from-amber-300 via-yellow-300 to-amber-400 overflow-hidden relative flex items-center justify-center p-4 shadow-2xs group-hover:shadow-md transition duration-300">
              <div className="absolute top-4 left-4 text-white/90 text-sm font-black">✦</div>
              <div className="absolute bottom-4 right-5 text-white/80 text-xs font-black animate-pulse">✦</div>

              {/* 3D Blue Safe Vault */}
              <div className="w-32 h-36 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 rounded-2xl shadow-2xl border-2 border-blue-400 p-3 flex flex-col items-center justify-center relative rotate-6 group-hover:rotate-3 group-hover:scale-105 transition duration-300">
                {/* Safe Dial */}
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 bg-slate-800 shadow-inner flex items-center justify-center relative">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <div className="absolute top-1 w-0.5 h-2 bg-slate-200" />
                </div>
                <div className="mt-2 text-[9px] font-mono text-blue-200 uppercase tracking-widest font-bold">VAULT</div>
              </div>

              {/* Mini polaroid leaning beside safe */}
              <div className="absolute bottom-6 left-6 -rotate-12 bg-white p-1 rounded-lg w-12 shadow-lg border border-slate-200">
                <div className="w-full h-10 bg-pink-200 rounded" />
              </div>
            </div>
            <h4 className="text-sm md:text-base font-extrabold text-slate-900 mt-2.5 tracking-tight group-hover:text-blue-600 transition">
              How to stay protected in web3
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

