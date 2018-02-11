import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import './index.less'
import {NavBar,Icon} from 'antd-mobile';

class VbNavBar extends Component {
    static propTypes = {
        title: PropTypes.string,
        rightContent: PropTypes.array,
    };
    static contextTypes = {
        router: PropTypes.object.isRequired
    };
    static defaultProps = {
        title: "",
        rightContent: []
    };

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let {title,isShowLeftContent,leftClick} = this.props;
        isShowLeftContent=isShowLeftContent==undefined?true:isShowLeftContent
        const {pathname} = this.props.location;
        return (
            <div className="vb-nav-bar">
                <NavBar
                    icon={ isShowLeftContent?<Icon type="left" />:''}
                    leftContent={isShowLeftContent?"返回":''}
                    mode="light"
                    onLeftClick={() => {
                       
                        if(!isShowLeftContent)
                            return
                        if(typeof(leftClick) =='function')
                        {
                            leftClick()
                            return
                        }
                        if(pathname === "newshelves" || pathname ===  "explosionRecom" || pathname ===  "brandsale" || pathname === "activityProduct"){
                            setTimeout(()=>{    //为了解决 安卓部分手机，跳页后页面高度计算有问题（目的是让软键盘先自动关闭）
                                 this.props.router.push("/home")
                            },300)
                           
                        }else {
                            setTimeout(()=>{    //为了解决 安卓部分手机，跳页后页面高度计算有问题（目的是让软键盘先自动关闭）
                                this.props.router.goBack()
                            },300)
                           
                        }
                        }
                    }
                    rightContent={this.props.rightContent}
                >{title}</NavBar>
            </div>
        )
    }
}

export default VbNavBar
