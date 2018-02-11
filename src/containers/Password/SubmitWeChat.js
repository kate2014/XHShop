import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {updataUserInfo,updateWechat} from '../../actions/user'

import { List, InputItem,Icon } from 'antd-mobile';


class SubmitWeChat extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("绑定微信"))
    }
    onChangeText(e){
      this.setState({
        value:e
      })
    }

    submit(){
      let {userInfo} = this.props
      let {value}=this.state
      let obja={wechat:value,code:1,isBindStatus:1}
     
      

      this.props.dispatch(updateWechat(obja,(res)=>{
        // console.log(res)
        if(res.code==0){
          console.log(res)
          userInfo.wechat=obja.wechat
          this.props.dispatch(updataUserInfo(userInfo))
        }
        this.context.router.goBack()
      }))
    }
    
    
    
    
    render(){
   
      let {userInfo} = this.props
      // console.log(userInfo)
     return(
        <div className="txt">
          <InputItem className="box"
            onChange={this.onChangeText.bind(this)}
            placeholder={userInfo.wechat}           
          >微信号</InputItem>
          <Icon type={"right"} color='#999999'/>
          <p onClick={this.submit.bind(this)}>提交</p>
        </div>
        
      )
    }
}

function mapStateToProps(state) {
    return {
      userInfo: state.userInfo,
    }
}

export default connect(mapStateToProps)(SubmitWeChat)