import React, { Component } from 'react';
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Toast} from 'antd-mobile';
import {uploadImg,emptyMycommentList} from '../../actions/evaluation';
import { Icon, Grid } from 'antd-mobile';
import './password.less'

const list = 'cross';
const img=[require('../../assets/images/Idcard1.png'),require('../../assets/images/Idcard.png')]
class ImagePickerExample extends Component {
	constructor(props) {
        super(props);
        this.state = {
           //img1:require('../../assets/images/身份证拍摄正面@3x.png'),
           //img2:require('../../assets/images/身份证拍摄反面@3x.png'),
           showFale0:false,
           showFale1:false,
           showFale:'',
           icon:'cross'
        }
           
    }

   
    // changeShowFale(aa){
    //   this.setState({
    //     showFale:false
    //   })
    // }


    
	upDateImage =(i,e) =>{
        var file = e.target.files[0]
        console.log(111)
        console.log(e.target.value)
        if(!file) return
        var imgSize = file.size;
        e.target.value= '' 
        let data={
            attachs:file
        }
         this.props.dispatch(uploadImg(data,(res) => {
            if (res.code == 0) {
            	if(i===0)
                    this.setState({
                        img0:res.data.url,
                        showFale0:true
                    })
                else  
                    this.setState({
                        img1:res.data.url,
                        showFale1:true
                    })
                   
            } else {
                Toast.fail(res.message, 1);
            }
           
        }))
       
       /* postfrom(`${host.test_host}file/fdfsUpload`, data, (res)=>{
            if(res.code==0){
                this.setState({
                    files:[...this.imgdata, res.data.url]
                },()=>{
                    this.imgdata=this.state.files
                })
            }
            
        })*/
    
    } 
    closeImg(i){
        this.setState({
            [`img${i}`]:'',
            [`showFale${i}`]:false
            
        })
    }
	render() {
		let {img0,img1,icon} =this.state
        

		return(
				<div className="box">
					<div className="fileBox">
						<input type="file"  className="file" onChange={this.upDateImage.bind(this,0)}/>
						<img src={img0 || img[0]}/>
                        {this.state.showFale0?<Icon className='Icon' type= {icon} onClick={this.closeImg.bind(this,0)}/>:null}
					</div>

					<div className="fileBox">
						 <input type="file" className="file" onChange={this.upDateImage.bind(this,1)}/>
						 <img src={img1 || img[1]}/>
                         {this.state.showFale1?<Icon className='Icon' type= {icon} onClick={this.closeImg.bind(this,1)} />:null}
					</div>
					<div className="btn">确定</div>
				</div>
			)

	}
}


function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(ImagePickerExample)