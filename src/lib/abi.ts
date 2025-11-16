export const ERC721_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "quantity", "type": "uint256" }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;