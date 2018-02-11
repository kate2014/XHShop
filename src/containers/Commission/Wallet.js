// 提现金额输入页面
import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { addWithdrawRecord } from '../../actions/product'
import { changeNavbarTitle } from '../../actions/home'
import { Modal, List, Button, InputItem, WhiteSpace, Toast, Icon } from 'antd-mobile';
import { connect } from "react-redux";
import './index.less';
import './pay-pop-box.less'
import $ from 'jquery';


const alert = Modal.alert;
const prompt = Modal.prompt;
class Wallet extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            money:0,
            message: '',

        }
    }
// 正则表达式
    handleChange(e) {
        this.setState({
             message: e.target.value
             });
        let reg=/^[0-9]*$/
        if(reg.test(e.target.value)){

        }else{
            alert("您的输入有误！")
        }

    }
    // 密码输入框事件
    onpwdChange(e) {




        // let password=e.target.value;
        // console.log(8)
        // console.log(password)
        // this.setState({
        // password: password,
        // })


    }

// 全部提现
takeAllCash(e){
    let {totalMoney} = this.props.location.query;
    console.log(777)
    console.log(totalMoney)
    this.setState({
        message:totalMoney
    })

}

//密码弹窗
password_window() {






    let {password,message} =this.state
    // console.log(99)
    // console.log(password)
    let { openId, totalMoney} = this.props.location.query;
    if (message == "") {
        alert('请输入提现金额')
        return
    } else {

        //出现浮动层
        $(".psw-input-box li").text("");
        $(".pay-fixed-box").show();
        $(".numb_box").slideDown(500);
        var i = 0;
        var pswnum = "";
        $(".psw-num-ggg li a").click(function(){
            pswnum+=$(this).text();

            i++;
            if(i<6){
                $(".psw-input-box li").eq(i-1).text("☀");
            }else{
                $(".psw-input-box li").eq(i-1).text("☀");

            }
        });
        $(".psw-num-box li .del").click(function(){
            pswnum = pswnum.substring(0, pswnum.length-1);
            if(i>0){
                i--
                $(".psw-input-box li").eq(i).text("");
                i==0;
            }

        });

        $(".sureBtn").click(function(){
            pswnum = pswnum.substring(0, pswnum.length);
            console.log("haha")
            console.log(pswnum)
            if(pswnum.length < 6){
                alert('请输入6位数字')
                return
            }

            $(".sureBtn").unbind('click');
            $(".pay-fixed-box").hide();
        });
        $(".cancelBtn").click(function(){

            $(".pay-fixed-box").hide();



        });


    }


}




componentWillMount() {
    this.props.dispatch(changeNavbarTitle("提现"))

}
componentWillReceiveProps() {
    // this.props.dispatch(changeNavbarTitle("重设提示密码"))
    // let { totalMoney } = this.props.location.query
    // this.setState({
    //     totalMoney

    // })
}

render() {
   let { totalMoney } = this.props.location.query
    let { userInfo } = this.props;
    let message = this.state.message;
    return (
        <div className="wallet">
            <div className="wallet_box">
                <div className="one">
                    <span className="left">提现到微信钱包</span>
                    <span className="right"><strong>{userInfo.nickName}</strong></span>
                    <span className="bottom">2小时内到账</span>
                </div>
                <div className="two">
                    <div className="top">提现金额</div>
                      <div className="center">￥ <input type="text"
                      value={message} onChange={this.handleChange.bind(this)} /></div>
                </div>
                <div className="wallet_bottom">
                    <span className="left">我的佣金额￥{totalMoney},</span>
                    <span onClick={this.takeAllCash.bind(this)}><strong>全部提现</strong></span>
                </div>
            </div>

            <WhiteSpace size="lg" />
            <Button className="box" onClick={this.password_window.bind(this)}>提现</Button>



            <div className="pay-fixed-box" >
                <div className="pay-header-box">
                    <div className="tt"><span className="close">╳</span><b>请输入提现密码</b></div>
                    <div className="pay-total-money">提现<span>￥{message}</span></div>
                    <div className="psw-input-box">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="sure_cancelPanel">
                        <Button className="sureBtn" >确定</Button>
                        <Button className="cancelBtn">取消</Button>
                    </div>
                </div>


                <div className="psw-num-box">
                <ul className="psw-num-ggg">
                    <li><a href="javascript:void(0);">1</a></li>
                    <li><a href="javascript:void(0);" className="num-midlle">2</a></li>
                    <li><a href="javascript:void(0);">3</a></li>
                    <li><a href="javascript:void(0);">4</a></li>
                    <li><a href="javascript:void(0);" className="num-midlle">5</a></li>
                    <li><a href="javascript:void(0);">6</a></li>
                    <li><a href="javascript:void(0);">7</a></li>
                    <li><a href="javascript:void(0);" className="num-midlle">8</a></li>
                    <li><a href="javascript:void(0);">9</a></li>
                    <li><span></span></li>
                    <li><a href="javascript:void(0);" className="num-midlle">0</a></li>
                    <li><span  className="del" >←</span></li>
                </ul>
            </div>
            <div className="pay-shadow-box"></div>
        </div>
        </div>



    )
}
}

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo

    }
}
export default connect(mapStateToProps)(Wallet)
