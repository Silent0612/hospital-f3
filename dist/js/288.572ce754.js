"use strict";(self["webpackChunkhospital_web"]=self["webpackChunkhospital_web"]||[]).push([[288],{288:(t,e,r)=>{r.r(e),r.d(e,{default:()=>p});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"doctors-container"},[e("div",{staticClass:"page-header"},[e("el-page-header",{attrs:{content:t.departmentName+"科室医生"},on:{back:function(e){return t.$router.go(-1)}}})],1),e("el-row",{staticClass:"doctor-list",attrs:{gutter:20}},t._l(t.doctors,(function(r){return e("el-col",{key:r.id,attrs:{span:8}},[e("el-card",{staticClass:"doctor-card"},[e("div",{staticClass:"doctor-avatar"},[r.headimg?e("img",{attrs:{src:r.headimg,alt:"医生头像"}}):e("i",{staticClass:"el-icon-user-solid"})]),e("div",{staticClass:"doctor-info"},[e("h3",{staticClass:"doctor-name"},[t._v(t._s(r.username))]),e("p",{staticClass:"doctor-title"},[t._v(t._s(r.title||"主治医师"))]),e("p",{staticClass:"doctor-exp"},[t._v("从医经验："+t._s(r.experience||"5")+"年")]),e("div",{staticClass:"doctor-comment"},[t._v(t._s(r.comment||"专业医师，热心为患者服务"))]),e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.handleAppointment(r)}}},[t._v("预约挂号")])],1)])],1)})),1)],1)},s=[],n=r(4048),o=r(388);r(4114),r(2892);const c={name:"Doctors",props:{id:{type:Number,required:!0,validator:function(t){return!isNaN(t)}}},data:function(){return{doctors:[],departmentName:""}},created:function(){isNaN(this.id)?(this.$message.error("无效的科室ID"),this.$router.push("/home/departments")):(this.getDoctors(),this.getDepartmentInfo())},methods:{getDoctors:function(){var t=this;return(0,o.A)((0,n.A)().mark((function e(){var r,a;return(0,n.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,console.log("正在获取科室ID为",t.id,"的医生列表"),e.next=4,t.$http.get("/api/empinfo/findByDid",{params:{departmentid:t.id}});case 4:r=e.sent,a=r.data,console.log("API响应:",a),200===a.code?t.doctors=a.data:t.$message.error(a.message||"获取医生列表失败"),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),console.error("获取医生列表错误:",e.t0),t.$message.error("获取医生列表失败，请稍后重试");case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},getDepartmentInfo:function(){var t=this;return(0,o.A)((0,n.A)().mark((function e(){var r,a;return(0,n.A)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,console.log("正在获取科室信息，ID:",t.id),e.next=4,t.$http.get("/api/departmentinfo/findById",{params:{id:t.id}});case 4:r=e.sent,a=r.data,console.log("科室信息响应:",a),200===a.code?t.departmentName=a.data.departmentname:t.$message.error(a.message||"获取科室信息失败"),e.next=14;break;case 10:e.prev=10,e.t0=e["catch"](0),console.error("获取科室信息失败:",e.t0),t.$message.error("获取科室信息失败");case 14:case"end":return e.stop()}}),e,null,[[0,10]])})))()},handleAppointment:function(t){this.$router.push("/home/appointment/".concat(t.id))}}},i=c;var d=r(1656),l=(0,d.A)(i,a,s,!1,null,"9567f9e6",null);const p=l.exports}}]);
//# sourceMappingURL=288.572ce754.js.map