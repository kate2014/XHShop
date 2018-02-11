//Vb收藏
import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { ListView, Toast} from 'antd-mobile';
import {getCasecollection, deleteCollection, empotyCaseCollection} from '../../actions/collection'
import {Product} from '../../components/ProductItem'
import ListViewProduct from '../../components/ListViewProduct'
import {storage} from '../../utils/tools'
import utils from '../../utils'

class CaseCollection extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
        })
        this.state = {
            isLoading: false,
            hasMore: false,
        }

    }

    componentDidMount() {

            // this.props.dispatch(getCasecollection({
            //     pageNow: 1,
            //     pageSize: 10,
            //     productType: 1,
            //     openId: storage.get("openId")
            // },(res)=>{
            //     if (res.data.pageOffset < res.data.totalPage) {
            //         this.setState({
            //             isLoading: false,
            //             hasMore: true
            //         })
            //     } else {
            //         this.setState({
            //             isLoading: false,
            //             hasMore: false
            //         })
            //     }
            // }))
        this.getData(1)

    }
    componentWillUnmount() {
        this.props.dispatch(empotyCaseCollection())
    }
    getData(pageNow){
            this.props.dispatch(getCasecollection({
                pageNow:pageNow,
                pageSize: 15,
                productType: 1,
                openId: storage.get("userInfo").memberId||''
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
            }));

    }
    deleteCollect = (id) => {
        this.props.dispatch(deleteCollection({
            openId: storage.get("userInfo").memberId||'',
            productId: id
        }, (res) => {
            if (res.code == 0) {
                Toast.success("取消收藏成功!", 1);
                this.props.dispatch(empotyCaseCollection())
                this.getData(1)
            } else {
                Toast.fail('取消收藏失败', 1);
            }
        }))
    }
   
    onEndReached = () => {
        if (!this.state.hasMore || this.state.isLoading) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(()=>{
            this.getData(this.props.caseCollection.data.pageOffset + 1)
        },100)

    }
 
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} className="order-product-content">
                    <Product showType={3} item={rowData}
                             deleteCollect={this.deleteCollect}
                    />
                </div>
            )
        }
        let dataSource = this.dataSource.cloneWithRows(this.props.caseCollection.data.datas)
        return (
            <div className="vb-collection">
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={this.props.caseCollection.code}
                    data={this.props.caseCollection.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    type={2}
                    height={document.documentElement.clientHeight - 45*utils.multiple}
                />
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        caseCollection: state.caseCollection
    }
}

export default connect(mapStateToProps)(CaseCollection)