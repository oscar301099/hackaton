// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriculturalCrowdfunding {
    address public owner;
    uint256 public fundGoal;
    uint256 public totalFunds;
    uint256 public fundDeadline;
    bool public goalReached;
    uint256 public withdrawDelay = 1 days;
    
    struct Beneficiary {
        address payable beneficiaryAddress;
        uint256 requestedAmount;
        uint256 approvalTime;
        bool isApproved;
    }
    
    mapping(address => Beneficiary) public beneficiaries;
    mapping(address => bool) public isVerified;  // Mapeo para verificar beneficiarios
    
    address public ngoAddress;  // Dirección de la ONG
    
    event FundDonated(address donor, uint256 amount);
    event FundsWithdrawn(address beneficiary, uint256 amount);
    event BeneficiaryVerified(address beneficiary);
    event BeneficiaryApproved(address beneficiary);
    
    constructor(uint256 _fundGoal, uint256 _fundDeadline, address _ngoAddress) {
        owner = msg.sender;
        fundGoal = _fundGoal;
        fundDeadline = _fundDeadline;
        totalFunds = 0;
        goalReached = false;
        ngoAddress = _ngoAddress;  // Establecer la dirección de la ONG
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }
    
    modifier onlyNgo() {
        require(msg.sender == ngoAddress, "Only the NGO can perform this action.");
        _;
    }
    
    function donate() external payable {
        require(block.timestamp < fundDeadline, "Funding period has ended.");
        require(msg.value > 0, "Donation must be greater than 0.");
        
        totalFunds += msg.value;
        emit FundDonated(msg.sender, msg.value);
        
        if (totalFunds >= fundGoal) {
            goalReached = true;
        }
    }
    
    function requestFunds(uint256 amount) external {
        require(goalReached, "Funding goal has not been reached.");
        require(amount > 0, "Requested amount must be greater than 0.");
        require(isVerified[msg.sender], "Beneficiary not verified.");
        require(beneficiaries[msg.sender].beneficiaryAddress == address(0), "Already requested funds.");
        
        beneficiaries[msg.sender] = Beneficiary({
            beneficiaryAddress: payable(msg.sender),
            requestedAmount: amount,
            approvalTime: 0,
            isApproved: false
        });
    }
    
    function verifyBeneficiary(address beneficiary) external onlyNgo {
        isVerified[beneficiary] = true;
        emit BeneficiaryVerified(beneficiary);
    }
    
    function approveFunds(address beneficiary) external onlyOwner {
        require(goalReached, "Funding goal has not been reached.");
        require(beneficiaries[beneficiary].beneficiaryAddress != address(0), "Beneficiary not found.");
        require(isVerified[beneficiary], "Beneficiary not verified.");
        require(!beneficiaries[beneficiary].isApproved, "Funds already approved.");
        
        beneficiaries[beneficiary].approvalTime = block.timestamp;
        beneficiaries[beneficiary].isApproved = true;
        
        emit BeneficiaryApproved(beneficiary);
    }
    
    function withdrawFunds() external {
        require(beneficiaries[msg.sender].isApproved, "Funds not approved.");
        require(beneficiaries[msg.sender].approvalTime + withdrawDelay <= block.timestamp, "Withdrawal delay not met.");
        require(address(this).balance >= beneficiaries[msg.sender].requestedAmount, "Insufficient funds.");
        
        uint256 amount = beneficiaries[msg.sender].requestedAmount;
        beneficiaries[msg.sender].requestedAmount = 0;
        payable(msg.sender).transfer(amount);
        
        emit FundsWithdrawn(msg.sender, amount);
        }
}