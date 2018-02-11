import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {List, InputItem, TextareaItem,Switch, Button, Toast, Picker} from 'antd-mobile';
import {saveAddress} from '../../actions/activity'
import AddrData from '../Address/address'
import {storage} from "../../utils/tools"
import NavBar from "../../components/NavBar";
import utils from '../../utils'
const Item = List.Item;
class EditAddress extends Component {
    static propTypes = {};
    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            contact: "",
            phone: "",
            detail: "",
            address: [],
            errorName: false,
            errorPhone: false,
            errorDetail: false,
            visible:false
        }
        this.onFocusType=''
    }
    componentWillMount() {
   

    }
    componentDidMount() {
        let { activityAddress} =this.props
        if(activityAddress.errorCode==0 && activityAddress.result.province!=''){
            let address = [].concat(activityAddress.result.province, activityAddress.result.city,activityAddress.result.area)
            this.setState({
                contact: activityAddress.result.contact,
                phone: activityAddress.result.phone,
                detail: activityAddress.result.detail,
                address: address,
            })
  
        }
     
    }
    componentWillUnmount(){
     
    }

    //保存 修改
    saveAddress=() =>{

        this.props.dispatch(saveAddress({
                token:storage.get("token"),
                contact: this.state.contact,
                phone: this.state.phone.replace(/\s/g, ''),
                detail:`${this.state.address[0]}@${this.state.address[1]}@${this.state.address[2]}@${this.state.detail}` ,
            }, (res) => {
                Toast.info(res.errorMsg, 1)
                if(res.errorCode==0){
                    setTimeout(()=>{    //为了解决 安卓部分手机，跳页后页面高度计算有问题（目的是让软键盘先自动关闭）
                        this.context.router.goBack()
                    },300)
                    
                }
               
            }))

    }

    onNameChange = (value) => {
        if (value && value.replace(/\s/g, '').length < 2) {
            this.setState({
                errorName: true,
                contact: value
            })
        } else {
            this.setState({
                errorName: false,
                contact: value
            })
        }
    }
    onPhoneChange = (value) => {

        if (value.replace(/\s/g, '').length < 11)  {
            this.setState({
                errorPhone: true,
                phone: value
            })
        } else {
            this.setState({
                errorPhone: false,
                phone: value
            })
        }
    }
    onDetailChange = (value) => {
        if (value.trim() == "") {
            this.setState({
                errorDetail: true,
                detail: value
            })
        } else {
            this.setState({
                errorDetail: false,
                detail: value
            })

        }
    }
    onSwitchChange = (check) => {
        this.setState({
            isDefault: check==true?1:0
        })
    }
    hasChildren(data){
        if(data.children){
            return true;
        }else{
            return  false;
        }
    }
    getChildren(data){
        data.map(item=>{
            item.label = item.value;
            if(this.hasChildren(item)){
                this.getChildren(item.children)
            }else{
                return false
            }
        })
        return data
    }
   

    render() {
        const disable_save = this.state.errorName || this.state.errorPhone || this.state.errorDetail || this.state.address == ""
        this.getChildren(AddrData)
        const district = AddrData
        return (
            <div className="eidt-address nav-content">
                 <NavBar title="收货地址" {...this.props} leftClick={()=>{
                    setTimeout(()=>{
                        this.context.router.goBack()
                    },300)
                 }}/>
                <div style={{height: document.documentElement.clientHeight-44*utils.multiple }}>
                    <List>
                        <InputItem
                            value={this.state.contact}
                            onChange={this.onNameChange}
                            clear
                            error={this.state.errorName}
                            placeholder="请输入收货人姓名"
                        >收货人:</InputItem>

                        <InputItem
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                            clear
                            error={this.state.errorPhone}
                            type="phone"
                            placeholder="请输入手机号码"
                        >联系电话:</InputItem>

                        <Picker extra="请选择"
                                data={district}
                                title="地区"
                                value={this.state.address}
                                onChange={v => this.setState({ address: v })}
                                onOk={(v) => this.setState({address: v})}
                        >
                            <Item arrow="horizontal">所在地区:</Item>
                        </Picker>

                        <TextareaItem
                            value={this.state.detail}
                            onChange={this.onDetailChange}
                            clear
                            autoHeight
                            title="详细地址:"
                            error={this.state.errorDetail}
                            placeholder="请输入街道、楼牌号等"
                        />
                       
                    </List>
                    <div style={{marginBottom:'100px'}}></div>
                    <div className="save-btn" >
                        <Button className="btn" disabled={disable_save}
                                onClick={this.saveAddress}>保存</Button>
                    </div>
                </div>
                
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
       activityAddress:state.activityAddress
    }
}

export default connect(mapStateToProps)(EditAddress)
