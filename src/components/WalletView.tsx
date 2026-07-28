import React, { useState } from 'react';
import { UserProfile, PortfolioHolding, TxLog } from '../types';
import {
  Search,
  ChevronDown,
  Check,
  Star,
  PlusCircle,
  Eye,
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Layers,
  Award,
  CircleDollarSign,
  TrendingUp,
  Settings,
  KeyRound,
  QrCode,
  Bell,
  FileCode,
  ExternalLink,
  Lock,
  Smartphone,
  CheckCircle2,
  Copy,
  Edit3,
  MoreHorizontal,
  ChevronRight,
  Download,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  User,
  Shield,
  FileBadge,
  History,
  Info,
} from 'lucide-react';

interface WalletViewProps {
  user: UserProfile;
  holdings: PortfolioHolding[];
  onOpenKycModal: () => void;
  onTopUpUsdc: (amount: number) => void;
  transactions?: TxLog[];
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  holdings,
  onOpenKycModal,
  onTopUpUsdc,
  transactions = [],
}) => {
  const [activeTab, setActiveTab] = useState<
    'galleries' | 'items' | 'tokens' | 'portfolio' | 'listings' | 'offers' | 'created' | 'watchlist' | 'favorites' | 'activity' | 'settings'
  >('tokens');

  const [selectedWalletFilter, setSelectedWalletFilter] = useState<'all' | 'evm' | 'solana' | '0x5537'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'listed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [topUpAmount, setTopUpAmount] = useState<number>(10000);
  const [isTopUpSuccess, setIsTopUpSuccess] = useState<boolean>(false);
  const [isClaimedYield, setIsClaimedYield] = useState<boolean>(false);
  const [canceledListings, setCanceledListings] = useState<string[]>([]);
  const [acceptedOffers, setAcceptedOffers] = useState<string[]>([]);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>(user.name);
  const [profileBio, setProfileBio] = useState<string>(
    'Institutional RWA Investor • DIFC Vault Custody • Fireblocks Multi-Sig Verified'
  );
  const [copiedDid, setCopiedDid] = useState<boolean>(false);

  // Settings sub-states
  const [showMoreSettings, setShowMoreSettings] = useState<boolean>(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true);
  const [show2FaModal, setShow2FaModal] = useState<boolean>(false);
  
  // Password Reset state
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<string>('');

  // Notifications toggles
  const [notifEmailYield, setNotifEmailYield] = useState<boolean>(true);
  const [notifEmailOffers, setNotifEmailOffers] = useState<boolean>(true);
  const [notifTelegram, setNotifTelegram] = useState<boolean>(true);
  const [notifKycAlerts, setNotifKycAlerts] = useState<boolean>(true);

  // History Filter in Settings
  const [txTypeFilter, setTxTypeFilter] = useState<string>('ALL');

  const totalHoldingsValue = holdings.reduce((acc, h) => acc + h.totalValue, 0);
  const totalNetWorth = user.balanceUsdc + totalHoldingsValue;

  const handleDepositUsdc = () => {
    if (topUpAmount > 0) {
      onTopUpUsdc(topUpAmount);
      setIsTopUpSuccess(true);
      setTimeout(() => setIsTopUpSuccess(false), 2500);
    }
  };

  const handleClaimYield = () => {
    setIsClaimedYield(true);
    setTimeout(() => setIsClaimedYield(false), 3000);
  };

  const handleCopyDid = () => {
    navigator.clipboard.writeText(user.holderDid);
    setCopiedDid(true);
    setTimeout(() => setCopiedDid(false), 2000);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordStatusMsg('Please enter your current password.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatusMsg('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatusMsg('New passwords do not match.');
      return;
    }

    setPasswordStatusMsg('✓ Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordStatusMsg(''), 3000);
  };

  // Sample security tokens matching OpenSea RWA style
  const rwaTokens = [
    {
      id: "dmt-6752",
      name: "Manhattan Prime Suite Token #6752",
      collection: "Manhattan Prime Commercial Tower",
      image: "https://images.unsplash.com/photo-1542362567-b07eac79094d?auto=format&fit=crop&q=80&w=600",
      shares: "4,500 Shares",
      value: "$450,000.00",
      yield: "8.42% APY",
      wallet: "0x5537",
      isListed: true,
      category: "Real Estate"
    },
    {
      id: "art-8821",
      name: "Jean-Michel Basquiat (1982 Untitled) #012",
      collection: "Sotheby's Fine Art Vault",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=600",
      shares: "1,200 Shares",
      value: "$368,000.00",
      yield: "Appreciation",
      wallet: "0x5537",
      isListed: true,
      category: "Fine Art"
    },
    {
      id: "co2-9921",
      name: "Amazon Rainforest Carbon Offset Credit Pool",
      collection: "BioCarbon Reserve Earth",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=600",
      shares: "20,000 Credits",
      value: "$276,000.00",
      yield: "6.10% APY",
      wallet: "solana",
      isListed: false,
      category: "Carbon Offsets"
    },
    {
      id: "dubai-204",
      name: "Dubai Marina Commercial Tower #204",
      collection: "Emaar Properties SPV",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      shares: "2,500 Shares",
      value: "$250,000.00",
      yield: "7.80% APY",
      wallet: "evm",
      isListed: false,
      category: "Real Estate"
    }
  ];

  const filteredTokens = rwaTokens.filter((token) => {
    const matchesQuery = token.name.toLowerCase().includes(searchQuery.toLowerCase()) || token.collection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWallet = selectedWalletFilter === 'all' || token.wallet === selectedWalletFilter;
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'listed' && token.isListed);
    return matchesQuery && matchesWallet && matchesStatus;
  });

  const filteredTxs = transactions.filter((tx) => {
    if (txTypeFilter === 'ALL') return true;
    return tx.type === txTypeFilter;
  });

  return (
    <div className="space-y-6 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* OPENSEA LIGHT THEME PROFILE HEADER WITH CENTER WAVE CURL */}
      <div className="relative mb-6">
        
        {/* SVG Definition for Object-Bounding-Box Wave Clip Path */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <clipPath id="heroWaveClip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 1 0 L 1 0.48 L 0.58 0.48 C 0.50 0.48, 0.50 0.98, 0.42 0.98 L 0 0.98 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Wave Gradient Hero Container */}
        <div 
          className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 relative rounded-3xl overflow-hidden shadow-md min-h-[290px] sm:min-h-[280px] p-6 sm:p-8 flex flex-col justify-between"
          style={{ clipPath: 'url(#heroWaveClip)', WebkitClipPath: 'url(#heroWaveClip)' }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent)] pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Verification & Quick Actions */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>INSTITUTIONAL RWA VAULT #0x5537</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenKycModal}
                className="bg-white/90 hover:bg-white text-slate-900 px-3.5 py-1.5 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>KYC Level {user.kycLevel} ✓</span>
              </button>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="bg-black/40 hover:bg-black/60 text-white p-2 rounded-xl backdrop-blur-md border border-white/20 transition cursor-pointer"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Left Area (Inside the lower wave area): Avatar & User Info */}
          <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 pt-4 pb-2 max-w-2xl">
            {/* Pixelated Avatar logo inside hero */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white/80 bg-gradient-to-tr from-blue-500 via-indigo-500 to-emerald-400 p-1.5 shadow-2xl shrink-0 flex items-center justify-center relative bg-slate-900">
              <div className="grid grid-cols-3 gap-1 w-full h-full rounded-full overflow-hidden bg-slate-900 p-2.5">
                <div className="bg-blue-400 rounded-xs" />
                <div className="bg-emerald-400 rounded-xs" />
                <div className="bg-blue-400 rounded-xs" />
                <div className="bg-purple-400 rounded-xs" />
                <div className="bg-blue-500 rounded-xs" />
                <div className="bg-purple-400 rounded-xs" />
                <div className="bg-emerald-400 rounded-xs" />
                <div className="bg-blue-400 rounded-xs" />
                <div className="bg-emerald-400 rounded-xs" />
              </div>
            </div>

            {/* Username, Edit Name, Badges & Wallets Pill */}
            <div className="space-y-1.5 text-white">
              <div className="flex items-center space-x-2.5">
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="text-2xl font-black text-slate-900 border-b-2 border-blue-600 focus:outline-none bg-white px-2 py-0.5 rounded"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{profileName}</h1>
                )}

                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center space-x-1 backdrop-blur-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VERIFIED INVESTOR</span>
                </span>

                {/* Options Menu Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    className="p-1.5 hover:bg-white/20 rounded-lg text-white/80 transition cursor-pointer"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                  {isOptionsOpen && (
                    <div className="absolute left-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs font-mono space-y-1 text-slate-900">
                      <button
                        onClick={() => { setActiveTab('settings'); setIsOptionsOpen(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg font-bold text-slate-800 flex items-center space-x-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-500" />
                        <span>Account Settings</span>
                      </button>
                      <button
                        onClick={() => { handleCopyDid(); setIsOptionsOpen(false); }}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-slate-700 flex items-center space-x-2 cursor-pointer"
                      >
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copy Holder DID</span>
                      </button>
                      <button
                        onClick={onOpenKycModal}
                        className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-slate-700 flex items-center space-x-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-slate-500" />
                        <span>Upgrade KYC Tier</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-blue-100/90 font-medium line-clamp-2 max-w-md">{profileBio}</p>

              {/* Joined Date & 3 Wallets Dropdown */}
              <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                <span className="bg-black/30 border border-white/20 px-2.5 py-1 rounded-lg text-blue-100 font-bold text-[10px] uppercase backdrop-blur-md">
                  JOINED JUL 2026
                </span>

                {/* 3 Wallets Dropdown Pill */}
                <div className="relative">
                  <button
                    onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                    className="bg-black/30 hover:bg-black/50 border border-white/20 px-2.5 py-1 rounded-lg font-bold text-white text-[10px] flex items-center space-x-1.5 transition cursor-pointer backdrop-blur-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>3 WALLETS</span>
                    <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                  </button>

                  {isWalletDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl p-2.5 z-50 shadow-xl font-mono text-xs space-y-1.5 text-slate-900">
                      <div className="p-1.5 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase">
                        COMPLIANT MULTI-CHAIN WALLETS
                      </div>
                      <div className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200">
                        <div>
                          <span className="font-bold text-slate-900 block">EVM Mainnet</span>
                          <span className="text-[10px] text-slate-500">{user.walletAddress}</span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded font-bold">Active</span>
                      </div>
                      <div className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200">
                        <div>
                          <span className="font-bold text-slate-900 block">Solana Vault</span>
                          <span className="text-[10px] text-slate-500">7xP9...3mL1</span>
                        </div>
                        <span className="bg-purple-50 text-purple-700 text-[9px] px-1.5 py-0.5 rounded font-bold">SPL</span>
                      </div>
                      <div className="p-2 hover:bg-slate-50 rounded-lg flex items-center justify-between cursor-pointer border border-transparent hover:border-slate-200">
                        <div>
                          <span className="font-bold text-slate-900 block">Arbitrum Treasury</span>
                          <span className="text-[10px] text-slate-500">0x98a1...11b2</span>
                        </div>
                        <span className="bg-blue-50 text-blue-700 text-[9px] px-1.5 py-0.5 rounded font-bold">L2</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Header Stats - Positioned cleanly on light background below the right wave curve */}
        <div className="mt-4 lg:mt-0 lg:absolute lg:right-6 lg:bottom-4 z-20 flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs px-2">
          <div>
            <div className="flex items-center space-x-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <span>USD VALUE</span>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              ${totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="border-l border-slate-200 pl-6 sm:pl-8">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">NFTS</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">0%</p>
          </div>

          <div className="border-l border-slate-200 pl-6 sm:pl-8">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">TOKENS</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">100%</p>
          </div>

          <div className="border-l border-slate-200 pl-6 sm:pl-8">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">BLENDED YIELD</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5">8.42%</p>
          </div>
        </div>

      </div>

        {/* ALL OPENSEA NAVIGATION TABS (Includes Settings) */}
        <div className="flex items-center space-x-6 sm:space-x-8 text-sm font-bold text-slate-500 pt-2 border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none px-2">
            <button
              onClick={() => setActiveTab('galleries')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'galleries' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Galleries</span>
            </button>

            <button
              onClick={() => setActiveTab('items')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'items' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Items</span>
            </button>

            <button
              onClick={() => setActiveTab('tokens')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'tokens' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Tokens</span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs font-mono">4</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'portfolio' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'listings' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Listings</span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs font-mono">2</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'offers' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Offers</span>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full text-xs font-mono font-bold">1 New</span>
            </button>

            <button
              onClick={() => setActiveTab('created')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'created' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Created</span>
            </button>

            <button
              onClick={() => setActiveTab('watchlist')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'watchlist' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Watchlist</span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'favorites' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Favorites</span>
              <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-xs font-mono">3</span>
            </button>

            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-3.5 transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'activity' ? 'border-b-2 border-slate-900 text-slate-900 font-extrabold' : 'hover:text-slate-900'
              }`}
            >
              <span>Activity</span>
            </button>
          </div>

      {/* MAIN BODY AREA (UNBOXED LIGHT THEME) */}
      <div className="flex flex-col md:flex-row min-h-[500px] gap-6">
        
        {/* Left Filter Drawer */}
        <div className="w-full md:w-64 border border-slate-200 bg-white p-4 space-y-6 shrink-0 rounded-2xl h-fit shadow-xs font-sans">
          <div className="flex justify-between items-center text-slate-500 font-mono text-xs font-bold border-b border-slate-100 pb-2">
              <span>FILTERS</span>
              <button
                onClick={() => { setSelectedWalletFilter('all'); setStatusFilter('all'); }}
                className="p-1 hover:bg-slate-100 rounded text-[10px] text-slate-500 cursor-pointer"
              >
                RESET
              </button>
            </div>

            {/* Status Filter */}
            <div className="space-y-2.5">
              <div className="font-bold text-xs text-slate-800 flex justify-between">
                <span>Status</span>
                <span className="text-slate-400">^</span>
              </div>
              <div className="flex gap-2 font-mono">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition ${
                    statusFilter === 'all'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('listed')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer transition ${
                    statusFilter === 'listed'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Listed
                </button>
              </div>
            </div>

            {/* Wallets Filter Section */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="font-bold text-xs text-slate-800 flex justify-between">
                <span>Wallets</span>
                <span className="text-slate-400">^</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <button
                  onClick={() => setSelectedWalletFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition ${
                    selectedWalletFilter === 'all'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  <span>All Wallets</span>
                </button>
                <button
                  onClick={() => setSelectedWalletFilter('evm')}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 cursor-pointer transition ${
                    selectedWalletFilter === 'evm'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>EVM Wallet</span>
                </button>
                <button
                  onClick={() => setSelectedWalletFilter('solana')}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 cursor-pointer transition ${
                    selectedWalletFilter === 'solana'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Solana Wallet</span>
                </button>
                <button
                  onClick={() => setSelectedWalletFilter('0x5537')}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center space-x-2 cursor-pointer transition ${
                    selectedWalletFilter === '0x5537'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>0x5537...c583</span>
                </button>
              </div>
            </div>

            {/* Asset Class Category Filter */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="font-bold text-xs text-slate-800 flex justify-between">
                <span>Asset Class</span>
                <span className="text-slate-400">^</span>
              </div>
              <div className="space-y-2 text-xs font-medium text-slate-600">
                <label className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Real Estate</span>
                </label>
                <label className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Fine Art Vaults</span>
                </label>
                <label className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Carbon Offsets</span>
                </label>
                <label className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 rounded cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Private Credit</span>
                </label>
              </div>
            </div>

            {/* USDC Balance Top-up Tool */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="font-bold text-xs text-slate-800 flex items-center space-x-1.5">
                <PlusCircle className="w-4 h-4 text-blue-600" />
                <span>Top Up USDC Vault</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step={5000}
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                />
                <button
                  onClick={handleDepositUsdc}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono cursor-pointer transition shrink-0 shadow-xs"
                >
                  {isTopUpSuccess ? '✓' : 'Add'}
                </button>
              </div>
            </div>
          </div>

        {/* Right Content Panels */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* TAB 1: GALLERIES */}
          {activeTab === 'galleries' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">Curated RWA Art & Real Estate Galleries</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No custom exhibition galleries created yet. Save tokenized Basquiat paintings or Emaar towers into custom public showcases.
              </p>
              <button
                onClick={() => setActiveTab('tokens')}
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Explore RWA Marketplace
              </button>
            </div>
          )}

          {/* TAB 2: ITEMS */}
          {activeTab === 'items' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">Individual NFT & Fraction Tokens</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                All 4 security tokens are categorized under the <span className="font-bold text-slate-800">Tokens</span> tab below.
              </p>
              <button
                onClick={() => setActiveTab('tokens')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                View Security Tokens ({filteredTokens.length})
              </button>
            </div>
          )}

          {/* TAB 3: TOKENS */}
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex-1 relative max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search RWA tokens or ISIN..."
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                </div>
                <div className="text-xs font-mono text-slate-500">{filteredTokens.length} Security Tokens Owned</div>
              </div>

              {/* Tokens Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTokens.map((token) => (
                  <div
                    key={token.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-slate-400 hover:shadow-md transition cursor-pointer group"
                  >
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-700 font-bold border border-slate-200 shadow-xs">
                        {token.yield}
                      </div>
                      <div className="absolute top-3 left-3 bg-slate-900 text-white px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider font-mono">
                        {token.category}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-[10px] font-mono text-blue-600 font-bold flex items-center space-x-1">
                          <span>{token.collection}</span>
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        </p>
                        <h4 className="font-bold text-sm text-slate-900 mt-0.5 leading-snug">{token.name}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-mono text-xs">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase">HOLDINGS</p>
                          <p className="font-bold text-slate-900">{token.shares}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-400 uppercase">EST. VALUE</p>
                          <p className="font-bold text-slate-900">{token.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 font-mono">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                  Asset Allocation & NAV Metrics
                </h3>
                
                {/* Asset Allocation Progress Bar */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex p-0.5 gap-1 border border-slate-200">
                    <div className="bg-blue-600 h-full rounded-l-full" style={{ width: '45%' }} title="Real Estate" />
                    <div className="bg-purple-600 h-full" style={{ width: '25%' }} title="Fine Art" />
                    <div className="bg-emerald-500 h-full" style={{ width: '15%' }} title="Carbon Credits" />
                    <div className="bg-amber-500 h-full rounded-r-full" style={{ width: '15%' }} title="Private Credit" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">REAL ESTATE</span>
                      <span className="font-bold text-slate-900 text-sm">$829,327 (45%)</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">FINE ART VAULTS</span>
                      <span className="font-bold text-slate-900 text-sm">$460,737 (25%)</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">CARBON OFFSETS</span>
                      <span className="font-bold text-slate-900 text-sm">$276,442 (15%)</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 text-[10px] block font-bold">PRIVATE CREDIT</span>
                      <span className="font-bold text-slate-900 text-sm">$276,442 (15%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* On-Chain Holdings Table */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                  Verified On-Chain Holdings Ledger
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase">
                        <th className="pb-3">Asset Title</th>
                        <th className="pb-3">Tokens</th>
                        <th className="pb-3">Avg Buy Price</th>
                        <th className="pb-3">Total Value</th>
                        <th className="pb-3 text-right">Yield Earned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {holdings.map((h) => (
                        <tr key={h.assetId} className="hover:bg-slate-50">
                          <td className="py-3.5 font-bold text-slate-900 font-sans">{h.assetTitle}</td>
                          <td className="py-3.5 font-bold text-slate-900">{h.tokensOwned} tokens</td>
                          <td className="py-3.5">${h.avgBuyPrice.toFixed(2)}</td>
                          <td className="py-3.5 font-bold text-slate-900">${h.totalValue.toLocaleString()}</td>
                          <td className="py-3.5 text-right font-bold text-emerald-600">+${h.yieldEarnedToDate.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LISTINGS */}
          {activeTab === 'listings' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 overflow-x-auto shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Active Secondary Market Sell Orders</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase">
                      <th className="pb-3">TOKEN ASSET</th>
                      <th className="pb-3 text-right">LISTED FRACTIONS</th>
                      <th className="pb-3 text-right">LISTING PRICE</th>
                      <th className="pb-3 text-right">NAV VALUE</th>
                      <th className="pb-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {!canceledListings.includes('l1') && (
                      <tr className="hover:bg-slate-50">
                        <td className="py-4 font-bold text-slate-900">Manhattan Prime Suite Token #6752</td>
                        <td className="text-right">500 Shares</td>
                        <td className="text-right text-emerald-600 font-bold">$100.00 / Share</td>
                        <td className="text-right">$100.00 / Share</td>
                        <td className="text-center">
                          <button
                            onClick={() => setCanceledListings([...canceledListings, 'l1'])}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg border border-red-200 font-bold cursor-pointer transition"
                          >
                            Cancel Listing
                          </button>
                        </td>
                      </tr>
                    )}
                    {!canceledListings.includes('l2') && (
                      <tr className="hover:bg-slate-50">
                        <td className="py-4 font-bold text-slate-900">Basquiat (1982 Untitled) Vault Token #012</td>
                        <td className="text-right">200 Shares</td>
                        <td className="text-right text-emerald-600 font-bold">$306.60 / Share</td>
                        <td className="text-right">$306.60 / Share</td>
                        <td className="text-center">
                          <button
                            onClick={() => setCanceledListings([...canceledListings, 'l2'])}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg border border-red-200 font-bold cursor-pointer transition"
                          >
                            Cancel Listing
                          </button>
                        </td>
                      </tr>
                    )}
                    {canceledListings.length >= 2 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400 italic">
                          No active secondary listings remaining.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: OFFERS */}
          {activeTab === 'offers' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 overflow-x-auto shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Secondary Market Buy Offers Received</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase">
                      <th className="pb-3">ASSET TOKEN</th>
                      <th className="pb-3">OFFER FROM</th>
                      <th className="pb-3 text-right">PRICE OFFERED</th>
                      <th className="pb-3 text-right">TOTAL OFFER</th>
                      <th className="pb-3 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {!acceptedOffers.includes('o1') ? (
                      <tr className="hover:bg-slate-50">
                        <td className="py-4 font-bold text-slate-900">Dubai Marina Commercial Tower #204</td>
                        <td className="text-blue-600 font-bold">0x81bf...992a</td>
                        <td className="text-right font-bold text-slate-900">$102.50 / Share</td>
                        <td className="text-right font-bold text-emerald-600">$102,500.00</td>
                        <td className="text-center">
                          <button
                            onClick={() => setAcceptedOffers([...acceptedOffers, 'o1'])}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition shadow-xs"
                          >
                            Accept Offer
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-emerald-600 font-bold">
                          ✓ Offer of $102,500.00 USDC Accepted & Transferred!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: CREATED */}
          {activeTab === 'created' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4 shadow-xs">
              <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-lg">Created & Minted RWA Assets</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No tokenized primary assets minted by your institution yet. Switch to Level 3 Institutional KYC to issue new SPV real estate or carbon pools.
              </p>
              <button
                onClick={onOpenKycModal}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Apply for Issuer KYC
              </button>
            </div>
          )}

          {/* TAB 8: WATCHLIST */}
          {activeTab === 'watchlist' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm">Target Asset Watchlist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">Singapore Fintech Center SPV</p>
                    <p className="text-[10px] text-slate-500">Target APY: 9.80% • ISIN: SG198204</p>
                  </div>
                  <span className="text-emerald-600 font-bold">High Priority</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">German Solar Infrastructure Bond</p>
                    <p className="text-[10px] text-slate-500">Fixed Coupon: 6.80% • BaFin Approved</p>
                  </div>
                  <span className="text-blue-600 font-bold">Monitoring</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm">Bookmarked & Watchlisted Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">London Mayfair Luxury Hotel SPV</p>
                      <p className="text-[10px] text-slate-500">Target APY: 9.10% • ISIN: GB0098124</p>
                    </div>
                    <span className="text-amber-500 font-bold">★ Saved</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Zurich Vaulted Gold Bullion Pool</p>
                      <p className="text-[10px] text-slate-500">Physical Gold Custody • UBS Bank</p>
                    </div>
                    <span className="text-amber-500 font-bold">★ Saved</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Tokyo Ginza Retail Complex SPV</p>
                      <p className="text-[10px] text-slate-500">Target APY: 7.40% • ISIN: JP3049102</p>
                    </div>
                    <span className="text-amber-500 font-bold">★ Saved</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 overflow-x-auto shadow-xs">
                <h3 className="font-bold text-slate-900 text-sm mb-4">On-Chain Ledger Activity</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase">
                      <th className="pb-3">EVENT</th>
                      <th className="pb-3">ASSET TOKEN</th>
                      <th className="pb-3 text-right">VALUE</th>
                      <th className="pb-3 text-right">TIME</th>
                      <th className="pb-3 text-right">TX HASH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {transactions.length > 0 ? (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50">
                          <td className="py-3">
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                              {tx.type}
                            </span>
                          </td>
                          <td className="font-bold text-slate-900">{tx.assetName || 'USDC Vault'}</td>
                          <td className="text-right text-emerald-600 font-bold">
                            {tx.amount > 0 ? `$${tx.amount.toLocaleString()}` : '-'}
                          </td>
                          <td className="text-right text-slate-500">{tx.timestamp.slice(11, 16)}</td>
                          <td className="text-right text-blue-600 underline cursor-pointer">{tx.hash.substring(0, 8)}...</td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3">
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                              DIVIDEND PAID
                            </span>
                          </td>
                          <td className="font-bold text-slate-900">Manhattan Commercial Suite #6752</td>
                          <td className="text-right text-emerald-600 font-bold">+$8,420.50 USDC</td>
                          <td className="text-right text-slate-500">2h ago</td>
                          <td className="text-right text-blue-600 underline cursor-pointer">0x89f...21a</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="py-3">
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-200">
                              SECONDARY TRADE
                            </span>
                          </td>
                          <td className="font-bold text-slate-900">Dubai Marina Commercial Tower #204</td>
                          <td className="text-right font-bold text-slate-900">$250,000.00</td>
                          <td className="text-right text-slate-500">2d ago</td>
                          <td className="text-right text-blue-600 underline cursor-pointer">0x42a...81f</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
