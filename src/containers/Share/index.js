
import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { ListView,  Tabs} from 'antd-mobile';
import {getShareList, empotyShareList} from '../../actions/product'
import {Product} from '../../components/ProductItem'
import ListViewProduct from '../../components/ListViewProduct'
import './index.less'
import utils from '../../utils'
import {storage} from "../../utils/tools";
import NavBar from "../../components/NavBar";



class ShareList extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	static contextTypes={
  	router: React.PropTypes.object.isRequired
	};
	constructor(props) {
      super(props);
      this.dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1.orderId !== row2.orderId
      })
      this.state = {
          isLoading:false,
          commission:'descCommission',
          price:'ascPrice',
          lastTab:0

      }
      this.tab=0
      this.sortType='all'
      this.inintData = {
        all: {
          hasMore: false,
          page:0
        },
        ascCommission: {
          hasMore: false,
          page:0
        },
        descCommission: {
          hasMore: false,
          page:0
        },
        ascPrice: {
          hasMore: false,
          page:0
        },
        descPrice: {
          hasMore: false,
          page:0
        },
        cost: {
          hasMore: false,
          page:0
        },
        
      }
      

  }
  componentWillMount(){
  

  }
  componentDidMount() {
    this.getData(0,true)

  }
  componentWillUnmount() {
      this.props.dispatch(empotyShareList())
  }
   //分享
  share=(item) =>{
    this.context.router.push(`/product?id=${item.imProductId}`)
     
     
  }
  getData(tab,isClick){
  	let {commission,price} =this.state
    let {shareGoodsforCommission} =this.props

  	switch(tab){
  		case 1:
        if(isClick){
          if(tab == this.lastTab)
            this.sortType=commission =='descCommission'?'ascCommission':'descCommission';
          else
            this.sortType=commission
          this.setState({
            commission:this.sortType
          })
        }
        
    		break;
  		case 2:
        if(isClick){
          if(tab == this.lastTab)
    		    this.sortType=price == 'descPrice'?'ascPrice':'descPrice';
          else
            this.sortType=price
    		  this.setState({
	    			price:this.sortType
	    		})
        }
  		  break;
  		case 3:
        if(isClick){
    		  this.sortType='cost';
        }
  		  break;
  		default:
        if(isClick){
    			this.sortType='all';
        }
  			break
  	}
    this.lastTab =tab

    if(isClick  &&  shareGoodsforCommission[this.sortType].code==0){
        return
    }

  	
    ++ this.inintData[this.sortType].page
  	let obj={
  		pageNow:this.inintData[this.sortType].page,
      pageSize: 15,
      sortType:this.sortType
  	}

    
    this.props.dispatch(getShareList(obj, (res) => {
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
          this.getData(this.tab,false)
      },100)

  }
  onTabClick =(tab,index) =>{
  	this.tab=index
  	this.getData(index,true)

  }

	 render() {
	 	let {price,commission} =this.state
	 	let {shareGoodsforCommission} =this.props

	 	let tabs = [
		  { title: <div>综合排序</div> },
		  { title: <div className="tab">奖励比率<span className={`${commission=='descCommission'?'bage down':'bage up'}`}><i className="triangle-down"></i><i className="triangle-up"></i></span></div> },
		  { title: <div className="tab">价格<span className={`${price=='descPrice'?'bage down':'bage up'}`}><i className="triangle-down"></i><i className="triangle-up"></i></span></div> },
		  { title: <div>销量</div> },
		];
    const row = (rowData, sectionID, rowID) => {
        return (
           
                <Product key={rowID}  showType={4} item={rowData}
                         clickShare={this.share}
                />
            
        )
    }

       
    return (
        <div className="vb-share">
          <NavBar title="我要分享" 
          {...this.props} 
          leftClick={()=>{
            this.context.router.goBack()
          }} 
          rightContent={[<div style={{'color':'#000'}} key='0' onClick={()=>{
            this.context.router.push('/share/rule')
          }}>规则</div>]}/>
          <div className='section' style={{height:document.documentElement.clientHeight}}>
        	<Tabs tabs={tabs}
			      initialPage={0}
			      onChange={(tab, index) => { }}
			      onTabClick={(tab, index) => { this.onTabClick(tab,index)  }}
			    >
           <ListViewProduct
                row={row}
                dataSource={this.dataSource.cloneWithRows(shareGoodsforCommission[this.sortType].data.datas)}
                status={shareGoodsforCommission[this.sortType].code}
                data={shareGoodsforCommission[this.sortType].data}
                isLoading={this.state.isLoading}
                reflistview="listrefs"
                onEndReached={this.onEndReached}
                type={2}
                height={document.documentElement.clientHeight -45*utils.multiple }
            />
			    </Tabs>
          </div>
        </div>
    )
    }
}


function mapStateToProps(state) {
	return {
		shareGoodsforCommission: state.shareGoodsforCommission.toJS()
	}
}
export default connect(mapStateToProps)(ShareList)
