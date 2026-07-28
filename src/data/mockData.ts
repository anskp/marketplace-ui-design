import { RwaAsset, UserProfile, PortfolioHolding, TxLog, SoulboundToken } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Zack Foster",
  email: "zack.foster@copym.io",
  holderDid: "did:copym:0x8F92a3401c29e18bC49a715C",
  walletAddress: "0x7F2e89d1A93402C931f8C41d2B",
  network: "COPYM Appchain L2 (Fireblocks Custody)",
  kycLevel: 1,
  kycStatus: "pending",
  isAccreditedInvestor: false,
  balanceUsdc: 148250.00,
  copymTokens: 24500,
  soulboundTokens: [
    {
      id: "sbt-kyc-01",
      title: "COPYM Level-1 ID Verified",
      category: "kyc",
      issuedAt: "2026-06-12",
      description: "Cryptographically verified identity passport issued by COPYM Compliance Subnet.",
      contractAddress: "0x38f1a...4920",
      tokenId: "1092"
    },
    {
      id: "sbt-esg-02",
      title: "Green Pioneer SBT",
      category: "esg",
      issuedAt: "2026-07-01",
      description: "Proof of offsetting 50+ metric tons of CO2 via verified RWA carbon credits.",
      contractAddress: "0x91a2b...18f3",
      tokenId: "4401"
    }
  ]
};

export const INITIAL_TRANSACTIONS: TxLog[] = [
  {
    id: "tx-101",
    hash: "0x8f192a401c2b539810a9f24c08e1a539201a403d91c28f731a59e",
    type: "BUY_FRACTIONAL",
    assetName: "Amazon Basin Rainforest CO2 Credit Pool #04",
    amount: 1250,
    symbol: "AMZ-CO2",
    status: "CONFIRMED",
    timestamp: "2026-07-24 15:42:10",
    blockNumber: 19842011,
    gasFee: 0.0012,
    fireblocksSigner: "Fireblocks MPC Vault #02 (Geneva Subnet)",
    vcHash: "vc:w3c:did:copym:amz-co2:0x89a1f2"
  },
  {
    id: "tx-102",
    hash: "0x39a1c402d8f9a2b101c54e20982301a2f4091a104c8f29d",
    type: "YIELD_PAYOUT",
    assetName: "Manhattan Prime Commercial Tower Token",
    amount: 340.50,
    symbol: "MNHT-RWA",
    status: "CONFIRMED",
    timestamp: "2026-07-22 09:15:00",
    blockNumber: 19839100,
    gasFee: 0.0008,
    fireblocksSigner: "Automated Smart Escrow Distribution Pool",
    vcHash: "vc:yield:payout:0x391f"
  },
  {
    id: "tx-103",
    hash: "0x12c8a910f29b401e92c401a5928f01a391c04f912c",
    type: "FIREBLOCKS_SIGN",
    assetName: "Picasso 1932 'Femme Assise' Fine Art Vault",
    amount: 5000,
    symbol: "ART-PCS",
    status: "CONFIRMED",
    timestamp: "2026-07-20 18:02:44",
    blockNumber: 19832049,
    gasFee: 0.0021,
    fireblocksSigner: "Fireblocks Quorum Signer BNY Mellon Custody",
    vcHash: "vc:art:provenance:0x1928a"
  },
  {
    id: "tx-104",
    hash: "0x918a201c38f910a2b49102c481e01a9f302a1c028e",
    type: "KYC_VC_ISSUED",
    assetName: "Accredited Investor VC Credential",
    amount: 0,
    symbol: "DID-VC",
    status: "CONFIRMED",
    timestamp: "2026-07-15 11:20:05",
    blockNumber: 19810022,
    gasFee: 0.0005,
    fireblocksSigner: "COPYM Compliance Subnet Authority",
    vcHash: "vc:w3c:accredited:zack-foster"
  }
];

