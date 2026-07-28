import React, { useState } from 'react';
import { UserProfile, RwaAsset } from '../types';
import { FileBadge, ShieldCheck, CheckCircle2, Lock, ExternalLink, Code, Copy, Check } from 'lucide-react';

interface VcCredentialsViewProps {
  user: UserProfile;
  assets: RwaAsset[];
}

export const VcCredentialsView: React.FC<VcCredentialsViewProps> = ({ user, assets }) => {
  const [copiedDid, setCopiedDid] = useState<boolean>(false);
  const [selectedVc, setSelectedVc] = useState<any>(null);

  // Aggregate all VCs from assets + user profile
  const allVcs = [
    {
      id: 'vc-user-identity',
      title: 'Level-1 Verified Identity Passport',
      type: 'W3CIdentityCredential',
      issuer: 'did:copym:issuer:compliance-subnet-01',
      issuanceDate: '2026-06-12',
      status: 'valid',
      proofHash: '0x8f92a01948b291c40f129a029f120194a029',
      subject: {
        holderName: user.name,
        holderDID: user.holderDid,
        kycLevel: user.kycLevel,
        status: 'VERIFIED_RESIDENT',
      },
    },
    ...assets.flatMap((a) =>
      a.verifiableCredentials.map((vc) => ({
        id: vc.id,
        title: `${a.title} Asset Verification`,
        type: vc.type,
        issuer: vc.issuerDID,
        issuanceDate: vc.issuanceDate,
        status: vc.verifiedStatus,
        proofHash: vc.proofHash,
        subject: vc.credentialSubject,
      }))
    ),
  ];

  const handleCopyDid = () => {
    navigator.clipboard.writeText(user.holderDid);
    setCopiedDid(true);
    setTimeout(() => setCopiedDid(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top DID Document Header */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200">
              <FileBadge className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">W3C Decentralized Identity (DID) Document</h2>
              <p className="text-xs text-slate-500">Cryptographic Zero-Knowledge Investor Identity Passport</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs font-mono">
            <span className="text-slate-500">Holder DID:</span>
            <span className="text-slate-900 font-bold">{user.holderDid}</span>
            <button
              onClick={handleCopyDid}
              className="p-1 rounded text-slate-500 hover:text-slate-900 transition"
              title="Copy DID"
            >
              {copiedDid ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero-Knowledge Verification Architecture</span>
          </div>
          <p className="leading-relaxed">
            All token purchases and accreditation permissions on COPYM are cryptographically proved using W3C Verifiable Credentials. Third-party auditors or regulators can verify your compliance status without inspecting personal identifying data.
          </p>
        </div>
      </div>

      {/* VC Credentials List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
            Verified W3C Credentials ({allVcs.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allVcs.map((vc) => (
            <div
              key={vc.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold font-mono border border-slate-200">
                  {vc.type}
                </span>

                <span className="flex items-center space-x-1 text-xs text-emerald-700 font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CRYPTOGRAPHICALLY VALID</span>
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{vc.title}</h4>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">Issuer: {vc.issuer}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[10px] text-slate-700 space-y-1">
                <div>Proof Hash: <span className="text-slate-500">{vc.proofHash}</span></div>
                <div>Issued Date: <span className="text-slate-500">{vc.issuanceDate}</span></div>
              </div>

              <button
                onClick={() => setSelectedVc(selectedVc?.id === vc.id ? null : vc)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition flex items-center justify-center space-x-1.5 border border-slate-200"
              >
                <Code className="w-3.5 h-3.5" />
                <span>{selectedVc?.id === vc.id ? 'Hide Raw VC JSON' : 'Inspect Raw W3C JSON'}</span>
              </button>

              {selectedVc?.id === vc.id && (
                <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[10px] text-emerald-400 overflow-x-auto max-h-48">
                  {JSON.stringify(vc, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
