import React, { useState } from 'react';
import { RwaAsset, UserProfile } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Clock,
  User,
  ArrowUpRight,
  Sparkles,
  Info,
  DollarSign,
  Building2,
  Check,
  Activity
} from 'lucide-react';

export interface P2pListingItem {
  id: string;
  asset: RwaAsset;
  sellerName: string;
  sellerAvatar: string;
  sellerAddress: string;
  shares: number;
  askPrice: number;
  navPrice: number;
  timeAgo: string;
  expiresIn: string;
  verified: boolean;
  notes?: string;
}

interface P2pOrderDetailModalProps {
  order: P2pListingItem | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onBuyP2p: (asset: RwaAsset, shares: number, totalUsdc: number) => void;
  onGoToAssetDetail: (asset: RwaAsset) => void;
}

export const P2pOrderDetailModal: React.FC<P2pOrderDetailModalProps> = ({
  order,
  user,
  isOpen,
  onClose,
  onBuyP2p,
  onGoToAssetDetail,
}) => {
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isOpen || !order) return null;

  const { asset, sellerName, sellerAvatar, sellerAddress, shares, askPrice, navPrice, expiresIn, verified } = order;

  const totalCost = shares * askPrice;
  const navTotalValue = shares * navPrice;
  const priceDiff = askPrice - navPrice;
  const percentDiff = ((priceDiff / navPrice) * 100).toFixed(2);
  const isDiscount = priceDiff < 0;

  const canAfford = user.balanceUsdc >= totalCost;
  const isKycRestricted = user.kycLevel < 2;

  const handleConfirmPurchase = () => {
    if (!canAfford || isKycRestricted || isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      onBuyP2p(asset, shares, totalCost);
      setIsProcessing(false);
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  const handleNavigateToAssetPage = () => {
    onClose();
    onGoToAssetDetail(asset);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh]">
        
        {/* Modal Header Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="bg-purple-100 text-purple-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-200">
              P2P Secondary Settlement
            </span>
            <span className="text-xs font-mono text-slate-500 font-bold">Order #{order.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Seller Profile Header */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <img
                src={sellerAvatar}
                alt={sellerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-sm">{sellerName}</span>
                  {verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-500" title="Verified Custodial Investor" />
                  )}
                </div>
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
                  <span>{sellerAddress}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">4.9 ★ Rating</span>
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">ESCROW STATUS</span>
              <span className="inline-flex items-center gap-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                <Lock className="w-3 h-3" /> Smart Contract
              </span>
            </div>
          </div>

          {/* Asset Summary Card */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold font-mono px-2 py-0.5 rounded uppercase">
                  {asset.symbol}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">
                  {asset.category.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 truncate mt-0.5">{asset.title}</h3>
              <p className="text-xs text-slate-500 font-mono">Issuer: {asset.company?.name || 'Copym SPV'}</p>
            </div>

            {/* DIRECT LINK BUTTON TO REAL ASSET TOKEN DETAIL PAGE */}
            <button
              onClick={handleNavigateToAssetPage}
              className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Go to full asset token detail page"
            >
              <span>Asset Token Detail</span>
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Order Details & Pricing Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">LISTED SHARES</span>
              <span className="text-base font-extrabold text-slate-900">{shares} {asset.symbol}</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">ASK PRICE / SHARE</span>
              <span className="text-base font-extrabold text-slate-900">${askPrice.toFixed(2)} USDC</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">OFFICIAL SPV NAV</span>
              <span className="text-base font-bold text-slate-600">${navPrice.toFixed(2)} USDC</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">SPREAD vs NAV</span>
              <span className={`text-sm font-bold ${isDiscount ? 'text-emerald-600' : 'text-slate-900'}`}>
                {isDiscount ? `${percentDiff}% Discount` : `+${percentDiff}% Premium`}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">OFFER EXPIRATION</span>
              <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {expiresIn}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-sans font-bold uppercase block">TOTAL SETTLEMENT</span>
              <span className="text-base font-extrabold text-blue-600">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDC</span>
            </div>
          </div>

          {/* Wallet Balance Check */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">Your USDC Custody Balance:</span>
              <span className="font-extrabold font-mono text-slate-900">${user.balanceUsdc.toLocaleString()} USDC</span>
            </div>
            {!canAfford && (
              <p className="text-rose-600 font-bold text-[11px]">
                Insufficient USDC balance. You need ${(totalCost - user.balanceUsdc).toFixed(2)} more USDC to buy this P2P offer.
              </p>
            )}
          </div>

          {/* Success Notification */}
          {purchaseSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>P2P Secondary Trade settled successfully! Ownership transferred on-chain via Fireblocks.</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConfirmPurchase}
              disabled={!canAfford || isKycRestricted || isProcessing || purchaseSuccess}
              className={`flex-1 py-3.5 px-5 rounded-2xl font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm ${
                !canAfford || isKycRestricted
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isProcessing ? (
                <span>Settling P2P Atomic Swap...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-white" />
                  <span>Execute P2P Purchase (${totalCost.toLocaleString()} USDC)</span>
                </>
              )}
            </button>

            {/* Direct Link Button */}
            <button
              onClick={handleNavigateToAssetPage}
              className="py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Go to Real Asset Token Detail Page</span>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
