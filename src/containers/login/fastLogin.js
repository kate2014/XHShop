import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Button, InputItem,WingBlank,Toast,WhiteSpace } from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import {getLoginSms,quickLogin} from '../../actions/user'
import utils from '../../utils'


class Login extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            phone:'',
            password:''
        }
        this.codeInterval = null;

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle('快速登录'))
    }

    componentDidMount() {

    }
    componentWillUnmount(){
        clearInterval(this.codeInterval)
        this.codeInterval = null
    }
    onChange =(type,value) => {
        if(type=='phone'){
            if (value.replace(/\s/g, '').length < 11) {
              this.setState({
                hasError: true,
                [type]:value,
              });
            } else {
              this.setState({
                hasError: false,
                [type]:value,
              });
            }
        }
      
        else{
            this.setState({
                [type]:value,
            });
        }


    }
    //获取验证码

    getSms=()=>{
        let {phone,hasError}=this.state
        if(hasError){
            Toast.info('请输入正确的手机号码', 1);
            return
        }
        let timer = 60
        if(this.codeInterval) return
        let input = this.refs.codeBtn
        input.innerText = timer+"s后重新获取"
        this.codeInterval = setInterval(()=>{
          timer--
          if(!timer){
            clearInterval(this.codeInterval)
            this.codeInterval = null
            input.innerText = '重新获取'
            return
          }
          input.innerText = timer+"s后重新获取"
        },1000)
        this.props.dispatch(getLoginSms({phone},(res)=>{
                Toast.info(res.message, 1);
            }))

    }
    login =() =>{
        let {phone,code,hasError}=this.state
        if(hasError){
            Toast.info('请输入正确的手机号码', 1);
            return
        }else if(code==''){
            Toast.info('请输入手机验证码',1)
            return
        }
        this.props.dispatch(quickLogin({phone,smsVerify:code},(res) => {
            if(res.code==0)
            {
                setTimeout(()=>{    //为了解决 安卓部分手机，跳页后页面高度计算有问题（目的是让软键盘先自动关闭）
                    this.context.router.goBack()
                },300)
                
            }
            Toast.info(res.message, 1);
        }))
    }

    render(){

        return (
            <div className="login-content"  style={{height: document.documentElement.clientHeight - 45*utils.multiple}}>
                <div className="center">
                    <WhiteSpace  size='lg' />
                    <WingBlank size='md'>
                    <List >
                       <InputItem
                        type="text"
                        placeholder="输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange.bind(this,'phone')}
                        value={this.state.phone}
                      ><i className="iconfont icon-phone"></i></InputItem>
                        <InputItem
                        type="text"
                        placeholder="请输入验证码"
                        onChange={this.onChange.bind(this,'code')}
                        value={this.state.code}
                      ><i className="iconfont icon-code"></i>
                       <span className="code-btn"  ref="codeBtn" onClick={this.getSms}>获取验证码</span>
                      </InputItem>
                        
                    </List>
                    <Button style={{"marginTop":'100px'}} className="btn" onClick={this.login}>登录</Button>
                    </WingBlank>


                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(Login)
