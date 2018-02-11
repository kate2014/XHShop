import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {updataUserInfo} from '../../actions/user'



import {Icon, List, InputItem } from 'antd-mobile';


class IdentityAuthentication extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        

    }
    

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("实名认证"))
    }
    
    
    
    
    render(){ 
      let {userInfo} = this.props
     return(
        <div className="IdentityAuthentication">
          <List>
            <InputItem value={userInfo.trueName} onClick={()=>{this.context.router.push("/identity")}}>姓名
              <Icon type={"right"} color='#999999' />
            </InputItem>

            <InputItem value={userInfo.idCardMask} onClick={()=>{this.context.router.push("/identity")}}>证件号
              <Icon type={"right"} color='#999999'/>
            </InputItem>

            <InputItem value={userInfo.idCardImgFront&&userInfo.idCardImgBack?'已上传':'未上传'} onClick={()=>{this.context.router.push("/identity")}}>证件照片
              <Icon type={"right"} color='#999999'/>
            </InputItem>
          </List>
        </div>
        
      )
    }
}


function mapStateToProps(state){
  return{
    userInfo:state.userInfo
  }
}
export default connect (mapStateToProps)(IdentityAuthentication)