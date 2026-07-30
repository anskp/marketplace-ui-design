import React, { useState } from 'react';
import { UserProfile, TxLog } from '../types';
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  User,
  Mail,
  KeyRound,
  Bell,
  Lock,
  Smartphone,
  Copy,
  FileBadge,
  Award,
  History,
  Info,
  ChevronRight,
  Shield,
  Download,
  Globe,
  Globe2,
} from 'lucide-react';

interface SettingsKycViewProps {
  user: UserProfile;
  onOpenKycModal: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  transactions?: TxLog[];
  onNavigateToCarbonRegistry: () => void;
}

export const SettingsKycView: React.FC<SettingsKycViewProps> = ({
  user,
  onOpenKycModal,
  onUpdateProfile,
  transactions = [],
  onNavigateToCarbonRegistry,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [saved, setSaved] = useState(false);

  // Settings Sub-Tab: 'account' | 'carbon_registries'
  const [settingsTab, setSettingsTab] = useState<'account' | 'carbon_registries'>('account');

  // Security Sub-states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatusMsg, setPasswordStatusMsg] = useState('');

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [copiedDid, setCopiedDid] = useState(false);
  const [showMoreSettings, setShowMoreSettings] = useState(false);

  // Notifications
  const [notifYield, setNotifYield] = useState(true);
  const [notifOffers, setNotifOffers] = useState(true);
  const [notifTelegram, setNotifTelegram] = useState(true);

  // History Filter
  const [txTypeFilter, setTxTypeFilter] = useState('ALL');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

  const handleCopyDid = () => {
    navigator.clipboard.writeText(user.holderDid);
    setCopiedDid(true);
    setTimeout(() => setCopiedDid(false), 2000);
  };

  const filteredTxs = transactions.filter((tx) => {
    if (txTypeFilter === 'ALL') return true;
    return tx.type === txTypeFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 font-sans text-slate-900">
      
      {/* Settings Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-slate-900">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Account Settings & Compliance Hub</h2>
            <p className="text-xs text-slate-500">
              Manage 2FA, Password Reset, KYC Tier, Carbon Credit Registries, W3C DID, Soulbound Tokens & Audit Logs
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowMoreSettings(!showMoreSettings)}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5 shrink-0"
        >
          <span>{showMoreSettings ? 'Show Less' : 'Show More Settings'}</span>
          <ChevronRight className={`w-4 h-4 transition-transform ${showMoreSettings ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200/80 pb-2">
        <button
          className="px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 bg-slate-900 text-white shadow-xs"
        >
          <User className="w-4 h-4" />
          <span>Account & Compliance</span>
        </button>

        <button
          onClick={onNavigateToCarbonRegistry}
          className="px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2 bg-white hover:bg-emerald-50 text-slate-800 border border-slate-200"
        >
          <Globe className="w-4 h-4 text-emerald-500" />
          <span>Carbon Credit Registries</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded-full font-extrabold">
            CAD TRUST MAP
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. USER PROFILE & IDENTITY DETAILS */}
        <form onSubmit={handleSaveProfile} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">User Profile & Account Info</h3>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div>
              <label className="block text-slate-500 mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 mb-1">Verified Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-mono font-bold">{saved ? '✓ Profile saved!' : ''}</span>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>

        {/* 2. PASSWORD RESET SECURITY FORM */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <KeyRound className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Password Reset</h3>
          </div>

          <form onSubmit={handlePasswordReset} className="space-y-3 font-mono text-xs">
            <div>
              <label className="block text-slate-500 mb-1 font-sans">Current Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 mb-1 font-sans">New Password</label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1 font-sans">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {passwordStatusMsg && (
              <p className={`text-xs font-bold font-sans ${passwordStatusMsg.includes('✓') ? 'text-emerald-600' : 'text-red-600'}`}>
                {passwordStatusMsg}
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold font-sans text-xs transition cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* 3. 2FA & KYC TIER COMPLIANCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Two-Factor Authentication (2FA) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Two-Factor Authentication (2FA)</h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
              twoFactorEnabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
            }`}>
              {twoFactorEnabled ? '2FA ACTIVE ✓' : 'DISABLED'}
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Secure Fireblocks MPC key signatures with TOTP Authenticator apps or Hardware YubiKeys.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between font-mono text-xs">
            <div>
              <p className="font-bold text-slate-900">Google Authenticator / YubiKey</p>
              <p className="text-[10px] text-slate-500">Configured for Holder DID: {user.holderDid.slice(0, 14)}...</p>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer text-xs ${
                twoFactorEnabled ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {/* KYC Compliance Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">KYC Tier Status</h3>
            </div>
            <span className="bg-emerald-50 text-emerald-800 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full border border-emerald-200">
              Current Tier Level {user.kycLevel}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <p className="text-[10px] font-bold text-emerald-800">LEVEL 1</p>
              <p className="text-[9px] text-emerald-600">ID Verification ✓</p>
            </div>
            <div className={`p-2 rounded-xl text-center border ${
              user.kycLevel >= 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <p className="text-[10px] font-bold">LEVEL 2</p>
              <p className="text-[9px]">Accredited ✓</p>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-400">
              <p className="text-[10px] font-bold">LEVEL 3</p>
              <p className="text-[9px]">Institutional</p>
            </div>
          </div>

          <div className="pt-1 flex justify-end">
            <button
              onClick={onOpenKycModal}
              className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold text-xs transition cursor-pointer"
            >
              Re-launch KYC Wizard
            </button>
          </div>
        </div>

      </div>

      {/* 4. DID & SOULBOUND TOKENS (SBT) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* W3C DID Identifier */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <FileBadge className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Decentralized Identifier (DID)</h3>
            </div>
            <button
              onClick={handleCopyDid}
              className="text-xs text-blue-600 hover:underline font-mono font-bold flex items-center space-x-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedDid ? 'Copied!' : 'Copy DID'}</span>
            </button>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs space-y-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold">W3C SPECIFICATION DID</p>
            <p className="text-slate-800 font-bold truncate">{user.holderDid}</p>
          </div>

          <div className="text-xs text-slate-500 font-mono flex justify-between">
            <span>Issuer Compliance Subnet:</span>
            <span className="font-bold text-emerald-600">DIFC SPV Custody Authority</span>
          </div>
        </div>

        {/* Soulbound Tokens (SBT) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-base">On-Chain Soulbound Tokens (SBT)</h3>
            </div>
            <span className="text-xs font-mono text-slate-500 font-bold">Non-Transferable</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {user.soulboundTokens.map((sbt) => (
              <div key={sbt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{sbt.title}</p>
                  <p className="text-[10px] text-slate-500">Contract: {sbt.contractAddress} • ID #{sbt.tokenId}</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. NOTIFICATIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Bell className="w-5 h-5 text-purple-600" />
          <h3 className="font-bold text-slate-900 text-base">Notification Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900">Email Yield Payouts</p>
              <p className="text-[10px] text-slate-500">Alerts on USDC lease claims</p>
            </div>
            <input
              type="checkbox"
              checked={notifYield}
              onChange={(e) => setNotifYield(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900">Secondary Offers</p>
              <p className="text-[10px] text-slate-500">Alerts on secondary bids</p>
            </div>
            <input
              type="checkbox"
              checked={notifOffers}
              onChange={(e) => setNotifOffers(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <div>
              <p className="font-bold text-slate-900">Telegram Bot Webhook</p>
              <p className="text-[10px] text-slate-500">Real-time MPC signing alerts</p>
            </div>
            <input
              type="checkbox"
              checked={notifTelegram}
              onChange={(e) => setNotifTelegram(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded"
            />
          </label>
        </div>
      </div>

      {/* 6. ON-CHAIN TRANSACTION HISTORY TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">On-Chain Transaction History & Audit Ledger</h3>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-slate-400 font-bold">FILTER:</span>
            <select
              value={txTypeFilter}
              onChange={(e) => setTxTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-none"
            >
              <option value="ALL">All Event Types</option>
              <option value="BUY_FRACTIONAL">Primary Purchases</option>
              <option value="FIREBLOCKS_SIGN">Vault Deposits / Top Up</option>
              <option value="YIELD_PAYOUT">Dividend Payouts</option>
              <option value="KYC_VC_ISSUED">KYC Credentials</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 text-[10px] uppercase">
                <th className="pb-3">TYPE</th>
                <th className="pb-3">ASSET / DESCRIPTION</th>
                <th className="pb-3 text-right">AMOUNT</th>
                <th className="pb-3 text-right">BLOCK #</th>
                <th className="pb-3 text-right">GAS (ETH)</th>
                <th className="pb-3 text-center">STATUS</th>
                <th className="pb-3 text-right">TX HASH</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTxs.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-3">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                      {tx.type}
                    </span>
                  </td>
                  <td className="font-bold text-slate-900">{tx.assetName || 'USDC Treasury'}</td>
                  <td className="text-right font-bold text-slate-900">
                    {tx.amount > 0 ? `$${tx.amount.toLocaleString()}` : '-'}
                  </td>
                  <td className="text-right text-slate-500">#{tx.blockNumber}</td>
                  <td className="text-right text-slate-500">{tx.gasFee}</td>
                  <td className="text-center">
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                      {tx.status}
                    </span>
                  </td>
                  <td className="text-right text-blue-600 underline cursor-pointer">
                    {tx.hash.substring(0, 8)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. EXPANDABLE "SHOW MORE" ADVANCED SETTINGS */}
      {showMoreSettings && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-6 shadow-xl font-mono text-xs border border-slate-800">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Advanced Fireblocks MPC & Subnet Node Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <p className="text-slate-400 text-[10px] font-bold uppercase">MPC SIGNER CLUSTER</p>
              <p className="font-bold text-emerald-400">Zurich HSM Node #04 - Active</p>
              <p className="text-[10px] text-slate-400">Latency: 12ms • Threshold 2-of-3</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <p className="text-slate-400 text-[10px] font-bold uppercase">GAS LIMIT POLICY</p>
              <p className="font-bold text-white">EIP-1559 Auto-Sponsor</p>
              <p className="text-[10px] text-slate-400">Sponsored by COPYM Subnet Escrow</p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-1">
              <p className="text-slate-400 text-[10px] font-bold uppercase">W3C JSON-LD EXPORT</p>
              <p className="font-bold text-blue-400 cursor-pointer underline hover:text-blue-300">
                Download Complete VC Payload (.json)
              </p>
              <p className="text-[10px] text-slate-400">Verifiable Signature Proof attached</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
