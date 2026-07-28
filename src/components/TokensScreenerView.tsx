import React, { useState } from 'react';
import { RwaAsset } from '../types';
import { Search, Filter, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface TokensScreenerViewProps {
  assets: RwaAsset[];
  onSelectAsset: (asset: RwaAsset) => void;
}

export const TokensScreenerView: React.FC<TokensScreenerViewProps> = ({
  assets,
  onSelectAsset,
}) => {
  const [selectedChain, setSelectedChain] = useState<string>('All');
  const [selectedFilter, setSelectedFilter] = useState<'tokens' | 'collections'>('tokens');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const chains = ['All', 'Ethereum', 'Solana', 'Base', 'Arbitrum', 'HyperEVM', 'Optimism', 'Monad', 'Soneium', 'Somnia'];

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Header */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-[#1b1b2f]">RWA Tokens Screener</h2>
          <p className="text-xs text-[#7e7e9a] font-medium">
            Monitor real-time market prices, volume, FDV, and 24h performance across all supported blockchain networks.
          </p>
        </div>

        {/* Screener Search Bar */}
        <div className="relative w-full md:w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7e7e9a]" />
          <input
            type="text"
            placeholder="Search tokens or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f8fafc] border border-slate-200 text-xs py-2.5 pl-9 pr-3 rounded-[12px] text-[#1b1b2f] placeholder-[#7e7e9a] focus:outline-none focus:border-[#6c5dd3]"
          />
        </div>
      </div>

      {/* Main Screener Layout (Left Sidebar Filters + Right Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filters Sidebar (lg:col-span-3) */}
        <aside className="lg:col-span-3 bg-white rounded-[24px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-slate-100 space-y-5 h-fit">
          <div>
            <h4 className="text-xs font-bold text-[#1b1b2f] uppercase tracking-wider mb-2.5">Type</h4>
            <div className="bg-[#f1f5f9] p-1 rounded-[12px] flex">
              <button
                onClick={() => setSelectedFilter('collections')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-[8px] transition cursor-pointer ${
                  selectedFilter === 'collections' ? 'bg-white text-[#1b1b2f] shadow-xs' : 'text-[#7e7e9a]'
                }`}
              >
                Collections
              </button>
              <button
                onClick={() => setSelectedFilter('tokens')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-[8px] transition cursor-pointer ${
                  selectedFilter === 'tokens' ? 'bg-white text-[#1b1b2f] shadow-xs' : 'text-[#7e7e9a]'
                }`}
              >
                Tokens
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1b1b2f] uppercase tracking-wider mb-2.5">Asset Category</h4>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'real_estate', label: 'Real Estate' },
                { id: 'carbon', label: 'Carbon Credits' },
                { id: 'fine_art', label: 'Fine Art' },
                { id: 'private_debt', label: 'Private Debt' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-[8px] font-semibold transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#f0eeff] text-[#6c5dd3]'
                      : 'text-[#7e7e9a] hover:bg-slate-50 hover:text-[#1b1b2f]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#1b1b2f] uppercase tracking-wider mb-2.5">Chains</h4>
            <div className="flex flex-wrap gap-1.5">
              {chains.map((chain) => (
                <button
                  key={chain}
                  onClick={() => setSelectedChain(chain)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition cursor-pointer ${
                    selectedChain === chain
                      ? 'bg-[#6c5dd3] text-white border-[#6c5dd3]'
                      : 'bg-white text-[#7e7e9a] border-slate-200 hover:bg-slate-50 hover:text-[#1b1b2f]'
                  }`}
                >
                  {chain}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Screener Table (lg:col-span-9) */}
        <section className="lg:col-span-9 bg-white rounded-[24px] p-5 shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-slate-100 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-[#7e7e9a] uppercase tracking-wider">
                <th className="pb-3 px-3">Token</th>
                <th className="pb-3 px-3">Price</th>
                <th className="pb-3 px-3">1H Change</th>
                <th className="pb-3 px-3">24H Change</th>
                <th className="pb-3 px-3">30D Change</th>
                <th className="pb-3 px-3">24H Vol</th>
                <th className="pb-3 px-3">FDV</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAssets.map((asset, idx) => {
                const isPositive = idx % 2 === 0;
                const change1h = isPositive ? '+0.4%' : '-0.2%';
                const change24h = isPositive ? '+21.9%' : '+8.1%';
                const change30d = isPositive ? '+63.6%' : '+12.0%';
                const volume = isPositive ? '$564.3K' : '$707.1K';
                const fdv = isPositive ? '$5.1M' : '$182.6K';

                return (
                  <tr key={asset.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-2.5">
                        <img src={asset.image} alt={asset.title} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1b1b2f]">{asset.title}</span>
                          <span className="text-[10px] text-[#7e7e9a] font-mono">{asset.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#1b1b2f]">${asset.pricePerToken.toFixed(2)}</td>
                    <td className={`py-3.5 px-3 font-semibold ${isPositive ? 'text-[#24c287]' : 'text-[#ef4444]'}`}>
                      {change1h}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#24c287]">{change24h}</td>
                    <td className="py-3.5 px-3 font-semibold text-[#24c287]">{change30d}</td>
                    <td className="py-3.5 px-3 font-medium text-[#1b1b2f]">{volume}</td>
                    <td className="py-3.5 px-3 font-medium text-[#1b1b2f]">{fdv}</td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => onSelectAsset(asset)}
                        className="bg-[#f0eeff] hover:bg-[#6c5dd3] text-[#6c5dd3] hover:text-white px-3 py-1 rounded-[8px] text-xs font-semibold transition cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};