export const INITIAL_HOLDINGS: PortfolioHolding[] = [
  {
    assetId: "rwa-carbon-01",
    assetTitle: "Amazon Basin Rainforest CO2 Credit Pool #04",
    symbol: "AMZ-CO2",
    category: "carbon",
    tokensOwned: 250,
    avgBuyPrice: 48.00,
    currentPrice: 52.40,
    totalValue: 13100.00,
    unrealizedProfit: 1100.00,
    yieldEarnedToDate: 420.00,
    carbonOffsetEarnedTotal: 125.0,
    purchasedAt: "2026-06-15"
  },
  {
    assetId: "rwa-realestate-01",
    assetTitle: "Manhattan Prime Commercial Tower",
    symbol: "MNHT-RWA",
    category: "real_estate",
    tokensOwned: 400,
    avgBuyPrice: 100.00,
    currentPrice: 108.50,
    totalValue: 43400.00,
    unrealizedProfit: 3400.00,
    yieldEarnedToDate: 1280.00,
    purchasedAt: "2026-05-10"
  },
  {
    assetId: "rwa-debt-01",
    assetTitle: "Solar Infra Senior Secured Debt Tranche A",
    symbol: "SLR-DEBT",
    category: "private_debt",
    tokensOwned: 100,
    avgBuyPrice: 250.00,
    currentPrice: 258.00,
    totalValue: 25800.00,
    unrealizedProfit: 800.00,
    yieldEarnedToDate: 1450.00,
    purchasedAt: "2026-04-01"
  }
];

