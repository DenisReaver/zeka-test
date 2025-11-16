// lib/abi.ts

export const ERC721_ABI = [
  "function claim(address to, uint256 quantity) public",
  "function safeMint(address to) public",
  "function mintTo(address to) public",
  // thirdweb автоматически поддерживает claimTo через их Edition Drop / NFT Drop
] as const;

export const ERC1155_ABI = [
  "function claim(address to, uint256 id, uint256 amount, bytes calldata data) public",
  "function mintTo(address to, uint256 id, uint, uint256 amount, bytes calldata data) public",
] as const;