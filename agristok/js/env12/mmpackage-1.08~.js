/*Oracle Maxymiser Code Begin*/
(function(p){if(p.mmProxyUtilsExecuted){return
}p.mmProxyUtilsExecuted=true;
var h=function(s){var t=["/Content/Adjuster/Files/startup.js","/Content/Adjuster/Files/dlpStartup.js","/VCB.UIOnPage/","/Content/Adjuster/Files/main_iv3.min.js","/Content/Adjuster/Files/main_iv3.min.css","/Content/Adjuster/Files/main_v3.html","/Config/ConfigJs","/Content/mmapi.js","/UCBLibrary/"];
for(var r in t){if(t.hasOwnProperty(r)){if(s.indexOf(t[r])!==-1){return true
}}}return false
};
function f(r){return typeof r==="function"
}function g(r){return typeof r==="string"
}function o(r,t){var u=[];
for(var s in r){if(r.hasOwnProperty(s)&&t(r[s])){u.push(r[s])
}}return u
}function e(r,t){var u=undefined;
for(var s in r){if(r.hasOwnProperty(s)){if(t(r[s])===true){u=r[s];
break
}}}return u
}function b(r,t){if(f(t)){return !!e(r,t)
}var s=r.length;
while(s--){if(r[s]===t){return true
}}return false
}var i={contain:b,firstOrDefault:e,where:o};
var c=(function(){var t=["mm-ua","mm-device-res","mm-debug-key","mm-mmapi-url","mm-delete-test","mm-vcb-startup-url"];
function s(v){return b(t,v.replace(/^\s*/,"").replace(/\s*$/,""))
}function r(w){var v=mmproxy.utils.url.removePort(mmproxy.utils.url.getClientDomain(location.hostname));
var A=w.split("=");
if(A.length!==2){return false
}var z=A[0];
var y=z.match(/\[wp:(.*?)\]/);
if(!y){return s(z)
}var x=y[1];
if(x[0]==="."){return m.endsWith(v,x.substring(1,x.length))
}return v===x
}var u={proxyCookies:t,readCookie:function(v){var w=(document.cookie.match("(^|; )"+v+"=([^;]*)")||0)[2];
return w&&unescape(w)
},setCookie:function(v,w){document.cookie=v+"="+w+";path=/;"
},deleteCookie:function(w,x,v){document.cookie=w+"=delete_me"+((x)?";path="+x:";path=/")+((v)?";domain="+v:"")+";expires=Thu, 01 Jan 1970 00:00:01 GMT"
},isProxyCookie:s,filterCookies:function(w){var v=w.split("; ");
v=o(v,r);
return v.join("; ").replace(/\[wp:.*?\]/gi,"")
},getCookiePrefix:function(x,y){if(c.isProxyCookie(x)){return""
}var A=y;
var v=mmproxy.utils.url.removePort(mmproxy.utils.url.getClientDomain(location.hostname));
if(!A){A=v
}var w=A[0];
if(w==="."){A=A.substring(1,A.length)
}else{w=""
}var z=A.indexOf(mmproxy.proxyHost);
if(z===0||m.endsWith(mmproxy.proxyHost,A)){A=v.match(/^[\d.]+$|/)[0]||((v.match(/[^.]+\.(\w{2,3}\.\w{2}|\w{2,})$/)||[v])[0])
}else{if(z!==-1){A=mmproxy.utils.url.getClientDomain(A)
}}if(y&&(A===v||m.endsWith(v,A))){w="."
}return"[wp:"+w+(A||v)+"]"
}};
return u
})();
var m={startsWith:function(s,r){return s.indexOf(r)===0
},endsWith:function(r,s){return r.indexOf(s,r.length-s.length)!==-1
}};
var d={onready:function(r){if(document&&document.readyState==="complete"){return r()
}if(p.addEventListener){p.addEventListener("DOMContentLoaded",r,false)
}}};
var n={resourceTypes:{fetch:"fetch"},queryParams:{resourceType:"mm-resource-type"},__urlRegex:/^((https?:)?\/\/(.+?))((\/|\\|\?|#|$).*)/i,encodeOrigin:function(r){var s=r;
s=s.replace(/\-/g,"--");
s=s.replace(/\./g,"-");
s=s.replace(/:\/\//,"-");
s=s.replace(/:/,"_");
return s
},decodeOrigin:function(r){var s=r;
if(m.startsWith(s,"http-")){s="http://"+s.substring(5)
}if(m.startsWith(s,"https-")){s="https://"+s.substring(6)
}s=s.replace(/--/g,"$");
s=s.replace(/\-/g,".");
s=s.replace(/\$/g,"-");
s=s.replace(/_/,":");
return s
},isAbsoluteUrl:function(r){return/^(https?:)?\/\/.+/i.test(r)
},getOrigin:function(r){return n.__urlRegex.exec(r)[1]
},getProtocol:function(r){return n.__urlRegex.exec(r)[2]
},getCustomProtocol:function(r){return(r.indexOf(":")!==-1)?r.substr(0,r.indexOf(":")+1):r
},isLinkProtocolTypeUrl:function(r){return/^\w*:.*/i.test(r)
},getHost:function(r){return n.__urlRegex.exec(r)[3]
},getHostName:function(s){var r=n.getHost(s);
return n.removePort(r)
},getPort:function(s){var r=n.getHost(s);
return(r.indexOf(":")!==-1)?r.substr(r.indexOf(":")+1):""
},removePort:function(r){return(r.indexOf(":")!==-1)?r.substr(0,r.indexOf(":")):r
},getRightPartUrl:function(r){return n.__urlRegex.exec(r)[4]
},changeProtocol:function(s,r){return r.replace(/:$/,"")+"://"+n.getHost(s)+n.getRightPartUrl(s)
},changeHost:function(s,r){return n.getProtocol(s)+"//"+r+n.getRightPartUrl(s)
},changeHostName:function(t,r){var s=n.getPort(t);
return n.getProtocol(t)+"//"+r+(s!==""?(":"+s):"")+n.getRightPartUrl(t)
},changePort:function(s,r){return n.getProtocol(s)+"//"+n.getHostName(s)+(r!==""?(":"+r):"")+n.getRightPartUrl(s)
},changeOrigin:function(s,r){return r+n.getRightPartUrl(s)
},isProxifiedUrl:function(r){return n.isProxifiedHost(n.getHost(r))
},isProxifiedHost:function(r){return r.indexOf(n.getProxyHostNameWithoutClientOrigin(location.host))!==-1
},getProxyfiedUrl:function(z,x){if(!z||!g(z)||!n.isAbsoluteUrl(z)||h(z)){return z
}if(x===undefined){x=location.href
}var s=m.startsWith(z,"//");
if(n.isProxifiedUrl(z,x)){return s?z:n.changeProtocol(z,n.getProtocol(x))
}if(s){z=n.getProtocol(n.getOriginalUrl(x))+z
}var t=n.getOrigin(z);
var r=n.encodeOrigin(t);
var v=n.getHost(x);
var w=n.getProxyHostNameWithoutClientOrigin(v);
var y=n.getRightPartUrl(z);
var u=s?"":n.getProtocol(x);
return u+"//"+r+"."+w+y
},getOriginalUrl:function(u){if(!n.isAbsoluteUrl(u)){return u
}if(!n.isProxifiedUrl(u,location.href)){return u
}var t=n.getHost(u);
var s=t.substring(0,t.indexOf("."));
var r=n.decodeOrigin(s);
return r+n.getRightPartUrl(u)
},getProxyHostNameWithoutClientOrigin:function(r){var s=r;
if(m.startsWith(r,"http-")||m.startsWith(r,"https-")){s=r.substring(r.indexOf(".")+1)
}return n.removePort(s)
},getClientDomain:function(t){if(!n.isProxifiedHost(t)){return t
}var s=t.substr(0,t.indexOf("."));
var r=n.decodeOrigin(s);
return r.substring(r.indexOf("://")+3)
},isDlpFrameUrl:function(r){return/mm-dlp-api/i.test(r)&&/original-url/i.test(r)
},getFullUrl:function(s){if(s===null){return""
}var r=document.createElement("div");
r.innerHTML='<a href="'+s+'">a</a>';
return r.firstChild.href
},getProxifiedHost:function(r){if(r&&r.indexOf(mmproxy.proxyHost)===-1){return n.getProtocol(n.getOriginalUrl(location.href)).replace(":","")+"-"+n.encodeOrigin(r)+"."+mmproxy.proxyHost
}return r
},setParamToUrl:function(t,r,s){if(t.indexOf(r)>-1){return t.replace(/(\?|\&)([^=]+)\=([^&#]+)/gim,function(v,u,w){if(w===r){return u+w+"="+s
}return v
})
}if(t.match(/\?([^#]+)/gim)){return t.replace(/\?([^#]+)/gim,function(u){return u+"&"+r+"="+s
})
}else{return t+="?"+r+"="+s
}}};
var l={setUserAgent:function(r){c.setCookie("mm-ua",encodeURIComponent(r));
location.reload()
},setDeviceResolution:function(s,r){c.setCookie("mm-device-res",s+"x"+r);
location.reload()
},setDebugKey:function(r){if(r){c.setCookie("mm-debug-key",r)
}else{c.deleteCookie("mm-debug-key")
}location.reload()
}};
var j=(function(){var t={top:0,parent:1,open:2,postMessage:3,location:4};
var s;
var r;
if(top===parent){s=self;
r=self
}else{var u=self;
r=parent;
while(u.parent!==top){u=u.parent
}s=u
}return{getValidatedObject:function(v,w){switch(w){case t.top:return j.getValidatedTop(v);
break;
case t.parent:return j.getValidatedParent(v);
break;
case t.open:return p.mmproxy.wrappers.window.open(v);
break;
case t.postMessage:return p.mmproxy.wrappers.window.postMessage(v);
break;
case t.location:return j.getValidatedLocation.apply(j,arguments);
break
}return v
},getObject:function(v){if(p===top){return v
}return v===p.top?j.getValidatedTop(v):j.getValidatedParent(v)
},getValidatedTop:function(v){if(p===v||v!==p.top){return v
}return s
},getValidatedParent:function(v){if(p===top||v!==p.parent){return v
}return r
},getValidatedLocation:function(x,C,v,w){var D=x;
var B=v;
if(x&&k.isNativeFunction(x.assign)){var z=k.getLocationOwner(x);
D=p.location.proxyWrapper.getWrapped(z.location);
B=function(E){if(E.originalLocation){z.location=E.originalLocation
}else{v.call(w,n.getProxyfiedUrl(E))
}}
}var A={};
var y={configurable:true,get:function(){return D
},set:function(E){return B.call(w,E)
}};
Object.defineProperty(A,"value",y);
return A
}}
})();
var k=(function(){var r=Function.prototype.toString;
var v=/\{\s*\[native code\]\s*\}/i;
function u(x){return typeof x==="function"?v.test(r.call(x).trim()):false
}function t(x){if(typeof x==="undefined"||(typeof x==="string"&&(!x||/^_(blank|top|parent)$/i.test(x)))){return"_self"
}return x
}function w(y,x){return((y==="IMG"||y==="IFRAME"||y==="SCRIPT")&&/^src$/i.test(x))||((y==="A"||y==="BASE"||y==="LINK")&&/^href$/i.test(x))||(y==="IMG"&&x==="ng-src")||(y==="FORM"&&/^action$/i.test(x))
}function s(y){var z=p;
if(z.location===y){return p
}while(z.location!==y&&z!==z.parent){z=z.parent
}if(z.location!==y){var x=e(Array.prototype.slice.call(p.frames),function(A){return A.location===y
});
if(x){return x
}}return j.getObject(z)
}return{isNativeFunction:u,getValidTarget:t,valueShouldBeProxified:w,getLocationOwner:s}
})();
var a=(function(){function r(s){return Array.prototype.slice.call(s)
}return{argumentsToArray:r}
})();
var q=(function(){function r(s){if(n.isAbsoluteUrl(s)){return n.getProxyfiedUrl(s)
}return s
}return{open:function(s){return function(){var w;
var u;
if(f(s)){w=s;
u=p
}else{u=j.getObject(s||p);
w=u.open
}var t=a.argumentsToArray(arguments);
t[0]=r(t[0]);
var v=t[1];
if(v||k.isNativeFunction(w)&&(Object.prototype.toString.call(u)!=="[object IDBFactory]")){t[1]=mmproxy.utils.override.getValidTarget(v)
}return w.apply(u,t)
}},postMessage:function(s){return function(){var u;
var t;
if(f(s)){u=s;
t=p
}else{t=j.getObject(s||p);
u=t.postMessage
}arguments[1]=r(arguments[1]);
return u.apply(t,arguments)
}}}
})();
p.mmproxy={proxyHost:document.location.hostname.replace(/.*?\./,""),settings:l,window:p,utils:{cookies:c,string:m,url:n,document:d,override:k,arguments:a,linq:i,isVcbFile:h},wrappers:{window:q},pageErrors:[],href:n.getOriginalUrl(location.href),getValidatedObject:j.getValidatedObject}
})(window);
/*Oracle Maxymiser Code End*/
/*Oracle Maxymiser Code Begin*/
(function(a){if(a.mmproxyWrappersExecuted){return
}a.mmproxyWrappersExecuted=true;
(function(f){mmproxy.originalUserAgent=f.navigator.userAgent;
var c=mmproxy.utils.cookies.readCookie("mm-ua");
if(c&&f.navigator.userAgent!=c){var d={get:function(){return c
}};
try{Object.defineProperty(f.navigator,"userAgent",d)
}catch(b){f.navigator=Object.create(navigator,{userAgent:d})
}}})(a);
(function(){if(!delete document.cookie||!delete document.domain||!delete document.URL||!delete document.baseURI){return
}var d=mmproxy.utils.url.getClientDomain(document.domain);
var f={configurable:true,get:function(){return d
},set:function(e){if(!mmproxy.utils.string.endsWith(d,e)){throw"Failed to set the 'domain' property on 'Document': '"+e+"' is not a suffix of '"+d+"'"
}d=e;
return d
}};
var h={configurable:true,get:function(){return mmproxy.utils.url.getOriginalUrl(location.href)
}};
var b={configurable:true,get:function(){if(!delete document.baseURI){return""
}var e=mmproxy.utils.url.getProxyfiedUrl(document.baseURI);
i();
return e
}};
var c={configurable:true,get:function(){if(!delete document.cookie){return document.cookie
}var e=document.cookie;
i();
return mmproxy.utils.cookies.filterCookies(e)
},set:function(r){if(!r){return r
}if(!delete document.cookie){return r
}r=r.replace(/^\s*/,"");
var p,n=/;?\s*domain\s*=\s*([^;]*)/i,o=/\s*domain\s*=\s*[^;]*/i,q=mmproxy.utils.url.getProxyHostNameWithoutClientOrigin(mmproxy.utils.url.getHostName(location.href)),k="domain=."+q,l=r.match(/[^=]+/)[0].replace(/\s*$/,""),m=n.exec(r),j=m?m[1]:"",e=mmproxy.utils.url.removePort(d);
if((!j||/([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/.test(j))&&(mmproxy.utils.string.endsWith("."+e,j)||mmproxy.utils.string.endsWith("."+location.hostname,j))){r=mmproxy.utils.cookies.getCookiePrefix(l,j)+r.replace(/^\s*/,"");
if(q==="localhost"){p=document.cookie=r.replace(n,"")
}else{p=(m)?(document.cookie=r.replace(o,k)):(document.cookie=r+";"+k)
}}i();
return p
}};
mmproxy.utils.cookies.getRawCookieString=function(){if(!delete document.cookie){return document.cookie
}var e=document.cookie;
i();
return e
};
i();
function i(){try{Object.defineProperties(document,{cookie:c,baseURI:b})
}catch(j){document=Object.create(document,{cookie:c,domain:f,URL:h,baseURI:b})
}}try{Object.defineProperties(document,{domain:f,URL:h})
}catch(g){document=Object.create(document,{cookie:c,domain:f,URL:h,baseURI:b})
}})();
(function(){if(!a.fetch){return null
}var c=a.fetch;
var b=function(){var f=arguments[0];
var d=arguments[1]||{};
arguments[0]=mmproxy.utils.url.getProxyfiedUrl(f);
var e=d.credentials&&/^include$/gim.test(d.credentials);
d.credentials=e?d.credentials:"include";
d.headers=d.headers?d.headers:{};
d.method=d.method?d.method:"GET";
if(Object.prototype.toString.call(d.headers)==="[object Object]"&&!e){arguments[0]=mmproxy.utils.url.setParamToUrl(arguments[0],mmproxy.utils.url.queryParams.resourceType,mmproxy.utils.url.resourceTypes.fetch);
d.headers.Origin=location.origin
}if(Object.prototype.toString.call(d.headers)==="[object Headers]"&&!e){arguments[0]=mmproxy.utils.url.setParamToUrl(arguments[0],mmproxy.utils.url.queryParams.resourceType,mmproxy.utils.url.resourceTypes.fetch);
d.headers.append("Origin",location.origin)
}if(arguments[1]){arguments[1]=d;
return c.apply(this,arguments)
}else{return c.apply(this,[arguments[0],d])
}};
a.fetch=b
})();
(function(){var d=XMLHttpRequest.prototype.open;
var b=function(){var f=arguments[1];
arguments[1]=mmproxy.utils.url.getProxyfiedUrl(f);
this.__proxyUrl=arguments[1];
d.apply(this,arguments)
};
XMLHttpRequest.prototype.open=b;
var e=XMLHttpRequest.prototype.send;
var c=function(){if(!mmproxy.utils.isVcbFile(this.__proxyUrl)){this.withCredentials=true
}e.apply(this,arguments)
};
XMLHttpRequest.prototype.send=c
})();
(function(){var c=a.postMessage;
var b=function(){var d=arguments[1];
if(d!==undefined&&d!=="*"){arguments[1]=mmproxy.utils.url.getProxyfiedUrl(d)
}c.apply(this,arguments)
};
a.postMessage=b
})();
(function(){var c=Element.prototype.getAttribute;
var b=function(){var d=arguments[0];
if(/^crossorigin$/i.test(d)){arguments[0]="mm-crossorigin"
}if(/^target$/i.test(d)&&this.hasAttribute("mm-target")){arguments[0]="mm-target"
}var e=c.apply(this,arguments);
if(mmproxy.utils.override.valueShouldBeProxified(this.nodeName,d)){return mmproxy.utils.url.getOriginalUrl(e)
}return e
};
Element.prototype.getAttribute=b
})();
(function(){var c=Element.prototype.setAttribute;
var b=function(){var d=arguments[0];
var e=arguments[1];
if(mmproxy.utils.override.valueShouldBeProxified(this.nodeName,d)){arguments[1]=mmproxy.utils.url.getProxyfiedUrl(e)
}if((/^(A|BASE)$/i.test(this.nodeName)&&/^target$/i.test(d))){c.apply(this,["mm-target",arguments[1]]);
arguments[1]="_self"
}if(/^crossorigin$/i.test(d)){arguments[0]="mm-crossorigin"
}return c.apply(this,arguments)
};
Element.prototype.setAttribute=b
})();
(function(){var d=document.createTextNode;
var b=/(url\(['"]?)([^"')]*)(["']?\))/gim;
var c=function(e){if(e===undefined||e===null||Object.prototype.toString.call(e)!=="[object String]"){return d.call(this,e)
}e=e.replace(b,function(f,g,i,h){return g+mmproxy.utils.url.getProxyfiedUrl(i)+h
});
return d.call(this,e)
};
document.createTextNode=c
})();
(function(){var d=a.Object.getOwnPropertyDescriptor(a.Element.prototype,"innerHTML")?a.Element.prototype:a.HTMLElement.prototype;
var k=a.Object.getOwnPropertyDescriptor(d,"innerHTML");
var l=k.set;
var j=k.get;
var b=/(\<(script|img|video|audio)[^>]*?)(_?crossorigin)(\s*=\s*['"].*?['"][^>]*?\/?\>)/gi;
var p=/(\<(a|base)[^>]+)target\s*\=\s*["']?([^"'\s>]*)["']?/gim;
var o=/mm-target\s*\=\s*["']?(.*?)["']?\s*target="_self"/gim;
var f=/(\<(?:a|link)\s[^\>]*href\s*=\s*['"])([^\"\']*)(['"][^\>]*>)/gim;
var e=/(\<form\s[^\>]*action\s*=\s*['"])([^\"\']*)(['"][^\>]*>)/gim;
var c=/(url\(['"]?)([^"')]*)(["']?\))/gim;
var n=function(q){if(q===undefined||q===null||Object.prototype.toString.call(q)!=="[object String]"){return q
}q=a.decodeURI(a.encodeURI(q));
q=q.replace(p,function(r,s,t,u){return s+'mm-target="'+u+'" target="_self"'
});
q=q.replace(f,function(r,s,v,u){var t=mmproxy.utils.url.getProxyfiedUrl(v);
return s+t+u
});
q=q.replace(e,function(r,s,v,u){var t=mmproxy.utils.url.getProxyfiedUrl(v);
return s+t+u
});
q=q.replace(b,function(s,t,v,r,u){return t+"mm-crossorigin"+u
});
q=q.replace(c,function(r,s,u,t){return s+mmproxy.utils.url.getProxyfiedUrl(u)+t
});
return q
};
var m=function(q){if(q===undefined||q===null||Object.prototype.toString.call(q)!=="[object String]"){return q
}q=q.replace(f,function(s,t,v,u){var r=mmproxy.utils.url.getOriginalUrl(v);
return t+r+u
});
q=q.replace(c,function(s,t,v,u){var r=mmproxy.utils.url.getOriginalUrl(v);
return t+r+u
});
q=q.replace(e,function(s,t,v,u){var r=mmproxy.utils.url.getOriginalUrl(v);
return t+r+u
});
q=q.replace(b,function(s,t,v,r,u){return t+"crossorigin"+u
});
q=q.replace(o,function(r,s){return'target="'+s+'"'
});
return q
};
var g=function(){var s=this;
var r=j.call(s,arguments);
var q=m(r);
return q
};
var h=function(){var s=this;
var q=arguments[0];
var r=n(q);
return l.call(s,r)
};
var i={configurable:true,enumerable:k.enumerable,get:g,set:h};
a.Object.defineProperty(d,"innerHTML",i)
})();
(function(){var p=mmproxy.utils.url;
var f=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"href");
var h=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"port");
var d=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"host");
var e=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"hostname");
var i=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"protocol");
var g=a.Object.getOwnPropertyDescriptor(a.HTMLAnchorElement.prototype,"href");
var c={configurable:true,enumerable:f.enumerable,get:function(){return p.getOriginalUrl(f.get.apply(this))
},set:function(q){return f.set.call(this,p.getProxyfiedUrl(q))
}};
var o={configurable:true,get:function(){return this.getAttribute("target")
},set:function(q){return this.setAttribute("target",q)
}};
var k={configurable:true,get:function(){return p.getHost(this.href)
},set:function(q){return d.set.call(this,p.getProxifiedHost(q))
}};
var j={configurable:true,get:function(){return p.getHostName(this.href)
},set:function(q){return e.set.call(this,p.getProxifiedHost(q))
}};
var l={configurable:true,get:function(){return p.getOrigin(this.href)
},set:function(q){q=q||this.origin;
return g.set.call(this,p.getOrigin(p.getProxyfiedUrl(q)))
}};
var m={configurable:true,get:function(){return p.getPort(this.href)
},set:function(q){q=q||this.port;
return this.href=p.changePort(this.href,q)
}};
var n={configurable:true,get:function(){var s=p.getProtocol(p.getOriginalUrl(location.href));
var q=p.isAbsoluteUrl(this.href);
var r=p.isLinkProtocolTypeUrl(this.href);
if(q){s=p.getProtocol(this.href)
}if(r){s=p.getCustomProtocol(this.href)
}return s
},set:function(r){var q=p.getCustomProtocol(r);
q=q||this.protocol;
return this.href=p.changeProtocol(this.href,q)
}};
var b={configurable:true,get:function(){return p.getOriginalUrl(a.location.href)
}};
Object.defineProperty(a.HTMLAnchorElement.prototype,"baseURI",b);
Object.defineProperty(a.HTMLAnchorElement.prototype,"hostname",j);
Object.defineProperty(a.HTMLAnchorElement.prototype,"origin",l);
Object.defineProperty(a.HTMLAnchorElement.prototype,"port",m);
Object.defineProperty(a.HTMLAnchorElement.prototype,"protocol",n);
Object.defineProperty(a.HTMLAnchorElement.prototype,"host",k);
a.Object.defineProperty(a.HTMLAnchorElement.prototype,"target",o);
a.Object.defineProperty(a.HTMLAnchorElement.prototype,"href",c)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLFormElement.prototype,"action");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(d){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(d))
}};
a.Object.defineProperty(a.HTMLFormElement.prototype,"action",b)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLImageElement.prototype,"src");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(d){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(d))
}};
a.Object.defineProperty(a.HTMLImageElement.prototype,"src",b)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLScriptElement.prototype,"src");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(d){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(d))
}};
a.Object.defineProperty(a.HTMLScriptElement.prototype,"src",b)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLIFrameElement.prototype,"src");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(d){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(d))
}};
a.Object.defineProperty(a.HTMLIFrameElement.prototype,"src",b)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLBaseElement.prototype,"href");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(e){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(e))
}};
var d={configurable:true,get:function(){return this.getAttribute("target")
},set:function(e){return this.setAttribute("target",e)
}};
a.Object.defineProperty(a.HTMLBaseElement.prototype,"target",d);
a.Object.defineProperty(a.HTMLBaseElement.prototype,"href",b)
})();
(function(){var c=a.Object.getOwnPropertyDescriptor(a.HTMLLinkElement.prototype,"href");
var b={configurable:true,enumerable:c.enumerable,get:function(){return mmproxy.utils.url.getOriginalUrl(c.get.apply(this))
},set:function(d){return c.set.call(this,mmproxy.utils.url.getProxyfiedUrl(d))
}};
a.Object.defineProperty(a.HTMLLinkElement.prototype,"href",b)
})();
(function(){var b={configurable:true,get:function(){return this.getAttribute("mm-crossorigin")
},set:function(c){return this.setAttribute("mm-crossorigin",c)
}};
a.Object.defineProperty(a.HTMLMediaElement.prototype,"crossOrigin",b);
a.Object.defineProperty(a.HTMLImageElement.prototype,"crossOrigin",b);
a.Object.defineProperty(a.HTMLLinkElement.prototype,"crossOrigin",b);
a.Object.defineProperty(a.HTMLScriptElement.prototype,"crossOrigin",b)
})();
(function(){var c=a.history.replaceState;
var b=function(){var d=arguments[2];
if(d){arguments[2]=mmproxy.utils.url.getProxyfiedUrl(d)
}c.apply(this,arguments)
};
a.history.replaceState=b
})();
(function(){var c=a.history.pushState;
var b=function(){var d=arguments[2];
if(d){arguments[2]=mmproxy.utils.url.getProxyfiedUrl(d)
}c.apply(this,arguments)
};
a.history.pushState=b
})();
(function(){var c=mmproxy.utils.cookies.readCookie("mm-device-res");
var h=/^([0-9]+)x([0-9]+)$/i;
if(c&&h.test(c)){var d=parseInt(h.exec(c)[1]);
var b=parseInt(h.exec(c)[2]);
var i=a.screen;
if(!delete i.width||!delete i.height||!delete i.availWidth||!delete i.availHeight){return
}var j={configurable:true,get:function(){return d
}};
var g={configurable:true,get:function(){return b
}};
try{Object.defineProperties(a.screen,{width:j,height:g,availWidth:j,availHeight:g})
}catch(f){a.screen=Object.create(a.screen,{width:j,height:g,availWidth:j,availHeight:g})
}}})();
(function(){var b=function(){var c=function(){var h=function(l){document.documentElement.style.transformOrigin="0 0";
document.documentElement.style.transform=(l===1)?"":"scale("+l+")"
};
var i=document.querySelector("meta[name=viewport]");
h(1);
var e=a.innerWidth||document.documentElement.clientWidth;
if(i){var d=i.getAttribute("content");
var k=/width=(.+?)(,|$)/i.exec(d);
var g=/initial-scale=(.+?)(,|$)/i.exec(d);
var f=1;
if(k){var j=k[1];
if(j&&/^[0-9]+$/.test(j)){document.documentElement.style.width=j+"px";
h(e/j*f)
}}}else{}};
if(navigator.userAgent!==mmproxy.originalUserAgent){c();
a.onresize=c
}};
mmproxy.utils.document.onready(b)
})();
(function(){var h=mmproxy.utils.url;
var i={data:[],add:function(k,l){var j=mmproxy.utils.linq.firstOrDefault(this.data,function(m){return m.key===k
});
if(j){j.value=l
}else{this.data.push({key:k,value:l})
}return this
},get:function(j){return mmproxy.utils.linq.firstOrDefault(this.data,function(k){return k.key===j
})
}};
function e(k){try{return !k.href
}catch(j){return true
}}function f(j){this.assign=function(k){k=k.originalLocation?k.href:k;
j.assign(h.getProxyfiedUrl(k))
};
this.replace=function(k){k=k.originalLocation?k.href:k;
j.replace(h.getProxyfiedUrl(k))
};
this.originalLocation=j
}f.prototype.toString=function(){return this.href
};
function c(j){return new f(j)
}function b(k){var r=c(k);
for(var j in k){if(j.indexOf("proxy")===0||j==="replace"||j==="assign"||j==="toString"){continue
}switch(j){case"href":var n={configurable:true,get:function(){return h.getOriginalUrl(k.href)
},set:function(s){return k.href=h.getProxyfiedUrl(s)
}};
Object.defineProperty(r,"href",n);
break;
case"host":var m={configurable:true,get:function(){return h.getHost(h.getOriginalUrl(k.href))
},set:function(s){return k.host=h.getProxifiedHost(s)
}};
Object.defineProperty(r,j,m);
break;
case"hostname":var l={configurable:true,get:function(){return h.getHostName(h.getOriginalUrl(k.href))
},set:function(s){return k.hostname=h.getProxifiedHost(s)
}};
Object.defineProperty(r,j,l);
break;
case"origin":var o={configurable:true,get:function(){return h.getOrigin(h.getOriginalUrl(k.href))
},set:function(s){s=h.getProxyfiedUrl(s)||k.href;
return k.origin=h.getOrigin(s)
}};
Object.defineProperty(r,j,o);
break;
case"port":var p={configurable:true,get:function(){return h.getPort(h.getOriginalUrl(k.href))
},set:function(t){t=t||this.port;
var s=h.getOriginalUrl(k.href);
s=h.changePort(s,t);
return k.href=h.getProxyfiedUrl(s)
}};
Object.defineProperty(r,j,p);
break;
case"protocol":var q={configurable:true,get:function(){return h.getProtocol(h.getOriginalUrl(k.href))
},set:function(t){t=t||this.protocol;
var s=h.getOriginalUrl(k.href);
s=h.changeProtocol(s,t);
return k.href=h.getProxyfiedUrl(s)
}};
Object.defineProperty(r,j,q);
break;
default:if(typeof k[j]==="function"){r[j]=(function(s){return function(){return k[s].apply(k,arguments)
}})(j)
}else{(function(s){var t={configurable:true,get:function(){return k[s]
},set:function(u){return k[s]=u
}};
Object.defineProperty(r,s,t)
})(j)
}break
}}return r
}function d(k){var j=i.get(k);
if(j){return j.value
}var l=e(k)?c(k):b(k);
i.add(k,l);
return l
}location.proxyReplace=function(j){return location.replace(h.getProxyfiedUrl(j))
};
location.proxyAssign=function(j){return location.assign(h.getProxyfiedUrl(j))
};
location.proxyToString=function(){return h.getProxyfiedUrl(location.href)
};
var g={configurable:true,get:function(){return h.getOriginalUrl(location.href)
},set:function(j){return location.href=h.getProxyfiedUrl(j)
}};
location.proxyWrapper={assign:location.proxyAssign,replace:location.proxyReplace,reload:location.reload,hash:location.hash,host:location.host,hostname:location.hostname,origin:location.origin,pathname:location.pathname,port:location.port,protocol:location.protocol,search:location.search,getWrapped:d};
Object.defineProperty(location.proxyWrapper,"href",g);
location.proxyWrapper.toString=function(){return location.proxyWrapper.href
}})()
})(window);
/*Oracle Maxymiser Code End*/
/*! Copyright © 2015, 2016, Oracle and/or its affiliates. All rights reserved. */
/*! mmpackage v1.12 */
/*! jQuery v1.11.2 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
/*v1.12.24.3316*/
'use strict';(function(){function ca(q,Y,Z){ca=void 0;eval(q)}var q=window.console||{log:function(){},error:function(){}};(function(){function W(a,d,h){var l=[],B;for(B in a)a.hasOwnProperty(B)&&(h?l=l.concat(d(a[B])):l.push(d(a[B])));return l}function Y(a,d){var h=[],l;for(l in a)a.hasOwnProperty(l)&&d(a[l])&&h.push(a[l]);return h}function Z(a,d){var h=void 0,l;for(l in a)if(a.hasOwnProperty(l)&&!0===d(a[l])){h=a[l];break}return h}function da(a,d){if(K(d))return!!Z(a,d);for(var h=a.length;h--;)if(a[h]===d)return!0;
return!1}function X(a,d,h){h=h||0;for(var l=a.length;h<l;h++)if(a[h]===d||K(d)&&d(a[h]))return h;return-1}function K(a){return"function"===typeof a}function R(a){return Array.isArray?Array.isArray(a):"[object Array]"===Object.prototype.toString.call(a)}function J(a){return"string"===typeof a}function C(a){return"undefined"===typeof a}function T(a){return"number"===typeof a}function aa(a){if(null===a||"object"!==typeof a)return a;var d=a.constructor(),h;for(h in a)a.hasOwnProperty(h)&&(d[h]=aa(a[h]));
return d}function U(a,d){a=C(a)?{}:a;d=C(d)?{}:d;if(null===d||"object"!==typeof d)return d;var h={},l;if("object"===typeof a)for(l in a)a.hasOwnProperty(l)&&(h[l]=a[l]);for(l in d)d.hasOwnProperty(l)&&(h[l]?R(h[l])&&R(d[l])?h[l]=h[l].concat(d[l]):h[l]=U(h[l],d[l]):h[l]=d[l]);return h}function D(a){return C(a)||null==a?!0:1>a.replace(/\s/g,"").length}function ga(a){return a="mm_style"+(a?"_"+a:"")+("_"+ha++)}function F(a){return a.replace(/^\s+|\s+$/gm,"")}function E(){var a=arguments,d={},h=1;J(a[1])||
(d=a[1],h=2);for(var l=a[0],a=R(a[2])?a[2]:L(a,h),h=0;h<a.length;h++)d[a[h]]=function(a){return function(){return a.apply(d,arguments)}}(l[a[h]]);return d}function ba(){function a(a){var h,l="";for(h=0;h<a;h++)l+=(16*Math.random()%16|0).toString(16);return l}return a(8)+"-"+a(4)+"-4"+a(3)+"-"+a(4)+"-"+a(12)}function N(a,d){for(var h in a)a.hasOwnProperty(h)&&d(a[h],h)}function ia(a){return function(){try{a()}catch(d){q.log(d.message||d)}}}function ea(a){var d=a.getAttribute("href");return{hrefHasJS:/(^| )javascript:/i.test(d),
sameSite:a.hostname===mmproxy.getValidatedObject(window.location,4,function(x){return window.location=x;},this).value.hostname,notRequiresReload:"_blank"===a.target||/^#|(^| )javascript: ?void/i.test(d)}}function fa(a){for(;a&&"a"!==a.tagName.toLowerCase();)a=a.parentElement;return a}function L(a,d,h){h=C(h)?a.length:h;d=d||0;if(R(a))return Array.prototype.slice.call(a,d,h);var l=[],B=(h||0)-d;if(0<B)for(l=Array(B),h=0;h<B;h++)l[h]=a[d+h];return l}function ja(){return function(){}}function M(a){a=a||{};var d="";C(a.opacity)||(a.filter="alpha(opacity="+100*a.opacity+")");N(a,
function(a,l){d+=l+": "+a+" !important; "});return F(d)}function ka(a,d,h){function l(b){if(!k[b]){var e=d[b],c={};try{e(c,B.requireClass,B.require),c.exports=B.options.isDlpEnabled?c.dlp||c.exports:c.basic||c.exports}catch(a){q.log("ERROR: "+a.message+" in module "+b)}f[b]&&(c.exports=c.exports.extend(f[b]));k[b]=c}return k[b]}var B=this,k,n,f;B.options=h||{};f=B.options.moduleExtensions||{};this.reset=function(b){k={};n=b||{}};B.reset(a);this.require=function(b,e){l(b);var c=k[b];return c&&c.config&&
c.config.singleton?(n[b]||(n[b]=new c.exports(B.options)),n[b]):new c.exports(e)};this.requireClass=function(b){l(b);return k[b].exports};this.addModule=function(b,e){d[b]=e}}var la=ca,ha=1,ma={CGApi:function(a,d,h){a.config={singleton:!0};a.exports=function(){function a(b,e,c,k){var g=f.getParam("uv",k)||{};b=F(b);g[b]=g[b]||[];if(void 0===e)e=1;else if(""===e||isNaN(e))e=0,c="NaN";g[b].push(e+(c?","+encodeURIComponent(c):""));f.setParam("uv",g,k)}function d(b,e,c,a){var g=f.getParam("uat",c)||{};
g[F(b)]=F(e+"");f.setParam("uat",g,c,a)}function k(b,e){var c=f.getParam("rul",e)||[],a=W(b,function(b){return encodeURIComponent(C(b)?"":b)}).join(",")+";";c.push(a);f.setParam("rul",c,e)}function n(b,e,c,a){var g=f.getParam("ids",c)||{};g[b+""]=e+"";f.setParam("ids",g,c,a)}var f=h("Engine");this.setAction=function(b,e,c){a(b,e,c,f.storeStrategy.request)};this.postAction=function(b,e,c){a(b,e,c,f.storeStrategy.deferredRequest)};this.setAttr=function(b,e){d(b,e,f.storeStrategy.request)};this.storeAttr=
function(b,e,c){d(b,e,f.storeStrategy.persistent,c)};this.getAttr=function(b){return(f.getParam("uat",f.storeStrategy.persistent)||{})[F(b)]};this.removeAttr=function(b){var e=f.getParam("uat",f.storeStrategy.persistent)||{};delete e[F(b)];f.setParam("uat",e,f.storeStrategy.persistent,365)};this.setId=function(b,e){n(b,e,f.storeStrategy.request)};this.storeId=function(b,e,c){n(b,e,f.storeStrategy.persistent,c)};this.removeId=function(b){var e=f.getParam("ids",f.storeStrategy.persistent)||{};delete e[b+
""];f.setParam("ids",e,f.storeStrategy.persistent,365)};this.hasActions=function(){var b=f.getParam("uv",f.storeStrategy.request)||{},e=f.getParam("uv",f.storeStrategy.deferredRequest)||{};return b&&"{}"!==JSON.stringify(b)||e&&"{}"!==JSON.stringify(e)};this.request=function(b,e){f.setParam("pageid",b.pageId,f.storeStrategy.request);b.pagePrefix&&f.setParam("pp",b.pagePrefix,f.storeStrategy.request);f.CGRequest(e)};this.setData=function(b,e,c){f.setData(b,e,c)};this.getData=function(b){return f.getData(b)};
this.clearData=function(b){f.clearData(b)};this.getServerAttrs=function(){return f.getServerAttrs()};this.setCategoryFilter=function(b,e,c){k({categoryId:b,categoryName:e,including:c?1:0},f.storeStrategy.request)};this.setProductFilter=function(b,e,c){k({categoryId:b,productId:e,including:c?1:0,isProduct:1},f.storeStrategy.request)}}},Class:function(a,d,h){d=function(){};d.extend=function(a){var d=function(){d.superclass.constructor.apply(this,arguments);var k={};N(this,function(a,b){k[b]=a});this.base=
k;return a.apply(this,arguments)},k=function(){};k.prototype=this.prototype;d.prototype=new k;d.prototype.constructor=d;d.superclass=this.prototype;d.implementation=a;d.extend=this.extend;d.inherit=this.inherit;return d};d.inherit=function(a){(a.implementation||a).call(this.prototype)};a.exports=d},Cookies:function(a,d,h){a.config={singleton:!0};a.exports=function(a){var d=this,k=a.cookieDomain,n=a.isBaseStorageSecure,f=encodeURIComponent,b=decodeURIComponent;this.set=function(b,c,a){if(!b||!J(b))return q.error("You can't use cookies.set without specifying cookie name."),
this;a=a||{};a.secure=C(a.secure)?n:a.secure;var g=";domain="+(a.domain||k),d=";path="+(a.path||"/"),l;if(a.expires){l=a.expires;var h=new Date;h.setTime(h.getTime()+864E5*l);l=";expires="+h.toGMTString()}else l="";a=a.secure?";secure":"";document.cookie=f(b)+"="+f(c)+g+d+l+a;return this};this.remove=function(b,c){if(!b||!J(b))return q.error("You can't use cookies.remove without specifying cookie name."),this;c||(c={});c.expires=-1;var a=this.get(b);C(a)||this.set(b,"",c);return this};this.get=function(e){if(!e||
!J(e))return q.error("You can't use cookies.get without specifying cookie name."),this;e=new RegExp("(?:^|; )"+f(e).replace(/([.$?*|{}()\[\]\\\/+^])/g,"\\$1")+"((;|$)|(=([^;]*)))");return(e=document.cookie.match(e))?b(e[4]||""):void 0};this.getWrapper=function(){return E(d,"get","set","remove")}}},Events:function(a,d,h){a.config={singleton:!1};d=d("Class").extend(function(){function a(b,e){var c=b.split("."),f;if(1===c.length)f=c[0];else if(2===c.length){f=c[0];if(0===f.length||-1!==f.indexOf("*"))return!1;
f=c[1]}else return!1;if(!f.length)return!1;if(-1!==f.indexOf("*"))if(e){if("*"!==f)return!1}else return!1;return c}function d(b,e,c,a){f[b]={event_data:e,callback:!0===a?c:void 0};if(n[b]){b=n[b];for(a=0;a<b.length;a++)b[a].call(k,e);K(c)&&c()}}var k=this,n={},f={};this.on=function(b,e,c){if(!J(b))return q.log("eventName is incorrect"),this;if(!a(b,!0))return q.error("'"+b+"' is incorrect for On"),this;if(c&&(c=f[b])){try{e.apply({},[c.event_data])}catch(k){}c.callback&&c.callback()}n[b]=n[b]||[];
n[b].push(e);return this};this.off=function(b,e){if(!J(b))return q.log("eventName is incorrect"),this;n[b]=n[b]||[];for(var c=n[b].length;c--;)e==n[b][c]&&n[b].splice(c,1);return this};this.trigger=function(b,e,c,f){if(!J(b))return q.log("eventName is incorrect"),this;var g=a(b,!1);if(!g)return q.error("'"+b+"' is incorrect for Trigger"),this;d(b,e,c,f);2==g.length&&d(g[0]+".*",e,c,f);return this};this.getWrapper=function(){return E(k,{},"on","off","trigger")}});a.exports=d},EventsSite:function(a,
d,h){a.config={singleton:!1};var l=d("Events").extend(function(){var a=this;this.domReady=function(){var a=!1,n=[],f=function(){document.addEventListener?(document.removeEventListener("DOMContentLoaded",b,!1),window.removeEventListener("load",b,!1)):(document.detachEvent("onreadystatechange",b),window.detachEvent("onload",b))},b=function(){if(document.addEventListener||"load"===event.type||"complete"===document.readyState)f(),e()},e=function(){if(!a){if(!document.body)return setTimeout(e);a=!0;for(var b=
0;b<n.length;b++)try{(0,n[b])()}catch(c){q.log(c)}}};if("complete"===document.readyState)e();else if(document.addEventListener)document.addEventListener("DOMContentLoaded",b,!1),window.addEventListener("load",b,!1);else{document.attachEvent("onreadystatechange",b);window.attachEvent("onload",b);var c=!1;try{c=null==window.frameElement&&document.documentElement}catch(d){}c&&c.doScroll&&function H(){if(!a){try{c.doScroll("left")}catch(b){return setTimeout(H,50)}f();e()}}()}return function(b){b=b||function(){};
if(a){try{b()}catch(c){q.log(c)}return!0}n.push(b);return!1}}();this.getWrapper=function(){return E(a,a.base.getWrapper(),"domReady")}});d=d("Events").extend(function(){var a=this,k=h("Dlp");this.domReady=function(a){return k.parentReady(a)};this.getWrapper=function(){return E(a,a.base.getWrapper(),"domReady")}});a.basic=l;a.dlp=d},EventsCampaign:function(a,d,h){a.config={singleton:!1};d=d("EventsSite").extend(function(){var a=this,d=h("Events");this.variantJsExecuted=function(a){d.on("variantJsExecuted",
function(d){a(d.elementName,d.variantName)},!0);return this};this.triggerVariantJsExecuted=function(a){d.trigger("variantJsExecuted",a);return this};this.getWrapper=function(){return E(a,a.base.getWrapper(),"variantJsExecuted")}});a.exports=d},Deferred:function(a,d,h){function l(a,d){a=a||{};for(var f in d)d.hasOwnProperty(f)&&(a[f]="object"===typeof d[f]?l(a[f],d[f]):d[f]);return a}function B(a){for(var d=[["resolve","done",[],"resolved"],["reject","fail",[],"rejected"],["notify","progress",[]]],
f="pending",b={state:function(){return f},always:function(){e.done(arguments).fail(arguments);return this},then:function(){var a=arguments;return B(function(c){for(var f=0;f<d.length;f++)(function(a,f){e[d[a][1]](function(){var e=K(f[a])&&f[a].apply(this,arguments);if(e&&K(e.promise))e.promise().done(c.resolve).fail(c.reject).progress(c.notify);else c[d[a][0]+"With"](this===b?c.promise():this,f[a]?[e]:arguments)})})(f,a);a=null}).promise()},promise:function(a){return null!=a?l(a,b):b}},e={},c,h,g=
0;g<d.length;g++)(function(a){var g=d[a],k=g[2];b[g[1]]=function(){for(var a=0;a<arguments.length;a++)(function(a){K(a)?f===g[3]?a.apply(c,h):k.push(a):a&&a.length&&"string"!==typeof a&&b[g[1]].apply(this,a)})(arguments[a]);return this};e[g[0]]=function(){e[g[0]+"With"](this===e?b:this,arguments);return this};e[g[0]+"With"]=function(b,a){if("pending"==f)for(c=b,h=a,g[3]&&(f=g[3]);k.length;)k.shift().apply(b,a);return this}})(g);b.promise(e);a&&a.call(e,e);return e}a.exports=B},When:function(a,d,h){var l=
d("Deferred");a.exports=function(){var a=0,d=K(arguments[0]),n=d?[l()]:arguments,f=Array.prototype.slice.call(n),b=f.length,e=1!==b||n[0]&&K(n[0].promise)?b:0,c=1===e?n[0]:l(),h=function(b,a,f){return function(d){a[b]=this;f[b]=1<arguments.length?Array.prototype.slice.call(arguments):d;f===g?c.notifyWith(a,f):--e||c.resolveWith(a,f)}},g,H,t;if(d)n=arguments,t=setInterval(function(){n[0]()?c.resolve():n[1]&&K(n[1])&&n[1]()&&c.reject()},50),c.always(function(){clearInterval(t)});else if(1<b)for(g=Array(b),
d=Array(b),H=Array(b);a<b;a++)f[a]&&K(f[a].promise)?f[a].promise().done(h(a,H,f)).fail(c.reject).progress(h(a,d,g)):--e;e||c.resolveWith(H,f);return c.promise()}},Renderer:function(a,d,h){a.config={singleton:!1};var l=0,B=0,k=d("Class").extend(function(a){function b(){A&&(clearTimeout(A),A=null);T(w)&&(A=setTimeout(function(){c.showAll()},w))}function e(b){if(b=(b?(b.Name||b)+"":"").toLowerCase()){var A=a.getElement(b)||{},c=A.Data;if(c)for(var e="",m="",d=0;d<c.length;d++)"Css"===c[d].Type?e=c[d].Data:
"Html"===c[d].Type&&""!==F(c[d].Data)?m=c[d].Data:"Script"===c[d].Type&&(t.runElementScript(a,b,{html:m,css:e},c[d].Data),a.events.triggerVariantJsExecuted({elementName:A.Name?A.Name:"",variantName:A.VariantName?A.VariantName:""}),m=e="")}else q.log("renderElement should receive element or elementName")}var c=this,k=d("When"),g=d("Deferred"),n=h("CGApi"),t=h("Engine"),y=h("Dom"),m={},O=B++,w=7E3,A;this.hide=function(a,A){if(!a)return q.log("You can't use renderer.hide without params"),this;-1===a.indexOf("{")&&
(a+="{position:relative;left:-10000px;top:-10000px;}");A=(A||"gen_"+l++)+"_"+O;m[A]=!0;y.addCss(a,A);b();return this};this.show=function(b){if(!b)return q.log("You can't use renderer.show without params"),this;var a=b+"_"+O;if(!m[a])return q.log("ID ("+b+") you try to show is not found"),this;delete m[a];y.removeCss(a);return this};this.showAll=function(){var b=[];N(m,function(a,A){b.push(A)});y.removeMultiCss(b);m={};A&&(clearTimeout(A),A=null);return this};this.unhideAfter=function(a){"never"===
a||T(a)&&0<=a?(w=a,b()):q.log('You can use renderer.unhideAfter with number greater 0 or "never" string only.');return this};this.getContent=function(b){var A=g();b={pageId:b||(a.getPagePrefix()?"":a.getName()),pagePrefix:a.getPagePrefix()};n.request(b,function(b){b?A.resolve():A.reject()});return A.promise()};this.runVariantJs=function(b){if(0<arguments.length)e(b);else for(var A=a.getElements(),c=0;c<A.length;c++)e(A[c]);return this};this.waitUntilDom=function(b){return k(b,t.events.domReady)};
this.when=function(){return k.apply(c,arguments)}}),n=k.extend(function(a){var b=d("When"),e=h("Engine");this.waitForElement=function(a){return b(function(){return null!=document.querySelector(a)},e.events.domReady)}}),k=k.extend(function(a){var b=d("When"),e=d("Deferred"),c=h("Engine"),k=h("Dlp");this.waitForElement=function(a){var f=new e,d=!1,n=function(b){d=b};b(function(){k.checkNodeExist(a).done(n);return d},c.events.domReady).done(function(){f.resolve()}).fail(function(){k.checkNodeExist(a).done(n).then(function(b){b?
f.resolve():f.reject()},function(){f.reject()})});return f.promise()}});a.dlp=k;a.basic=n},Campaign:function(a,d,h){var l=d("Element");a.exports=function(a){function d(b){return function(a){return a.Name===b}}var n=this,f=h("Site"),b=a.Name,e=a.PagePrefix,c=h("BaseStorage",{namespace:b}),p={},g=W(a.Elements,function(b){return new l(b)}),H=a.Recommendations;this.updateData=function(b){for(var a=0;a<b.Elements.length;a++){var c=X(g,d(b.Elements[a].Name));0<=c?g[c]=new l(b.Elements[a]):g.push(new l(b.Elements[a]))}H=
b.Recommendations};this.getElements=function(){return g};this.getRecommendations=function(){return H};this.getExperience=function(){var a=f.getPageExperiences()[b],c={},e;for(e in a)a.hasOwnProperty(e)&&(c[e]=a[e]);return c};this.getElement=function(b){b||q.log("You can't use campaign.getElement without params");b=b.toLowerCase();return Z(g,d(b))||null};this.getStyles=function(b){return W(g,function(a){return a.getStyles(b)},!0)};this.isDefault=function(){if(!g||0==g.length)throw Error("There is no content for campaign "+
b+".");for(var a=!0,c=0;c<g.length;c++)a=a&&"Default"===g[c].VariantName;return a};this.getName=function(){return b};this.getPagePrefix=function(){return e};this.setData=function(b,a,e){c.set(b,a,e)};this.getData=function(b){return c.get(b)};this.clearData=function(b){c.set(b,null,-1)};this.events=h("EventsCampaign");this.getContext=function(){var b={};b.scope=p;b.isDefault=function(){return n.isDefault()};b.getElements=function(){for(var b={},a=0;a<g.length;a++)b[g[a].Name]=g[a].clone();return b};
b.getElement=function(b){return(b=n.getElement(b))?b.clone():b};b.getRecommendations=function(){return W(H,aa)};b.getStyles=function(b){return n.getStyles(b)};b.getExperience=function(){return n.getExperience()};b.getName=function(){return n.getName()};b.getPagePrefix=function(){return n.getPagePrefix()};b.events=n.events;b.setData=function(b,a,c){return n.setData(b,a,c)};b.getData=function(b){return n.getData(b)};b.clearData=function(b){return n.clearData(b)};return b}}},Element:function(a,d,h){function l(a){var d=
this;d.Name=a.Name;d.HTMLId=a.HTMLId;d.Order=a.Order;d.VariantName=a.VariantName;d.Data=aa(a.Data);this.getStyles=function(a){return W(Y(d.Data,function(f){return"Css"===f.Type&&(C(a)||f.Attrs.id===a)}),function(a){return a.Data})};this.clone=function(){return new l(d)}}a.exports=l},Site:function(a,d,h){a.config={singleton:!0};a.exports=function(){var a=this,d={},k={};this.getPageExperiences=function(){var a,f,b={};for(a in k)if(k.hasOwnProperty(a))for(f in b[a]={},k[a])k[a].hasOwnProperty(f)&&(b[a][f]=
k[a][f]);return b};this.setPageExperiences=function(a){var f,b,e;for(e in a)if(a.hasOwnProperty(e)){f=a[e];b=k[e];"undefined"===typeof b&&(k[e]={},b=k[e]);for(var c in f)f.hasOwnProperty(c)&&(b[c]=f[c])}return k};this.getContext=function(){var k={};k.scope=d;k.getPageExperiences=a.getPageExperiences;return k}}},Style:function(a,d,h){a.config={singleton:!0};d=d("Class").extend(function(){function a(){var b=h.createElement("style");b.type="text/css";b.media="screen";b.id=k.htmlId;var c=h.getElementsByTagName("head")[0];
c.insertBefore(b,c.lastChild);return b}function d(){var a="";N(b,function(b){a+=b});return a}var k=this,h=document;k.htmlId=ga("mm_cdApiStyleId");var f=a(),b={};this.set=function(b){(f=h.getElementById(k.htmlId))||(f=a());f.styleSheet?f.styleSheet.cssText=b:f.innerHTML=b};this.add=function(a,c){if(c){if(b[c]){q.error("Style with specified ID("+c+") already exists");return}b[c]=a}else b.nr=b.nr||"",b.nr+=a;k.set(d())};this.remove=function(){N(L(arguments),function(a){"nr"!==a&&b[a]?delete b[a]:q.error("Could not remove non-existent style "+
a+".")});k.set(d())};this.clear=function(){b={};k.set(d())}});a.exports=d},Action:function(a,d,h){a.config={singleton:!0};var l=d("Class").extend(function(){var a=this,k=h("CGApi"),l=d("Deferred");this.sendActions=function(d,b,e){for(var c=!0,k,g,l,h,n=0;n<d.length;n++)h=d[n].name,l=d[n].value,g=d[n].attribute,c&=k=d[n].postponedAction,k?a.postpone(h,l,g):a.set(h,l,g);!c||b?a.send().then(e):e()};this.send=function(a,b,e){var c=l();if(0<arguments.length&&a&&J(a))k.setAction(a,b,e);else if(0!==arguments.length){q.log("You can't use action.send without setting action name");
return}k.hasActions()?k.request({pageId:"mmevents"},function(a){a?c.resolve():c.reject()}):c.resolve();return c.promise()};this.postpone=function(a,b,e){if(!a||!J(a))return q.log("You can't use action.postpone without setting action name."),this;k.postAction(a,b,e);return this};this.set=function(a,b,e){if(!a||!J(a))return q.log("You can't use action.set without setting action name."),this;k.setAction(a,b,e);return this};this.trackClicks=function(d,b,e){h("Dom").trackClicks(d,b,e,a.sendActions)};this.getWrapper=
function(){return E(a,"send","postpone","set","trackClicks")}});a.exports=l},Visitor:function(a,d,h){a.config={singleton:!0};var l=d("Class").extend(function(){var a=this,l=d("Deferred"),f=h("CGApi");this.setAttr=function(a,e){f.setAttr(a,e);return this};this.storeAttr=function(a,e){f.storeAttr(a,e,365);return this};this.getAttr=function(a){return f.getAttr(a)};this.removeAttr=function(a){f.removeAttr(a);return this};this.setId=function(a,e){f.setId(a,e);return this};this.storeId=function(a,e){f.storeId(a,
e,365);return this};this.removeId=function(a){f.removeId(a);return this};this.setData=function(a,e,c){f.setData(a,e,c);return this};this.getData=function(a){return f.getData(a)};this.clearData=function(a){return f.clearData(a)};this.requestPage=function(a){var e=l();f.request({pageId:a},function(a){a?e.resolve():e.reject()});return e.promise()};this.getServerAttrs=function(){return aa(f.getServerAttrs())};this.getWrapper=function(){return E(a,"setAttr","storeAttr","getAttr","removeAttr","setId","storeId",
"removeId","setData","getData","clearData","requestPage","getServerAttrs")}}),B=l.extend(function(){var a=this;this.navigateTo=function(a){!J(a)||D(a)?q.log("CD API Visitor Module: You should pass targetUrl as a non-empty String to visitor.navigateTo()."):(K(window.stop)?window.stop():document.execCommand("Stop"),mmproxy.getValidatedObject(window.location,4,function(x){return window.location=x;},this).value.assign(a))};this.getWrapper=function(){return E(a,a.base.getWrapper(),"navigateTo")}}),l=l.extend(function(){var a=this,d=h("Dlp");this.navigateTo=function(a){!J(a)||D(a)?
q.log("CD API Visitor Module: You should pass targetUrl as a non-empty String to visitor.navigateTo()."):d.navigateTo(a)};this.getWrapper=function(){return E(a,a.base.getWrapper(),"navigateTo")}});a.basic=B;a.dlp=l},Dom:function(a,d,h){a.config={singleton:!0};var l=d("Class").extend(function(){function a(A,c,e){return function(){var a=p.getElements(c[0]);if(a.length)return c[0]=a,A.apply(b,c),e(),!0}}function l(){t=setInterval(function(){for(var a=0;a<B.length;a++)B[a]()&&(B.splice(a,1),--a);B.length||
clearInterval(t)},200);c.registerLoop(t)}function f(a,b){if(b&&!c.isVcbActive){var e=p.autoHide(a);return function(){p.removeCss(e)}}return ja()}var b=this,e=d("Deferred"),c=h("Vcb"),p=h("DomPlain"),g=[],B=[],t,y="hide resize freeMove changeStyle guidedMove remove bringToFront changeLinkUrl insertImageBannerBelow insertImageBannerAbove insertImageBannerWithin changeImageBanner editHtml insertHtmlAbove insertHtmlBelow insertHtmlWithin".split(" "),m=["addCss","removeCss","find"],O=["addListener","removeListener",
"getNodesAttribute","setNodesAttribute"];this.loop=function(A,c){return function(){var e=arguments[0],d=L(arguments),g=p.getElements(e);g.length?(d[0]=g,A.apply(b,d)):J(e)&&(e=f(e,!c),B.length||l(),B.push(a(A,d,e)))}};(function(a,c,e){c=c||{};N(e,function(e){c[e]=b.loop(a[e])})})(p,b,y);E(p,b,m);this.addListener=function(a,b,c){a=p.getElements(a);for(var e=0;e<a.length;e++){var d=p.addEvent(a[e],b,c);g.push({handler:c,handlerWrapper:d})}};this.removeListener=function(a,b,c){a=p.getElements(a);for(var e=
0;e<a.length;e++)for(var d=0;d<g.length;d++)g[d].handler===c&&p.removeEvent(a[e],b,g[d].handlerWrapper)};this.trackClicks=b.loop(p.trackClicks,!0);this.removeMultiCss=p.removeMultiCss;this.getNodesAttribute=function(){var a=L(arguments);a[0]=p.getElements(a[0]);var b=new e;b.resolve(p.getNodesAttribute.apply(p,a));return b.promise()};var w=b.loop(p.setNodesAttribute);this.setNodesAttribute=function(a,c,e,d){var f=L(arguments);"wait"===d?w.apply(b,f):(f[0]=p.getElements(f[0]),p.setNodesAttribute.apply(p,
f))};this.getWrapper=function(){var a=E(b,{},O);E(b,a,y);E(p,a,m);return a}}),B=d("Class").extend(function(){var a=this,d=h("Dlp"),f="addCss removeCss hide resize freeMove changeStyle guidedMove remove bringToFront changeLinkUrl insertImageBannerBelow insertImageBannerAbove insertImageBannerWithin changeImageBanner editHtml setNodesAttribute insertHtmlAbove insertHtmlBelow insertHtmlWithin".split(" "),b=["getNodesAttribute"],e=["addListener","removeListener"];this.addListener=function(a,b,e){d.addListener(a,
b,e)};this.removeListener=function(a,b,e){d.removeListener(a,b,e)};N(f,function(b){a[b]=d.proxy("Dom",b)});N(b,function(b){a[b]=d.proxy("Dom",b,!0)});this.trackClicks=function(a,b,e,f){d.trackClicks(a,b,e,f)};this.removeMultiCss=d.proxy("Dom","removeMultiCss");this.getWrapper=function(){var c=E(a,{},f);E(a,c,b);E(a,c,e);return c}});a.basic=l;a.dlp=B},DomPlain:function(a,d,h){a.config={singleton:!0};d=d("Class").extend(function(){function a(b,c){return window.getComputedStyle?window.getComputedStyle(b,
null)[c]:b.currentStyle?b.currentStyle[c]:b.style[c]}function d(a,b,c){T(c)?b[c]&&a.push(b[c]):a=a.concat(L(b));return a}function k(a,b){return(a.matches||a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector).call(a,b)}function n(a,b){for(var c=a.split(":eq("),e=[],f,g,m,w,h=0;h<c.length;h++){w=/^(?:\d+\))?\s*(>)?(\+)?\s*(.+)?/.exec(c[h]);f=w[3];if(!f)break;w=w[1]?"direct":w[2]?"next":"querySelector";for(m=(g=c[h+1]&&/^(\d+)\)(.+)?/.exec(c[h+1]))?g[1]:null;"querySelector"!==
w;)g=f.match(/([^ >]+)( \d+)?\s*(>?)(\+?)\s*(.*)/),f=g[5],e.push({selector:g[2]?g[1]+g[2]:g[1],findingType:w}),w=g[3]?"direct":g[4]?"next":"querySelector";f&&e.push({selector:f,findingType:w});m&&(e[e.length-1].index=parseInt(m,10))}c=R(b)?b:[b];for(f=0;f<e.length;f++){h=[];if("querySelector"===e[f].findingType)for(w=0;w<c.length;w++){g=e[f].index;m=[];for(var l=c[w].querySelectorAll(e[f].selector),n=0;n<l.length;n++)O.useZindex(l[n])&&m.push(l[n]);h=d(h,m,g)}else if("direct"===e[f].findingType)for(m=
0;m<c.length;m++){if(g=[],w=c[m].children){for(l=0;l<w.length;l++)1===w[l].nodeType&&k(w[l],e[f].selector)&&g.push(w[l]);h=d(h,g,e[f].index)}}else if("next"===e[f].findingType)for(g=0;g<c.length;g++)(w=c[g].nextSibling)&&1===w.nodeType&&k(w,e[f].selector)&&(h=d(h,[w],e[f].index));c=h}return L(c)}function f(a,b){b=b||document;for(var c=a.split(","),e=[],d=0;d<c.length;d++)c[d]=c[d].replace(/^\s+/g,"").replace(/\s+$/g,""),c[d]&&(e=e.concat(n(c[d],b)));return e}function b(a,b){var c=[],e=Object.prototype.toString.call(a);
J(a)?c=f(a,b):"[object Array]"===e||"[object NodeList]"===e||"[object HTMLCollection]"===e?c=L(a):c[0]=a;return c}function e(a){return a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/<title\b[^<]*(?:(?!<\/title>)<[^<]*)*<\/title>/gi,"").replace(/<link\b[^<]*>/gi,"").replace(/<meta\b[^<]*>/gi,"")}function c(a,b){for(var c=(a.style.cssText.replace(/[^;]$/,"$0;")+b).split(";"),e={},d=0;d<c.length;d++)if(c[d]){var f=c[d].split(":");e[f[0].replace(/\s/g,"")]=f[2]?f[1]+":"+
f[2]:f[1]}var c="",g;for(g in e)e.hasOwnProperty(g)&&(c+=g+":"+e[g]+"; ");m.setCssText(a,c.replace(/\s$/,""))}function p(b,e,d){var f=a(b,"position");e=e?parseInt(e,10):0;d=d?parseInt(d,10):0;if("relative"===f||"absolute"===f||"fixed"===f){var g=a(b,"left"),m=a(b,"right");"auto"===g&&"auto"!==m?e="right: "+(parseInt(m,10)-e)+"px !important; ":("auto"===g?g=e:"relative"===a(b,"position")?g=parseInt(g,10)+e:(g=parseInt(b.offsetLeft,10)+e,e=a(b,"margin-left"),"auto"!==e&&(g-=parseInt(e,10))),e="left: "+
g+"px !important; ");g=a(b,"top");m=a(b,"bottom");"auto"===g&&"auto"!==m?d="bottom: "+(parseInt(m,10)-d)+"px !important; ":("auto"===g?g=d:"relative"===a(b,"position")?g=parseInt(g,10)+d:(g=parseInt(b.offsetTop,10)+d,d=a(b,"margin-top"),"auto"!==d&&(g-=parseInt(d,10))),d="top: "+g+"px !important; ")}else f="relative",e="left: "+e+"px !important; ",d="top: "+d+"px !important; ";c(b,e+d+("position: "+f+" !important;"))}function g(a,b){C(b.imageUrl)||"img"!==a.tagName.toLowerCase()||(a.style.visibility=
"hidden",a.src=b.imageUrl,m.addEvent(a,"load",function(){a.style.visibility=""}));C(b.imageAlt)||a.setAttribute("alt",e(b.imageAlt));C(b.imageTitle)||a.setAttribute("title",e(b.imageTitle))}function H(a){var b,c;b=document.createElement("img");g(b,a);void 0!==a.linkUrl&&(c=document.createElement("a"),c.setAttribute("href",a.linkUrl),c.appendChild(b));return c||b}function t(a,c){return function(){for(var e=c&&[],d=L(arguments),f=b(d[0]),g=0;g<f.length;g++)if(f[g]&&f[g].tagName){d[0]=f[g];var w=a.apply(m,
d);c&&e.push(w)}return e}}function y(a,b){var c=fa(b),e=void 0;if(c){var d=ea(c);if(!d.sameSite){a.originalPreventDefault=a.originalPreventDefault||a.preventDefault;a.preventedByClientsCode=a.preventedByClientsCode||a.defaultPrevented&&!a.preventedByCdApiCode;a.preventDefault=function(){a.preventedByClientsCode=!0;a.originalPreventDefault()};a.originalPreventDefault();a.preventedByCdApiCode=!0;var f=!1,e=function(){f||a.preventedByClientsCode||(d.hrefHasJS?(new Function(c.getAttribute("href"))).call(window):
mmproxy.getValidatedObject(window.location,4,function(x){return window.location=x;},this).value.assign(c.href),f=!0)};setTimeout(e,2E3)}}return e}var m=this,O=h("Vcb"),w=h("Style");this.setCssText=function(a,b){a.style.cssText=b};this.addCss=function(a,b){if(!R(a)&&!J(a))return q.log("You try call dom.addCss with wrong arguments."),this;0===a.length&&q.log("WARNING: You add empty css.");a.join&&(a=a.join("\n"));w.add(a,b);return this};this.removeCss=function(a){if(!a)return q.log("You can't use dom.removeCss without params"),this;w.remove(a);return this};this.removeMultiCss=
function(a){w.remove.apply(w,a);return this};this.getStyle=a;this.getElements=b;this.find=f;this.updateElementStyle=t(c);this.addEvent=function(a,b,c){var e=function(b){b=b||window.event;!b.target&&b.srcElement&&(b.target=b.srcElement);return c.call(a,b)};a.addEventListener?a.addEventListener(b,e,!1):a.attachEvent&&a.attachEvent("on"+b,e);return e};this.removeEvent=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c):a.detachEvent&&a.detachEvent("on"+b,c)};this.addClass=function(a,b){b=
F(b);var c=F(a.getAttribute("class")||"");~c.indexOf(b)||a.setAttribute("class",F(c?c+" "+b:b))};this.hide=t(function(a){c(a,"visibility: hidden !important;")});this.show=t(function(a){c(a,"visibility: visible !important;")});this.resize=t(function(a,b,e,d,f){b=parseInt(b,10);e=parseInt(e,10);c(a,"width: "+b+"px !important; height: "+e+"px !important;");(d||f)&&p(a,d,f)});this.freeMove=t(p);this.changeStyle=t(c);this.guidedMove=t(function(a,b){if(0<=b){var c=a.parentElement;c.removeChild(a);var e=
c.children;b<e.length?c.insertBefore(a,e[b]):c.appendChild(a)}});this.remove=t(function(a){var b=a.parentElement;b&&b.removeChild(a)});this.bringToFront=t(function(b,e){if("undefined"===typeof e){for(var d=0,f=0,g=document.querySelectorAll("*"),m=g.length,w=0;w<m;w++)if(d=parseInt(a(g[w],"z-index"),10),!isNaN(d)&&f<d&&O.useZindex(g[w])&&(f=d),O.isVcbActive&&f>=O.maxZindex){f=O.maxZindex-11;break}e=f+10}d=a(b,"position");c(b,"z-index: "+e+" !important; position: "+("static"===d||"auto"===d?"relative":
d)+" !important;")});this.changeLinkUrl=function(a,b){m.setNodesAttribute(a,"href",b)};this.insertImageBannerAbove=t(function(a,b){var c=H(b);a.parentElement.insertBefore(c,a)});this.insertImageBannerBelow=t(function(a,b){var c=H(b);a.parentElement.insertBefore(c,a.nextSibling)});this.insertImageBannerWithin=t(function(a,b){var c=H(b);a.appendChild(c)});this.changeImageBanner=t(function(a,b){if("a"===a.tagName.toLowerCase()){void 0!==b.linkUrl&&a.setAttribute("href",b.linkUrl);for(var c=a.children,
e=0;e<c.length;e++)"img"===c[e].tagName.toLowerCase()&&g(c[e],b)}else"img"===a.tagName.toLowerCase()&&(g(a,b),void 0!==b.linkUrl&&"a"===a.parentElement.tagName.toLowerCase()&&a.parentElement.setAttribute("href",b.linkUrl))});this.editHtml=t(function(a,b){a.innerHTML=e(b)});this.setNodesAttribute=t(function(a,b,c){a.setAttribute(b,c)});this.getNodesAttribute=t(function(a,b){return a.getAttribute(b)},!0);this.insertHtmlAbove=t(function(a,b){var c=document.createElement("div");a.parentElement.insertBefore(c,
a);c.outerHTML=e(b)});this.insertHtmlBelow=t(function(a,b){var c=document.createElement("div");a.parentElement.insertBefore(c,a.nextSibling);c.outerHTML=e(b)});this.insertHtmlWithin=t(function(a,b){var c=document.createElement("div");a.appendChild(c);c.outerHTML=e(b)});this.autoHide=function(a){a=a.replace(/:eq\(\d*\)/gmi,"");var b=ba();m.addCss(a+"{visibility: hidden;}",b);return b};this.trackClicks=t(function(a,b,c,e){function d(){return[b.name,b.value,b.attribute,b.postponedAction]}O.isVcbActive?
O.registerClickAction(a,b,c):(a["data-mm-events-ref"]||(a["data-mm-events-ref"]={lockFuncs:[]},m.addEvent(a,"click",function(a){for(var b=this["data-mm-events-ref"].lockFuncs,c=[],d=0;d<b.length;d++){var f=b[d]();if(f){var g=f[0],m;m=g;var w=a;m=w.target===this?!1:J(w.data)&&da(w.data.split(","),m);m||(c.push({name:g,value:f[1],attribute:f[2],postponedAction:C(f[3])?!0:f[3]}),f=a.data&&J(a.data)?a.data.split(","):[],da(f,g)||(f.push(g),a.data=f.join()))}}if(c.length){var d=fa(this),b=!1,h;if(d){if(!(h=
ea(d)).sameSite||h.notRequiresReload)b=!0}else h=this.nodeName.toLowerCase(),d=this.getAttribute("type"),("input"===h||"button"===h)&&d&&"submit"===d.toLowerCase()||(b=!0);e(c,b,y(a,this))}})),a["data-mm-events-ref"].lockFuncs.push(d))})});a.exports=d},BaseWidget:function(a,d,h){a.config={singleton:!1};d=d("Class").extend(function(a){function d(a,b){for(;a&&a.parentNode;)if(a=a.parentNode,a===b)return!0;return!1}function k(){function a(c){return!c||!T(c.displayedCount)||c.displayedCount>=b.showsCount?
1:c.displayedCount+1}var b=g.options.showFrequency;if(!0!==b.always){var c=new Date,e=g.getWidgetData(),d=e.persistent,e=e.session,f;b.showsInterval&&"session"===b.showsInterval&&(f={lastShown:c,displayedCount:a(e)});c={lastShown:c,wasDismissed:d&&d.wasDismissed||!1,displayedCount:a(d)};g.setWidgetData(c,f)}}function n(){var a=g.getWidgetData(),b=a.persistent;g.setWidgetData({lastShown:b&&b.lastShown,wasDismissed:!0,displayedCount:b&&b.displayedCount},a.session)}function f(){function a(){var b=d.lastShown&&
d.lastShown.getTime();if(!D(h)){if("session"===h)return!e.session;if("campaign"===h)return!e.persistent;var f=new Date,g=f.getMonth(),f=f.getFullYear();if(g={hour:36E5,day:864E5,week:6048E5,month:864E5*(new Date(f,g,0)).getDate()}[h])return c-b>g}}var b=g.options.showFrequency;if(!(!0!==b.always&&b.showsInterval||b.neverAfterDismiss))return!0;var c=new Date,e=g.getWidgetData(),d=e.persistent,f=e.session;if(d&&!0===b.neverAfterDismiss&&!0===d.wasDismissed)return!1;if(!0===b.always||!b.showsInterval)return!0;
var h=F(b.showsInterval.toLowerCase()),b=b.showsCount;if(!D(h)&&b&&T(b)){if("session"===h&&!e.session||!e.persistent)return!0;var l=a();return"session"===h?f.displayedCount<b:d.displayedCount<b||l}}var b=h("CGApi"),e=h("Engine").events,c=h("Dom"),p=h("DomPlain"),g=this,q=!1,t=[],y=[];g.target=document.body;g.selectors={guidAttr:"data-vcb-me-guid",wrapper:"vcb-me-wrapper",overlay:"vcb-me-overlay",contentWrapper:"vcb-me-content-wrapper",content:"vcb-me-content",contentInner:"vcb-me-content-inner",dismiss:"vcb-me-dismiss",
pointer:"vcb-me-pointer"};g.type="BaseWidget";g.wrapper=null;g.contentWrapper=null;g.content=null;g.setWidgetData=function(a,c){var e=g.options.guid;a&&b.setData(e+"persistData",JSON.stringify(a),365);c&&b.setData(e+"sessionData",JSON.stringify(c),0)};g.getWidgetData=function(){var a=g.options.guid,c={persistent:void 0,session:void 0};if(!D(a)){var e=b.getData(a+"sessionData"),a=b.getData(a+"persistData");D(a)||(c.persistent=JSON.parse(a),c.persistent.lastShown=new Date(c.persistent.lastShown));D(e)||
(c.session=JSON.parse(e),c.session.lastShown=new Date(c.session.lastShown))}return c};g.clearWidgetData=function(){var a=g.options.guid;D(a)||(b.clearData(a+"persistData"),b.clearData(a+"sessionData"))};g.validateOptions=function(a){var b=[];a.appearance.name||b.push("Can't create widget! Name parameter required!");a.guid||b.push("Can't create widget! Guid parameter required!");a.content||b.push("Can't create widget! Content is required!");if(b.length)throw Error(b.join("\n"));};g.addClassesAndIdContentElements=
function(){for(var a=g.getContentWrapper(),b=g.options,a=a.firstChild;null!==a&&1!==a.nodeType;)a=a.nextSibling;var c;if(a){a.id||(a.id=b.guid);p.addClass(a,g.selectors.content);if(!D(b.closeEvent.dismissElements))for(c=p.getElements(b.closeEvent.dismissElements,a),b=0;b<c.length;b++)p.addClass(c[b],g.selectors.dismiss);for(b=a.lastChild;null!==b&&1!==b.nodeType;)b=b.previousSibling;!b||c&&~X(c,b)||p.addClass(b,g.selectors.contentInner)}};g.getWrapper=function(){if(d(g.wrapper,g.target))return g.wrapper;
var a=p.getElements("["+g.selectors.guidAttr+'="'+g.options.guid+'"]',g.target)[0];if(a)return a};g.wrapperFor=function(a){return function(){if(!d(g[a],g.target)){var b=g.getWrapper();g[a]=p.getElements("."+g.selectors[a],b)[0]}return g[a]}};g.getContentWrapper=g.wrapperFor("contentWrapper");g.getContent=g.wrapperFor("content");g.bindWidgetShowEvents=function(){var a=function(){f()&&g.show()},b=g.options.displayEvent,c;!0===b.onPageLoad&&e.domReady(a);if(!D(b.initAttachedTo)){var d=p.getElements(b.initAttachedTo);
for(c=0;c<d.length;c++)!0===b.onClick&&p.addEvent(d[c],"click",a),!0===b.onMouseOver&&p.addEvent(d[c],"mouseover",a),!0===b.onMouseOut&&p.addEvent(d[c],"mouseout",a)}if(b.delay){var h=1E3*parseInt(b.delay,10);if(b.startAfterIdle){var l;p.addEvent(document,"ontouchstart"in window?"touchmove":"mousemove",function(){window.clearTimeout(l);l=window.setTimeout(a,h)})}else window.setTimeout(a,h)}b.onLosePageFocus&&(p.addEvent(window,"blur",a),p.addEvent(window,"pagehide",a));b.onViewportMouseOut&&p.addEvent(document,
"mouseout",function(a){(a=a.relatedTarget||a.toElement)&&"html"!==a.nodeName.toLowerCase()||f()&&g.show()});if(!D(b.onCustomEvent))e.on(b.onCustomEvent,a)};g.bindDismissEvents=function(){var a=g.getWrapper(),b=g.options.closeEvent;if(b.onDismissButton&&!D(b.dismissElements))for(a=p.getElements(b.dismissElements,a),b=0;b<a.length;b++)p.addEvent(a[b],"click",g.dismiss)};g.bindCloseEvents=function(){function a(c){var e=p.getElements(g.options.displayEvent.initAttachedTo||""),d=g.getWrapper(),d=p.getElements("*:not(."+
g.selectors.overlay+")",d);if(~X(e,c.target)||~X(d,c.target))return!1;b()}var b=g.hide;g.options.closeEvent.onClickOutside&&(p.addEvent(document,"click",a),p.addEvent(window,"keydown",function(a){27===(C(a.which)?a.keyCode:a.which)&&b()}))};g.show=function(){var a=g.getWrapper();p.show(a);for(a=0;a<t.length;a++)t[a].call(null);q=!0};g.hide=function(){var a=g.getWrapper();c.hide(a);q=!1};g.dismiss=function(){g.hide();for(var a=0;a<y.length;a++)y[a].call(null)};g.destroy=function(){var a=g.getWrapper();
a&&a.parentNode&&a.parentNode.removeChild(a)};g.getOptions=function(){return g.options};g.isShown=function(){return q};g.subscribeFunctionOnImgsLoads=function(a){for(var b=p.getElements("img"),c=0;c<b.length;c++)p.addEvent(b[c],"load",a)};g.init=function(){g.options=g.mergeWithDefaultWidgetOptions(a);g.validateOptions(g.options);y.push(n);t.push(k);g.createWidgetDom();g.bindWidgetShowEvents()}});a.exports=d},Lightbox:function(a,d,h){a.config={singleton:!1};d=d("BaseWidget").extend(function(){function a(){var c=
b.getOverlay(),e=b.options.appearance,d={display:"block",position:"fixed",top:"0px",left:"0px",height:"100%",width:"100%"};e.fadeEnabled?(d["background-color"]=e.fadeColor,d.opacity=parseFloat(e.opacity)):d.opacity=0;f.updateElementStyle(c,M(d))}function d(){var a=b.getContentWrapper(),e=b.options.appearance,g={};g["background-color"]=e.backgroundColor;g.position="fixed";e.autofit?(g.display="inline-block",g.width="auto",g.height="auto"):(g.width=e.width,g.height=e.height);f.updateElementStyle(a,
M(g))}function k(){var a=b.getContentWrapper();f.updateElementStyle(a,M({top:0,left:0}));var e={},d=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,l=parseInt(f.getStyle(a,"width"),10),k=parseInt(f.getStyle(a,"height"),10),n=(h<k?h-30:k)/2;e.position=h<k+n-60?"absolute":"fixed";e.top="50%";e.left="50%";e["margin-top"]=-1*n+"px";e["margin-left"]=(d<l?d:l)/2*-1+"px";f.updateElementStyle(a,
M(e))}var n=h("Dom"),f=h("DomPlain"),b=this,e=b.base;b.type="Lightbox";b.widgetOverlay=null;b.getOverlay=b.wrapperFor("overlay");b.mergeWithDefaultWidgetOptions=function(a){return U({appearance:{backgroundColor:"#FFFFFF",fadeEnabled:!0,fadeColor:"#000000",opacity:.8,autofit:!0},displayEvent:{},closeEvent:{onDismissButton:!0,onClickOutside:!0},showFrequency:{always:!0,neverAfterDismiss:!0}},a)};b.show=function(){a();d();k();b.subscribeFunctionOnImgsLoads(k);e.show()};b.createWidgetDom=function(){b.wrapper=
document.createElement("div");b.wrapper.setAttribute(b.selectors.guidAttr,b.options.guid);f.addClass(b.wrapper,b.selectors.wrapper);n.hide(b.wrapper);b.target.appendChild(b.wrapper);b.widgetOverlay=document.createElement("div");f.addClass(b.widgetOverlay,b.selectors.overlay);b.wrapper.appendChild(b.widgetOverlay);a();n.bringToFront(b.widgetOverlay);b.contentWrapper=document.createElement("div");f.addClass(b.contentWrapper,b.selectors.contentWrapper);b.wrapper.appendChild(b.contentWrapper);b.contentWrapper.innerHTML=
b.options.content;b.addClassesAndIdContentElements();d();n.bringToFront(b.contentWrapper);b.bindCloseEvents();b.bindDismissEvents()};b.init()});a.exports=d},Notification:function(a,d,h){a.config={singleton:!1};d=d("BaseWidget").extend(function(){var a=h("Dom"),d=h("DomPlain"),k=this,n=k.base;k.type="Notification";k.mergeWithDefaultWidgetOptions=function(a){return U({appearance:{backgroundColor:"#FFFFFF"},displayEvent:{},closeEvent:{onDismissButton:!0},showFrequency:{always:!0}},a)};k.createWidgetDom=
function(){k.wrapper=document.createElement("div");k.wrapper.setAttribute(k.selectors.guidAttr,k.options.guid);d.addClass(k.wrapper,k.selectors.wrapper);a.hide(k.wrapper);k.target.appendChild(k.wrapper);k.contentWrapper=document.createElement("div");d.addClass(k.contentWrapper,k.selectors.contentWrapper);k.contentWrapper.innerHTML=k.options.content;k.wrapper.appendChild(k.contentWrapper);k.addClassesAndIdContentElements();k.bindCloseEvents();k.bindDismissEvents()};k.show=function(){var a=k.getWrapper(),
b,e=k.options.appearance;D(e.insertWithin)?D(e.insertAbove)?D(e.insertBelow)||(b=d.getElements(e.insertBelow)[0])&&b.parentElement.insertBefore(a,b.nextSibling):(b=d.getElements(e.insertAbove)[0])&&b.parentElement.insertBefore(a,b):(b=d.getElements(e.insertWithin)[0])&&b.appendChild(a);if(b){a=k.getContentWrapper();b=k.getContent();var e=k.options.appearance,c={},h={};h["background-color"]=e.backgroundColor;e.autofit?(c.display="inline-block",c.width="auto",c.height="auto"):(c.width=e.width,c.height=
e.height,c["margin-left"]="auto",c["margin-right"]="auto",h.width="100%",h.height="100%");d.updateElementStyle(b,M(h));d.updateElementStyle(a,M(c));n.show()}};k.hide=function(){var a=k.getWrapper();k.target.appendChild(a);n.hide()};k.init()});a.exports=d},Callout:function(a,d,h){a.config={singleton:!1};d=d("BaseWidget").extend(function(){function a(b){return"top"===b}function d(a){return"bottom"===a}function k(a){return"left"===a}function n(a){return"right"===a}function f(a){return"center"===a}function b(a){a=
a.getBoundingClientRect();var b=C(window.pageXOffset)?document.documentElement.scrollLeft:window.pageXOffset,c=C(window.pageYOffset)?document.documentElement.scrollTop:window.pageYOffset,e=mmproxy.getValidatedObject(a.top,0)+c,d=a.left+b,c=a.bottom+c,b=a.right+b;return{top:e,left:d,bottom:c,right:b,width:a.width||b-d,height:a.height||c-e}}function e(a){var b=(a||"").split(" ");a=F(b[0]||"left").toLowerCase();b=F(b[1]||"top").toLowerCase();return{side:a,part:b}}function c(a){var b=(a||"").split(" ");a=parseInt(b[0]||0,10);b=parseInt(b[1]||
0,10);return{side:a,part:b}}function p(g,h,m,p){function t(){k(x.part)?u.left=v.part:f(x.part)?u.left=r.width/2-S/2+v.part:n(x.part)&&(u.left=r.width-S-v.part)}function q(){a(x.part)?u.top=v.part:f(x.part)?u.top=r.height/2-I/2+v.part:d(x.part)&&(u.top=r.height-I-v.part)}var u={},x=e(m),v=c(p),r={};if("page"===h||"viewport"===h)r.top=r.right=r.bottom=r.left=0,"page"===h?(m=b(document.body),r.width=m.width,r.height=m.height):(r.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
r.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);if(g=y.getElements(g)[0]){g=b(g);var S=g.width,I=g.height;k(x.side)?(q(),u.left=v.side):n(x.side)?(q(),u.left=r.width-S-v.side):d(x.side)?(t(),u.top=r.height-I-v.side):a(x.side)?(t(),u.top=v.side):f(x.side)&&f(x.part)&&(u.left=r.width/2-S/2+v.side,u.top=r.height/2-I/2+v.part);u.position="viewport"===h?"fixed":"absolute";return u}}function g(g,h,m,p){function t(){a(x.part)?u.top=mmproxy.getValidatedObject(r.top,0)-v.part:f(x.part)?u.top=
mmproxy.getValidatedObject(r.top,0)+r.height/2-I/2+v.part:d(x.part)&&(u.top=r.bottom-I+v.part)}function q(){k(x.part)?u.left=r.left-v.part:f(x.part)?u.left=r.left+r.width/2-S/2+v.part:n(x.part)&&(u.left=r.right-S+v.part)}var u={},x=e(m),v=c(p),r={};if(h){h=y.getElements(h)[0];if(!h)return;r=b(h)}if(g=y.getElements(g)[0]){h=b(g);var S=h.width,I=h.height;g=g.offsetParent||document.body;h=y.getStyle(g,"position");if("relative"===h||"absolute"===h||"fixed"===h)g=b(g),r.top-=mmproxy.getValidatedObject(g.top,0),r.left-=g.left,r.right=r.left+r.width,r.bottom=mmproxy.getValidatedObject(r.top,0)+
r.height;k(x.side)?(t(),u.left=r.left-S-v.side):n(x.side)?(t(),u.left=r.right+v.side):a(x.side)?(q(),u.top=mmproxy.getValidatedObject(r.top,0)-I-v.side):d(x.side)?(q(),u.top=r.bottom+v.side):f(x.side)&&f(x.part)&&(u.left=r.left+r.width/2-S/2+v.part,u.top=mmproxy.getValidatedObject(r.top,0)+r.height/2-I/2+v.part);u.position="absolute";return u}}function q(){function c(a,b){b=b||"px";var e=["z-index"],d={},f;for(f in a)if(a.hasOwnProperty(f)){var g=a[f];T(g)&&0!==g&&!~X(e,f)&&(g+=b);d[f]=g}return d}function h(a){return{top:"bottom",bottom:"top",left:"right",
right:"left"}[a]}function z(a,b){y.updateElementStyle(a,M(b));y.updateElementStyle(a.children[0],M({width:0,height:0}))}function H(c,g,m,w){function p(b){var e,g="side"===b?"part":"side";a(z[b])||d(z[b])?e=0>mmproxy.getValidatedObject(c.top,0)&&G.bottom+r.height<t.height||mmproxy.getValidatedObject(c.top,0)+r.height>t.height&&0<mmproxy.getValidatedObject(G.top,0)-r.height?h(z[b]):z[b]:n(z[b])||k(z[b])?e=0>c.left&&G.right+r.width<t.width||c.left+r.width>t.width&&0<G.left-r.width?h(z[b]):z[b]:f(z[b])&&(e=a(z[g])||d(z[g])?0>c.left?"right":c.left+r.width>t.width?"left":z[b]:k(z[g])||n(z[g])?
0>mmproxy.getValidatedObject(c.top,0)?"top":mmproxy.getValidatedObject(c.top,0)+r.height>t.height?"bottom":z[b]:z[b]);return e}var t={width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},q=C(window.pageXOffset)?document.documentElement.scrollLeft:window.pageXOffset,u=C(window.pageYOffset)?document.documentElement.scrollTop:window.pageYOffset,r=U({},b(m));m=y.getElements(w)[0];var G=b(m),z=e(g);c=U({},c);c.top-=u;c.left-=q;r.top-=
u;r.left-=q;r.bottom-=u;r.right-=q;g=p("side");q=p("part");return g+" "+q}var G=m.getContentWrapper(),E=m.options.appearance,u=m.options.appearance.position,x,v=u.at;x={};y.updateElementStyle(G,M({top:0,left:0}));if("page"===u.relativeTo||"viewport"===u.relativeTo)x=p(G,u.relativeTo,v,u.offset),x=c(x);else if(!D(u.relativeTo)){x=g(G,u.relativeTo,v,u.offset);if(u.viewportDetection){var r=H(x,v,G,u.relativeTo);r!==v&&(v=r,x=g(G,u.relativeTo,v,u.offset))}x=c(x)}y.updateElementStyle(G,M(x));(function(f,
I,p){function q(b){b=a(b)||d(b)?"width":k(b)||n(b)?"height":void 0;b=Math.ceil(3*Math.log(T[b]));return 7>b?7:b}function r(a){var b=P+"px solid "+E.backgroundColor,c=P+"px solid transparent";return U(R,{top:{"border-bottom":b,"border-left":c,"border-right":c},bottom:{"border-top":b,"border-left":c,"border-right":c},right:{"border-top":c,"border-bottom":c,"border-left":b},left:{"border-top":c,"border-bottom":c,"border-right":b}}[a])}function u(a,b){var c=a;b&&2*a>b&&(c=b-a,c=0>c?0:c);return c}var v=
m.getContent(),x=m.getPointer(),H=x&&x.children[0],P,C,O=!1,D=1,K=1,F=0,L=0,Q="0 ",N={},R={width:0,height:0,"border-top":"none","border-bottom":"none","border-left":"none","border-right":"none"};if(I){var V=e(f),T=b(G);C=V.part;"page"===p||"viewport"===p?(J(I)?(p=e(I),f=p.side,C=p.part,O=f!==V.side&&f!==V.part):(f=V.side,I=f+" "+C),K=-1):(f=h(V.side),I=f+" "+C,D=-1,p=y.getElements(p)[0],N=b(p));P=q(f);p=r(f);y.updateElementStyle(x,M(p));p=b(x);V=a(C)||d(C)?u(p.height,N.height):0;N=k(C)||n(C)?u(p.width,
N.width):0;a(f)?(L=p.height,Q+=-N):d(f)?(L=p.height*K*D,Q+=-N):k(f)?(F=p.width,Q+=-V):n(f)&&(F=p.width*K*D,Q+=-V);O||t.freeMove(G,F,L);I=c(g(x,v,I,Q));y.updateElementStyle(x,M(I));H&&(x=H.children[0],I=Math.sqrt(2*Math.pow(P,2)),v={margin:0,padding:0,"box-shadow":y.getStyle(v,"box-shadow"),transform:"rotate(45deg)",position:"absolute","z-index":-1,width:I,height:I},D={position:"absolute",overflow:"hidden",top:-P,left:-P,width:2*p.width,height:2*p.height},F=P-I/2+p.width/2,L=-P-p.width/2,Q=P-I/2+p.height/
2,p=-P-p.height/2,a(f)?(v.top=2*P-I/2,v.left=F,D.left=L):d(f)?(v.top=-I/2,v.left=F,D.left=L):k(f)?(v.top=Q,v.left=2*P-I/2,D.top=p):n(f)&&(v.top=Q,v.left=-I/2,D.top=p),y.updateElementStyle(H,M(c(D))),y.updateElementStyle(x,M(c(v))))}else z(x,R)})(v,u.pointer,u.relativeTo)}var t=h("Dom"),y=h("DomPlain"),m=this,E=m.base;m.type="Callout";m.pointer=null;m.mergeWithDefaultWidgetOptions=function(a){return U({appearance:{backgroundColor:"#FFFFFF",autofit:!0,position:{at:"top left",relativeTo:"viewport"}},
displayEvent:{},closeEvent:{onDismissButton:!0},showFrequency:{always:!0}},a)};m.getPointer=m.wrapperFor("pointer");m.createWidgetDom=function(){m.wrapper=document.createElement("div");m.wrapper.setAttribute(m.selectors.guidAttr,m.options.guid);y.addClass(m.wrapper,m.selectors.wrapper);t.hide(m.wrapper);m.target.appendChild(m.wrapper);m.contentWrapper=document.createElement("div");y.addClass(m.contentWrapper,m.selectors.contentWrapper);m.contentWrapper.innerHTML=m.options.content;m.wrapper.appendChild(m.contentWrapper);
t.bringToFront(m.contentWrapper);m.addClassesAndIdContentElements();m.pointer=document.createElement("span");y.addClass(m.pointer,m.selectors.pointer);y.updateElementStyle(m.pointer,M({width:0,height:0,margin:0,padding:0,display:"inline-block"}));m.contentWrapper.appendChild(m.pointer);var a=document.createElement("div");m.pointerShadow=document.createElement("div");m.pointerShadow.appendChild(a);m.pointer.appendChild(m.pointerShadow);m.bindCloseEvents();m.bindDismissEvents()};m.show=function(){var a=
m.getContentWrapper(),b=m.getContent(),c=m.options.appearance,e={},d={};d["background-color"]=c.backgroundColor;c.autofit?(e.display="inline-block",e.width="auto",e.height="auto"):(e.width=c.width,e.height=c.height,d.width="100%",d.height="100%");d=U(e,d);y.updateElementStyle(b,M(d));y.updateElementStyle(a,M(e));q();m.subscribeFunctionOnImgsLoads(q);E.show()};m.init()});a.exports=d},Widgets:function(a,d,h){a.config={singleton:!0};d=d("Class").extend(function(){var a=this;this.createLightbox=function(a,
d){a.guid=d;h("Lightbox",a)};this.createNotification=function(a,d){a.guid=d;h("Notification",a)};this.createCallout=function(a,d){a.guid=d;h("Callout",a)};this.getWrapper=function(){return E(a,"createLightbox","createCallout","createNotification")}});a.exports=d},Dlp:function(a,d,h){a.config={singleton:!0};var l=d("Class").extend(function(a){function k(a){if(a.origin===y){a=a.data;var b;try{b=JSON.parse(a)}catch(c){q.log("Can not parse message,\nbecause of: "+c.message+"\nerror with object:",a)}if(b)if(b.request)try{b.command&&
C[b.command](b)}catch(e){q.log('Can not execute "'+b.command+'" request command,\nbecause error occurred: '+e.message)}else if(b.error&&q.log(b.error),a=H[b.hash]){try{b.error?a.reject({error:b.error,data:b.data}):a.resolve(b.data)}catch(d){q.log(d)}delete H[b.hash]}}}function l(a,b){return{hash:ba(),command:a,data:b}}function f(a){try{mmproxy.getValidatedObject(window.parent,3)(JSON.stringify(a),y)}catch(b){q.log("Can not send event through post message,\nbecause of: "+b.message+"\nerror with object:",a);var c=H[a.hash];
c&&(c.reject({error:b,data:void 0}),delete H[a.hash])}}function b(a){var b=new p;H[a.hash]=b;f(a);return b.promise()}function e(a,b,c){return function(){for(var e={},d=0;d<c.length;d++)e[c[d]]=arguments[d];return a(l(b,e))}}var c=this,p=d("Deferred"),g=h("Action"),H={},t=new p,y=a.dlpOrigin,m={},C={console:function(a){a=a.data;q[a.method](a.message)},raiseEvent:function(a){m[a.data.handlerHash]()},"Action.sendActions":function(a){a=a.data.args;var b=a[2];a[2]=function(){f(l("runCallback",{handler:b}))};
g.sendActions.apply(g,a)}};this.parentReady=function(a){t.done(ia(a));return"resolved"===t.state()};this.proxy=function(a,c,e){return function(){var d={args:L(arguments),promised:e};return(e?b:f)(l(a+"."+c,d))}};this.trackClicks=function(a,b,c,e){f(l("Dom.trackClicks",{args:[a,b,c]}))};this.addListener=function(a,b,c){a=l("Dom.addListener",{selector:a,eventName:b});var e,d;for(d in m)if(m.hasOwnProperty(d)&&m[d]===c){e=d;break}d=a.data;e?d.handlerHash=e:(d.handlerHash=ba(),m[d.handlerHash]=c);f(a)};
this.removeListener=function(a,b,c){a=l("Dom.removeListener",{selector:a,eventName:b});for(var e in m)if(m.hasOwnProperty(e)&&m[e]===c){a.data.handlerHash=e;f(a);break}};this.checkNodeExist=e(b,"checkNodeExist",["selector"]);this.navigateTo=e(f,"navigateTo",["url"]);addEventListener?addEventListener("message",k,!1):attachEvent("onmessage",k);t=b(l("parentReady"));this.isDlpEnabled=function(){return!0};this.getWrapper=function(){return E(c,"isDlpEnabled")}});a.basic=function(){var a=this;this.getWrapper=
function(){return E(a,"isDlpEnabled")};this.isDlpEnabled=function(){return!1}};a.dlp=l},Modules:function(a,d,h){var l=d("Class");h=l.extend(function(){var a=this,h={cgapi:{},campaign:{alias:"Campaign",args:["campaignData"]},site:{alias:"Site"},renderer:{alias:"Renderer",args:["campaign"]},element:{},html:{},css:{},Deferred:{},when:{},events:{alias:"Events"},actions:{alias:"Action"},visitor:{alias:"Visitor"},modules:{alias:"Modules"},dom:{alias:"Dom"},cookies:{alias:"Cookies"},style:{alias:"Style"},
recommendations:{}},n=[],f=[],b={};this.define=function(a,b,h){if(!a||"string"!==typeof a)return q.log("Invalid module alias ( "+a+" )."),this;if(n[a])return n[a].reserved?q.log("Reserved name can not be used ( "+a+" )."):q.log("Module with this alias already defined  ( "+a+" )."),this;"function"===typeof b?(h=b,b={}):"string"===typeof b?b={extend:b}:b&&"object"===typeof b||(b={});"undefined"===typeof b.singleton&&(b.singleton=!0);"undefined"===typeof b.autoDefine&&(b.autoDefine=!0);if("undefined"!==
typeof b.extend&&("string"!==typeof b.extend||!b.extend))return q.log("Invalid parent alias ( "+b.extend+" )"),this;if(b.extend&&(!n[b.extend]||n[b.extend].reserved&&!n[b.extend].standard))return q.log("Parent module is not defined ( "+b.extend+" )"),this;if(!h||"function"!==typeof h)return q.log("Invalid module function ( "+a+" )."),this;var g;if(b.extend){var k=n[b.extend],t;k.reserved&&k.standard?(t=d(k.standard),"undefined"===typeof t.extend&&(t=l.extend(t)),g=k.args):t=k.func;h=t.extend(h)}else h=
l.extend(h);n[a]={func:h,extend:b.extend,extendArgs:g,reserved:!1,singleton:b.singleton,autoDefine:b.autoDefine};!0===b.autoDefine&&f.push(a);return this};this.require=function(a){if(a&&"string"===typeof a){var c=n[a];if(c&&!0!==c.reserved){a=c.instance;if(!a||!c.singleton)if(c.extendArgs){var d=[],f;for(f in c.extendArgs)c.extendArgs.hasOwnProperty(f)&&d.push(b[c.extendArgs[f]]);var h=function(){h.prototype=c.func.prototype;return c.func.apply(this,d)};a=new h}else a=new c.func;if(c.singleton){c.instance=
a;f={};var l=a,k;for(k in l)l.hasOwnProperty(k)&&(f[k]="function"===typeof l[k]?function(a){return function(){return l[a].apply(l,arguments)}}(k):l[k]);a=f}return a}q.log("Module is not registered ( "+a+" ).")}else q.log("Invalid module alias ( "+a+" ).")};this.getWrapper=function(d){d&&(b=d);return E(a,"define","require")};this.mergeInstances=function(b){b=b||{};for(var c in f)if(f.hasOwnProperty(c)){var d=f[c];b[d]||(b[d]=a.require(d))}return b};(function(){for(var a in h)if(h.hasOwnProperty(a)){var b=
h[a];n[a]=b&&b.alias?{reserved:!0,standard:b.alias,args:b.args}:{reserved:!0}}}).call(a)});a.exports=h},Vcb:function(a,d,h){a.config={singleton:!0};d=d("Class").extend(function(a){var d=this;a=(a=a.vcbParams)||{isVcbActive:!1,maxZindex:12E5,registerLoop:function(){},useZindex:function(){return!0},registerClickAction:function(){return null}};N(a,function(a,h){d[h]=a})});a.exports=d},Recommendations:function(a,d,h){a.config={singleton:!1};var l=d("Class").extend(function(a){var l=this,n=h("CGApi"),
f=d("Deferred");this.setCategoryFilter=function(a,d,c){n.setCategoryFilter(a,d,c);return this};this.setProductFilter=function(a,d,c){n.setProductFilter(a,d,c);return this};this.requestPage=function(a){var d=f();n.request({pageId:a},function(a){a?d.resolve():d.reject()});return d.promise()};this.getProducts=function(){return a};this.getWrapper=function(){return E(l,"setCategoryFilter","setProductFilter","requestPage","getProducts")}});a.exports=l}};mmInitCallback(function(a,d,h){new function(a,d,h,
n){function f(){var a=mmproxy.getValidatedObject(location,4,function(x){return location=x;},this).value.search;if(mmproxy.getValidatedObject(window.parent,1)!==window.self&&-1!==a.indexOf("original-url")&&(a=a.replace(/^\?/,"").split("&"),a=Z(a,function(a){return 0===a.indexOf("original-url")}))){var b,c;try{b=decodeURIComponent(a).split("=").slice(1).join("="),c=/http(s)?:\/\/.*?([^/]|$)+/.exec(b)[0]}catch(d){return}return c}}function b(a,b,c){function d(a){a.apply({},f)}c=c.replace(/[^a-z0-9_]*/gi,"");b=v.mergeInstances(b);var e=[],f=[];K(n.scriptArgumentsWrapper)&&(b=n.scriptArgumentsWrapper(b));
for(var g in b)b.hasOwnProperty(g)&&(e.push(g),f.push(b[g]));a="var applier = arguments[2];var scriptName = arguments[1];function "+c+"(){\nfunction inner_"+c+"("+e.join(",")+"){\n"+a+"\n}try {\n applier(inner_"+c+");\n} catch (e) {\ne.message = 'Error in '+scriptName+': ' + e.message;\nconsole.error(e);\n};};\n"+c+"();//# sourceURL="+c+".js";try{la.apply({},[a,c,d])}catch(h){h.message="Error in "+c+": "+h.message,q.error(h)}}function e(a){return"1.12"===a.HighLevelApiVersion}function c(a){a=z.require("Renderer",
a);a.constructor=void 0;return a}function p(a){var b=y();b.modules=v.getWrapper(a);b.campaign=a.campaign.getContext();b.renderer=c(a.campaign);return b}function g(a){if(a=u[a])return a=p({campaign:a}),a=v.mergeInstances(a)}function H(){var a=t();return a=v.mergeInstances(a)}function t(){var a=y();a.modules=v.getWrapper({});return a}function y(){return{site:x.getContext(),Deferred:z.requireClass("Deferred"),when:z.requireClass("When"),events:D.events.getWrapper(),actions:z.require("Action").getWrapper(),
visitor:z.require("Visitor").getWrapper(),dom:z.require("Dom").getWrapper(),widgets:z.require("Widgets").getWrapper(),dlp:z.require("Dlp").getWrapper(),cookies:z.require("Cookies").getWrapper(),recommendations:z.require("Recommendations",J).getWrapper()}}function m(c){r||(x=z.require("Site"),v=z.require("Modules"),r=!0);if(!n.skipPersistentData)for(var d=c.PersistData||[],f=d.length;f--;)a.setParam(d[f].Name,d[f].Value,a.baseStorage.storeStrategy.persistent,d[f].Expiration);var f,d=[],h=Y(c.Campaigns||
[],e),k=Y(c.Scripts||[],e),m=z.requireClass("Campaign");for(f=0;f<k.length;f++)d.push({script:k[f]});for(f=0;f<h.length;f++){k=h[f].Name;u[k]?u[k].updateData(h[f]):u[k]=new m(h[f]);J[k]=u[k].getRecommendations();for(var q=0;q<h[f].Scripts.length;q++)d.push({script:h[f].Scripts[q],campaign:u[k],campaignData:h[f]})}x.setPageExperiences(c.GenInfo||{});A=c.ServerAttributes;d.sort(function(a,b){return a.script.Order-b.script.Order});for(f=0;f<d.length;f++)c=d[f].script.Data,h=d[f].script.Name,(m=d[f].campaign)?
(k=d[f].campaignData,b(c,p(d[f],{campaignData:k,campaign:m}),k.Name+"_"+h)):b(c,t(),"Site_"+h);n.debug&&(n.debug["1.12"]={context:{getSiteScriptArguments:H,getCampaignScriptArguments:g}})}n=n||{};var D=this,w=[1,0];if(a.version.split(".")[0]!=w[0]||a.version.split(".")[1]<w[1])q.log("Loader have non compatible version with High level API.");else{var A={},w=f(),z=new ka({Engine:D},h,{isDlpEnabled:!C(w),dlpOrigin:w,vcbParams:n.vcbParams,cookieDomain:a.calcCookieDomain||a.cookie_domain||mmproxy.getValidatedObject(window.location,4,function(x){return window.location=x;},this).value.hostname.replace(/^www\./i,
""),isBaseStorageSecure:a.baseStorage.isSecure,moduleExtensions:n.moduleExtensions});z.addModule("BaseStorage",function(b){b.config={singleton:!1};b.exports=function(b){return a.baseStorage(b.namespace)}});z.addModule("Engine",function(a){a.config={singleton:!0}});var E=z.require("BaseStorage",{namespace:"mmengine"}),G={persistent:0,deferredRequest:1,request:2,page:3};this.storeStrategy=G;var F=[];F[G.page]={};F[G.request]={};var u={},x,v,r,J={};this.setParam=function(b,c,d,e){if(n.useLoaderStorage)a.setParam(b,
c,d,e);else switch(d){case G.persistent:case G.deferredRequest:a.setParam(b,c,d);break;case G.request:case G.page:F[d][b]=c;break;default:q.log("Unknown store strategy: "+d)}};this.getParam=function(b,c){if(n.useLoaderStorage)return a.getParam(b,c);switch(c){case G.persistent:case G.deferredRequest:return a.getParam(b,c);case G.request:case G.page:return F[c][b];default:q.log("Unknown store strategy: "+c)}};this.setData=function(a,b,c){E.set(a,b,c)};this.getData=function(a){return E.get(a)};this.clearData=
function(a){E.set(a,null,-1)};this.getServerAttrs=function(){return A};this.CGRequest=function(b){var c;n.useLoaderStorage||(c=a.mergeParams(F[G.page],F[G.request]),F[G.request]={});a.CGRequest(function(a){K(b)&&b(a)},c)};this.runElementScript=function(a,d,e,f){d=a.getElement(d);var g=y();g.modules=v.getWrapper();g.campaign=a.getContext();g.renderer=c(a);g.element=d.clone();g.html=e.html;g.css=e.css;g.recommendations=z.require("Recommendations",a).getWrapper();b(f,g,a.getName()+"_"+d.Name+"_"+d.VariantName)};
this.events=z.require("EventsSite");n.skipResponseProcessing||m(d);a.on("response",m)}}(a,d,ma,h)})})()})();