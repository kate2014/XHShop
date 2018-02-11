import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Button} from 'antd-mobile';
import {Link} from "react-router";
import Text from "../Text";
import CommodityPrice from '../CommodityPrice';
import Img from '../Img'
import utils from '../../utils'
import './index.less'
export class CommissionProduct extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let {item, type} = this.props
        if(!item.order1s) return null
        return (
            <div className="shop-cart-item">
                <div className="shp-cart-item-core no-check">
                    <Link to={`/product?id=${item.order1s[0].productId}`}
                          className="cart-product-cell-1">
                        <Img src={item.order1s[0].thumbImg}/>
                    </Link>
                    <div className="cart-product-cell-2">
                        <div className="cart-product-name">
                            <Link to={`/product?id=${item.order1s[0].productId}`}>
                                <span
                                    className="non-fresh-txt">{item.order1s[0].name}</span>
                            </Link>
                        </div>
                        <div className="cart-product-cell-3">
                        {
                            item.orderStatus==3 || item.orderStatus==4? 
                            <span className="commission-status ">
                               已付款
                            </span>:null
                        }
                        {
                            item.orderStatus==5? 
                            <span className="commission-status ">
                               已收货
                            </span>:null
                        }
                        {
                            item.orderStatus==100? 
                            <span className="commission-status green">
                               已结算
                            </span>:null
                        }
                        {
                            item.orderStatus==8 || item.orderStatus==7? 
                            <span className="commission-status gray">
                               已失效
                            </span>:null
                        }
                        {
                            item.orderStatus==6? 
                            <span className="commission-status gray">
                               冻结中
                            </span>:null
                        }
                           
                        </div>
                    </div>
                </div>
                <div className="shp-commission-bottom">
                    <div className="d1">
                        <div className="d1-s">
                            <span className="title">付款金额</span>
                            <span className="price">￥<span className="unit">{item.totalMoney||0}</span></span>
                        </div>
                        <div className="d1-s">
                            <span className="title">成交预估收入</span>
                            <span className="price">￥<span className="unit">{item.shareOrderMoney||0}</span></span>
                        </div>
                        <div className="d1-s">
                            <span className="title">提成</span>
                            <span className="price"><span className="unit">{item.order1s[0].productSharePercentage}</span>%</span>
                        </div>
                    </div>
                    <div className="d2">
                        <div className="d2-s">{item.createDt} 创建</div>
                        {
                            item.orderStatus==5?<div className="d2-s">{item.receiveDt} 收货</div>:null
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}