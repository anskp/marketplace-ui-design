import React, { useState } from 'react';
import { RwaAsset, UserProfile } from '../types';
import { P2pListingItem } from './P2pOrderDetailModal';
import {
  X,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Coins,
  TrendingUp,
  Activity,
  Heart,
  Share2,
  Copy,
  Check,
  Building2,
  ArrowUpRight,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';

interface InvestModalProps {
  asset: RwaAsset | null;
  allAssets: RwaAsset[];
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onBuyAsset: (asset: RwaAsset, tokensToBuy: number, totalUsdc: number) => void;
  onSelectP2pOption: (p2pListing: P2pListingItem) => void;
  onSelectAssetFromCarousel: (asset: RwaAsset) => void;
}

export const InvestModal: React.FC<InvestModalProps> = ({
  asset,
  allAssets,
  user,
  isOpen,
  onClose,
  onBuyAsset,
  onSelectP2pOption,
  onSelectAssetFromCarousel,
}) => {
  const [sharesInput, setSharesInput] = useState<string>('10');
  const [modalTab, setModalTab] = useState<'recent_invest' | 'secondary_options' | 'details'>('recent_invest');
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen || !asset) return null;

  const tokensToBuy = Math.max(0, parseInt(sharesInput, 10) || 0);
  const totalUsdcCost = tokensToBuy * asset.pricePerToken;
  const isOverSupply = tokensToBuy > asset.availableTokens;
  const isInsufficientBalance = totalUsdcCost > user.balanceUsdc;
  const isKycRestricted = user.kycLevel < 2;

  const formatCompact = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(asset.smartContractAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleExecutePrimaryBuy = () => {
    if (tokensToBuy <= 0 || isOverSupply || isInsufficientBalance || isKycRestricted || isProcessing) return;

    setIsProcessing(true);
    setTimeout(() => {
      onBuyAsset(asset, tokensToBuy, totalUsdcCost);
      setIsProcessing(false);
      setSuccessMsg(`Primary Subscription settled for ${tokensToBuy}x ${asset.symbol}!`);
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    }, 1200);
  };

  // Mock Recent Primary Investments for this asset
  const recentPrimaryInvestments = [
    { id: 'inv-1', wallet: '0x3f81...90a2', shares: 500, price: asset.pricePerToken, total: asset.pricePerToken * 500, time: '5m ago', type: 'Primary Sub' },
    { id: 'inv-2', wallet: '0x71b2...12e4', shares: 1200, price: asset.pricePerToken, total: asset.pricePerToken * 1200, time: '38m ago', type: 'Primary Sub' },
    { id: 'inv-3', wallet: '0x992d...41f0', shares: 250, price: asset.pricePerToken, total: asset.pricePerToken * 250, time: '2h ago', type: 'Primary Sub' },
  ];

  // Mock Secondary Available P2P Options for this specific asset
  const secondaryP2pOptions: P2pListingItem[] = [
    {
      id: `p2p-opt-1-${asset.id}`,
      asset: asset,
      sellerName: '@alex_vaults',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      sellerAddress: '0x94f2...381a',
      shares: 150,
      askPrice: asset.pricePerToken - 0.50,
      navPrice: asset.pricePerToken,
      timeAgo: '12m ago',
      expiresIn: ' Ends in 5d',
      verified: true,
    },
    {
      id: `p2p-opt-2-${asset.id}`,
      asset: asset,
      sellerName: '@sarah_capital',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      sellerAddress: '0x38b1...902c',
      shares: 400,
      askPrice: asset.pricePerToken,
      navPrice: asset.pricePerToken,
      timeAgo: '1h ago',
      expiresIn: 'Ends in 12d',
      verified: true,
    },
    {
      id: `p2p-opt-3-${asset.id}`,
      asset: asset,
      sellerName: '@marco_holdings',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
      sellerAddress: '0x71e4...12bf',
      shares: 80,
      askPrice: asset.pricePerToken - 1.20,
      navPrice: asset.pricePerToken,
      timeAgo: '3h ago',
      expiresIn: 'Ends in 2d',
      verified: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Light Theme Modal Window container mirroring OpenSea UI layout */}
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] border border-slate-200 shadow-2xl overflow-hidden flex flex-col font-sans">
        
        {/* TOP BAR: BACK ARROW, THUMBNAIL RIBBON CAROUSEL, CLOSE (X) */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition cursor-pointer shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* TOP THUMBNAIL CAROUSEL RIBBON */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-2">
            {allAssets.slice(0, 8).map((a) => {
              const isCurrent = a.id === asset.id;
              return (
                <button
                  key={`ribbon-${a.id}`}
                  onClick={() => onSelectAssetFromCarousel(a)}
                  className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                    isCurrent ? 'border-blue-600 scale-105 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                  title={a.title}
                >
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN BODY: LEFT LARGE PREVIEW / RIGHT OPENSEA LIGHT THEME LAYOUT */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: LARGE ASSET CARD PREVIEW */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 aspect-square">
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                  ERC-3643
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[10px] px-2.5 py-1 rounded-lg border border-white/20">
                  TOKEN #{asset.id.replace('rwa-', '108')}
                </span>
              </div>
            </div>

            {/* Issuer & Audit Badge */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">Issuing SPV Entity:</span>
                <span className="font-extrabold text-slate-900">{asset.company?.name || 'Copym SPV'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="font-medium">Smart Contract Audit:</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> OpenZeppelin Passed ✓
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: OPENSEA ITEM LAYOUT */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Header: Collection title + Item Name + Action icons */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 font-mono">
                  <span>{asset.company?.name || 'Copym RWA Vault'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-500" />
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      isFavorited ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 transition cursor-pointer"
                    title="Copy contract"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {asset.title} #{asset.id.replace('rwa-', '308')}
              </h1>

              <div className="text-xs text-slate-500 font-mono">
                Owned by <span className="font-bold text-slate-900">SPV Treasury</span> • Shared with <span className="font-bold text-blue-600">18,234 Holders</span>
              </div>
            </div>

            {/* Tags Ribbon */}
            <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
              <span className="bg-slate-100 text-slate-800 font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                ERC-3643
              </span>
              <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-md border border-blue-200">
                ◆ ETHEREUM
              </span>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                +{asset.annualYieldApy}% APY Target
              </span>
              <span className="bg-purple-50 text-purple-700 font-bold px-2.5 py-0.5 rounded-md border border-purple-200">
                NAV ${asset.pricePerToken.toFixed(2)} USDC
              </span>
            </div>

            {/* OPENSEA STYLE STATS BANNER BOX (LIGHT THEME) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">TOP OFFER</span>
                <span className="font-extrabold text-slate-900">${(asset.pricePerToken - 0.50).toFixed(2)} USDC</span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">COLLECTION FLOOR / NAV</span>
                <span className="font-extrabold text-slate-900">${asset.pricePerToken.toFixed(2)} USDC</span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">TARGET YIELD</span>
                <span className="font-bold text-emerald-600">+{asset.annualYieldApy}% APY</span>
              </div>
              <div className="border-l border-slate-200 pl-3">
                <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">LAST SALE</span>
                <span className="font-extrabold text-slate-900">${asset.pricePerToken.toFixed(2)} USDC</span>
              </div>
            </div>

            {/* BUY NOW & MAKE OFFER ACTION BOX */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">PRIMARY SPV ISSUE PRICE</span>
                  <div className="text-xl font-black text-slate-900 font-mono">
                    ${asset.pricePerToken.toFixed(2)} <span className="text-xs text-slate-500 font-normal">USDC</span>
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  <span className="text-slate-500">Available SPV Pool:</span>
                  <span className="font-bold text-slate-900 block">{formatCompact(asset.availableTokens)} Shares</span>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold font-mono pl-2">Shares:</span>
                <input
                  type="number"
                  min="1"
                  max={asset.availableTokens}
                  value={sharesInput}
                  onChange={(e) => setSharesInput(e.target.value)}
                  className="flex-1 bg-transparent border-0 font-mono font-bold text-sm text-slate-900 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-700 font-mono pr-2">
                  Total: ${(tokensToBuy * asset.pricePerToken).toLocaleString()} USDC
                </span>
              </div>

              {successMsg && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Two Prominent Action Buttons: BUY NOW vs MAKE OFFER / BID P2P */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleExecutePrimaryBuy}
                  disabled={tokensToBuy <= 0 || isOverSupply || isInsufficientBalance || isKycRestricted || isProcessing}
                  className={`py-3 px-4 rounded-xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                    tokensToBuy <= 0 || isOverSupply || isInsufficientBalance || isKycRestricted
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <span>Settling Primary Sub...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-white" />
                      <span>Buy Now (Primary Sub)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setModalTab('secondary_options')}
                  className="py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-xs border border-purple-200 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Coins className="w-4 h-4 text-purple-600" />
                  <span>View Secondary P2P Offers</span>
                </button>
              </div>
            </div>

            {/* TABBED SUB-SECTION: FIRST RECENT INVEST, THEN SECONDARY AVAILABLE OPTIONS */}
            <div className="space-y-3 pt-2">
              <div className="flex border-b border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setModalTab('recent_invest')}
                  className={`py-2 px-4 border-b-2 transition cursor-pointer ${
                    modalTab === 'recent_invest'
                      ? 'border-blue-600 text-blue-600 font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Recent Invest (Primary)
                </button>
                <button
                  onClick={() => setModalTab('secondary_options')}
                  className={`py-2 px-4 border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                    modalTab === 'secondary_options'
                      ? 'border-purple-600 text-purple-700 font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>Secondary Available Options</span>
                  <span className="bg-purple-100 text-purple-800 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    3
                  </span>
                </button>
                <button
                  onClick={() => setModalTab('details')}
                  className={`py-2 px-4 border-b-2 transition cursor-pointer ${
                    modalTab === 'details'
                      ? 'border-slate-900 text-slate-900 font-black'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Asset Details
                </button>
              </div>

              {/* SUB-TAB 1: RECENT INVEST */}
              {modalTab === 'recent_invest' && (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500">
                    Latest primary subscriptions issued directly from the SPV Treasury vault:
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {recentPrimaryInvestments.map((inv) => (
                      <div
                        key={inv.id}
                        className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 font-sans">
                            {inv.type}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900">{inv.shares} Shares</span>
                            <span className="text-slate-400 text-[11px] ml-2">by {inv.wallet}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">${inv.total.toLocaleString()} USDC</div>
                          <div className="text-[10px] text-slate-400">{inv.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: SECONDARY AVAILABLE OPTIONS (P2P LISTINGS FOR THIS ASSET) */}
              {modalTab === 'secondary_options' && (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-500">
                    P2P secondary offers listed by current holders of {asset.symbol}. Click any option to view order details & buy:
                  </p>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {secondaryP2pOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => onSelectP2pOption(opt)}
                        className="flex items-center justify-between p-3.5 bg-purple-50/50 hover:bg-purple-100/60 border border-purple-200/80 rounded-xl text-xs font-mono transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={opt.sellerAvatar}
                            alt={opt.sellerName}
                            className="w-8 h-8 rounded-full object-cover border border-purple-300"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-900 font-sans">{opt.sellerName}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 fill-blue-500" />
                            </div>
                            <span className="text-slate-500 text-[11px]">
                              {opt.shares} {asset.symbol} @ <span className="font-bold text-slate-900">${opt.askPrice.toFixed(2)} USDC</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-extrabold text-purple-900">
                              ${(opt.shares * opt.askPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })} USDC
                            </div>
                            <div className="text-[10px] text-emerald-700 font-bold">
                              ${(opt.navPrice - opt.askPrice).toFixed(2)} Below NAV
                            </div>
                          </div>

                          <span className="px-3 py-1 bg-purple-600 group-hover:bg-purple-700 text-white font-extrabold text-[11px] rounded-lg font-sans transition flex items-center gap-1">
                            <span>Buy P2P</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: ASSET DETAILS */}
              {modalTab === 'details' && (
                <div className="grid grid-cols-2 gap-3 text-xs font-mono p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 text-[10px] block">CONTRACT ADDRESS</span>
                    <span className="font-bold text-slate-800 text-[11px] truncate block">{asset.smartContractAddress}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">TOKEN STANDARD</span>
                    <span className="font-bold text-slate-800 text-[11px]">ERC-3643 Permissioned</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">BLOCKCHAIN NETWORK</span>
                    <span className="font-bold text-slate-800 text-[11px]">Ethereum Mainnet</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">VALUATION AUDITOR</span>
                    <span className="font-bold text-slate-800 text-[11px]">{asset.company?.auditor || 'KPMG Certified'}</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
