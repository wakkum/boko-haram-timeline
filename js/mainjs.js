	<!DOCTYPE html>
<html lang="en">
  <head>
<noscript><meta http-equiv="refresh" content="0; URL=/files/laurian/F02CT884G/main.js?nojsmode=1" /></noscript>
<script type="text/javascript">
if(self!==top)window.document.write("\u003Cstyle>body * {display:none !important;}\u003C\/style>\u003Ca href=\"#\" onclick="+
"\"top.location.href=window.location.href\" style=\"display:block !important;padding:10px\">Go to Slack.com\u003C\/a>");
</script>
<script type="text/javascript">


var TS_last_log_date = null;
var TSMakeLogDate = function() {
	var date = new Date();
	
	var y = date.getFullYear();
	var mo = date.getMonth()+1;
	var d = date.getDate();

	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	var ms = date.getMilliseconds();
	var str = y+'/'+mo+'/'+d+' '+h+':'+mi+':'+s+'.'+ms;
	if (TS_last_log_date) {
		var diff = date-TS_last_log_date;
		//str+= ' ('+diff+'ms)';
	}
	TS_last_log_date = date;
	return str+' ';
}

var TSSSB = {
	timeout_tim: 0,
	callCEF3: function(method, obj_args, handler) {
		var url = 'https://slackcef3.com/'+method;
		
		handler = handler || function(ob) {}
		
		var req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4) {
				if (req.status == 200) {
	
					req.onreadystatechange = null;
					var obj;
					
					if (req.responseText.indexOf('{') == 0) {
						try {
							eval('obj = '+req.responseText);
						} catch (err) {
							console.warn('unable to do anything with simple_ajax_call rsp');
							console.error(err);
						}
					} else {
						obj = {
							ok: 1,
							rsp: req.responseText
						}
					}
					if (handler) handler(obj);
				} else {
					handler({
						'ok'	: 0,
						'error'	: "Non-200 HTTP status: "+req.status,
						'debug'	: req.responseText
					});
				}
			}
		}
	
		req.open('POST', url, 1);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	
		var obj_args2 = [];
		for (i in obj_args) {
			obj_args2[obj_args2.length] = encodeURIComponent(i)+'='+encodeURIComponent(obj_args[i]);
		}
	
		req.send(obj_args2.join('&'));
	},
	
	callMacGap: function(method, args) {
		var args_str = '';
		if (args != undefined && args != null) {
			try {
				args_str = JSON.stringify(args)
			} catch(e) {
				args_str = 'bad/no args';
			}
		}
		
		console.info(TSMakeLogDate()+'TSSSB '+method+' '+args_str);
		
		if (method == 'reload' && macgap.app && macgap.app.reload) {
			macgap.app.reload();
			return true;
		}
		
		if (method == 'didStartLoading' && macgap.app && macgap.app.didStartLoading) {
			macgap.app.didStartLoading(args);
			return true;
		}
		
		if (method == 'didFinishLoading' && macgap.app && macgap.app.didFinishLoading) {
			macgap.app.didFinishLoading();
			return true;
		}
		
		if (method == 'setCurrentTeam' && macgap.state && macgap.state.setCurrentTeam) {
			macgap.state.setCurrentTeam(args);
			return true;
		}
		
		if (method == 'disableSecureInput' && macgap.app && macgap.app.disableSecureInput) {
			macgap.app.disableSecureInput();
			return true;
		}
		
		return false;
	},
	
	call: function(method, obj_args, args, handler) {
		if (!window.macgap && !window.is_winssb) return false;
		
		if (method == 'didFinishLoading') {
			clearTimeout(TSSSB.timeout_tim);
		}
		
		if (method == 'didStartLoading') {
			clearTimeout(TSSSB.timeout_tim);
			
			var ms = obj_args.ms-1000;
			console.info(TSMakeLogDate()+'TSSSB.timeout_tim set for ms:'+ms);
			TSSSB.timeout_tim = setTimeout(function() {
				console.info(TSMakeLogDate()+'TSSSB.timeout_tim fired, we\'re about to be reloaded for taking too long');
				console.warn(TSMakeLogDate()+' '+JSON.stringify(window.load_log, null, '\t'));
			}, ms)
		}
	
	
		if (window.macgap) {
			return TSSSB.callMacGap(method, args);
		}
		
		if (window.is_winssb) {
			TSSSB.callCEF3(method, obj_args, handler);
			return true;
		}
		
		return false;
	}
}

</script><script type="text/javascript">
	TSSSB.call('didFinishLoading');
</script>
    <meta charset="utf-8">
    <title>main.js | AJinfographics Slack</title>
    <meta name="author" content="Tiny Speck">


<!-- output_css "core" -->
    <link href="https://slack.global.ssl.fastly.net/20807/style/libs_jquery.monkeyScroll_1402338160.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20776/style/libs_bootstrap_1402096396.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/19929/style/libs_font-awesome_1400177229.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/9889/style/libs_ladda-themeless_1378856995.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20169/style/web_layout_1401916183.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21508/style/forms_1403814858.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/18238/style/buttons_1401916267.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20646/style/tips_1401916313.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/19991/style/typography_1401916219.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21595/style/utilities_1404158560.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20794/style/menu_1402332429.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/19768/style/activity_1401916207.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20707/style/channels_1402006570.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21521/style/messages_1403889078.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21352/style/messages_dense_1403555069.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21447/style/messages_light_1403709795.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21741/style/files_1404345135.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20965/style/members_1402529172.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/20362/style/search_1401916272.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/19286/style/stars_1401916240.https.gz.css" rel="stylesheet" type="text/css">

<!-- output_css "regular" -->
    <link href="https://slack.global.ssl.fastly.net/21435/style/comments_1403646005.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/11315/style/libs_codemirror_1381961471.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/21369/style/modal_1403561725.https.gz.css" rel="stylesheet" type="text/css">
    <link href="https://slack.global.ssl.fastly.net/18628/style/print_1397589397.https.gz.css" rel="stylesheet" type="text/css">






    <!--[if lt IE 9]>
    <script src="https://slack.global.ssl.fastly.net/1261/js/libs_html5shiv_1361923886.https.gz.js"></script>
    <![endif]-->

    <link href='https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic,900italic' rel='stylesheet' type='text/css'>


<link id="favicon" rel="shortcut icon" href="https://slack.global.ssl.fastly.net/20655/img/icons/favicon-32.png" sizes="16x16 32x32 48x48" type="image/png" />

<link rel="icon" href="https://slack.global.ssl.fastly.net/9427/img/icons/app-256.png" sizes="256x256" type="image/png" />

