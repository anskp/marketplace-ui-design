import React, { useState } from 'react';
import { RwaAsset } from '../types';
import { Heart, ArrowUpRight, User } from 'lucide-react';

interface RwaCardProps {
  asset: RwaAsset;
  onSelectAsset: (asset: RwaAsset) => void;
  isSecondaryMarket?: boolean;
  sellerName?: string;
  sellerAvatar?: string;
}

export const RwaCard: React.FC<RwaCardProps> = ({
  asset,
  onSelectAsset,
  isSecondaryMarket = false,
  sellerName = '@crypto_vault',
  sellerAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(asset.id === 'rwa-1');

  const percentageFunded = Math.round(((asset.totalTokens - asset.availableTokens) / asset.totalTokens) * 100);

  // Category specific border outline & accent colors
  const getCategoryStyles = () => {
    switch (asset.category) {
      case 'carbon':
        return {
          cardBorder: 'border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md',
          badgeBg: 'bg-emerald-600 text-white',
          accentColor: '#10b981',
          progressFill: 'bg-emerald-500',
          progressText: 'text-emerald-600',
          buyBtnText: 'text-emerald-600 hover:text-emerald-700 font-extrabold',
        };
      case 'real_estate':
        return {
          cardBorder: 'border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md',
          badgeBg: 'bg-blue-600 text-white',
          accentColor: '#3b82f6',
          progressFill: 'bg-blue-500',
          progressText: 'text-blue-600',
          buyBtnText: 'text-blue-600 hover:text-blue-700 font-extrabold',
        };
      case 'fine_art':
        return {
          cardBorder: 'border border-slate-200 shadow-xs hover:border-pink-500 hover:shadow-md',
          badgeBg: 'bg-pink-600 text-white',
          accentColor: '#ec4899',
          progressFill: 'bg-pink-500',
          progressText: 'text-pink-600',
          buyBtnText: 'text-pink-600 hover:text-pink-700 font-extrabold',
        };
      case 'private_debt':
        return {
          cardBorder: 'border border-slate-200 shadow-xs hover:border-indigo-500 hover:shadow-md',
          badgeBg: 'bg-indigo-600 text-white',
          accentColor: '#6366f1',
          progressFill: 'bg-indigo-500',
          progressText: 'text-indigo-600',
          buyBtnText: 'text-indigo-600 hover:text-indigo-700 font-extrabold',
        };
      default:
        return {
          cardBorder: 'border border-slate-200 shadow-xs hover:border-violet-500 hover:shadow-md',
          badgeBg: 'bg-violet-600 text-white',
          accentColor: '#8b5cf6',
          progressFill: 'bg-violet-500',
          progressText: 'text-violet-600',
          buyBtnText: 'text-violet-600 hover:text-violet-700 font-extrabold',
        };
    }
  };

  const style = getCategoryStyles();

  return (
    <div
      onClick={() => onSelectAsset(asset)}
      className={`bg-white rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group ${style.cardBorder}`}
    >
      <div>
        {/* Full-width Image Wrapper at top of card */}
        <div className="relative w-full h-44 bg-slate-100">
          <img
            src={asset.image}
            alt={asset.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category Badge Top Left */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg font-bold text-[10px] tracking-wider uppercase shadow-xs ${style.badgeBg}`}>
            {asset.category.replace('_', ' ')}
          </div>

          {/* Heart Favorite Top Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md cursor-pointer transition hover:scale-110"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isLiked ? 'fill-[#ff3b30] text-[#ff3b30]' : 'text-[#7e7e9a]'
              }`}
            />
          </button>

          {/* Company Profile Avatar in Bottom Left Side of the Token Picture */}
          <div className="absolute -bottom-4 left-3.5 z-10">
            <img
              src={
                isSecondaryMarket
                  ? sellerAvatar
                  : asset.company.avatar ||
                    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=80&q=80'
              }
              alt={isSecondaryMarket ? sellerName : asset.company.name}
              className="w-10 h-10 rounded-full border-2 border-white bg-white shadow-md object-cover"
            />
          </div>
        </div>

        {/* Card Details Section (Outside image, inside card) */}
        <div className="pt-6 px-4 pb-4 space-y-3">
          {/* Title & Issuer/Seller Name */}
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-[#1b1b2f] line-clamp-1 group-hover:text-black transition-colors">
              {asset.title}
            </h3>
            <p className="text-[11px] text-[#7e7e9a] font-medium flex items-center space-x-1">
              {isSecondaryMarket ? (
                <>
                  <User className="w-3 h-3 text-black" />
                  <span>Seller: {sellerName}</span>
                </>
              ) : (
                <span>By {asset.company.name}</span>
              )}
            </p>
          </div>

          {/* Primary Market: Show Investing Progress Bar */}
          {!isSecondaryMarket && (
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-[#7e7e9a] font-medium">Investing Progress</span>
                <span className={`font-extrabold ${style.progressText}`}>{percentageFunded}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${style.progressFill}`}
                  style={{ width: `${percentageFunded}%` }}
                />
              </div>
            </div>
          )}

          {/* Secondary Market: Show P2P Resale Info Badge */}
          {isSecondaryMarket && (
            <div className="p-2 bg-slate-50 border border-slate-100 rounded-[10px] flex items-center justify-between text-[10px] font-semibold text-[#7e7e9a]">
              <span>P2P Secondary Transfer</span>
              <span className="text-[#24c287] font-bold">Instant Escrow</span>
            </div>
          )}

          {/* Card Divider */}
          <div className="border-t border-slate-100 pt-1.5" />

          {/* Price & Buy Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#7e7e9a] font-medium">
                {isSecondaryMarket ? 'Asking Price' : 'Token Price'}
              </span>
              <span className="text-sm font-extrabold text-[#1b1b2f]">${asset.pricePerToken.toFixed(2)}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectAsset(asset);
              }}
              className={`font-bold text-xs flex items-center space-x-1 cursor-pointer transition ${style.buyBtnText}`}
            >
              <span>{isSecondaryMarket ? 'Trade P2P' : 'Buy Now'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
