/*
 *提现
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Toast, Modal, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { addWithdrawRecord } from '../../actions/product'
import NavBar from "../../components/NavBar";

const alert = Modal.alert;
const showAlert = () => {
  const alertInstance = alert('Delete', 'Are you sure???', [
    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
    { text: 'OK', onPress: () => console.log('ok') },
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};


class Withdrawals extends Component {
	static propTypes = {
	};
	static defaultProps = {
	};
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			money: 0

		}
	}
	componentWillMount() {
		let { totalMoney, openId } = this.props.location.query
		this.setState({
			totalMoney,
			openId
		})
	}
	componentDidMount() {
	}

	// 点击跳转事件
	toWallet() {
		let idCardAuditStatus = this.props.userInfo.idCardAuditStatus
		let {totalMoney,openId}=this.state
			this.context.router.push(`myCommission/Wallet?totalMoney=${totalMoney}&openId=${openId}`)
		
		if (idCardAuditStatus == 100) {
		} else {
		// 	console.log(333)
		// alert('您还没有进行实名认证和提现账户绑定','', [
		// 			{ text: '取消', onPress: () => console.log('cancel') },
		// 			{ text: '去认证', onPress: () => {this.context.router.push(`/Password/AccountManagement`)} },
		// 		])
		}
	}


	render() {
		let { totalMoney, openId } = this.state
		let { userInfo } = this.props;
		console.log(66)
		console.log(userInfo)
		return (
			<div>
				<NavBar title="提现"
					{...this.props}
					leftClick={() => {
						this.context.router.goBack()
					}}
					rightContent={[
						<div key={0} style={{ 'color': '#333' }} onClick={() => { this.context.router.push(`myCommission/history`) }}>提现明细</div>
					]}
				/>
				<div className="commission">
					<ul>
						<li className="one"><img src={require("../../assets/images/commin@2x.png")} /></li>
						<li className="two">我的佣金</li>
						<li className="three">￥{totalMoney}</li>
					</ul>
					<div className="box" onClick={this.toWallet.bind(this)}>
						<p>提现</p>
					</div>
				</div>
			</div>

		)
	}
}


function mapStateToProps(state) {
	console.log(1122)
	console.log(state.userInfo)
	return {
		userInfo: state.userInfo
	}
}

export default connect(mapStateToProps)(Withdrawals)
