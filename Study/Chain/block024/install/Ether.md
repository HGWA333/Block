```sh
eth.sendTransaction({from:eth.accounts[1],to:eth.accounts[2],value:web3.toWei(20,"ether"),})
```

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_sendTransaction", "params":[{"from":"0xc6955348bf907edbe38006ba159bd50b4ecd12dc","to":"0xA3e9Ab71E70086fd470587428aF5c9a003CA0338","value":"0x3B9ACA00","gas":"0x15f90","gasPrice":"0x430e23400"}]}' http://127.0.0.1:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": ["0x95abb6575517C4d0cA15119FF9CEF17A8538A03F","1234567890"]}' http://localhost:8080

curl -X POSTR -H "content-type: application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_coinbase"}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_start", "params": []}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_stop", "params": []}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_accounts", "params": []}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "txpool_content", "params": []}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xA3e9Ab71E70086fd470587428aF5c9a003CA0338","latest"]}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0x95abb6575517C4d0cA15119FF9CEF17A8538A03F"]}' http://localhost:8080
