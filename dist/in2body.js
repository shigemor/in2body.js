// in2body.js version 1.0.3
// https://github.com/shigemor/in2body.js
//
// Written by Takayuki Shigemori on 2020 Summer.
// MIT license.

(function( root, factory){
		'use strict';
		
		if( typeof define === 'function' && define.amd){
			define([], factory);
		
		} else if( typeof exports === 'object'){
			module.exports= factory();
		
		} else{
			root.in2body= factory();
		}
	}(this, (function(){
		'use strict';
		
		var is_ie;
		var is_breakpoint;
		var is_orientation;
		var is_square;
		var is_yratio;
		var is_xratio;
		
		var is_month;
		var is_date;
		var is_day;
		
		var is_hour;
		var is_min;
		var is_sec;
		
		var result_breakpoint= '';
		var result_orientation= '';
		var result_YRatio= 0;
		var result_XRatio= 0;
		
		var result_year= '';
		var result_month= '';
		var result_date= '';
		var result_day= '';
		
		var result_hour= '';
		var result_min= '';
		var result_sec= '';
		
		var defaults= {
			is_device :			true,
			is_product :		true,	// Operating System
			is_browser :		true,	// Web browsers
			
			is_edge_legacy :	true,	// "edge_legacy" is Not Chromium-based version Microsoft Edge
			is_safari_like :	true,	// "safari_like" is Using the AppleWebKit
			
			is_ie :				false,	// "ie" is Microsoft Internet Explorer FLAG
			
			is_breakpoint :		true,	// Responsive breakpoints
			is_orientation :	true,
			is_square :			false,
			is_yratio :			true,	// Y position for scroll
			is_xratio :			true,	// X position for scroll
			
			is_month :			false,
			is_date :			false,
			is_day :			false,	// Day of the week
			
			is_hour :			false,
			is_min :			false,
			is_sec :			false
		};
		
		var extend= function(){
			
			var extended= {};
			
			var merge= function( obj){
				for( var prop in obj){
					if( obj.hasOwnProperty( prop)){
						extended[prop]= obj[prop];
					}
				}
			};
			
			for( var i= 0; i < arguments.length; i++){
				var obj= arguments[i];
				merge( obj);
			}
			
			return extended;
		};
		
		var in2body= function(){
			this.settings;
			this.bodyClass;
			
		};
		
		in2body.prototype= {
			ua: '',
			np: '',
			
			run: function( options){
				this.settings= extend( defaults, options || {});
				is_ie=			this.settings.is_ie;
				is_breakpoint=	this.settings.is_breakpoint;
				is_orientation=	this.settings.is_orientation;
				is_square=		this.settings.is_square;
				is_yratio=		this.settings.is_yratio;
				is_xratio=		this.settings.is_xratio;
				
				is_month=	this.settings.is_month;
				is_date=	this.settings.is_date;
				is_day=		this.settings.is_day;
				
				is_hour=	this.settings.is_hour;
				is_min=		this.settings.is_min;
				is_sec=		this.settings.is_sec;
				
				this.bodyClass= document.body.classList;
				
				self.ua= navigator.userAgent;
				self.np= navigator.platform;
				
				this.Get_userAgent( self.ua, self.np);
				this.Set_userAgent();
				
				this.Add_Event();
				this.Update();
				
				setInterval( this.Update, 10000);
				
			},
			
			Get_userAgent: function( ua, np){
				
				// Phones
				if( ua.match(/(iPod|iPhone|Phone)/) ||
					ua.indexOf('Mobile')     !== -1 && ua.match(/^(?!.*(iPad|Silk|Kindle|AFT|AmazonWebAppPlatform)).*/) ||
					ua.indexOf('BlackBerry') !== -1 && ua.match(/^(?!.*(PlayBook)).*/) ||
					ua.match(/(Nintendo 3DS|Nintendo WiiU|Nintendo Switch|PlayStation Vita|PlayStation Portable)/)){
						
						this.result_device= 'phone';
						
						if( ua.indexOf('iPod') !== -1)							this.result_product= 'ipod';				// iPod
						else if( ua.match(/^(?!.*(Nintendo 3DS)).*iPhone/))		this.result_product= 'iphone';				// iPhone
						else if( ua.indexOf('Windows Phone') !== -1)			this.result_product= 'windowsphone';		// Windows Phone
						else if( ua.match(/(BlackBerry|BB[0-9]+|BBF[0-9]+)/))	this.result_product= 'blackberry';			// Blackberry
						else if( ua.indexOf('MeeGo') !== -1)					this.result_product= 'meego';				// MeeGo
						else if( ua.indexOf('Android') !== -1)					this.result_product= 'android';				// Android
						else if( ua.indexOf('Nintendo 3DS') !== -1)				this.result_product= 'nintendo3ds';			// Nintendo 3DS
						else if( ua.indexOf('Nintendo WiiU') !== -1)			this.result_product= 'nintendowiiu';		// Nintendo WiiU
						else if( ua.indexOf('Nintendo Switch') !== -1)			this.result_product= 'nintendoswitch';		// Nintendo Switch
						else if( ua.indexOf('PlayStation Vita') !== -1)			this.result_product= 'playstationvita';		// PlayStation Vita
						else if( ua.indexOf('PlayStation Portable') !== -1)		this.result_product= 'playstationportable';	// PlayStation Portable
				
				// Tablets
				} else if(	ua.match(/(iPad|Silk|Kindles|PlayBook|Android)/) && ua.match(/^(?!.*(AFT|AmazonWebAppPlatform)).*/) ||
							ua.indexOf('Tablet') !== -1 && ua.match(/^(?!.*(Trident)).*/)){
						
						this.result_device= 'tablet';
						
						if( ua.indexOf('iPad') !== -1)			this.result_product= 'ipad';		// iPad
						else if( ua.match(/(Kindle|Silk)/))		this.result_product= 'kindle';		// Kindle
						else if( ua.indexOf('PlayBook') !== -1)	this.result_product= 'blackberry';	// PlayBook(Blackberry)
						else if( ua.indexOf('MeeGo') !== -1)	this.result_product= 'meego';		// MeeGo
						else if( ua.indexOf('Android') !== -1)	this.result_product= 'android';		// Android
						
				// Desktops
				} else{
						this.result_device= 'desktop';
						
						if( ua.match(/Xbox/)){
							this.result_product= 'microsoftxbox';
						}
						else if( ua.match(/PlayStation [0-9]+/)){
							this.result_product= 'playstation';
						}
						else if( ua.match(/Windows/)){
							this.result_product= 'windows';
						}
						else if( ua.indexOf('Mac') !== -1 && ua.match(/^(?!.*(iPod|iPhone|iPad)).*/) && np.match(/Mac/)){
							this.result_product= 'mac';
						}
						else if( ua.match(/(Linux|CentOS|CrOS|Debian|Fedora|Kubuntu|Red Hat|SuSE|Ubuntu|Xubuntu|Cygwin)/) && ua.match(/^(?!.*(AFT|AmazonWebAppPlatform)).*/)){
							this.result_product= 'linux';
						}
						else if( ua.match(/(BSD|DragonFly)/)){
							this.result_product= 'bsd';
						}
						else if( ua.match(/(AFT|AmazonWebAppPlatform)/)){
							this.result_product= 'amazonfiretv';
						}
						else if( ua.match(/(AppleTV)/)){
							this.result_product= 'appletv';
						}
				}
				
				// Browser
				if( ua.match(/(MSIE|Trident)/)){
					this.result_is_ie= true;		// ie
				}else {
					this.result_is_ie= false;
				}
				
				if( ua.indexOf('MSIE 6.') !== -1){
					this.result_browser= 'ie6';		// ie6
				}else if( ua.indexOf('MSIE 7.') !== -1){
					this.result_browser= 'ie7';		// ie7
				}else if( ua.indexOf('MSIE 8.') !== -1){
					this.result_browser= 'ie8';		// ie8
				}else if( ua.indexOf('MSIE 9.') !== -1){
					this.result_browser= 'ie9';		// ie9
				}else if( ua.indexOf('MSIE 10.') !== -1){
					this.result_browser= 'ie10';	// ie10
				}else if( (ua.indexOf('rv:11.') !== -1) || (ua.indexOf('Trident/7') !== -1)){
					this.result_browser= 'ie11';	// ie11
				
				// edge
				}else if( ua.indexOf('EdgA') !== -1){
					this.result_browser= 'edge';
				}else if( ua.indexOf('EdgiOS') !== -1){
					this.result_browser= 'edge';
				}else if( ua.indexOf('Edge') !== -1){
					this.settings.is_edge_legacy ? this.result_browser= 'edge_legacy' : this.result_browser= 'edge';
				}else if( ua.indexOf('Edg') !== -1){
					this.result_browser= 'edge';	// edge Chromium base
				
				// chrome
				}else if( (ua.indexOf('Chrome') !== -1) && ua.match(/^(?!.*(Edg|Opera|OPR)).*/)){
					this.result_browser= 'chrome';
				}else if( (ua.indexOf('Chrome') !== -1) && ua.indexOf('Nexus') !== -1){
					this.result_browser= 'chrome';
				
				// opera
				}else if( ua.match(/(Opera|OPR)/)){
					this.result_browser= 'opera';
				
				// firefox
				}else if( ua.indexOf('Firefox') !== -1){
					this.result_browser= 'firefox';
				
				// netfront
				}else if( ua.indexOf('PlayStation Portable') !== -1){
					this.result_browser= 'netfront';
				
				// Blackberry Browser
				}else if( ua.match(/(BlackBerry|BB[0-9]+|BBF[0-9]+)/)){
					this.result_browser= 'blackberrybrowser';
				
				// PlayBook(Blackberry)
				}else if( ua.match(/(PlayBook)/)){
					this.result_browser= 'blackberryplaybook';
				
				// NintendoBrowser
				}else if( ua.match(/(NintendoBrowser)/)){
					this.result_browser= 'nintendobrowser';
				
				// safari
				}else if( ua.search(/(iPod|iPhone|iPad|Mac).*Safari/) !== -1){
					this.result_browser= 'safari';
				
				// exp. Safari
				}else if( ua.search(/(AppleWebKit|KHTML|like Gecko)/) !== -1){
					this.settings.is_safari_like ? this.result_browser= 'safari_like' : this.result_browser= 'safari';
				}
				
			},
			
			Set_userAgent: function(){
				
				if( this.settings.is_device)		this.bodyClass.add( this.result_device);
				if( this.settings.is_product)		this.bodyClass.add( this.result_product);
				if( this.settings.is_ie)			if( this.result_is_ie) this.bodyClass.add('ie');
				if( this.settings.is_browser)		this.bodyClass.add( this.result_browser);
			},
			
			Add_Event: function(){
				
				// orientationchange event
				if( window.addEventListener){
					window.addEventListener(  'orientationchange', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'orientationchange', Update_in2body);
				}
				
				// resize event
				if( window.addEventListener){
					window.addEventListener(  'resize', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'resize', Update_in2body);
				}
				
				// mousewheel event
				if( window.addEventListener){
					window.addEventListener(  'wheel', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'wheel', Update_in2body);
				}
				
				if( window.addEventListener){
					window.addEventListener(  'mousewheel', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'mousewheel', Update_in2body);
				}
				
				if( window.addEventListener){
					window.addEventListener(  'DOMMouseScroll', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'DOMMouseScroll', Update_in2body);
				}
				
				if( window.addEventListener){
					window.addEventListener(  'scroll', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'scroll', Update_in2body);
				}
				
				if( window.addEventListener){
					window.addEventListener(  'touchmove', Update_in2body, { passive: true });
				}else if( window.attachEvent){
						  window.attachEvent( 'touchmove', Update_in2body);
				}
				
			},
			
			Remove_Event: function(){
				
				// orientationchange event
				if( window.removeEventListener){
					window.removeEventListener(  'orientationchange', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'orientationchange', Update_in2body);
				}
				
				// resize event
				if( window.removeEventListener){
					window.removeEventListener( 'resize', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'resize', Update_in2body);
				}
				
				// mousewheel event
				if( window.removeEventListener){
					window.removeEventListener( 'wheel', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'wheel', Update_in2body);
				}
				
				if( window.removeEventListener){
					window.removeEventListener( 'mousewheel', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'mousewheel', Update_in2body);
				}
				
				if( window.removeEventListener){
					window.removeEventListener( 'DOMMouseScroll', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'DOMMouseScroll', Update_in2body);
				}
				
				if( window.removeEventListener){
					window.removeEventListener( 'scroll', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'scroll', Update_in2body);
				}
				
				if( window.removeEventListener){
					window.removeEventListener( 'touchmove', Update_in2body, { passive: true });
				}else if( window.detachEvent){
						  window.detachEvent( 'touchmove', Update_in2body);
				}
				
			},
			
			Update: function(){
				
				Update_in2body();
				
			},
			
			get: function( arg){
				
				var result= null;
				
				switch( arg){
					
					case 'device':
						result= this.result_device;
						break;
						
					case 'product':
						result= this.result_product;
						break;
						
					case 'browser':
						result= this.result_browser;
						break;
						
					case 'is_ie':
						result= this.result_is_ie;
						break;
						
					case 'breakpoint':
						result= result_breakpoint;
						break;
						
					case 'orientation':
						result= result_orientation;
						break;
						
					case 'year':
						result= result_year;
						break;
						
					case 'month':
						result= result_month;
						break;
						
					case 'date':
						result= result_date;
						break;
						
					case 'day':
						result= result_day;
						break;
						
					case 'hour':
						result= result_hour;
						break;
						
					case 'min':
						result= result_min;
						break;
						
					case 'sec':
						result= result_sec;
						break;
						
					case 'window.Height':
						result= window.innerHeight;
						break;
						
					case 'window.Width':
						result= window.innerWidth;
						break;
						
					case 'client.Height':
						result= document.documentElement.clientHeight;
						break;
						
					case 'client.Width':
						result= document.documentElement.clientWidth;
						break;
						
					case 'document.Height':
						result= Math.max( document.body.scrollHeight, document.documentElement.scrollHeight,
										  document.body.offsetHeight, document.documentElement.offsetHeight,
										  document.body.clientHeight, document.documentElement.clientHeight);
						break;
						
					case 'document.Width':
						result= Math.max( document.body.scrollWidth, document.documentElement.scrollWidth,
										  document.body.offsetWidth, document.documentElement.offsetWidth,
										  document.body.clientWidth, document.documentElement.clientWidth);
						break;
						
					case 'pageYOffset':
						result= window.pageYOffset;
						break;
						
					case 'pageXOffset':
						result= window.pageXOffset;
						break;
						
					case 'pageYRatio':
						var max_Y= Math.max( document.body.scrollHeight, document.documentElement.scrollHeight,
											 document.body.offsetHeight, document.documentElement.offsetHeight,
											 document.body.clientHeight, document.documentElement.clientHeight);
						result= ( Math.round( max_Y- document.documentElement.clientHeight) == Math.round( window.pageYOffset)) ? 100 : Math.floor( ( ( window.pageYOffset > ( max_Y- document.documentElement.clientHeight))? ( max_Y- document.documentElement.clientHeight) : window.pageYOffset)/ ( max_Y- document.documentElement.clientHeight)* 10)* 10 *( (window.pageYOffset < 1)? 0 : 1 );
						break;
						
					case 'pageXRatio':
						var max_X= Math.max( document.body.scrollWidth, document.documentElement.scrollWidth,
											 document.body.offsetWidth, document.documentElement.offsetWidth,
											 document.body.clientWidth, document.documentElement.clientWidth);
						result= ( Math.round( max_X- document.documentElement.clientWidth) == Math.round( window.pageXOffset)) ? 100 : Math.floor( ( ( window.pageXOffset > ( max_X- document.documentElement.clientWidth))? ( max_X- document.documentElement.clientWidth) : window.pageXOffset)/ ( max_X- document.documentElement.clientWidth)* 10)* 10 *( (window.pageXOffset < 1)? 0 : 1 );
						break;
						
					case 'pageYRatio_finely':
						var max_Y= Math.max( document.body.scrollHeight, document.documentElement.scrollHeight,
											 document.body.offsetHeight, document.documentElement.offsetHeight,
											 document.body.clientHeight, document.documentElement.clientHeight);
						result= ( Math.round( max_Y- document.documentElement.clientHeight) == Math.round( window.pageYOffset)) ? 100 : Math.floor( ( ( window.pageYOffset > ( max_Y- document.documentElement.clientHeight))? ( max_Y- document.documentElement.clientHeight) : window.pageYOffset)/ ( max_Y- document.documentElement.clientHeight)* 100) *( (window.pageYOffset < 1)? 0 : 1 );
						break;
						
					case 'pageXRatio_finely':
						var max_X= Math.max( document.body.scrollWidth, document.documentElement.scrollWidth,
											 document.body.offsetWidth, document.documentElement.offsetWidth,
											 document.body.clientWidth, document.documentElement.clientWidth);
						result= ( Math.round( max_X- document.documentElement.clientWidth) == Math.round( window.pageXOffset)) ? 100 : Math.floor( ( ( window.pageXOffset > ( max_X- document.documentElement.clientWidth))? ( max_X- document.documentElement.clientWidth) : window.pageXOffset)/ ( max_X- document.documentElement.clientWidth)* 100) *( (window.pageXOffset < 1)? 0 : 1 );
						break;
						
					case 'version':
						result= '1.0.3';
						break;
						
				}
				
				return result;
			},
			
		};
		
		function Update_in2body(){
			
			const today=	new Date();
			result_year=	today.getFullYear();
			result_month=	today.getMonth()+1;
			result_date=	today.getDate();
			result_day=		['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][today.getDay()];
			
			result_hour=	today.getHours();
			result_min=		Math.floor(today.getMinutes()/10)*10;
			result_sec=		Math.floor(today.getSeconds()/10)*10;
			
			// portrait
			if( window.innerHeight / window.innerWidth > 1){
				result_orientation= 'portrait';
				
			// landscape
			}else if( window.innerHeight / window.innerWidth < 1){
				result_orientation= 'landscape';
				
			// square
			}else if( window.innerHeight === window.innerWidth){
				
				result_orientation= is_square ? 'square' : 'portrait';
			}
			
			if( 1400 <= document.documentElement.clientWidth)	result_breakpoint= 'xxl';	// Extra extra large / larger desktops( ≥1400px)
			if( 1400 >  document.documentElement.clientWidth)	result_breakpoint= 'xl';	// Extra large / wide desktops( ≥1200px)
			if( 1200 >  document.documentElement.clientWidth)	result_breakpoint= 'lg';	// Large / desktops( ≥992px)
			if(  992 >  document.documentElement.clientWidth)	result_breakpoint= 'md';	// Medium / tablets( ≥768px)
			if(  768 >  document.documentElement.clientWidth)	result_breakpoint= 'sm';	// Small / landscape phones( ≥576px)
			if(  576 >  document.documentElement.clientWidth)	result_breakpoint= 'xs';	// Extra small / portrait phones( <576px)
			
			var max_Y= Math.max( document.body.scrollHeight, document.documentElement.scrollHeight,
								 document.body.offsetHeight, document.documentElement.offsetHeight,
								 document.body.clientHeight, document.documentElement.clientHeight);
			result_YRatio= ( Math.round( max_Y- document.documentElement.clientHeight) == Math.round( window.pageYOffset)) ? 100 : Math.floor( ( ( window.pageYOffset > ( max_Y- document.documentElement.clientHeight))? ( max_Y- document.documentElement.clientHeight) : window.pageYOffset)/ ( max_Y- document.documentElement.clientHeight)* 10)* 10 *( (window.pageYOffset < 1)? 0 : 1 );
			
			var max_X= Math.max( document.body.scrollWidth, document.documentElement.scrollWidth,
								 document.body.offsetWidth, document.documentElement.offsetWidth,
								 document.body.clientWidth, document.documentElement.clientWidth);
			result_XRatio= ( Math.round( max_X- document.documentElement.clientWidth) == Math.round( window.pageXOffset)) ? 100 : Math.floor( ( ( window.pageXOffset > ( max_X- document.documentElement.clientWidth))? ( max_X- document.documentElement.clientWidth) : window.pageXOffset)/ ( max_X- document.documentElement.clientWidth)* 10)* 10 *( (window.pageXOffset < 1)? 0 : 1 );
			
			
			for( var i= 0; i < 11; i++){
				var tmp= 'YR'+ (i*10);
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 11; i++){
				var tmp= 'XR'+ (i*10);
				document.body.classList.remove( tmp);
			}
			
			var bp= ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
			for(var i = 0; i <  bp.length; i++) {
				var tmp= 'BP'+ bp[i];
				document.body.classList.remove( tmp);
			}
			
			var orientation= ['portrait', 'landscape', 'square'];
			for(var i = 0; i <  orientation.length; i++) {
				var tmp= orientation[i];
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 6; i++){
				var tmp= 'sec'+ (i*10);
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 6; i++){
				var tmp= 'min'+ (i*10);
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 24; i++){
				var tmp= 'hour'+ i;
				document.body.classList.remove( tmp);
			}
			
			var day= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			for(var i = 0; i <  day.length; i++) {
				var tmp= 'day'+ day[i];
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 31; i++){
				var tmp= 'date'+ (i+1);
				document.body.classList.remove( tmp);
			}
			
			for( var i= 0; i < 12; i++){
				var tmp= 'month'+ (i+1);
				document.body.classList.remove( tmp);
			}
			
			if( is_month)		document.body.classList.add( 'month'+ result_month);
			if( is_date)		document.body.classList.add( 'date'+ result_date);
			if( is_day)			document.body.classList.add( 'day'+ result_day);
			if( is_hour)		document.body.classList.add( 'hour'+ result_hour);
			if( is_min)			document.body.classList.add( 'min'+ result_min);
			if( is_sec)			document.body.classList.add( 'sec'+ result_sec);
			
			if( is_orientation)	document.body.classList.add( result_orientation);
			if( is_breakpoint)	document.body.classList.add( 'BP'+ result_breakpoint);
			if( is_yratio)		document.body.classList.add( 'YR'+ result_YRatio);
			if( is_xratio)		document.body.classList.add( 'XR'+ result_XRatio);
			
			document.body.style.setProperty('--pageY', window.pageYOffset);
			document.body.style.setProperty('--pageX', window.pageXOffset);
			
			document.body.style.setProperty('--clientH', document.documentElement.clientHeight);
			document.body.style.setProperty('--clientW', document.documentElement.clientWidth);
			
			document.body.style.setProperty('--innerH', window.innerHeight);
			document.body.style.setProperty('--innerW', window.innerWidth);
			
			document.body.style.setProperty('--documentH', max_Y);
			document.body.style.setProperty('--documentW', max_X);
			
		}
		
		var in2body= new in2body();
		return in2body;
	}))
);
