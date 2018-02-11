import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Toast,Pagination,Modal } from 'antd-mobile';
import utils from '../../utils'
import {storage} from "../../utils/tools"
import {changeNavbarTitle} from '../../actions/home'


const alert = Modal.alert;
class Activity extends Component {
    
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
           
        }
        this.draw = {}

    }

    componentWillMount() {
        this.props.dispatch(changeNavbarTitle("砸金蛋"))
    }

    componentDidMount() {
       
    }
    componentWillUnmount(){
       
    }
   
    render() {
       return(
        <div className="goldEggs-content" >
            <div className="big-box" style={{height: document.documentElement.clientHeight -50*utils.multiple}}>
                <img  src={require('../../assets/images/goldEggs/bg3.png')} className="bg"/>
                <div className="top">
                    <img src={require('../../assets/images/goldEggs/b4.png')} className="s1" />
                    <div className="s2">小主,您还能砸<span className="s2-1">5个</span>金蛋，已砸<span className="s2-1">3个</span>金蛋</div>
                    <div className="s3">
                        <img src={require('../../assets/images/goldEggs/b2.png')} className="s3-1" />
                        <img className="s3-2" src={require('../../assets/images/goldEggs/b6.png')}/>
                        <img className="s3-3 imgChuiZi"  src={require('../../assets/images/goldEggs/b1.png')}/>
                        <span className="s3-4">活动规则>></span>
                    </div>
                </div>

                
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        
    }
}

export default connect(mapStateToProps)(Activity)
