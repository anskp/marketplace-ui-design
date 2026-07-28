import React from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface KycNotificationBannerProps {
  user: UserProfile;
  onOpenKycModal: () => void;
}

export const KycNotificationBanner: React.FC<KycNotificationBannerProps> = ({ user, onOpenKycModal }) => {
  if (user.kycLevel >= 2) return null;

  return (
    <div className="bg-slate-900 text-white px-4 md:px-8 py-2.5 text-xs font-sans flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
      <div className="flex items-center space-x-2">
        <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono font-bold text-[10px]">
          ACTION REQUIRED
        </span>
        <span className="text-slate-200">
          Complete Level-2 Accredited Investor KYC to unlock institutional $1M+ pool minting & direct yield escrow.
        </span>
      </div>

      <button
        onClick={onOpenKycModal}
        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center space-x-1.5 cursor-pointer text-xs"
      >
        <span>Mint W3C Accredited VC Badge</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
