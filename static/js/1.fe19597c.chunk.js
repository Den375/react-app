(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{301:function(e,n,t){e.exports={paginator:"Paginator_paginator__1EL2A",currentPage:"Paginator_currentPage__2yj7H"}},303:function(e,n,t){e.exports={userContainer:"User_userContainer__2lnzq",class1:"User_class1__3sL6m",class2:"User_class2__1bS0d"}},308:function(e,n,t){"use strict";t.r(n);var r=t(32),o=t(33),a=t(36),u=t(35),l=t(23),s=t(0),i=t.n(s),c=t(83),f=t(301),p=t.n(f),g=function(e){for(var n=e.totalUsersCount,t=e.pageSize,r=e.currentPage,o=e.onPageChanged,a=e.portionSize,u=void 0===a?10:a,l=Math.ceil(n/t),f=[],g=1;g<=l;g++)f.push(g);var h=Math.ceil(l/u),d=Object(s.useState)(1),m=Object(c.a)(d,2),v=m[0],P=m[1],w=(v-1)*u+1,E=v*u;return i.a.createElement("div",{className:p.a.paginator},v>1&&i.a.createElement("button",{onClick:function(){P(v-1)}},"PREV"),f.filter(function(e){return e>=w&&e<=E}).map(function(e){return i.a.createElement("span",{className:r===e?p.a.currentPage:null,onClick:function(){return o(e,t)}}," ",e," ")}),h>v&&i.a.createElement("button",{onClick:function(){P(v+1)}},"NEXT"))},h=t(303),d=t.n(h),m=t(311),v=t(64),P=t.n(v),w=function(e){var n=e.user,t=e.isAuth,r=e.followingInProgress,o=e.unfollow,a=e.follow;return i.a.createElement("div",{className:d.a.userContainer},i.a.createElement("div",{className:d.a.class1},i.a.createElement("div",null,i.a.createElement(m.a,{to:"/profile/"+n.id},i.a.createElement("img",{src:n.photos.small||P.a,alt:"photo"}))),i.a.createElement("div",null,t?n.followed?i.a.createElement("button",{disabled:r.some(function(e){return e===n.id}),onClick:function(){o(n.id)}},"Unfollow"):i.a.createElement("button",{disabled:r.some(function(e){return e===n.id}),onClick:function(){a(n.id)}},"Follow"):null)),i.a.createElement("div",{className:d.a.class2},i.a.createElement("div",null,n.name),i.a.createElement("div",null,"u.location.city"),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null,"u.status"),i.a.createElement("div",null,"u.location.country")))},E=function(e){return i.a.createElement("div",null,i.a.createElement(g,{totalUsersCount:e.totalUsersCount,pageSize:e.pageSize,currentPage:e.currentPage,onPageChanged:e.onPageChanged}),i.a.createElement("div",null,e.users.map(function(n){return i.a.createElement(w,{user:n,key:n.id,isAuth:e.isAuth,followingInProgress:e.followingInProgress,unfollow:e.unfollow,follow:e.follow})})))},y=t(9),b=t(113),C=t(49),_=t(6);function U(e,n){return e===n}var j=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var a=0,u=r.pop(),l=function(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every(function(e){return"function"===typeof e})){var t=n.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+t+"]")}return n}(r),s=e.apply(void 0,[function(){return a++,u.apply(null,arguments)}].concat(t)),i=e(function(){for(var e=[],n=l.length,t=0;t<n;t++)e.push(l[t].apply(null,arguments));return s.apply(null,e)});return i.resultFunc=u,i.dependencies=l,i.recomputations=function(){return a},i.resetRecomputations=function(){return a=0},i}}(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:U,t=null,r=null;return function(){return function(e,n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,o=0;o<r;o++)if(!e(n[o],t[o]))return!1;return!0}(n,t,arguments)||(r=e.apply(null,arguments)),t=arguments,r}});var A=j(function(e){return e.usersPage.users},function(e){return e.filter(function(e){return!0})}),S=function(e){return e.usersPage.currentPage},O=function(e){return e.usersPage.pageSize},k=function(e){return e.usersPage.totalUsersCount},z=function(e){return e.usersPage.isFetching},I=function(e){return e.usersPage.followingInProgress},R=function(e){return e.auth.isAuth};function F(e){var n=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var t,r=Object(l.a)(e);if(n){var o=Object(l.a)(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return Object(u.a)(this,t)}}var N=function(e){Object(a.a)(t,e);var n=F(t);function t(){return Object(r.a)(this,t),n.apply(this,arguments)}return Object(o.a)(t,[{key:"componentDidMount",value:function(){this.props.requestUsers(this.props.currentPage,this.props.pageSize)}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.props.isFetching?i.a.createElement(C.a,null):null,i.a.createElement(E,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,users:this.props.users,onPageChanged:this.props.onPageChanged,unfollow:this.props.unfollow,follow:this.props.follow,followingInProgress:this.props.followingInProgress,isAuth:this.props.isAuth}))}}]),t}(i.a.Component);n.default=Object(_.d)(Object(y.b)(function(e){return{users:A(e),currentPage:S(e),pageSize:O(e),totalUsersCount:k(e),isFetching:z(e),followingInProgress:I(e),isAuth:R(e)}},{requestUsers:b.d,onPageChanged:b.c,follow:b.b,unfollow:b.e}))(N)}}]);
//# sourceMappingURL=1.fe19597c.chunk.js.map