import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { List, Button, InputItem, WhiteSpace, Toast, Steps,Picker } from 'antd-mobile';
import { changeNavbarTitle } from '../../actions/home'
import {selectWithdrawRecordDetail} from '../../actions/product'
import { connect } from "react-redux";
import './index.less'

const Step = Steps.Step;
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
   
  </svg>
);
class Detailed extends Component {
  static propTypes = {};
  static defaultProps = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      status:"",
      takeMoneydetails:"",
      amountData:[],      
      statusTimeLine:[]
    }
  }
  componentWillMount() {
    this.props.dispatch(changeNavbarTitle("提现"))
    
  }
  componentDidMount() {
    const {id} = this.props.location.query;
    let data ={
      id:id
    }
    let status=this.props;
    this.props.dispatch(selectWithdrawRecordDetail(data,(res)=>{
      	this.setState({
            statusTimeLine:res.data.statusTimeLine,
            amountData:res.data.amount,
            wechatData:res.data.wechat,
            id:res.data.id
					})

    }))
  }
  getUrl(name) {
    var result = new RegExp('[\?&]' + name + '=([^&#])').exec(window.location.href);
    return result ? result[1] : '';
  }
  render() {
    let {selectWithdrawRecordDetail } = this.props;
    let {statusTimeLine} =this.state
    let{amountData,wechatData}=this.state  
    return (
      <div className="detailed">
       {statusTimeLine.map((statusTimeLine,i) => {
          return(
        <div className="top_title" key={i}> 
    <WhiteSpace size="lg" />
    <Steps current={1}>
      <Step className="boxes" title={statusTimeLine.statusDesc} icon={customIcon()} /> 
    </Steps>
    </div>
     )})}
        <div className="container">
          <div className="top">
            <p className="p1">提现金额</p>
            <p className="p2">￥{amountData}</p>
          </div>
          <div className="bottom">
            <p className="p1">到账微信</p>
            <p className="p2">{wechatData}</p>
          </div>
        </div>
        </div>
    )  
}
}
function mapStateToProps(state) {
  console.log(3344)
  console.log(state.selectWithdrawRecordDetail)
  return {
    selectWithdrawRecordDetail:state.selectWithdrawRecordDetail.toJS()
  }
}
export default connect(mapStateToProps)(Detailed)