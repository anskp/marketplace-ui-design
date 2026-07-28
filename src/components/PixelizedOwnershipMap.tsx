import React, { useState } from 'react';
import { RwaAsset } from '../types';
import { ShieldCheck, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface PixelizedOwnershipMapProps {
  asset: RwaAsset;
}

export const PixelizedOwnershipMap: React.FC<PixelizedOwnershipMapProps> = ({ asset }) => {
  const [hoveredCell, setHoveredCell] = useState<{
    id: number;
    isOwned: boolean;
    ownerDid?: string;
  } | null>(null);

  // Calculate percentage tokenized / sold
  const soldTokens = asset.totalTokens - asset.availableTokens;
  const soldPercentage = Number(((soldTokens / asset.totalTokens) * 100).toFixed(1));
  const availablePercentage = Number((100 - soldPercentage).toFixed(1));

  // Generate 20x10 = 200 grid cells representing total token pool distribution
  const totalCells = 160;
  const ownedCellCount = Math.round((soldPercentage / 100) * totalCells);

  return (
    <div className="bg-[#0e1322] text-white rounded-[24px] p-6 shadow-xl border border-slate-800 space-y-5 font-sans relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-[#6c5dd3]/20 border border-[#6c5dd3]/40 text-[#a594ff] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
              <span>Pixelized Asset Ownership Map</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Live on-chain Beneficial Ownership Register (BOR) grid
            </p>
          </div>
        </div>

        {/* Ownership Percentage Badge */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{soldPercentage}% Tokenized & Owned</span>
        </div>
      </div>

      {/* Main Image Container with Pixel Grid Overlay */}
      <div className="relative w-full h-[280px] md:h-[340px] rounded-[18px] overflow-hidden border border-slate-800 bg-[#070a14] group">
        {/* Background Image of the RWA Asset */}
        <img
          src={asset.image}
          alt={asset.title}
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
        />

        {/* Grid Container Matrix */}
        <div className="absolute inset-0 grid grid-cols-16 grid-rows-10 gap-[1px] p-2 bg-slate-900/40 backdrop-blur-[0.5px]">
          {Array.from({ length: totalCells }).map((_, index) => {
            const isOwned = index < ownedCellCount;
            const cellId = index + 1;

            return (
              <div
                key={index}
                onMouseEnter={() =>
                  setHoveredCell({
                    id: cellId,
                    isOwned,
                    ownerDid: isOwned
                      ? `did:copym:0x${(100000 + index * 31).toString(16)}...`
                      : undefined,
                  })
                }
                onMouseLeave={() => setHoveredCell(null)}
                className={`relative transition-all duration-200 cursor-pointer ${
                  isOwned
                    ? 'bg-emerald-400/35 hover:bg-emerald-400/70 border border-emerald-300/40 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                    : 'bg-slate-900/60 hover:bg-slate-700/60 border border-white/5'
                }`}
              />
            );
          })}
        </div>

        {/* Hover Cell Tooltip Overlay */}
        {hoveredCell && (
          <div className="absolute top-4 right-4 bg-[#0a0f1d]/95 backdrop-blur-md border border-slate-700 rounded-xl p-3 text-xs font-mono space-y-1 shadow-2xl z-30 max-w-[240px]">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
              <span>Token Grid #{hoveredCell.id}</span>
              <span className={hoveredCell.isOwned ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {hoveredCell.isOwned ? 'OWNED / LOCKED' : 'AVAILABLE'}
              </span>
            </div>
            {hoveredCell.isOwned ? (
              <div className="text-[10px] space-y-0.5 text-slate-300 pt-1">
                <div>Owner DID: <span className="text-white font-bold">{hoveredCell.ownerDid}</span></div>
                <div>Status: <span className="text-emerald-400">Verified W3C Holder</span></div>
                <div>Fractional Share: <span className="text-white">0.625%</span></div>
              </div>
            ) : (
              <div className="text-[10px] text-slate-400 pt-1">
                Available for primary purchase at ${asset.pricePerToken.toFixed(2)} USDC/token.
              </div>
            )}
          </div>
        )}

        {/* Bottom Floating Legend inside image */}
        <div className="absolute bottom-3 left-3 right-3 bg-[#0a0f1d]/85 backdrop-blur-md border border-slate-800 rounded-xl px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-xs bg-emerald-400/70 border border-emerald-300" />
              <span className="text-slate-300 text-[11px]">Owned / Minted Tokens</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-xs bg-slate-800 border border-white/20" />
              <span className="text-slate-400 text-[11px]">Available Pool</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center space-x-1">
            <Info className="w-3 h-3 text-[#6c5dd3]" />
            <span>Hover over pixels to inspect Beneficial Ownership Register</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Summary Stats Row (Matching user uploaded design) */}
      <div className="space-y-2 pt-1">
        {/* Progress Bar Track */}
        <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            style={{ width: `${soldPercentage}%` }}
          />
        </div>

        {/* Bottom Labels */}
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {soldPercentage}% Invested ({soldTokens.toLocaleString()} Tokens)
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-[#6c5dd3]" />
            <span>
              {availablePercentage}% Available ({asset.availableTokens.toLocaleString()} Tokens)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
