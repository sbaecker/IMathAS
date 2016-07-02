function setupLivePreview(n){LivePreviews.hasOwnProperty(n)||(mathRenderer=="MathJax"||mathRenderer=="Katex"?(LivePreviews[n]={delay:mathRenderer=="MathJax"?100:20,finaldelay:1e3,preview:null,buffer:null,timeout:null,finaltimeout:null,mjRunning:!1,mjPending:!1,oldText:null,Init:function(){$("#p"+n).css("positive","relative").append('<span id="lpbuf1'+n+'" style="visibility:hidden;position:absolute;"></span>').append('<span id="lpbuf2'+n+'" style="visibility:hidden;position:absolute;"></span>'),this.preview=document.getElementById("lpbuf1"+n),this.buffer=document.getElementById("lpbuf2"+n)},SwapBuffers:function(){var n=this.preview,t=this.buffer;this.buffer=n,this.preview=t,n.style.visibility="hidden",n.style.position="absolute",t.style.position="",t.style.visibility=""},Update:function(){this.timeout&&clearTimeout(this.timeout),this.finaltimeout&&clearTimeout(this.finaltimeout),this.timeout=setTimeout(this.callback,this.delay),this.finaltimeout=setTimeout(this.DoFinalPreview,this.finaldelay)},RenderNow:function(n){this.buffer.innerHTML=this.oldtext=n,this.mjRunning=!0,this.RenderBuffer()},RenderBuffer:function(){mathRenderer=="MathJax"?MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.buffer],["PreviewDone",this]):mathRenderer=="Katex"&&(renderMathInElement(this.buffer),$(this.buffer).children(".mj").length>0?MathJax.Hub.Queue(["PreviewDone",this]):this.PreviewDone())},DoFinalPreview:function(){$("#pbtn"+n).trigger("click")},preformat:function(t){return intcalctoproc.hasOwnProperty(n)?calcformat[n].match(/inequality/)?(t=t.replace("<=","le").replace(">=","ge").replace("<","lt").replace(">","gt"),t.match(/all\s*real/i)&&(t="text("+t+")")):t=t.replace(/U/g,"uu"):vlist.hasOwnProperty(n)&&(t=AMnumfuncPrepVar(n,t)[1]),t},CreatePreview:function(){var t;(this.timeout=null,this.mjPending)||(t=document.getElementById("tc"+n)==null?document.getElementById("qn"+n).value:document.getElementById("tc"+n).value,t!==this.oldtext)&&(this.mjRunning?(this.mjPending=!0,MathJax.Hub.Queue(["CreatePreview",this])):(this.oldtext=t,this.buffer.innerHTML="`"+this.preformat(t)+"`",this.mjRunning=!0,this.RenderBuffer()))},PreviewDone:function(){this.mjRunning=this.mjPending=!1,this.SwapBuffers(),updateeeddpos(),updateehpos()}},LivePreviews[n].callback=MathJax.Callback(["CreatePreview",LivePreviews[n]]),LivePreviews[n].callback.autoReset=!0,LivePreviews[n].Init()):LivePreviews[n]={finaldelay:1e3,finaltimeout:null,Update:function(){this.finaltimeout&&clearTimeout(this.finaltimeout),this.finaltimeout=setTimeout(this.DoFinalPreview,this.finaldelay)},RenderNow:function(t){var i=document.getElementById("p"+n);i.innerHTML=t,rendermathnode(i)},DoFinalPreview:function(){$("#pbtn"+n).trigger("click")}})}function updateLivePreview(n){var t=n.id.substr(2);setupLivePreview(t),LivePreviews[t].Update()}function normalizemathunicode(n){return n=n.replace(/\u2013|\u2014|\u2015|\u2212/g,"-"),n=n.replace(/\u2044|\u2215/g,"/"),n=n.replace(/∞/g,"oo").replace(/≤/g,"<=").replace(/≥/g,">=").replace(/∪/g,"U"),n=n.replace(/±/g,"+-").replace(/÷/g,"/").replace(/·|✕|×|⋅/g,"*"),n=n.replace(/√/g,"sqrt").replace(/∛/g,"root(3)"),n=n.replace(/²/g,"^2").replace(/³/g,"^3"),n=n.replace(/\bOO\b/i,"oo"),n=n.replace(/θ/,"theta").replace(/φ/,"phi").replace(/π/,"pi").replace(/σ/,"sigma").replace(/μ/,"mu"),n=n.replace(/α/,"alpha").replace(/β/,"beta").replace(/γ/,"gamma").replace(/δ/,"delta").replace(/ε/,"epsilon").replace(/κ/,"kappa"),n=n.replace(/λ/,"lambda").replace(/ρ/,"rho").replace(/τ/,"tau").replace(/χ/,"chi").replace(/ω/,"omega"),n=n.replace(/Ω/,"Omega").replace(/Γ/,"Gamma").replace(/Φ/,"Phi").replace(/Δ/,"Delta").replace(/Σ/,"Sigma")}function wrapAMnotice(n){return'<span class="AMHnotice">'+n+"</span>"}function calculate(n,t,i){var r=document.getElementById(n).value,f,e,u,evalstr,res,o;for(r=normalizemathunicode(r),r=r.replace(/=/,""),i.indexOf("list")!=-1?f=r.split(/,/):i.indexOf("set")!=-1?f=r.replace(/[\{\}]/g,"").split(/,/):(f=[],f[0]=r),e=0;e<f.length;e++){if(str=f[e],str=str.replace(/(\d)\s*,\s*(?=\d{3}\b)/g,"$1"),u="",str.match(/DNE/i))str=str.toUpperCase();else if(str.match(/oo$/)||str.match(/oo\W/))str="`"+str+"`";else{u+=singlevalsyntaxcheck(str,i),str.match(/,/)&&(u+=_("Invalid use of a comma.")),i.indexOf("allowxtimes")!=-1&&(str=str.replace(/(x|X|\u00D7)/,"*")),i.indexOf("mixed")!=-1?str=str.replace(/_/," "):i.indexOf("scinot")!=-1?str=str.replace(/(x|X|\u00D7)/,"xx"):(str=str.replace(/([0-9])\s+([0-9])/g,"$1*$2"),str=str.replace(/\s/g,"")),u+=syntaxcheckexpr(str,i);try{evalstr=str,evalstr=evalstr.replace(",","*NaN*"),evalstr.match(/^\s*[+-]?\s*((\d+(\.\d*)?)|(\.\d+))\s*%\s*$/)&&(evalstr=evalstr.replace(/%/,"")+"/100"),i.indexOf("mixed")!=-1&&(evalstr=evalstr.replace(/(\d+)\s+(\d+\s*\/\s*\d+)/,"($1+$2)")),i.indexOf("scinot")!=-1&&(evalstr=evalstr.replace("xx","*"));with(Math)res=eval(mathjs(evalstr))}catch(s){u=_("syntax incomplete")+". "+u,res=NaN}isNaN(res)||res=="Infinity"?str!=""&&(str="`"+str+"` = "+_("undefined")+". "+wrapAMnotice(u)):str=i.indexOf("fraction")!=-1||i.indexOf("reducedfraction")!=-1||i.indexOf("mixednumber")!=-1||i.indexOf("scinot")!=-1||i.indexOf("noval")!=-1?"`"+str+"` "+wrapAMnotice(u):"`"+str+" =` "+(Math.abs(res)<1e-15?0:res)+". "+wrapAMnotice(u)}f[e]=str+" "}r=f.join(", "),i.indexOf("set")!=-1&&(document.getElementById(n).value.match(/^\s*{.*?}\s*$/)?r="{"+r+"}":r+=wrapAMnotice(_("syntax error: this answer must be in set notation, a list wrapped in braces like {1,2,3}"))),o=t.substr(1),setupLivePreview(o),LivePreviews[o].RenderNow(r)}function ineqtointerval(n){var r=n.split(/or/),t;for(i=0;i<r.length;i++)str=r[i],t="",(pat=str.match(/^([^<]+)\s*(<=?)\s*([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+)\s*(<=?)([^<]+)$/))?(t+=pat[2]=="<="?"[":"(",t+=pat[1]+","+pat[5],t+=pat[4]=="<="?"]":")"):(pat=str.match(/^([^>]+)\s*(>=?)\s*([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+)\s*(>=?)([^>]+)$/))?(t+=pat[4]==">="?"[":"(",t+=pat[5]+","+pat[1],t+=pat[2]==">="?"]":")"):(pat=str.match(/^([^><]+)\s*([><]=?)\s*([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+)\s*$/))?pat[2]==">"?t="(-oo,"+pat[1]+")":pat[2]==">="?t="(-oo,"+pat[1]+"]":pat[2]=="<"?t="("+pat[1]+",oo)":pat[2]=="<="&&(t="["+pat[1]+",oo)"):(pat=str.match(/^\s*([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+)\s*([><]=?)\s*([^><]+)$/))?pat[2]=="<"?t="(-oo,"+pat[3]+")":pat[2]=="<="?t="(-oo,"+pat[3]+"]":pat[2]==">"?t="("+pat[3]+",oo)":pat[2]==">="&&(t="["+pat[3]+",oo)"):t=str.match(/all\s*real/i)?"(-oo,oo)":"",r[i]=t;return t=r.join("U")}function intcalculate(n,t,r){var u=document.getElementById(n).value,e,o,f,a,h,s,p,l,c,res,v;if(u=normalizemathunicode(u),u.match(/DNE/i))u=u.toUpperCase();else if(u.replace(/\s+/g,"")=="")u=_("no answer given");else{if(e=[],o=[],r.indexOf("inequality")!=-1){u=u.replace(/or/g," or "),f=u,u=ineqtointerval(u);var b=str.match(/\b([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+\b)/),w=str.match(/([a-zA-Z]\(\s*[a-zA-Z]\s*\)|[a-zA-Z]+)/),y=b!=null?b[1]:w!=null?w[1]:""}else f=u,u=u.replace(/\s+/g,"");if(r.indexOf("list")!=-1){for(a=0,s=[],h=1;h<u.length-1;h++)u.charAt(h)==","&&(u.charAt(h-1)==")"||u.charAt(h-1)=="]")&&(u.charAt(h+1)=="("||u.charAt(h+1)=="[")&&(s.push(u.substring(a,h)),a=h+1);s.push(u.substring(a))}else s=u.split(/U/i);for(p=!0,l="",i=0;i<s.length;i++){if(str=s[i],sm=str.charAt(0),em=str.charAt(str.length-1),vals=str.substring(1,str.length-1),vals=vals.split(/,/),vals.length!=2||sm!="("&&sm!="["||em!=")"&&em!="]"){r.indexOf("inequality")!=-1?(f=f.replace("<=","le").replace(">=","ge").replace("<","lt").replace(">","gt"),u="`"+f+"`: "+wrapAMnotice(_("invalid inequality notation"))):u="`"+f.replace(/U/g,"uu")+"`: "+wrapAMnotice(_("invalid interval notation")),p=!1;break}for(j=0;j<2;j++)if(vals[j].match(/oo$/)||vals[j].match(/oo\W/))e[j]=vals[j];else{if(c="",res=NaN,c+=singlevalsyntaxcheck(vals[j],r),vals[j]=r.indexOf("mixed")!=-1?vals[j].replace(/_/," "):vals[j].replace(/\s/g,""),c+=syntaxcheckexpr(vals[j],r),c=="")try{with(Math)res=eval(mathjs(vals[j]))}catch(k){c=_("syntax incomplete")+". "}isNaN(res)||res=="Infinity"?e[j]=_("undefined"):(vals[j]=vals[j],e[j]=(Math.abs(res)<1e-15?0:res)+wrapAMnotice(c)),c!=""&&(l+=wrapAMnotice(c))}s[i]=sm+vals[0]+","+vals[1]+em,r.indexOf("inequality")!=-1?(o[i]=e[0].match(/oo/)?e[1].match(/oo/)?"RR":y+(em=="]"?"le":"lt")+e[1]:e[1].match(/oo/)?y+(sm=="["?"ge":"gt")+e[0]:e[0]+(sm=="["?"le":"lt")+y+(em=="]"?"le":"lt")+e[1],o[i]=o[i].replace("undefined",'"undefined"')):o[i]=sm+e[0]+","+e[1]+em}p&&(r.indexOf("inequality")!=-1?f.match(/all\s*real/)?u=f:(f=f.replace(/or/g,' \\ "or" \\ '),f=f.replace(/<=/g,"le"),f=f.replace(/>=/g,"ge"),f=f.replace(/</g,"lt"),f=f.replace(/>/g,"gt"),u=r.indexOf("fraction")!=-1||r.indexOf("reducedfraction")!=-1||r.indexOf("mixednumber")!=-1||r.indexOf("scinot")!=-1||r.indexOf("noval")!=-1?"`"+f+"`. "+wrapAMnotice(l):"`"+f+"= "+o.join(' \\ "or" \\ ')+"`. "+wrapAMnotice(l)):u=r.indexOf("fraction")!=-1||r.indexOf("reducedfraction")!=-1||r.indexOf("mixednumber")!=-1||r.indexOf("scinot")!=-1||r.indexOf("noval")!=-1?"`"+s.join("uu")+"`. "+wrapAMnotice(l):r.indexOf("list")!=-1?"`"+s.join(",")+"` = "+o.join(" , ")+". "+wrapAMnotice(l):"`"+s.join("uu")+"` = "+o.join(" U ")+". "+wrapAMnotice(l))}v=t.substr(1),setupLivePreview(v),LivePreviews[v].RenderNow(u)}function ntuplecalc(n,t,i){var r=document.getElementById(n).value,u,res,c;if(r=normalizemathunicode(r),r=r.replace(/\s+/g,""),r.match(/DNE/i))r=r.toUpperCase(),f="DNE",outstr="DNE";else{var f="",e=0,h=0,o="",s=!0;for(r.charAt(0).match(/[\(\[\<\{]/)||(s=!1),u=0;u<r.length;u++)if(dec=!1,e==0&&(f+=r.charAt(u),h=u+1,r.charAt(u)==","&&(r.charAt(u+1).match(/[\(\[\<\{]/)&&r.charAt(u-1).match(/[\)\]\>\}]/)||(s=!1))),r.charAt(u).match(/[\(\[\<\{]/)?e++:r.charAt(u).match(/[\)\]\>\}]/)&&(e--,dec=!0),e==0&&dec||e==1&&r.charAt(u)==","){sub=r.substring(h,u),res=NaN;try{with(Math)res=eval(mathjs(sub))}catch(l){o+=_("syntax incomplete")+". "}o+=singlevalsyntaxcheck(sub,i),sub=i.indexOf("mixed")!=-1?sub.replace(/_/," "):sub.replace(/\s/g,""),o+=syntaxcheckexpr(sub,i),f+=isNaN(res)||res=="Infinity"?_("undefined"):res,f+=r.charAt(u),h=u+1}e!=0&&(s=!1),s==!1&&(o+=_("Invalid notation")+". "),outstr=i.indexOf("fraction")!=-1||i.indexOf("reducedfraction")!=-1||i.indexOf("mixednumber")!=-1||i.indexOf("scinot")!=-1||i.indexOf("noval")!=-1||s==!1?"`"+r+"`. "+wrapAMnotice(o):"`"+r+"` = "+f+". "+wrapAMnotice(o)}return t!=null&&(c=t.substr(1),setupLivePreview(c),LivePreviews[c].RenderNow(outstr)),f}function complexcalc(n,t,i){var r=document.getElementById(n).value,f,prep,s,real,imag,h;if(r=normalizemathunicode(r),r=r.replace(/\s+/g,""),r.match(/DNE/i))r=r.toUpperCase(),e="DNE",outstr="DNE";else{var e="",u="",o=r.split(",");for(f=0;f<o.length;f++){prep=mathjs(o[f],"i"),i.indexOf("sloppycomplex")==-1&&(s=parsecomplex(o[f]),u+=singlevalsyntaxcheck(s[0],i),u+=singlevalsyntaxcheck(s[1],i)),u+=syntaxcheckexpr(o[f],i);try{with(Math)real=scopedeval("var i=0;"+prep);with(Math)imag=scopedeval("var i=1;"+prep)}catch(c){u+=_("syntax incomplete")}if((real=="synerr"||imag=="synerr")&&(u+=_("syntax incomplete"),real=NaN),isNaN(real)||real=="Infinity"||isNaN(imag)||imag=="Infinity"){e+=_("undefined");break}else imag-=real,f!=0&&(e+=","),e+=real+(imag>=0?"+":"")+imag+"i"}outstr=i.indexOf("fraction")!=-1||i.indexOf("reducedfraction")!=-1||i.indexOf("mixednumber")!=-1||i.indexOf("scinot")!=-1||i.indexOf("noval")!=-1?"`"+r+"`. "+wrapAMnotice(u):"`"+r+"` = "+e+". "+wrapAMnotice(u)}return t!=null&&(h=t.substr(1),setupLivePreview(h),LivePreviews[h].RenderNow(outstr)),e}function parsecomplex(n){var r,t,f,o,i,e,u,s;if(n=n.replace(/\s/,""),n=n.replace(/sin/,"s$n"),n=n.replace(/pi/,"p$"),s=n.length,n.split("i").length>2)return _("error - more than 1 i in expression");if(i=n.indexOf("i"),i==-1)r=n,t="0";else{for(o=0,u=i-1;u>0;u--)if(f=n.charAt(u),f==")")o++;else if(f=="(")o--;else if((f=="+"||f=="-")&&o==0)break;for(o=0,e=i+1;e<s;e++)if(f=n.charAt(e),f=="(")o++;else if(f==")")o--;else if((f=="+"||f=="-")&&o==0)break;if(i-u>1&&e-i>1)return _("error - invalid form");if(i-u>1)t=n.substr(u,i-u),r=n.substr(0,u)+n.substr(i+1);else if(e-i>1)if(i>0){if(n.charAt(i-1)!="+"&&n.charAt(i-1)!="-")return _("error - invalid form");t=n.charAt(i-1)+n.substr(i+1+(n.charAt(i+1)=="*"?1:0),e-i-1),r=n.substr(0,i-1)+n.substr(e)}else t=n.substr(i+1,e-i-1),r=n.substr(0,i)+n.substr(e);else t=n.charAt(u)=="+"?"1":n.charAt(u)=="-"?"-1":i==0?"1":n.charAt(u),r=(i>0?n.substr(0,u):"")+n.substr(i+1);r==""&&(r="0"),t.charAt(0)=="/"?t="1"+t:(t.charAt(0)=="+"||t.charAt(0)=="-")&&t.charAt(1)=="/"&&(t=t.charAt(0)+"1"+t.substr(1)),t.charAt(t.length-1)=="*"&&(t=t.substr(0,t.length-1)),t.charAt(0)=="+"&&(t=t.substr(1)),r.charAt(0)=="+"&&(r=r.substr(1))}return r=r.replace("s$n","sin"),r=r.replace("p$","pi"),t=t.replace("s$n","sin"),t=t.replace("p$","pi"),[r,t]}function matrixcalc(n,t,i,r){function p(estr){var n="",res;try{with(Math)res=eval(mathjs(estr))}catch(t){n=_("syntax incomplete")}return isNaN(res)||res=="Infinity"?estr!=""&&(estr=_("undefined")):estr=(Math.abs(res)<1e-15?0:res)+n,estr}var l,a,o,c,h,s,w,f;if(i!=null&&r!=null){var y=0,e="[",u="[";for(l=0;l<i;l++){for(l>0&&(e+=",",u+=","),e+="(",u+="(",a=0;a<r;a++)a>0&&(e+=",",u+=","),val=normalizemathunicode(document.getElementById(n+"-"+y).value),e+=val,u+=p(val),y++;e+=")",u+=")"}e+="]",u+="]"}else{var e=normalizemathunicode(document.getElementById(n).value),u=e,v=0;for(u=u.replace("[","("),u=u.replace("]",")"),u=u.replace(/\s+/g,""),o=[],u=u.substring(1,u.length-1),c=0,f=0;f<u.length;f++)u.charAt(f)=="("?v++:u.charAt(f)==")"?v--:u.charAt(f)==","&&v==0&&(o[o.length]=u.substring(c+1,f-1),c=f+1);for(o[o.length]=u.substring(c+1,u.length-1),f=0;f<o.length;f++){for(calclist2=o[f].split(","),h=0;h<calclist2.length;h++)calclist2[h]=p(calclist2[h]);o[f]=calclist2.join(",")}u="[("+o.join("),(")+")]"}if(e="`"+e+"` = `"+u+"`",t!=null){for(s=document.getElementById(t),w=s.childNodes.length,f=0;f<w;f++)s.removeChild(s.firstChild);s.appendChild(document.createTextNode(e)),noMathRender||rendermathnode(s)}return u}function mathjsformat(n,t){var i=document.getElementById(n).value,r=document.getElementById(t);r.value=mathjs(i)}function stringqpreview(n,t){var r=document.getElementById(n).value,i=t.substr(1);setupLivePreview(i),LivePreviews[i].RenderNow("`"+r+"`")}function AMnumfuncPrepVar(n,t){var v=vlist[n],y=flist[n],r=v.split("|"),o,u,h,s,i,c,e,f,l,a;for(t=t.replace(/,/g,""),t=normalizemathunicode(t),o=[],u=t,u=u.replace(/(arcsinh|arccosh|arctanh|arcsech|arccsch|arccoth|arcsin|arccos|arctan|arcsec|arccsc|arccot|sinh|cosh|tanh|sech|csch|coth|sqrt|ln|log|sin|cos|tan|sec|csc|cot|abs|root)/g,functoindex),i=0;i<r.length;i++)if(r[i]=="varE")t=t.replace("E","varE"),u=u.replace("E","varE");else{for(o[i]=!1,e=0;e<r.length;e++)if(i!=e&&r[e].toLowerCase()==r[i].toLowerCase()&&r[e]!=r[i]){o[i]=!0;break}o[i]||(t=t.replace(new RegExp(r[i],"gi"),r[i]),u=u.replace(new RegExp(r[i],"gi"),r[i]))}for(h=[],i=0;i<r.length;i++)if(r[i].length>1){for(c=!1,e=0;e<greekletters.length;e++)if(r[i].toLowerCase()==greekletters[e]){c=!0;break}r[i].match(/^\w+_\w+$/)?(s=o[i]?"g":"gi",f=new RegExp(/^(\w+)_(\w+)$/,s).exec(r[i]),l=new RegExp(f[1]+"_\\("+f[2]+"\\)",s),u=u.replace(l,r[i]),t=t.replace(l,r[i]),f[1].length>1&&(f[1]='"'+f[1]+'"'),f[2].length>1&&(f[2]='"'+f[2]+'"'),u=u.replace(new RegExp(f[0],s),f[1]+"_"+f[2]),t=t.replace(new RegExp(f[0],"g"),"repvars"+i),r[i]="repvars"+i):c||r[i]=="varE"||h.push(r[i])}return h.length>0&&(vltq=h.join("|"),a=new RegExp("("+vltq+")","g"),u=u.replace(a,'"$1"')),u=u.replace("varE","E"),u=u.replace(/@(\d+)@/g,indextofunc),[t,u]}function AMpreview(n,t){var i=n.slice(2),c=AMnumfuncPrepVar(i,document.getElementById(n).value),e,s,l,totest,f,res,o;str=c[0],dispstr=c[1],e=vlist[i],s=flist[i],ptlist=pts[i].split(",");var r="",h=0,res=NaN,u=!1;for(iseqn[i]==1?(str.match(/=/)?str.match(/=/g).length>1&&(u=!0):u=!0,str=str.replace(/(.*)=(.*)/,"$1-($2)")):str.match(/=/)||(u=!0),s!=""&&(reg=new RegExp("("+s+")\\(","g"),str=str.replace(reg,"$1*sin($1+")),vars=e.split("|"),l=mathjs(str,e);h<ptlist.length&&(isNaN(res)||res=="Infinity");){for(totest="",testvals=ptlist[h].split("~"),f=0;f<vars.length;f++)totest+="var "+vars[f]+"="+testvals[f]+";";totest+=l,r=_("syntax ok");try{with(Math)res=scopedeval(totest)}catch(a){r=_("syntax error")}res=="synerr"&&(r=_("syntax error")),h++}o=syntaxcheckexpr(str,"",e),(isNaN(res)||res=="Infinity")&&(r=_("syntax error")),o!=""&&(r+=r==_("syntax ok")?". "+_("warning")+": "+o:". "+o),iseqn[i]==1&&u?r=_("syntax error: this is not an equation"):typeof iseqn[i]!="undefined"||u||(r=_("syntax error: you gave an equation, not an expression")),i=t.substr(1),setupLivePreview(i),LivePreviews[i].RenderNow("`"+dispstr+"` "+wrapAMnotice(r))}function AMmathpreview(n,t){for(var u=document.getElementById(n).value,i=document.getElementById(t),f=i.childNodes.length,r=0;r<f;r++)i.removeChild(i.firstChild);i.appendChild(document.createTextNode("`"+u+"`")),noMathRender||rendermathnode(i)}function singlevalsyntaxcheck(n,t){if(n.match(/DNE/i)||n.match(/oo$/)||n.match(/oo\W/))return"";if(t.indexOf("fraction")!=-1||t.indexOf("reducedfraction")!=-1){if(n=n.replace(/\s/g,""),!n.match(/^\(?\-?\(?\d+\)?\/\(?\d+\)?$/)&&!n.match(/^\(?\d+\)?\/\(?\-?\d+\)?$/)&&!n.match(/^\s*?\-?\d+\s*$/))return _("not a valid fraction")+". "}else if(t.indexOf("fracordec")!=-1){if(n=n.replace(/\s/g,""),!n.match(/^\-?\(?\d+\s*\/\s*\-?\d+\)?$/)&&!n.match(/^\-?\d+$/)&&!n.match(/^\-?(\d+|\d+\.\d*|\d*\.\d+)$/))return _(" invalid entry format")+". "}else if(t.indexOf("mixednumber")!=-1){if(!n.match(/^\s*\-?\s*\d+\s*(_|\s)\s*\d+\s*\/\s*\d+\s*$/)&&!n.match(/^\s*?\-?\d+\s*$/)&&!n.match(/^\s*\-?\d+\s*\/\s*\-?\d+\s*$/))return _("not a valid mixed number")+". ";n=n.replace(/_/," ")}else if(t.indexOf("scinot")!=-1&&(n=n.replace(/\s/g,""),n=n.replace(/(x|X|\u00D7)/,"xx"),!n.match(/^\-?[1-9](\.\d*)?(\*|xx)10\^(\(?\-?\d+\)?)$/)))return _("not valid scientific notation")+". ";return""}function syntaxcheckexpr(n,t,i){var r="",f,e,u;for(t.indexOf("notrig")!=-1&&n.match(/(sin|cos|tan|cot|sec|csc)/i)?r+=_("no trig functions allowed")+". ":t.indexOf("nodecimal")!=-1&&n.indexOf(".")!=-1&&(r+=_("no decimals allowed")+". "),f=0,e=0,u=0;u<n.length;u++)n.charAt(u)=="("?f++:n.charAt(u)==")"?f--:n.charAt(u)=="["?e++:n.charAt(u)=="]"&&e--;return(f!=0||e!=0)&&(r+=" ("+_("unmatched parens")+"). "),reg=i?new RegExp("(sqrt|ln|log|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs)s*("+i+"|\\d+)","i"):new RegExp("(sqrt|ln|log|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs)s*(\\d+)","i"),errstuff=n.match(reg),errstuff!=null&&(r+="["+_("use function notation")+" - "+_("use $1 instead of $2",errstuff[1]+"("+errstuff[2]+")",errstuff[0])+"]. "),i&&(reg=new RegExp("(arc|sqrt|root|ln|log|sinh|cosh|tanh|sech|csch|coth|sin|cos|tan|sec|csc|cot|abs|pi|e|sign|DNE|oo|"+i+")","ig"),n.replace(reg,"").match(/[a-zA-Z]/)&&(r+=_(" Check your variables - you might be using an incorrect one")+". ")),n.match(/\|/)&&(r+=_(" Use abs(x) instead of |x| for absolute values")+". "),n.match(/%/)&&!n.match(/^\s*[+-]?\s*((\d+(\.\d*)?)|(\.\d+))\s*%\s*$/)&&(r+=_(" Do not use the percent symbol, %")+". "),r}function doonsubmit(n,t,i){var a,h,e,v,u,o,res,r,f,j,c,l,fj,s;for(r in callbackstack)callbackstack[r](r);if(n!=null){if(n.className=="submitted")return alert(_("You have already submitted this page.  Please be patient while your submission is processed.")),n.className="submitted2",!1;if(n.className=="submitted2")return!1;if(n.className="submitted",!i&&(a=t?confirmSubmit2(n):confirmSubmit(n),!a))return n.className="",!1}for(r in intcalctoproc)if(r=parseInt(r),document.getElementById("tc"+r)!=null){if(fullstr=document.getElementById("tc"+r).value,fullstr=fullstr.replace(/\s+/g,""),fullstr=normalizemathunicode(fullstr),fullstr.match(/DNE/i))fullstr=fullstr.toUpperCase();else{if(calcformat[r].indexOf("inequality")!=-1&&(fullstr=ineqtointerval(fullstr)),calcformat[r].indexOf("list")!=-1){for(h=0,u=[],e=1;e<fullstr.length-1;e++)fullstr.charAt(e)==","&&(fullstr.charAt(e-1)==")"||fullstr.charAt(e-1)=="]")&&(fullstr.charAt(e+1)=="("||fullstr.charAt(e+1)=="[")&&(u.push(fullstr.substring(h,e)),h=e+1);u.push(fullstr.substring(h))}else u=fullstr.split(/U/i);for(k=0;k<u.length;k++)if(str=u[k],str.length>0&&str.match(/,/)){for(sm=str.charAt(0),em=str.charAt(str.length-1),vals=str.substring(1,str.length-1),vals=vals.split(/,/),j=0;j<2;j++)if(!vals[j].match(/oo$/)&&!vals[j].match(/oo\W/)){v="";try{with(Math)res=eval(mathjs(vals[j]))}catch(y){v="syntax incomplete"}isNaN(res)||res=="Infinity"||(vals[j]=(Math.abs(res)<1e-15?0:res)+v)}u[k]=sm+vals[0]+","+vals[1]+em}fullstr=calcformat[r].indexOf("list")!=-1?u.join(","):u.join("U")}document.getElementById("qn"+r).value=fullstr}for(r in calctoproc)if(r=parseInt(r),document.getElementById("tc"+r)!=null){if(str=document.getElementById("tc"+r).value,str=normalizemathunicode(str),str=str.replace(/=/,""),calcformat[r].indexOf("list")!=-1)u=str.split(/,/);else if(calcformat[r].indexOf("set")!=-1)if(str.match(/^\s*{.*?}\s*$/))u=str.replace(/^\s*{(.*?)}\s*$/,"$1").split(/,/);else continue;else u=[],u[0]=str;for(o=0;o<u.length;o++){if(str=u[o],str=str.replace(/(\d)\s*,\s*(?=\d{3}\b)/g,"$1"),str=str.replace(",","*NaN*"),(calcformat[r].indexOf("scinot")!=-1||calcformat[r].indexOf("allowxtimes")!=-1)&&(str=str.replace(/(x|X|\u00D7)/,"*")),str.match(/^\s*[+-]?\s*((\d+(\.\d*)?)|(\.\d+))\s*%\s*$/)&&(str=str.replace(/%/,"")+"/100"),str=str.replace(/(\d+)\s*_\s*(\d+\s*\/\s*\d+)/,"($1+$2)"),calcformat[r].indexOf("mixed")!=-1&&(str=str.replace(/(\d+)\s+(\d+\s*\/\s*\d+)/,"($1+$2)")),str.match(/^\s*$/))res="";else if(str.match(/oo$/)||str.match(/oo\W/))res=str;else if(str.match(/DNE/i))res=str.toUpperCase();else try{with(Math)res=eval(mathjs(str))}catch(y){res=""}u[o]=res}document.getElementById("qn"+r).value=u.join(",")}for(r in matcalctoproc){if(r=parseInt(r),matsize[r]!=null){if(document.getElementById("qn"+r+"-0")==null)continue;msize=matsize[r].split(","),str=matrixcalc("qn"+r,null,msize[0],msize[1])}else{if(document.getElementById("tc"+r)==null)continue;str=matrixcalc("tc"+r,null)}document.getElementById("qn"+r).value=str}for(r in ntupletoproc)(r=parseInt(r),document.getElementById("tc"+r)!=null)&&(str=ntuplecalc("tc"+r,null,""),document.getElementById("qn"+r).value=str);for(r in complextoproc)(r=parseInt(r),document.getElementById("tc"+r)!=null)&&(str=complexcalc("tc"+r,null,""),document.getElementById("qn"+r).value=str);for(r in functoproc)if(r=parseInt(r),document.getElementById("tc"+r)!=null){if(str=document.getElementById("tc"+r).value,str=str.replace(/,/g,""),str=normalizemathunicode(str),iseqn[r]==1)str=str.replace(/(.*)=(.*)/,"$1-($2)");else if(str.match("="))continue;for(fl=flist[r],varlist=vlist[r],vars=varlist.split("|"),f=0;f<vars.length;f++){for(foundaltcap=!1,j=0;j<vars.length;j++)if(f!=j&&vars[j].toLowerCase()==vars[f].toLowerCase()&&vars[j]!=vars[f]){foundaltcap=!0;break}foundaltcap?regmod="g":(str=str.replace(new RegExp(vars[f],"gi"),vars[f]),regmod="gi"),vars[f].length>2&&vars[f].match(/^\w+_\w+$/)?(c=vars[f].match(/^(\w+)_(\w+)$/),str=str.replace(new RegExp(c[1]+"_\\("+c[2]+"\\)",regmod),vars[f]),str=str.replace(new RegExp(c[0],"g"),"repvars"+f),vars[f]="repvars"+f):vars[f]=="varE"&&(str=str.replace("E","varE"))}for(varlist=vars.join("|"),fl!=""&&(reg=new RegExp("("+fl+")\\(","g"),str=str.replace(reg,"$1*sin($1+")),vars=varlist.split("|"),l=document.getElementById("qn"+r),l.value=mathjs(str,varlist),ptlist=pts[r].split(","),vals=[],fj=0;fj<ptlist.length;fj++){for(inputs=ptlist[fj].split("~"),totest="",s=0;s<inputs.length;s++)totest+="var "+vars[s]+"="+inputs[s]+";";totest+=l.value==""?Math.random()+";":l.value+";";try{with(Math)vals[fj]=scopedeval(totest)}catch(y){vals[fj]=NaN}vals[fj]=="synerr"&&(vals[fj]=NaN)}document.getElementById("qn"+r+"-vals").value=vals.join(",")}return!0}function scopedeval(c){var res;try{with(Math)res=eval(c);return res}catch(n){return"synerr"}}function arraysearch(n,t){for(var i=0;i<t.length;i++)if(t[i]==n)return i;return-1}function toggleinlinebtn(n,t){var r=document.getElementById(n),u,i;r.style.display=r.style.display=="none"?"":"none",t!=null&&(u=document.getElementById(t),i=u.innerHTML,u.innerHTML=i.match(/\+/)?i.replace(/\+/,"-"):i.replace(/\-/,"+"))}function assessbackgsubmit(n,t){var u,f,r,i;if(t!=null&&document.getElementById(t).innerHTML==_("Submitting..."))return!1;if(window.XMLHttpRequest?req=new XMLHttpRequest:window.ActiveXObject&&(req=new ActiveXObject("Microsoft.XMLHTTP")),typeof req!="undefined"){if(typeof tinyMCE!="undefined"&&tinyMCE.triggerSave(),doonsubmit(),params="embedpostback=true",n!=null){for(r=[],u=document.getElementsByTagName("input"),i=0;i<u.length;i++)r.push(u[i]);for(u=document.getElementsByTagName("select"),i=0;i<u.length;i++)r.push(u[i]);for(u=document.getElementsByTagName("textarea"),i=0;i<u.length;i++)r.push(u[i]);for(f=new RegExp("^(qn|tc)("+n+"\\b|"+(n+1)+"\\d{3})"),i=0;i<r.length;i++)r[i].name.match(f)&&(r[i].type!="radio"&&r[i].type!="checkbox"||r[i].checked)&&(params+="&"+r[i].name+"="+encodeURIComponent(r[i].value));params+="&toscore="+n,params+="&verattempts="+document.getElementById("verattempts"+n).value}else{for(r=document.getElementsByTagName("input"),i=0;i<r.length;i++)r[i].name.match(/^(qn|tc)/)&&(r[i].type!="radio"||r[i].type!="checkbox"||r[i].checked)&&(params+="&"+r[i].name+"="+encodeURIComponent(r[i].value));params+="&verattempts="+document.getElementById("verattempts").value}params+="&asidverify="+document.getElementById("asidverify").value,params+="&disptime="+document.getElementById("disptime").value,params+="&isreview="+document.getElementById("isreview").value,t!=null&&(document.getElementById(t).innerHTML=_("Submitting...")),req.open("POST",assesspostbackurl,!0),req.setRequestHeader("Content-type","application/x-www-form-urlencoded"),req.onreadystatechange=function(){assessbackgsubmitCallback(n,t)},req.send(params)}else t!=null&&(document.getElementById(t).innerHTML=_("Error Submitting."))}function assessbackgsubmitCallback(qn,noticetgt){var scripts,resptxt,i,foo,pagescroll,B,D,elpos;if(req.readyState==4)if(req.status==200){if(noticetgt!=null&&(document.getElementById(noticetgt).innerHTML=""),qn!=null){for(scripts=[],resptxt=req.responseText;resptxt.indexOf("<script")>-1||resptxt.indexOf("</script")>-1;){var s=resptxt.indexOf("<script"),s_e=resptxt.indexOf(">",s),e=resptxt.indexOf("</script",s),e_e=resptxt.indexOf(">",e);scripts.push(resptxt.substring(s_e+1,e)),resptxt=resptxt.substring(0,s)+resptxt.substring(e_e+1)}for(document.getElementById("embedqwrapper"+qn).innerHTML=resptxt,usingASCIIMath&&rendermathnode(document.getElementById("embedqwrapper"+qn)),usingASCIISvg&&setTimeout("drawPics()",100),usingTinymceEditor&&initeditor("textareas","mceEditor"),initstack.length=0,i=0;i<scripts.length;i++)try{(k=scripts[i].match(/canvases\[(\d+)\]/))&&(typeof G_vmlCanvasManager!="undefined"&&(scripts[i]=scripts[i]+'G_vmlCanvasManager.initElement(document.getElementById("canvas'+k[1]+'"));'),scripts[i]=scripts[i]+"initCanvases("+k[1]+");"),eval(scripts[i])}catch(ex){}for(i=0;i<initstack.length;i++)foo=initstack[i]();LivePreviews.hasOwnProperty(qn)&&LivePreviews[qn].Init(),$(window).trigger("ImathasEmbedReload"),initcreditboxes(),pagescroll=0,typeof window.pageYOffset!="undefined"?pagescroll=window.pageYOffset:(B=document.body,D=document.documentElement,D=D.clientHeight?D:B,pagescroll=D.scrollTop),elpos=findPos(document.getElementById("embedqwrapper"+qn))[1],pagescroll>elpos&&setTimeout(function(){window.scroll(0,elpos)},150)}}else noticetgt!=null&&(document.getElementById(noticetgt).innerHTML=_("Submission Error")+":\n"+req.status+"\n"+req.statusText)}function AutoSuggest(n,t){var r=this,s;this.elem=n,this.suggestions=t,this.eligible=[],this.inputText=null,this.highlighted=-1,this.div=document.getElementById("autosuggest"),this.div==null&&(this.div=document.createElement("div"),this.div.id="autosuggest",document.getElementsByTagName("body")[0].appendChild(this.div),this.div.appendChild(document.createElement("ul")));var u=9,f=27,e=38,o=40,h=13;n.setAttribute("autocomplete","off"),n.id||(s="autosuggest"+AutoSuggestIdCounter,AutoSuggestIdCounter++,n.id=s),n.onkeydown=function(n){var t=r.getKeyCode(n);switch(t){case u:r.useSuggestion("tab");break;case h:return r.useSuggestion("enter"),!1;case f:r.hideDiv();break;case e:r.highlighted>0&&r.highlighted--,r.changeHighlight(t);break;case o:r.highlighted<r.eligible.length-1&&r.highlighted++,r.changeHighlight(t)}},n.onkeyup=function(n){var t=r.getKeyCode(n);switch(t){case u:case f:case e:case o:return;default:this.value.length>1?(r.inputText=this.value,r.getEligible(),r.highlighted=r.eligible.length>0?0:-1,r.createDiv(),r.positionDiv(),r.showDiv()):(r.hideDiv(),this.value.length==0&&(r.inputText=""))}},n.onblur=function(){setTimeout(r.hideDiv,100)},this.useSuggestion=function(){this.highlighted>-1?(this.elem.value=this.eligible[this.highlighted],this.hideDiv()):this.hideDiv()},this.showDiv=function(){this.div.style.display="block"},this.hideDiv=function(){r.div.style.display="none",r.highlighted=-1},this.changeHighlight=function(){var t=this.div.getElementsByTagName("LI"),n;for(i in t)n=t[i],n.className=this.highlighted==i?"selected":""},this.positionDiv=function(){var t=this.elem,n=findPos(t);n[1]+=t.offsetHeight,this.div.style.left=n[0]+"px",this.div.style.top=n[1]+"px"},this.createDiv=function(){var n=document.createElement("ul");for(i in this.eligible){var f=this.eligible[i],u=document.createElement("li"),t=document.createElement("a");t.href="#",t.onclick=function(){return!1},t.innerHTML=f,u.appendChild(t),r.highlighted==i&&(u.className="selected"),n.appendChild(u)}this.div.replaceChild(n,this.div.childNodes[0]),n.onmouseover=function(n){for(var t=r.getEventSource(n),u,f;t.parentNode&&t.tagName.toUpperCase()!="LI";)t=t.parentNode;u=r.div.getElementsByTagName("LI");for(i in u)if(f=u[i],f==t){r.highlighted=i;break}r.changeHighlight()},n.onclick=function(n){return r.useSuggestion("click"),r.hideDiv(),r.cancelEvent(n),!1},this.div.className="suggestion_list",this.div.style.position="absolute"},this.getEligible=function(){var r,t,n;if(this.eligible=[],r=",",this.inputText.indexOf(" ")==-1){t=new RegExp("\\b"+this.inputText.toLowerCase());for(i in this.suggestions)n=this.suggestions[i],n.toLowerCase().match(t)&&(this.eligible[this.eligible.length]=n,r+=i+",")}},this.getKeyCode=function(n){return n?n.keyCode:window.event?window.event.keyCode:void 0},this.getEventSource=function(n){return n?n.target:window.event?window.event.srcElement:void 0},this.cancelEvent=function(n){n&&(n.preventDefault(),n.stopPropagation()),window.event&&(window.event.returnValue=!1)}}function isBlank(n){return!n||0===n.length||/^\s*$/.test(n)}function editdebit(n){var t=$("#qn"+(n.id.substr(2)*1-1));!isBlank(n.value)&&t.hasClass("iscredit")&&(t.is("select")?t.css("margin-right",20):t.width(t.width()+20),t.css("padding-left",0),t.removeClass("iscredit"))}function editcredit(n){var t=$("#qn"+(n.id.substr(2)*1-2));isBlank(n.value)||t.hasClass("iscredit")||(t.is("select")?t.css("margin-right",0):t.width(t.width()-20),t.css("padding-left",20),t.addClass("iscredit"))}function initcreditboxes(){$(".creditbox").each(function(n,t){if(!isBlank(t.value)&&$(t).css("padding-left")!=20){var i=$("#qn"+(t.id.substr(2)*1-2));i.is("select")?i.css("margin-right",0):i.width(i.width()-20),i.css("padding-left",20),i.addClass("iscredit")}})}var updateeeddpos=function(){},updateehpos=function(){},LivePreviews=[],greekletters=["alpha","beta","chi","delta","epsilon","gamma","phi","psi","sigma","rho","theta","lambda","mu","nu","omega","tau"],calctoproc={},intcalctoproc={},calcformat={},functoproc={},matcalctoproc={},ntupletoproc={},complextoproc={},callbackstack={},matsize={},vlist={},flist={},pts={},iseqn={},AutoSuggestIdCounter=0;initstack.push(initcreditboxes);