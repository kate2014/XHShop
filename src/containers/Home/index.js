import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Carousel, Grid, WingBlank, WhiteSpace, List} from 'antd-mobile';
import {getBannerList, getProduct, getAreaActivity} from '../../actions/home'
import Swipers from '../../components/Swipers'
import ActivityItem from '../../components/ActivityItem'
import ProductItem from '../../components/ProductItem'
import {storage} from '../../utils/tools'
import Img from '../../components/Img'
import TabBar from '../../components/TabBar'
import utils from '../../utils'
import './index.less'

const Item = List.Item;

class Home extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            initialHeight: 180
        }
        this.lodding = false;
    }

    onScrollHandle(event) {
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop + 100 >= scrollHeight)
        if (isBottom && !this.lodding) {
            this.lodding = true;
            if (this.props.areaActive.code == 0) {
                return
            } else {
                this.props.dispatch(getAreaActivity({}, (res) => {
                    this.lodding = false;
                }))
            }

        }
    }

    componentWillMount() {
        this.props.dispatch(getBannerList({}))
        this.props.dispatch(getProduct({}))
        /*if (this.contentNode) {
            this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
        }*/
    }

    componentDidMount() {
        this.props.dispatch(getAreaActivity({}, (res) => {
            this.setState({
                test:res.data
            })
        }))

        /*if (this.contentNode  ) {
            this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
        }*/
       
    }


    clickGird = (obj) => {
        MtaH5.clickStat(obj.id)
        if (obj.text == "云购") {
            if(storage.get("userInfo")&&storage.get("userInfo").id){
                location.href = obj.href+`1?loginMbgRedirectToken=${storage.get("token")}`
            }else{
                this.context.router.push(`/login`)
            }
        }else if(obj.href.indexOf('http://')>-1 || obj.href.indexOf('https://')>-1){
            window.location.href=obj.href
        }
         else {
            this.context.router.push(obj.href)
        } 

    }
    clickTab = (id) => {
        this.context.router.push(`/product?id=${id}`)
    }
    clickProduct = (id) => {
        this.context.router.push(`/product?id=${id}`)
    }

    cliclkMore(data) {
        this.context.router.push(`/activityProduct?id=${data.imCampaignCategoryId}`)
    }

    linktoPath(item) {

        if (item.title == "全球购") {
            if(storage.get("userInfo")&&storage.get("userInfo").id){
                location.href = item.path+`?uid=1&loginMbgRedirectToken=${storage.get("token")}`
            }else{
                this.context.router.push(`/login`)
            }


        }else if(item.path.indexOf('http://')>-1 || item.path.indexOf('https://')>-1){
            window.location.href=item.path
        } else {
            this.context.router.push(item.path)
        }

    }
    toActive=()=>{
        this.context.router.push(`/activity`)
    }
    renderCarousel(bannerList){
        return(
            <Carousel
                    className="my-carousel-sild"
                    autoplay={true}
                    infinite={true}
                    selectedIndex={0}
                    swipeSpeed={35}


                >
                    {bannerList.data.map((item, id) => (
                        <div onClick={() => {
                            MtaH5.clickStat(`baner${id}`)
                            if(item.typeId == 1){
                                this.context.router.push(`/product?id=${item.imProductId}`)
                            }else if(item.typeId ==2 && item.linkUrl!=''){
                                window.location.href= item.linkUrl
                            }else if(item.typeId==3){
                                this.context.router.push(`/activityProduct?id=${item.imProductId}`)
                            }
                        }} key={id}>
                            <Img
                                base64={2}
                                src={item.imageUrl}
                                style={{width: "100%",'height':utils.width*(40/64)*utils.multiple+'px'}}
                                alt="icon"
                                onLoad={() => {

                                }}
                            />
                        </div>
                    ))}
                </Carousel>
            )
    }

    render() {
        const {bannerList, newList, product, areaActive, classicMenu, activeMenu} = this.props;
        let img_width=utils.width*0.95*0.98*0.5*utils.multiple
        const {pathname} = this.props.location;
        return (
            <div className="vb-home" style={{height:document.documentElement.clientHeight-45*utils.multiple}}
                 ref={node => this.contentNode = node}>
                {
                    pathname=='/home'|| pathname=='/'?null:<TabBar {...this.props}/>
                }
                { this.renderCarousel(bannerList)}
                <div className="menu-nav" style={{"background":`url(${require("../../assets/images/Christmas/bg1.png")})`,'backgroundSize':'cover','marginTop':-1*utils.multiple+'px'}}>
                    <Grid data={classicMenu.data}
                          columnNum={classicMenu.data.length}
                          hasLine={false}
                          className="home-square-grid"
                          renderItem={dataItem => (
                              <div className="am-grid-item-inner-content ">
                                  <img src={dataItem.icon} className="home-grid-icon" alt="icon"/>
                                  <div>
                                      <span className="am-grid-text">{dataItem.text}</span>
                                  </div>
                              </div>
                          )}
                          onClick={this.clickGird}/>
                </div>

                <div style={{'marginTop':-1*utils.multiple+'px'}}>
                    <img src={require("../../assets/images/Christmas/bg2.png")} style={{width:"100%"}} onClick={this.toActive}/>
                </div>


                <div className="background-base">
                    <WingBlank size="sm">
                        <WhiteSpace/>
                        {
                            activeMenu.data.map((item, index) => (
                                <div style={{width: '50%', display: 'inline-block'}} key={index}
                                     onClick={this.linktoPath.bind(this, item)}>
                                    <WingBlank size="sm">
                                        <img style={{'width':'100%'}} src={require(`../../assets/images/Christmas/t${index}.png`)}/>
                                    </WingBlank>
                                    <WhiteSpace/>
                                </div>
                            ))
                        }
                    </WingBlank>
                </div>
                <WhiteSpace/>
                {
                    product.code ==0 ? product.data.map((item, index) => (
                        <div key={index}>
                            <div className="banner-img">
                                <Link
                                    to={item.categoryType == 0 ? `/vbexchange?id=${item.imCategoryId}` : `/classification`}>
                                    <img src={item.imageUrl}/>
                                </Link>
                            </div>
                            <div className="swiper-div">
                                <Swipers>
                                    {
                                        item.products.map((item, ind) => (
                                            <div className="swiper-slide" key={ind}>
                                                <ProductItem {...item} clickTab={this.clickTab}/>
                                            </div>
                                        ))
                                    }
                                </Swipers>
                            </div>
                            <WhiteSpace/>
                        </div>
                    ))
                    :null
                }


                <div>
                    {areaActive.data&& areaActive.data.length>0?areaActive.data.map((item, id) => (
                        <div key={id}>
                            <List className="list-title">
                                <Item
                                    extra={'查看更多'}
                                    arrow="horizontal"
                                    onClick={this.cliclkMore.bind(this, item)}
                                >{item.name}</Item>
                            </List>
                            <div className="list-ul">
                                {
                                    item.products && item.products.map((item, index) => (
                                            <div key={index} className="goods-item">
                                                <ProductItem {...item} clickTab={this.clickTab}
                                                style={{width:img_width+'px',height:img_width+'px'}}
                                                textRow={2}
                                                />
                                            </div>

                                        )
                                    )
                                }
                            </div>
                            <WhiteSpace/>
                        </div>
                    )):""}

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        bannerList: state.bannerList.toJS(),
        newList: state.newList,
        product: state.product,
        areaActive: state.areaActive,
        classicMenu: state.classicMenu,
        activeMenu: state.activeMenu
    }
}

export default connect(mapStateToProps)(Home)
