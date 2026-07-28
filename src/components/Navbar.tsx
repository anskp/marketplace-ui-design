import React from 'react';
import { UserProfile } from '../types';
import { Search, Bell, Wallet, ShieldCheck, Copy } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenTxDrawer: () => void;
  onOpenKycModal: () => void;
  onOpenSearchModal: () => void;
  txCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  searchQuery,
  onSearchChange,
  onOpenTxDrawer,
  onOpenKycModal,
  onOpenSearchModal,
  txCount,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="w-full bg-[#ecebf5] px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0 font-sans border-b border-slate-200/50">
      {/* Brand Title + Search Bar Input */}
      <div className="flex items-center space-x-6 w-full md:w-auto">
        <h1
          onClick={() => setActiveTab('marketplace')}
          className="text-lg font-extrabold text-black tracking-tight cursor-pointer select-none shrink-0 flex items-center space-x-1.5"
        >
          <span className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center font-black text-sm">C</span>
          <span>Copym <span className="text-black font-black">RWA</span></span>
        </h1>

        <div
          onClick={onOpenSearchModal}
          className="relative w-full md:w-[380px] cursor-pointer group"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-black transition-colors" />
          <input
            type="text"
            readOnly
            placeholder="Search assets, tokens, SPVs..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-black placeholder-slate-400 text-xs py-2 pl-10 pr-3 rounded-[12px] border border-slate-200/80 shadow-xs cursor-pointer group-hover:border-black transition"
          />
        </div>
      </div>

      {/* Right Controls Group: Wallet Chip + Bell + User Pill */}
      <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
        {/* Wallet Balance Chip with Hover ETH Address Tooltip */}
        <div
          onClick={() => setActiveTab('wallet')}
          className="relative group bg-white px-3.5 py-1.5 rounded-full flex items-center space-x-2.5 shadow-xs cursor-pointer hover:border-black transition border border-slate-200"
        >
          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 font-semibold block uppercase tracking-wider">USDC Vault</span>
            <span className="text-xs font-black text-black">
              ${user.balanceUsdc.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Hover Tooltip showing Wallet Address */}
          <div className="absolute top-12 right-0 bg-black text-white text-[10px] font-mono p-2.5 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/20 flex flex-col space-y-1">
            <span className="text-slate-400 font-sans text-[9px] uppercase font-bold tracking-wider">EVM Wallet Address</span>
            <span className="text-white font-bold">{user.walletAddress || '0x71C8390912D4203E388410943891726917498492'}</span>
            <span className="text-[9px] text-slate-300 font-sans">Click chip to open Wallet & Portfolio</span>
          </div>
        </div>

        {/* User Profile Pill with Bell Icon, Avatar & Name */}
        <div className="bg-white px-3.5 py-1.5 rounded-full flex items-center space-x-3 shadow-xs border border-slate-200">
          <button
            onClick={onOpenTxDrawer}
            title="Notifications & Fireblocks Audit Logs"
            className="w-7 h-7 rounded-full bg-slate-100 text-black border border-slate-300 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition relative shrink-0"
          >
            <Bell className="w-3.5 h-3.5 fill-current" />
            {txCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                {txCount}
              </span>
            )}
          </button>

          <img
            src={user.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-200 cursor-pointer shrink-0"
            onClick={onOpenKycModal}
          />

          <div className="flex flex-col cursor-pointer" onClick={onOpenKycModal}>
            <span className="text-xs font-black text-black leading-tight">
              Hi, {user.name}!
            </span>
            <span className="text-[9px] font-bold text-slate-600 flex items-center space-x-1">
              <ShieldCheck className="w-2.5 h-2.5 text-black" />
              <span>Level-{user.kycLevel} Verified</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
