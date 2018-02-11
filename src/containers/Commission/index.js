/*
 * 我的奖励
 */
import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,WhiteSpace,Toast,Modal} from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import {CommissionProduct} from '../../components/CommissionProduct'
import {selectTotalProfitAmout,getShareOrder2} from '../../actions/product'
import './index.less'
import utils from '../../utils'
const Item = List.Item;

class MyCommission extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			shareData:[]

		}

	}
  componentWillMount(){
      this.props.dispatch(changeNavbarTitle("我的奖励"))

  }
	componentDidMount (){
			this.props.dispatch(selectTotalProfitAmout())
			this.props.dispatch(getShareOrder2({pageNow:1,pageSize:2},(res)=>{
				if(res.code==0)
					this.setState({
						shareData:res.data.datas
					})
			}))
	}
	componentWillUnmount(){
		
	}
	//提现
	Withdrawals (){
		let {data} =this.props.totalProfitAmout
		/*if(data.totalMoney<=0){
			Toast.info('提现金额必须大于0元',1)
			return
		}*/
		this.context.router.push(`/myCommission/withdraw?totalMoney=${data.totalMoney}&openId=o_g9us2eljgdSMB-OJfCtpIcsI6Y`)
		
	}

	render() {
	let {data} =this.props.totalProfitAmout
	let {shareData} =this.state
		return(
			<div className='commission-content vb-content'>
				<div className='section' style={{height:document.documentElement.clientHeight-45*utils.multiple}}>
				<div className="cheader">
					<div className="d1">可提奖励</div>
					<div className="d2">
						<span className="money">{data.totalMoney}<span className="unit">元</span></span>
						<span className="btn-tixian" onClick={this.Withdrawals.bind(this)}>提现</span>
					</div>
				</div>
				<div className="ctop">
						<div className="details">
							<div className="s1">上月预估收入</div>
							<div className="s2"><span className="unit">￥</span>{data.previousMonthMoney}</div>
							<div className="s3 redColor">已结算</div>
						</div>
						<div className="details">
							<div className="s1">本月预估收入</div>
							<div className="s2"><span className="unit">￥</span>{data.currentMonthMoney}</div>
							<div className="s3 yellowColor">待结算</div>
						</div>
				</div>
				<div className="cbottom">
						每月20日结算上月预估收入，本月预估收入则在下个月20日结算。
				</div>
				<WhiteSpace />
				<List className="my-list">
	        <Item  arrow="horizontal" extra={'查看全部'} onClick={()=>{
	        	this.context.router.push('myCommission/order')
	        }}>订单明细</Item>
	      </List>
				<div className="commission-products">
					{
						shareData.map((item,i)=>{
							return(
								<CommissionProduct key={i} item={item} />
								)
						})
					}
				</div>
			</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		totalProfitAmout:state.totalProfitAmout,
		
	}
}
export default connect(mapStateToProps)(MyCommission)
