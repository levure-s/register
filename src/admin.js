import React from 'react';
import Button from './Button';
import Web3 from 'web3';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0,
      input:"",
      msg:""
    }
    
  }

  handleClick(value){
    this.setState({input:this.state.input + value})
  }

  handleAdd(value){
    this.setState({count:this.state.count + parseInt(value)})
    this.setState({input:""})
  }

  buying(event){
    var addr = event.returnValues._sender;
    var value = event.returnValues._value;
    console.log("[notice] Buying! (addr:" + addr + " ,value:" + value + ")");
    if(this.state.count > value){
      var balance = parseInt(this.state.count) - parseInt(value)
      this.setState({msg:balance.toString(10) + "ETH不足しています"})
    }else{
      this.setState({msg:"決済完了"})
      this.setState({count:0})
    }
  }
  
  render() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.WebsocketProvider("ws://localhost:7545"));
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
    contract.events.sendETH({}, (err,event) => {
      if(!err) {
        this.buying(event)    
      } else {
        console.log(err);
      }
    })
    
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
    return (
      <div>
        <h1>
          {this.state.count}
          
        </h1>
        <h2>
          {this.state.input}
        </h2>
        <p>
          {this.state.msg}
        </p>

        {list.map((listItem)=>{
          return(
            <button onClick = {()=>{this.handleClick(listItem.value)}}><Button number = {listItem.value}/></button>
          )
        })}

        <button onClick = {()=>{this.handleAdd(this.state.input)}}>+</button>
        
        
        
      </div>
    );
  }
}

export default Admin;
