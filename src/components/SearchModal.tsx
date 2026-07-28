import React, { useState } from 'react';
import { RwaAsset } from '../types';
import { Search, X, Check, ArrowUpRight, TrendingUp } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: RwaAsset[];
  onSelectAsset: (asset: RwaAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedChain, setSelectedChain] = useState<string>('all');

  if (!isOpen) return null;

  const chains = ['all', 'Ethereum', 'Solana', 'Base', 'Arbitrum', 'HyperEVM', 'Optimism'];

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.company.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1b1b2f]/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[820px] h-[520px] bg-white rounded-[24px] shadow-[0_20px_50px_rgba(108,93,211,0.15)] flex flex-col overflow-hidden font-sans border border-slate-100"
      >
        {/* Modal Header */}
        <header className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="relative flex-1 mr-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#7e7e9a]" />
            <input
              type="text"
              autoFocus
              placeholder="Search Copym RWA Ecosystem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-[12px] py-2.5 pl-11 pr-4 text-sm text-[#1b1b2f] placeholder-[#7e7e9a] focus:outline-none focus:border-[#6c5dd3]"
            />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7e7e9a] hover:text-[#1b1b2f] hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation */}
          <aside className="w-[200px] border-r border-slate-100 p-4 space-y-1 shrink-0 bg-slate-50/50">
            {['all', 'Collections', 'Tokens', 'Items', 'Wallets'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3.5 py-2.5 rounded-[10px] text-xs font-semibold transition cursor-pointer capitalize ${
                  activeTab === tab
                    ? 'bg-[#f0eeff] text-[#6c5dd3]'
                    : 'text-[#7e7e9a] hover:text-[#1b1b2f] hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 p-6 overflow-y-auto space-y-5">
            {/* Chain Pills */}
            <div>
              <h4 className="text-xs font-bold text-[#1b1b2f] mb-2.5">Filter Chains</h4>
              <div className="flex flex-wrap gap-2">
                {chains.map((chain) => (
                  <button
                    key={chain}
                    onClick={() => setSelectedChain(chain)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer capitalize ${
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

            {/* Trending Projects Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#1b1b2f]">Trending RWA Projects</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      onSelectAsset(asset);
                      onClose();
                    }}
                    className="p-3 rounded-[12px] border border-slate-100 hover:border-[#6c5dd3]/30 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={asset.image}
                        alt={asset.title}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-[#1b1b2f] line-clamp-1">{asset.title}</span>
                        <span className="text-[10px] text-[#7e7e9a] font-mono">{asset.symbol}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#1b1b2f] block">${asset.pricePerToken.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-[#24c287]">+{asset.annualYieldApy}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
