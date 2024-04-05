import { create } from 'zustand'
import { assets } from "chain-registry";
import { Asset } from '@chain-registry/types'

type Store = {
  selectedChain: string,
  chainAssets: Asset[],
  addAssetList: (selectedChain: string) => Asset[]
}

export const useStore = create<Store>(set => ({
  selectedChain: 'osmosis',
  chainAssets: [],
  addAssetList: (selectedChain) => {
    return assets.filter((asset) => asset.chain_name === selectedChain)[0].assets;
  }
}))