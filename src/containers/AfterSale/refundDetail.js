//退单详情
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { List, Toast, WhiteSpace,Flex,WingBlank,Modal} from 'antd-mobile';
import {changeNavbarTitle} from '../../actions/home'
import {Product} from '../../components/Order'
import { SingleImgView } from '../../components/ImageView'
import {getRefundDetail,refundCancel,emptyOrder,emptyOrderDetails} from '../../actions/orderDetails'
const Item = List.Item;
const alert = Modal.alert;

class RefundDetails extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("退单详情"))
    }
    componentDidMount() {
        let {id} =this.props.location.query
        this.refundId=id
        this.props.dispatch(getRefundDetail({refundId:id}))
    }

    componentDidUpdate(prevProps, prevState) {

    }


    imageShwe(id,list){
        SingleImgView.show({
          imagelist:list,
          disableRotate:true,
          current:id,
          maxScale:4,
          close: ()=>{SingleImgView.hide()},
        })
    }
    //修改申请
    editRefund(){
        this.context.router.push(`/afterSale/updateApply?refundId=${this.refundId}`)
    }


    render() {
        let { refundDetail} =this.props
        if(refundDetail.code!=0 ) return <div style={{padding: '10px 0px 60px 0px', textAlign: 'center'}}>加载中...</div>

        return (
            <div className="order-details afterSale-content" style={{height: document.documentElement.clientHeight}}>
                    <div className="list-0">
                        <p className="line">
                            <span></span><span></span><span></span>
                        </p>
                        <p className="p1">{refundDetail.data.refundStatusText}</p>
                       {/* <p className="p2">{refundDetail.data.refundTips}</p>*/}
                    </div>
                    {this.renderStatus1(refundDetail.data)}

                    {
                        refundDetail.data.showSellerWhsInfoFlag?
                        this.renderStatus2(refundDetail.data):null
                    }
                    {
                        this.renderStatus3(refundDetail.data)
                    }
                    {
                        refundDetail.data.changeGoodsWaybill?this.renderStatus4(refundDetail.data):null
                    }
                    {
                        refundDetail.data.refundStatus==2?
                        <div className="goBack-btn" onClick={()=>{this.context.router.push(`/afterSale/backFillInfo?refundId=${this.refundId}&refundReasonId=${refundDetail.data.refundReasonId}`)}}>去填写退货信息</div>
                        :null
                    }
                    <WhiteSpace/>
                    <List className="list-2">
                        <Item  extra={refundDetail.data.refundTypeText} className="item-refund-status">
                           退款信息
                        </Item>
                    </List>
                    <div className="step3">
                    {
                        refundDetail.data.items.map((item, i) => {
                            return (
                                <div key={i} className="order-product-content">
                                   <Product key={0} showStepper={0}  item={Object.assign(item,
                                        {amount:item.quantity,exchangeIntegral:item.integral,retailPrice:item.price,productType:item.price>0,imProductId:item.productId}
                                        )}
                                 />
                                </div>
                            )

                        })
                    }
                    </div>

                 {this.renderPart(refundDetail.data)}
            </div>
        )
    }

    renderStatus1(data){
        return(
            <div className="list-refund">
               {/* <List className="list-refund-status">
                    <Item>
                        <div>您已成功提交退单申请，请耐心等待商城处理</div>
                    </Item>
                </List>*/}
                <ul className="ul-tip">
                    <li>商城同意后，请按照给出的退货地址退货，并请记录退货运单号</li>
                    <li>如商城拒绝，您可以修改申请后再次发起，商城会重新处理</li>
                    {/*<li>如商城超时未处理，退货申请将达成，请按系统给出的退货地址退货</li>*/}
                </ul>
                <div className="refund-btn-group">
                    <span className="btn" onClick={()=>{window.location.href='https://eco-api.meiqia.com/dist/standalone.html?eid=8444'}}>联系客服</span>

                    {
                        data.refundStatus==0 || data.refundStatus==8? <span className="btn" onClick={this.editRefund.bind(this)} >修改申请</span>:null
                    }
                    {
                        data.refundStatus==0 || data.refundStatus==1 || data.refundStatus==2 || data.refundStatus==8?<span className="btn ghost"
                        onClick={() => alert('提示', '小主，你确定要撤销申请？', [
                          { text: '取消', onPress: () => console.log('cancel') },
                          { text: '确定', onPress: () => {
                            this.props.dispatch(refundCancel({refundId:this.refundId},(res)=>{
                            if(res.code==0)
                            {
                                this.props.dispatch(emptyOrder())
                                this.props.dispatch(emptyOrderDetails())
                                Toast.success(res.message, 1);
                                this.context.router.replace('/myInfo')
                            }
                            else
                                Toast.fail(res.message, 1);
                            }))
                        }},
                        ])}
                         >撤销申请</span>:null
                    }

                </div>

            </div>
        )
    }
    renderStatus2(data){
        return(
            <div className="list-refund">
               {/* {
                    data.refundTips ?
                    <List className="list-refund-status">
                        <Item>
                            <div>{data.refundTips}</div>
                        </Item>
                    </List>:null
                }*/}
                <WhiteSpace />
                <WingBlank size="lg">
                <div className="refund-address">
                    <div className="p1">退货地址</div>
                    <div className="p2">
                        <span className="name">{data.refundSellerName}</span><span className="phone">{data.refundSellerPhone}</span>
                    </div>
                    <div className="p3">
                        {data.refundSellerAddress}
                    </div>
                </div>
                </WingBlank>
                <WhiteSpace size="lg"/>
            </div>
        )
    }
    renderStatus3(data){
        return(
            <section>
                <WhiteSpace/>
                {
                    !data.refundGoodsWaybill?'':
                    <List className="list-refund-status list-bill">
                        <Item extra={`${data.refundGoodsDeliverName}  ${data.refundGoodsWaybill}`}>
                            寄回物流信息:
                        </Item>
                    </List>
                }

                {
                    data.refundMoney>0?
                    <List className="list-refund-status">
                        <Item extra={`￥${data.refundMoney}`}>
                            退单金额:
                        </Item>
                    </List>:null
                }
                {
                    data.refundReasonId !=12 && data.refundGoodsWaybill?
                    <div>
                        <List className="list-refund-status list-bill">
                            <Item extra={`${data.refundFreight ||0}`}>
                                寄回运费金额:
                            </Item>
                        </List>
                        <List className="list-refund-status list-bill">
                            <Item extra={`${data.refundToAccountType == 1?'支付宝':'银行卡'}`}>
                                退款支付方式:
                            </Item>
                        </List>
                        {
                            data.refundToAccountType ==1?
                            <div>
                                <List className="list-refund-status list-bill">
                                    <Item extra={`${data.refundAlipayAccount||''}`}>
                                        支付宝账号:
                                    </Item>
                                </List>
                                <List className="list-refund-status list-bill" style={{'borderTop':'1px solid #ddd'}}>
                                    <Item extra={`${data.refundAlipayAccountRealName||''}`}>
                                        支付宝姓名:
                                    </Item>
                                </List>
                            </div>
                            :
                             <div>
                                <List className="list-refund-status list-bill">
                                    <Item extra={`${data.refundBankAccount||''}`}>
                                        银行卡账号:
                                    </Item>
                                </List>
                                <List className="list-refund-status list-bill">
                                    <Item extra={`${data.refundAlipayAccountRealName||''}`}>
                                        银行卡账户名:
                                    </Item>
                                </List>
                                <List className="list-refund-status list-bill" style={{'borderTop':'1px solid #ddd'}}>
                                    <Item extra={`${data.refundBankBranchFullName||''}`}>
                                        银行支行全称:
                                    </Item>
                                </List>
                            </div>
                        }
                        <Item>
                            <div>寄回物流凭证:
                            <Flex className="image-ul" style={{"marginBottom":'0'}}>
                                {
                                    data.buyerDeliveryVoucherImages.map((item,id)=>(
                                        <img key={id} src={item} className="image-li" onClick={this.imageShwe.bind(this,id,data.buyerDeliveryVoucherImages)}/>
                                    ))
                                }
                            </Flex>
                            </div>
                        </Item>
                    </div>
                    :null

                }

                <List className="list-refund-status">
                    <Item arrow="horizontal" onClick={()=>{this.context.router.push(`/afterSale/histroy?refundId=${this.refundId}`)}}>
                        协商历史
                    </Item>
                </List>
            </section>
        )
    }
    renderStatus4(data){
        return(
            <section>
                <WhiteSpace/>
                <List className="list-refund-status">
                    <Item extra={`${data.changeGoodsWaybill}`}>
                        换货运单号:
                    </Item>
                </List>
                <List className="list-refund-status">
                    <Item extra={`${data.changeGoodsDeliverName}`}>
                        换货货运公司:
                    </Item>
                </List>
                <List className="list-refund-status">
                    <Item extra={`${data.changeGoodsFinishFlag?'换货完成':'换货中'}`}>
                        换货状态:
                    </Item>
                </List>
            </section>
            )
    }



    renderPart(data) {
        let num = 0
        num = data.items.reduce((init,next)=>{
          num = +(num+next.quantity)
          return num
        },num)
        return (
            <List className="list-5">
                <Item>
                    <div>退单原因:<span className="i_t">{data.refundReason}</span></div>
                </Item>
                {
                    data.refundIntegral>0?
                    <Item>
                        <div>V币数量:<span className="i_t">{data.refundIntegral} v币</span></div>
                    </Item>:null
                }

                <Item>
                    <div>申请件数:<span className="i_t">{num}</span></div>
                </Item>
                <Item>
                    <div>退单编号:<span className="i_t">{data.refundCode}</span></div>
                </Item>
                <Item className="item-remark">
                    <div>退单说明:<span className="i_t">{data.refundRemark}</span></div>
                </Item>
                <Item>
                    <div>图片凭证:
                    <Flex className="image-ul">
                        {
                            data.voucherImages.map((item,id)=>(
                                <img key={id} src={item} className="image-li" onClick={this.imageShwe.bind(this,id,data.voucherImages)}/>
                            ))
                        }
                    </Flex>
                    </div>
                </Item>

            </List>
        )
    }


}


function mapStateToProps(state) {
    return {
        refundDetail:state.refundDetail
    }
}

export default connect(mapStateToProps)(RefundDetails)
