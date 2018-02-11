//是否记得原始密码
import React, {Component} from 'react';
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {List,Button, InputItem,WhiteSpace,Toast} from 'antd-mobile';
import './password.less'

 class Remember extends Component {
	
	static PropTypes = {};
	static contextTypes = {};
	static contextTypes = {
		router:React.PropTypes.object.isRequired
	};
	
	constructor(props) {
		super(props)
		this.state = {

		}
	}
	componentWillMount() {
        this.props.dispatch(changeNavbarTitle("重设提现密码"))
    }

	render() {
		return(
				<div>
					<div className="validate">
						<p>您是否记得原始提现密码</p>
					</div>
					<div className="btn next" onClick={()=>{this.context.router.push("/Opassword")}}>
						<p>记得</p>
					</div>
					<div className="btn no" onClick={()=>{this.context.router.push("/resetPassword")}}>
						<p>不记得</p>
					</div>
				</div>
			)
		
	}

}

function mapStateToProps(state) {
    return {
    	userInfo:state.userInfo,
    }
}

export default connect(mapStateToProps)(Remember)