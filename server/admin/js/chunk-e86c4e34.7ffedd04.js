(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e86c4e34"],{"4ffd":function(e,r,t){e.exports=t.p+"img/logo.82b9c7a5.png"},"80f9":function(e,r,t){},ede4:function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"login"},[t("div",{staticClass:"login-box"},[e._m(0),t("el-form",{ref:"loginFormRef",staticClass:"login-form",attrs:{"label-width":"0",rules:e.LoginRules,model:e.LoginForm}},[t("el-form-item",{staticClass:"login-input",attrs:{prop:"username"}},[t("el-input",{attrs:{"prefix-icon":"el-icon-user-solid"},model:{value:e.LoginForm.username,callback:function(r){e.$set(e.LoginForm,"username",r)},expression:"LoginForm.username"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{"prefix-icon":"el-icon-lock",type:"password"},nativeOn:{keyup:function(r){return!r.type.indexOf("key")&&e._k(r.keyCode,"enter",13,r.key,"Enter")?null:e.enterLogin(r)}},model:{value:e.LoginForm.password,callback:function(r){e.$set(e.LoginForm,"password",r)},expression:"LoginForm.password"}})],1),t("el-form-item",{staticClass:"btns"},[t("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登陆")]),t("el-button",{attrs:{type:"info"},on:{click:e.resetLoginForm}},[e._v("重置")])],1)],1)],1)])},o=[function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"avater-box"},[n("img",{attrs:{src:t("4ffd"),alt:""}})])}],s=(t("96cf"),t("1da1")),i=t("1bab");function a(e){return Object(i["a"])({url:"/login",method:"post",data:e})}var u={name:"Login",data:function(){var e=function(e,r,t){var n=/^[a-zA-Z][\w]{2,9}$/;if(n.test(r))return t();t(new Error("请输入合法的用户名"))},r=function(e,r,t){var n=/^[\w.]{6,15}$/;if(n.test(r))return t();t(new Error("请输入合法的登陆密码"))};return{LoginForm:{username:"test",password:"123456"},LoginRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{validator:e,trigger:"blur"}],password:[{required:!0,message:"请输入登陆密码",trigger:"blur"},{validator:r,trigger:"blur"}]}}},methods:{resetLoginForm:function(){this.$refs.loginFormRef.resetFields()},login:function(){var e=this;this.$refs.loginFormRef.validate(function(){var r=Object(s["a"])(regeneratorRuntime.mark((function r(t){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,a(e.LoginForm);case 4:if(n=r.sent,200==n.meta.status){r.next=7;break}return r.abrupt("return",e.$msg.error("用户名或密码错误"));case 7:e.$msg.success("登陆成功"),window.sessionStorage.setItem("token",n.data.token),e.$router.push("/home");case 10:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())},enterLogin:function(){this.login()}}},l=u,c=(t("ee25"),t("2877")),m=Object(c["a"])(l,n,o,!1,null,"9e2c341c",null);r["default"]=m.exports},ee25:function(e,r,t){"use strict";var n=t("80f9"),o=t.n(n);o.a}}]);
//# sourceMappingURL=chunk-e86c4e34.7ffedd04.js.map