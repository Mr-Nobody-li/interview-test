import "../styles/globals.css";
import "@interchain-ui/react/styles";
import {
  ThemeProvider,
  AssetList,
  AssetListItemProps,
  BasicModal,
  AssetWithdrawTokens,
  Button
} from "@interchain-ui/react";
import type { Asset } from '@chain-registry/types';
import { useState } from "react";
import { SelectAssetModal } from "@/components";

function CreateCosmosApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [list, setList] = useState<AssetListItemProps[]>([]);

  const handleConfirm = (selectedAsset: Asset | null) => {
    if (selectedAsset) {
      setList([...list, {
        imgSrc: selectedAsset.logo_URIs ? Object.values(selectedAsset.logo_URIs).find(logo => logo) : '',
        symbol: selectedAsset.symbol,
        name: selectedAsset.name,
        tokenAmount: 'xxx',
        tokenAmountPrice: 'xxx',
        onDeposit: () => { setIsDepositOpen(true) },
      }]);
    }
  }

  return (
    <ThemeProvider>
      <div style={{ padding: "50px" }}>
        <div style={{ marginBottom: "50px" }}><Button onClick={() => setIsOpen(true)}>Add Asset</Button></div>

        <AssetList
          needChainSpace
          isOtherChains={false}
          list={list}
        />
      </div>

      <SelectAssetModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        onConfirm={handleConfirm}>
      </SelectAssetModal>

      <BasicModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title="Deposit"
      >
        <AssetWithdrawTokens
          amount=""
          available={25.89}
          fromAddress="umee1lqsq...pv4axdaxk"
          fromImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.svg"
          fromName="Umee"
          fromSymbol="UMEE"
          onAddressChange={function Va() { }}
          onAddressConfirm={function Va() { }}
          onCancel={function Va() { }}
          onChange={function Va() { }}
          onTransfer={function Va() { }}
          priceDisplayAmount={0.5}
          timeEstimateLabel="20 seconds"
          toAddress="osmo1lqsq...pv48trj5k"
          toImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
          toName="Osmosis"
        />
      </BasicModal>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;
