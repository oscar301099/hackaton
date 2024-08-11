// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DonationPlatform {
    address public owner;
    uint public donationCount;
    uint public totalDonations;

    struct Donation {
        uint id;
        address donor;
        uint amount;
        uint timestamp;
    }

    mapping(uint => Donation) public donations;

    event DonationReceived(
        uint id,
        address indexed donor,
        uint amount,
        uint timestamp
    );

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable returns (bool) {
        require(msg.value > 0, "Donation amount must be greater than zero");
        donationCount++;
        totalDonations += msg.value;

        donations[donationCount] = Donation({
            id: donationCount,
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        });

        emit DonationReceived(donationCount, msg.sender, msg.value, block.timestamp);
        return true;
    }

    function withdraw(uint amount) public ownerOnly returns (bool) {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
        return true;
    }

    function getDonation(uint id) public view returns (Donation memory) {
        return donations[id];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
