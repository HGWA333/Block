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

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0xee208c2983f67eb815e01452087c03ddc268d6ff"]}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "evm_snapshot"}' http://localhost:8545

curl -X POST -H "content-type:application/json" --data '{"id":1337, "jsonrpc": "2.0", "method": "evm_revert", "params":["0x2"]}' http://localhost:8545

- 계정 언락

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": ["0xb10424ed82893beff5584b26c479e9edc17d5981","password"]}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_setEtherbase", "params": ["0xb10424ed82893beff5584b26c479e9edc17d5981"]}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_getBalance", "params": ["0xb10424ed82893beff5584b26c479e9edc17d5981", "latest"]}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "eth_coinbase", "params": []}' http://localhost:8080

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "miner_start", "params": []}' http://127.0.0.1:8080

eth.sendTransaction({from:"0xb10424ed82893beff5584b26c479e9edc17d5981", to: "0x08d91c477faa3174ab14564099f08b346cf026f1", value: 50ether})

eth.sendTransaction({from:eth.accounts[1], to:eth.accounts[2], value:web3.toWei(25,"ether")})

curl -X POST -H "content-type:application/json" --data '{"id":50, "jsonrpc": "2.0", "method": "personal_unlockAccount", "params": ["0x3a57dfcf9dce0dd143289fd53ef5a9ebc1849404" ,"password"]}' http://localhost:8080

eth.getTranaction("0xf21d2c7b175a133ec6c59fa649cc2861bf719ec83a4666753e59667e16d23f15")

eth.getBalance("0xf21d2c7b175a133ec6c59fa649cc2861bf719ec83a4666753e59667e16d23f15")
