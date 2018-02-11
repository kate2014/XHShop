import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { ListView} from 'antd-mobile';
import './index.less'
import NavBar from '../../components/NavBar'
import {getInficationList, getMenuChildren, getInficationMenu,clearInficationList} from '../../actions/classIfication'
import {
    getVbExchangeMenu,
    getVbMenuChildren
} from '../../actions/newShelves'
import ListViewProduct from '../../components/ListViewProduct'
import Text from '../../components/Text'
import Swipers from '../../components/Swipers'
import ProductItem from '../../components/ProductItem'
import {changeNavbarTitle} from '../../actions/home'
import utils from '../../utils'
const ImgHight=utils.width*0.95*0.98*0.5*utils.multiple
class ClassShop extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.imCommentId !== row2.imCommentId
        })
        this.state = {
            dataSource: this.dataSource.cloneWithRows([]),
            isLoading: false,
            hasMore: true
        }
    }

    componentWillMount() {
        const {parentId,type,name} = this.props.location.query;
        const {infiactionmenu} = this.props;
        this.props.dispatch(changeNavbarTitle(name))
        if(type ==0){
            if (infiactionmenu.code == -1) {
                this.props.dispatch(getVbExchangeMenu("ad32d726-8544-45ee-a53b-0d67351752a4", {}, (res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        this.props.dispatch(getVbMenuChildren(parentId))
                    }
                }))
            } else {
                return;
            }
        }else{
            if (infiactionmenu.code == -1) {
                this.props.dispatch(getInficationMenu("1b6b78ea-9644-47c6-9f0e-d94b3c8ccebe", {}, (res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        this.props.dispatch(getMenuChildren(parentId))
                    }
                }))
            } else {
                return;
            }
        }
    }

   
    componentDidMount() {
        this.getData(1)
    }
   
    componentWillUnmount(){
        this.props.dispatch(clearInficationList())
    }
    getData(pageNow) {
        const {id} = this.props.params
        const {type} = this.props.location.query;
        this.props.dispatch(getInficationList(id, {
            pageNow: pageNow,
            pageSize: 10,
            platform: 1,
            type: type
        }, (res) => {
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    isLoading: false,
                    hasMore: true
                })
            } else {
                this.setState({
                    isLoading: false,
                    hasMore: false
                })
            }
        }))
    }
    onEndReached = () => {
        if (!this.state.hasMore ) {
            return;
        }
        const {id} = this.props.params
        this.setState({isLoading: true});
        this.getData(this.props.infiactionlist[id].data.pageOffset + 1)
    }

    clickBtn(item) {
        if(this.refs.list.refs.listview)
            this.refs.list.refs.listview.scrollTo(0,0)
        const {parentId,type} = this.props.location.query;
        this.context.router.replace(`/classshop/${item.imCategoryId}?name=${item.name}&parentId=${parentId}&type=${type}`)
        if (Object.keys(this.props.infiactionlist).includes(item.imCategoryId)) {

        } else {
            this.props.dispatch(getInficationList(item.imCategoryId, {
                pageNow: 1,
                pageSize: 10,
                platform: 1,
                type: type
            }))
        }
    }
    gotoShop(data){
        this.context.router.push(`/product?id=${data.imProductId}`)
    }
    render() {
        const {parentId, name,type} = this.props.location.query;
        const {id} = this.props.params
        let {infiactionlist} =this.props
        let filterBar =[]
        if(type==0){
            filterBar = this.props.vbexchangemenu.data.filter(item => item.imCategoryId == parentId)
        }else{
            filterBar = this.props.infiactionmenu.data.filter(item => item.imCategoryId == parentId)
        }
        let tabs = []
        if (filterBar && filterBar.length > 0 && filterBar[0].children && filterBar[0].children.length > 0) {
            tabs = filterBar[0].children;
        }
        const row=(rowData, sectionID, rowID) => {
            return (
                <ProductItem  {...rowData} clickTab={this.gotoShop.bind(this,rowData)} height={ImgHight} />
            )
        }
        let dataSource ={}
        if(infiactionlist[id]){
            dataSource = this.dataSource.cloneWithRows(infiactionlist[id].data.datas)
        }else{
            dataSource = this.dataSource.cloneWithRows([])
        }

        return (
            <div className="class-shop">
                <div className="swiper-div">
                    {
                        tabs.length > 1 ? (
                            <Swipers swiperOption={{
                                slidesPerView: 4,
                                spaceBetween: 40
                            }}>
                                {
                                    tabs.map((item, ind) => (
                                        <div
                                            className={item.imCategoryId == id ? "swiper-slide active" : "swiper-slide"}
                                            key={ind} onClick={this.clickBtn.bind(this, item)}>
                                            <Text text={item.name} row={1} size="md"/>
                                        </div>
                                    ))
                                }
                            </Swipers>) : ""
                    }
                </div>
                <div style={{'padding':'0 2.5%','background':'#fff'}}>
                    <ListViewProduct
                        row={row}
                        dataSource={dataSource}
                        status={infiactionlist[id]?infiactionlist[id].code:-1}
                        data={infiactionlist[id]?infiactionlist[id].data:[]}
                        isLoading={this.state.isLoading}
                        ref="list"
                        onEndReached={this.onEndReached}
                        type={1}
                        height={document.documentElement.clientHeight-45*utils.multiple}
                        empty_text={'小主，该分类产品稍后上架，过一会再来逛逛哦~'}
                     
                    />
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        infiactionmenu: state.infiactionmenu,
        infiactionlist: state.infiactionlist.toJS(),
        vbexchangemenu:state.vbexchangemenu,
    }
}

export default connect(mapStateToProps)(ClassShop)
