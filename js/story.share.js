/**
 * jquery.story.share 0.1.3
 **/

!function(a,b,c,d){function e(b,c){this.element=b,this.options=a.extend(!0,{},h,c),"fbAppId"in this.options&&(this.options=a.extend(!0,this.options,{socialProviders:{facebook_complex:{overrides:{app_id:this.options.fbAppId}},facebook_simple:{overrides:{app_id:this.options.fbAppId}}}})),this.shareHandler=this.shareHandler.bind(this),this._defaults=h,this.init()}var f,g="storyShare",h={type:null,windowWidth:500,windowHeight:300,relativeMediaUrls:!1,mediaBaseUrl:b.location.href.substring(0,b.location.href.lastIndexOf("/")+1),currentUrlPlaceholder:"{{current}}",mediaAttributes:{pinterest:["media"],facebook_complex:["picture"]},requiredLocalAttributes:{facebook_complex:["link"],facebook_simple:["url"],twitter:["url"],google_plus:["url"],linkedin:["url","title"],pinterest:["url","media"]},requiredGlobalAttributes:{facebook_complex:["fbAppId"]},shareUrlAttributes:{facebook_complex:["link"],facebook_simple:["url"],twitter:["url"],google_plus:["url"],linkedin:["url"],pinterest:["url"]},socialProviders:{facebook_simple:{urlBase:"https://www.facebook.com/sharer/sharer.php?u={url}"},facebook_complex:{urlBase:"https://www.facebook.com/v2.3/dialog/feed?app_id={app_id}&redirect_uri={redirect_uri}&link={link}&picture={picture}&caption={caption}&description={description}&name={name}&properties={properties}&actions={actions}&ref={ref}&display=popup",overrides:{redirect_uri:b.location.href+"#story_close_window"}},twitter:{urlBase:"https://twitter.com/intent/tweet?url={url}&text={text}&hashtags={hashtags}&via={via}"},google_plus:{urlBase:"https://plus.google.com/share?url={url}",windowOverrides:{windowHeight:850}},linkedin:{urlBase:"http://www.linkedin.com/shareArticle?mini=true&url={url}&source={source}&title={title}&summary={summary}"},pinterest:{urlBase:"https://pinterest.com/pin/create/button/?url={url}&media={media}&description={description}"}},debug:!1};a(c).ready(function(){-1!==b.location.hash.indexOf("#story_close_window")&&b.close()}),e.prototype={handleWindowOverrides:function(){"windowOverrides"in this.options.socialProviders[this.type]&&(this.options=a.extend(!0,{},this.options,this.options.socialProviders[this.type].windowOverrides))},linkHandler:function(){var c=Math.floor(((screen.availWidth||1024)-this.options.windowWidth)/2),d=Math.floor(((screen.availHeight||700)-this.options.windowHeight)/2);if(this.setType(),this.handleWindowOverrides(),this.generateSocialUrl(),!this.socialUrl)return!0;var e=b.open(this.socialUrl,"social","width="+this.options.windowWidth+",height="+this.options.windowHeight+",left="+c+",top="+d+",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");return e&&(e.focus(),a(this.element).preventDefault&&a(this.element).preventDefault(),a(this.element).returnValue=!1),!!e},shareHandler:function(){this.linkHandler()},init:function(){a(this.element).on("click",this.shareHandler)},removeURLParameter:function(a,b){var c=a.split("?");if(c.length>=2){for(var d=encodeURIComponent(b)+"=",e=c[1].split(/[&;]/g),f=e.length;f-- >0;)-1!==e[f].lastIndexOf(d,0)&&e.splice(f,1);return a=c[0]+"?"+e.join("&")}return a},validateAttributes:function(){if(h.requiredLocalAttributes[this.type]&&Array.isArray(h.requiredLocalAttributes[this.type]))for(var a=0;a<h.requiredLocalAttributes[this.type].length;a++)if(!f.attr("data-"+h.requiredLocalAttributes[this.type][a]))throw this.socialUrl=null,"[Story-Share] Missing "+h.requiredLocalAttributes[this.type][a]+" for "+this.type;if(h.requiredGlobalAttributes[this.type]&&Array.isArray(h.requiredGlobalAttributes[this.type]))for(var b=0;b<h.requiredGlobalAttributes[this.type].length;b++)if(!this.options[h.requiredGlobalAttributes[this.type][b]])throw this.socialUrl=null,"[Story-Share] Missing "+h.requiredGlobalAttributes[this.type][b]+" for "+this.type},setType:function(){if(f=a(this.element),!f.attr("data-type"))throw"[Story-Share] The data-type attribute is required";this.type=f.attr("data-type").replace("-","_")},generateSocialUrl:function(){var a=this,c=this.type in this.options.socialProviders?this.options.socialProviders[this.type]:null;if(null===c)throw"[Story-Share] Type "+this.type+" is not supported";this.validateAttributes();var e=c.urlBase,g=/{([^}]*)}/g,h=e.match(g)||[],i=c.overrides||{};h.forEach(function(c){var g=null;(c=c.replace("{","").replace("}",""))in i&&(g=i[c]);var h=c.replace("{","").replace("}",""),j="data-"+h,k=g||f.attr(j);a.options.relativeMediaUrls&&k&&this.type in a.options.mediaAttributes&&a.options.mediaAttributes[this.type].indexOf(h)>-1&&(k=a.options.mediaBaseUrl+k),k===a.options.currentUrlPlaceholder&&a.options.shareUrlAttributes[this.type].indexOf(h)>-1&&(k=b.location.href),k=k!==d?k:null,null===k&&(e=a.removeURLParameter(e,j.replace("data-",""))),e=e.replace("{"+c+"}",encodeURIComponent(k))}.bind(this)),this.socialUrl=e}},a.fn[g]=function(b){return b&&b.debug?new e(this,b):this.each(function(){a.data(this,"plugin_"+g)||a.data(this,"plugin_"+g,new e(this,b))})}}(jQuery,window,document);