export const RWA_ASSETS_DATA: RwaAsset[] = [
  {
    id: "rwa-carbon-01",
    title: "Amazon Basin Rainforest CO2 Credit Pool #04",
    symbol: "AMZ-CO2",
    category: "carbon",
    subcategory: "REDD+ Rainforest Conservation",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 52.40,
    totalMarketCap: 12500000,
    availableTokens: 82400,
    totalTokens: 238549,
    annualYieldApy: 7.8,
    riskRating: "AAA",
    location: "Pará & Amazonas State, Brazil",
    coordinates: {
      lat: -3.4653,
      lng: -62.2159,
      zoom: 12,
      gridResolution: "10m Sentinel-2 Multispectral LandSat"
    },
    carbonDetails: {
      co2OffsetTotal: 250000,
      co2OffsetPerToken: 0.50, // 0.5 metric ton CO2 per token
      standardRegistry: "Verra VCS Registry ID #2819",
      vintageYear: 2025,
      methodology: "VM0015 Avoided Unplanned Deforestation",
      satelliteSensor: "European Space Agency Sentinel-2A Laser LIDAR"
    },
    company: {
      name: "BioCarbon Reserve Earth S.A.",
      jurisdiction: "Luxembourg & Manaus, Brazil",
      registrationNumber: "LUX-B29104928",
      custodian: "Fireblocks Institutional Vault & BNY Mellon Trust",
      auditor: "PwC ESG & Climate Assurance Advisory",
      insuranceUnderwriter: "Lloyd's of London Environmental Risk Pool",
      website: "https://biocarbon-earth.example.com",
      description: "BioCarbon Reserve preserves 140,000 hectares of primary Amazon rainforest with real-time IoT satellite canopy monitoring and indigenous community revenue-sharing contracts."
    },
    verifiableCredentials: [
      {
        id: "vc-verra-amz-01",
        type: "VerraRegistryVerification",
        issuerDID: "did:copym:issuer:verra-vcs-registry",
        issuanceDate: "2026-01-15",
        credentialSubject: {
          serialNumbers: "VCS-2819-2025-001-250000",
          verifier: "SGS International ESG Audit",
          status: "ACTIVE_RESERVED",
          co2Tonnes: 250000
        },
        proofHash: "0x89f2a01948b291c40f129a029f120194a029",
        signature: "ed25519:sig:918a201f92a401c",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x39f2a104f8291e02941c48a1098201a40391f41e",
    tokenStandard: "ERC-3643 (Verified Carbon Extension)",
    tags: ["Carbon Credits", "Verra VCS", "High Yield", "ESG Tier 1"],
    chartHistory: [
      { date: "Jan", price: 42.10, yieldApy: 7.2, volume: 120000, carbonOffset: 0.48 },
      { date: "Feb", price: 44.50, yieldApy: 7.4, volume: 180000, carbonOffset: 0.49 },
      { date: "Mar", price: 46.80, yieldApy: 7.5, volume: 210000, carbonOffset: 0.49 },
      { date: "Apr", price: 48.00, yieldApy: 7.6, volume: 290000, carbonOffset: 0.50 },
      { date: "May", price: 50.20, yieldApy: 7.7, volume: 340000, carbonOffset: 0.50 },
      { date: "Jun", price: 51.10, yieldApy: 7.8, volume: 410000, carbonOffset: 0.50 },
      { date: "Jul", price: 52.40, yieldApy: 7.8, volume: 520000, carbonOffset: 0.50 }
    ]
  },
  {
    id: "rwa-realestate-01",
    title: "Manhattan Prime Commercial Tower",
    symbol: "MNHT-RWA",
    category: "real_estate",
    subcategory: "Grade A Manhattan Commercial Office & Retail",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 108.50,
    totalMarketCap: 45000000,
    availableTokens: 112000,
    totalTokens: 414746,
    annualYieldApy: 9.2,
    riskRating: "AA+",
    location: "450 Lexington Ave, New York, NY 10017",
    coordinates: {
      lat: 40.7532,
      lng: -73.9749,
      zoom: 17,
      gridResolution: "0.25m High Resolution LIDAR & Aerial 3D Mesh"
    },
    realEstateDetails: {
      propertyType: "High-Rise Commercial & Tech Hub",
      occupancyRate: 97.4,
      sqft: 285000,
      monthlyRentalIncome: 345000,
      appraisalValue: 46200000
    },
    company: {
      name: "Lexington Plaza PropCo LLC",
      jurisdiction: "Delaware, USA",
      registrationNumber: "DE-LLC-781920",
      custodian: "Fireblocks Institutional Custody & State Street Corp",
      auditor: "Deloitte Real Estate Advisory",
      insuranceUnderwriter: "AIG Commercial Property Assurance",
      website: "https://lexington-plaza.example.com",
      description: "A 32-story landmark class A commercial office building located in midtown Manhattan leased to AAA tech and financial tenants with 8.5-year average lease terms."
    },
    verifiableCredentials: [
      {
        id: "vc-title-mnht-01",
        type: "NYRealEstateTitleCredential",
        issuerDID: "did:copym:issuer:ny-deeds-registry",
        issuanceDate: "2025-11-20",
        credentialSubject: {
          deedNumber: "NY-BK-40192-2025",
          assessedValueUSD: 46200000,
          titleInsurance: "First American Title Corp Policy #88129"
        },
        proofHash: "0x12a9f4019c28e91024f01a39281a029c",
        signature: "ecdsa:p256:0x391f2a01",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x78a1f201948b291c40291e02941c4810291e0294",
    tokenStandard: "ERC-3643 (Compliant RWA Real Estate)",
    tags: ["Real Estate", "Manhattan", "Quarterly Rental Yield", "Class A"],
    chartHistory: [
      { date: "Jan", price: 98.00, yieldApy: 8.8, volume: 500000 },
      { date: "Feb", price: 100.20, yieldApy: 8.9, volume: 620000 },
      { date: "Mar", price: 102.50, yieldApy: 9.0, volume: 710000 },
      { date: "Apr", price: 104.00, yieldApy: 9.1, volume: 830000 },
      { date: "May", price: 106.10, yieldApy: 9.1, volume: 920000 },
      { date: "Jun", price: 107.40, yieldApy: 9.2, volume: 1050000 },
      { date: "Jul", price: 108.50, yieldApy: 9.2, volume: 1200000 }
    ]
  },
  {
    id: "rwa-art-01",
    title: "Picasso 1932 'Femme Assise' Masterpiece",
    symbol: "ART-PCS",
    category: "fine_art",
    subcategory: "Modern Masters Fine Art Blue-Chip Collection",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 310.00,
    totalMarketCap: 18500000,
    availableTokens: 14200,
    totalTokens: 59677,
    annualYieldApy: 12.4, // estimated appreciation + museum loan fees
    riskRating: "A",
    location: "Geneva Free Port Ultra-Secure Vault B-14, Switzerland",
    coordinates: {
      lat: 46.2044,
      lng: 6.1432,
      zoom: 16,
      gridResolution: "100x Optical Micro-Texture Art Scan"
    },
    fineArtDetails: {
      artist: "Pablo Picasso",
      yearCreated: 1932,
      medium: "Oil on canvas, 130 x 97 cm",
      vaultLocation: "Geneva Free Port Custom Vault B-14",
      provenanceHistoryCount: 14
    },
    company: {
      name: "Bluechip Fine Art Trust AG",
      jurisdiction: "Zug, Switzerland",
      registrationNumber: "CHE-482.109.301",
      custodian: "Geneva Free Port Vaults & AXA Fine Art Risk",
      auditor: "Sotheby's Fine Art Appraisal Advisory",
      insuranceUnderwriter: "AXA XL Fine Art & Specie Insurance ($22M coverage)",
      website: "https://bluechip-art.example.com",
      description: "Fractional tokenized ownership of an iconic 1932 masterpiece by Pablo Picasso with guaranteed museum loan royalty dividends and insured climate-controlled storage."
    },
    verifiableCredentials: [
      {
        id: "vc-provenance-pcs-01",
        type: "SothebysArtProvenanceCertificate",
        issuerDID: "did:copym:issuer:sothebys-appraisal-node",
        issuanceDate: "2025-09-10",
        credentialSubject: {
          appraisalValueUSD: 22000000,
          catalogueRaisonneRef: "Zervos VII, 381",
          conditionReport: "Pristine original canvas with microscopic pigment verification"
        },
        proofHash: "0x789f2a019481e0294c1029412e0291a0",
        signature: "secp256k1:sig:0x89a1f201948b",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x891a201c40291e02941c4810291e02941c481029",
    tokenStandard: "ERC-3643 (Fractionalized Fine Art Vault)",
    tags: ["Blue-Chip Art", "Picasso 1932", "Geneva Vault", "Museum Royalty"],
    chartHistory: [
      { date: "Jan", price: 270.00, yieldApy: 11.5, volume: 300000 },
      { date: "Feb", price: 278.00, yieldApy: 11.8, volume: 350000 },
      { date: "Mar", price: 285.00, yieldApy: 12.0, volume: 410000 },
      { date: "Apr", price: 292.00, yieldApy: 12.1, volume: 480000 },
      { date: "May", price: 298.00, yieldApy: 12.2, volume: 550000 },
      { date: "Jun", price: 305.00, yieldApy: 12.3, volume: 620000 },
      { date: "Jul", price: 310.00, yieldApy: 12.4, volume: 780000 }
    ]
  },
  {
    id: "rwa-debt-01",
    title: "Solar Infra Senior Secured Debt Tranche A",
    symbol: "SLR-DEBT",
    category: "private_debt",
    subcategory: "Renewable Infrastructure First-Lien Credit",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 258.00,
    totalMarketCap: 30000000,
    availableTokens: 45000,
    totalTokens: 116279,
    annualYieldApy: 11.5,
    riskRating: "AAA",
    location: "Mojave Desert Clean Energy Facility, California, USA",
    coordinates: {
      lat: 35.011,
      lng: -115.4734,
      zoom: 14,
      gridResolution: "1m High Resolution Solar Array Photogrammetry"
    },
    debtDetails: {
      borrowerName: "Mojave Solar Farm Operating Co. LLC",
      seniority: "Senior Secured First Lien (1st Mortgage on Land & Equipment)",
      collateralCoverage: 185, // 185% collateral ratio
      maturityDate: "2029-12-31",
      couponPaymentFrequency: "Monthly Direct USDC Auto-Distributions"
    },
    company: {
      name: "SolCap Credit Capital SPV",
      jurisdiction: "Delaware, USA",
      registrationNumber: "DE-SPV-991823",
      custodian: "Fireblocks Institutional Vault & US Bank Escrow",
      auditor: "Ernst & Young Infrastructure Advisory",
      insuranceUnderwriter: "Aon Power & Energy Risk Underwriters",
      website: "https://solcap-credit.example.com",
      description: "First-lien senior debt facility backed by 450MW utility-scale solar generation equipment with 20-year power purchase agreements (PPAs) with Southern California Edison."
    },
    verifiableCredentials: [
      {
        id: "vc-debt-ppa-01",
        type: "UtilityPPAContractVerification",
        issuerDID: "did:copym:issuer:california-puc-registry",
        issuanceDate: "2026-02-01",
        credentialSubject: {
          ppaPartner: "Southern California Edison (SCE - Rated A)",
          termYears: 20,
          guaranteedPricePerMWh: 68.50
        },
        proofHash: "0x391f2a01948c29104f12019412e0291a",
        signature: "ed25519:sig:0x981a201f92a4",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x12a9f4019c28e91024f01a39281a029c40291e02",
    tokenStandard: "ERC-3643 (Fixed Income RWA Protocol)",
    tags: ["Private Debt", "11.5% APY", "Monthly Coupon", "Senior Secured"],
    chartHistory: [
      { date: "Jan", price: 250.00, yieldApy: 11.2, volume: 400000 },
      { date: "Feb", price: 251.50, yieldApy: 11.3, volume: 450000 },
      { date: "Mar", price: 253.00, yieldApy: 11.4, volume: 520000 },
      { date: "Apr", price: 254.20, yieldApy: 11.4, volume: 580000 },
      { date: "May", price: 255.80, yieldApy: 11.5, volume: 640000 },
      { date: "Jun", price: 257.00, yieldApy: 11.5, volume: 710000 },
      { date: "Jul", price: 258.00, yieldApy: 11.5, volume: 820000 }
    ]
  },
  {
    id: "rwa-commodities-01",
    title: "Physical Investment Gold Bullion (LBMA 999.9)",
    symbol: "AUX-GOLD",
    category: "commodities",
    subcategory: "Physical Vaulted Allocated Gold Bullion",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 84.50, // per 1 gram of 999.9 pure fine gold
    totalMarketCap: 50000000,
    availableTokens: 185000,
    totalTokens: 591715,
    annualYieldApy: 4.5, // Gold lending/leasing yield
    riskRating: "AAA",
    location: "Loomis International High-Security Vault, Zurich Airport",
    coordinates: {
      lat: 47.4647,
      lng: 8.5492,
      zoom: 15,
      gridResolution: "Assay Laboratory Serial Scan"
    },
    company: {
      name: "Aurum Swiss Precious Metals AG",
      jurisdiction: "Zurich, Switzerland",
      registrationNumber: "CHE-109.391.842",
      custodian: "Loomis International & Fireblocks MPC Custody",
      auditor: "Inspectorate International LBMA Assay Audit",
      insuranceUnderwriter: "Zurich Insurance Co Fine Metals Policy ($60M)",
      website: "https://aurum-swiss.example.com",
      description: "100% physically allocated, LBMA-certified 999.9 pure gold bars vaulted in Zurich with 1:1 serial bar tracking, quarterly physical assay audits, and physical redemption options."
    },
    verifiableCredentials: [
      {
        id: "vc-gold-assay-01",
        type: "LBMABullionAssayCredential",
        issuerDID: "did:copym:issuer:lbma-assay-zurich",
        issuanceDate: "2026-03-10",
        credentialSubject: {
          vaultRef: "ZH-VAULT-BAR-89210-89250",
          purityPercent: 99.99,
          totalKilograms: 591.715
        },
        proofHash: "0x40192a01948c29104f12019412e0291a029",
        signature: "ecdsa:p256:0x192a01f92a401c",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x981a201c40291e02941c4810291e02941c481029",
    tokenStandard: "ERC-3643 (Allocated Commodity Standard)",
    tags: ["Physical Gold", "LBMA Certified", "Zurich Vault", "Instant Redeem"],
    chartHistory: [
      { date: "Jan", price: 74.00, yieldApy: 4.2, volume: 800000 },
      { date: "Feb", price: 76.50, yieldApy: 4.3, volume: 920000 },
      { date: "Mar", price: 78.20, yieldApy: 4.4, volume: 1100000 },
      { date: "Apr", price: 80.00, yieldApy: 4.4, volume: 1250000 },
      { date: "May", price: 81.80, yieldApy: 4.5, volume: 1400000 },
      { date: "Jun", price: 83.10, yieldApy: 4.5, volume: 1600000 },
      { date: "Jul", price: 84.50, yieldApy: 4.5, volume: 1850000 }
    ]
  },
  {
    id: "rwa-treasury-01",
    title: "BlackRock Short-Term US Treasury Pool",
    symbol: "BUIDL-TBILL",
    category: "treasury",
    subcategory: "Institutional 0-3M US Treasury Liquidity",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 100.00,
    totalMarketCap: 185000000,
    availableTokens: 520000,
    totalTokens: 1850000,
    annualYieldApy: 5.35,
    riskRating: "AAA",
    location: "Federal Reserve Bank of New York Vaults, NY",
    coordinates: {
      lat: 40.7081,
      lng: -74.0086,
      zoom: 16,
      gridResolution: "FedWire Settlement Ledger & BNY Mellon Custody"
    },
    debtDetails: {
      borrowerName: "United States Department of the Treasury",
      seniority: "Sovereign Debt Direct Guarantee",
      collateralCoverage: 100,
      maturityDate: "2026-11-30",
      couponPaymentFrequency: "Daily Compound Accrual USDC Payout"
    },
    company: {
      name: "BlackRock Financial Management Inc.",
      jurisdiction: "New York, USA",
      registrationNumber: "SEC-801-19203",
      custodian: "BNY Mellon & Fireblocks Institutional Custody",
      auditor: "PricewaterhouseCoopers LLP",
      insuranceUnderwriter: "US Treasury Sovereign Guarantee",
      website: "https://blackrock.com/buidl",
      description: "Institutional tokenized liquidity pool backed 100% by short-term US Treasury Bills, cash repurchase agreements, and institutional Money Market instruments."
    },
    verifiableCredentials: [
      {
        id: "vc-sec-buidl-01",
        type: "SECFilingVerificationCredential",
        issuerDID: "did:copym:issuer:sec-edgar-registry",
        issuanceDate: "2026-01-10",
        credentialSubject: {
          cikNumber: "0001928301",
          fundType: "Rule 3c-7 Institutional Liquidity Fund",
          dailyNavUSD: 1.0000
        },
        proofHash: "0x892a01f92a401c38f910a2b49102c481",
        signature: "ecdsa:p256:0x391f2a01",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x771f2a01948b291c40291e02941c4810291e0294",
    tokenStandard: "ERC-3643 (Securities & Treasury Standard)",
    tags: ["US T-Bills", "5.35% APY", "BlackRock BUIDL", "Daily Yield"],
    chartHistory: [
      { date: "Jan", price: 100.00, yieldApy: 5.25, volume: 15000000 },
      { date: "Feb", price: 100.00, yieldApy: 5.28, volume: 18000000 },
      { date: "Mar", price: 100.00, yieldApy: 5.30, volume: 22000000 },
      { date: "Apr", price: 100.00, yieldApy: 5.32, volume: 28000000 },
      { date: "May", price: 100.00, yieldApy: 5.33, volume: 35000000 },
      { date: "Jun", price: 100.00, yieldApy: 5.34, volume: 42000000 },
      { date: "Jul", price: 100.00, yieldApy: 5.35, volume: 50000000 }
    ]
  },
  {
    id: "rwa-realestate-02",
    title: "Tokyo Ginza Luxury Retail Flagship SPV",
    symbol: "TOKYO-GINZA",
    category: "real_estate",
    subcategory: "Prime Retail Real Estate - Ginza District",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 215.00,
    totalMarketCap: 38000000,
    availableTokens: 42000,
    totalTokens: 176744,
    annualYieldApy: 8.8,
    riskRating: "AA",
    location: "Ginza 4-Chome, Chuo-ku, Tokyo, Japan",
    coordinates: {
      lat: 35.6712,
      lng: 139.7651,
      zoom: 17,
      gridResolution: "0.2m Tokyo City Survey Mesh"
    },
    realEstateDetails: {
      propertyType: "Ultra-Prime Luxury Fashion Flagship",
      occupancyRate: 100,
      sqft: 18500,
      monthlyRentalIncome: 280000,
      appraisalValue: 39500000
    },
    company: {
      name: "Mitsui Fudosan RWA SPV Corp",
      jurisdiction: "Tokyo, Japan",
      registrationNumber: "JPN-TK-90182",
      custodian: "Sumitomo Mitsui Trust & Fireblocks Vault",
      auditor: "KPMG Azsa LLC Tokyo",
      insuranceUnderwriter: "Tokio Marine & Nichido Fire Insurance",
      website: "https://mitsui-rwa.example.com",
      description: "Grade A luxury retail building in Tokyo's world-renowned Ginza district with 15-year net triple lease with top tier global luxury brands."
    },
    verifiableCredentials: [
      {
        id: "vc-tokyo-deed-01",
        type: "TokyoRealEstateRegistryCredential",
        issuerDID: "did:copym:issuer:tokyo-legal-bureau",
        issuanceDate: "2025-12-01",
        credentialSubject: {
          buildingRegistryNo: "TK-GZ-4012",
          appraisalJPY: 5800000000,
          occupancy: "100%"
        },
        proofHash: "0x3912a01f92a401c38f910a2b49102c48",
        signature: "ecdsa:p256:0x891a201f",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x882a01f92a401c38f910a2b49102c4810291e029",
    tokenStandard: "ERC-3643 (Japan Securities Standard)",
    tags: ["Tokyo Ginza", "8.8% APY", "100% Leased", "Luxury Flagship"],
    chartHistory: [
      { date: "Jan", price: 195.00, yieldApy: 8.5, volume: 400000 },
      { date: "Feb", price: 198.50, yieldApy: 8.6, volume: 480000 },
      { date: "Mar", price: 202.00, yieldApy: 8.6, volume: 550000 },
      { date: "Apr", price: 206.00, yieldApy: 8.7, volume: 620000 },
      { date: "May", price: 209.50, yieldApy: 8.7, volume: 710000 },
      { date: "Jun", price: 212.00, yieldApy: 8.8, volume: 800000 },
      { date: "Jul", price: 215.00, yieldApy: 8.8, volume: 950000 }
    ]
  },
  {
    id: "rwa-art-02",
    title: "Monet 1899 'Water Lilies Pond' Vault",
    symbol: "ART-MONET",
    category: "fine_art",
    subcategory: "Impressionist Masterpiece Collection",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 480.00,
    totalMarketCap: 28000000,
    availableTokens: 12500,
    totalTokens: 58333,
    annualYieldApy: 13.8,
    riskRating: "A",
    location: "Zurich High Security Fine Art Vault, Switzerland",
    coordinates: {
      lat: 47.3769,
      lng: 8.5417,
      zoom: 16,
      gridResolution: "100x Micro-Surface Texture Scan"
    },
    fineArtDetails: {
      artist: "Claude Monet",
      yearCreated: 1899,
      medium: "Oil on canvas, 89 x 93 cm",
      vaultLocation: "Zurich Le Freeport Custom Vault",
      provenanceHistoryCount: 18
    },
    company: {
      name: "Christie's Art Vaults SPV",
      jurisdiction: "Zurich, Switzerland",
      registrationNumber: "CHE-819.301.992",
      custodian: "Zurich Free Port & AXA Fine Art",
      auditor: "Christie's International Appraisal",
      insuranceUnderwriter: "Lloyd's Fine Art Syndicate ($32M)",
      website: "https://christies-vaults.example.com",
      description: "Authentic 1899 Claude Monet Water Lilies masterpiece held in museum-grade Swiss vaulting with global exhibition leasing rights."
    },
    verifiableCredentials: [
      {
        id: "vc-monet-01",
        type: "ChristiesAppraisalCredential",
        issuerDID: "did:copym:issuer:christies-art-node",
        issuanceDate: "2025-10-15",
        credentialSubject: {
          appraisalUSD: 32000000,
          wildensteinIndex: "W. 1512",
          condition: "Excellent Original Condition"
        },
        proofHash: "0x7721a01f92a401c38f910a2b49102c48",
        signature: "secp256k1:sig:0x192a01",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x992a01f92a401c38f910a2b49102c4810291e029",
    tokenStandard: "ERC-3643 (Fine Art Vault)",
    tags: ["Monet 1899", "Swiss Vault", "Christie's Insured", "Blue-Chip Art"],
    chartHistory: [
      { date: "Jan", price: 420.00, yieldApy: 12.8, volume: 300000 },
      { date: "Feb", price: 435.00, yieldApy: 13.0, volume: 380000 },
      { date: "Mar", price: 448.00, yieldApy: 13.2, volume: 450000 },
      { date: "Apr", price: 460.00, yieldApy: 13.4, volume: 520000 },
      { date: "May", price: 470.00, yieldApy: 13.6, volume: 600000 },
      { date: "Jun", price: 475.00, yieldApy: 13.7, volume: 680000 },
      { date: "Jul", price: 480.00, yieldApy: 13.8, volume: 750000 }
    ]
  },
  {
    id: "rwa-collectibles-01",
    title: "1962 Ferrari 250 GTO Heritage Vault",
    symbol: "CAR-GTO62",
    category: "collectibles",
    subcategory: "Historic Automotive Heritage Collection",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80",
    pricePerToken: 850.00,
    totalMarketCap: 48000000,
    availableTokens: 9800,
    totalTokens: 56470,
    annualYieldApy: 15.2,
    riskRating: "A",
    location: "Maranello Heritage Climate Vault, Italy",
    coordinates: {
      lat: 44.5323,
      lng: 10.8641,
      zoom: 16,
      gridResolution: "Ferrari Classiche Chassis Matching Certification"
    },
    company: {
      name: "Maranello Classic Vault AG",
      jurisdiction: "Modena, Italy & Zug, Switzerland",
      registrationNumber: "ITA-MOD-90182",
      custodian: "Ferrari Classiche Department & AXA Vintage",
      auditor: "Gooding & Company Automobile Advisory",
      insuranceUnderwriter: "Generali Heritage Automotive Risk Pool ($55M)",
      website: "https://maranello-heritage.example.com",
      description: "Chassis #3851GT 1962 Ferrari 250 GTO with original 3.0L Colombo V12 engine and Ferrari Classiche red book authentication."
    },
    verifiableCredentials: [
      {
        id: "vc-ferrari-classiche-01",
        type: "FerrariClassicheCertification",
        issuerDID: "did:copym:issuer:ferrari-classiche-dept",
        issuanceDate: "2025-08-20",
        credentialSubject: {
          chassisNumber: "3851GT",
          engineMatchingKey: "250-GTO-V12-0012",
          classicheBookNumber: "CR-90182"
        },
        proofHash: "0x112a01f92a401c38f910a2b49102c481",
        signature: "ecdsa:p256:0x981a201",
        verifiedStatus: "valid"
      }
    ],
    smartContractAddress: "0x662a01f92a401c38f910a2b49102c4810291e029",
    tokenStandard: "ERC-3643 (Collectibles & Automotive)",
    tags: ["Ferrari 250 GTO", "Classiche Certified", "15.2% APY", "V12 Heritage"],
    chartHistory: [
      { date: "Jan", price: 720.00, yieldApy: 14.2, volume: 500000 },
      { date: "Feb", price: 750.00, yieldApy: 14.5, volume: 620000 },
      { date: "Mar", price: 780.00, yieldApy: 14.8, volume: 710000 },
      { date: "Apr", price: 810.00, yieldApy: 15.0, volume: 830000 },
      { date: "May", price: 830.00, yieldApy: 15.1, volume: 920000 },
      { date: "Jun", price: 842.00, yieldApy: 15.2, volume: 1050000 },
      { date: "Jul", price: 850.00, yieldApy: 15.2, volume: 1200000 }
    ]
  }
];
