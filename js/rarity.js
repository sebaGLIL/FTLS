// rarity.js
const totalNFTs = 10000;
const nftsPerPage = 50;
let currentPage = 1;
let allNFTs = []; // To store all NFTs with their scores and ranks
let currentSort = 'rarity'; // Default sort by rarity

async function fetchPrecomputedData() {
    const response = await fetch('json/nftData.json');
    if (!response.ok) throw new Error(`Failed to fetch precomputed data: ${response.statusText}`);
    return await response.json();
}

function createNFTElement(tokenId, metadata, rarityScore, rarityRank) {
    const imageUrl = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    const nftElement = document.createElement('div');
    nftElement.className = 'nft';
    nftElement.innerHTML = `
        <img src="${imageUrl}" alt="NFT Image">
        <h2>ID: ${tokenId}</h2>
        <p>Rarity Score: ${rarityScore.toFixed(2)}</p>
        <h2>Rarity Rank: ${rarityRank}</h2>
    `;
    return nftElement;
}


function displayNFTs(page) {
    currentPage = page;
    const nftContainer = document.getElementById('nft-container');
    nftContainer.innerHTML = '';
    const start = (page - 1) * nftsPerPage;
    const end = Math.min(start + nftsPerPage, allNFTs.length);

    if (currentSort === 'rarity') {
        allNFTs.sort((a, b) => b.rarityScore - a.rarityScore);
    } else {
        allNFTs.sort((a, b) => a.tokenId - b.tokenId);
    }

    for (let i = start; i < end; i++) {
        const nft = allNFTs[i];
        const nftElement = createNFTElement(nft.tokenId, nft.metadata, nft.rarityScore, nft.rarityRank);
        nftContainer.appendChild(nftElement);
    }

    createPagination();
}

function createPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(allNFTs.length / nftsPerPage);

    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage === totalPages) {
        startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => displayNFTs(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    }

    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.innerText = '1';
        firstPageButton.addEventListener('click', () => displayNFTs(1));
        paginationContainer.appendChild(firstPageButton);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.innerText = '...';
            paginationContainer.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => displayNFTs(i));
        button.disabled = i === currentPage;
        paginationContainer.appendChild(button);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.innerText = '...';
            paginationContainer.appendChild(dots);
        }
        const lastPageButton = document.createElement('button');
        lastPageButton.innerText = totalPages;
        lastPageButton.addEventListener('click', () => displayNFTs(totalPages));
        paginationContainer.appendChild(lastPageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => displayNFTs(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }
}

function setupSortButtons() {
    const sortRarityButton = document.getElementById('sort-rarity');
    const sortIdButton = document.getElementById('sort-id');

    sortRarityButton.addEventListener('click', () => {
        currentSort = 'rarity';
        displayNFTs(currentPage);
    });

    sortIdButton.addEventListener('click', () => {
        currentSort = 'id';
        displayNFTs(currentPage);
    });
}

document.getElementById('searchBox').addEventListener('input', function(event) {
    const tokenId = parseInt(event.target.value);
    if (tokenId && tokenId > 0 && tokenId <= totalNFTs) {
        const nft = allNFTs.find(nft => nft.tokenId === tokenId);
        if (nft) {
            const nftContainer = document.getElementById('nft-container');
            nftContainer.innerHTML = '';
            const nftElement = createNFTElement(nft.tokenId, nft.metadata, nft.rarityScore, nft.rarityRank);
            nftContainer.appendChild(nftElement);
        }
    } else {
        displayNFTs(currentPage);
    }
});

async function initialize() {
    allNFTs = await fetchPrecomputedData();
    console.log('All NFTs loaded:', allNFTs.length);

    allNFTs.sort((a, b) => b.rarityScore - a.rarityScore);
    allNFTs.forEach((nft, index) => nft.rarityRank = index + 1);

    console.log('NFTs ranked by rarity');

    allNFTs.sort((a, b) => a.tokenId - b.tokenId);

    displayNFTs(1);
    setupSortButtons();
}

initialize();
