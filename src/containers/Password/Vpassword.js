import React, {Component} from "react";//引入react
import {Link} from "react-router";//引入路由
import PropTypes from 'prop-types';
import {connect} from "react-redux";//引入react-redux
import {changeNavbarTitle} from '../../actions/home';
import {deposit, updataUserInfo,ModifyPasswordS} from '../../actions/user';
import './password.less';
import {Toast} from 'antd-mobile';

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
      code:this.props.location.query,
			newPassword:'',
			confirmPassword:'',
      oldPassword:''
		}
	}

   getPassword(type,e){
   	this.setState({
   		[type]:e.target.value
   	})
   };
   closePass(){
   	this.setState({
   		step:2
   	})
   };
   submit(){
      let {userInfo} = this.props 
      let {code,newPassword,confirmPassword} = this.state
      let data = {
        code:code.code,
        newPassword:newPassword,
        confirmPassword:confirmPassword
      };
      if (newPassword.length&&confirmPassword.length  === 6) {
        let reg = /^[0-9]*$/;
          if (reg.test(newPassword) && newPassword == confirmPassword) {
            this.props.dispatch(ModifyPasswordS(data,(res)=>{
              if (res.code == 0) {
                this.context.router.push('/Account');
              }
              else{
                Toast.info(res.message);
              }
            }))
             this.props.dispatch(updataUserInfo(userInfo))
            this.context.router.push('/Account')
          }else{
            Toast.info(res.message,1)
          }
      }
   }
 
  render() {
  	const {confirmPassword,newPassword,showFale,step} = this.state;
  	const {params} = this.props;
    return (
    	<div>
    {
    	step==1?
    	(
    	<div className="password">
	      <div className="password_top">                                    
	       <div className="password_iput">
	          <input type="password" value={newPassword} onChange={this.getPassword.bind(this,'newPassword')} maxLength='6' minLength="6"/>
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
          <input type="password" value={confirmPassword} onChange={this.getPassword.bind(this,'confirmPassword')} maxLength='6'minLength="6"/>
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
    	userInfo:state.userInfo
    }
}

export default connect(mapStateToProps)(PassWord)