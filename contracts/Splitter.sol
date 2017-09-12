pragma solidity ^0.4.6;

contract Splitter {
    
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
