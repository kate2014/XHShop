import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {updataUserInfo} from '../../actions/user'
import {storage} from '../../utils/tools';

import { List, InputItem,Icon } from 'antd-mobile';


class ToWeChat extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        console.log(storage.get('userInfo'))
        this.state={
          value:storage.get('userInfo').wechat
        }
        

    }


    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("绑定微信"))
    }
    componentWillReceiveProps(nextProps){

    }
    onChangeText(e){

      this.setState({
        value:e
      })
      

    }
    submit(){
      let {value}=this.state
      this.context.router.push(`/reset/${value}`)
      
    }
    
    
    
    render(){
   
      let {userInfo}=this.props;
      let {value} =this.state
     return(
        <div className="txt">
          <InputItem className="box" onChange={this.onChangeText.bind(this)}
           
            value={value}          
          >微信号</InputItem>
          <Icon type={"right"} color='#999999'/>
          <p  onClick={this.submit.bind(this)}>更换微信</p>
        </div>
        
      )
    }
}

function mapStateToProps(state){
  return{
    userInfo: state.userInfo,
    wechatVerification:state.wechatVerification
  }
  
}
export default connect (mapStateToProps)(ToWeChat)