var Splitter = artifacts.require("./Splitter.sol");

/*contract('Splitter', function(accounts) {
  var contract;
  var alice = accounts[0];
  var bob   = accounts[1];
  var carol = accounts[2];


  beforeEach(function() {
    return Splitter.new(bob, carol, {from: alice})
    .then(function(instance){
      contract = instance;
    });
  });

  it("should just say hi", function(){
    assert.strictEqual(true,true,"something is wrong");
  });

  it("should be sent by alice", function() {
    return contract.alice({from: alice})
    .then(function(_alice) {
      assert.strictEqual(_alice, alice, "Where is Alice?");
    });
  });

  it("should split Even equally", function(){
    var bobBefore = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);
    return contract.split({from: alice, value:10})
      then(function(txn){
      var bobAfter = web3.eth.getBalance(bob);
      var carolAfter = web3.eth.getBalance(carol);
      assert.equal(bobBefore.plus(5).toString(10), bobAfter.toString(10), "Wrong Balance for Bob");
      assert.equal(carolBefore.plus(5).toString(10), carolAfter.toString(10), "Wrong Balance for Carol");
     });
  });

  it("should split Odd properly", function(){
    var bobBefore = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);
    return contract.split({from: alice, value:11})
      then(function(txn){
      var bobAfter = web3.eth.getBalance(bob);
      var carolAfter = web3.eth.getBalance(carol);
      assert.equal(bobBefore.plus(5).toString(10), bobAfter.toString(10), "Wrong Balance for Bob");
      assert.equal(carolBefore.plus(6).toString(10), carolAfter.toString(10), "Wrong Balance for Carol");
     });
  });

  it("should not split nothing", function(){
    var bobBefore = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);
    return contract.split({from: alice, value:0})
      then(function(txn){
      var bobAfter = web3.eth.getBalance(bob);
      var carolAfter = web3.eth.getBalance(carol);
      assert.equal(bobBefore.toString(10), bobAfter.toString(10), "Wrong Balance for Bob");
      assert.equal(carolBefore.toString(10), carolAfter.toString(10), "Wrong Balance for Carol");
     });
  });
});
*/

contract('Splitter', function(accounts) {
   var contract;
   var owner = accounts[0];
   var bob = accounts[1];
   var carol = accounts[2];

   beforeEach(function() {
    return Splitter.new({from: owner})
    .then(function(instance){
      contract = instance;
    });
  });

   it("should just say hi", function(){
    assert.strictEqual(true,true,"something is wrong");
  });

   it("should split Even equally", function(){
    var bobBefore = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);
    return contract.split(bob, carol, {from: owner, value:10})
      .then(function(txn){
      var bobAfter = web3.eth.getBalance(bob);
      var carolAfter = web3.eth.getBalance(carol);
      assert.equal(bobBefore.plus(5).toString(10), bobAfter.toString(10), "Wrong Balance for Bob");
      assert.equal(carolBefore.plus(5).toString(10), carolAfter.toString(10), "Wrong Balance for Carol");
     });
  });

   it("should split Odd properly", function(){
    var bobBefore = web3.eth.getBalance(bob);
    var carolBefore = web3.eth.getBalance(carol);
    return contract.split(bob, carol,{from: owner, value:11})
      .then(function(txn){
      var bobAfter = web3.eth.getBalance(bob);
      var carolAfter = web3.eth.getBalance(carol);
      assert.equal(bobBefore.plus(5).toString(10), bobAfter.toString(10), "Wrong Balance for Bob");
      assert.equal(carolBefore.plus(6).toString(10), carolAfter.toString(10), "Wrong Balance for Carol");
     });
  });

   it("should only allow withdraw from account owner", function(){
    contract.split(bob, carol,{from: owner, value:10})
    contract.withdraw({from: carol})
    .then(function(balance){
      assert.equal(contract.accounts(carol).toString("10"),5,"Wrong Balance for Carol");
      return contract.accounts(carol);
    });
    contract.withdraw({from: bob})
    .then(function(balance){
      assert.equal(contract.accounts(bob).toString("10"),5,"Wrong Balance for Bob");
      return contract.accounts(bob);
    });
   });
 });


   /*
       .then(function(txHash){
      assert.isNotNull(txHash, "Withdraw was not mined");
    });
    */
