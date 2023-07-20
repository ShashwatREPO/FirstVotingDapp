// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract votingV2{
    address public Owner;
    address[] public Candidate;
    uint256 votingPeriodEnd;
    uint256 candidateCount ;
    mapping (address => uint256) public candidateIndex;
    mapping (address => VotingStatus) public Voters;
    mapping (address => uint256) public Votes;

    enum VotingStatus{notVoted,hasVoted}

    constructor(){
        Owner = msg.sender; //sets the Owner
    }

    modifier onlyOwner(){ 
        require(msg.sender == Owner ,"Not the owner");
        _;
    }

    modifier votingTimePeriod(){
        require(block.timestamp <= votingPeriodEnd , "Voting period is over");
        _;
    }

    function setVotingPeriod(uint256 _timeInHour) public onlyOwner {
        _timeInHour = _timeInHour * 3600; //converting to seconds
        votingPeriodEnd = block.timestamp + _timeInHour;

    }

    function addCandidate(address _Candidate) public onlyOwner{
        require(_Candidate !=address(0),"not a valid address");
        require(candidateIndex[_Candidate] == 0);
        candidateIndex[_Candidate]++;
        Candidate.push(_Candidate);
    }

    function removeCandidate(address _Candidate) public  onlyOwner{
     require(_Candidate != address(0), "Not a valid address");

        for (uint256 i = 0; i < Candidate.length; i++) {
            if (_Candidate == Candidate[i]) {
                for (uint256 j = i; j < Candidate.length - 1; j++) {
                    Candidate[j] = Candidate[j + 1];
                }
                Candidate.pop();
                candidateIndex[_Candidate] = 0;
                return;
            }
     }

    revert("Candidate does not exist");
}

    function vote(address _Candidate) public  votingTimePeriod{
        for(uint256 i = 0 ; i < Candidate.length; i++){
            require(_Candidate == Candidate[i],"Candidate does not exsist");
            
        }
            require(candidateIndex[msg.sender] == 0,"a candidate cannot vote");
            require(Voters[msg.sender] == VotingStatus.notVoted,"Already voted" );

            Votes[_Candidate] ++;
            Voters[msg.sender] = VotingStatus.hasVoted;
        
    }

    function candidateLength() public view returns(uint256){
        return Candidate.length;
    }


}