<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-152.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-144.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-120.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-72.png" />
<link rel="apple-touch-icon-precomposed" href="https://slack.global.ssl.fastly.net/21506/img/icons/ios-57.png" />

<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="https://slack.global.ssl.fastly.net/20655/img/icons/app-144.png" /><script type="text/javascript">

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-106458-17', 'slack.com');
	ga('send', 'pageview');

	(function(e,c,b,f,d,g,a){e.SlackBeaconObject=d;
	e[d]=e[d]||function(){(e[d].q=e[d].q||[]).push([1*new Date(),arguments])};
	e[d].l=1*new Date();g=c.createElement(b);a=c.getElementsByTagName(b)[0];
	g.async=1;g.src=f;a.parentNode.insertBefore(g,a)
	})(window,document,"script","https://slack.global.ssl.fastly.net/15899/js/libs_beacon_1392444912.https.gz.js","sb");
	sb('set', 'token', '3307f436963e02d4f9eb85ce5159744c');
	sb('set', 'user_id', 'U0291JQSB');
	sb('set', 'user_batch', "immediate-launch");
	sb('set', 'user_created', "2014-04-20");
	sb('set', 'name_tag', 'ajinfographics/haddad');
	sb('track', 'pageview');


	function track(a){ga('send','event','web',a);sb('track',a);}

</script>
  </head>

  <body ondragover="return false" class=" ">

	
		

	  <div id="header">
	     <div class="container position-relative">
		
			<div id="header_team">

				<a href="/messages">
					<img src="https://slack.global.ssl.fastly.net/14965/img/slack_logo_header.png" id="slack_icon" data-toggle="tooltip" title="Launch the Slack app" />
				</a>

				<span class="dropdown">
					<a id="header_team_name" class="overflow-ellipsis dropdown-toggle" data-toggle="dropdown">
						AJinfographics
						<i class="fa fa-caret-down"></i>
					</a>

					<ul class="dropdown-menu">
						<li>
							<a href="/team/haddad">
								<img src="https://secure.gravatar.com/avatar/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F20655%2Fimg%2Favatars%2Fava_0019-48.png" class="member_image thumb_24" id="header_user_avatar" />
								Logged in as <strong>haddad</strong>
							</a>
						</li>
						<li>
							<a href="/messages">
								<img src="https://slack.global.ssl.fastly.net/20655/img/icons/app-48.png" id="header_app_icon" />
								Launch the Slack app
							</a>
						</li>
						<li class="divider"></li>
												<li><a href="/getting-started"><i class="fa fa-bolt"></i> Getting Started Tips</a></li>
																									<li><a href="https://slack.com/signout/2307629003?crumb=s-1404390935-772f37dfc6-%E2%98%83"><i class="fa fa-sign-out"></i> Sign Out</a></li>
					</ul>
				</span>

			</div>
						
			<div id="header_nav" >				
				<a href="/activity" class="primary_nav ">Home</a>
				<a href="/team" class="primary_nav ">Team</a>
				<a href="/services/new" class="primary_nav ">Integrations</a>				<a href="/account/settings" class="primary_nav ">Account</a>
				<a href="/help" class="primary_nav ">Help</a>
				<a href="/apps" class="primary_nav ">Apps</a>
			</div>
			
						
		  </div>
		</div>

	
			<div class="container"> 	
<div id="file_page" class="snippet">
	
	<div class="col_left">

		<p class="file_page_user bottom_margin">

	<a href="/team/laurian" class="float-left small_right_margin">
		<span class="member_image thumb_48" style="background-image: url('https://secure.gravatar.com/avatar/574cefac39ae4dfab69d9f3f05066c00.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013-48.png')"></span>
	</a>	

	<a href="/team/laurian" class="bold member_name member" style="color: #9F69E7;" data-member-id="U0291JH05">
		laurian
	</a><br />
	
	<span class="date">Jul 3 at 3:01 PM</span>

</p>		
		<h5>Snippet Details</h5>
		<p class="file_page_meta bottom_margin">
			11KB JavaScript/JSON snippet<br />
							Shared in 
									<a href="/archives/bokoharam" class="bold">#bokoharam</a>&nbsp;<a class="unshare_link" data-toggle="tooltip" title="Remove this from #bokoharam" onclick="TS.files.promptForFileUnshare('F02CT884G', 'C02C16AE9')"><i class="fa fa-minus-circle"></i></a>													</p>

		<h5>Actions</h5>
		<ul class="file_page_meta bottom_margin action_list">
						<li><a href="https://files.slack.com/files-pri/T0291JH03-F02CT884G/main.js" target="2435280152"><i class="fa fa-code"></i>View raw</a></li>
			<li><a href="https://files.slack.com/files-pri/T0291JH03-F02CT884G/download/main.js"><i class="fa fa-cloud-download"></i>Download file</a></li>
			<li><a href="/files/create/snippet/F02CT884G"><i class="fa fa-files-o"></i>Clone</a></li>

						<li><a onclick="window.print();"><i class="fa fa-print"></i>Print</a></li>
		</ul>
		
		<h5>Privacy and Sharing</h5>
		<p class="file_page_meta bottom_margin action_list">
			
										
									
	<span class="file_public_link_creation ">
		<a id="file_public_link_toggle" class="bold"><i class="fa fa-link" style="font-size: 0.75rem;"></i>Create public link</a>
	</span>
	
	<span class="file_public_link_shared hidden">
		<a class="file_public_link bold" href="https://slack-files.com/T0291JH03-F02CT884G-4dcbac" target="new"><i class="fa fa-link" style="font-size: 0.75rem;"></i>Public link</a>
		<a id="file_public_link_revoker" class="delete_link" data-toggle="tooltip" title="You can revoke the public link to this file. This will cause any previously shared links to stop working."><i class="fa fa-times" style="font-size: 0.75rem;"></i></a>
	</span>
	
	<span id="file_public_link_explanation" class="mini subtle_silver hidden inline-block" style="margin: 0 0 0.5rem 1.25rem;">Public link created:<br /><a href="https://slack-files.com/T0291JH03-F02CT884G-4dcbac" class="file_public_link" target="new">click here to open it</a>.</span>
	<br />
				
				<span id="share_holder" class="mini hidden">

	<a href="#file_share_modal" class="bold" data-toggle="modal">
					<i class="fa fa-share"></i>Share snippet			</a>

