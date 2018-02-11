import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {changeNavbarTitle} from '../../actions/home'
import {connect} from "react-redux";
import {List, Button, InputItem, WhiteSpace, Toast} from 'antd-mobile';
import './index.less'
import {updateWechat,updataUserInfo,wechatVerification} from '../../actions/user'


var timer
class Reset extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.time=50
        this.state = {
           time:50,
           codeStatus:false
        }
        
    }

    componentDidMount(){

      this.changeCode()
    }
    componentWillUnmount(){
      clearInterval(timer)
    }
    onChangeText(e){
      if(e){
        this.setState({                  
            codeStatus:true
        })
      }
      this.setState({
       codestate:e.target.value
        })
      
    }


    // 重新发送验证码
    
    changeCode(){
      let {time} =this.state
      timer=setInterval(()=>{
        if(this.time>=0){
          this.setState({
            time:--time
          })
        }else{ 
          clearInterval(timer)
          this.time=50
        }
      },1000)
     
     
      this.props.dispatch(wechatVerification({}))
    }

    submit(){
      if(!this.state.codeStatus){
        Toast.info('请输入验证码')
      }
      else{
          let {userInfo}=this.props;
          let {codestate}=this.state
          let {chat}=this.props.params.value
          let obj={wechat:this.props.params.value,code:codestate,isBindStatus:0}
          this.props.dispatch(updateWechat(obj,(res)=>{
           if(res.code==0){
            userInfo.wechat=obj.wechat
            this.props.dispatch(updataUserInfo(userInfo))
            this.context.router.replace('/account')
           }else{
              Toast.info(res.message)
           }
          
         }))
        }
     
    }
    

    render(){
      let {codestate,time,time2} =this.state
      let {userInfo,params}=this.props;

  	 return(
  	 		<div>
  	 		  <div className="number">
            <p className="p1">我们已发送验证码到您的手机</p>
            <p className="p2">{userInfo.phone}</p>
          </div>

          <div className="second">
            <input type="text" maxLength="6" onChange={this.onChangeText.bind(this)}/>
            {
              time<=0?<p className="p1" onClick={this.changeCode.bind(this)}>重新发送</p>:<p className="p1"><span>{time}S</span></p>
          
            }
            
            <p className="p2" onClick={this.submit.bind(this)}>确定</p>
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

export default connect(mapStateToProps)(Reset)