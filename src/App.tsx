import React, { useState } from 'react';
import { UserProfile, RwaAsset, PortfolioHolding, TxLog } from './types';
import { INITIAL_USER_PROFILE, RWA_ASSETS_DATA, INITIAL_HOLDINGS, INITIAL_TRANSACTIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { KycNotificationBanner } from './components/KycNotificationBanner';
import { MarketplaceView } from './components/MarketplaceView';
import { TokensScreenerView } from './components/TokensScreenerView';
import { P2pTradeView } from './components/P2pTradeView';
import { WalletView } from './components/WalletView';
import { ProfileView } from './components/ProfileView';
import { VcCredentialsView } from './components/VcCredentialsView';
import { SettingsKycView } from './components/SettingsKycView';
import { TokenDetailView } from './components/TokenDetailView';
import { AssetDetailModal } from './components/AssetDetailModal';
import { TxDrawer } from './components/TxDrawer';
import { KycModal } from './components/KycModal';
import { SearchModal } from './components/SearchModal';

export default function App() {
  // Global Application State
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [assets, setAssets] = useState<RwaAsset[]>(RWA_ASSETS_DATA);
  const [holdings, setHoldings] = useState<PortfolioHolding[]>(INITIAL_HOLDINGS);
  const [transactions, setTransactions] = useState<TxLog[]>(INITIAL_TRANSACTIONS);

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [previousTab, setPreviousTab] = useState<string>('marketplace');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<RwaAsset | null>(null);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState<boolean>(false);
  const [isTxDrawerOpen, setIsTxDrawerOpen] = useState<boolean>(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Handler: Select Asset to view full page details
  const handleSelectAsset = (asset: RwaAsset) => {
    setSelectedAsset(asset);
    if (activeTab !== 'token_detail') {
      setPreviousTab(activeTab);
    }
    setActiveTab('token_detail');
    setIsSearchModalOpen(false);
  };

  // Handler: Create P2P Secondary Settlement Order
  const handleCreateP2pOrder = (holding: PortfolioHolding, tokenAmount: number, pricePerToken: number) => {
    const totalOrderValue = tokenAmount * pricePerToken;

    // Create Fireblocks audit log
    const newTxHash = '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newTx: TxLog = {
      id: `p2p-${Date.now()}`,
      hash: newTxHash,
      type: 'FIREBLOCKS_SIGN',
      assetName: `P2P Order: ${tokenAmount}x ${holding.symbol} @ $${pricePerToken.toFixed(2)}`,
      amount: totalOrderValue,
      symbol: holding.symbol,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      blockNumber: 19845300,
      gasFee: 0.0008,
      fireblocksSigner: 'P2P Orderbook Escrow Subnet',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler: Execute Fractional RWA Token Purchase
  const handleBuyAsset = (asset: RwaAsset, tokensToBuy: number, totalUsdc: number) => {
    // 1. Deduct USDC balance
    setUser((prev) => ({
      ...prev,
      balanceUsdc: prev.balanceUsdc - totalUsdc,
    }));

    // 2. Reduce available tokens in asset pool
    setAssets((prevAssets) =>
      prevAssets.map((a) =>
        a.id === asset.id
          ? { ...a, availableTokens: Math.max(0, a.availableTokens - tokensToBuy) }
          : a
      )
    );

    // 3. Add or update Portfolio Holdings
    setHoldings((prevHoldings) => {
      const existing = prevHoldings.find((h) => h.assetId === asset.id);

      if (existing) {
        const newTokens = existing.tokensOwned + tokensToBuy;
        const newTotalVal = newTokens * asset.pricePerToken;
        const co2Earned =
          asset.carbonDetails
            ? (existing.carbonOffsetEarnedTotal || 0) + tokensToBuy * asset.carbonDetails.co2OffsetPerToken
            : undefined;

        return prevHoldings.map((h) =>
          h.assetId === asset.id
            ? {
                ...h,
                tokensOwned: newTokens,
                totalValue: newTotalVal,
                carbonOffsetEarnedTotal: co2Earned,
              }
            : h
        );
      } else {
        const newHolding: PortfolioHolding = {
          assetId: asset.id,
          assetTitle: asset.title,
          symbol: asset.symbol,
          category: asset.category,
          tokensOwned: tokensToBuy,
          avgBuyPrice: asset.pricePerToken,
          currentPrice: asset.pricePerToken,
          totalValue: totalUsdc,
          unrealizedProfit: 0,
          yieldEarnedToDate: 0,
          carbonOffsetEarnedTotal: asset.carbonDetails
            ? tokensToBuy * asset.carbonDetails.co2OffsetPerToken
            : undefined,
          purchasedAt: new Date().toISOString().split('T')[0],
        };
        return [newHolding, ...prevHoldings];
      }
    });

    // 4. Create Fireblocks Custody Transaction Log
    const newTxHash = '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newVcHash = 'vc:w3c:did:copym:' + asset.symbol.toLowerCase() + ':' + Math.floor(Math.random() * 100000);

    const newTx: TxLog = {
      id: `tx-${Date.now()}`,
      hash: newTxHash,
      type: 'BUY_FRACTIONAL',
      assetName: asset.title,
      amount: totalUsdc,
      symbol: asset.symbol,
      status: 'CONFIRMED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      blockNumber: 19845000 + Math.floor(Math.random() * 500),
      gasFee: 0.0012,
      fireblocksSigner: 'Fireblocks Vault MPC Node #01 (Geneva Subnet)',
      vcHash: newVcHash,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler: Top up testnet USDC
  const handleTopUpUsdc = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balanceUsdc: prev.balanceUsdc + amount,
    }));

    // Log transaction
    const newTx: TxLog = {
      id: `tx-dep-${Date.now()}`,
      hash: '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      type: 'FIREBLOCKS_SIGN',
      assetName: 'Testnet USDC Vault Deposit',
      amount: amount,
      symbol: 'USDC',
      status: 'CONFIRMED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      blockNumber: 19845100,
      gasFee: 0.0004,
      fireblocksSigner: 'COPYM Automated Vault Deposit Escrow',
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Handler: Complete KYC Level 2
  const handleCompleteKyc = (updatedProfile: Partial<UserProfile>) => {
    setUser((prev) => {
      const newSbts = [
        ...prev.soulboundTokens,
        {
          id: `sbt-accredited-${Date.now()}`,
          title: 'Accredited Investor Verified SBT',
          category: 'accreditation' as const,
          issuedAt: new Date().toISOString().split('T')[0],
          description: 'Cryptographically verified accredited investor status issued by COPYM Subnet.',
          contractAddress: '0x8f2a104...4920',
          tokenId: `${Math.floor(Math.random() * 8000 + 1000)}`,
        },
      ];

      return {
        ...prev,
        ...updatedProfile,
        soulboundTokens: newSbts,
      };
    });

    // Log KYC issuance transaction
    const newTx: TxLog = {
      id: `tx-kyc-${Date.now()}`,
      hash: '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      type: 'KYC_VC_ISSUED',
      assetName: 'W3C Accredited Investor Credential',
      amount: 0,
      symbol: 'DID-VC',
      status: 'CONFIRMED',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      blockNumber: 19845200,
      gasFee: 0.0002,
      fireblocksSigner: 'COPYM Compliance Subnet Authority',
      vcHash: `vc:w3c:accredited:${user.name.toLowerCase().replace(' ', '-')}`,
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#ecebf5] text-[#1b1b2f] flex flex-row font-sans selection:bg-[#6c5dd3] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTxDrawer={() => setIsTxDrawerOpen(true)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header Navbar */}
        <Navbar
          user={user}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenTxDrawer={() => setIsTxDrawerOpen(true)}
          onOpenKycModal={() => setIsKycModalOpen(true)}
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
          txCount={transactions.length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Top Onboarding / KYC Notification Banner */}
        <KycNotificationBanner user={user} onOpenKycModal={() => setIsKycModalOpen(true)} />

        {/* Center Main View Area */}
        <main className="flex-1 px-6 md:px-10 py-6 overflow-y-auto min-w-0">
          {activeTab === 'token_detail' && selectedAsset && (
            <TokenDetailView
              asset={selectedAsset}
              allAssets={assets}
              user={user}
              transactions={transactions}
              onBack={() => setActiveTab(previousTab || 'marketplace')}
              onBuyAsset={handleBuyAsset}
              onOpenKycModal={() => setIsKycModalOpen(true)}
              onSelectAsset={handleSelectAsset}
            />
          )}

          {activeTab === 'marketplace' && (
            <MarketplaceView
              assets={assets}
              searchQuery={searchQuery}
              onSelectAsset={handleSelectAsset}
              onOpenKycModal={() => setIsKycModalOpen(true)}
            />
          )}

          {activeTab === 'tokens' && (
            <TokensScreenerView
              assets={assets}
              onSelectAsset={handleSelectAsset}
            />
          )}

          {activeTab === 'trade' && (
            <P2pTradeView
              assets={assets}
              user={user}
              holdings={holdings}
              onSelectAsset={handleSelectAsset}
              onCreateP2pOrder={handleCreateP2pOrder}
            />
          )}

          {activeTab === 'wallet' && (
            <WalletView
              user={user}
              holdings={holdings}
              onOpenKycModal={() => setIsKycModalOpen(true)}
              onTopUpUsdc={handleTopUpUsdc}
              transactions={transactions}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              onOpenKycModal={() => setIsKycModalOpen(true)}
              onNavigateToSettings={() => setActiveTab('settings')}
              onNavigateToWallet={() => setActiveTab('wallet')}
            />
          )}

          {activeTab === 'vc' && (
            <VcCredentialsView user={user} assets={assets} />
          )}

          {activeTab === 'settings' && (
            <SettingsKycView
              user={user}
              onOpenKycModal={() => setIsKycModalOpen(true)}
              onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              transactions={transactions}
            />
          )}
        </main>
      </div>

      {/* Asset Detail Popup View */}
      <AssetDetailModal
        asset={selectedAsset}
        user={user}
        isOpen={isAssetModalOpen}
        onClose={() => setIsAssetModalOpen(false)}
        onBuyAsset={handleBuyAsset}
      />

      {/* Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        assets={assets}
        onSelectAsset={handleSelectAsset}
      />

      {/* Fireblocks Transaction Log Drawer */}
      <TxDrawer
        isOpen={isTxDrawerOpen}
        onClose={() => setIsTxDrawerOpen(false)}
        transactions={transactions}
      />

      {/* Investor KYC Onboarding Modal */}
      <KycModal
        user={user}
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        onCompleteKyc={handleCompleteKyc}
      />
    </div>
  );
}
