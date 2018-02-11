import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {updataUserInfo,updateSex,uploadImage} from '../../actions/user'
import {List, Button, InputItem, WhiteSpace, Toast,Picker,Modal,Icon} from 'antd-mobile';
import './index.less'

import Tan from '../../components/tankuang'
import Text from '../../components/Text'
import {uploadImg} from '../../actions/evaluation';
import {storage} from "../../utils/tools"
import utils from '../../utils'
import {emptyOrder} from '../../actions/orderDetails'
import {emptyMycommentList} from '../../actions/evaluation'
import {emptyListAddress} from '../../actions/address'



const alert = Modal.alert;

let SexData=[{label:'男',key:0},{label:'女',key:1}]
class Account extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        
        super(props);
        let {userInfo} = this.props
        this.state = {
          showFale:false,
          img1:userInfo.headImg
      };
      
      


    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("账户管理"))
    }
    // 弹框显示和隐藏
    selectFale(){
      this.setState({
        showFale:true,
      })
    }

    // 点击性别改变
    changeFale(obj){
      this.setState({
        showFale:false,
        // fale:obj

      })
      let {userInfo} = this.props
      // let {fale}=this.state
      let a={sex:obj.key}
      this.props.dispatch(updateSex(a,(res)=>{
        if(res.code==0){
          userInfo.gender=obj.key
          this.props.dispatch(updataUserInfo(userInfo))
        }
        // this.context.router.goBack()
      }))

    }


        // 点击退出
      exitSys=()=>{
        alert('退出登录', '是否退出该账号', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () => {
                   /* this.props.dispatch(LoginOut({},(res)=>{
                        if(res.code==0){
                            storage.remove("token");
                            storage.remove("userInfo");
                            this.props.dispatch(emptyOrder());
                            this.props.dispatch(emptyMycommentList());
                            this.props.dispatch(emptyListAddress());
                            this.context.router.push(`/login`);
                        }else{
                            Toast.info(res.message,1)
                        }
                    }))*/
                    storage.remove("token");
                    storage.remove("userInfo");
                    this.props.dispatch(emptyOrder());
                    this.props.dispatch(emptyMycommentList());
                    this.props.dispatch(emptyListAddress());
                    this.context.router.push(`/login`);
                    
                }
            },
        ])

    }

    // 性别取消
    changeShowFale(cancel){
      this.setState({
        showFale:false
      })
    }


    //更换头像
      upDateImage =(e) =>{
        var file = e.target.files[0]
        let {userInfo} = this.props
        
        // if(!file) return
        // var imgSize = file.size;
        e.target.value= '' 
        let data={
            attachs:file
        }
        

         this.props.dispatch(uploadImg(data,(res) => {
            // console.log(file)
            if (res.code == 0) {
                this.setState({
                  img1:res.data.url,
                })
                let ee={image:res.data.url}
                 this.props.dispatch(uploadImage(ee,(res)=>{
                  if(res.code==0){
                    userInfo.headImg=ee.image
                    // console.log(1)
                    // console.log(userInfo)
                    this.props.dispatch(updataUserInfo(userInfo))
                  }
               }))
                   
            } else {
                Toast.fail(res.message, 1);
            }
           

           
        }))


    } 
    

    render(){
      let {fale,img1} =this.state
      let {userInfo,params}=this.props
      let {idCardAuditStatus}=userInfo
      console.log(this.props)
      let text=''
      if(userInfo.idCardAuditStatus==0)
        text= '未认证'
      else if(userInfo.idCardAuditStatus==1)
        text= "待审核"
      else if(userInfo.idCardAuditStatus==2)
        text= "认证失败"
      else if(userInfo.idCardAuditStatus==100)
        text= "认证成功"
     return(

        <div className="box">
          <div className="boxx">
            <div className="fileBox">
              <input type="file"  className="file" onChange={this.upDateImage.bind(this)}/>
              <img src={img1}/>
              <span>头像</span>
              <Icon type={"right"} color='#999999'/>
            </div>

            <div className="two">
              <span className="span1">昵称</span>
              <span className="span2">{userInfo.nickName||''}</span>
            </div>

            <div className="two">
              <span className="span1">手机号</span>
              <span className="span2">{userInfo.phone}</span>
            </div>

            <div className="two" onClick={this.selectFale.bind(this)}>
              <span className="span1">性别</span>
              <span className="span2">{userInfo.gender==0?'男':'女'}</span>
              <Icon type={"right"} color='#999999'/>

            </div>
          </div>

          <div className="container" >
            <List renderHeader={() => '提现绑定设置'} className="gaibian" />
            <div className="boxx">
              <div className="two" onClick={()=>{ 
                if(userInfo.wechat)
                  this.context.router.push("/ToWeChat")
                else
                  this.context.router.push("/SubmitWeChat")
              }}>
                <span className="span1">微信号</span>
                <span className="span2">{userInfo.wechat||'未绑定'}</span>
                <Icon type={"right"} color='#999999'/>
              </div>
              <div className="two" onClick={()=>{
              if (userInfo.hasWithdrawPassword==true) 
                this.context.router.push('/password')
              else
                this.context.router.push('/Remember')
              
            }}>
                <span className="span1">提现密码</span>
                <span className="span2">{userInfo.hasWithdrawPassword==true?'未设置':'修改'}</span>
                <Icon type={"right"} color='#999999'/>
              </div>
            </div>
          </div>

          <div className="container-two">
            <List renderHeader={() => '身份认证'} className="gaibian" />
            <div className="boxx">
              <div className="two" onClick={()=>{this.context.router.push("/IdentityAuthentication")}}>
                <span className="span1">实名认证</span>
                
                <span className="span2">{text}</span>
                
               
                <Icon type={"right"} color='#999999'/>
                
              </div>
            </div>
            
          </div>


          <div className="bottom" onClick={this.exitSys.bind(this)}>退出</div>
          
          {
            this.state.showFale?<Tan data={SexData} onTouch={(obj)=>{this.changeFale(obj)}} onShowFale={(cancel)=>{this.changeShowFale(cancel)}}/>:null
          }
        </div>
        
      )
    }
}

function mapStateToProps(state){
  return{
    userInfo:state.userInfo
  }
  
}
export default connect (mapStateToProps)(Account)



