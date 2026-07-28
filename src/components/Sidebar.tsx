import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  ArrowLeftRight,
  Wallet,
  User,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTxDrawer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenTxDrawer }) => {
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');

  const navItems = [
    { id: 'marketplace', label: 'Primary Marketplace', icon: Globe },
    { id: 'tokens', label: 'Tokens Screener', icon: TrendingUp },
    { id: 'trade', label: 'P2P Trade & Settlement', icon: ArrowLeftRight },
    { id: 'wallet', label: 'Portfolio & Wallet', icon: Wallet },
    { id: 'profile', label: 'Investor Profile', icon: User },
    { id: 'settings', label: 'KYC & Settings', icon: Settings },
  ];

  return (
    <aside className="w-[68px] bg-white border-r border-slate-200/60 flex flex-col items-center justify-between py-4 px-2 shrink-0 h-full select-none z-20 font-sans">
      {/* Top Logo Container */}
      <div className="flex flex-col items-center space-y-2">
        <div
          onClick={() => setActiveTab('marketplace')}
          className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          C
        </div>
      </div>

      {/* Main Navigation Stack */}
      <nav className="flex flex-col gap-3 items-center my-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer relative group ${
                isActive
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-500 hover:text-black hover:bg-slate-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip on hover */}
              <span className="absolute left-14 bg-black text-white text-[11px] font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-white/20">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Theme Mode Switcher Pill */}
      <div className="bg-slate-100 p-1 rounded-full flex flex-col gap-1 border border-slate-200">
        <button
          onClick={() => setThemeMode('dark')}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === 'dark' ? 'bg-black text-white shadow-xs' : 'text-slate-500 hover:text-black'
          }`}
          title="Dark Mode"
        >
          <Moon className="w-3.5 h-3.5 fill-current" />
        </button>
        <button
          onClick={() => setThemeMode('light')}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            themeMode === 'light' ? 'bg-black text-white shadow-xs' : 'text-slate-500 hover:text-black'
          }`}
          title="Light Mode"
        >
          <Sun className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
