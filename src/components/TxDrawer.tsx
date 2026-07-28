import React from 'react';
import { TxLog } from '../types';
import { X, History, ExternalLink, ShieldCheck, CheckCircle2, FileBadge } from 'lucide-react';

interface TxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: TxLog[];
}

export const TxDrawer: React.FC<TxDrawerProps> = ({ isOpen, onClose, transactions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border-l border-slate-200 w-full max-w-md h-full flex flex-col justify-between shadow-2xl font-sans">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-900 text-white">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Fireblocks On-Chain Logs</h3>
              <p className="text-[11px] text-slate-500 font-mono">Immutable Settlement Hashes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tx List Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-sm text-xs font-mono"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold uppercase border border-slate-200">
                  {tx.type}
                </span>

                <span className="flex items-center space-x-1 text-emerald-700 font-bold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{tx.status}</span>
                </span>
              </div>

              <div className="font-bold text-slate-900 text-xs font-sans">{tx.assetName}</div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] space-y-1 text-slate-600">
                <div className="truncate">Hash: <span className="text-slate-900 font-bold">{tx.hash}</span></div>
                <div>Block Height: #{tx.blockNumber}</div>
                <div>Signer: {tx.fireblocksSigner}</div>
                {tx.vcHash && <div className="text-emerald-700 font-bold">VC Credential: {tx.vcHash}</div>}
              </div>

              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{tx.timestamp}</span>
                <span>Gas: {tx.gasFee} ETH</span>
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-[11px] text-slate-500 font-mono">
          Fireblocks Subnet Nodes Active • 100% On-Chain Verifiable
        </div>
      </div>
    </div>
  );
};
