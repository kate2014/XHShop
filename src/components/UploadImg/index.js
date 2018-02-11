
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './index.less'
import {Toast,ImagePicker} from 'antd-mobile';
import {uploadImg} from '../../actions/evaluation'
import postfrom from "../../utils/form";
import {host} from "../../actions/hostConf";

class UploadImg extends Component {
    static propTypes = {
        
    };
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    static defaultProps = {
       
    };

    constructor(props) {
        super(props);
        this.state={
            files:[],
            
        }
        this.imgdata=[]
 
       
       
    }
    componentDidMount(){

    }
    upDateImage =(e) =>{
        var sendData
       
       
        var file = e.target.files[0]
        if(!file) return
       
         var imgSize = file.size;
         
         

        e.target.value= '' 
        let data={
            attachs:file
        }
        
        postfrom(`${host.test_host}file/fdfsUpload`, data, (res)=>{
            if(res.code==0){
              
       
                this.setState({
                    files:[...this.imgdata, res.data.url]
                },()=>{
                    this.imgdata=this.state.files
                })
            }
            
        })
    
    }
    

   
   
    render() {
        let {files } =this.state
        let {backFn,maxLenght=3}=this.props
        return (
            <section>
            
            {this._render()}
            
            </section>
           
        )
    }
    _render() {
        let {files} =this.state
        let {backFn,maxLenght=3}=this.props
        return (
            <div className="uploadImg-com">
            {
                files.map((item,i)=>{
                    return(
                        <img key={i} className="img" src={item}/>
                        
                        )
                })
            }
            {
                files.length>=maxLenght?null:
                <div className="inputOuter">
                    <input  type="file"  className="inputfile" accept='image/*' onChange={this.upDateImage.bind(this)} />
                </div>
            }
            
            </div>
           
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(UploadImg)