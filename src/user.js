import React from 'react';
import Button from './Button';
import Web3 from 'web3';

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
var abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "sendETH",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_num",
                "type": "uint256"
            }
        ],
        "name": "SendETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
var address = "0x5DAEac847Cbda0d074776Ce69115cb7208b5c00C"
var contract = new web3.eth.Contract(abi, address);

class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            input:"",
            balance:0,
            account:""
        }
    }

    async init(){
        this.accounts = await web3.eth.getAccounts();
        let wei = await web3.eth.getBalance(this.accounts[1]);
        const balance = parseInt(wei)/1e18
        console.log(balance)
        this.setState({balance:balance})
        this.setState({account:this.accounts[1]})
    }
    
    async handleClick(){
        this.accounts = await web3.eth.getAccounts();
        await web3.eth.sendTransaction({from:this.accounts[1], to:this.accounts[0], value:parseInt(this.state.input)*1e18, gas:'5000000'})
        .catch((err) => {
            console.log("contract err " + err);
            return;
        });
        await contract.methods.SendETH(this.state.input).send({from:this.accounts[1], gas:'5000000'})
        .catch((err) => {
            console.log("contract err " + err);
            return;
        });
        this.setState({input:""})
    }

    handleInput(value){
        this.setState({input:this.state.input + value})
    }

    render() {
        const list =[
            {value:"1"},
            {value:"2"},
            {value:"3"},
            {value:"4"},
            {value:"5"},
            {value:"6"},
            {value:"7"},
            {value:"8"},
            {value:"9"},
            {value:"0"}
        ]
        this.init()
        return (
          <div>
            <h3>アカウント：{this.state.account}　残高：{this.state.balance} ETH
            </h3>
            <h1>
                {this.state.input} ETH
                <button onClick = {()=>{this.handleClick()}}>送金</button>
            </h1>
            
            
            
            {list.map((listItem)=>{
                return(
                    <button onClick = {()=>{this.handleInput(listItem.value)}}><Button number = {listItem.value}/></button>
                )
            })}
          </div>
        );
      }
};
export default User;