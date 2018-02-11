import React from "react";
import {Route, IndexRoute, IndexRedirect, Redirect} from "react-router";
import Home from './containers/home'
if (typeof require.ensure !== 'function') {
    require.ensure = function (dependencies, callback) {
        callback(require)
    }
}

const routes = {
    path: '/',
    getComponent(nextState, callback) {
        require.ensure([], require => {
            callback(null, require('./App').default);
        }, 'home');
    },
    indexRoute: {
        getComponent(nextState, callback) {
            require.ensure([], require => {
                callback(null, Home);
            }, 'home');
        }
    },
    childRoutes: [
        {
            path: 'home',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, Home);
                }, 'home');
            }
        },



        {
            path: 'classification',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ClassIfication').default);
                }, 'product');
            },


        },


        {
            path: 'brandsale',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/BrandSale').default);
                }, 'home');
            },


        },
        
        {
            path: 'idcard',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/password/idcard').default);
                }, 'product');
            },
        },
        // {
        //     path: 'Account',
        //     getComponent(nextState, callback) {
        //         require.ensure([], require => {
        //             callback(null, require('./containers/Password/Account').default);
        //         }, 'product');
        //     },
        // },
        {
            path: 'Remember',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Remember').default);
                }, 'product');
            },
        },
        {
            path: 'Opassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Opassword').default);
                }, 'product');
            },
        },
        {
            path: 'password',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/password').default);
                }, 'product');
            },
        },
        {
            path: 'Vpassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Vpassword').default);
                }, 'product');
            },
        },
        {
            path: 'resetPassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/resetPassword').default);
                }, 'product');
            },
        },
        {
            path: 'classshop/:id',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ClassShop').default);
                }, 'product');
            }
        },

        {
            path: 'activityProduct',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ActivityProduct').default);
                }, 'product');
            }
        },
        {
            path: 'product',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Product').default);
                }, 'product')
            }
        },
        {
            path: 'product/evaluation',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Product/Evaluation').default);
                }, 'product')
            }
        },
        {
            path: 'shopcart',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ShoppingCart').default);
                }, 'product')
            }
        },
        {
            path: 'settlement',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/SetTlement').default);
                }, 'product')
            }
        }, {
            path: 'reductionArea',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ReductionArea').default);
                }, 'product')
            }
        }, {
            path: 'eidtaddress',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Address').default);
                }, 'product')
            }
        }, {
            path: 'addresslist',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Address/AddressList').default);
                }, 'product')
            }
        },
        {
            path: 'myinfo',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/MyInfo').default);
                }, 'myinfo')
            }
        },


        {
            path: 'reset/:value',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Reset').default);
                }, 'password')
            }
        },


        {
            path: 'account',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/AccountManagement').default);
                }, 'password')
            }
        },



        {
            path: 'identity',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Identity').default);
                }, 'password')
            }
        },



        {
            path: 'myorder',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/MyOrder').default);
                }, 'order')
            }, childRoutes: [
            {
                path: 'delivered',
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require('./containers/MyOrder/Delivered').default);
                    }, 'order');
                }
            }, {
                path: 'details',
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require('./containers/MyOrder/Details').default);
                    }, 'order');
                }
            }, {
                path: 'evaluated',
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require('./containers/MyOrder/Evaluated').default);
                    }, 'order');
                }
            }, {
                path: 'paid',
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require('./containers/MyOrder/Paid').default);
                    }, 'order');
                }
            }, {
                path: 'received',
                getComponent(nextState, callback) {
                    require.ensure([], require => {
                        callback(null, require('./containers/MyOrder/Received').default);
                    }, 'order');
                }
            }
        ]
        }, {
            path: 'orderdetails',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/OrderDetails').default);
                }, 'order')
            }
        }, {
            path: 'evaluation',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Evaluation').default);
                }, 'order')
            }
        }, {
            path: 'commectProduct',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/CommectProduct').default);
                }, 'order')
            }
        }, {
            path: 'dryingOrders',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/CommectProduct/DryingOrders').default);
                }, 'order')
            }
        }, {
            path: 'choosePayType',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/pay').default);
                }, 'order')
            }
        }, {
            path: 'paySuccess',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/pay/paySuccess').default);
                }, 'order')
            }
        }, {
            path: 'logistics',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/pay/logistics').default);
                }, 'order')
            }
        }, {
            path: 'myEvaluation',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/MyEvaluation').default);
                }, 'order')
            }
        }, 
        
        
        {
            path: 'about',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AboutVb').default);
                }, 'order')
            }
        }, {
            path: 'collection',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Collection').default);
                }, 'order')
            }
        }, {
            path: 'sendSms',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/SendSms').default);
                }, 'order')
            }
        }, {
            path: 'sucessexchange',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/SendSms/SucessExchange').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/products',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/chooseGoods').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/type',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/chooseType').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/apply',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/apply').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/updateApply',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/updateApply').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/backFillInfo',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/backFillInfo').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/details',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/refundDetail').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/histroy',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale/histroy').default);
                }, 'order')
            }
        },
        {
            path: 'afterSale/list',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/AfterSale').default);
                }, 'order')
            }
        },
        {
            path: 'newshelves',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/NewShelves').default);
                }, 'product')
            }
        },
        {
            path: 'explosionRecom',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/ExplosionRecom').default);
                }, 'product')
            }
        },
        {
            path: 'vbexchange',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/VbExchange').default);
                }, 'product')
            }
        },
        {
            path: 'search',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Search').default);
                }, 'product')
            }
        }, {
            path: 'coupon',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Coupon').default);
                }, 'product')
            }
        }, {
            path: 'bindCoupon',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Coupon/bindCoupon').default);
                }, 'product')
            }
        }, {
            path: 'ticketCenter',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/TicketCenter').default);
                }, 'product')
            }
        }, {
            path: 'couponCentre',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/TicketCenter/couponList').default);
                }, 'product')
            }
        }, {
            path: 'buyNow',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/BuyNow').default);
                }, 'product')
            }
        }, {
            path: 'commodityList',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/CommodityList').default);
                }, 'product')
            }
        },{
            path: 'myCommission',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission').default);
                }, 'product')
            }
        },{
            path: 'myCommission/order',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission/order').default);
                }, 'product')
            }
        },{
            path: 'myCommission/withdraw',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission/withdraw').default);
                }, 'product')
            }
        },
        {
            path: 'myCommission/wallet',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission/wallet').default);
                }, 'product')
            }
        },
         {
            path: 'myCommission/history',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission/history').default);
                }, 'product')
            }
        },
       
        {
            path: 'myCommission/Detailed01',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Commission/Detailed01').default);
                }, 'product')
            }
        },
        {
            path: 'share',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Share').default);
                }, 'product')
            }
        },
        {
            path: 'share/rule',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Share/rule').default);
                }, 'product')
            }
        },
        {
            path: 'sblodge',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/SbLodge').default);
                }, 'hotel')
            }
        },
        {
            path: 'lodgedetails',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/LodgeDetails').default);
                }, 'hotel')
            }
        },
        {
            path: 'hotelintroduce',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/HotelIntroduce').default);
                }, 'hotel')
            }
        },
        {
            path: 'hotelorder',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/HotelOrder').default);
                }, 'hotel')
            }
        }, {
            path: 'agreement',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Agreement').default);
                }, 'hotel')
            }
        }, {
            path: 'onlinePayment',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/OnlinePayment').default);
                }, 'hotel')
            }
        }, {
            path: 'hotelList',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/HotelList').default);
                }, 'hotel')
            }
        }
        , {
            path: 'login',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/login').default);
                }, 'login')
            }
        }, {
            path: 'fastLogin',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/login/fastLogin').default);
                }, 'login')
            }
        }, {
            path: 'forgetPassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/login/register').default);
                }, 'login')
            }
        }, {
            path: 'register',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/login/register').default);
                }, 'login')
            }
        }, {
            path: 'activity',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Activity').default);
                }, 'activity')
            }
        }, {
            path: 'activity/address',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Activity/address').default);
                }, 'activity')
            }
        }, {
            path: 'SubmitWeChat',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/SubmitWeChat').default);
                }, 'Password')
            }
        },
        {
            path: 'ToWeChat',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/ToWeChat').default);
                }, 'Password')
            }
        },
        
        {
            path: 'IdentityAuthentication',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/IdentityAuthentication').default);
                }, 'Password')
            }
        },
        {
            path: 'password',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/password').default);
                }, 'Password')
            }
        },
        {
            path: 'Opassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Opassword').default);
                }, 'Password')
            }
        },
        {
            path: 'Vpassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Vpassword').default);
                }, 'Password')
            }
        },
        {
            path: 'Remember',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/Remember').default);
                }, 'Password')
            }
        },
        {
            path: 'resetpassword',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('./containers/Password/resetpassword').default);
                }, 'Password')
            }
        },
        {
            path: '*',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, Home);
                }, 'home');
            },
        
        }


    ]
};
export default routes




