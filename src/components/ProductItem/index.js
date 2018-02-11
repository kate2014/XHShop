import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Stepper, Button} from 'antd-mobile';
import {Link} from "react-router";
import Text from "../Text";
import CommodityPrice from '../CommodityPrice';
import Img from '../Img'
import utils from '../../utils'

import './index.less'

//一行显示多个商品
export default class ProductItem extends Component {
    static propTypes = {
        thumbImg: PropTypes.string,
        imProductId: PropTypes.string,
        productType: PropTypes.number, //类型 0 v币 1 人民币
        retailPrice: PropTypes.number, //人民币
        exchangeIntegral: PropTypes.number, //v币
        name: PropTypes.string,
        textRow: PropTypes.number//文字显示行数

    };
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    static defaultProps = {
        categoryType: 1,
        product: [],
        textRow: 1
    };

    constructor(props) {
        super(props);
        this.state = {}

    }

    clickTab = () => {
        const {imProductId} = this.props;
        if (this.props.clickTab instanceof Function) {
            this.props.clickTab(imProductId)
        }
    }

    render() {
        let {thumbImg, imProductId, productType, retailPrice, exchangeIntegral, name, textRow, height,marketPrice,makerPrice_hide,style,stockNum} = this.props;
        let _style = {}
        if (height > 0)
            _style = {height: height + 'px'}
        _style={...style,..._style}
        return (
            <div className="product-item" onClick={this.clickTab}>
                <div className="innerContent">
                    <div className="image" style={{'position':'relative'}}>
                        <Img src={thumbImg} style={_style}/>
                        {
                           stockNum>0? null:<img src={require('../../assets/images/over.png')} 
                           style={{'position':'absolute','top':'0','left':'0','width':'100%','height':'100%'}}/> 
                        }
                      
                    </div>
                    <div style={{ 'marginLeft':8*utils.multiple+'px','marginRright':8*utils.multiple+'px'}}>
                        <Text text={name} row={textRow} size="md"/>
                    </div>
                    {
                        productType == 0 ? (
                            <div className="money-footer">
                                <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                    <use xlinkHref="#icon-v"></use>
                                </svg>
                                <span className="money">{exchangeIntegral}</span>
                            </div>
                        ) : (
                         <div className="money-line">
                            <div className="money-footer">
                                <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                    <use xlinkHref="#icon-qian1"></use>
                                </svg>
                                <span className="money">{retailPrice}</span>
                            </div>
                            {
                                makerPrice_hide?'':
                                <div className="marke-price">
                                    ￥{marketPrice}
                                </div>
                            }

                        </div>
                        )

                    }
                </div>
            </div>
        )
    }
}





//横向显示商品，一行显示一个商品
export class Product extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {


    }
    onChange = (val) => {
        let {item} = this.props
        this.props.onChange(item.data.id, val)

    }
    clickProduct = () => {
        this.props.clickProduct()
    }
    clickOrder = () => {
        this.props.clickOrder()
    }

    deleteCollect(id) {
        if (this.props.deleteCollect instanceof Function) {
            this.props.deleteCollect(id)
        }


    }
    clickShare(item) {
        if (this.props.clickShare instanceof Function) {
            this.props.clickShare(item)
        }


    }

    render() {
        let {item, val, showType} = this.props
        //showType =0:显示数量加减组件，1：显示当前数量，2：去评价
        return (
            <div className="shop-cart-item">
                <div className="shp-cart-item-core no-check">
                    <Link to={`/product?id=${item.productId ||item.imProductId}`}
                          className="cart-product-cell-1">
                        <Img src={item.thumbImg}/>
                    </Link>
                    <div className="cart-product-cell-2">
                        <div className="cart-product-name">
                            <Link to={`/product?id=${item.productId ||item.imProductId}`}>
                                <span
                                    className="non-fresh-txt">{item.name}</span>
                            </Link>
                        </div>
                        <div className="cart-product-prop">
                            {item.specDetail || ''}
                        </div>
                        <div className="cart-product-cell-3">
                            {
                                showType ==3 || showType ==4?
                                <span className="shp-cart-item-price ">
                                    {
                                        item.productType == 0 ? (
                                            <div className="money-footer">
                                                <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                                    <use xlinkHref="#icon-v"></use>
                                                </svg>
                                                <span className="money">{item.exchangeIntegral}</span>
                                            </div>
                                        ) : (
                                            <div className="money-footer">
                                                <svg className="icon" aria-hidden="true" style={{width:15*utils.multiple,height:15*utils.multiple,fill:'#F74461'}}>
                                                    <use xlinkHref="#icon-qian1"></use>
                                                </svg>
                                                <span className="money">{item.retailPrice}</span>
                                            </div>
                                        )

                                    }
                                </span>
                                :
                                <span className="shp-cart-item-price ">
                                {
                                        item.price > 0 && item.integral == 0 ? (
                                            <div className="prod-price">
                                            <CommodityPrice
                                                price={new Number(item.price).toFixed(2)}
                                                unit=""
                                                iconStyle="base-icon"
                                                priceStyle="base-price"/>
                                        </div>) : (
                                        <div className="prod-price">
                                            <CommodityPrice
                                                price={item.integral}
                                                unit="V币"
                                                icon="icon-vbi"
                                                iconStyle="base-icon"
                                                priceStyle="base-price"
                                            />
                                        </div>)
                                }
                                </span>
                                }
                            <div className="quantity-wrapper">
                                {
                                    showType == 0 ?
                                        <Stepper
                                            style={{width: '100%', minWidth: '2rem'}}
                                            showNumber
                                            max={item.stockNum}
                                            min={1}
                                            value={val || item.amount}
                                            onChange={this.onChange}

                                        /> : null
                                }
                                {
                                    showType == 1 ? <span>x {item.amount || item.purchaseQuantity}</span> : null
                                }
                                {
                                    showType == 2 ?
                                        (
                                            item.isEvaluate == 1 ?
                                                <Button inline size="small"
                                                        onClick={this.clickProduct}>
                                                    查看
                                                </Button>
                                                :
                                                <Button inline size="small" className="yellow-btn"
                                                        onClick={this.clickOrder}>
                                                    去评论
                                                </Button>
                                        ) : null

                                }
                                {
                                    showType == 3 ?
                                        <Button inline size="small"
                                                onClick={this.deleteCollect.bind(this, item.imProductId)}>
                                            移除收藏
                                        </Button> : null

                                }
                                {
                                    showType == 4 ?
                                        <div onClick={this.clickShare.bind(this, item)} className="share-btn">最高返￥{new Number(item.productCommission).toFixed(2)} <img src={require('../../assets/images/share-btn2.png')}/></div> : null

                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

