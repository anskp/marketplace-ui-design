import React, { useState } from 'react';
import { RwaAsset, UserProfile, TxLog } from '../types';
import {
  ArrowLeft,
  ShieldCheck,
  Building2,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Image as ImageIcon,
  Award,
  Globe,
  Lock,
  Share2,
  Heart,
  Activity,
  Coins,
  TrendingUp,
  Check,
  RefreshCw,
  Sparkles,
  PieChart,
  Vote,
  Users,
  Search,
  Filter,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { AssetChart } from './AssetChart';
import { PixelizedOwnershipMap } from './PixelizedOwnershipMap';
import { InvestModal } from './InvestModal';
import { P2pOrderDetailModal, P2pListingItem } from './P2pOrderDetailModal';

interface TokenDetailViewProps {
  asset: RwaAsset;
  allAssets?: RwaAsset[];
  user: UserProfile;
  transactions: TxLog[];
  onBack: () => void;
  onBuyAsset: (asset: RwaAsset, tokensToBuy: number, totalUsdc: number) => void;
  onOpenKycModal: () => void;
  onSelectAsset?: (asset: RwaAsset) => void;
}

export const TokenDetailView: React.FC<TokenDetailViewProps> = ({
  asset,
  allAssets = [],
  user,
  transactions,
  onBack,
  onBuyAsset,
  onOpenKycModal,
  onSelectAsset,
}) => {
  // Navigation view state: 'asset-hub' | 'item-detail'
  const [mainView, setMainView] = useState<'asset-hub' | 'item-detail'>('asset-hub');

  // Modal Popup States
  const [isInvestModalOpen, setIsInvestModalOpen] = useState<boolean>(false);
  const [selectedP2pOrder, setSelectedP2pOrder] = useState<P2pListingItem | null>(null);
  const [isP2pModalOpen, setIsP2pModalOpen] = useState<boolean>(false);

  // 10 Tabs State (NO numbers in labels)
  const [activeTab, setActiveTab] = useState<
    'overview' | 'investment' | 'documents' | 'holders' | 'performance' | 'activity' | 'analytics' | 'vault' | 'governance' | 'about'
  >('overview');

  // Purchase & Trading State
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [sharesInput, setSharesInput] = useState<string>('10');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [txSuccessMessage, setTxSuccessMessage] = useState<string | null>(null);
  const [isProcessingTx, setIsProcessingTx] = useState<boolean>(false);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [votedProposalIds, setVotedProposalIds] = useState<string[]>([]);

  // Calculations
  const tokensToBuy = Math.max(0, parseInt(sharesInput, 10) || 0);
  const totalUsdcCost = tokensToBuy * asset.pricePerToken;
  const ownershipPercentage = ((tokensToBuy / asset.totalTokens) * 100).toFixed(4);
  const annualYieldEstimate = totalUsdcCost * (asset.annualYieldApy / 100);
  
  const isOverSupply = tokensToBuy > asset.availableTokens;
  const isInsufficientBalance = totalUsdcCost > user.balanceUsdc;
  const isKycRestricted = user.kycLevel < 2;

  // Formatting helpers
  const formatNum = (num: number) => num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  const formatCompact = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(2) + 'K';
    return num.toString();
  };

  // Copy Contract Address
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(asset.smartContractAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Execute Buy Order
  const handleExecuteTrade = () => {
    if (tokensToBuy <= 0 || isOverSupply || isInsufficientBalance || isKycRestricted || isProcessingTx) return;

    setIsProcessingTx(true);
    setTimeout(() => {
      onBuyAsset(asset, tokensToBuy, totalUsdcCost);
      setIsProcessingTx(false);
      setTxSuccessMessage(`Successfully settled ${tokensToBuy}x ${asset.symbol} shares via Fireblocks Custody!`);
      setTimeout(() => setTxSuccessMessage(null), 6000);
    }, 1200);
  };

  // Vote Proposal Handler
  const handleVoteProposal = (id: string) => {
    if (votedProposalIds.includes(id)) return;
    setVotedProposalIds([...votedProposalIds, id]);
  };

  // Document list
  const documentsList = (asset as any).documents || [
    { name: `${asset.symbol}_Prospectus_&_Offering_Memorandum.pdf`, type: 'SEC / DFSA Compliant', date: 'Oct 2025', status: 'Verified' },
    { name: `Independent_Property_Valuation_${asset.company?.auditor || 'CBRE'}.pdf`, type: `Valuation: $${formatCompact(asset.pricePerToken * asset.totalTokens)}`, date: 'Updated Q2 2026', status: 'Verified' },
    { name: `Title_Deed_&_KPMG_Audit_Certificate.pdf`, type: 'IPFS Hash: QmX7z...98a2', date: 'Anchored On-Chain', status: 'Verified' },
    { name: `Smart_Contract_Security_Audit_OpenZeppelin.pdf`, type: 'ERC-3643 Permission Audit', date: 'Pass Rate 100%', status: 'Passed ✓' },
  ];

  // Asset transaction logs
  const assetTransactions = transactions.filter(
    (t) => t.symbol === asset.symbol || (t.assetName && t.assetName.includes(asset.symbol))
  );

  // Mock Recent Primary Invest Data (Direct SPV Subscriptions)
  const recentPrimaryInvestments = [
    { id: 'inv-1', wallet: '0x3f81...90a2', shares: 500, price: asset.pricePerToken, total: asset.pricePerToken * 500, time: '5m ago', type: 'Primary Sub' },
    { id: 'inv-2', wallet: '0x71b2...12e4', shares: 1200, price: asset.pricePerToken, total: asset.pricePerToken * 1200, time: '38m ago', type: 'Primary Sub' },
    { id: 'inv-3', wallet: '0x992d...41f0', shares: 250, price: asset.pricePerToken, total: asset.pricePerToken * 250, time: '2h ago', type: 'Primary Sub' },
  ];

  // Mock Secondary Available Options for this Asset (P2P Listings)
  const secondaryP2pListings: P2pListingItem[] = [
    {
      id: `p2p-det-1-${asset.id}`,
      asset: asset,
      sellerName: '@alex_vaults',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      sellerAddress: '0x94f2...381a',
      shares: 150,
      askPrice: asset.pricePerToken - 0.50,
      navPrice: asset.pricePerToken,
      timeAgo: '12m ago',
      expiresIn: 'Ends in 5d',
      verified: true,
    },
    {
      id: `p2p-det-2-${asset.id}`,
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
      id: `p2p-det-3-${asset.id}`,
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

  const handleOpenP2pModal = (item: P2pListingItem) => {
    setSelectedP2pOrder(item);
    setIsP2pModalOpen(true);
  };

  return (
    <div className="-mx-6 -mt-6 md:-mx-10 md:-mt-6 pb-20 bg-white text-slate-900 min-h-screen font-sans selection:bg-blue-600 selection:text-white">

      {/* ================= MAIN VIEW 1: ASSET HUB (OPENSEA LIGHT COLLECTION VIEW) ================= */}
      {mainView === 'asset-hub' && (
        <div className="flex-1 flex flex-col">
          
          {/* FULL VISIBLE TRANSPARENT HERO BANNER WITH OVERLAID HEADER CONTENT */}
          <div className="relative h-80 md:h-[360px] bg-slate-900 overflow-hidden w-full shrink-0">
            {/* Asset Background Image */}
            <img
              src={asset.image}
              alt={asset.title}
              className="w-full h-full object-cover brightness-90 contrast-105"
            />
            
            {/* Transparent Gradient Overlay so Image & Header Content are both fully visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/30" />

            {/* Top Navigation Overlay */}
            <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between">
              <button
                onClick={onBack}
                className="bg-white/90 hover:bg-white text-slate-900 font-bold px-4 py-1.5 rounded-full border border-white/30 shadow-md flex items-center gap-1.5 transition text-xs cursor-pointer backdrop-blur-md"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-700" />
                <span>Marketplace</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-2 rounded-full border shadow-md transition cursor-pointer backdrop-blur-md ${
                    isFavorited ? 'bg-rose-500/90 border-rose-400 text-white' : 'bg-black/40 border-white/20 text-white hover:bg-black/60'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-white' : ''}`} />
                </button>
                <button
                  onClick={handleCopyAddress}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white shadow-md transition cursor-pointer backdrop-blur-md"
                  title="Copy Smart Contract Address"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* OVERLAID HEADER CONTENT AT BOTTOM OF HERO IMAGE */}
            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 pt-12 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
              
              {/* Left Identity Section */}
              <div className="flex items-end gap-4 md:gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white border-2 border-white/60 shadow-2xl overflow-hidden shrink-0">
                  <img
                    src={asset.image}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
                      {asset.title}
                    </h1>
                    <span className="bg-blue-500 text-white rounded-full p-0.5 shadow-sm" title="Verified RWA Asset">
                      <CheckCircle2 className="w-4 h-4 text-white fill-blue-500" />
                    </span>
                  </div>

                  {/* Metadata Tags */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-200 font-mono flex-wrap drop-shadow-sm">
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 font-sans font-semibold text-[11px]">
                      BY {asset.company?.name || 'EMAAR PROPERTIES'}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 font-sans font-semibold text-[11px] text-blue-300">
                      ◆ ETHEREUM
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 font-sans font-semibold text-[11px]">
                      {asset.category.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/20 font-sans font-semibold text-[11px]">
                      ERC-3643
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Inline Stats Overlay */}
              <div className="flex items-center gap-6 md:gap-8 text-xs font-mono bg-black/40 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <div>
                  <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider">NAV PRICE</div>
                  <div className="text-sm font-extrabold text-white mt-0.5">${asset.pricePerToken.toFixed(2)} USDC</div>
                </div>

                <div className="border-l border-white/15 pl-6">
                  <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider">TARGET YIELD</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">+{asset.annualYieldApy}% APY</div>
                </div>

                <div className="border-l border-white/15 pl-6 hidden sm:block">
                  <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider">TOTAL VALUATION</div>
                  <div className="text-sm font-bold text-white mt-0.5">${formatCompact(asset.pricePerToken * asset.totalTokens)}</div>
                </div>

                <div className="border-l border-white/15 pl-6 hidden lg:block">
                  <div className="text-[10px] text-slate-400 font-sans font-bold uppercase tracking-wider">OWNERS</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">18,234</div>
                </div>
              </div>

            </div>
          </div>

          {/* TABS NAVIGATION BAR (LEFT: PLAIN TABS WITHOUT NUMBERS, RIGHT: SINGLE INVEST BUTTON) */}
          <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-2 sticky top-0 z-30 flex items-center justify-between gap-4">
            
            {/* Left side: Tabs list WITHOUT NUMBERS */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold text-slate-500 whitespace-nowrap no-scrollbar">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'investment', label: 'Investment' },
                { id: 'documents', label: 'Documents' },
                { id: 'holders', label: 'Holders' },
                { id: 'performance', label: 'Performance' },
                { id: 'activity', label: 'Activity' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'vault', label: 'Vault' },
                { id: 'governance', label: 'Governance' },
                { id: 'about', label: 'About' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2.5 transition cursor-pointer border-b-2 font-medium ${
                    activeTab === tab.id
                      ? 'border-slate-900 text-slate-900 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right side: Single Invest / Trade Button */}
            <div className="shrink-0">
              <button
                onClick={() => setIsInvestModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Coins className="w-4 h-4" />
                <span>Invest / Trade</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT CONTAINER (LIGHT THEME LAYOUT) */}
          <div className="px-6 md:px-10 py-8 space-y-8 max-w-7xl mx-auto w-full">

            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column Description */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Asset Overview & Thesis
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {asset.description || asset.company?.description || (
                          `This asset represents direct fractional exposure to prime ${asset.category.replace('_', ' ')} real world assets yielding recurring income. Tokenized on Ethereum via the ERC-3643 permissioned standard, fractional token holders receive daily or quarterly yield distributions paid directly in USDC via the Real Estate Income Vault.`
                        )}
                      </p>
                    </div>

                    {/* AI Insights Block */}
                    <div className="bg-blue-50/60 border border-blue-200/80 p-4 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-2 font-mono text-blue-800 font-bold text-xs">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>COPYm AI Performance Summary</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed">
                        Occupancy / Reserve coverage remains stable at 98.4%. Dividend coverage ratio is 1.42x. Property valuation refreshed 28 days ago by {asset.company?.auditor || 'CBRE'} showing +2.1% quarterly appreciation. Low volatility profile with verified bankruptcy-remote SPV title collateral.
                      </p>
                    </div>

                    {/* Photo Gallery Grid */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Asset Gallery & Inspection Photos
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        <img src={asset.image} alt="View 1" className="rounded-xl border border-slate-200 h-36 object-cover w-full shadow-xs" />
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400" alt="View 2" className="rounded-xl border border-slate-200 h-36 object-cover w-full shadow-xs" />
                        <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400" alt="View 3" className="rounded-xl border border-slate-200 h-36 object-cover w-full shadow-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column Proof-of-Reserve */}
                  <div className="lg:col-span-4 space-y-4 border-l border-slate-200 pl-0 lg:pl-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Proof-of-Reserve Verification</span>
                    </h3>

                    <div className="space-y-3 font-mono text-xs divide-y divide-slate-100">
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Physical Title Deed</span>
                        <span className="text-emerald-700 font-bold">Verified ({asset.company?.jurisdiction || 'DIFC'})</span>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Escrow Reserve</span>
                        <span className="text-slate-900 font-bold">${formatNum(asset.pricePerToken * (asset.totalTokens - asset.availableTokens))} USDC</span>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Chainlink Oracles</span>
                        <span className="text-blue-600 font-bold">Active (1h Heartbeat)</span>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Health Score</span>
                        <span className="text-emerald-700 font-bold">98 / 100 (Optimal)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRIMARY INVESTMENT */}
            {activeTab === 'investment' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Primary Offering Details & Recent Secondary Trades */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Primary Offering Card */}
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Primary Offering (SPV Treasury)
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                            Direct Token Subscription & Issuance
                          </h3>
                        </div>
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200">
                          +{asset.annualYieldApy}% Target APY
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Purchase shares directly from the issuing SPV ({asset.company?.name || 'Copym RWA SPV'}). Issued tokens are credited instantly to your Fireblocks institutional custody wallet and begin accruing yield upon settlement.
                      </p>

                      {/* Primary Offering Progress Bar */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-500">Allocation Progress</span>
                          <span className="text-slate-900 font-bold">
                            {formatCompact(asset.totalTokens - asset.availableTokens)} / {formatCompact(asset.totalTokens)} Shares Subscribed ({(((asset.totalTokens - asset.availableTokens) / asset.totalTokens) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(((asset.totalTokens - asset.availableTokens) / asset.totalTokens) * 100).toFixed(1)}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-700 border-t border-slate-200">
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">ISSUE PRICE</span>
                          <span className="font-extrabold text-slate-900">${asset.pricePerToken.toFixed(2)} USDC</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">CUSTODY</span>
                          <span className="font-bold text-slate-900">Fireblocks Trust</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">MIN INVESTMENT</span>
                          <span className="font-bold text-slate-900">1 Share (${asset.pricePerToken.toFixed(2)})</span>
                        </div>
                      </div>
                    </div>

                    {/* 1. RECENT PRIMARY INVESTMENTS (DIRECT SPV SUBSCRIPTIONS) */}
                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Recent Primary Investments (3 Direct Subscriptions)
                          </h3>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                          SPV Treasury Treasury
                        </span>
                      </div>

                      <div className="space-y-2">
                        {recentPrimaryInvestments.map((inv) => (
                          <div key={inv.id} className="flex items-center justify-between p-3 bg-blue-50/40 border border-blue-100 rounded-xl font-mono text-xs">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-sans bg-blue-600 text-white">
                                {inv.type}
                              </span>
                              <div>
                                <span className="font-bold text-slate-900">{inv.shares} {asset.symbol}</span>
                                <span className="text-slate-500 text-[11px] ml-2">by {inv.wallet}</span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="font-bold text-slate-900">${formatNum(inv.total)} USDC</div>
                              <div className="text-[10px] text-slate-400">{inv.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. SECONDARY AVAILABLE OPTIONS FOR THIS ASSET (P2P LISTINGS) */}
                    <div className="space-y-3 pt-3">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-purple-600" />
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Secondary Available Options for {asset.symbol}
                          </h3>
                        </div>
                        <span className="text-[11px] text-purple-700 font-mono font-bold">
                          Click option for P2P Popup & Asset Link
                        </span>
                      </div>

                      <div className="space-y-2">
                        {secondaryP2pListings.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => handleOpenP2pModal(opt)}
                            className="flex items-center justify-between p-3 bg-purple-50/50 hover:bg-purple-100/60 border border-purple-200/80 rounded-xl font-mono text-xs transition cursor-pointer group shadow-xs"
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

                              <button className="px-3 py-1 bg-purple-600 group-hover:bg-purple-700 text-white font-extrabold text-[11px] rounded-lg font-sans transition flex items-center gap-1">
                                <span>Buy P2P</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Primary Subscription Execution Form */}
                  <div className="lg:col-span-5 space-y-4 border-l border-slate-200 pl-0 lg:pl-8">
                    <h3 className="text-sm font-bold text-slate-900 uppercase">Primary Subscription</h3>

                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-slate-500 mb-1 text-[11px] font-sans">
                          <span>Subscription Quantity ({asset.symbol})</span>
                          <span>Available: {formatCompact(asset.availableTokens)}</span>
                        </div>
                        <input
                          type="number"
                          min="1"
                          max={asset.availableTokens}
                          value={sharesInput}
                          onChange={(e) => setSharesInput(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                        />
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-[11px] font-sans">
                        <div className="flex justify-between text-slate-600">
                          <span>Unit NAV Issue Price:</span>
                          <span className="text-slate-900 font-bold">${asset.pricePerToken.toFixed(2)} USDC</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Cap Table Share:</span>
                          <span className="text-blue-600 font-bold">{ownershipPercentage}%</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Est. Annual Yield (+{asset.annualYieldApy}% APY):</span>
                          <span className="text-emerald-600 font-bold">+${annualYieldEstimate.toFixed(2)} USDC/yr</span>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-xs text-slate-900">
                          <span>Total Settlement:</span>
                          <span className="text-emerald-600 text-sm">${formatNum(totalUsdcCost)} USDC</span>
                        </div>
                      </div>

                      {/* KYC Restriction Check */}
                      {isKycRestricted && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] space-y-1.5 font-sans">
                          <div className="flex items-center gap-1.5 font-bold">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span>Institutional Clearance Required</span>
                          </div>
                          <p>ERC-3643 compliant transfers require verified Identity Clearance before settlement.</p>
                          <button
                            onClick={onOpenKycModal}
                            className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs cursor-pointer transition"
                          >
                            Verify Identity Now
                          </button>
                        </div>
                      )}

                      {/* Success Alert */}
                      {txSuccessMessage && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{txSuccessMessage}</span>
                        </div>
                      )}

                      <button
                        onClick={handleExecuteTrade}
                        disabled={isOverSupply || isInsufficientBalance || tokensToBuy <= 0 || isKycRestricted || isProcessingTx}
                        className={`w-full py-3.5 rounded-xl font-bold text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                          isOverSupply || isInsufficientBalance || tokensToBuy <= 0 || isKycRestricted
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {isProcessingTx ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>Settling On-Chain...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-white" />
                            <span>Confirm Primary Subscription ({tokensToBuy} Shares)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Verified Legal & Compliance Documents</span>
                </h3>

                <div className="divide-y divide-slate-100 border-t border-b border-slate-200 font-mono text-xs">
                  {documentsList.map((doc: any, i: number) => (
                    <div
                      key={i}
                      className="py-3.5 flex items-center justify-between hover:bg-slate-50 transition px-2 cursor-pointer"
                      onClick={() => alert(`Opening ${doc.name}`)}
                    >
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900 flex items-center gap-2 font-sans">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{doc.name}</span>
                        </p>
                        <p className="text-[11px] text-slate-500">{doc.type} • {doc.date}</p>
                      </div>
                      <span className="text-blue-600 hover:underline font-bold flex items-center gap-1 font-sans">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: HOLDERS (CAP TABLE) */}
            {activeTab === 'holders' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Beneficial Ownership Register (Cap Table)</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Total Tokens: {formatNum(asset.totalTokens)}</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-200 text-[10px] uppercase tracking-wider font-sans">
                        <th className="pb-3">INVESTOR</th>
                        <th className="pb-3">TIER</th>
                        <th className="pb-3">COUNTRY</th>
                        <th className="pb-3">SHARES</th>
                        <th className="pb-3">% OWNERSHIP</th>
                        <th className="pb-3">AVG PRICE</th>
                        <th className="pb-3">CURRENT VALUE</th>
                        <th className="pb-3">GAIN / LOSS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 font-bold text-slate-900">Mubadala Investment Co</td>
                        <td><span className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded text-[10px] font-sans font-medium">Sovereign</span></td>
                        <td>🇦🇪 UAE</td>
                        <td className="font-bold text-slate-900">{formatCompact(Math.round(asset.totalTokens * 0.142))}</td>
                        <td>14.20%</td>
                        <td>${(asset.pricePerToken * 0.95).toFixed(2)}</td>
                        <td>${formatCompact(asset.pricePerToken * asset.totalTokens * 0.142)}</td>
                        <td className="text-emerald-600 font-bold">+${formatCompact(asset.pricePerToken * asset.totalTokens * 0.142 * 0.05)}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/80">
                        <td className="py-3 font-bold text-slate-900">BlackRock Real Estate Fund</td>
                        <td><span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-sans font-medium">Institutional</span></td>
                        <td>🇺🇸 USA</td>
                        <td className="font-bold text-slate-900">{formatCompact(Math.round(asset.totalTokens * 0.102))}</td>
                        <td>10.22%</td>
                        <td>${(asset.pricePerToken * 0.97).toFixed(2)}</td>
                        <td>${formatCompact(asset.pricePerToken * asset.totalTokens * 0.102)}</td>
                        <td className="text-emerald-600 font-bold">+${formatCompact(asset.pricePerToken * asset.totalTokens * 0.102 * 0.03)}</td>
                      </tr>
                      {user.ownedTokens > 0 && (
                        <tr className="bg-blue-50/40">
                          <td className="py-3 font-bold text-blue-700">{user.name} (Your Account)</td>
                          <td><span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-sans font-medium">Connected User</span></td>
                          <td>🇺🇸 USA</td>
                          <td className="font-bold text-slate-900">{user.ownedTokens}</td>
                          <td>{((user.ownedTokens / asset.totalTokens) * 100).toFixed(2)}%</td>
                          <td>${asset.pricePerToken.toFixed(2)}</td>
                          <td>${formatNum(user.ownedTokens * asset.pricePerToken)}</td>
                          <td className="text-emerald-600 font-bold">+$0.00</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pixelized Ownership Grid Component */}
                <PixelizedOwnershipMap asset={asset} />
              </div>
            )}

            {/* TAB 5: PERFORMANCE */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2 border-b border-slate-200">
                  <div>
                    <p className="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider">NET OPERATING INCOME</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1 font-mono">${formatCompact(asset.pricePerToken * asset.totalTokens * 0.072)} / yr</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider">CAP RATE</p>
                    <p className="text-xl font-extrabold text-emerald-600 mt-1 font-mono">7.16%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider">OCCUPANCY / RESERVE</p>
                    <p className="text-xl font-extrabold text-blue-600 mt-1 font-mono">98.40%</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-sans font-bold text-[10px] uppercase tracking-wider">SHARPE RATIO</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-1 font-mono">1.84</p>
                  </div>
                </div>

                {/* Price Chart */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span>Valuation & Secondary Trading Index</span>
                  </h3>
                  <AssetChart data={asset.chartHistory || []} category={asset.category} />
                </div>
              </div>
            )}

            {/* TAB 6: ACTIVITY */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>On-Chain Settlement Logs</span>
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-200 text-[10px] uppercase font-sans font-bold">
                        <th className="pb-3">EVENT</th>
                        <th className="pb-3">INVESTOR / WALLET</th>
                        <th className="pb-3">SHARES</th>
                        <th className="pb-3">NAV</th>
                        <th className="pb-3">STATUS</th>
                        <th className="pb-3">HASH</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {assetTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                            No recent transactions recorded for {asset.symbol}.
                          </td>
                        </tr>
                      ) : (
                        assetTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50">
                            <td className="py-3">
                              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] border border-emerald-200 uppercase font-bold font-sans">
                                {tx.type}
                              </span>
                            </td>
                            <td className="font-mono text-slate-900">0x4898...c839</td>
                            <td className="font-bold text-slate-900">{tx.amount}</td>
                            <td>${asset.pricePerToken.toFixed(2)}</td>
                            <td className="text-emerald-600 font-bold">Settled ✓</td>
                            <td className="text-blue-600 font-mono underline cursor-pointer">{tx.hash.slice(0, 10)}...</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 7: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-slate-200 pb-6">
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ESG Risk Rating</h3>
                    <div className="text-4xl font-extrabold text-emerald-600 font-mono">AA+</div>
                    <p className="text-slate-600 text-xs">LEED Platinum Certified & Independently Audited Environmental Score.</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net Institutional Inflows (30D)</h3>
                    <div className="text-4xl font-extrabold text-blue-600 font-mono">+${formatCompact(asset.pricePerToken * 120000)}</div>
                    <p className="text-slate-600 text-xs">Positive liquidity depth from institutional market makers.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 8: VAULT */}
            {activeTab === 'vault' && (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900 uppercase">Real Estate Income Vault #4</h3>
                  <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">Active & Distributing</span>
                </div>
                <p className="text-slate-600 text-xs font-mono">Vault Smart Contract: <span className="text-blue-600">{asset.smartContractAddress}</span></p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">CASH ESCROW RESERVE (USDC)</p>
                    <p className="text-xl font-bold text-slate-900 font-mono">${formatNum(asset.pricePerToken * (asset.totalTokens - asset.availableTokens))}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">YIELD DISTRIBUTION STRATEGY</p>
                    <p className="text-xl font-bold text-emerald-600 font-mono">Automated Direct-to-Wallet</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 9: GOVERNANCE */}
            {activeTab === 'governance' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Vote className="w-4 h-4 text-blue-600" />
                  <span>Active Shareholder Voting Proposals</span>
                </h3>

                <div className="divide-y divide-slate-100 border-t border-b border-slate-200">
                  {[
                    { id: 'prop-1', title: 'PROP-042: Refinancing Commercial Debt Facilities', detail: 'Quorum: 68% Reached • Voting Closes in 2 days' },
                    { id: 'prop-2', title: 'PROP-043: Q3 Dividend Reinvestment Allocation', detail: 'Quorum: 42% Reached • Voting Closes in 5 days' },
                  ].map((prop) => (
                    <div key={prop.id} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{prop.title}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{prop.detail}</p>
                      </div>
                      <button
                        onClick={() => handleVoteProposal(prop.id)}
                        disabled={votedProposalIds.includes(prop.id)}
                        className={`font-bold px-4 py-2 rounded-lg text-xs transition cursor-pointer ${
                          votedProposalIds.includes(prop.id)
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {votedProposalIds.includes(prop.id) ? 'Voted ✓' : 'Vote Now'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 10: ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-4 font-mono text-xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase font-sans">Issuer & Legal Entity Information</h3>
                <div className="space-y-2.5 text-slate-700 pt-3 border-t border-slate-200">
                  <p><strong className="text-slate-900 font-sans">Legal Entity:</strong> {asset.company?.name || 'Copym RWA Issuance SPV Ltd'}</p>
                  <p><strong className="text-slate-900 font-sans">Trustee Custodian:</strong> {asset.company?.custodian || 'Fireblocks Digital Trust Corp'}</p>
                  <p><strong className="text-slate-900 font-sans">Independent Auditor:</strong> {asset.company?.auditor || 'PwC Web3 Audit'}</p>
                  <p><strong className="text-slate-900 font-sans">Jurisdiction:</strong> {asset.company?.jurisdiction || 'DIFC / Delaware'}</p>
                  <p className="flex items-center gap-2">
                    <strong className="text-slate-900 font-sans">Smart Contract Address:</strong>
                    <span className="text-blue-600 font-mono">{asset.smartContractAddress}</span>
                    <button onClick={handleCopyAddress} className="text-slate-400 hover:text-slate-900 cursor-pointer ml-1">
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* INVEST POPUP MODAL (OPENSEA LIGHT THEME) */}
      <InvestModal
        asset={asset}
        allAssets={allAssets.length > 0 ? allAssets : [asset]}
        user={user}
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        onBuyAsset={onBuyAsset}
        onSelectP2pOption={(p2pListing) => {
          setIsInvestModalOpen(false);
          setSelectedP2pOrder(p2pListing);
          setIsP2pModalOpen(true);
        }}
        onSelectAssetFromCarousel={(carouselAsset) => {
          setIsInvestModalOpen(false);
          if (onSelectAsset) {
            onSelectAsset(carouselAsset);
          }
        }}
      />

      {/* P2P SECONDARY ORDER DETAILS POPUP MODAL */}
      <P2pOrderDetailModal
        order={selectedP2pOrder}
        user={user}
        isOpen={isP2pModalOpen}
        onClose={() => setIsP2pModalOpen(false)}
        onBuyP2p={(targetAsset, shares, totalUsdc) => {
          onBuyAsset(targetAsset, shares, totalUsdc);
        }}
        onGoToAssetDetail={(targetAsset) => {
          setIsP2pModalOpen(false);
          if (onSelectAsset) {
            onSelectAsset(targetAsset);
          }
        }}
      />

    </div>
  );
};
