import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Flex, WhiteSpace, WingBlank,Button} from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import {getShareOrderCoupon} from '../../actions/orderDetails'
import utils from '../../utils'
import './index.less'




class OnlinePayment extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state={
            showCoupon:false
        }

    }

    componentWillMount() {

       // this.props.dispatch(changeNavbarTitle('提示'))
    }

    componentDidMount() {
        const {orderId} = this.props.location.query;
        if(orderId){
            this.props.dispatch(getShareOrderCoupon({orderId},(res)=>{
                if(res.code ==0){
                    this.setState({
                        ...res.data,
                        showCoupon:true
                    })
                }
               
            }))
        }
        
    }
    //couponRange : 0 全场  1专场  其他满减
    onClickEvent = () => {

        if (this.state.couponRange == 0) {
            this.context.router.push(`/classification`);
        } else if (this.state.couponRange == 1) {
            this.context.router.push(`/activityProduct?id=${this.state.rangeId}`);
        } else {
            this.context.router.push(`/reductionArea?couponId=${this.state.couponId}`);

        }
    }

    render() {
        const {orderId,text,type} = this.props.location.query;
        let _type=type==undefined?'true':type
        _type = eval(_type.toLowerCase())
        return (
            <div className="order-details">
                <div className="list-0">
                    <p className="line">
                        <span></span><span></span><span></span>
                    </p>
                    <p className="p1">
                    <svg className="icon" aria-hidden="true" style={{width:38*utils.multiple,height:38*utils.multiple,'fill':'#fff'}}>
                        <use xlinkHref={`${_type==true?"#icon-gou":"#icon-shibai"}`}></use>
                    </svg>
                   
                    </p>
                    <p className="p2">{text}</p>
                </div>
                <div className="btn-group">
                    <WingBlank size="md">
                        <WhiteSpace size="sm"/>
                        <Flex>
                            {orderId?<Flex.Item><span className="btn btn1" onClick={()=>{this.context.router.push(`/orderdetails?id=${orderId}`)}}>查看订单</span></Flex.Item>:""}
                            <Flex.Item><span className="btn btn2" onClick={()=>{this.context.router.push('/home')}}>继续逛逛</span></Flex.Item>
                        </Flex>
                        <WhiteSpace size="sm"/>
                        <div className="tip">注意：本平台及销售商不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。</div>
                    </WingBlank>
                </div>
                {
                   this.state.showCoupon? this.renderCoupon() :null
                }
            </div>
        )
    }

    renderCoupon(){
        return(
            <div className="coupon-diago">
                <div className="drawer_screen"></div>
                <div className="drawer_box">
                   {/*<i className="iconfont icon-close" onClick={()=>{
                    this.setState({
                        showCoupon:false
                    })
                   }}></i> */}
                   <svg onClick={()=>{
                    this.setState({
                        showCoupon:false
                    })
                   }} className="icon icon-close" aria-hidden="true" style={{width:30*utils.multiple,height:30*utils.multiple}}>
                        <use xlinkHref="#icon-guanbi"></use>
                    </svg>
                   <div className="coupon">
                        <div className="top">
                            <div className="d1">{this.state.couponName}</div>
                            <div className="d2">{this.state.instruction}</div>
                        </div>
                        <div className="bottom">
                            <div className="d1">恭喜您</div>
                            <div className="d2">获得优惠券礼包</div>
                            <Button onClick={this.onClickEvent}>立即使用</Button>
                        </div>
                   </div>
                </div>
            </div>
            )
    }
}


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(OnlinePayment)
