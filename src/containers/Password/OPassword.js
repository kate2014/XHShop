//输入原始密码，进行身份验证
import React, {Component} from 'react';
import {Link} from 'react-router';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeNavbarTitle} from '../../actions/home';
import {deposit,setCipher }from '../../actions/user';
import {Toast} from 'antd-mobile';
import './password.less';

class Opassword extends Component {
	static PropTypes =  {};
	static contextTypes = {};
	static contextTypes = {
		router:React.PropTypes.object.isRequired
	}
	constructor(props) {
		super(props);
		this.state = {
			newPassword:'',
			confirmPassword:'',
      		oldPassword:''
		}
	}
   getPassword(type,e){
   	this.setState({
   		[type]:e.target.value
   	})
   }	
   componentWillMount() {
   		 this.props.dispatch(changeNavbarTitle("重设提现密码"));
        this.props.dispatch(setCipher({}))
    }
	setPassword(){
		let userInfo = this.props
		let {oldPassword} = this.state
		this.props.dispatch(setCipher({oldPassword}))

		this.context.router.push('/password')

		

	}

	
	render(){
		return(
			<div className="Opassword">
				<div className="validate">
					<p>输入<strong>提现密码</strong>，完成身份验证</p>
				</div>
				<input type="password" maxLength="6" minLength="6" placeholder="输入原始提现密码" onChange={this.getPassword.bind(this,'oldPassword')} />
				<div className="OpasswordBtn" onClick={this.setPassword.bind(this)}>下一步</div>
			</div>
			)
	}
}


function mapStateToProps(state) {
	return {
		
	}
}
export default connect(mapStateToProps)(Opassword)