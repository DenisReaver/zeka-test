'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ---------- Address Contract create on the mintpad.co
//4 NFT CREATE PETUX, KOZEL, MUZHIK, BLATNOY
const CONTRACTS = {
  blatnoy: "0xe757D8ad109A214857023386aCE68f14470363Fc",
  muzhik:  "0xd28b86bF716Ca1c39d7223c88Be43fbCE1eAc031",
  kozyol:  "0xf1F919926DA9BA0ff10D238923bA26dD14B403bB",
  petuh:   "0xf95F4706112cE0BD4e2dEE7f024df2D9f54cd7AC",
};

// ---------- ABI FINCTION mint NFT INTERACTION with SOLIDITY SMART CONTRACT
const MINT_ABI = [
  {
    "inputs": [
      { "name": "amount", "type": "uint256" },
      { "name": "affiliate", "type": "address" }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [name, setName] = useState('');
  const [account, setAccount] = useState<string | null>(null);
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);  
 

  useEffect(() => {
    setIsClient(true);
  }, []);

    const questions = [
    { q: 'Вечер в хату, арестанты! Как звать?', img: '/images/zeki1.jpg', options: ['Вечер в хату, мужики! Зовите [имя]', 'Чё пристали?', 'Отвалите!'], correct: [0] },
    { q: 'Поделись чаем из передачки?', img: '/images/chai.jpg', options: ['Конечно, мужики, держите!', 'Нет, это моё!', 'Возьму чужой'], correct: [0] },
    { q: 'Сядешь на шконку к петуху?', img: '/images/shkonka.jpg', options: ['Не сяду, западло!', 'Сяду, нормально', 'Лучше на парашу'], correct: [0] },
    { q: 'Играешь в карты? Не жульничаешь?', img: '/images/karti.jpg', options: ['Играю по-честному', 'Жульничаю иногда', 'Не играю, стучу'], correct: [0] },
    { q: 'Стучать будешь администрации?', img: '/images/dubak.jpg', options: ['Никогда, сука не стучит!', 'Если выгодно', 'Да, расскажу всё'], correct: [0] },
    { q: 'Ворвать у своих будешь?', img: '/images/krys.jpg', options: ['Никогда, крыса - не человек', 'Иногда', 'Да, если не спалят'], correct: [0] },
    { q: 'Как поприветствуешь смотрящего?', img: '/images/smotryashiy.jpg', options: ['Здорово, авторитет!', 'Привет, братан', 'Молча пройду'], correct: [0] },
    { q: 'Делить общий котёл будешь честно?', img: '/images/kotel.jpg', options: ['По понятиям, всем поровну', 'Себе больше', 'Не буду делить'], correct: [0] },
    { q: 'За косяк ответишь?', img: '/images/kozyr.jpg', options: ['Да, по-мужски', 'Свалю на другого', 'Сбегу'], correct: [0] },
    { q: 'Татуировку набьёшь правильную?', img: '/images/tatu.jpg', options: ['Только по масти', 'Любую', 'Звёзды на плечах без права'], correct: [0] },
    { q: 'Помогать слабым будешь?', img: '/images/slabiy.jpg', options: ['Только достойным', 'Всем', 'Топтать слабых'], correct: [0] },
    { q: 'Финальный вопрос: Ты за понятия?', img: '/images/ponyatiya.jpg', options: ['Живу по понятиям!', 'Иногда', 'Мне пох'], correct: [0] },
  ];

 // const results = [
  //  { min: 10, title: 'БЛАТНОЙ! Авторитет в хате!', img: '/images/blatniy.jpg', text: 'Смотрящий жмёт руку.', key: 'blatnoy' },
  //  { min: 7,  title: 'МУЖИК! Нормальный арестант',     img: '/images/muzhik.jpg',  text: 'Уважают.', key: 'muzhik' },
   // { min: 4,  title: 'ШЕРСТЬ / КОЗЁЛ',                 img: '/images/kozel.jpg',   text: 'Западло.', key: 'kozyol' },
 //   { min: 0,  title: 'ПЕТУХ! Опущенный',               img: '/images/petuh.jpg',   text: 'У параши место...', key: 'petuh' },
 // ];

const results = [
  { 
    min: 10, 
    title: 'БЛАТНОЙ! Авторитет в хате!', 
    img: '/images/blatniy.jpg', 
    text: 'Смотрящий жмёт руку.', 
    key: 'blatnoy',
    contract: CONTRACTS.blatnoy  // ← ДОБАВИЛ
  },
  { 
    min: 7,  
    title: 'МУЖИК! Нормальный арестант',     
    img: '/images/muzhik.jpg',  
    text: 'Уважают.', 
    key: 'muzhik',
    contract: CONTRACTS.muzhik
  },
  { 
    min: 4,  
    title: 'ШЕРСТЬ / КОЗЁЛ',                 
    img: '/images/kozel.jpg',   
    text: 'Западло.', 
    key: 'kozyol',
    contract: CONTRACTS.kozyol
  },
  { 
    min: 0,  
    title: 'ПЕТУХ! Опущенный',               
    img: '/images/petuh.jpg',   
    text: 'У параши место...', 
    key: 'petuh',
    contract: CONTRACTS.petuh
  },
];
  const handleAnswer = (points: number) => {
    setScore(score + points);
    setStep(step + 1);
  };

  // ---------- 5. CONNECTION + BASE CHAIN
const connectWallet = async () => {
  // ЗАЩИТА ОТ SSR
  if (typeof window === 'undefined') return;

  // Проверка MetaMask
  if (!window.ethereum) {
    alert('Установи MetaMask, братан!');
    return;
  }

  try {
    const accounts = await (window.ethereum as any).request({
      method: 'eth_requestAccounts',
    });

    if (!accounts?.length) {
      alert('Аккаунт не найден!');
      return;
    }

    setAccount(accounts[0]);

    // Переключаем на Base
    try {
      await (window.ethereum as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2105' }],
      });
    } catch (e: any) {
      if (e.code === 4902) {
        await (window.ethereum as any).request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x2105',
            chainName: 'Base',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://mainnet.base.org'],
            blockExplorerUrls: ['https://basescan.org'],
          }],
        });
      }
    }
  } catch (err: any) {
    alert('Ошибка подключения: ' + (err.message || ''));
  }
};

  // ---------- 6. MINT NFT FUNCTION ----------
