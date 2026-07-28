import React, { useState } from 'react';
import { RwaAsset, UserProfile } from '../types';
import { SatellitePixelMap } from './SatellitePixelMap';
import { AssetChart } from './AssetChart';
import {
  X,
  ShieldCheck,
  FileText,
  DollarSign,
  TrendingUp,
  Leaf,
  Building2,
  Lock,
  ExternalLink,
  CheckCircle2,
  Info,
  MapPin,
  Award,
} from 'lucide-react';

interface AssetDetailModalProps {
  asset: RwaAsset | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onBuyAsset: (asset: RwaAsset, tokensToBuy: number, totalUsdc: number) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  user,
  isOpen,
  onClose,
  onBuyAsset,
}) => {
  const [tokensToBuy, setTokensToBuy] = useState<number>(10);
  const [activeTab, setActiveTab] = useState<'overview' | 'satellite' | 'documents' | 'vcs'>('overview');
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);

  if (!isOpen || !asset) return null;

  const totalUsdcNeeded = tokensToBuy * asset.pricePerToken;
  const canAfford = user.balanceUsdc >= totalUsdcNeeded;
  const totalCo2Gained = asset.carbonDetails ? tokensToBuy * asset.carbonDetails.co2OffsetPerToken : 0;

  const handleExecutePurchase = () => {
    if (!canAfford) return;
    onBuyAsset(asset, tokensToBuy, totalUsdcNeeded);
    setPurchaseSuccess(true);
    setTimeout(() => {
      setPurchaseSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col font-sans">
        {/* Top Modal Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold uppercase border border-slate-200">
              {asset.symbol}
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 line-clamp-1">{asset.title}</h2>
              <p className="text-[11px] text-slate-500 font-mono">Issuer: {asset.company.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Financial Overview
          </button>
          <button
            onClick={() => setActiveTab('satellite')}
            className={`py-3 px-4 border-b-2 transition flex items-center space-x-1.5 ${
              activeTab === 'satellite'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>GIS Satellite Verification</span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'documents'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Legal Prospectus & SPV Docs
          </button>
          <button
            onClick={() => setActiveTab('vcs')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'vcs'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            W3C Verifiable Credentials
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Metrics & Price Chart */}
              <div className="md:col-span-2 space-y-6">
                {/* Image Banner */}
                <div className="h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                  <img src={asset.image} alt={asset.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 border border-slate-200 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>VERIFIED SPV CUSTODY</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">{asset.company.description}</p>

                {/* Price History Chart */}
                <AssetChart data={asset.chartHistory} category={asset.category} />

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">EXPECTED APY</span>
                    <span className="font-bold text-emerald-700 text-sm">+{asset.annualYieldApy}%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">JURISDICTION</span>
                    <span className="font-bold text-slate-900 text-xs truncate block">{asset.company.jurisdiction}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">ESCROW AUDITOR</span>
                    <span className="font-bold text-slate-900 text-xs truncate block">{asset.company.auditor}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Execution Box & Token Purchase Form */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5 h-fit shadow-sm">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 font-mono font-bold uppercase">PRIMARY MARKET POOL</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">
                    ${asset.pricePerToken.toFixed(2)}{' '}
                    <span className="text-xs text-slate-500 font-normal">/ token</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Available: {asset.availableTokens.toLocaleString()} tokens
                  </p>
                </div>

                {/* Carbon Offset Highlight */}
                {asset.carbonDetails && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                    <div className="flex items-center space-x-1 font-bold text-emerald-800">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      <span>Verra Registry Verified</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-mono">
                      1 token = {asset.carbonDetails.co2OffsetPerToken} tCO2e offset
                    </div>
                  </div>
                )}

                {/* Token Amount Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 font-mono">
                    Select Tokens to Purchase:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={1}
                      max={asset.availableTokens}
                      value={tokensToBuy}
                      onChange={(e) => setTokensToBuy(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-mono font-bold focus:outline-none focus:border-slate-800"
                    />
                  </div>
                </div>

                {/* Breakdown Summary */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-mono space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900">${totalUsdcNeeded.toLocaleString()} USDC</span>
                  </div>
                  {asset.carbonDetails && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Total CO2 Offset:</span>
                      <span>+{totalCo2Gained.toFixed(1)} tCO2e</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500 text-[10px] pt-1 border-t border-slate-100">
                    <span>Fireblocks Gas Fee:</span>
                    <span>0.0012 ETH (Covered)</span>
                  </div>
                </div>

                {/* Execute Purchase Button */}
                <button
                  onClick={handleExecutePurchase}
                  disabled={!canAfford || purchaseSuccess}
                  aria-label={`Confirm purchase of ${tokensToBuy} tokens for $${totalUsdcNeeded.toLocaleString()} USDC`}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer ${
                    purchaseSuccess
                      ? 'bg-emerald-600 text-white'
                      : canAfford
                      ? 'bg-slate-900 hover:bg-black text-white'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {purchaseSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Tokens Minted & Vaulted!</span>
                    </>
                  ) : canAfford ? (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm Fireblocks Settlement (${totalUsdcNeeded.toLocaleString()})</span>
                    </>
                  ) : (
                    <span>Insufficient Liquid USDC Balance</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'satellite' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Real-time satellite radar telemetry verified by Sentinel-2A GIS spatial mapping.
              </p>
              <SatellitePixelMap
                location={asset.location}
                coordinates={asset.coordinates}
                category={asset.category}
                assetTitle={asset.title}
              />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 font-mono uppercase">Verified Legal Prospectus & Audit Filings</h4>
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-800">SPV Legal Prospectus & Escrow Deed ({asset.symbol})</span>
                  </div>
                  <a
                    href={asset.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 hover:underline font-mono text-[11px] flex items-center space-x-1"
                  >
                    <span>Inspect SPV Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-slate-600" />
                    <span className="font-bold text-slate-800">Auditor Certificate ({asset.company.auditor})</span>
                  </div>
                  <span className="text-emerald-700 font-mono text-[11px] font-bold">VERIFIED ON-CHAIN</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vcs' && (
            <div className="space-y-3 text-xs font-mono">
              <h4 className="font-bold text-slate-900 uppercase">W3C Verifiable Credentials Attached to Pool</h4>
              <div className="space-y-2">
                {asset.verifiableCredentials.map((vc) => (
                  <div key={vc.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{vc.type}</span>
                      <span className="text-emerald-700">VERIFIED</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Issuer DID: {vc.issuerDID}</div>
                    <div className="text-[10px] text-slate-400">Proof Hash: {vc.proofHash}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
