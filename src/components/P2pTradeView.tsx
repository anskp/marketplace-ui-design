import React, { useState } from 'react';
import { RwaAsset, UserProfile, PortfolioHolding } from '../types';
import { RwaCard } from './RwaCard';
import { Plus, ArrowUpRight, ShieldCheck, CheckCircle2, X, Filter, RefreshCw } from 'lucide-react';

interface P2pTradeViewProps {
  assets: RwaAsset[];
  user: UserProfile;
  holdings: PortfolioHolding[];
  onSelectAsset: (asset: RwaAsset) => void;
  onCreateP2pOrder: (holding: PortfolioHolding, tokenAmount: number, pricePerToken: number) => void;
}

export const P2pTradeView: React.FC<P2pTradeViewProps> = ({
  assets,
  user,
  holdings,
  onSelectAsset,
  onCreateP2pOrder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [selectedHolding, setSelectedHolding] = useState<PortfolioHolding | null>(
    holdings.length > 0 ? holdings[0] : null
  );
  const [tokensToList, setTokensToList] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(100);
  const [orderCreatedSuccess, setOrderCreatedSuccess] = useState<boolean>(false);

  // Mock active P2P orderbook listings from other peer investors
  const p2pOrderbookSellers = [
    { sellerName: '@alex_vaults', sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', assetIdx: 0 },
    { sellerName: '@sarah_capital', sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', assetIdx: 1 },
    { sellerName: '@marco_holdings', sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', assetIdx: 2 },
    { sellerName: '@elena_ventures', sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80', assetIdx: 3 },
  ];

  const filteredAssets = assets.filter((asset) => {
    return selectedCategory === 'all' || asset.category === selectedCategory;
  });

  const handleOpenModal = () => {
    if (holdings.length > 0) {
      setSelectedHolding(holdings[0]);
      setTokensToList(Math.min(1, holdings[0].tokensOwned));
      setCustomPrice(holdings[0].currentPrice);
    }
    setIsOrderModalOpen(true);
  };

  const handleExecuteP2pListing = () => {
    if (!selectedHolding || tokensToList <= 0) return;
    onCreateP2pOrder(selectedHolding, tokensToList, customPrice);
    setOrderCreatedSuccess(true);
    setTimeout(() => {
      setOrderCreatedSuccess(false);
      setIsOrderModalOpen(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Top Banner Header */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-[#1b1b2f]">P2P Secondary Market & Trade</h2>
            <span className="bg-[#e2f7f0] text-[#24c287] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Atomic Settlement Escrow
            </span>
          </div>
          <p className="text-xs text-[#7e7e9a] font-medium max-w-2xl">
            Trade existing RWA token shares directly with other verified investors. Ownership is cryptographically transferred instantly upon payment settlement.
          </p>
        </div>

        {/* Create P2P Order Button */}
        <button
          onClick={handleOpenModal}
          className="bg-[#6c5dd3] hover:bg-[#5849be] text-white font-bold text-xs px-5 py-3 rounded-[14px] transition shadow-xs flex items-center space-x-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create P2P Settlement Order</span>
        </button>
      </div>

      {/* Category Pills Filter Bar */}
      <div className="bg-white rounded-[20px] p-3 shadow-[0_4px_15px_rgba(0,0,0,0.02)] flex flex-wrap items-center justify-between gap-2 border border-slate-100">
        <div className="flex items-center space-x-2 px-2 text-xs font-bold text-[#1b1b2f]">
          <Filter className="w-4 h-4 text-[#6c5dd3]" />
          <span>P2P Category:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {['all', 'real_estate', 'carbon', 'fine_art', 'private_debt'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-[10px] font-semibold transition cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-[#6c5dd3] text-white'
                  : 'bg-[#f0eeff] text-[#7e7e9a] hover:text-[#6c5dd3]'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Active P2P Orderbook Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-[#1b1b2f]">Active Secondary Orderbook Listings</h3>
          <span className="text-xs text-[#7e7e9a] font-medium">Showing {filteredAssets.length} Secondary Deals</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map((asset, idx) => {
            const sellerInfo = p2pOrderbookSellers[idx % p2pOrderbookSellers.length];
            return (
              <RwaCard
                key={`p2p-card-${asset.id}`}
                asset={asset}
                onSelectAsset={onSelectAsset}
                isSecondaryMarket={true}
                sellerName={sellerInfo.sellerName}
                sellerAvatar={sellerInfo.sellerAvatar}
              />
            );
          })}
        </div>
      </section>

      {/* Create P2P Settlement Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1b1b2f]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#1b1b2f]">Create P2P Settlement Order</h3>
                <p className="text-[11px] text-[#7e7e9a]">List tokens you own for peer-to-peer secondary trade</p>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {holdings.length === 0 ? (
              <div className="py-6 text-center space-y-3">
                <p className="text-xs text-slate-600 font-medium">
                  You currently do not own any RWA tokens in your portfolio vault to list for secondary settlement.
                </p>
                <button
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-4 py-2 bg-[#6c5dd3] text-white font-bold text-xs rounded-xl"
                >
                  Explore Primary Marketplace
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-sans">
                {/* Select Portfolio Asset */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-[#1b1b2f]">Select Asset from Your Vault:</label>
                  <select
                    value={selectedHolding?.assetId}
                    onChange={(e) => {
                      const found = holdings.find((h) => h.assetId === e.target.value);
                      if (found) {
                        setSelectedHolding(found);
                        setTokensToList(Math.min(1, found.tokensOwned));
                        setCustomPrice(found.currentPrice);
                      }
                    }}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-[12px] p-3 font-semibold text-[#1b1b2f] focus:outline-none focus:border-[#6c5dd3]"
                  >
                    {holdings.map((h) => (
                      <option key={h.assetId} value={h.assetId}>
                        {h.assetTitle} ({h.tokensOwned} owned)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tokens to List */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-[#1b1b2f]">Quantity to Sell:</label>
                  <input
                    type="number"
                    min={1}
                    max={selectedHolding?.tokensOwned || 1}
                    value={tokensToList}
                    onChange={(e) => setTokensToList(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-[12px] p-3 font-semibold text-[#1b1b2f] focus:outline-none focus:border-[#6c5dd3]"
                  />
                  <span className="text-[10px] text-[#7e7e9a]">
                    Available in Vault: {selectedHolding?.tokensOwned} tokens
                  </span>
                </div>

                {/* Price Per Token */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-[#1b1b2f]">Asking Price per Token (USDC):</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0.0001}
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-[12px] p-3 font-semibold text-[#1b1b2f] focus:outline-none focus:border-[#6c5dd3]"
                  />
                </div>

                {/* Total Value calculation */}
                <div className="p-3.5 bg-[#f0eeff] rounded-[14px] flex justify-between font-bold text-[#1b1b2f]">
                  <span>Total Order Value:</span>
                  <span className="text-[#6c5dd3]">${(tokensToList * customPrice).toFixed(2)} USDC</span>
                </div>

                {/* Submit Listing Button */}
                <button
                  onClick={handleExecuteP2pListing}
                  disabled={orderCreatedSuccess}
                  className={`w-full py-3.5 rounded-[14px] font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-2 shadow-xs ${
                    orderCreatedSuccess
                      ? 'bg-[#24c287] text-white'
                      : 'bg-[#6c5dd3] hover:bg-[#5849be] text-white'
                  }`}
                >
                  {orderCreatedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Order Published to P2P Secondary Orderbook!</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Publish Order to Orderbook</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
