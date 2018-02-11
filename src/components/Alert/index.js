
import React, { Component, PropTypes } from 'react'
import './index.less'
export default class AlertLayer extends Component{
  
  constructor(props){
    super(props)
  }
  onRemove(){
    this.props.utils.showLayer()
  }
  timeOut(){
    setTimeout(()=>{
      this.onRemove();
    },3000)
  }
  componentWillUnmount(){
    this.onRemove()
  }

  _render(){
    let {str,code} = this.props;
    //this.timeOut();
    return (  
      <div onClick={this.onRemove.bind(this)} className={`drawer_screen`}>
        <div>{str}</div>
      </div>
    )
  }
  render(){
    return (
      <div>{this._render()}</div>
    )
  }
}

