Ext.util.JSON=new (function(){
var _1={}.hasOwnProperty?true:false;
var _2=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _3=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _4=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":Ext.util.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _5=function(o){
return "\""+o.getFullYear()+"-"+_2(o.getMonth()+1)+"-"+_2(o.getDate())+"T"+_2(o.getHours())+":"+_2(o.getMinutes())+":"+_2(o.getSeconds())+"\"";
};
this.encode=function(o){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _4(o);
}else{
if(o instanceof Date){
return _5(o);
}else{
if(typeof o=="string"){
return _3(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
var a=["{"],b,i,v;
for(i in o){
if(!_1||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encode(i),":",v===null?"null":this.encode(v));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
};
this.decode=function(_6){
return eval("("+_6+")");
};
})();
Ext.encode=Ext.util.JSON.encode;
Ext.decode=Ext.util.JSON.decode;
var rabbit={result:{},parameters:{},util:{bind:function(_7,_8){
return function(){
try{
return _7.apply(_8,arguments);
}
catch(e){
console.error(e);
return undefined;
}
};
},appendVersionQuery:function(_9){
return _9+"?v="+rabbit.parameters.codeVersion;
},userRole:null},logLevel:"debug"};
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver"};
rabbit.eventDispatcher=function _returnEventDispatcher(){
var _a={};
return {registerOnEvent:function registerOnEvent(_b,_c,_d,_e){
if(typeof _b!=="string"||typeof _c!=="function"||typeof _d!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_a.hasOwnProperty(_b)){
_a[_b]=[];
}
var _f={"callback":_c,"thisArg":_d,"includeEventType":false};
if(_e){
_f.includeEventType=true;
}
_a[_b].push(_f);
},raiseEvent:function raiseEvent(_10){
var _11=_a[_10];
if(typeof _11==="undefined"){
console.warn("No handler for invoked eventType "+_10);
return;
}
for(var i=0;i<_11.length;i++){
try{
var _12=_11[i].callback;
var _13=_11[i].thisArg;
var _14=_11[i].includeEventType;
if(typeof _12==="function"){
var _15=Array.prototype.slice.call(arguments);
if(!_14){
_15.shift();
}
_12.apply(_13,_15);
}
}
catch(e){
console.error(e);
}
}
}};
}();
rabbit.result.manager={currentPageId:"no",pageNames:null,datePickerClicked:false,customDatepickerObjects:[],init:function(_16,_17,_18,_19){
try{
rabbit.common.i18n.init({lang:_19});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_17;
rabbit.browser=_18;
try{
var _1a=document.getElementById("pageData").firstChild;
var _1b="";
while(_1a!=null){
_1b+=_1a.nodeValue;
_1a=_1a.nextSibling;
}
this.pageData=Ext.util.JSON.decode(_1b).pages;
var _1c=document.getElementById("pageNames").firstChild;
if((_1c!=null)&&(_1c.nodeValue!="__pageNames__")){
_1b="";
while(_1c!=null){
_1b+=_1c.nodeValue;
_1c=_1c.nextSibling;
}
this.pageNames=Ext.util.JSON.decode(_1b);
}
var _1d=document.getElementsByTagName("div");
this.layers=new Array();
for(var i=0;i<_1d.length;i++){
if(_1d[i].getAttribute("name")=="layer"){
this.layers.push(_1d[i]);
}
}
this._initEventHandlers();
this._initPlugins();
if(_16!=undefined){
rabbit.facade.loadPage(_16);
}
}
catch(e){
console.error(e);
}
rabbit.result.manager._hackToMakeArrowsWork();
},_forceRedraw:function(){
var _1e=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _1f=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_1e||_1f){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
},_initEventHandlers:function _initEventHandlers(){
$(document).bind(rabbit.events.click,this._handleDomEvent(rabbit.events.click));
},_initPlugins:function _initPlugins(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _20=rabbit.facade._availablePlugins[i];
_20.init.apply(_20,_20._initialArguments);
}
catch(e){
console.error(e);
}
}
},_handleDomEvent:function _handleDomEvent(_21){
return function(_22){
rabbit.eventDispatcher.raiseEvent(_21,_22);
};
},setClass:function(_23,_24){
_23.setAttribute("class",_24);
},showPage:function(_25){
try{
if(_25==""){
return;
}
if(_25==this.currentPageId){
return;
}
var _26=this.pageData[_25];
if(_26==undefined){
if(_25.indexOf("://")!=-1){
window.location.href=_25;
}else{
window.location.href="http://"+_25;
}
return;
}
var id;
for(var i=0;i<this.layers.length;i++){
id=this.layers[i].getAttribute("id");
if(_26[id]==true){
this.layers[i].style.left="0px";
this.layers[i].style.top="0px";
}else{
this.layers[i].style.left="-3000px";
this.layers[i].style.top="-3000px";
}
}
var _27=selectorUtil.getElementsByName("pageLayer");
for(var i=0;i<_27.length;i++){
if(_27[i].id==(_25+"-layer")){
_27[i].style.left="0px";
_27[i].style.top="0px";
}else{
_27[i].style.left="-3000px";
_27[i].style.top="-3000px";
}
}
this.changeTab(_25);
rabbit.eventDispatcher.raiseEvent(rabbit.events.pageLoaded,_26);
}
catch(e){
console.error(e);
}
},changeTab:function changeTab(_28){
var _29=selectorUtil.getElementsByName("target"+this.currentPageId);
for(var i=0;i<_29.length;i++){
if(_29[i].getAttribute("class")){
this.setClass(_29[i],_29[i].getAttribute("class").replace(/\bselected\b/,""));
}else{
this.setClass(_29[i],"");
}
}
_29=selectorUtil.getElementsByName("target"+_28);
for(i=0;i<_29.length;i++){
if(_29[i].getAttribute("class")){
this.setClass(_29[i],"selected "+_29[i].getAttribute("class"));
}else{
this.setClass(_29[i],"selected");
}
}
this.currentPageId=_28;
},menuExternalLinkCallback:function(_2a){
if(_2a.indexOf("://")==-1){
_2a="http://"+_2a;
}
window.location.href=_2a;
},menuClick:function(a,b,_2b){
if(rabbit.result.manager.pageData[_2b]!=null){
if(rabbit.result.manager.pageNames==null){
if(rabbit.result.manager.currentPageId!=_2b){
var url=window.location.href;
url=url.replace(rabbit.result.manager.currentPageId,_2b);
window.location.href=url;
}
}else{
if(rabbit.result.manager.pageNames[_2b]!=null){
url=window.location.href;
url=url.substr(0,url.lastIndexOf("/"));
window.location.href=url+"/"+rabbit.result.manager.pageNames[_2b];
}
}
}else{
rabbit.result.manager.menuExternalLinkCallback(_2b);
}
},onSvgBlur:function(id){
rabbit.facade.raiseEvent(rabbit.events.svgBlur,id);
},onPropertyChanged:function(id,_2c){
rabbit.facade.raiseEvent(rabbit.events.propertyChange,id,_2c);
},onSvgFocus:function(id){
rabbit.facade.raiseEvent(rabbit.events.svgFocus,id);
},onSvgChanged:function(id,_2d){
rabbit.facade.raiseEvent(rabbit.events.checkBoxClicked,id,_2d);
},fireMouseOn:function(id){
rabbit.facade.fireMouseOn(id);
},setupDatepicker:function(id){
rabbit.stencils.datepicker.setupDatepicker(id);
},setupMenu:function(id,_2e){
rabbit.stencils.menu.setupMenu(id,_2e);
},setFill:function(id,_2f){
rabbit.stencils.stencil.setFill(id,_2f);
},setupSlider:function(id,_30,_31,_32,pos){
rabbit.stencils.slider.setupSlider(id,_30,_31,_32,pos);
}};
rabbit.facade=function _returnFacade(){
var _33=rabbit.eventDispatcher;
return {_availablePlugins:[],vml:false,registerPlugin:function registerPlugin(_34,_35){
try{
var _36=Array.prototype.slice.call(arguments);
_36.shift();
_34._initialArguments=_36;
this._availablePlugins.push(_34);
}
catch(e){
console.log(e);
}
},registerOnEvent:function registerOnEvent(_37,_38,_39){
try{
return _33.registerOnEvent.apply(_33,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},registerOnEvents:function registerOnEvents(_3a,_3b,_3c){
for(var i=0;i<_3a.length;i++){
console.debug("Registering a handler for "+_3a[i]);
try{
_33.registerOnEvent(_3a[i],_3b,_3c,true);
}
catch(e){
console.error(e);
}
}
},raiseEvent:function raiseEvent(_3d,_3e){
console.debug("Raising a "+arguments[0]+" event");
try{
return _33.raiseEvent.apply(_33,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_3f){
var _40=document.getElementById(_3f);
if(_40==null){
return;
}
console.debug("Forwarding a click event to "+_3f);
_40.click();
_40.focus();
},loadPage:function loadPage(_41){
return rabbit.result.manager.showPage(_41);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+rabbit.result.manager.currentPageId;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
}};
}();
if(typeof (console)==="undefined"){
Console=function(){
this.log=function(){
};
this.warn=function(){
};
this.error=function(){
};
this.debug=function(){
};
};
console=new Console();
}else{
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
}
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/softwaredreieck.de.*/))){
console.error=function(e){
var _42={"message":e.name+": "+e.message,"url":e.fileName,"line":e.lineNumber,"stack":e.stack,"userAgent":navigator.userAgent,"pageId":rabbit.result.manager.currentPageId};
jQuery.post(rabbit.result.manager.baseUrl+rabbit.result.manager.currentPageId+"/errorreport","data="+Ext.util.JSON.encode(_42));
};
}
if(!rabbit.plugins){
rabbit.plugins={};
}
rabbit.plugins.background=function(){
var _43=rabbit.facade;
return {init:function init(){
_43.registerOnEvent(rabbit.events.pageLoaded,this.adjustBackgroundImage,this);
},adjustBackgroundImage:function adjustBackgroundImage(_44){
var _45=document.getElementById("borderDiv");
_45.style.width=_44.width+"px";
_45.style.height=_44.height+"px";
var _46=document.getElementById("background");
_46.setAttribute("width",_44.width);
_46.setAttribute("height",_44.height);
_46.setAttribute("style","width:"+_44.width+"px;height:"+_44.height+"px;");
this._replaceBackgroundImage(_44);
},_replaceBackgroundImage:function _replaceBackgroundImage(_47){
if(!_43.vml){
var _48=document.getElementById("background");
var _49=_48.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_49.setAttribute("width",_47.width);
_49.setAttribute("height",_47.height);
if(_47.image!==""){
_49.setAttribute("display","inherit");
_49.setAttributeNS("http://www.w3.org/1999/xlink","href",_47.image);
}else{
_49.setAttribute("display","none");
_49.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
var _48=document.getElementById("background");
var _49=document.createElement("img");
_49.style.width="";
_49.style.height="";
_49.setAttribute("src",_47.image.replace("_(d)+Z",""));
_48.replaceChild(_49,_48.firstChild);
if(_47.image==""){
_49.style.display="none";
}else{
_49.style.display="inline";
this._adjustBackgroundImgSize(_47.width,_47.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_4a,_4b){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_4a+", "+_4b+");",100);
return;
}
var _4c=document.images[0].width;
var _4d=document.images[0].height;
if(_4c/_4d>_4a/_4b){
document.images[0].width=_4a;
document.images[0].height=_4d*_4a/_4c;
}else{
document.images[0].width=_4c*_4b/_4d;
document.images[0].height=_4b;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_4e){
_4e=_4e.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_4e);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _4f=600;
var _50=".accordion-header";
var _51=".accordion-content";
var _52="accordion-active";
var _53=30;
var _54=function(_55){
var _56=$(_55).parents().children(_50);
var _57=_56.index(_55);
return _57;
};
var _58=function(_59){
return "#"+$(_59).parent().parent().attr("id");
};
var _5a=function(_5b){
return $("#"+_5b).find(_50).length;
};
var _5c=function(_5d,_5e,_5f){
var _60=_50+"[id^='"+_5d+"-']";
var _61=$("#"+_5d).find(_60).length;
$("#"+_5d).children().children().children(".iframe").css("position","relative").css("left","0px").css("top","0px").css("width",_5e+"px").css("height",(_5f-_61*_53-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_62,_63,_64){
var _65=_5a(id);
if(_64<1){
_64=1;
}
if(_64>_65){
_64=_65;
}
_64--;
$("#"+id).find(_50).click({"accordionObject":this},this.raiseClickCallback);
_5c(id,_62,_63);
this.showTab(id,_64,false);
},showTab:function(id,_66,_67){
this._accordions[id]=_66;
if(_67){
$("#"+id).find(_51).slideUp(_4f);
}else{
$("#"+id).find(_51).hide();
}
var _68=$("#"+id).find(_50).removeClass(_52)[_66];
$(_68).addClass(_52).next().slideDown(_4f,function onCompleteCallback(){
if($.browser.msie){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(_69,_6a){
var _6b=_54(_6a);
var _6c=_58(_6a);
if(_69._accordions[_6c]===_6b){
return;
}
_69.showTab(_6c,_6b,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _6d=rabbit.facade;
return {init:function init(){
_6d.registerOnEvent(rabbit.events.buttonClicked,this.onClick,this);
_6d.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_6d.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onClick:function onClick(_6e){
location.href=_6e;
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _6f=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_70,_71){
console.log("Click to checkbox "+_70);
var _72=document.getElementById(_70);
if(_72==null){
return true;
}
var _73=document.getElementById(_71);
if(_73==null){
return true;
}
if(!_72.checked){
_73.setAttribute("visibility","hidden");
}else{
_73.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.clickarea=function(){
var _74=rabbit.facade;
return {init:function init(){
_74.registerOnEvent(rabbit.events.clickAreaClicked,this.onClick,this);
},onClick:function onClick(_75){
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.clickarea);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _76=rabbit.facade;
var _77=[];
var _78=false;
var _79=function(id){
for(var i=0;i<_77.length;i++){
var _7a=_77[i];
if(_7a.calendarId==id){
return _7a;
}
}
return null;
};
var _7b=function(id,_7c,_7d){
var _7e=_79(id);
_7e.calendar.setYear(_7c);
_7e.calendar.setMonth(_7d);
_7e.calendar.render();
};
var _7f=function _hideCalendar(id,_80,_81){
if(_80){
document.getElementById(id+"_input").value=_80;
}
var _82=_79(id);
_82.calendarVisible=false;
var svg=document.getElementById(_82.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_82.calendar.hide();
_82.overlay.hide();
_78=false;
};
var _83=function _showCalendar(id,_84){
var _85=_79(id);
_85.calendarVisible=true;
_85.calendar.show();
_85.overlay.show();
_78=true;
var svg=document.getElementById(_85.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
};
var _86=function _86(_87){
for(var i=0;i<_87.childNodes.length;i++){
var _88=_87.childNodes[i];
if(_88.nodeType!=1){
continue;
}
if(_88.getAttribute("id")==undefined){
_88.setAttribute("id",_87.getAttribute("id")+"_"+i);
}
arguments.callee(_88);
}
};
var _89=function _89(evt){
if(!evt){
return;
}
if(!_76.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_76.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
},calendarOpen:function(id){
return _78;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _8a=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_8a.render();
var cal=new YAHOO.widget.Calendar(id+"_cal");
var _8b=new Object();
_8b["calendar"]=cal;
_8b.overlay=_8a;
_8b["calendarId"]=id;
_8b["calendarVisible"]=false;
_77.push(_8b);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _8c=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_8b.calendarId,_8c,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_8a.hide();
var _8d=id+"_cal";
_86(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var _8e=cal.cfg.getProperty("pagedate");
var _8f=_8e.getUTCFullYear();
var _90=_8e.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_8b.calendarId,_8f,_90,rabbit.util.userRole,"displayMouseClick");
_86(document.getElementById(_8d));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_8b);
YAHOO.util.Event.addListener(id+"_input","click",rabbit.util.bind(this.toggleCalendarCallback,this),_8b);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_8b);
YAHOO.util.Event.addListener(id+"_ov","click",_89);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_83,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_7f,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_7b,this);
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
if(this.calendarOpen){
for(var i=0;i<_77.length;i++){
var _91=_77[i];
if(_91.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_91.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_92){
if(!_92.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_92.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_92.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_89(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.menu=function(){
var _93=[];
var _94=function(_95){
for(var i=0;i<_93.length;i++){
var _96=_93[i];
if(_96.domId==_95){
return _96;
}
}
return null;
};
var _97=function(_98,_99){
var _9a=_94(_98);
if(_9a){
for(var i=0;i<_99.length;i++){
var _9b=_9a.getSubmenus();
for(var j=0;j<_9b.length;j++){
if(_9b[j].id==_99[i]){
_9a=_9b[j];
}
}
}
}
return _9a;
};
var _9c=function(_9d,_9e,_9f){
if(_9f!=null&&_9f!=rabbit.util.userRole){
var _a0=_97(_9d,_9e);
if(_a0){
_a0.show();
}
}
};
var _a1=function(_a2,_a3,_a4){
if(_a4!=null&&_a4!=rabbit.util.userRole){
var _a5=_97(_a2,_a3);
if(_a5){
_a5.hide();
}
}
};
var _a6=function(obj){
var _a7=obj;
var _a8=[];
while(_a7.getRoot()!=_a7){
_a8.push(_a7.id);
_a7=_a7.getRoot();
}
var _a9=_a7.domId;
var _aa=[];
for(var i=_a8.length-1;i>=0;i--){
_aa.push(_a8[i]);
}
return [_a9,_aa];
};
var _ab=function(){
var _ac=_a6(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_ac[0],_ac[1],rabbit.util.userRole);
};
var _ad=function(){
var _ae=_a6(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_ae[0],_ae[1],rabbit.util.userRole);
};
return {init:function init(){
},setupMenu:function setupMenu(id,_af,_b0){
try{
_af=_af.replace(/&quot;/g,"\"");
_af=Ext.util.JSON.decode(_af);
if(_b0=="vertical"){
var _b1=new YAHOO.widget.Menu(id+"-bar",{itemdata:_af,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
var _b1=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_af});
}
_b1.render(id);
_b1.show();
_b1.domId=id;
_93.push(_b1);
_b1.subscribe("show",_ab);
_b1.subscribe("hide",_ad);
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_9c,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_a1,this);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _b2=rabbit.facade;
return {init:function init(){
_b2.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
},getAllRadioButtons:function getAllRadioButtons(){
var _b3=[];
var _b4=document.getElementsByTagName("input");
for(var i=0;i<_b4.length;i++){
if(_b4[i].type==="radio"){
_b3.push(_b4[i]);
}
}
return _b3;
},onClick:function onClick(_b5,_b6){
console.log("Click to radioButton "+_b5);
var _b7=this.getAllRadioButtons();
for(var i=0;i<_b7.length;i++){
var _b8=_b7[i];
var _b9=_b8.getAttribute("id")+"_svgChecked";
var _ba=document.getElementById(_b9);
if(_ba!=null){
if(!_b8.checked){
if(rabbit.facade.vml){
_ba.style.setAttribute("display","none");
}else{
_ba.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_ba.style.removeAttribute("display");
}else{
_ba.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _bb={};
var _bc=function(_bd,_be,_bf){
var _c0=_bb[_bd];
if(!_c0){
return;
}
if(_bf!=null&&_bf!=rabbit.util.userRole){
_c0.setValue(_be);
}
};
return {init:function init(){
},setupSlider:function(id,_c1,_c2,_c3,_c4){
try{
_c1=parseInt(_c1);
_c3=parseInt(_c3);
if(_c4){
_c4=parseInt(_c4)*2;
}else{
_c4=0;
}
var _c5=(_c3-(_c3)/21)/10;
var _c6=_c5*_c1;
var _c7=_c3-_c6;
var _c8=null;
if(_c2=="vertical"){
_c8=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_c7,_c6,_c5);
}else{
_c8=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_c7,_c6,_c5);
}
_bb[id]=_c8;
_c8.animate=false;
_c8.subscribe("change",function(){
var _c9=Math.round(this.getValue()+_c4);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_c9,rabbit.util.userRole);
});
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_bc,this);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _ca=rabbit.facade;
var _cb=function _cb(_cc,_cd){
var _ce=document.getElementById(_cc);
if(_ce){
_ce.style.setProperty("fill",_cd,"");
}
};
var _cf=function _cf(_d0,_d1){
var _d2,_d3=document.getElementById(_d0);
if(_d3){
if(_d1=="url(#sketchedHover)"){
_d2=_d3.ownerDocument.createElement("v:fill");
_d2.setAttribute("src","/rabbit/result/icons/sketchedFilledButton.png");
_d2.setAttribute("type","tile");
_d2.setAttribute("origin","0.1,0.1");
_d2.setAttribute("size","175pt,75pt");
_d2.setAttribute("on","true");
_d3.getElementsByTagName("fill")[0].parentNode.replaceChild(_d2,_d3.getElementsByTagName("fill")[0]);
}else{
_d2=_d3.ownerDocument.createElement("v:fill");
_d2.setAttribute("color",_d1);
_d2.setAttribute("on"," true");
_d3.getElementsByTagName("fill")[0].parentNode.replaceChild(_d2,_d3.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_ca.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_ca.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_ca.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_d4){
if(rabbit.facade.vml){
_cf(id,_d4);
}else{
_cb(id,_d4);
}
},onSvgFocus:function onSvgFocus(_d5){
var _d6;
if(_d5 instanceof Array){
for(var key in _d5){
_d6=document.getElementById(_d5[key]);
if(_d6!=null){
_d6.setAttribute("class","svg_selected_element");
}
}
}else{
_d6=document.getElementById(_d5);
if(_d6!=null){
_d6.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_d7){
var _d8;
if(_d7 instanceof Array){
for(var key in _d7){
_d8=document.getElementById(_d7[key]);
if(_d8!=null){
_d8.setAttribute("class","svg_unselected_element");
}
}
}else{
_d8=document.getElementById(_d7);
if(_d8!=null){
_d8.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_d9,_da){
var _db=document.getElementById(_da);
if(_db==null){
return true;
}
console.debug("Property changed on "+_d9);
if(event.srcElement[event.propertyName]==false){
_db.style.setAttribute("display","none");
}else{
_db.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tabButton=function(){
var _dc=rabbit.facade;
var _dd=function _dd(_de,_df){
var _e0=document.getElementById(_de);
if(_e0){
_e0.className=_df;
}
};
var _e1=function _e1(_e2,_e3){
var _e4=document.getElementById(_e2);
if(_e4){
_e4.style.setProperty("fill",_e3,"");
}
};
var _e5=function _e5(_e6,_e7){
var _e8,_e9=document.getElementById(_e6);
if(_e9){
if(_e7=="url(#sketchedHover)"){
_e8=_e9.ownerDocument.createElement("v:fill");
_e8.setAttribute("src","/rabbit/result/icons/sketchedFilledButton.png");
_e8.setAttribute("type","tile");
_e8.setAttribute("origin","0.1,0.1");
_e8.setAttribute("size","175pt,75pt");
_e8.setAttribute("on","true");
_e9.getElementsByTagName("fill")[0].parentNode.replaceChild(_e8,_e9.getElementsByTagName("fill")[0]);
}else{
_e8=_e9.ownerDocument.createElement("v:fill");
_e8.setAttribute("color",_e7);
_e8.setAttribute("on"," true");
_e9.getElementsByTagName("fill")[0].parentNode.replaceChild(_e8,_e9.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_dc.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_dc.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_dc.registerOnEvent(rabbit.events.loadPage,this.loadPage,this);
},loadPage:function loadPage(_ea){
_dc.loadPage(_ea);
},handleMouseOver:function handleMouseOut(id,_eb){
if(rabbit.prototypeType=="IOS"&&(rabbit.browser=="mobile"||rabbit.browser=="iphone")){
return;
}
if(typeof id!=="string"||(_eb!=="result"&&_eb!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(_eb==="sketched"){
_dd(id+"_div_small","ClickableSketchHover");
_dd(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_e5(id+"_big_path","#EEEEEE");
_e5(id+"_small_path","#EEEEEE");
}else{
_e1(id+"_big_path","#EEEEEE");
_e1(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,_ec){
if(rabbit.prototypeType=="IOS"&&(rabbit.browser=="mobile"||rabbit.browser=="iphone")){
return;
}
if(typeof id!=="string"||(_ec!=="result"&&_ec!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(_ec==="sketched"){
_dd(id+"_div_small","ClickableSketch");
_dd(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_e5(id+"_big_path","white");
_e5(id+"_small_path","white");
}else{
_e1(id+"_big_path","white");
_e1(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _ed=rabbit.facade;
return {init:function init(){
_ed.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
$("#"+id).toggleClass("switch-selected");
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iframe=function(){
var _ee=rabbit.facade;
var _ef=0;
var _f0=0;
var _f1=0;
var _f2=0;
return {init:function init(){
if(navigator.userAgent.toLowerCase().indexOf("mobile")==-1){
return;
}
$(".iframe").each(function(_f3,_f4){
$(_f4).bind("touchstart",function(){
rabbit.stencils.iframe.touchStart(event);
});
});
},touchStart:function touchStart(evt){
if(evt.targetTouches.length>1){
return;
}
var _f5=$(evt.currentTarget);
var _f6=evt.targetTouches[0];
_f5.bind("touchmove",function(){
rabbit.stencils.iframe.touchMove(event);
});
_f5.bind("touchend",function(){
rabbit.stencils.iframe.touchEnd(event);
});
_ef=_f6.pageX;
_f0=_f6.pageY;
_f1=_f5.scrollLeft();
_f2=_f5.scrollTop();
evt.preventDefault();
},touchMove:function touchStart(evt){
var _f7=$(evt.currentTarget);
var _f8=evt.targetTouches[0];
_f7.scrollLeft(_ef-_f8.pageX+_f1);
_f7.scrollTop(_f0-_f8.pageY+_f2);
},touchEnd:function touchStart(evt){
var _f9=$(evt.currentTarget);
_f9.unbind("touchmove");
_f9.unbind("touchend");
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iframe);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _fa="rating_white.png";
var _fb="rating_black.png";
var _fc=rabbit.facade;
var _fd=new Array();
var _fe=function(id){
if(_fd[id]){
return parseInt(_fd[id]);
}
return 0;
};
var _ff=function(id,_100){
_fd[id]=_100;
};
var _101=function(id,_102){
var i=1;
_102=parseInt(_102);
while(true){
var _103=document.getElementById(id+"-"+i);
if(_103==null){
break;
}
var _104=_103.getAttribute("src");
_104=_104.substring(0,_104.lastIndexOf("/")+1);
if(i>=_102+1){
_104+=_fa;
}else{
_104+=_fb;
}
_103.setAttribute("src",_104);
i++;
}
};
return {init:function init(){
_fc.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_fc.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_fc.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_105){
_ff(id,_105);
},onClick:function onClick(id,_106){
_ff(id,_106);
_101(id,_106);
},onMouseOut:function onMouseOut(id){
_101(id,_fe(id));
},onMouseOver:function onMouseOver(id,_107){
_101(id,parseInt(_107));
},checkMouseOutDiv:function(id,_108){
if(_108.relatedTarget){
return _108.relatedTarget.id.indexOf(id)==-1;
}else{
return _108.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _109=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_10a){
try{
_10a=_10a.replace(/&quot;/g,"\"");
_10a=Ext.util.JSON.decode(_10a);
this._trees[id]=_10a;
}
catch(e){
console.error(e);
}
},clickCallback:function(_10b,sth){
var _10c=document.getElementById(_10b+"-buttonvline");
var _10d="open";
if(_10c){
if(_10c.style.display=="none"){
_10d="closed";
}
if(_10d=="closed"){
_10c.style.display="";
}else{
_10c.style.display="none";
}
var elem=document.getElementById(_10b+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_10d=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_10b,_10d);
}
}
},scrollCallback:function(id,_10e,_10f){
var _110=document.getElementById(id);
_110.scrollTop=_10e;
_110.scrollLeft=_10f;
},update:function(_111,_112){
this.setStatus(_111,_112);
this.recalculateLineLengths(_111);
},setStatus:function(_113,_114){
var tree=this.getTree(_113);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_113),tree,_113,_114);
}
},setStatusOnSubtree:function(_115,tree,_116,_117){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _118=_115+"-"+i;
if(_118==_116){
node.treeItemType=(_117=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_118,node.subtree,_116,_117)){
return true;
}
}
}
}
},recalculateLineLengths:function(_119){
var tree=this.getTree(_119);
if(tree){
var _11a=this.getTreeName(_119);
var _11b=document.getElementById(_11a+"-openingvline");
this.traverseTree(_11a,_11b,tree,null);
}
},traverseTree:function(_11c,node,_11d,_11e){
var _11f=false;
if(_11e==null){
_11e={0:0,1:0};
_11f=true;
}
var rows=0;
var _120=0;
var _121=0;
var _122=0;
_11e[0]=0;
_11e[1]=0;
if(!_11f){
rows++;
}
if(_11d){
for(var i=0;i<_11d.length;i++){
var _123=_11d[i];
var _124=null;
if(_123.subtree){
_124=_123.subtree;
}
this.traverseTree(_11c+"-"+i,_123,_124,_11e);
_121=_120+1;
_120=_120+_11e[0];
_122=_122+_11e[1];
}
}
var _125=null;
if(_11f){
_125=node;
}else{
_125=document.getElementById(_11c+"-openingvline");
}
if(_125){
var _126=_125.parentNode;
_126.style.height=""+(_109*_120)+"px";
var _127=(_121-_122)*_109;
_125.style.top=""+_127+"px";
}else{
}
if(_11f||"+"==node.treeItemType){
_11e[0]=rows+_120;
}else{
_11e[0]=rows;
}
_11e[1]=rows+_122;
},getTree:function(_128){
if(_128){
var _129=this.getTreeName(_128);
if(this._trees[_129]){
return this._trees[_129];
}else{
return null;
}
}
},getTreeName:function(_12a){
return _12a.substring(0,_12a.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},init:function(_12b){
this.lang="en";
console.log("init i18n",this.lang,this.translation[this.lang]);
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_12c){
if(_12c){
var _12d=key.toLowerCase();
_12d=_12d.replace(/ /g,"-");
_12d=_12c+"."+_12d;
}else{
var _12d=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
if(rabbit.common.i18n.translation[lang][_12d]){
return rabbit.common.i18n.translation[lang][_12d];
}
return key;
},translation:{}};
var t=rabbit.common.i18n.t;

