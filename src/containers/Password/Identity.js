import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {changeNavbarTitle} from '../../actions/home'
import {List, Button, InputItem, WhiteSpace, Toast} from 'antd-mobile';
import './index.less'
import {updateIdentity,updataUserInfo} from '../../actions/user'
import {getUserInfo} from '../../actions/user'
import {connect} from "react-redux";
import {uploadImg} from '../../actions/evaluation';
import { Icon, Grid } from 'antd-mobile';


const list = 'cross';
const img=[require('../../assets/images/menid-up.png'),require('../../assets/images/menid-down.png')]
class Identity extends Component{
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);  
        this.state = {
           showFale1:false,
           showFale0:false,
           showFale:'',
           icon:'cross',
           nameStatus:false,
           idStatus:false,
           noIdCard:'',
        }
    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("实名认证"))
    }

    componentWillUpdate(){
        // console.log(8)
    }
    componentDidMount(){
       
        
    }

    componentWillReceiveProps(nextProps){
       
    }
    // removeContent(index) {
    //     if (this.state.number.length <= 1) {
    //         return;
    //     }
    //     this.state.number.splice(index, 1);
    //     this.setState({
    //         number: this.state.number
    //     })
    // }

        //点击删除
    deleteType() {
        let index = this.props.index;
        this.props.callbackParent(index);
    }
        
    upDateImage =(i,e) =>{
        // console.log(i)
        var file = e.target.files[0]
        if(!file) return
        var imgSize = file.size;
        e.target.value= '' 
        let data={
            attachs:file
        }
         this.props.dispatch(uploadImg(data,(res) => {
            // console.log(file)
            if (res.code == 0) {

                if(i===1)
                    this.setState({
                        img0:res.data.url,
                        showFale0:true
                    })
                else  
                    this.setState({
                        img1:res.data.url,
                        showFale1:true
                    })
                   
            } else {
                Toast.fail(res.message, 1);
            }

           
        }))
    } 


    onChangeText(type,e){
        if(e){
            if(type == 'userName'){
                this.setState({
                    
                    nameStatus:true
                })
            }else if(type == 'idCard'){
                if(e.length == 18){
                    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

                    if(reg.test(e) === false){
                        this.setState({
                            // noIdCard:'请填写正确的身份证号码'
                        })
                    }else if(reg.test(e) === true){
                        this.setState({
                            // noIdCard:'身份证号码正确',
                            idStatus:true
                        })  
                    }
                }else{
                    this.setState({
                        idStatus:false
                    })
                }
 
            }
        }
        this.setState({
            [type]:e
        }) 
    }


    submit(){

      
      if(!this.state.nameStatus){
            Toast.info('请填写姓名')
      }
      else if(!this.state.idStatus){
            Toast.info('请填写身份证号码')

      }
      else if(!this.state.showFale0){
            Toast.info('请上传正面照')
      }else if(!this.state.showFale1){
            Toast.info('请上传反面照')
      }else{
            let {userInfo} = this.props
            let {userName,idCard,img0,img1}=this.state
            
            let obj={idCard,trueName:userName,idCardImgFront:img0,idCardImgBack:img1}


            this.props.dispatch(updateIdentity(obj,(res)=>{
                if(res.code==0){
                  this.context.router.replace('/account')
                }else{
                    Toast.info(res.message)
                }
            
            }))
      }
    }
    

    closeImg(i){
        this.setState({
            [`img${i}`]:'',
            [`showFale${i}`]:false
            
        })
    }

    render(){
        let {img0,img1,icon,userName,idCard,noIdCard} =this.state
        let {userInfo}=this.props;
        // console.log(userInfo)
     return(
            <div className="identity">
                <div className="one">
                    <InputItem value={userName} onChange={this.onChangeText.bind(this,'userName')}  >
                        姓名
                    </InputItem>
                </div>
                <div className="one">
                    <InputItem value={idCard} onChange={this.onChangeText.bind(this,'idCard')} >
                      身份证
                    </InputItem>
                </div>
                <div style={{color:'#ccc'}}>
                    {noIdCard}
                </div>



                <div className="box">
                    <div className="fileBox">
                        <input type="file"  className="file" onChange={this.upDateImage.bind(this,1)}/>
                        <img src={img0 || img[0]}/>
                        {this.state.showFale0?<Icon className='Icon' type= {icon} onClick={this.closeImg.bind(this,0)}/>:null}
                    </div>

                    <div className="fileBox">
                         <input type="file" className="file" onChange={this.upDateImage.bind(this,2)}/>
                         <img src={img1 || img[1]}/>
                         {this.state.showFale1?<Icon className='Icon' type= {icon} onClick={this.closeImg.bind(this,1)} />:null}
                    </div>
                   
                </div>
                <div className="button" onClick={this.submit.bind(this)}>
                    <p>提交</p>
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

export default connect(mapStateToProps)(Identity)