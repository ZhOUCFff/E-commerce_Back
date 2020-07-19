(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-56534662"],{"119b":function(e,t,a){"use strict";var r=a("4964"),o=a.n(r);o.a},"159b":function(e,t,a){var r=a("da84"),o=a("fdbc"),s=a("17c2"),i=a("9112");for(var n in o){var d=r[n],l=d&&d.prototype;if(l&&l.forEach!==s)try{i(l,"forEach",s)}catch(c){l.forEach=s}}},"17c2":function(e,t,a){"use strict";var r=a("b727").forEach,o=a("b301");e.exports=o("forEach")?function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}:[].forEach},4964:function(e,t,a){},"607f":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v("商品管理")]),a("el-breadcrumb-item",[e._v("添加商品")])],1),a("el-card",[a("el-alert",{attrs:{title:"添加商品信息",type:"info",center:"","show-icon":"",closable:!1}}),a("el-steps",{attrs:{space:200,active:e.activeStep-0,"finish-status":"success","align-center":""}},[a("el-step",{attrs:{title:"基本信息"}}),a("el-step",{attrs:{title:"商品参数"}}),a("el-step",{attrs:{title:"商品属性"}}),a("el-step",{attrs:{title:"商品图片"}}),a("el-step",{attrs:{title:"商品内容"}}),a("el-step",{attrs:{title:"完成"}})],1),a("el-form",{ref:"addGoodsFormRef",attrs:{model:e.addGoodsForm,rules:e.addGoodsRules,"label-width":"100px","label-position":"top"}},[a("el-tabs",{attrs:{"tab-position":"left","before-leave":e.beforeTabLeave},on:{"tab-click":e.tabClick},model:{value:e.activeStep,callback:function(t){e.activeStep=t},expression:"activeStep"}},[a("el-tab-pane",{attrs:{label:"基本信息",name:"0"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:e.addGoodsForm.goods_name,callback:function(t){e.$set(e.addGoodsForm,"goods_name",t)},expression:"addGoodsForm.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{attrs:{type:"number"},model:{value:e.addGoodsForm.goods_price,callback:function(t){e.$set(e.addGoodsForm,"goods_price",t)},expression:"addGoodsForm.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight",type:"number"}},[a("el-input",{model:{value:e.addGoodsForm.goods_weight,callback:function(t){e.$set(e.addGoodsForm,"goods_weight",t)},expression:"addGoodsForm.goods_weight"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number",type:"number"}},[a("el-input",{model:{value:e.addGoodsForm.goods_number,callback:function(t){e.$set(e.addGoodsForm,"goods_number",t)},expression:"addGoodsForm.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{options:e.cateList,props:e.cateProps,clearable:""},model:{value:e.addGoodsForm.goods_cat,callback:function(t){e.$set(e.addGoodsForm,"goods_cat",t)},expression:"addGoodsForm.goods_cat"}})],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},e._l(e.manyData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,(function(e,t){return a("el-checkbox",{key:t,attrs:{label:e,border:""}})})),1)],1)})),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},e._l(e.onlyData,(function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)})),1),a("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[a("el-upload",{attrs:{action:"http://127.0.0.1:8888/api/private/v1/upload","on-preview":e.handlePreview,"on-remove":e.handleRemove,"on-success":e.handleSuccess,headers:e.headers,"list-type":"picture"}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),a("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[a("quill-editor",{ref:"myQuillEditor",model:{value:e.addGoodsForm.goods_introduce,callback:function(t){e.$set(e.addGoodsForm,"goods_introduce",t)},expression:"addGoodsForm.goods_introduce"}}),a("el-button",{staticClass:"add-btn",attrs:{type:"primary"},on:{click:e.add}},[e._v("添加商品")])],1)],1)],1)],1),a("el-dialog",{attrs:{title:"图片预览",visible:e.previewDialogVisible,width:"45%"},on:{"update:visible":function(t){e.previewDialogVisible=t}}},[a("img",{staticClass:"preview-img",attrs:{src:e.previewURL}})])],1)},o=[],s=(a("c740"),a("a15b"),a("a434"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),i=a("735b"),n={name:"Add",data:function(){return{activeStep:"0",addGoodsForm:{goods_name:"",goods_cat:[],goods_price:"",goods_number:"",goods_weight:"",goods_introduce:"",pics:[],attrs:[]},addGoodsRules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}]},cateList:[],cateProps:{expandTrigger:"hover",value:"cat_id",label:"cat_name",children:"children"},manyData:[],onlyData:[],previewURL:"",headers:{Authorization:window.sessionStorage.getItem("token")},previewDialogVisible:!1}},computed:{cateId:function(){if(this.addGoodsForm.goods_cat)return this.addGoodsForm.goods_cat[2]}},methods:{getCategories:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["w"])();case 2:if(t=e.sent,200===t.meta.status){e.next=5;break}return e.abrupt("return");case 5:this.cateList=t.data;case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),beforeTabLeave:function(e,t){if(0===this.addGoodsForm.goods_cat.length)return this.$msg.error("请先选择商品分类"),!1},tabClick:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("1"!==this.activeStep){e.next=10;break}return e.next=3,Object(i["v"])(this.cateId,"many");case 3:if(t=e.sent,200===t.meta.status){e.next=6;break}return e.abrupt("return");case 6:t.data.forEach((function(e){e.attr_vals=0===e.attr_vals.length?[]:e.attr_vals.split(" ")})),this.manyData=t.data,e.next=17;break;case 10:if("2"!==this.activeStep){e.next=17;break}return e.next=13,Object(i["v"])(this.cateId,"only");case 13:if(a=e.sent,200===a.meta.status){e.next=16;break}return e.abrupt("return");case 16:this.onlyData=a.data;case 17:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handlePreview:function(e){this.previewURL=e.response.data.url,this.previewDialogVisible=!0},handleRemove:function(e){var t=this.addGoodsForm.pics.findIndex((function(t){return t.pic==e.response.data.tmp_path}));this.addGoodsForm.pics.splice(t,1)},handleSuccess:function(e){var t={pic:e.data.tmp_path};this.addGoodsForm.pics.push(t)},add:function(){var e=this;this.$refs.addGoodsFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){var r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return",e.$msg.error("请填写必填项"));case 2:return r=JSON.parse(JSON.stringify(e.addGoodsForm)),r.goods_cat=r.goods_cat.join(","),e.manyData.forEach((function(e){var t={attr_id:e.attr_id,attr_value:e.attr_vals};r.attrs.push(t)})),e.onlyData.forEach((function(e){var t={attr_id:e.attr_id,attr_value:e.attr_vals};r.attrs.push(t)})),t.next=8,Object(i["b"])(r);case 8:if(o=t.sent,201===o.meta.status){t.next=11;break}return t.abrupt("return",e.$msg.error("商品添加失败"));case 11:e.$msg.success("商品添加成功"),e.$router.push("/goods");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}},created:function(){this.getCategories()},deactivated:function(){this.$refs.addGoodsFormRef.resetFields()}},d=n,l=(a("119b"),a("2877")),c=Object(l["a"])(d,r,o,!1,null,"2677e3c7",null);t["default"]=c.exports},a434:function(e,t,a){"use strict";var r=a("23e7"),o=a("23cb"),s=a("a691"),i=a("50c4"),n=a("7b0b"),d=a("65f0"),l=a("8418"),c=a("1dde"),u=Math.max,p=Math.min,m=9007199254740991,f="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!c("splice")},{splice:function(e,t){var a,r,c,b,g,h,v=n(this),_=i(v.length),w=o(e,_),x=arguments.length;if(0===x?a=r=0:1===x?(a=0,r=_-w):(a=x-2,r=p(u(s(t),0),_-w)),_+a-r>m)throw TypeError(f);for(c=d(v,r),b=0;b<r;b++)g=w+b,g in v&&l(c,b,v[g]);if(c.length=r,a<r){for(b=w;b<_-r;b++)g=b+r,h=b+a,g in v?v[h]=v[g]:delete v[h];for(b=_;b>_-r+a;b--)delete v[b-1]}else if(a>r)for(b=_-r;b>w;b--)g=b+r-1,h=b+a-1,g in v?v[h]=v[g]:delete v[h];for(b=0;b<a;b++)v[b+w]=arguments[b+2];return v.length=_-r+a,c}})},c740:function(e,t,a){"use strict";var r=a("23e7"),o=a("b727").findIndex,s=a("44d2"),i="findIndex",n=!0;i in[]&&Array(1)[i]((function(){n=!1})),r({target:"Array",proto:!0,forced:n},{findIndex:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),s(i)},fdbc:function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-56534662.e436a925.js.map