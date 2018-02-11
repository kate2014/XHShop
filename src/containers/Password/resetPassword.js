import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {changeNavbarTitle} from '../../actions/home';
import {connect} from "react-redux";
import {List, Button, InputItem, WhiteSpace, Toast} from 'antd-mobile';
import './password.less'
import {deposit,ModifyPassword,updataUserInfo,ModifyPasswordS} from '../../actions/user'

var timer
class Reset extends Component{
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    // componentWillMount() {
    //     this.props.dispatch(changeNavbarTitle("重设提现密码"))
    // }
    componentWillMount() {
      this.props.dispatch(changeNavbarTitle("重设提现密码"));
        let {userInfo} = this.props;
        let {data} = this.state;
        let obj = {code:data}

        this.props.dispatch(ModifyPassword(obj,(res)=>{
          if (res.code == 0) {
            this.setState(()=>{
                this.context.router.replace('/Vpassword?code='+data)
                return
            })
           
          }else{
            Toast.info(res.message)
          }
        }))
      }


    constructor(props) {
        super(props);
        this.time=60
        this.state = {
           time:60
           
        }
        
    }

    componentDidMount(){
      this.changeCode()
    }
    componentWillUnmount(){
      clearInterval(timer)
    }
    onChangeText(e){
      this.setState({
       data:e.target.value
        })
      
    }

    // 重新发送验证码
    
    changeCode(){
      timer=setInterval(()=>{
        if(this.time>=0){
          this.setState({
            time:--this.time
          })
        }else{ 
          clearInterval(timer)
          this.time=60
        }
      },1000)
     
      // this.props.dispatch(ModifyPassword({}))
    }

    submit(){
      let {userInfo} = this.props;
      let {data} = this.state;
      let obj = {code:data}

      this.props.dispatch(ModifyPassword(obj,(res)=>{
        if (res.code == 0) {
          this.setState(()=>{
              this.context.router.replace('/Vpassword?code='+data)
              return
          })
         
        }else{
          Toast.info(res.message)
        }
      }))
    }

    render(){
      let {time,time2} =this.state
      let {userInfo}=this.props;

  	 return(
  	 		<div>
  	 		  <div className="number">
            <p className="p1">我们已发送验证码到您的手机</p>
            <p className="p2">{userInfo.time}</p>
          </div>

          <div className="second">
            <input type="text" maxLength="6" minLength="6" onChange={this.onChangeText.bind(this)}/>
            <p className="p2" onClick={this.submit.bind(this)}>确定</p>
            {
              time<=0?<p className="p1" onClick={this.changeCode.bind(this)}>重新发送</p>:<p className="p1"><span>{time}S</span></p>
          
            }
            
            
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