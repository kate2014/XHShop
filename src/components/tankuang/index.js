import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.less'
class Tan extends Component {
    static defaultProps = {
       
    };
    constructor(props) {
        super(props);
        this.state = {
            
        }
        
    }
    //点击事件发生后状态改变时获取值
    componentDidUpdate(){
       /* if(this.props){
            this.setState({
                data: this.props.data,
                display:this.props.display
            });
            console.log(this.state.data+','+this.state
.display)
        }*/
        // console.log(this.props)
    }
    
    render() {
        // const {children } = this.props;
        let {data,onTouch,onShowFale}=this.props;
        // console.log(data)
        return (
            <div className="toastContainers" >
                <div className="content" >
                    {
                        data.map((item,i)=>{
                            return(
                                <div className="list" key={i} onClick={onTouch.bind(this,item)}><span>{item.label}</span></div>
                            )
                        })
                    }
                    <div className="list" onClick={onShowFale.bind(this,false)}><span>取消</span></div>
                </div>
            </div>
        );
    }
}
export default Tan;