</span>				
			
		</p>				

	</div>
	
	<div class="col_right">

		<h2 class="small_bottom_margin break_word">
			main.js
			<span id="star_holder" class="no_print"></span>
		</h2>

		
		<p class="print_only lato">
			<strong>Created by laurian on July 3, 2014 at 3:01 PM</strong><br />
			<span class="mini subtle_silver break_word">https://ajinfographics.slack.com/files/laurian/F02CT884G/main.js</span>
		</p>
		
		<div id="file_page_preview">
			<pre id="file_contents">///////////////////////////////////////////////////////////////////////////////////////////
// Settings

var mapSettings = {
    center: [8.483238563913513, 4.954833984374999],
    zoom: 6,
    maxZoom: 8,
    dragging: false,
    touchZoom: false,
    // doubleClickZoom: false,
    boxZoom: false,
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: false // we show attribution data in the footer
};

var defaultStyle = {
    color: &#039;#ff7800&#039;,
    weight: 1,
    opacity: 0.5,
    fillOpacity: 0.1,
    fillColor: &#039;#ff0000&#039;
};

var fromStyle = {
    color: &#039;#ff0000&#039;,
    weight: 1,
    opacity: 0.5,
    fillOpacity: 0.6,
    fillColor: &#039;#ff0000&#039;
};

var toStyle = {
    color: &#039;#00ff00&#039;,
    weight: 1,
    opacity: 0.5,
    fillOpacity: 0.6,
    fillColor: &#039;#00ff00&#039;
};


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
// let there be globals
var map, tiles, shapes, data, sheet;

