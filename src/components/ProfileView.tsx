import React, { useState } from 'react';
import { UserProfile, TxLog } from '../types';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  FileBadge,
  Award,
  Wallet,
  Copy,
  Mail,
  Building2,
  ExternalLink,
  Shield,
  Clock,
  TrendingUp,
  Sliders,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onOpenKycModal: () => void;
  onNavigateToSettings: () => void;
  onNavigateToWallet: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onOpenKycModal,
  onNavigateToSettings,
  onNavigateToWallet,
}) => {
  const [copiedDid, setCopiedDid] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);

  const handleCopyDid = () => {
    navigator.clipboard.writeText(user.holderDid);
    setCopiedDid(true);
    setTimeout(() => setCopiedDid(false), 2000);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(user.walletAddress);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans text-slate-900">
      
      {/* Profile Header Banner Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="h-44 sm:h-52 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 relative p-6 flex items-start justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent)] pointer-events-none" />
          
          <div className="z-10 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>INSTITUTIONAL INVESTOR PROFILE</span>
          </div>

          <div className="z-10 flex items-center space-x-2">
            <button
              onClick={onNavigateToSettings}
              className="bg-white/90 hover:bg-white text-slate-900 px-3.5 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-xs flex items-center space-x-1.5"
            >
              <Sliders className="w-4 h-4 text-slate-700" />
              <span>Edit Profile & Settings</span>
            </button>
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-6 sm:px-8 pb-6 relative -mt-14 sm:-mt-16 z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-2 shadow-xl shrink-0 flex items-center justify-center relative bg-white">
              <div className="grid grid-cols-3 gap-1 w-full h-full rounded-full overflow-hidden bg-slate-900 p-3">
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

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>VERIFIED INVESTOR</span>
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium">
                Institutional RWA Investor • DIFC Vault Custody • Fireblocks Multi-Sig Verified
              </p>

              <div className="flex items-center space-x-3 text-xs font-mono pt-1 text-slate-600">
                <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-bold text-[10px]">
                  MEMBER SINCE JUL 2026
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold text-[10px]">
                  KYC LEVEL {user.kycLevel} ACCREDITED
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToWallet}
              className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>View RWA Portfolio</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN (2/3): VERIFIED CREDENTIALS & ACCOUNT DATA */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. Account Details Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Investor Account Overview</h3>
              </div>
              <button
                onClick={onNavigateToSettings}
                className="text-xs text-blue-600 hover:underline font-bold"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">FULL LEGAL NAME</span>
                <p className="font-bold text-slate-900 text-sm font-sans">{user.name}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">EMAIL ADDRESS</span>
                <p className="font-bold text-slate-900 text-sm font-sans">{user.email}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">PRIMARY CUSTODY WALLET (EVM)</span>
                  <button onClick={handleCopyWallet} className="text-blue-600 hover:underline text-[10px] font-bold">
                    {copiedWallet ? 'Copied!' : 'Copy Address'}
                  </button>
                </div>
                <p className="font-bold text-slate-900 truncate">{user.walletAddress}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 sm:col-span-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">W3C DECENTRALIZED IDENTIFIER (DID)</span>
                  <button onClick={handleCopyDid} className="text-blue-600 hover:underline text-[10px] font-bold">
                    {copiedDid ? 'Copied!' : 'Copy DID'}
                  </button>
                </div>
                <p className="font-bold text-slate-800 truncate">{user.holderDid}</p>
              </div>
            </div>
          </div>

          {/* 2. Soulbound Tokens (SBTs) & Verifiable Credentials */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">On-Chain Soulbound Investor Badges (SBT)</h3>
              </div>
              <span className="text-xs font-mono text-slate-500 font-bold">Non-Transferable Credentials</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {user.soulboundTokens.map((sbt) => (
                <div key={sbt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm font-sans">{sbt.title}</span>
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                        VERIFIED ON-CHAIN
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Contract: {sbt.contractAddress} • Token ID #{sbt.tokenId}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-blue-600 hover:underline text-xs font-bold flex items-center space-x-1 cursor-pointer">
                      <span>View Proof</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Multi-Chain Vault Wallets */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Wallet className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Connected Institutional Multi-Chain Vaults</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">EVM Mainnet</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-slate-500 truncate">{user.walletAddress}</p>
                <div className="pt-1 text-[10px] font-bold text-slate-700">$148,250.00 USDC Vault</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Solana Vault</span>
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                </div>
                <p className="text-[10px] text-slate-500 truncate">7xP9x4M...3mL1</p>
                <div className="pt-1 text-[10px] font-bold text-purple-700">SPL RWA Subnet</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Arbitrum L2</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <p className="text-[10px] text-slate-500 truncate">0x98a1...11b2</p>
                <div className="pt-1 text-[10px] font-bold text-blue-700">Low-Gas Yield Escrow</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3): KYC TIER & QUICK ACTIONS */}
        <div className="space-y-6">

          {/* KYC Tier Status Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">KYC Tier Status</h3>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full border border-emerald-200">
                Tier {user.kycLevel}
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-emerald-900">Level 1 - Retail KYC</p>
                  <p className="text-[10px] text-emerald-700">Passport / National ID Verified</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                user.kycLevel >= 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div>
                  <p className="font-bold">Level 2 - Accredited Investor</p>
                  <p className="text-[10px]">Net worth &gt; $1M / $200k Income</p>
                </div>
                {user.kycLevel >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">Pending</span>
                )}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-slate-400">
                <div>
                  <p className="font-bold">Level 3 - Institutional Issuer</p>
                  <p className="text-[10px]">SPV Vault Minting & Direct Escrow</p>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">Locked</span>
              </div>
            </div>

            <button
              onClick={onOpenKycModal}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Upgrade Investor KYC Tier
            </button>
          </div>

          {/* Investment Preferences & Risk Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Investment Strategy</h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">TARGET ASSET CLASSES</span>
                <p className="font-bold text-slate-900">Commercial Real Estate, Fine Art & Private Credit</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">TARGET APY RANGE</span>
                <p className="font-bold text-emerald-600">8.00% - 12.50% Blended Yield</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase">CUSTODY JURISDICTION</span>
                <p className="font-bold text-slate-900">Dubai DIFC & Zurich Free Port Vaults</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
