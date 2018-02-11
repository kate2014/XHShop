

//退货、退款列表
import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { ListView, Toast, Modal, List } from 'antd-mobile';
import { emptyOrder } from '../../actions/orderDetails'
import ListViewProduct from '../../components/ListViewProduct'
import { AllProducts } from '../../components/AllProducts'
import utils from '../../utils'
import { selectWithdrawRecord } from '../../actions/product'
import { changeNavbarTitle } from '../../actions/home'
import { CommodityIcon } from '../../components/Commodity';

const alert = Modal.alert;
const Item = List.Item;
class AfterSaleList extends Component {
    static propTypes = {};

    static defaultProps = {};
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1.id !== row2.id
        })
        this.state = {
            isLoading: false,
            hasMore: false,
            shareData: [],
            id: "",
            takeMoneyList:"",
            dataSource: this.dataSource.cloneWithRows([])
        }

    }
    // shouldComponentUpdate(nextProps,nextState){
    //     if(this.props.orderDetails.refunded == nextProps.orderDetails.refunded  && !this.state.hasMore)
    //         return false
    //     else
    //         return true
    // }
    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("提现明细"));
    }
    componentDidMount() {
        this.props.dispatch(selectWithdrawRecord({
            pageNow: 1,
            pageSize: 20,
        }), (res) => {
            if (res.data.pageOffset < res.data.totalPage) {
                this.setState({
                    shareData: res.data.datas,
                    id: res.data.datas.id,
                    isLoading: false,
                    hasMore: true,
                })
            } else {
                this.setState({
                    shareData: res.data.datas,
                    isLoading: false,
                    hasMore: false
                })
            }
        });


    }
    componentWillUnmount() {
        this.props.dispatch(emptyOrder())
    }
    getData(pageNow) {
        this.props.dispatch(selectWithdrawRecord({
            pageNow: pageNow,
            pageSize: 10,
        }, (res) => {
            if (res.code == 0) {
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
            }
            else {
                Toast.info(res.message)
                this.setState({
                    isLoading: false,
                    hasMore: false
                })
            }

        }));

    }

    onEndReached = () => {
        if (!this.state.hasMore || this.state.isLoading) {
            return;
        }
        this.setState({ isLoading: true });
        let {withdrawRecord} =this.props
        setTimeout(() => {
            this.getData(withdrawRecord.data.pageOffset + 1)            
        }, 100)
    }
    onRefresh = () => {
        this.props.dispatch(emptyOrder())
        setTimeout(() => {
            this.getData(1)
        }, 50)

    }
    itemClick(event) {
        let id=event
         this.context.router.push(`myCommission/Detailed01?id=${id}`)
    }
    render() {
        let { shareData } = this.state
        let { withdrawRecord} = this.props
        const row = (rowData, sectionID, rowID) => {
            return (
                <div className="withdrawals" key={rowID}  onClick={this.itemClick.bind(this,rowData.id)} >
                    <div className="box">
                        <div className="boxx" >
                            <div className="top">提现到</div>
                            <div className="center" >
                                <p className="left">{rowData.wechat}</p>
                                <p className="right">￥{rowData.amount}</p>
                            </div>
                            <div className="bottom" >
                                <p className="left">{rowData.createDt}</p>
                                <p className="right">{rowData.statusDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };

        if (!withdrawRecord.data.datas) return null
        let dataSource = this.dataSource.cloneWithRows(withdrawRecord.data.datas)
        return (
            <div style={{ width:"100%"}} className="my-order">
                <ListViewProduct
                    row={row}
                    dataSource={dataSource}
                    status={withdrawRecord.code}
                    data={withdrawRecord.data}
                    isLoading={this.state.isLoading}
                    reflistview="listrefs"
                    onEndReached={this.onEndReached}
                    onRefresh={this.onRefresh}
                    type={2}
                    height={document.documentElement.clientHeight}
                />

            </div>
        )
    }
}


function mapStateToProps(state) {
    console.log(6666)
    console.log(state.takeMoneyList)
    return {
        withdrawRecord: state.takeMoneyList.toJS(),
        
    }
}

export default connect(mapStateToProps)(AfterSaleList)