///////////////////////////////////////////////////////////////////////////////////////////
// setup base map
map = L.map(&#039;map&#039;, mapSettings);

tiles = L.tileLayer.provider(&#039;Esri.WorldTopoMap&#039;);
tiles.addTo(map);

//show attribution data in the footer
$(&#039;footer small span&#039;).html(tiles.getAttribution());

shapes = L.geoJson(null, {
    style: defaultStyle
});
shapes.addTo(map);

var markerLayers = new L.LayerGroup();
map.addLayer(markerLayers);

var getShapeByName = function (name) {
  for (sid in shapes._layers) {
    if (shapes._layers[sid].feature.properties.NAME_1 == name) return shapes._layers[sid];
  }

  return {
    setStyle: function(){} //dummy
  };
}

var setStyleOnEach = function (name, style) {
  var tokens = name.trim().split(/[,\s]/);
  for (var i = 0; i &lt; tokens.length; i++) {
    if (tokens[i] != &quot;&quot;) {
      getShapeByName(tokens[i]).setStyle(style);
    }
  }
}


queue()
    .defer(function(callback){
      Tabletop.init({
          key: &#039;1fNmHh1m3qKvN-RSueCzcZMHaL-a1I0dPzInxI3Ei-YI&#039;,
          callback: function(_sheet, tabletop) {
              callback(null, _sheet);
          },
          simpleSheet: false
      });
    })
    .defer(function(callback){
        var _shapes = omnivore.topojson(&#039;data/NGA_adm1-topo.json&#039;, null, shapes)
            .on(&#039;ready&#039;, function() {
                _shapes.eachLayer(function(layer) {
                    // console.log(layer.feature.properties);
                    layer.bindPopup(layer.feature.properties.NAME_1);
                });
            });
        callback(null, _shapes);
    })
    .await(function(error, _sheet, _shapes) {
        if (error) return console.err(error);

        sheet = _sheet;
        console.log(sheet);

        var data1 = [];
        var data2 = [];
        var data3 = [];

        //ATTACKS
        for (var i = 0; i &lt; sheet.ATTACKS.elements.length; i++) {
          var d = sheet.ATTACKS.elements[i];
          data1.push({
            date: new Date(d.date),
            lng: parseFloat(d.lng),
            lat: parseFloat(d.lat),
            killed: isNaN(parseInt(d.deaths))?0:parseInt(d.deaths),
            injured: isNaN(parseInt(d.injured))?0:parseInt(d.injured),
            location: d.location,
            desc: d.description,
            type: &#039;attack&#039;
          });
        }

        //TIMELINE
        for (var i = 0; i &lt; sheet.TIMELINE.elements.length; i++) {
          var d = sheet.TIMELINE.elements[i];
          data2.push({
            date: new Date(d.date),
            desc: d.event,
            important: d.red,
            type: &#039;event&#039;
          });
        }

        //DISPLACEMENT
        for (var i = 0; i &lt; sheet.DISPLACEMENT.elements.length; i++) {
          var d = sheet.DISPLACEMENT.elements[i];
          data2.push({
            date: new Date(d.date),
            from: d.from,
            to: d.to,
            fromfuzzy: d.fromfuzzy,
            tofuzzy: d.tofuzzy,
            people: isNaN(parseInt(d.number))?0:parseInt(d.number),
            dType: d.internalexternal.toLowerCase(),
            desc: d.cause,
            type: &#039;displ&#039;
          });
        }

        // merge data and sort by date
        data = data1.concat(data2).concat(data3);
        data.sort(function(a,b){
            return a.date.getTime() - b.date.getTime();
        });

        magic(sheet.COPY.elements);
        process();
    });

function magic(rules) {
  for (var i = 0; i &lt; rules.length; i++) {
    var rule = rules[i];
    var $target = $(rule.selector);

    if (rule.method == &#039;text&#039;) {
      $target.text(rule.content);
    }

    if (rule.method == &#039;html&#039;) {
      $target.html(rule.content);
    }

    if (rule.method == &#039;prepend&#039;) {
      var $el = $(document.createElement(rule.element));
      if (rule.content) $el.html(rule.content);
      $target.prepend($el);
    }

    if (rule.method == &#039;append&#039;) {
      var $el = $(document.createElement(rule.element));
      if (rule.content) $el.html(rule.content);
      $target.append($el);
    }

  }

  // $(&#039;header&#039;).css(&#039;height&#039;, $(&#039;.rest&#039;).height());
}

$(window).bind(&#039;resize&#039;, function(e) {
    window.resizeEvt;
    $(window).resize(function() {
        clearTimeout(window.resizeEvt);
        window.resizeEvt = setTimeout(function() {
            reset();
            process();
            // $(&#039;header&#039;).css(&#039;height&#039;, $(&#039;.rest&#039;).height());
        }, 250);
    });
});

function reset() {
  markerLayers.clearLayers();
  $(&#039;#timeline&#039;).empty();
}



function process() {
    // console.log(&#039;Rows &#039;, data.length);
    // console.log(&#039;First row&#039;, data[0]);
    // console.log(&#039;Last row&#039;, data[data.length - 1]);

    var $timeline = $(&#039;#timeline&#039;);

    var start = data[0].date.getTime();

    var bottom = 0;//350; //aka top padding

    for (i = 0; i &lt; data.length; i++) {

        var timestamp = null;
        if (i == 0) {
            timestamp = data[0].date.getYear() + 1900;
        } else if (data[i].date.getYear() != data[i - 1].date.getYear()) {
            timestamp = data[i].date.getYear() + 1900;
        }

        var sameMonth = (i &gt; 0 &amp;&amp; data[i].date.toString(&#039;MMMM&#039;) == data[i-1].date.toString(&#039;MMMM&#039;));
        var sameDate = (i &gt; 0 &amp;&amp; data[i].date.toString() == data[i-1].date.toString());

        // default spacing: 10px per day
        var top = 10*(data[i].date.getTime() - start)/(1000*3600*24);

        // don&#039;t overlap the previous event, add minimum space
        if (top &lt; bottom &amp;&amp; sameDate) {
          top = bottom + 10;
        } else if (top &lt; bottom) {
          top = bottom + 20;
        }

        // compress space
        if (top - bottom &gt; 300) top = bottom + 300;


        var $event = $(_.template($(&#039;#&#039; + data[i].type).html(),
              {
                id: &#039;A&#039; + i,
                year: timestamp,
                month: data[i].date.toString(&#039;MMMM&#039;),
                sameMonth: sameMonth,
                sameDate: sameDate,
                day: data[i].date.toString(&#039;dS&#039;).replace(&#039;th&#039;, &#039;&lt;sup&gt;th&lt;/sup&gt;&#039;).replace(&#039;nd&#039;, &#039;&lt;sup&gt;nd&lt;/sup&gt;&#039;).replace(&#039;st&#039;, &#039;&lt;sup&gt;st&lt;/sup&gt;&#039;),
                description: data[i].desc,
                from: data[i].from,
                to: data[i].to,
                fromfuzzy: data[i].fromfuzzy,
                tofuzzy: data[i].tofuzzy,
                dType: data[i].dType,
                injured: data[i].injured,
                killed: data[i].killed,
                location: data[i].location
              }
            ))
            .data({
                lat: data[i].lat,
                lng: data[i].lng,
                index: i,
                description: data[i].desc,
                from: data[i].from,
                to: data[i].to,
                injured: data[i].injured,
                killed: data[i].killed
            })
            .css({
                position: &#039;absolute&#039;,
                top: top,
                zIndex: i
            })
            .appendTo($timeline)
            .waypoint(function(direction) {

              if ($(this).data(&#039;from&#039;) || $(this).data(&#039;to&#039;)) {
                $(&#039;.highlight&#039;).removeClass(&#039;highlight&#039;);
                $(this).find(&#039;&gt;div&#039;).addClass(&#039;highlight&#039;);

                if (direction == &#039;down&#039;) {
                  setStyleOnEach($(this).data(&#039;from&#039;), fromStyle);
                  setStyleOnEach($(this).data(&#039;to&#039;), toStyle);
                } else {
                  setStyleOnEach($(this).data(&#039;from&#039;), defaultStyle);
                  setStyleOnEach($(this).data(&#039;to&#039;), defaultStyle);
                }
              }

              if ($(this).data(&#039;lng&#039;) &amp;&amp; $(this).data(&#039;lat&#039;)) {

                    $(&#039;.highlight&#039;).removeClass(&#039;highlight&#039;);
                    $(this).find(&#039;&gt;div&#039;).addClass(&#039;highlight&#039;);

                    var latlng = L.latLng($(this).data(&#039;lat&#039;), $(this).data(&#039;lng&#039;));

                    if (! $(this).data(&#039;marker&#039;)) {
                      var marker = L.marker(latlng, {
                          riseOnHover: true
                      });

                      marker.setIcon(L.icon({
                          &quot;iconUrl&quot;: &quot;img/attack.png&quot;,
                          &quot;iconSize&quot;: [22, 22],   // size of the icon
                          &quot;iconAnchor&quot;: [11, 11], // point of the icon which will correspond to marker&#039;s location
                          &quot;popupAnchor&quot;: [0, -5], // point from which the popup should open relative to the iconAnchor
                          &quot;className&quot;: &quot;dot&quot;
                      }));

                      marker.addTo(markerLayers);

                      marker.bindPopup($(this).data(&#039;description&#039;));
                      marker.openPopup();

                      $(this).data(&#039;marker&#039;, marker);
                    } else if (direction == &#039;down&#039;) {
                      $(this).data(&#039;marker&#039;).addTo(markerLayers);
                      $(this).data(&#039;marker&#039;).openPopup();
                    }

                    if (direction == &#039;up&#039; &amp;&amp; $(this).data(&#039;marker&#039;)) {
                      markerLayers.removeLayer($(this).data(&#039;marker&#039;));
                      $(this).data(&#039;marker&#039;).openPopup();
                    }
                }
            }, { offset: &#039;50%&#039; });

        // compute next space
        bottom = top + $event.height();
    }

    // set timeline height, plus padding
    $timeline.css(&#039;height&#039;, bottom + 50);
}

/////

$(&#039;#head-text-t1h&#039;).click(function() {
  $(&#039;header .selected&#039;).removeClass(&#039;selected&#039;);
  $(this).addClass(&#039;selected&#039;);
  $(&#039;#head-text-t1&#039;).addClass(&#039;selected&#039;);
  $(&#039;.cutout&#039;).attr(&#039;src&#039;, &#039;img/boko.png&#039;);
});

$(&#039;#head-text-t2h&#039;).click(function() {
  $(&#039;header .selected&#039;).removeClass(&#039;selected&#039;);
  $(this).addClass(&#039;selected&#039;);
  $(&#039;#head-text-t2&#039;).addClass(&#039;selected&#039;);
  $(&#039;.cutout&#039;).attr(&#039;src&#039;, &#039;img/soldier.png&#039;);
});


</pre>
		</div>

		<p class="file_page_meta no_print" style="line-height: 1.5rem;">
			<label class="checkbox normal mini float-right no_top_padding no_min_width">
				<input type="checkbox" id="file_preview_wrap_cb"> wrap long lines
			</label>
		</p>
	
		<div id="comments_holder" style="margin-top: 3rem;" class="no_print">
			<h3>Comments</h3>
			<div id="file_page_comments">
							</div>	
			<form action="https://ajinfographics.slack.com/files/laurian/F02CT884G/main.js" 
		id="file_comment_form" 
					class="comment_form"
				method="post">
			<a href="/team/haddad" class="member_preview_link" data-member-id="U0291JQSB">
			<span class="member_image thumb_36" style="background-image: url('https://secure.gravatar.com/avatar/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F20655%2Fimg%2Favatars%2Fava_0019-48.png')"></span>
		</a>		
		<input type="hidden" name="addcomment" value="1" />
	<input type="hidden" name="crumb" value="s-1404390935-d8848f15ef-☃" />

	<textarea id="file_comment" data-el-id-to-keep-in-view="file_comment_submit_btn" class="comment_input small_bottom_margin" name="comment" wrap="virtual" ></textarea>
	<span class="mini float-left cloud_silver file_comment_tip">cmd+enter to submit</span>	<button id="file_comment_submit_btn" type="submit" class="btn btn-primary btn-small float-right ladda-button" data-style="expand-right"><span class="ladda-label">Add Comment</span></button>
</form>

<form action="https://ajinfographics.slack.com/files/laurian/F02CT884G/main.js" 
		id="file_edit_comment_form" 
					class="edit_comment_form hidden"
				method="post">
	<textarea id="file_edit_comment" class="comment_input small_bottom_margin" name="comment" wrap="virtual"></textarea><br>
	<span class="mini float-left cloud_silver file_comment_tip">cmd+enter to submit</span>	<input type="submit" class="save btn btn-primary btn-mini float-right" value="Save Changes" />
	<input type="submit" class="cancel btn btn-mini btn-outline float-right small_right_margin" value="Cancel" />
</form>	
		</div>

	
	</div>

	<div id="file_share_modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="Share" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>
			Share 
			Snippet											</h3>
	</div>

	<div class="modal-body share_dialog">
				
		<div id="share_channels">

			<p id="select_share_channels_note">Sharing a file into a channel makes it public. All members of your team will have access to it.</p>

			<p>
				<label for="select_share_channels" class="select">Share in</label>
				
				<select id="select_share_channels" name="select_share_channels" >
																		<option value="C02C22D10">#afghanistan</option>
																								<option value="C02C16AE9">#bokoharam</option>
																								<option value="C0291JH09">#general</option>
																								<option value="C02BWE086">#git</option>
																								<option value="C0291JH0B">#random</option>
																<option value="ts_null_value">---</option>
					<option value="ts_switch_to_ims">Share with a person...</option>
					
				</select>			
			</p>

		</div>

		<div id="share_ims" class="hidden">

			<p id="select_share_ims_note">Sharing a file with a person means that only they will have access to it (unless it is also shared into a channel or with a group).</p>

			<p>
				<label for="select_share_ims" class="select">Share with</label>

				<select id="select_share_ims" name="select_share_ims">
																										<option value="D0291JQSD">@slackbot</option>
																																							<option value="D0291JQSF" data-user-id="U0291JH05"></option>
																																							<option value="D029268B4" data-user-id="U029268AW"></option>
																																							<option value="D02BVEYAB" data-user-id="U02BVEYA3"></option>
																																							<option value="D02BVG3L9" data-user-id="U02BVG3KZ"></option>
																																							<option value="D02BVJG3K" data-user-id="U02BVJG39"></option>
																							<option value="ts_null_value">---</option>
					<option value="ts_switch_to_channels">Share in a channel...</option>
									</select>
			</p>

		</div>

		<div id="share_groups" class="hidden">

			<p id="select_share_groups_note">Sharing a file into a group means that only members of that group will have access to it (unless it is also shared into a channel).</p>

			<p>
				<label for="select_share_groups" class="select">Share with</label>

				<select id="select_share_groups" name="select_share_groups">
										<option value="ts_null_value">---</option>
					<option value="ts_switch_to_ims">Share with a person...</option>
					<option value="ts_switch_to_channels">Share in a channel...</option>
				</select>
			</p>

		</div>

		<p class="no_bottom_margin">
			<label class="inline-block align_top">
				Add Comment 					<br />
					<span class="input_note normal">(optional)</span>
							</label>
			<textarea id="file_comment_textarea" class="comment_input" name="comment" wrap="virtual"></textarea>
		</p>

	</div>

	<div class="modal-footer">
	  <button id="file_share_cancel" class="btn btn-outline" data-dismiss="modal" aria-hidden="true">Cancel</button>
	  <button id="file_share_submit" class="btn btn-primary ladda-button" data-style="expand-right"><span class="ladda-label">Share</span></button>
	</div>
	
</div>
</div>


	<div class="clear-both"></div>

<div id="footer">		
	<span class="float-right">
					<a href="/help">Help</a>
			<a href="/apps">Apps</a>
				<a href="https://api.slack.com/">API</a>
		<a href="/pricing">Pricing</a>			
			<a href="/give100-get100">Referral Program</a><br />
				
		<a href="/terms-of-service">Terms of Service</a>
		<a href="/privacy-policy">Privacy Policy</a>
		<a href="/security">Security</a>
		<a href="/help/contact">Contact</a>
		<a href="http://www.tinyspeck.com">Tiny Speck, Inc</a>
	</span>
</div>


	</div> 

	<script type="text/javascript">
<!--
	// common boot_data
	var boot_data = {
		start_ms: new Date().getTime(),
		app: 'web',
		user_id: '2307636895',
		svn_rev: '21747',
		redir_domain: 'slack-redir.com',
		api_url: '/api/',
		api_token: 'xoxo-2307636895-QoqzO1irbEea4T5vIcqmXzbs',
		feature_status: false,
		feature_attachments_inline: false,
		feature_search_attachments: true,
		feature_chat_sounds: false,
		feature_restricted_accounts: true,
		feature_darken_scroll_handle: false,
		feature_new_customize_slackbot: false,
		feature_notifications_settings_overrides: false,
		img: {
			app_icon: 'https://slack.global.ssl.fastly.net/20655/img/slack_growl_icon.png'
		},
		page_needs_custom_emoji: false
	};

	// web/mobile boot_data
			boot_data.login_data = JSON.parse('{\"ok\":true,\"self\":{\"id\":\"U0291JQSB\",\"name\":\"haddad\",\"prefs\":{\"tz\":\"Asia\\/Kuwait\",\"email_misc\":true,\"seen_welcome_2\":true,\"seen_channels_tip_card\":true,\"newxp_slackbot_step\":\"A2\",\"seen_message_input_tip_card\":true,\"seen_user_menu_tip_card\":true,\"has_uploaded\":true,\"has_created_channel\":true,\"seen_flexpane_tip_card\":true,\"seen_search_input_tip_card\":true,\"highlight_words\":\"\",\"user_colors\":\"\",\"color_names_in_list\":true,\"growls_enabled\":true,\"push_dm_alert\":true,\"push_mention_alert\":true,\"push_everything\":false,\"push_idle_wait\":2,\"push_sound\":\"b2.mp3\",\"push_loud_channels\":\"\",\"push_mention_channels\":\"\",\"push_loud_channels_set\":\"\",\"email_alerts\":\"instant\",\"email_alerts_sleep_until\":0,\"welcome_message_hidden\":false,\"all_channels_loud\":true,\"loud_channels\":\"\",\"never_channels\":\"\",\"loud_channels_set\":\"\",\"show_member_presence\":true,\"search_sort\":\"timestamp\",\"expand_inline_imgs\":true,\"expand_internal_inline_imgs\":true,\"seen_ssb_prompt\":false,\"search_only_my_channels\":false,\"emoji_mode\":\"default\",\"has_invited\":false,\"search_exclude_channels\":\"\",\"messages_theme\":\"default\",\"webapp_spellcheck\":true,\"no_joined_overlays\":false,\"no_created_overlays\":false,\"dropbox_enabled\":false,\"seen_team_menu_tip_card\":false,\"seen_channel_menu_tip_card\":false,\"mute_sounds\":false,\"arrow_history\":false,\"tab_ui_return_selects\":true,\"obey_inline_img_limit\":true,\"new_msg_snd\":\"knock_brush.mp3\",\"collapsible\":false,\"collapsible_by_click\":true,\"require_at\":false,\"mac_ssb_bounce\":\"\",\"mac_ssb_bullet\":true,\"expand_non_media_attachments\":true,\"show_typing\":true,\"pagekeys_handled\":true,\"last_snippet_type\":\"\",\"display_real_names_override\":0,\"time24\":false,\"enter_is_special_in_tbt\":false,\"graphic_emoticons\":false,\"convert_emoticons\":true,\"autoplay_chat_sounds\":true,\"ss_emojis\":true,\"mark_msgs_read_immediately\":false,\"start_scroll_at_oldest\":false,\"snippet_editor_wrap_long_lines\":false,\"ls_disabled\":false},\"created\":1397997906},\"team\":{\"id\":\"T0291JH03\",\"name\":\"AJinfographics\",\"email_domain\":\"aljazeera.net\",\"domain\":\"ajinfographics\",\"msg_edit_window_mins\":-1,\"prefs\":{\"default_channels\":[\"2307629009\",\"2307629011\"],\"msg_edit_window_mins\":-1,\"allow_message_deletion\":true,\"hide_referers\":false,\"display_real_names\":false,\"auth_mode\":\"normal\"},\"over_storage_limit\":false},\"channels\":[{\"id\":\"C02C22D10\",\"name\":\"afghanistan\",\"created\":1403432002,\"creator\":\"U02BVG3KZ\",\"is_archived\":false,\"is_member\":true,\"is_general\":false},{\"id\":\"C02C16AE9\",\"name\":\"bokoharam\",\"created\":1403421727,\"creator\":\"U0291JQSB\",\"is_archived\":false,\"is_member\":true,\"is_general\":false},{\"id\":\"C0291JH09\",\"name\":\"general\",\"created\":1397995076,\"creator\":\"U0291JH05\",\"is_archived\":false,\"is_member\":true,\"is_general\":true},{\"id\":\"C02BWE086\",\"name\":\"git\",\"created\":1403168455,\"creator\":\"U0291JH05\",\"is_archived\":false,\"is_member\":true,\"is_general\":false},{\"id\":\"C0291JH0B\",\"name\":\"random\",\"created\":1397995076,\"creator\":\"U0291JH05\",\"is_archived\":false,\"is_member\":true,\"is_general\":false}],\"groups\":[],\"ims\":[{\"id\":\"D0291JQSD\",\"user\":\"USLACKBOT\",\"created\":1397997906,\"is_user_deleted\":false},{\"id\":\"D0291JQSF\",\"user\":\"U0291JH05\",\"created\":1397997906,\"is_user_deleted\":false},{\"id\":\"D029268B4\",\"user\":\"U029268AW\",\"created\":1397998266,\"is_user_deleted\":false},{\"id\":\"D02BVEYAB\",\"user\":\"U02BVEYA3\",\"created\":1403162189,\"is_user_deleted\":false},{\"id\":\"D02BVG3L9\",\"user\":\"U02BVG3KZ\",\"created\":1403163879,\"is_user_deleted\":false},{\"id\":\"D02BVJG3K\",\"user\":\"U02BVJG39\",\"created\":1403166943,\"is_user_deleted\":false}],\"users\":[{\"id\":\"U02BVJG39\",\"name\":\"aliachughtai\",\"deleted\":false,\"status\":null,\"color\":\"e96699\",\"real_name\":\"Alia Chughtai\",\"skype\":null,\"phone\":null,\"tz\":null,\"tz_label\":\"Pacific Daylight Time\",\"tz_offset\":-25200,\"profile\":{\"first_name\":\"Alia\",\"last_name\":\"Chughtai\",\"real_name\":\"Alia Chughtai\",\"email\":\"alia.chughtai@gmail.com\",\"image_24\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/b78471dc5d6006e6412c5f051b5c1f15.jpg?s=24&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0010-24.png\",\"image_32\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/b78471dc5d6006e6412c5f051b5c1f15.jpg?s=32&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0010-32.png\",\"image_48\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/b78471dc5d6006e6412c5f051b5c1f15.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0010-48.png\",\"image_72\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/b78471dc5d6006e6412c5f051b5c1f15.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0010-72.png\",\"image_192\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/b78471dc5d6006e6412c5f051b5c1f15.jpg?s=192&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0010.png\"},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"U02BVG3KZ\",\"name\":\"flip\",\"deleted\":false,\"status\":null,\"color\":\"674b1b\",\"real_name\":\"Flip Stewart\",\"skype\":null,\"phone\":null,\"tz\":null,\"tz_label\":\"Pacific Daylight Time\",\"tz_offset\":-25200,\"profile\":{\"first_name\":\"Flip\",\"last_name\":\"Stewart\",\"title\":\"Typing monkey\",\"real_name\":\"Flip Stewart\",\"email\":\"flipstewart1985@gmail.com\",\"image_24\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/c5eca31fb9a342a3134d8a122fba7614.jpg?s=24&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0011-24.png\",\"image_32\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/c5eca31fb9a342a3134d8a122fba7614.jpg?s=32&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0011-32.png\",\"image_48\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/c5eca31fb9a342a3134d8a122fba7614.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0011-48.png\",\"image_72\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/c5eca31fb9a342a3134d8a122fba7614.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0011-72.png\",\"image_192\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/c5eca31fb9a342a3134d8a122fba7614.jpg?s=192&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0011.png\"},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"U0291JQSB\",\"name\":\"haddad\",\"deleted\":false,\"status\":null,\"color\":\"4bbe2e\",\"real_name\":\"\",\"skype\":null,\"phone\":null,\"tz\":\"Asia\\/Kuwait\",\"tz_label\":\"Arabia Standard Time\",\"tz_offset\":10800,\"profile\":{\"real_name\":\"\",\"email\":\"mohammed.haddad@aljazeera.net\",\"image_24\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=24&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0019-24.png\",\"image_32\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=32&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F20655%2Fimg%2Favatars%2Fava_0019-32.png\",\"image_48\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F20655%2Fimg%2Favatars%2Fava_0019-48.png\",\"image_72\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0019-72.png\",\"image_192\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/074c98ee52882b39ea5e3be23ac7a8a6.jpg?s=192&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0019.png\"},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"U02BVEYA3\",\"name\":\"konstantinosant\",\"deleted\":false,\"status\":null,\"color\":\"3c989f\",\"real_name\":\"Konstantinos Antonopoulos\",\"skype\":\"konstantinos.ant\",\"phone\":\"00302106393802\",\"tz\":\"Europe\\/Athens\",\"tz_label\":\"Eastern European Summer Time\",\"tz_offset\":10800,\"profile\":{\"first_name\":\"Konstantinos\",\"last_name\":\"Antonopoulos\",\"skype\":\"konstantinos.ant\",\"phone\":\"00302106393802\",\"title\":\"Polar coordinator\",\"real_name\":\"Konstantinos Antonopoulos\",\"email\":\"konstantinosant@outlook.com\",\"image_24\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/8ed3ed902b2b3cf972c5d0736dd53f5c.jpg?s=24&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0014-24.png\",\"image_32\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/8ed3ed902b2b3cf972c5d0736dd53f5c.jpg?s=32&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0014-32.png\",\"image_48\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/8ed3ed902b2b3cf972c5d0736dd53f5c.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0014-48.png\",\"image_72\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/8ed3ed902b2b3cf972c5d0736dd53f5c.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0014-72.png\",\"image_192\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/8ed3ed902b2b3cf972c5d0736dd53f5c.jpg?s=192&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0014.png\"},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"U0291JH05\",\"name\":\"laurian\",\"deleted\":false,\"status\":null,\"color\":\"9f69e7\",\"real_name\":\"Laurian Gridinoc\",\"skype\":\"gridinoc\",\"phone\":\"+97433469104\",\"tz\":\"Asia\\/Kuwait\",\"tz_label\":\"Arabia Standard Time\",\"tz_offset\":10800,\"profile\":{\"first_name\":\"Laurian\",\"last_name\":\"Gridinoc\",\"skype\":\"gridinoc\",\"phone\":\"+97433469104\",\"title\":\"Interactive Producer\",\"real_name\":\"Laurian Gridinoc\",\"email\":\"laurian.gridinoc@aljazeera.net\",\"image_24\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/574cefac39ae4dfab69d9f3f05066c00.jpg?s=24&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013-24.png\",\"image_32\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/574cefac39ae4dfab69d9f3f05066c00.jpg?s=32&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013-32.png\",\"image_48\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/574cefac39ae4dfab69d9f3f05066c00.jpg?s=48&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013-48.png\",\"image_72\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/574cefac39ae4dfab69d9f3f05066c00.jpg?s=72&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013-72.png\",\"image_192\":\"https:\\/\\/secure.gravatar.com\\/avatar\\/574cefac39ae4dfab69d9f3f05066c00.jpg?s=192&d=https%3A%2F%2Fslack.global.ssl.fastly.net%2F8390%2Fimg%2Favatars%2Fava_0013.png\"},\"is_admin\":true,\"is_owner\":true,\"is_primary_owner\":true,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"U029268AW\",\"name\":\"mohsin\",\"deleted\":false,\"status\":null,\"color\":\"e7392d\",\"real_name\":\"Mohsin Ali\",\"skype\":\"mohsin__ali\",\"phone\":\"+97433148420\",\"tz\":\"Asia\\/Kuwait\",\"tz_label\":\"Arabia Standard Time\",\"tz_offset\":10800,\"profile\":{\"image_24\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_24.jpg\",\"image_32\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_32.jpg\",\"image_48\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_48.jpg\",\"image_72\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_72.jpg\",\"image_192\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_192.jpg\",\"image_original\":\"https:\\/\\/s3-us-west-2.amazonaws.com\\/slack-files2\\/avatars\\/2014-06-17\\/2398809226_original.jpg\",\"first_name\":\"Mohsin\",\"last_name\":\"Ali\",\"skype\":\"mohsin__ali\",\"phone\":\"+97433148420\",\"real_name\":\"Mohsin Ali\",\"email\":\"alim@aljazeera.net\"},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false},{\"id\":\"USLACKBOT\",\"name\":\"slackbot\",\"deleted\":false,\"status\":null,\"color\":\"757575\",\"real_name\":\"Slack Bot\",\"skype\":null,\"phone\":null,\"tz\":null,\"tz_label\":\"Pacific Daylight Time\",\"tz_offset\":-25200,\"profile\":{\"first_name\":\"Slack\",\"last_name\":\"Bot\",\"image_24\":\"https:\\/\\/slack-assets2.s3-us-west-2.amazonaws.com\\/10068\\/img\\/slackbot_24.png\",\"image_32\":\"https:\\/\\/slack-assets2.s3-us-west-2.amazonaws.com\\/10068\\/img\\/slackbot_32.png\",\"image_48\":\"https:\\/\\/slack-assets2.s3-us-west-2.amazonaws.com\\/10068\\/img\\/slackbot_48.png\",\"image_72\":\"https:\\/\\/slack-assets2.s3-us-west-2.amazonaws.com\\/10068\\/img\\/slackbot_72.png\",\"image_192\":\"https:\\/\\/slack-assets2.s3-us-west-2.amazonaws.com\\/10068\\/img\\/slackbot_192.png\",\"real_name\":\"Slack Bot\",\"email\":null},\"is_admin\":false,\"is_owner\":false,\"is_primary_owner\":false,\"is_restricted\":false,\"is_ultra_restricted\":false}],\"bots\":[{\"id\":\"B02CP1CPT\",\"name\":\"gdrive\",\"deleted\":false},{\"id\":\"B02BVK7EK\",\"name\":\"github\",\"deleted\":false,\"icons\":{\"image_48\":\"https:\\/\\/slack.global.ssl.fastly.net\\/20653\\/img\\/services\\/github_48.png\"}},{\"id\":\"B02BWEK32\",\"name\":\"slash-commands\",\"deleted\":false}],\"svn_rev\":\"21747\",\"min_svn_rev\":21681}');
	
	// client boot data
		

//-->
</script>	<script type="text/javascript" src="https://www.dropbox.com/static/api/1/dropins.js" id="dropboxjs" data-app-key="rciq3gnem9oirk6"></script>

	
		<!-- output_js "core" -->
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/9949/js/libs_jquery-1.8.2_1379011587.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/10860/js/libs_flash_detect_1381167216.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/15841/js/libs_bootstrap_1392403624.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/21726/js/rollup-core_required_1404333826.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/21545/js/TS.web_1403908796.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/18935/js/TS.search.widget_1398199216.https.gz.js" crossorigin="anonymous"></script>

<!-- output_js "secondary" -->
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/21743/js/rollup-secondary_required_1404347406.https.gz.js" crossorigin="anonymous"></script>

<!-- output_js "regular" -->
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/21435/js/TS.web.comments_1403646046.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/20363/js/TS.web.file_1401390735.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/19048/js/libs_codemirror_1398362281.https.gz.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://slack.global.ssl.fastly.net/19031/js/codemirror_load_1398296153.https.gz.js" crossorigin="anonymous"></script>

	<script type="text/javascript">
	<!--
		boot_data.page_needs_custom_emoji = true;
		
		boot_data.file = JSON.parse('{\"id\":\"F02CT884G\",\"timestamp\":1404388889,\"name\":\"main.js\",\"title\":\"main.js\",\"mimetype\":\"text\\/plain\",\"filetype\":\"javascript\",\"pretty_type\":\"JavaScript\\/JSON\",\"user\":\"U0291JH05\",\"editable\":true,\"size\":11070,\"mode\":\"snippet\",\"is_external\":false,\"external_type\":\"\",\"is_public\":true,\"public_url_shared\":false,\"url\":\"https:\\/\\/slack-files.com\\/files-pub\\/T0291JH03-F02CT884G-4dcbac\\/main.js\",\"url_download\":\"https:\\/\\/slack-files.com\\/files-pub\\/T0291JH03-F02CT884G-4dcbac\\/download\\/main.js\",\"url_private\":\"https:\\/\\/files.slack.com\\/files-pri\\/T0291JH03-F02CT884G\\/main.js\",\"url_private_download\":\"https:\\/\\/files.slack.com\\/files-pri\\/T0291JH03-F02CT884G\\/download\\/main.js\",\"permalink\":\"https:\\/\\/ajinfographics.slack.com\\/files\\/laurian\\/F02CT884G\\/main.js\",\"permalink_public\":\"https:\\/\\/slack-files.com\\/T0291JH03-F02CT884G-4dcbac\",\"edit_link\":\"https:\\/\\/ajinfographics.slack.com\\/files\\/laurian\\/F02CT884G\\/main.js\\/edit\",\"preview\":\"\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\u2026\\n\\/\\/ Settings\\n\\nvar mapSettings = {\\n    center: [8.483238563913513, 4.95483398437\\u2026\\n    zoom: 6,\\n    maxZoom: 8,\\n    dragging: false,\\n    touchZoom: false,\\n    \\/\\/ doubleClickZoom: false,\",\"preview_highlight\":\"<div class=\\\"sssh-code\\\"><div class=\\\"sssh-line\\\"><pre><span class=\\\"sssh-comment\\\">\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre><span class=\\\"sssh-comment\\\">\\/\\/ Settings<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre><span class=\\\"sssh-keyword\\\">var<\\/span> mapSettings <span>=<\\/span> <span>&#123;<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    center<span>:<\\/span> <span>&#91;<\\/span><span class=\\\"sssh-number\\\">8.483238563913513<\\/span><span>,<\\/span> <span class=\\\"sssh-number\\\">4.954833984374999<\\/span><span>&#93;<\\/span><span>,<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    zoom<span>:<\\/span> <span class=\\\"sssh-number\\\">6<\\/span><span>,<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    maxZoom<span>:<\\/span> <span class=\\\"sssh-number\\\">8<\\/span><span>,<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    dragging<span>:<\\/span> <span class=\\\"sssh-keyword\\\">false<\\/span><span>,<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    touchZoom<span>:<\\/span> <span class=\\\"sssh-keyword\\\">false<\\/span><span>,<\\/span><\\/pre><\\/div>\\n<div class=\\\"sssh-line\\\"><pre>    <span class=\\\"sssh-comment\\\">\\/\\/ doubleClickZoom: false,<\\/span><\\/pre><\\/div>\\n<\\/div>\",\"lines\":372,\"lines_more\":362,\"channels\":[\"C02C16AE9\"],\"groups\":[],\"ims\":[],\"comments_count\":0}');
		boot_data.file.comments = JSON.parse('[]');

		

		var g_editor;

		$(function(){

			var wrap_long_lines = !!TS.model.code_wrap_long_lines;

			g_editor = CodeMirror(function(elt){
				var content = document.getElementById("file_contents");
				content.parentNode.replaceChild(elt, content);
			}, {
				value: $('#file_contents').text(),
				lineNumbers: true,
				matchBrackets: true,
				indentUnit: 4,
				indentWithTabs: true,
				enterMode: "keep",
				tabMode: "shift",
				viewportMargin: Infinity,
				readOnly: true,
				lineWrapping: wrap_long_lines
			});

			$('#file_preview_wrap_cb').bind('change', function(e) {
				TS.model.code_wrap_long_lines = $(this).attr('checked') == 'checked';
				g_editor.setOption('lineWrapping', TS.model.code_wrap_long_lines);
			})

			$('#file_preview_wrap_cb').attr('checked', wrap_long_lines);

			CodeMirror.switchSlackMode(g_editor, 'javascript');
		});

		
		$('#file_comment').css('overflow', 'hidden').autogrow();
	//-->
	</script>


	<script type="text/javascript">
		TS.boot(boot_data);
	
					$(document).on('ready', TS.web.setHeaderState);
			$(window).bind('scroll', TS.web.setHeaderState);
			</script>

<!-- slack-www410 / 2014-07-03 05:35:35 / v21747 -->

</body>
</html>