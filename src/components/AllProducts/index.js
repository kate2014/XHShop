import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {List,Flex,Icon} from 'antd-mobile';
import Text from '../Text'
import Img from '../../components/Img'
const Item = List.Item;
const num =window.window.screen.width>320?3:2
export class AllProducts extends Component{
    constructor(props) {
        super(props);

    }
    render(){
        let {data,itemClick} =this.props
        let products=data.order1s||data.items
        return(
             <div className="content-shop">
                        <Item onClick={itemClick.bind(this,data.orderId)}>
                            <div className="mc">
                                <Link>
                                    <div className="imc-con">
                                        {
                                            products.length == 1 ? (
                                                <Flex className="imc-one">
                                                    <Item className="imco-l">
                                                        <div className="imco-l-img-box">
                                                            <div className="imco-l-img">
                                                                <Img src={products[0].thumbImg}/>
                                                            </div>
                                                        </div>
                                                    </Item>
                                                    <Item className="imco-r-content">
                                                        <Text size="md" row={2} text={products[0].name}/>
                                                    </Item>
                                                </Flex>
                                            ) : (
                                                <div className="c-type-wrap">
                                                    <ul className="step-tab">
                                                        {
                                                            products.filter((item,id)=>id<num).map((item, id) => (
                                                                <li key={id}>
                                                                    <div className="liimg">
                                                                        <img src={item.thumbImg}/>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }

                                                    </ul>
                                                    {
                                                       products.length>num?
                                                       <div className="count">
                                                        <span>共{products.length}件</span>
                                                        <Icon type="right" size="md" color='#999'/>
                                                       </div> :null
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </Link>
                            </div>
                        </Item>
                    </div>
        )
    }

}
