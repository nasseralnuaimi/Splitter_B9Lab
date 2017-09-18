pragma solidity ^0.4.6;

/*contract Splitter {
    
    address public bob;
    address public carol;
    address public alice;
    
    
     event LogSplit(address bob, address carol, uint amount);
    
    
    function Splitter(address b,address c){
        alice = msg.sender;
        bob = b;
        carol = c;
    }
    
    function split() public payable returns (bool sucess){
         require(msg.value > 0);
         require(msg.sender == alice);
         
         bob.transfer(msg.value/2);
         carol.transfer(msg.value - msg.value/2);
         
         LogSplit(bob,carol,msg.value);
         
    }
}
*/

pragma solidity ^0.4.6;

contract Splitter {
    
    address public owner;

    mapping(address => uint) public accounts;
    
    
    event LogSplit(address bob, address carol, uint amount);
    event LogWithdraw(address reciever, uint amount);
    event LogKilled(address sender);
    
    function Splitter() public{
        owner = msg.sender;
    }
    
    function split(address b,address c) payable public returns (bool sucess){
         require(msg.value > 0);
         require(b != 0);
         require(c != 0);

         accounts[b] += msg.value/2;
         accounts[c] += msg.value - msg.value/2;
         
         LogSplit(b,c,msg.value/2);
         return true;
         
    }

    function withdraw() public returns (bool sucess){
        require(accounts[msg.sender] > 0);

        var balance = accounts[msg.sender];
        accounts[msg.sender] -= balance;

        msg.sender.transfer(balance);

        LogWithdraw(msg.sender,balance);
        return true;

    }
    function kill() returns (bool sucess){
         require(msg.sender == owner);
         selfdestruct(msg.sender);

         LogKilled(owner);
         return true;

    }
}
