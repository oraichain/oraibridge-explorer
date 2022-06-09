(this["webpackJsonpreact-app"]=this["webpackJsonpreact-app"]||[]).push([[0],{108:function(e,t){},110:function(e,t){},125:function(e,t){},128:function(e,t){},161:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(74),c=a.n(s),o=(a(84),a(85),a(39)),i=a(2),l=a.n(i),u=a(5),m=a(7);function p(){return r.a.createElement("nav",{className:"navbar mt-3"},r.a.createElement("p",{className:"navbar-brand font-weight-bold mb-0",style:{color:"#325fea"}},r.a.createElement("span",{role:"img","aria-label":"dollar-bag"},"\ud83d\udcb0")," ","Oraichain MultiSig Wallet"),r.a.createElement("hr",{className:"border-primary border w-100 border-4"}))}var d=a(25),f=a.n(d);function v(e){var t=e.approvers,a=e.quorum;return r.a.createElement("div",{className:"w-100"},r.a.createElement("h5",{className:"mt-3"},"Approvers Address"),r.a.createElement("table",{className:"my-3 table table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Address"),r.a.createElement("th",null,"Weight"))),r.a.createElement("tbody",null,t.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null," ",e.addr),r.a.createElement("td",null,e.weight))})))),r.a.createElement("div",{className:"mt-3 font-italic"},"Quorum:"," ",r.a.createElement("span",{className:"font-weight-bold"},r.a.createElement(f.a,{src:a,name:!1,displayObjectSize:!1,displayDataTypes:!1,displayArrayKey:!1}))))}var E=a(75),h=a(76),b=a(36),w=a.n(b),g=a(37),_=a(3),y=a(77);function O(){var e=navigator.userAgent||navigator.vendor;return console.log(e),/windows phone/i.test(e)?"Windows Phone":/android/i.test(e)?"Android":/iPad|iPhone|iPod/.test(e)&&!window.MSStream?"iOS":"unknown"}"iOS"===O()||O(),new RegExp("("+["WebView","(iPhone|iPod|iPad)(?!.*Safari)","Android.*(wv|.0.0.0)","Linux; U; Android"].join("|")+")","ig");var T=w.a.message,k=new(function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Simulate";Object(E.a)(this,e),this.requestGetChildKey=function(){var e;e=JSON.stringify({type:"Login"}),window.ReactNativeWebView.postMessage(e)},this.cosmos=new w.a(t.replace(/\/$/,""),a),this.cosmos.setBech32MainPrefix("orai")}return Object(h.a)(e,[{key:"query",value:function(){var e=Object(u.a)(l.a.mark((function e(t,a){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=_.Buffer.from(JSON.stringify(a)).toString("base64"),e.abrupt("return",this.cosmos.get("/wasm/v1beta1/contract/".concat(t,"/smart/").concat(n)));case 2:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"execute",value:function(){var e=Object(u.a)(l.a.mark((function e(t,a){var n,r,s,c,o,i,u,m,p,d,f,v,E=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=E.length>2&&void 0!==E[2]?E[2]:{},r=n.gas,s=n.fees,c=n.funds,o=n.memo,i=n.mode,u=void 0===i?"BROADCAST_MODE_SYNC":i,m=_.Buffer.from(JSON.stringify(a)),e.next=4,this.getChildKey();case 4:if(p=e.sent,"Simulate"!==this.cosmos.chainId){e.next=7;break}return e.abrupt("return",this.cosmos.get("/wasm/contract/".concat(t,"/handle/").concat(m.toString("base64"),"?account=").concat(p)));case 7:if("string"!==typeof p){e.next=13;break}return e.next=10,this.getChildKey(p);case 10:e.t0=e.sent,e.next=14;break;case 13:e.t0=p;case 14:if(d=e.t0){e.next=17;break}return e.abrupt("return");case 17:return f=this.cosmos.getAddress(d),v=this.getHandleMessage(t,m,f,c,o),e.abrupt("return",this.cosmos.submit(d,v,u,s||0,r||2e5));case 20:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getChildKey",value:function(){var e=Object(u.a)(l.a.mark((function e(t,a){var n,r,s,c,o,i,u,m;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.Wallet){e.next=13;break}if(!(null===(n=window)||void 0===n||null===(r=n.ReactNativeWebView)||void 0===r?void 0:r.postMessage)){e.next=7;break}return e.next=4,window.Wasm.getChildKeyFromMobile();case 4:s=e.sent,e.next=10;break;case 7:return e.next=9,window.Wallet.getChildKey(t);case 9:s=e.sent;case 10:return o=(c=s||{}).privateKey,i=c.chainCode,u=c.network,m=Object(g.fromPrivateKey)(_.Buffer.from(o),_.Buffer.from(i),u),e.abrupt("return",m);case 13:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"getChildKeyFromMobile",value:function(){return new Promise((function(e,t){var a=document;"iOS"===O()&&(a=window),a.addEventListener("message",(function(t){var a=JSON.parse(null===t||void 0===t?void 0:t.data)||{},n=a.payload,r=a.type;if("cancel"!==r){if("childKey"===r&&n){var s=JSON.parse(n),c=window.Wasm.formatChildKeyFromMobile(s);e(c)}}else e(null)})),window.Wasm.requestGetChildKey()}))}},{key:"formatChildKeyFromMobile",value:function(e){var t=e.privateKey,a=e.chainCode,n=e.network;return Object(g.fromPrivateKey)(_.Buffer.from(t.data),_.Buffer.from(a.data),n)}},{key:"getAddress",value:function(e){return this.cosmos.getAddress(e)}},{key:"contractAddresses",get:function(){return{marketplace:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_GROUP_ADDRESS:"orai1ktaek2plk63sfxm2eqqaag3e0vsvyvqcvqgqnu",REACT_APP_MULTISIG_ADDRESS:"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",REACT_APP_LCD:"https://testnet-lcd.orai.io",REACT_APP_NETWORK:"Oraichain-testnet",REACT_APP_WALLET_URL:"https://testnet-wallet.web.app"}).REACT_APP_MARKET_PLACE_CONTRACT,ow721:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_GROUP_ADDRESS:"orai1ktaek2plk63sfxm2eqqaag3e0vsvyvqcvqgqnu",REACT_APP_MULTISIG_ADDRESS:"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",REACT_APP_LCD:"https://testnet-lcd.orai.io",REACT_APP_NETWORK:"Oraichain-testnet",REACT_APP_WALLET_URL:"https://testnet-wallet.web.app"}).REACT_APP_NFT_TOKEN_CONTRACT,lock:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_GROUP_ADDRESS:"orai1ktaek2plk63sfxm2eqqaag3e0vsvyvqcvqgqnu",REACT_APP_MULTISIG_ADDRESS:"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",REACT_APP_LCD:"https://testnet-lcd.orai.io",REACT_APP_NETWORK:"Oraichain-testnet",REACT_APP_WALLET_URL:"https://testnet-wallet.web.app"}).REACT_APP_LOCK_CONTRACT_ADDR,auction:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_GROUP_ADDRESS:"orai1ktaek2plk63sfxm2eqqaag3e0vsvyvqcvqgqnu",REACT_APP_MULTISIG_ADDRESS:"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",REACT_APP_LCD:"https://testnet-lcd.orai.io",REACT_APP_NETWORK:"Oraichain-testnet",REACT_APP_WALLET_URL:"https://testnet-wallet.web.app"}).REACT_APP_AUCTION_CONTRACT}}},{key:"statusCode",get:function(){var e=this.cosmos.statusCode;return console.log("status code: ",e),{SUCCESS:e.SUCCESS,NOT_FOUND:e.NOT_FOUND,GENERIC_ERROR:e.GENERIC_ERROR}}},{key:"getSignedData",value:function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getChildKey();case 2:if("string"!==typeof(a=e.sent)){e.next=9;break}return e.next=6,this.getChildKey(a);case 6:e.t0=e.sent,e.next=10;break;case 9:e.t0=a;case 10:if(n=e.t0){e.next=13;break}return e.abrupt("return");case 13:return r=_.Buffer.from(y.sha256.digest(t)),s=_.Buffer.from(this.cosmos.signRaw(r,n.privateKey)),e.abrupt("return",{signature:s.toString("base64"),publicKey:n.publicKey.toString("base64")});case 16:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getHandleMessage",value:function(e,t,a,n,r){var s=n?[{denom:this.cosmos.bech32MainPrefix,amount:n}]:null,c=new T.cosmwasm.wasm.v1beta1.MsgExecuteContract({contract:e,msg:t,sender:a,sent_funds:s}),o=new T.google.protobuf.Any({type_url:"/cosmwasm.wasm.v1beta1.MsgExecuteContract",value:T.cosmwasm.wasm.v1beta1.MsgExecuteContract.encode(c).finish()});return new T.cosmos.tx.v1beta1.TxBody({messages:[o],memo:r})}},{key:"getSendMessage",value:function(e,t,a,n){var r=new T.cosmos.bank.v1beta1.MsgSend({from_address:e,to_address:a,amount:[{denom:this.cosmos.bech32MainPrefix,amount:n.toString()}]}),s=new T.google.protobuf.Any({type_url:"/cosmos.bank.v1beta1.MsgSend",value:T.cosmos.bank.v1beta1.MsgSend.encode(r).finish()});return new T.cosmos.tx.v1beta1.TxBody({messages:[s],memo:t})}},{key:"encodeTxBody",value:function(e){return T.cosmos.tx.v1beta1.TxBody.encode(e).finish()}}]),e}())(null!=="https://testnet-lcd.orai.io"?"https://testnet-lcd.orai.io":"https://lcd.orai.io","Oraichain-testnet"),S=new window.Keystation({keystationUrl:"https://testnet-wallet.web.app",lcd:"https://testnet-lcd.orai.io"});function A(e){var t=e.id,a=Object(n.useState)(!0),s=Object(m.a)(a,2),c=s[0],o=s[1],i=Object(n.useState)([]),p=Object(m.a)(i,2),d=p[0],v=p[1];return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.query("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{list_votes:{proposal_id:t}});case 2:a=e.sent,n=a.data,v(null===n||void 0===n?void 0:n.votes),o(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[t]),!0===c?r.a.createElement("div",{className:"container text-center"},"Loading..."):r.a.createElement(f.a,{src:d,name:!1,collapsed:!0,displayObjectSize:!1,displayDataTypes:!1,displayArrayKey:!1})}window.Wallet=S,window.Wasm=k;var C=a(26),x=a.n(C),N=function(e){var t=e.status,a=e.id,n=e.handler;switch(t){case"open":return r.a.createElement("button",{className:"btn btn-info",onClick:function(){return null===n||void 0===n?void 0:n({type:"vote",id:a})}},"Vote");case"passed":return r.a.createElement("button",{className:"btn btn-warning",onClick:function(){return null===n||void 0===n?void 0:n({type:"execute",id:a})}},"Execute");default:return null}};function P(e){var t=e.transfers,a=e.nextTransfers,n=e.approveTransfer;return r.a.createElement("div",{className:"mt-3 w-100"},r.a.createElement("h5",{className:"text-center mt-3"},"Transfers - Approvals"),r.a.createElement("table",{className:"my-3 table table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Id"),r.a.createElement("th",null,"Amount"),r.a.createElement("th",null,"To"),r.a.createElement("th",null,"Status"),r.a.createElement("th",null,"Action"))),r.a.createElement("tbody",null,t.map((function(e){var t,a=e.id,s=e.msgs,c=e.status,o=null===(t=s[0])||void 0===t?void 0:t.bank.send;if(o){var i=o.to_address,l=o.amount[0],u=l.amount,m=l.denom;return r.a.createElement("tr",{key:a},r.a.createElement("td",null,a),r.a.createElement("td",null,x()(u).dividedBy(1e6).toFormat()," ",r.a.createElement("small",{className:"font-weight-bold"},m.toUpperCase())),r.a.createElement("td",null,i,r.a.createElement("div",{className:"font-italic"},"Votes:"," ",r.a.createElement("span",{className:"font-weight-bold"},r.a.createElement(A,{id:a})))),r.a.createElement("td",null,r.a.createElement("span",{className:"text-capitalize"},c)),r.a.createElement("td",null,r.a.createElement(N,{id:a,status:c,handler:n})))}})))),r.a.createElement("nav",null,r.a.createElement("ul",{className:"pagination"},r.a.createElement("li",{className:"page-item"},r.a.createElement("button",{className:"btn btn-link",onClick:a},"Next")))))}var R=a(27),j=a(38),D=a(78),K=a.n(D);function q(e){var t=e.createTransfer,a=Object(n.useState)(),s=Object(m.a)(a,2),c=s[0],o=s[1],i=K()((function(e){return o(Object(j.a)(Object(j.a)({},c),e))}),500,{trailing:!0}),l=function(e){e.persist(),i(Object(R.a)({},e.target.name,e.target.value))};return r.a.createElement("div",{className:"mt-3"},r.a.createElement("h5",null,"Create Transfer"),r.a.createElement("form",{className:"mt-4 flex-form",onSubmit:function(e){e.preventDefault(),t(c)}},r.a.createElement("div",{className:"input-group mb-2"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("div",{className:"input-group-text"},"Title")),r.a.createElement("input",{name:"title",className:"form-group form-control mb-0",type:"text",placeholder:"Proposal title",onChange:l})),r.a.createElement("div",{className:"input-group mb-2"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("div",{className:"input-group-text"},"Description")),r.a.createElement("textarea",{name:"description",className:"form-group form-control mb-0 fullwidth",type:"text",placeholder:"Proposal description",onChange:l})),r.a.createElement("div",{className:"input-group mb-2"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("div",{className:"input-group-text"},"Orai")),r.a.createElement("input",{name:"amount",className:"form-group form-control mb-0",type:"number",placeholder:"eg: 1.5",onChange:l})),r.a.createElement("div",{className:"input-group mb-2"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("div",{className:"input-group-text"},"To")),r.a.createElement("input",{name:"to",className:"form-group form-control mb-0 w-75",type:"text",placeholder:"orai123xxx...",onChange:l})),r.a.createElement("button",{className:"btn btn-info mt-1 float-right"},"Submit Transfer")))}function L(e){e.approvers,e.quorum;return r.a.createElement("div",{className:"w-100"},r.a.createElement("div",{style:{display:"flex",alignItems:"center"},className:"mt-3"},r.a.createElement("div",{style:{fontWeight:500,lineHeight:1.2,fontSize:"1.25rem"}},"MultiSig Address:"," "),r.a.createElement("div",{style:{marginLeft:4}},"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69")))}function W(e){var t=e.approvers,a=e.quorum,n=e.transfers,s=e.createTransfer,c=e.nextTransfers,o=e.approveTransfer;return r.a.createElement("div",{className:"mx-3 my-5"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-5 "},r.a.createElement(L,null))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-5 "},r.a.createElement(v,{approvers:t,quorum:a})),r.a.createElement("div",{className:"col-lg-7"},r.a.createElement(q,{createTransfer:s}))),r.a.createElement("hr",{className:"border-info border w-100 border-4"}),r.a.createElement(P,{transfers:n,nextTransfers:c,approveTransfer:o}))}function M(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)([]),i=Object(m.a)(c,2),d=i[0],f=i[1],v=Object(n.useState)([]),E=Object(m.a)(v,2),h=E[0],b=E[1],w=Object(n.useState)(!0),g=Object(m.a)(w,2),_=g[0],y=g[1],O=Object(n.useState)(0),T=Object(m.a)(O,2),S=T[0],A=T[1];Object(n.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(){var t,a,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.query("orai1ktaek2plk63sfxm2eqqaag3e0vsvyvqcvqgqnu",{list_members:{}});case 2:return t=e.sent,a=t.data,f(null===a||void 0===a?void 0:a.members),e.next=7,k.query("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{threshold:{}});case 7:n=e.sent,r=n.data,b(r),y(!1);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.query("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{reverse_proposals:{limit:10}});case 2:t=e.sent,a=t.data,s(null===a||void 0===a?void 0:a.proposals),y(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[S]);var C=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.query("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{reverse_proposals:{limit:10,start_before:null===(t=a.slice(-1)[0])||void 0===t?void 0:t.id}});case 2:n=e.sent,r=n.data,s([].concat(Object(o.a)(a),Object(o.a)(null===r||void 0===r?void 0:r.proposals)));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.title,n=t.description,r=t.to,s=t.amount,e.prev=1,y(!0),e.next=5,k.execute("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{propose:{title:a,description:n,msgs:[{bank:{send:{to_address:r,from_address:"orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",amount:[{denom:"orai",amount:new x.a(s).multipliedBy(1e6).toString()}]}}}]}},{gas:5e7});case 5:A(S+1),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),alert(e.t0.message),y(!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(u.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.id,n=t.type,e.prev=1,y(!0),e.t0=n,e.next="execute"===e.t0?6:"vote"===e.t0?9:12;break;case 6:return e.next=8,k.execute("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{execute:{proposal_id:a}});case 8:return e.abrupt("break",12);case 9:return e.next=11,k.execute("orai1c6k42ne0s0wcfal89ply0mekawj8h7hvpwcz69",{vote:{proposal_id:a,vote:"yes"}},{gas:4e6});case 11:return e.abrupt("break",12);case 12:A(S+1),e.next=19;break;case 15:e.prev=15,e.t1=e.catch(1),alert(e.t1.message),y(!1);case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t){return e.apply(this,arguments)}}();return!0===_?r.a.createElement("div",{className:"container text-center"},"Loading..."):r.a.createElement("div",{className:"mx-5"},r.a.createElement(p,null),r.a.createElement(W,{approvers:d,quorum:h,transfers:a,approveTransfer:P,createTransfer:N,nextTransfers:C}))}c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root"))},79:function(e,t,a){e.exports=a(161)},85:function(e,t,a){},96:function(e,t){},98:function(e,t){}},[[79,1,2]]]);
//# sourceMappingURL=main.6517e9a1.chunk.js.map