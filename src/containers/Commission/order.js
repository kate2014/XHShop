/*
 * 我的奖励
 */
import React, {Component} from "react";

import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {List,WhiteSpace,Tabs,ListView} from 'antd-mobile';
import Text from "../../components/Text";
import {changeNavbarTitle} from '../../actions/home'
import {getShareOrder,empotyShareOrderList} from '../../actions/product'
import {CommissionProduct} from '../../components/CommissionProduct'
import ListViewProduct from '../../components/ListViewProduct'
import './index.less'
import utils from '../../utils'
const Item = List.Item;
const Brief = Item.Brief;

const tabs = [
  { title: '所有订单', sub: '1' },
  { title: '有效订单', sub: '2' },
  { title: '无效订单', sub: '3' },
];

class Order extends Component {
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			effectiveIndex:0

		}
		this.dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
    })	

    this.sortType='all'
    this.inintData = {
      all: {
        hasMore: false,
        page:0
      },
      invalid: {
        hasMore: false,
        page:0
      },
      valid_paid: {
        hasMore: false,
        page:0
      },
      valid_received: {
        hasMore: false,
        page:0
      },
      valid_closed: {
        hasMore: false,
        page:0
      }
      
      
  	}

	}
  componentWillMount(){
      this.props.dispatch(changeNavbarTitle("订单明细"))

  }
	componentDidMount (){
		this.getData(0,true)
	}
	componentWillUnmount(){
		this.props.dispatch(empotyShareOrderList())
	}
	getData(tab,isClick){
    let {shareOrder} =this.props
    let {effectiveIndex} =this.state
    if(isClick){
     	this.setState({
      	tab
      })
      this.sortType=tab==0?'all':tab==2?'invalid':(effectiveIndex==0?'valid_paid':effectiveIndex==1?'valid_received':'valid_closed')
      if(shareOrder[this.sortType].code==0)
      {
      	return
      }
    }

    ++this.inintData[this.sortType].page 
  	let obj={
  		pageNow:this.inintData[this.sortType].page,
      pageSize: 15,
      sortType:this.sortType
  	}

    
    this.props.dispatch(getShareOrder(obj, (res) => {
      if(res.code==0){
        if (res.data.pageOffset < res.data.totalPage) {
          this.inintData[this.sortType].hasMore=true;
        }else{
          this.inintData[this.sortType].hasMore=false;
        }
      }
        
      this.setState({
    		isLoading:false
    	})
    
    }));

  }
   
  onEndReached = () => {
      if (this.state.isLoading || !this.inintData[this.sortType].hasMore) {
          return;
      }
      this.setState({isLoading: true});
      setTimeout(()=>{
          this.getData(this.state.tab,false)
      },100)

  }
	 onTabClick =(tab,index) =>{
  	this.setState({
  		tab:index
  	})
  	this.getData(index,true)

  }
  onClickStatus (index,e){
  	if(index != this.state.effectiveIndex){
		  this.setState({
	  		effectiveIndex:index
	  	},()=>{
	  		this.getData(this.state.tab,true)
	  	})
  	}
  	
  }
	render() {
		let {effectiveIndex,tab} =this.state
		return(
			<div className='commission-content vb-content'>
				<div className='section' style={{height:document.documentElement.clientHeight-45*utils.multiple}}>
					<Tabs tabs={tabs}
			      initialPage={0}
			      onChange={(tab, index) => {  }}
			      onTabClick={this.onTabClick}
			    >
			      <div className='tab-item'>
              {this.renderProducts()}
            </div>
            
            <div className="tab-item second">
                <div className="top">
                  <span onClick={this.onClickStatus.bind(this,0)} className={`${effectiveIndex==0?'btn active':'btn'}`}>已付款</span>
                  <span onClick={this.onClickStatus.bind(this,1)} className={`${effectiveIndex==1?'btn active':'btn'}`}>已收货</span>
                  <span onClick={this.onClickStatus.bind(this,2)} className={`${effectiveIndex==2?'btn active':'btn'}`}>已结算</span>
                </div>
              {this.renderProducts()}
            </div>
       
            <div className='tab-item'>
              {this.renderProducts()}
            </div>
            
			      
			    </Tabs>
				</div>
			</div>
		)
	}

	renderProducts(){
	let {shareOrder} =this.props
	 const row = (rowData, sectionID, rowID) => {
        return (
            <CommissionProduct key={rowID} item={rowData} />
        )
    }
			return(
				<div className="commission-products">
					<ListViewProduct
                row={row}
                dataSource={this.dataSource.cloneWithRows(shareOrder[this.sortType].data.datas)}
                status={shareOrder[this.sortType].code}
                data={shareOrder[this.sortType].data}
                isLoading={this.state.isLoading}
                reflistview="listrefs"
                onEndReached={this.onEndReached}
                type={2}
                height={document.documentElement.clientHeight -90*utils.multiple }
            />
				</div>
				)
	}
}


function mapStateToProps(state) {
	return {
		shareOrder:state.shareOrder.toJS()
	}
}
export default connect(mapStateToProps)(Order)
