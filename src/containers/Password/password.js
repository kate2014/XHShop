import React, {Component} from "react";//引入react
import {Link} from "react-router";//引入路由
import PropTypes from 'prop-types';
import {connect} from "react-redux";//引入react-redux
import {changeNavbarTitle} from '../../actions/home';
import {deposit, updataUserInfo,setCipher} from '../../actions/user';
import {Toast} from 'antd-mobile';
import './password.less'

class PassWord extends Component {
	static PropTypes = {};
	static contextTypes = {};
  	static contextTypes={
	  	router: React.PropTypes.object.isRequired
		};
  componentWillMount() {
        this.props.dispatch(changeNavbarTitle("提现密码"))
    }
	constructor(props) {
		super(props);
		this.state = {
			showFale:false,
			step:1,
			newPassword:'',
			confirmPassword:'',
      oldPassword:''
		}
	}

   getPassword(type,e){
   	this.setState({
   		[type]:e.target.value,
   	})
   }
   closePass(){
   	this.setState({
   		step:2
   	})
   
   }




   submit(){
      
      let {newPassword,confirmPassword} = this.state
      let {userInfo, oldPassword} = this.props
      let a = this.props.oldPassWord.oldPassword
          
      
      let data = {
        oldPassword:this.props.oldPassWord.oldPassword,
        newPassword:newPassword,
        confirmPassword:confirmPassword
      }
       
      if (newPassword.length&&confirmPassword.length  === 6) {
        let reg = /^[0-9]*$/
          if (reg.test(newPassword) && newPassword == confirmPassword) {
            this.props.userInfo.hasWithdrawPassword = false
            this.props.dispatch(deposit(data,(res)=>{
               if (!a) {
                data.oldPassword = this.state.confirmPassword
              }else{ 
                data.oldPassword = this.props.oldPassWord.oldPassword
              }
            }))
            this.props.dispatch(updataUserInfo(userInfo))
            this.context.router.push('/account')
          }else{
            Toast.info(res.message)
          }
      }
      
   		
   }
 
  render() {
  	const {confirmPassword,newPassword,showFale,step} = this.state;
  	const {params,oldPassword} = this.props;
    return (
    	<div>
    {
    	step==1?
    	(
    	<div className="password">
	      <div className="password_top">                                    
	       <div className="password_iput">
	          <input type="password" value={newPassword} onChange={this.getPassword.bind(this,'newPassword')} maxLength='6'/>
	       </div>
	          <p>设置您的提现密码</p>
	      </div>
	      <button onClick={this.closePass.bind(this)}>确定</button>
	    </div>
    	) 
      : 
      (<div className="password">
      <div className="password_top">                                    
       <div className="password_iput">
          <input type="password" value={confirmPassword} onChange={this.getPassword.bind(this,'confirmPassword')} maxLength='6'/>
          
       </div>
          <p>设置您的提现密码</p>
      </div>
      <button onClick={this.submit.bind(this)}>再次确认</button>
      </div>)
    }
     </div>
    );
  }
}
function mapStateToProps(state) {
    return {
    	userInfo:state.userInfo,
      oldPassWord:state.oldPassWord.toJS()
    }
}

export default connect(mapStateToProps)(PassWord)