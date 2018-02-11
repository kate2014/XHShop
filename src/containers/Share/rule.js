
import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {changeNavbarTitle} from '../../actions/home'

class ShareRule extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(changeNavbarTitle("分享规则")) 
  }
  render(){
    return(
      <div className="rule-content" style={{height:document.documentElement.clientHeight,'background':'#fff'}}>
        <div>
          <h4>一、推荐分享</h4> 
          <p>1、用户A登录状态分享商品（有奖励的商品），用户B从分享入口购买商品并且付款成功后，即可计入用户A的预计收入奖励。</p>
        </div>
        <div>
          <h4>二、奖励结算</h4>
          <p>1、订单确认收货后的次月20号结算，结算后可提现。结算金额根据商品实付金额计算。</p>
          <p>2、在次月结算日前，买家有发起维权售后申请退款的，将暂扣除退款部分商品奖励；待买家维权判别结束后若买家实际未退款成功的，将退回暂扣除的商品奖励。</p>
        </div>
        <div>
          <h4>三、其它</h4>
          <p>1、用户B通过用户A分享商品入口付款成功后，系统将随机赠送用户B现金券或其它奖励。</p>
          <p>2、未登陆状态分享商品（有奖励的商品），有用户付款成功，不产生分享奖励。</p>
          <p>3、关于分享奖励的规则解答请查阅相关官方公告。</p>
        </div>
      </div>
      )
  }
 
}


function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(ShareRule)
