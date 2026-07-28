export type AssetCategory = 'carbon' | 'real_estate' | 'fine_art' | 'private_debt' | 'commodities' | 'treasury' | 'collectibles';

export type RiskRating = 'AAA' | 'AA+' | 'AA' | 'A' | 'BBB+' | 'BB';

export interface PricePoint {
  date: string;
  price: number;
  yieldApy: number;
  volume: number;
  carbonOffset?: number; // tCO2e for carbon tokens
}

export interface CompanyDetails {
  name: string;
  jurisdiction: string;
  registrationNumber: string;
  custodian: string; // e.g. "Fireblocks Vault Custody", "BNY Mellon Trust"
  auditor: string; // e.g. "PwC ESG Audit", "Deloitte Web3 Security"
  insuranceUnderwriter?: string;
  website: string;
  description: string;
}

export interface VerifiableCredential {
  id: string;
  type: string;
  issuerDID: string;
  issuanceDate: string;
  credentialSubject: Record<string, any>;
  proofHash: string;
  signature: string;
  verifiedStatus: 'valid' | 'revoked' | 'pending';
}

export interface SoulboundToken {
  id: string;
  title: string;
  category: 'kyc' | 'accreditation' | 'esg' | 'vip';
  issuedAt: string;
  badgeUrl?: string;
  description: string;
  contractAddress: string;
  tokenId: string;
}

export interface RwaAsset {
  id: string;
  title: string;
  symbol: string;
  category: AssetCategory;
  subcategory: string;
  image: string;
  pricePerToken: number;
  totalMarketCap: number;
  availableTokens: number;
  totalTokens: number;
  annualYieldApy: number;
  riskRating: RiskRating;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
    zoom: number;
    gridResolution: string; // e.g. "10m Sentinel-2 Multispectral"
  };
  
  // Category-specific special attributes
  carbonDetails?: {
    co2OffsetTotal: number; // in tCO2e
    co2OffsetPerToken: number;
    standardRegistry: string; // e.g. "Verra VCS #2819", "Gold Standard GS-10492"
    vintageYear: number;
    methodology: string;
    satelliteSensor: string;
  };
  realEstateDetails?: {
    propertyType: string;
    occupancyRate: number; // percentage
    sqft: number;
    monthlyRentalIncome: number;
    appraisalValue: number;
  };
  fineArtDetails?: {
    artist: string;
    yearCreated: number;
    medium: string;
    vaultLocation: string; // e.g. "Geneva Free Port Vault B-14"
    provenanceHistoryCount: number;
  };
  debtDetails?: {
    borrowerName: string;
    seniority: string; // e.g. "Senior Secured First Lien"
    collateralCoverage: number; // percentage e.g. 155%
    maturityDate: string;
    couponPaymentFrequency: string;
  };
  
  company: CompanyDetails;
  verifiableCredentials: VerifiableCredential[];
  smartContractAddress: string;
  tokenStandard: string; // e.g. "ERC-3643 (RWA Standard)"
  chartHistory: PricePoint[];
  tags: string[];
}

export interface PortfolioHolding {
  assetId: string;
  assetTitle: string;
  symbol: string;
  category: AssetCategory;
  tokensOwned: number;
  avgBuyPrice: number;
  currentPrice: number;
  totalValue: number;
  unrealizedProfit: number;
  yieldEarnedToDate: number;
  carbonOffsetEarnedTotal?: number;
  purchasedAt: string;
}

export type TxStatus = 'CONFIRMED' | 'SIGNING' | 'PENDING' | 'FAILED';

export interface TxLog {
  id: string;
  hash: string;
  type: 'BUY_FRACTIONAL' | 'SELL_FRACTIONAL' | 'YIELD_PAYOUT' | 'KYC_VC_ISSUED' | 'FIREBLOCKS_SIGN' | 'SBT_MINT';
  assetName?: string;
  amount: number;
  symbol?: string;
  status: TxStatus;
  timestamp: string;
  blockNumber: number;
  gasFee: number;
  fireblocksSigner: string;
  vcHash?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  holderDid: string;
  walletAddress: string;
  network: string;
  kycLevel: 1 | 2 | 3;
  kycStatus: 'unverified' | 'pending' | 'verified_level1' | 'verified_level2';
  isAccreditedInvestor: boolean;
  balanceUsdc: number;
  copymTokens: number;
  soulboundTokens: SoulboundToken[];
}
