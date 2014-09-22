/*
 Deferred Updates plugin for Knockout http://knockoutjs.com/
 (c) Michael Best, Steven Sanderson
 License: MIT (http://www.opensource.org/licenses/mit-license.php)
 Version 3.1.0
*/
(function(f){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?f(require("knockout")):"function"===typeof define&&define.amd?define(["knockout"],f):f(ko)})(function(f){function k(a,c){for(var b in a)if(a.hasOwnProperty(b)&&a[b]&&0<=a[b].toString().indexOf(c))return b}function s(a,c){for(var b in a)if(a.hasOwnProperty(b)&&a[b]===c)return b}function Y(a,c,b,f){var e=a.subscribe(c,null,"dirty",!1,f),g=a.subscribe(b,null,"change",!1,f);return{dispose:function(){e.dispose();
g.dispose()},target:a}}var E="object"===typeof global&&global?global:window;if(!f)throw Error("Deferred Updates requires Knockout");if("3.2.0"<=f.version)throw Error("This version of Deferred Updates supports Knockout version 3.1 and lower.");f.tasks=function(){function a(a){var b=0,d=0;h=h._next={_mark:!0};try{for(var c=a;c=c._next;)if(k=c,c._mark){if(c._next){if(5E3<=++d)throw Error("'Too much recursion' after processing "+b+" tasks.");h=h._next={_mark:!0}}}else c._done||(c._done=!0,c._func.apply(c.object,
c.args||[]),++b)}finally{if(a!==n)a._next=null,h=a;else{p=[];n._next=null;q=h=n;if(g)E[e](g);g=void 0}k=void 0}return b}function c(){if(!k)return a(n)}var b,e;E.setImmediate?(b="setImmediate",e="clearImmediate"):(b="setTimeout",e="clearTimeout");var g,n={},h=n,p=[],k,q=n,d={processImmediate:function(b,c,d){p.push(q);q=h;try{return b.apply(c,d||[])}finally{try{q._next&&a(q)}finally{q=p.pop()||n}}},processDelayed:function(a,d,f){2==arguments.length&&"object"==typeof d&&(f=d,d=f.distinct);var e;if(e=
d||void 0===d)a:{e=k||q;for(var m;m=e._next;e=m)if(m._func===a&&!m._done){e._next=m._next;e._next||(h=e);e=!0;break a}e=!1}m=f||{};m._func=a;h=h._next=m;p.length||g||(g=E[b](c));return!e},makeProcessedCallback:function(a){return function(){return d.processImmediate(a,this,arguments)}}};f.processDeferredBindingUpdatesForNode=f.processAllDeferredBindingUpdates=function(){for(var a=n;a=a._next;)a.node&&!a._done&&(a._done=!0,a._func.call())};f.processAllDeferredUpdates=c;f.evaluateAsynchronously=function(a,
b){return setTimeout(d.makeProcessedCallback(a),b)};return d}();var z=f.utils,N=z.objectForEach||function(a,c){for(var b in a)a.hasOwnProperty(b)&&c(b,a[b])},P=z.arrayForEach,Z={__proto__:[]}instanceof Array?function(a,c){a.__proto__=c;return a}:z.extend,g=function(a,c){for(var b in a)if(a.hasOwnProperty(b)&&a[b]&&a[b][c])return a[b]}(f,"end"),$=k(g,".apply(")||"ignore",I=k(g,".push"),Q=k(g,"Only subscribable"),aa=g.isInitial?s(g,g.isInitial):"isInitial",u=f.computed,ba=function(a,c){var b=[],f;for(f in a)a.hasOwnProperty(f)&&
a[f]===c&&b.push(f);return b}(f,u),J=s(u.fn,u),e=f.computed(function(){}),ca=s(e,e.peek)||"peek",da=s(e,e.isActive)||"isActive",R=s(e,e.getDependenciesCount),S=s(e,!1),ea=s(e,e.dispose),T="disposeWhenNodeIsRemoved",U="disposeWhen";if("hasWriteFunction"!=S){var e=u.toString(),A;if(A=e.match(/.\.disposeWhenNodeIsRemoved\s*\|\|\s*.\.([^|\s,]+)/))T=A[1];if(e=e.match(/.\.disposeWhen\s*\|\|\s*.\.([^|\s,]+)/))U=e[1]}var fa=k(z,"documentElement)")||k(z,"ocument)"),e=f.subscribable.fn;A=k(e,".bind(");var K=
k(e,"notifySubscribers"),v=(new f.subscribable).subscribe(),C=v.constructor.prototype,L=s(C,v.dispose);v.dispose();var v=null,V,W;K&&f.extenders.rateLimit&&(v=(new f.subscribable).extend({rateLimit:1}),W=k(v,"=!0")||"_rateLimitedChange",V=k(v,"||(")||"_rateLimitedBeforeChange",v=null);var X=[],r,ga=0;g[I]=function(a){X.push(r);r=a};g.end=function(){r=X.pop()};g[Q]=function(a){if(r){if(!f.isSubscribable(a))throw Error("Only subscribable things can act as dependencies");r.callback(a,a._id||(a._id=++ga))}};
f.ignoreDependencies=g[$]=function(a,c,b){try{return g[I](),a.apply(c,b||[])}finally{g.end()}};g[R]=g.getDependenciesCount=function(){if(r)return r.computed.getDependenciesCount()};g[aa]=g.isInitial=function(){if(r)return r.isInitial};var ha=e[A];e[A]=e.subscribe=function(a,c,b,e,g){b=b||"change";if(g)"change"==b&&(this.dependents=this.dependents||[],this.dependents.push(g));else{var n=c?a.bind(c):a;a="change"!=b?n:function(a){p.deferUpdates&&!1!==h.deferUpdates||h.deferUpdates?f.tasks.processDelayed(n,
{args:[a]}):n(a)}}var h=ha.call(this,a,null,b);h.target=this;h.event=b;h.dependent=g;h.deferUpdates=e;return h};var F=e.notifySubscribers,x;e.notifySubscribers=function(a,c){if("change"===c||"dirty"===c||void 0===c)if(x)x.push([this,a,c]);else try{if(x=[],F.call(this,a,c),x.length)for(var b=0,f;f=x[b];b++)Function.prototype.call.apply(F,f)}finally{x=null}else F.call(this,a,c)};e.getDependents=function(){return this.dependents?[].concat(this.dependents):[]};var ia=C[L];C[L]=C.dispose=function(){ia.call(this);
this.dependent&&"change"==this.event&&z.arrayRemoveItem(this.target.dependents,this.dependent)};var p=function(a,c,b){function e(){x=!0;N(D,function(a,b){b.dispose()});P(C,function(a){a.dispose()});D={};B=0;C=[];t=l=!1}function k(a,b){var c="dirty"==b,e=c&&!t&&!l;c?t=!0:l=!0;(c=d.throttleEvaluation)&&0<=c?(clearTimeout(E),E=f.evaluateAsynchronously(q,c)):d._evalRateLimited?d._evalRateLimited():p.deferUpdates&&!1!==d.deferUpdates||d.deferUpdates?e=f.tasks.processDelayed(q,{node:G}):l&&(q(),e=!1);e&&
d.notifySubscribers&&(d.notifySubscribers(w,"dirty"),!t&&c&&clearTimeout(E))}function n(a){t||l?l=!0:k(a,"change")}function h(a){k(a,"dirty")}function r(a,b){if(!D[b]){var c;c=a[J]===p?Y(a,h,n,d):a.subscribe(n,null,"change",!1,d);D[b]=c;B++}}function s(){if(x)return!0;if(O&&O()){if(!u)return H(),l=!1,!0}else u=!1}function q(a){if(m||!l&&!0!==a)t=l;else if(!s()){m=!0;try{var b=D,e=B;g[I]({callback:function(a,c){x||(e&&b[c]?(D[c]=b[c],++B,delete b[c],--e):r(a,c))},computed:d,isInitial:!B});D={};B=0;
try{var f=c?y.call(c):y()}finally{g.end(),e&&N(b,function(a,b){b.dispose()}),t=l=!1}d.equalityComparer&&d.equalityComparer(w,f)||(d.notifySubscribers(w,"beforeChange"),w=f,d._latestValue=w,d._evalRateLimited&&!d.throttleEvaluation||d.notifySubscribers(w))}finally{m=!1}}}function d(){if(0<arguments.length){if("function"===typeof A){var a=d.deferUpdates;d.deferUpdates=!1;try{A.apply(c,arguments)}finally{d.deferUpdates=a}}else throw Error('Cannot write a value to a ko.computed unless you specify a "write" option. If you wish to read the current value, don\'t pass any parameters.');
return this}(l||t)&&q(!0);g[Q](d);return w}function v(){return l||t||0<B}var w,t=!1,l=!0,m=!1,u=!1,x=!1,y=a;y&&"object"==typeof y?(b=y,y=b.read):(b=b||{},y||(y=b.read));if("function"!=typeof y)throw Error("Pass a function that returns the value of the ko.computed");var A=b.write;c||(c=b.owner);var D={},B=0,C=[],E=null,M,G=b[T]||b.disposeWhenNodeIsRemoved||null,F=b[U]||b.disposeWhen,O=F,H=e;G&&(u=!0,G.nodeType&&(O=function(){return!z[fa](G)||F&&F()}));f.subscribable.call(d);Z(d,p.fn);d[ca]=d.peek=
function(){!l&&!t||B||q(!0);return w};d[R]=d.getDependenciesCount=function(){return B};d[S]=d.hasWriteFunction="function"===typeof A;d[ea]=d.dispose=function(){H()};d[da]=d.isActive=v;d.activeWhen=function(a){M||(M=f.computed(function(){m=!a();!m&&l&&k(void 0,"change")}),M.deferUpdates=!1,C.push(M))};d.getDependencies=function(){var a=[];N(D,function(b,c){a.push(c.target)});return a};if(K){var L=d[K];d[K]=function(a){L.call(d,a);d._evalRateLimited=function(){t=l=!1;d[V](w);l=!0;d[W](d)}}}if(!s()&&
!0!==b.deferEvaluation){m=!0;try{g[I]({callback:r,computed:d,isInitial:!0}),d._latestValue=w=y.call(c)}finally{g.end(),l=m=!1}}G&&v()&&(H=function(){z.domNodeDisposal.removeDisposeCallback(G,H);e()},z.domNodeDisposal.addDisposeCallback(G,H));return d};p[J]=u[J];p.fn=u.fn;p.fn[J]=p;p.deferUpdates=!0;P(ba,function(a){f[a]=p});u=e=null;f.extenders.throttle=function(a,c){if(f.isWriteableObservable(a)){var b=null;return f.computed({read:a,write:function(e){clearTimeout(b);b=f.evaluateAsynchronously(function(){a(e)},
c)}})}a.throttleEvaluation=c;return a};f.extenders.deferred=function(a,c){a.deferUpdates=c};return f});
