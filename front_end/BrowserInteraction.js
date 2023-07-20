
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
web3.eth.handleRevert = true;
const contract = new web3.eth.Contract([
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "Candidate",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Voters",
    "outputs": [
      {
        "internalType": "enum votingV2.VotingStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Votes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "candidateIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timeInHour",
        "type": "uint256"
      }
    ],
    "name": "setVotingPeriod",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_Candidate",
        "type": "address"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_Candidate",
        "type": "address"
      }
    ],
    "name": "removeCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_Candidate",
        "type": "address"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidateLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
],"0x1c426c83f61360d9d924770388c0b10e1212865A");

 contract.methods.Owner().call().then((owner)=>{

  let addButton = document.getElementsByClassName('add')[0];
  let addTextbox = document.getElementsByClassName('Text-box')[0];
  addButton.addEventListener('click',()=>{
    
    contract.methods.addCandidate(addTextbox.value).send({from: owner , gas: '1000000'}).then((result) => {
        updateDisplay(); // Handle transaction success
      })
      .catch((error) => {
        if(!owner)
        alert("Not a owner");
       
        else{
          alert("The Candidate already exsists or Invalid address");
        }
      });
    
    

  });

  let removeButton = document.getElementsByClassName('remove')[0];
  removeButton.addEventListener('click',()=>{
  contract.methods.removeCandidate(addTextbox.value).send({from: owner , gas:'1000000'}).then((result)=>{
    updateDisplay();
  })
  .catch((error)=>{
    alert("Nothing to remove! address does not exsist or Invalid address")
  });

    });

   
  let timerButton = document.getElementsByClassName('timer')[0];
  timerButton.addEventListener('click',()=>{
    contract.methods.candidateLength().call().then((length)=>{
      if(length >= 2){
        contract.methods.setVotingPeriod(parseInt(addTextbox.value)).send({from:owner , gas:'1000000'}).then((time)=>{
          alert("Timer of 2hr is set!");

        });
      }
      else{
         if(!owner)
        alert("Not a owner");
       
        else{
          alert("You should have atleat 2 candidate in order to set timer");
        }
        
      }
    });

  });

  let voteButton = document.getElementsByClassName('vote')[0];
  voteButton.addEventListener('click',()=>{
    contract.methods.vote(addTextbox.value).send({from:'0xc8f73A6C8458B797eE326c99b2e93AE487835c32' , gas:'1000000'}).then(console.log);

  });

  
 });

function updateDisplay() {
    let candidatesShow = document.getElementsByClassName('Candidates-show')[0];
    candidatesShow.innerHTML = ''; // Clear the existing content
    contract.methods.candidateLength().call().then((length)=>{
      for (let i = 0; i < length; i++) {
        contract.methods.Candidate(i).call().then((candidate) => {
          let para = document.createElement('p');
          para.textContent = candidate;
          candidatesShow.appendChild(para);
        });
      }

    });
    
    }

updateDisplay();




 

