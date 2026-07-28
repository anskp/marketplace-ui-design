import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, ShieldCheck, CheckCircle2, Lock, ArrowRight, User, FileBadge, Building2 } from 'lucide-react';

interface KycModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onCompleteKyc: (updatedProfile: Partial<UserProfile>) => void;
}

export const KycModal: React.FC<KycModalProps> = ({ user, isOpen, onClose, onCompleteKyc }) => {
  const [step, setStep] = useState<number>(1);
  const [investorType, setInvestorType] = useState<'individual' | 'institutional'>('individual');
  const [accreditationProof, setAccreditationProof] = useState<string>('net_worth');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleMintBadge = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setIsSuccess(true);
      onCompleteKyc({
        kycLevel: 2,
        accreditedStatus: 'ACCREDITED_INVESTOR',
      });
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl font-sans relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-slate-900 text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Accredited Investor Onboarding</h3>
              <p className="text-xs text-slate-500 font-mono">W3C Verifiable Credential Issuance</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 border-b border-slate-100 pb-3">
          <span className={step >= 1 ? 'text-slate-900' : ''}>1. Entity Type</span>
          <span>&gt;</span>
          <span className={step >= 2 ? 'text-slate-900' : ''}>2. Financial Accreditation</span>
          <span>&gt;</span>
          <span className={step >= 3 ? 'text-slate-900' : ''}>3. Mint SBT Badge</span>
        </div>

        {/* Step 1: Investor Entity Type */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 font-mono uppercase">
              Select Investor Classification:
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInvestorType('individual')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition ${
                  investorType === 'individual'
                    ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <User className="w-5 h-5 text-slate-800" />
                <div className="text-xs">Individual Investor</div>
                <div className="text-[10px] text-slate-500 font-normal">HNWI / Natural Person</div>
              </button>

              <button
                type="button"
                onClick={() => setInvestorType('institutional')}
                className={`p-4 rounded-2xl border text-left space-y-2 transition ${
                  investorType === 'institutional'
                    ? 'border-slate-900 bg-slate-50 text-slate-900 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <Building2 className="w-5 h-5 text-slate-800" />
                <div className="text-xs">Institutional SPV</div>
                <div className="text-[10px] text-slate-500 font-normal">Corporate Fund / Family Office</div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center space-x-1"
            >
              <span>Continue to Accreditation Proof</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Accreditation Criteria */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 font-mono uppercase">
              Select Verification Method:
            </label>

            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="accreditation"
                  value="net_worth"
                  checked={accreditationProof === 'net_worth'}
                  onChange={() => setAccreditationProof('net_worth')}
                  className="accent-slate-900"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Net Worth Threshold ($1M+ liquid assets)</div>
                  <div className="text-[10px] text-slate-500 font-mono">Zero-knowledge proof via bank audit statement</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="accreditation"
                  value="income"
                  checked={accreditationProof === 'income'}
                  onChange={() => setAccreditationProof('income')}
                  className="accent-slate-900"
                />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">Annual Income ($200k+ consecutive)</div>
                  <div className="text-[10px] text-slate-500 font-mono">Verified via W3C tax credential</div>
                </div>
              </label>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs"
              >
                Review & Mint Credential
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Mint Badge */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-1">
              <div className="font-bold text-emerald-900 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ready to Mint Soulbound Token (SBT)</span>
              </div>
              <p className="text-emerald-800 font-mono text-[11px]">
                Issuer: COPYM Compliance Subnet Node #01
              </p>
            </div>

            <button
              onClick={handleMintBadge}
              disabled={isMinting || isSuccess}
              className={`w-full py-3 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : isMinting
                  ? 'bg-slate-300 text-slate-600 cursor-wait'
                  : 'bg-slate-900 hover:bg-black text-white'
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Accredited SBT Minted!</span>
                </>
              ) : isMinting ? (
                <span>Minting Cryptographic Credential...</span>
              ) : (
                <>
                  <FileBadge className="w-4 h-4" />
                  <span>Mint Soulbound Accredited VC</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
