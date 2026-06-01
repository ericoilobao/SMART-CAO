// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CABRUCA Token (CAB-T)
 * @dev NFT-based tokenization of Cabruca agroforestry areas
 * Represents ownership and environmental impact of sustainable farming areas
 */
contract CABRUCAToken is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // Token metadata structure
    struct TokenMetadata {
        string farmerId;
        string location;
        uint256 area; // in square meters
        uint256 carbonCredit; // in tons CO2e
        uint256 biodiversityScore;
        uint256 timestamp;
        bool validated;
        string validationHash; // IPFS hash of validation data
    }

    // Mapping of token ID to metadata
    mapping(uint256 => TokenMetadata) public tokenMetadata;

    // Mapping of farmer ID to tokens
    mapping(string => uint256[]) public farmerTokens;

    // Events
    event TokenMinted(
        uint256 indexed tokenId,
        string indexed farmerId,
        string location,
        uint256 area,
        uint256 carbonCredit
    );

    event TokenValidated(
        uint256 indexed tokenId,
        bool validated,
        string validationHash
    );

    event TokenBurned(uint256 indexed tokenId, address indexed burner);

    constructor() ERC721("CABRUCA Token", "CAB-T") {}

    /**
     * @dev Mint a new CABRUCA token
     * @param to Address of the farmer/owner
     * @param farmerId Unique identifier of the farmer
     * @param location GPS coordinates or location identifier
     * @param area Area in square meters
     * @param carbonCredit Carbon credit estimate
     * @param biodiversityScore Biodiversity score (0-100)
     * @param uri IPFS URI for metadata
     */
    function mintToken(
        address to,
        string memory farmerId,
        string memory location,
        uint256 area,
        uint256 carbonCredit,
        uint256 biodiversityScore,
        string memory uri
    ) public onlyOwner returns (uint256) {
        require(to != address(0), "Invalid address");
        require(area > 0, "Area must be greater than 0");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Create metadata
        tokenMetadata[tokenId] = TokenMetadata({
            farmerId: farmerId,
            location: location,
            area: area,
            carbonCredit: carbonCredit,
            biodiversityScore: biodiversityScore,
            timestamp: block.timestamp,
            validated: false,
            validationHash: ""
        });

        // Add to farmer's tokens
        farmerTokens[farmerId].push(tokenId);

        // Mint NFT
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit TokenMinted(tokenId, farmerId, location, area, carbonCredit);

        return tokenId;
    }

    /**
     * @dev Validate a minted token
     * @param tokenId Token ID to validate
     * @param validationHash IPFS hash of validation data
     */
    function validateToken(uint256 tokenId, string memory validationHash)
        public
        onlyOwner
    {
        require(_exists(tokenId), "Token does not exist");

        TokenMetadata storage metadata = tokenMetadata[tokenId];
        metadata.validated = true;
        metadata.validationHash = validationHash;

        emit TokenValidated(tokenId, true, validationHash);
    }

    /**
     * @dev Get farmer's tokens
     * @param farmerId Farmer identifier
     */
    function getFarmerTokens(string memory farmerId)
        public
        view
        returns (uint256[] memory)
    {
        return farmerTokens[farmerId];
    }

    /**
     * @dev Get token metadata
     * @param tokenId Token ID
     */
    function getTokenMetadata(uint256 tokenId)
        public
        view
        returns (TokenMetadata memory)
    {
        require(_exists(tokenId), "Token does not exist");
        return tokenMetadata[tokenId];
    }

    /**
     * @dev Burn a token
     * @param tokenId Token ID to burn
     */
    function burnToken(uint256 tokenId) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "Not authorized to burn"
        );
        _burn(tokenId);
        emit TokenBurned(tokenId, _msgSender());
    }

    // Required overrides for ERC721 extensions
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
