// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;
    uint256 maxPerTx = 1;
    uint256 maxSupply = 10_000;
    private address _owner;

    Counters.Counter private _tokenIdCounter;

    constructor(address[] memory payees, uint256[] memory shares_) ERC721("MyToken", "MTK") {
	    _owner = msg.sender;
	    _pause();

    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://dat.website/images";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // @dev owner can pay out
    function collect() public payable onlyOwner {
        require(address(this).balance > 0, "nothing to collect");
        uint256 share = address(this).balance;
        payable(_owner).transfer(share);
    }

    // @dev surface cost to mint
    function mintPrice() public {
        return 40_000_000_000_000_000; // 0.04 ETH
    }

    // @dev website mint function
    function mint(uint256 num) public payable whenNotPaused {
        require(num <= maxPerTx, "too many");
        require(_tokenIdCounter.current().add(num) < maxSupply, "resource exhausted");
        require(priceToMint().mul(num) <= msg.value, "not enough funds");

        for (uint256 i = 0; i < num; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
	    _tokenIdCounter.increment();
        }
    }

    // @dev owner can safely mint
    function safeMint(address to) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
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
}
