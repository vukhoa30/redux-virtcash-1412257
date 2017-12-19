import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import './Home.css';
import TransactionForm from '../TransactionForm/TransactionForm';

const cookies = new Cookies();

var componentMounted = false;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  getWallets() {
    const token = cookies.get('token');
    fetch('/api/get-self-wallets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    })
    .then(rslt => { 
      if (rslt.status === 400 || rslt.status === 401) { return false; }
      return rslt.json(); 
    })
    .then(data => {
      if (data) {
        this.props.p_setCurrentWallets(data);
      }
    })
    .catch(err => { console.log(err) })
  } 
  getAllTransactions() {
    fetch('/api/get-all-transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(rslt => { 
      if (rslt.status === 400 || rslt.status === 401) { return false; }
      return rslt.json(); 
    })
    .then(data => {
      if (data) {
        this.props.p_setAllTransactions(data);
      }
    })
    .catch(err => { console.log(err) })
  }
  getSelfTransactions() {
    var token = cookies.get('token');
    fetch('/api/get-self-transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    })
    .then(rslt => { 
      if (rslt.status === 400 || rslt.status === 401) { return false; }
      return rslt.json(); 
    })
    .then(data => {
      if (data) {
        this.props.p_setCurrentTransactions(data);
      }
    })
    .catch(err => { console.log(err) })
  }
  createWallet() {
    var token = cookies.get('token');
    this.refs.btnCreateWallet.setAttribute("disabled", "disabled");
    fetch('/api/create-wallet', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      }
    })
    .then(rslt => { 
      if (rslt.status === 401 || rslt.status === 400) {
        alert("Thêm ví thất bại! ");
        console.log(rslt.json());
        return false;
      }
      return rslt.json(); 
    })
    .then(data => {
      if (data) {
        alert("Thêm ví thành công!");
        window.location.reload();
      }
    })
    .catch(err => { console.log(err) })
  }

  componentDidMount() {
    this.getAllTransactions();
    this.getWallets();
    this.getSelfTransactions();
  }

  render() {
    var wallets = null,
      walletOptions = null;
    if (this.props.p_selfWallets) {
      wallets = this.props.p_selfWallets.map((item, idx) => {
        return <li key={`wallet_${idx}`}>Mã: <span className="label label-default">{item._id}</span> Số dư: <span className="home-vt-small">{item.balance} VT</span></li>
      })
      walletOptions = this.props.p_selfWallets.map((item, idx) => {
        return <option key={`walletOption_${idx}`} value={item._id}>{item._id}</option>
      })
    }

    const haveWallet = (this.props.p_selfWallets && this.props.p_selfWallets.length === 0) ? null : (
      <p>
        <button className="btn btn-default" data-toggle="modal" data-target="#myModal">
          Gửi tiền
        </button>
      </p>
    )

    var selfTransactions = null;
    if (this.props.p_selfTransactions) {
      selfTransactions = this.props.p_selfTransactions.map((item, idx) => {
        return <li key={`self_${idx}`}>{item.walletFromID} chuyển đến {item.walletToID} <span className="home-vt-small">{item.amount} VT</span> vào lúc {item.time}</li>
      })
      selfTransactions = selfTransactions.reverse();
    }
    var allTransactions = null;
    if (this.props.p_allTransactions) {
      allTransactions = this.props.p_allTransactions.map((item, idx) => {
        return <li key={`all_${idx}`}>{item.walletFromID} chuyển đến {item.walletToID} <span className="home-vt-small">{item.amount} VT</span> vào lúc {item.time}</li>
      })
    }

    const userControls = this.props.userInfo ? (
      <div>
        {haveWallet}
        <h2>Các ví tiền: </h2>
        <ul>
          {wallets}
          <li><button ref="btnCreateWallet" onClick={this.createWallet.bind(this)} className="btn btn-success">+</button></li>
        </ul>
        <h2>Các giao dịch gần đây:</h2>
        <ul>
          {selfTransactions}
        </ul>
      </div>
    ) : (
      <div>
        <h3><a href="/sign-in">Đăng nhập</a> để có ví và giao dịch tiền ảo</h3>
      </div>
    )

    return (
      <div className="home-panel">
        <div className="panel panel-default home-padding-panel">
          <div className="panel-body">
            <div className="col col-md-6">
              {userControls}
            </div>
            <div className="col col-md-6">
              <h2>Tất cả giao dịch: </h2>
              <ul>
                {allTransactions}
              </ul>
            </div>
          </div>

          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Gửi tiền</h4>
                </div>
                <div className="modal-body home-modal-body">
                  <TransactionForm wallets={this.props.p_selfWallets}/>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-default" data-dismiss="modal">Đóng</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home