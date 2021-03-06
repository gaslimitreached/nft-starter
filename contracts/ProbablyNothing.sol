// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, PaymentSplitter, Pausable, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    uint256 maxPerTx = 1;
    uint256 maxSupply = 10_000;
    uint256 private _price = 40_000_000_000_000_000;
    address private _owner;
    string private _uri;

    Counters.Counter private _tokenIdCounter;

    constructor(
        address[] memory payees,
        uint256[] memory shares_,
        string memory uri
    )
       ERC721("MyToken", "MTK")
       PaymentSplitter(payees, shares_) {
	    _owner = msg.sender;
        _uri = uri;
	    _pause();
    }

    function _baseURI() internal view override returns (string memory) {
        return _uri;
    }

    function setBaseURI(string memory uri) public onlyOwner {
        _uri = uri;
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
    function price() public view returns (uint256) {
        return _price;
    }

    // @dev change cost to mint protects against price movement
    function setPrice(uint256 amount) public onlyOwner {
        _price = amount;
    }

    // @dev website mint function
    function mint(uint256 num) public payable whenNotPaused {
        require(num <= maxPerTx, "too many");
        uint256 it = _tokenIdCounter.current();

        require(it.add(num) < maxSupply, "resource exhausted");
        require(price().mul(num) <= msg.value, "not enough funds");

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

    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
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
