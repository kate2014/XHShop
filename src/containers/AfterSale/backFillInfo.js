/*选择退货商品*/
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {changeNavbarTitle} from '../../actions/home'
import {uploadImg} from '../../actions/evaluation'
import {Toast,InputItem,List,WhiteSpace,WingBlank,ImagePicker,Modal,Icon,Picker,TextareaItem } from 'antd-mobile';
import {getDeliveryInit,updateRefundDelivery} from '../../actions/orderDetails'
import utils from '../../utils'


const zhifuType=[
    {
        label:'支付宝',
        value:1
    },
    {
        label:'银行卡',
        value:2
    }
]
class BackFillInfo extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            files: [],
            asyncValue:[],
            deliverName:'',
            pickerValue: [],

        }
        this.imgdata = [];
        this.uploadImgs=0


    }
    componentWillMount() {


    }
    componentDidMount(){
        if(this.props.deliveryInit.length <=0)
        {
            this.props.dispatch(getDeliveryInit(),(res)=>{

            })
        }


    }


    onImageClick = (index, fs) => {

    }
    changeInput(type,value){
        this.setState({
            [type]:value
        })
    }
    onChangeImg = (files, type, index) => {
        this.setState({
            files,
        });
        if(type ==='add'){
            this.uploadImgs++;
        }  
        else if (type === "remove") {
            this.imgdata.splice(index, 1)
            return;
        }
        this.props.dispatch(uploadImg({
            attachs: files[files.length - 1].file
        }, (res) => {
            if (res.code == 0) {
                this.imgdata = [...this.imgdata, res.data.url]
                
            } else {
                Toast.fail(res.message, 1);
            }
            this.uploadImgs--
        }))


    }


    submit(){
        let {asyncValue,code,detail,deliverName,pickerValue,refundFreight,AliPayAccount,AliPayName,bankAccount,bankAccountRealName,bankBranchFullName}=this.state
        let {refundReasonId} =this.props.location.query
        if(asyncValue.length<=0){
            Toast.fail('请选择货运方式',1)
            return
        }
        if(!code){
            Toast.fail('请填写货运单号',1)
            return
        }
        if(asyncValue[0] ==100 && !deliverName){
            Toast.fail('请填写货运方式',1)
            return
        }
        //refundReasonId == 12 ，其他无理由退款，不需要填写退回方式
        if(refundReasonId != 12){
            if(pickerValue.length<=0){
                Toast.fail('请选择退款客户收款账号类型',1)
                return
            }
            if(pickerValue[0] ==1){
                if(!AliPayAccount){
                    Toast.fail('请输入支付宝账号',1)
                    return  
                }
                if(!AliPayName){
                    Toast.fail('请输入支付宝名称',1)
                    return  
                }
            }
            if(pickerValue[0] ==2){
                if(!bankAccount){
                    Toast.fail('请输入银行卡账号',1)
                    return  
                }
                if(!bankAccountRealName){
                    Toast.fail('请输入银行账户名',1)
                    return  
                }
                if(!bankBranchFullName){
                    Toast.fail('请输入银行支行名称',1)
                    return  
                }
            }
        }
        if(this.uploadImgs >0){
            Toast.fail(`图片正在上传中，请稍后再重试`, 1);
            return
        }
        

        let json={
            deliverId:asyncValue[0],
            waybill:code,
            refundId:this.props.location.query.refundId,
            deliverName:deliverName,
            refundFreight:refundFreight||0,
            refundToAccountType:pickerValue[0],
            refundAlipayAccount:AliPayAccount,
            refundAlipayAccountRealName:AliPayName,
            refundBankAccount:bankAccount,
            refundBankAccountRealName:bankAccountRealName,
            refundBankBranchFullName:bankBranchFullName,
            uploadImages:this.imgdata

        }
        this.props.dispatch(updateRefundDelivery(json,(res)=>{
            if(res.code==0){
                Toast.success(res.message,1)
                this.context.router.replace('/afterSale/list')
            }else{
                Toast.fail(res.message,1)
            }
        }))
    }
     onPickerChange = (val) => {
         let deliverName =  this.props.deliveryInit.filter(item=>item.value === val[0])
        this.setState({
          asyncValue:val,
            deliverName:deliverName[0].label
        });

    }
    render(){
        let {asyncValue,pickerValue} =this.state
        //refundReasonId=12 七天无理由退货，不需要填写运费 和退回方式
        let {refundReasonId} =this.props.location.query

       return (
            <div className="afterSale-content"  style={{height: document.documentElement.clientHeight - 44*utils.multiple}}>
            <List className="apply-refund-type">
                <Picker
                  data={this.props.deliveryInit}
                  cols={1}
                  value={asyncValue}
                  onOk={this.onPickerChange}
                >
                  <List.Item arrow="horizontal" >货运公司</List.Item>
                </Picker>
                {
                    asyncValue[0]==100 ?
                    <InputItem placeholder="请填写货运方式" type="text" className="input-code" onChange={(v) => { this.changeInput('deliverName',v)}}>
                    货运方式
                    </InputItem>:null
                }

                <InputItem placeholder="填写您的退货物流单号" type="text" className="input-code" onChange={(v) => { this.changeInput('code',v)}}>
                货运单号
                </InputItem>
                {
                    refundReasonId ==12? null:
                    <InputItem placeholder="填写运费金额" type="money" className="input-code"  onChange={(v) => { this.changeInput('refundFreight',v)}}>
                    运费金额
                    </InputItem>

                }
               
                <WhiteSpace />
                <div className="uploadImg-content" style={{'borderBottom':'1px solid #ddd','marginLeft':10*utils.multiple+'px'}}>
                    <WingBlank size="md"><div className="title">上传图片凭证</div></WingBlank>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChangeImg}
                        onImageClick={this.onImageClick}
                        selectable={this.state.files.length < 3}
                    />
                </div>
               {
                 refundReasonId ==12 ?null:
                 <Picker data={zhifuType} cols={1}  className="forss"  
                    value={pickerValue}
                    onOk={v => this.setState({ pickerValue: v })}
                    extra="请选择"
                > 
                  <List.Item arrow="horizontal">退款支付方式</List.Item>
                </Picker>
               }
               
                
            </List>
            {
                pickerValue[0]==1?
                <List className="refund-chooseType">
                    <InputItem placeholder="填写您的支付宝账号" maxLength='64' type="text" className="input-alipay-account" onChange={(v) => { this.changeInput('AliPayAccount',v)}}>
                    支付宝账号
                    </InputItem>
                    <InputItem placeholder="填写您的支付宝名称" maxLength='16' type="text" className="input-alipay-name" onChange={(v) => { this.changeInput('AliPayName',v)}}>
                    支付宝名称
                    </InputItem>
                </List>
                :
                pickerValue[0]==2?
                <List className="refund-chooseType">
                    <InputItem placeholder="填写您的银行卡账号" maxLength='64' type="bankCard" className="input-bank-account" onChange={(v) => { this.changeInput('bankAccount',v)}}>
                    银行卡账号
                    </InputItem>
                    <InputItem placeholder="填写您的银行卡的姓名" maxLength='16' type="text" className="input-bank-name"  onChange={(v) => { this.changeInput('bankAccountRealName',v)}}>
                    银行卡的姓名
                    </InputItem>
                    <InputItem placeholder="填写支行全称"  maxLength='64' type="text" className="input-bank-branch-name"  onChange={(v) => { this.changeInput('bankBranchFullName',v)}}>
                    支行全称
                    </InputItem>
                </List>:null
            }
            

            

            <div className="cart-fixed">
                <div className="big-btn" onClick={()=>{this.submit()}}>提交</div>
            </div>

         </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        deliveryInit:state.deliveryInit
    }
}

export default connect(mapStateToProps)(BackFillInfo)