const mintNFT = async () => {
  setMinting(true);

  const result = results.find(r => score >= r.min) ?? results[3];
  const contractAddress = result.contract;

  if (!ethers.isAddress(contractAddress)) {
    alert('Неверный адрес контракта!');
    setMinting(false);
    return;
  }
  if (typeof window === 'undefined' || !window.ethereum) {
  alert('MetaMask не подключён!');
  setMinting(false);
  return;
}

  try {
    const provider = new ethers.BrowserProvider(window.ethereum as any);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MINT_ABI, signer);

    // === 1. Только totalSupply 
    let totalSupply;
    try {
      totalSupply = await contract.totalSupply();
    } catch {
      totalSupply = BigInt(0);
    }

    // === 2. TOTAL MINT
    const amountToMint = BigInt(1); // FIX 1

    // === 3. PRICE MINTING NFT
    const assumedPricePerNFT = ethers.parseEther("0.0002"); // THERE PRICE NFT CORRECT
    const totalCost = assumedPricePerNFT * amountToMint;

    // === 4. CHECK BALANCE $ETH
    const balance = await provider.getBalance(account!);
    const gasBuffer = ethers.parseEther("0.00001"); // GET PRICE
    if (balance < totalCost + gasBuffer) {
      alert(`Недостаточно ETH! Нужно: ${(Number(totalCost)/1e18).toFixed(6)} + газ`);
      setMinting(false);
      return;
    }

    // === 5. Affiliate 
    const affiliate = "0x0000000000000000000000000000000000000000";

    // === 6. МИНТ ===
    const tx = await contract.mint(amountToMint, affiliate, {
      value: totalCost,
      gasLimit: 600_000
    });

    setTxHash(tx.hash);
    const receipt = await tx.wait();

    // === 7. Получаем tokenId ===
    const transferEvent = receipt.events?.find((e: any) =>
      e.address.toLowerCase() === contractAddress.toLowerCase() &&
      e.topics[0] === ethers.id("Transfer(address,address,uint256)") &&
      e.args?.to?.toLowerCase() === account?.toLowerCase()
    );

    const tokenId = transferEvent?.args?.tokenId?.toString() ?? '???';

    alert(
      `ГОТОВО, ${name}!\n` +
      `Ты — ${result.title}\n` +
      `NFT #${tokenId} заминчен!\n` +
      `TX: ${tx.hash}`
    );

    setTimeout(() => window.location.reload(), 3000);

  } catch (e: any) {
    console.error(e);
    const msg = e.reason || e.message || '';
    
    if (msg.includes("insufficient funds")) {
      alert("Недостаточно ETH!");
    } else if (msg.includes("reverted")) {
      alert("Транзакция отклонена. Возможно, неправильная цена или лимит.");
    } else {
      alert(`Ошибка: ${msg}`);
    }
  } finally {
    setMinting(false);
  }
};

  // ---------- 7. RENDER ----------
  // START
  if (step === 0) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center"
         style={{backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover'}}>
      
      <Image src="/images/zeki1.jpg" width={300} height={300} alt="Хата" className="rounded-full mb-8" />
      <h1 className="text-5xl font-bold mb-6">ПРОПИСКА 2025</h1>
      
      <input
        type="text"
        placeholder="Твоё погоняло?"
        className="bg-gray-900 border border-red-800 p-4 rounded text-xl mb-6"
        onChange={e => setName(e.target.value)}
      />
      
      <button onClick={() => setStep(1)} className="bg-red-800 hover:bg-red-700 px-10 py-5 rounded text-3xl">
        Начать прописку!
      </button>

      {BY}
      {massonedisson.eth}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <a
          href="https://app.ens.domains/massonedisson.eth"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 text-sm hover:text-white transition flex items-center gap-1"
        >
          by 
          <span className="font-bold text-cyan-400">massonedisson.eth</span>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V3h-6z" />
            <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H4V7h3a1 1 0 100-2H4z" />
          </svg>
        </a>
      </div>
      {/* ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← */}

    </div>
  );
}

  // FINAL STEP
  if (step > questions.length) {
    const result = results.find(r => score >= r.min) ?? results[3];
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8"
           style={{backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover'}}>
        <Image src={result.img} width={450} height={450} alt="Результат" className="rounded-full mb-8" />
        <h1 className="text-6xl font-bold mb-4">{name || 'Братан'}, ТЫ — {result.title}</h1>
        <p className="text-2xl mb-8">{result.text} (Очки: {score}/12)</p>

        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-12 py-6 rounded text-3xl font-bold shadow-lg transform hover:scale-105 transition"
          >
            ПОДКЛЮЧИТЬ METAMASK НА BASE
          </button>
        ) : (
          <button
            onClick={mintNFT}
            disabled={minting}
            className="bg-green-600 hover:bg-green-500 px-14 py-7 rounded text-4xl font-bold disabled:opacity-50 shadow-2xl transform hover:scale-105 transition"
          >
            {minting ? 'МИНТИМ...' : 'ЗАМИНТИТЬ NFT НА BASE'}
          </button>
        )}

        {txHash && (
          <p className="mt-8 text-cyan-400 text-xl">
            ГОТОВО! NFT В КОШЕЛЬКЕ<br />
            <a href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer" className="underline">
              Посмотреть транзакцию
            </a>
          </p>
        )}
      </div>
    );
  }

  // QUESTION
  const q = questions[step - 1];
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8"
         style={{backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover'}}>
      <Image src={q.img} width={500} height={400} alt="" className="rounded mb-8" />
      <h2 className="text-4xl mb-10">{q.q}</h2>
      <div className="space-y-6 max-w-2xl w-full">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(q.correct.includes(i) ? 1 : 0)}
            className="bg-gray-900 hover:bg-red-900 border-2 border-red-800 p-8 rounded text-2xl w-full transition"
          >
            {opt.replace('[имя]', name || 'братан')}
          </button>
        ))}
      </div>
      <p className="mt-10 text-2xl">Вопрос {step}/12 | Очки: {score}</p>
    </div>
  );
}
