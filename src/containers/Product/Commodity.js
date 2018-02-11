import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Carousel, Icon, List, Toast, Modal, Flex, WhiteSpace} from 'antd-mobile';
import {
    getProductDetails,
    addTempProduct,
    updateTempProduct,
    getProductCoupons,
    emptyProduct,
    getEvaluation,
    changeProductCoupon,
    addBuyProduct
} from "../../actions/product";
import {immemberCollect, deleteCollection} from '../../actions/collection'
import {storage} from "../../utils/tools";
import CouponTem from "../../components/CouponTem";
import ProductProperties from '../../components/ProductProperties';
import {addUserCoupon} from "../../actions/coupon"
import Assess from "../../components/Assess"
import Text from '../../components/Text'
import Cart from '../../components/Cart';
import Img from '../../components/Img';
import utils from '../../utils'
import {wechatJssdk} from '../../actions/orderDetails'

//ps:用于历史数据的问题，判断是否登录，不能通过token来判断，需要判断userInfo.memberId(新增字段)，用于分享时记录分享人
const Item = List.Item;
class Commodity extends Component {
    static propTypes = {
        id: PropTypes.string
    };

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            chengeName: "",
            initialHeight: 375,
            changeSkuData: {
                skuId: ""
            },
            modal: false,  //优惠券弹框
            modal_productProperties: false ,//商品规格弹框
            modal_share:false,//分享弹框
  
        }
        this.isFirst=true
        this.isShare= props.token!=undefined ?true:false //是否分享出来的页面
        this.receiveCounp = this._receiveCounp.bind(this);
        this.showModal = this._showModal.bind(this);
        this.onClose = this._onClose.bind(this);


    }
    componentWillMount(){  
        //不是分享进来的
       /* if(!storage.get("token") && !this.isShare ){
            this.context.router.push(`/Login`)
            return
        }*/
        let href=window.location.href
        //分享进来的页面，微信分享会自带from=singlemessage 或 timeline。会影响二次分享，所以需要重定向
        if(this.isShare && ((href.indexOf('singlemessage')>-1 ) || href.indexOf('timeline')>-1 || href.indexOf('groupmessage')>-1 )){
            window.location.href=`${location.origin}${location.pathname}#/product?id=${this.props.id}&token=${this.props.token}`
            return
        }



        //用户登录了
        if(storage.get("userInfo")){
            if(storage.get("userInfo").memberId){
                //显示分享
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
                        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
                    }
                }else{
                    this.onBridgeReady();
                }
            }
           
            
        }

        
        
   

    }
     

    componentDidMount() {
        const params = {
            platform: 1,
            //openId: storage.get("openId")
        }

        this.props.dispatch(getProductDetails(this.props.id, params,(res)=>{
            if(storage.get('userInfo')){
                if(storage.get("userInfo").memberId){
                var data={
                    AppShareTitle:res.data.productBean.name,
                    AppShareImg:res.data.productBean.thumbImg || res.data.productBean.thumbImg1,
                    AppShareDes:'亲爱的，我在思埠V商城发现这件宝贝挺好的，赶紧进来看看吧。',
                    AppShareLink:`${location.origin}${location.pathname}#/product?id=${res.data.productBean.imProductId}&token=${storage.get('userInfo').memberId}`,
                    //不写location.href是防止分享后，地址不能预计的加入点什么东西

                }
                var url = encodeURIComponent(window.location.href.split('#')[0]);
                 //微信签名
                this.props.dispatch(wechatJssdk({
                    signUrl:url// `${window.location.href}`
                },(res)=>{
                    if(res.code == 0){
                        //utils.wx.wxConfig(res.data)
                        wx.config({
                            debug: false,
                            appId: res.data.appId,
                            timestamp: res.data.timestamp,
                            nonceStr: res.data.nonceStr,
                            signature: res.data.signature,
                            jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline','hideMenuItems']
                        });
                        utils.wx.FXhide2()
                        utils.wx.shareApp(data)
                      

                    }
                }))
             }   
            }
   
        }))
        //如果分享进来，且已经登陆 || 不是分享进来的
        if((this.isShare && storage.get("token")) || !this.isShare){
            this.props.dispatch(getProductCoupons(this.props.id));
        }
        
   
    }
    componentDidUpdate(){
        
    }
    //组件销毁时清空商品信息
    componentWillUnmount() {
         
        this.props.dispatch(emptyProduct())
        //隐藏分享
        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady_hide, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady_hide); 
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady_hide);
            }
        }else{
            this.onBridgeReady_hide();
        }
       
        
    }
    onBridgeReady(){
     WeixinJSBridge.call('showOptionMenu');
    }
    onBridgeReady_hide(){
     WeixinJSBridge.call('hideOptionMenu');
    }
    
    //分享
    share=() =>{
        if(!this.isLogin()){
            return 
        }
        const {productBean} = this.props.productDetails.data;
        let url = `${window.location.href}&token=${storage.get("userInfo").memberId}`
        if(window.vbDataContext) // android and ios app
        {
            window.vbDataContext.onWxShare(
                url,
                productBean.name,
                '亲爱的，我在思埠V商城发现这件宝贝挺好的，赶紧进来看看吧。',
                productBean.thumbImg||productBean.thumbImg1)
        }else{
            utils.showLayer(<img className="share-wx" src={require('../../assets/images/share-bg.png')}/>)
        }
       
    }
   
    isLogin(){
        if(!storage.get("token") && !this.isShare ){
            Toast.info('小主，你还没有登录',1)
            this.context.router.push(`/Login`)
            return false
        }
        //如果是分享进来，并且未登录的，先快速登录
        else if(storage.get("userInfo")){
            if(!storage.get("userInfo").memberId  && this.isShare){
                Toast.info('小主，你还没有登录',1)
                this.context.router.push(`/fastLogin`)
                return false
            }
        }else if(!storage.get("userInfo") && this.isShare) {
            Toast.info('小主，你还没有登录',1)
            this.context.router.push(`/fastLogin`)
            return false
        }
        return true
    }
    //领取优惠券
    onClickEvent = (data) => {
        this.props.dispatch(addUserCoupon({couponId: data.id, couponType: data.couponType}, (res) => {
            if (res.code == 0) {
                this.props.dispatch(changeProductCoupon(data))
                Toast.success(res.message, 1);

            } else {
                Toast.fail(res.message, 1);
            }
        }))

    }
   

    //领取优惠券
    _receiveCounp(e) {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modal: true,
        });

    }

    //商品收藏
    onCollection = (collection) => {
        let {productBean} =this.props.productDetails.data
        if (collection) {
            this.props.dispatch(deleteCollection({
                openId: storage.get("userInfo").memberId,
                productId: productBean.imProductId
            }, (res) => {
                Toast.success(res.message, 1);
            }))
        } else {
            this.props.dispatch(immemberCollect({
                openId: storage.get("userInfo").memberId,
                productId:productBean.imProductId
            }, (res) => {
                Toast.success(res.message, 1);
            }))
        }

    }
    //有sku时，加入购物车回调
    addToCart = (data) => {
        let {productBean} =this.props.productDetails.data
        Toast.success("添加购物车成功", 1);
        this.setState({
            modal_productProperties: false,
            chengeName: data.specDetail,
            changeSkuData: data
        })
        if (this.props.tempProduct.filter(item => item.imProductId ==productBean.imProductId && item.skuId == data.skuId).length > 0) {
            this.props.dispatch(updateTempProduct(
                {
                    id: productBean.imProductId,
                    check: true,
                    skuId: data.skuId,
                    specDetail: data.specDetail,
                    amount: data.amount + this.props.tempProduct.filter(item => item.imProductId ==productBean.imProductId && item.skuId == data.skuId)[0].amount

                }));
        } else {
            if (this.props.productDetails.code != -1)
                this.props.dispatch(addTempProduct(Object.assign({}, productBean, {
                    skuId: data.skuId,
                    specDetail: data.specDetail,
                    amount: data.amount,
                    retailPrice:data.retailPrice,
                    exchangeIntegral:data.exchangeIntegral

                })));
        }
    }

    //有sku时的回调 立即购买
    buyNow = (data) => {
        let {productBean} =this.props.productDetails.data
        let {token} =this.props
        let result={
            ...productBean,
            skuId: data.skuId,
            specDetail: data.specDetail,
            amount: data.amount,
            retailPrice:data.retailPrice,
            exchangeIntegral:data.exchangeIntegral,
            shareToken:token||''

        }
        this.props.dispatch(addBuyProduct(result));
        this.context.router.push(`/buyNow`)

    }

    //加入购物车
    addCartBar = () => {
        let {productBean,skus} =this.props.productDetails.data
        let spec = skus;
        let {tempProduct} = this.props
        if(!productBean.imProductId) return
        //有sku
        if (spec.length > 0) {
            this.setState({
                modal_productProperties: true
            })
        } else {
            tempProduct = tempProduct.filter(item => item.imProductId == productBean.imProductId)
            if (tempProduct.length > 0) {
                if (tempProduct[0].amount > tempProduct[0].stockNum) {
                    Toast.fail("库存不足", 1);
                    return
                }
                Toast.success("添加购物车成功", 1);
                this.props.dispatch(updateTempProduct(
                    {
                        id: productBean.imProductId,
                        check: true,
                        skuId: "",
                        amount: tempProduct[0].amount + 1
                    }));
            } else {
                if (productBean.stockNum == 0) {
                    Toast.fail("库存不足", 1);
                    return
                }
                Toast.success("添加购物车成功", 1);
                let data={
                    ...productBean,
                    amount: 1,
                    skuId: "",
                    check: true
                }
                this.props.dispatch(addTempProduct(data));
            }
        }

    }
    //立即购买
    buyShopBar = () => {
        if(storage.get("userInfo") && this.isShare ){
            if(!storage.get("userInfo").memberId){
                this.context.router.push('/fastLogin')
                return
            }
         
        }else if(!storage.get("userInfo") && this.isShare ){
            this.context.router.push('/fastLogin')
            return
        }
        let {productBean,skus} =this.props.productDetails.data
        let {token} =this.props
        if(!productBean.imProductId) return
       let spec = skus
       if (spec.length > 0) {
            this.setState({
                modal_productProperties: true
            })
       }
        else{
            if(productBean.stockNum == 0)
            {
                Toast.fail("库存不足", 1);
                return
            }
            let data={
                ...productBean,
                amount: 1,
                skuId: "",
                check: true,
                shareToken:token||''
            }
            this.props.dispatch(addBuyProduct(data));
            this.context.router.push(`/buyNow`)
        }


    }

    _showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    _onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    createMarkup() {
        const {productBean} = this.props.productDetails.data;
        return {__html: productBean.details};
    }
   
   
    render() {
        let {productBean,comments,skus,supplier} = this.props.productDetails.data;
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        let imgArray = [].concat(productBean.bannelImg1, productBean.bannelImg2, productBean.bannelImg3, productBean.bannelImg4, productBean.bannelImg5);
        for (let i = 0; i < imgArray.length; i++) {
            if (imgArray[i] == "" || imgArray[i] == null ||  typeof(imgArray[i]) == "undefined") {
                imgArray.splice(i, 1);
                i = i - 1;
            }
        }
        let spec = skus;
        let tempProduct = this.props.tempProduct.data || [];
        let number = 0;
        this.props.tempProduct.map((item) => {
            number += item.amount;
        })
        return (
            <div className="vb-commodity" style={{height: document.documentElement.clientHeight}}>
            {/*<div>
                <i className="icon iconfont icon-icon"></i>
             <i className="iconfont" style={{'fontSize':'80px'}}>&#xe721;</i>
              <i className="iconfont" style={{'fontSize':'80px'}}>&#xe65b;</i>
                <svg className="iconfont" aria-hidden="true">
                    <use xlinkHref="#icon-icon"></use>
                </svg>
            </div>*/}
            
                <Carousel
                    className="my-carousel-sild"
                    autoplay={true}
                    infinite={true}
                    selectedIndex={0}
                    swipeable={false}
                    animated={false}
                >
                    {imgArray.map((item, id) => (

                        <a href={item} key={id} style={hProp}>
                            <Img
                                src={item}
                                style={{width: "100%", height: "750px"}}
                                alt="icon"
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: null,
                                    });
                                }}
                            />
                        </a>
                    ))
                    }
                </Carousel>
                <div className='price-floor'>
                    <div className="prod-title">
                        <span className="title-text-wrap">
                            <Text text={productBean.name} size="lg" row={2}/>
                        </span>
                        {
                            productBean.shareStatus==1?
                            <span className="btn-share" onClick={this.share.bind(this)}>
                                <img src={require("../../assets/images/fenxiang.png")} />
                                <span>分享有奖</span>
                            </span>
                            :
                            <span className="btn-share" onClick={this.share.bind(this)}>
                                <img src={require("../../assets/images/share-btn.png")} />
                                <span>我要分享</span>
                            </span>
                        
                        }
                    </div>
                    <div style={{'color':'#F74461','paddingTop':'15px'}}>{supplier.freightRemark||''}</div>

                    <WhiteSpace size="sm"/>
                    <div className="prod-money">
                        {
                        productBean.productType == 0 ? (
                            <div className="money-footer">
                                <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                    <use xlinkHref="#icon-v"></use>
                                </svg>
                                <span className="money">{productBean.exchangeIntegral}</span>
                            </div>
                        ) : (
                            <div className="money-line">
                                <div className="money-footer">
                                    <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                        <use xlinkHref="#icon-qian1"></use>
                                    </svg>
                                    <span className="money">{new Number(productBean.retailPrice).toFixed(2)}</span>
                                </div>
                                <div className="marke-price">
                                    ￥{productBean.marketPrice}
                                </div>

                            </div>

                        )
                        }
                        <span className="stock">库存：{productBean.stockNum}</span>
                    </div>


                    {
                        productBean.productType == 0 ?<WhiteSpace size="md"/>:(
                            <div className="prod-act">
                                <Flex>
                                    <span className="inline_1">7天无理由退货</span>
                                    {/*<span className="inline">48小时快速退款</span>*/}
                                    <span className="inline_2">满99元免邮费</span>
                                </Flex>
                            </div>
                        )
                    }

                    {
                        this.props.productCoupons.data.length > 0 ?
                            <List className="my-list">
                                <Item arrow="down" onClick={this.receiveCounp}>优惠券</Item>
                            </List> : ''
                    }

                    {
                        spec.length > 0 ? (
                            <List className="my-list">
                                {
                                    this.state.chengeName == '' ?
                                        <Item arrow="down"
                                              onClick={this.showModal('modal_productProperties')}>选择产品规格</Item>
                                        :
                                        <Item arrow="down" onClick={this.showModal('modal_productProperties')}>
                                            <div className="selected-colortype">
                                                <div className="fourth-cells">
                                                    <span className="cell-tag-hd">已  选  </span>
                                                    <span className="cell-primary">{this.state.chengeName}</span>
                                                </div>
                                            </div>
                                        </Item>

                                }

                            </List>
                        ) : ''
                    }

                </div>
                <WhiteSpace size="md"/>
                {
                    comments.length > 0 ? (
                        <div className="goods-part">
                            <Flex justify="between" className="comment-title" onClick={() => {
                                this.context.router.push(`product/evaluation?id=${this.props.id}`)
                            }}>
                                <span>评价({this.props.productDetails.data.totalComment})</span>
                                <span>查看全部</span>
                            </Flex>

                            <Assess data={comments[0]}/>

                        </div>
                    ) : <div className="goods-part">
                        <Flex justify="between" className="comment-title" onClick={() => {
                            this.context.router.push(`product/evaluation?id=${this.props.id}`)
                        }}>
                            <span>评价(0)</span>
                        </Flex>

                        <div className="empty-data">暂无评价</div>

                    </div>
                }
                <WhiteSpace size="md"/>
                <div>
                    <List>
                        <Item>产品详情</Item>
                    </List>
                    <div className="details-style" dangerouslySetInnerHTML={this.createMarkup()}></div>
                </div>
                <Cart
                    text={number}
                    collection={false}
                    onCollection={this.onCollection}
                    disable={productBean.stockNum==0&&skus.length==0}
                    addCart={this.addCartBar}  //加入购物车
                    buyShop={this.buyShopBar}   //立即购买
                    linkto="/shopcart"
                    isShare={this.isShare}
                />
                {/*选择规格弹框*/}
                {  this.renderModal_properties()}

                {/*优惠券弹框*/}
                { this.renderModal_coupon()}

                
               
            </div>
        )
    }

   
   
    renderModal_properties() {
        let {productBean,skus} =this.props.productDetails.data
        return (
            <Modal
                popup
                visible={ this.state.modal_productProperties}
                maskClosable={true}
                animationType="slide-up"
               
            >
                <div>
                    <ProductProperties
                        addToCart={this.addToCart}
                        clickColose={this.onClose('modal_productProperties')}
                        buyNow={this.buyNow}
                        inintdata={this.state.changeSkuData}
                        data={Object.assign({}, productBean, {shopAttr: skus})}
                        isShare={this.isShare}
                    />
                </div>
            </Modal>
        )
    }

    renderModal_coupon() {
        let {productCoupons} = this.props
        let userCoupon = productCoupons.data.filter(item => item.hasGet == 0);
        let hasCoupon = productCoupons.data.filter(item => item.hasGet == 1);
     
        return (
            <Modal
                popup
                visible={this.state.modal}
                maskClosable={true}
                animationType="slide-up"
                 ref="modal"
            >
                <div className="vb-product-counp">
                    <div className="title">
                        <span>领优惠券</span>
                        <span className="colose" onClick={() => {
                            this.setState({modal: false})
                        }}><Icon type="cross"/></span>
                    </div>
                    <div className="pop-hight">
                        {
                            userCoupon.length > 0 ?
                                <div>
                                    <div className="linder-quan">可领优惠券</div>
                                    <div >
                                        {
                                            userCoupon.map((item, id) => (
                                                <CouponTem
                                                    key={id}
                                                    data={Object.assign({}, item, {status: 5})}
                                                    onClickEvent={this.onClickEvent}
                                                />
                                            ))
                                        }
                                    </div>
                                </div> : ""
                        }
                        {
                            hasCoupon.length > 0 ?
                                <div>
                                    <div className="linder-quan">可使用优惠券</div>
                                    <div >
                                        {
                                            hasCoupon.map((item, id) => (
                                                <CouponTem
                                                    key={id}
                                                    data={Object.assign({}, item, {status: 4})}

                                                />
                                            ))
                                        }
                                    </div>
                                </div> : ""
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
        productDetails: state.productDetails,
        productCoupons: state.productCoupons,
        tempProduct: state.tempProduct,
    }
}

export default connect(mapStateToProps)(Commodity)
