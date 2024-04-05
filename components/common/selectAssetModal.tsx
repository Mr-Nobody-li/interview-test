import { Combobox } from "@interchain-ui/react";
import type { Asset } from '@chain-registry/types';
import { useState } from "react";
import { useStore } from "@/stores";

interface Props {
  isOpen: boolean;
  closeModal: () => void
  onConfirm: (selectedAsset: Asset | null) => any;
}

export function SelectAssetModal({ isOpen, closeModal, onConfirm }: Props) {
  const { addAssetList } = useStore();
  const selectedChain = useStore.getState().selectedChain;
  const chainAssets = addAssetList(selectedChain);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  if (!isOpen) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as any).id === 'modal-background') {
      closeModal();
    }
  }

  const handleConfirm = () => {
    onConfirm(selectedAsset);
    closeModal();
  }

  return (
    <div
      id="modal-background"
      onClick={handleClickOutside}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '80%',
          maxWidth: '500px',
        }}
      >
        <Combobox
          openOnFocus
          label="Favorite Chain"
          styleProps={{
            width: "100%"
          }}
          onSelectionChange={(assetSymbol) => {
            const asset = chainAssets.find((asset) => asset.symbol === assetSymbol)
            setSelectedAsset(asset || null)
          }}
        >
          {chainAssets.map((option) => <Combobox.Item key={option.symbol}>{option.name}</Combobox.Item>)}
        </Combobox>
        <button
          onClick={handleConfirm}
          style={{
            marginTop: '20px',
            marginRight: '10px',
            backgroundColor: '#337ab7',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '15px',
          }}
          onMouseOver={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#286090';
          }}
          onMouseOut={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#337ab7';
          }}
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          style={{
            marginTop: '20px',
            marginLeft: '10px',
            backgroundColor: '#337ab7',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '15px'
          }}
          onMouseOver={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#286090';
          }}
          onMouseOut={e => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#337ab7';
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}