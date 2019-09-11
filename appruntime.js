var appVersion = "0", freeze = !1, ws, loading, perLoad, controller, scene, lastIndex, dom, mvReq, tvReq, imgReq, sources = [], subtitles = [], currentIdx, ignoreIdx, srcIdx, epArr, epi = "-1", epiTitle = "", noDrive = !1, havesend = !1, bckupIdx = "", actEpi, jw, hs, mvid, prov, ar, table, currentKuki, mrload = !1, uSwitch = !1, srvList = !1, totalQuals, qualIdx, totalTry, maxTry, chgRes, nextTry = !1, extType = ["drives_muvi", "drives_lk21", "drives"], noFrameType = ["drives_muvi", "drives_lk21", "drives", "blogspot", "mp4s", "blogger", "facebook"], bannedType = ["lemon", "mcloud"], playTimeInterval, allowSeek = !0, asp = !1, doingTask = !1, subreplace = "akumenang.com", analIntv, btout, banners, bannersLink, banner = "", bannerLink = "", bannerShowed = !1, tsdiv = 5;
function initLocals() {
	localStorage.filter || (localStorage.filter = JSON.stringify({
				type: [],
				sort: "year",
				sub: [],
				genre: [],
				country: [],
				year: []
			})),
	localStorage.failreq || (localStorage.failreq = 0)
}
function appCheck(e) {
	e && $.ajax({
		url: "https://yalestari.github.io/bid/check.json",
		cache: !0,
		timeout: 15e3,
		type: "GET",
		dataType: "JSON",
		error: function () {
			appCheck(e)
		},
		success: function (e) {
			var t = e.version,
			a = e.status,
			i = e.link;
			switch (dom = e.dom, mvReq = e.mvReq, tvReq = e.tvReq, imgReq = e.imgReq, banners = [imgReq + "/images/indoxxi-yt-c.gif", imgReq + "/images/banner-729x90-vidplay3.gif", imgReq + "/images/mn-small.gif", imgReq + "/images/nl-play-1.gif", imgReq + "/images/poker.gif", imgReq + "/images/nl-play-1.gif", imgReq + "/images/mn-small.gif", imgReq + "/images/poker.gif", imgReq + "/images/mn-small.gif", imgReq + "/images/nl-play-1.gif", imgReq + "/images/poker.gif"], bannersLink = ["https://xxiyoutube.com", "https://" + dom + "/tools", "http://masternaga.rocks", "http://nagalaut23.com", "https://pokergolden.biz", "http://nagalaut23.com", "http://masternaga.rocks", "https://pokergolden.biz", "http://masternaga.rocks", "http://nagalaut23.com", "https://pokergolden.biz"], a) {
			case "1":
				if (t > parseInt(appVersion.split(".").join("")))
					if (localStorage.check && 0 != localStorage.check)
						localStorage.check--;
					else {
						var r = e.img1;
						$(".alert_overlay").remove(),
						$.confirm('<div><img src="' + r + '" height="100px" width="auto"/></div> Versi Aplikasi Anda Telah Usang, Update Ke Versi Terbaru?', function (e) {
							e && window.open(i, "_blank")
						}),
						localStorage.check = 10
					}
				break;
			case "2":
				if (t > parseInt(appVersion.split(".").join(""))) {
					r = e.img2;
					$(".alert_overlay").remove(),
					$.alert('<div><img src="' + r + '" height="100px" width="auto"/></div> Aplikasi Telah Diperbarui, Install Aplikasi Versi Terbaru Sebelum Melanjutkan!', function () {
						window.open(i, "_blank")
					}),
					localStorage.removeItem("check")
				}
				break;
			case "3":
				r = e.img3;
				$(".alert_overlay").remove(),
				$.alert('<div><img src="' + r + '" height="100px" width="auto"/></div> Aplikasi Sedang Maintenance, Harap Coba Lagi Nanti.', function () {
					navigator.home.home(function () {
						console.log("Successfully launched home intent")
					}, function () {
						console.log("Error launching home intent")
					})
				}),
				localStorage.removeItem("check")
			}
			if (e.msg && !$(".alert_overlay").length)
				if (localStorage.msg && 0 != localStorage.msg)
					localStorage.msg--;
				else {
					r = e.img4;
					$.alert('<div><img src="' + r + '" height="100px" width="auto"/></div> ' + e.msg, function () {
						localStorage.msg = 10
					})
				}
			/* $("body").prepend('<iframe id="analytic-frame" src="https://similikitiwelehweleh.com" style="display:none"></iframe>') */
		}
	})
}
function exitHandler(e) {
	isFullScreen() ? (screen.orientation.lock("landscape"), setTimeout(function () {
			$("video").attr("style", "height:auto !important;max-height:99% !important;"),
			$("#vid").attr("style", "width:100%;height: " + $("video").height() + "px !important;top:50%;-webkit-transform:translateY(-50%);"),
			$("#vid-container").attr("style", "height:" + $("video").height() + "px;")
		}, 500)) : (screen.orientation.unlock(), setTimeout(function () {
			$("video, #vid, #vid-container").removeAttr("style"),
			$("#vid-container").height($("#vid").height())
		}, 500))
}
function isFullScreen() {
	return 1 == (document.fullscreenElement && null !== document.fullscreenElement || document.webkitFullscreenElement && null !== document.webkitFullscreenElement || document.mozFullScreenElement && null !== document.mozFullScreenElement || document.msFullscreenElement && null !== document.msFullscreenElement)
}
function createPage(e, t) {
	loadContainer(1),
	$.get(e + ".html?q=" + (new Date).getTime(), function (a) {
		switch ($("#cdv-logo").length && $("#cdv-logo").remove(), $("body").append('<div class="page" data-page="' + e + '"><div class="page-overlay"></div>' + a + "</div>"), e) {
		case "home":
			$(".category").each(function () {
				$(this).click(function () {
					createPage("movies", {
						category: $(this).text().trim().toLowerCase()
					})
				})
			}),
			$.ajax({
				url: "https://mob.akubebas.com/api/featured.php",
				cache: !1,
				timeout: 15e3,
				type: "GET",
				dataType: "JSON",
				data: {
					key: uniqid().substring(-8, 10)
				},
				error: function (e) {
					$("#home-page-list").html('<div id="featured-refresh-btn" style="padding: 8px;text-align: center;border: 1px solid #E7D064;background: #3f3f3f;display:inline-block;margin:auto%;transform: translateX(5%);-webkit-transform: translate(5%);border-radius: 5px;" onclick="getRecommends();"><i class="fa fa-refresh"></i> Muat Ulang</div>'),
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0)
					}, 200)
				},
				success: function (e) {
					var t,
					a,
					i;
					$("#home-page-list").text("");
					for (var r = 0; r < e.length; r++) {
						if (t = "", a = "", i = "", "0" != e[r].suben_count && (t += '<img src="https://img.akubebas.com/images/US.png"/>'), "0" != e[r].subid_count && (t += '<img src="https://img.akubebas.com/images/ID.png"/>'), "1" == e[r].type || "44" == e[r].type || "54" == e[r].type)
							switch (e[r].quality.toLowerCase()) {
							case "trailer":
								i = ' style="background:rgba(117,0,214,.8);"';
								break;
							case "cam":
								i = ' style="background:rgba(255,8,8,.8);"';
								break;
							case "sd":
								i = ' style="background:rgba(255, 57, 148, 0.8);"';
								break;
							case "hd":
								"3" == e[r].blu ? (e[r].quality = "4K", i = ' style="background: linear-gradient(#b07b01, #ffec83, #b07b01)!important;color: #191919 !important;font-weight: 800 !important;"') : (i = 0 == e[r].hd_level ? ' style="background:rgba(255, 146, 24, .8);"' : 1 == e[r].hd_level ? ' style="background:rgba(11,171,0,.8);"' : ' style="background:rgba(4,149,212,.8);"', "1" == e[r].blu && (e[r].quality = "FHD", 2 == e[r].hd_level && (e[r].quality = "BLU")))
							}
						else
							a = "movie-eps", e[r].quality = "Eps<br/>" + e[r].Episodes;
						$("#home-page-list").append('<div class="movie lazy" data-src="' + e[r].poster + '" style="background-position: center center;background-repeat: no-repeat;background-size:cover;" data-url="' + e[r].url + '" data-type="' + e[r].type + '"><div class="movie-info"><div class="movie-ratdur"><i class="fa fa-star"></i> ' + e[r].imdb_rating + ' &nbsp;<i class="fa fa-clock-o"></i> ' + e[r].duration + 'm</div><div class="movie-quality ' + a + '"' + i + ">" + e[r].quality + '</div><div class="movie-sub">' + t + '</div><div class="movie-title">' + e[r].title + " (" + e[r].year + ")</div></div></div>")
					}
					$("#home-page-list").append('<div style="clear:both;"></div>'),
					$(".movie-title").css("background", "url('" + imgReq + "/images/mask-title.png') center top repeat-x"),
					$("#home-page-list .movie").click(function () {
						createPage("play", {
							url: $(this).attr("data-url"),
							type: $(this).attr("data-type")
						})
					}),
					$("#search-mv").attr("maxlength", "25"),
					$("#search-mv").keyup(function (e) {
						var t = $(this).val().trim();
						13 == e.which ? ($("#search-mv").blur(), createPage("movies", {
								search: t
							})) : t.length > 25 && (t = t.substr(0, t.length - 1), $("#search-mv").blur().val(t).focus())
					}),
					$("#search-mv-btn").click(function () {
						var e = $("#search-mv").val().trim();
						$("#search-mv").blur(),
						createPage("movies", {
							search: e
						})
					}),
					$("#filter-mv-btn").click(function () {
						createPage("filter", {
							dt: localStorage.filter
						})
					}),
					$(".appversion").text("Versi " + appVersion),
					lazy(),
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0)
					}, 200)
				}
			});
			break;
		case "play":
			var i = "movie";
			"2" != t.type && "45" != t.type && "55" != t.type || (i = "seri"),
			$("#player").attr("data-type", i),
			$("#player").attr("data-ref", t.url),
			$.ajax({
				url: "https://mob.akubebas.com/api/mvdata.php",
				cache: !1,
				timeout: 15e3,
				type: "GET",
				dataType: "JSON",
				data: {
					slug: t.url,
					type: i,
					key: uniqid().substring(-8, 10)
				},
				error: function (e) {
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0),
						removePage()
					}, 200),
					"timeout" == e.statusText ? $.alert("Pengambilan Data Terlalu Lama, Harap Coba Lagi!") : localStorage.failreq < 10 ? ($.alert("Terjadi Kesalahan, Harap Coba Lagi!"), localStorage.failreq++) : ($.alert("Server Sedang Tidak Stabil, Harap Bersabar dan Coba Lagi Nanti!"), localStorage.failreq = 0)
				},
				success: function (e) {
					sendTo.eventReceiver("open");
					allowSeek = !0,
					noDrive = !1;
					var a = e.plot_tmdb;
					a || (a = e.plot_imdb),
					$("#vid").css({
						background: "url('" + e.backdrop + "') center center no-repeat",
						"background-size": "cover"
					}),
					$("#player").attr("data-tmdb", e.tmdb),
					$("#player-title").text(e.title),
					$("#player-year").text(e.year),
					"HD" == e.quality && ("1" == e.blu ? (e.quality = "FULL HD", 2 == e.hd_level && (e.quality = "Blu-ray")) : "3" == e.blu ? e.quality = "4K HD" : 2 == e.hd_level && (e.quality += " (High)"), 0 == e.hd_level && (e.quality += " (Low)")),
					$("#player-data").html('<i class="fa fa-star"></i> ' + e.imdb_rating + ' | <i class="fa fa-clock-o"></i> ' + e.duration + " Menit | " + e.quality + " | " + e.country),
					$("#player-genre").text(e.genre),
					$("#player-director").text(e.director),
					$("#player-actor").text(e.actor),
					$("#player-desc").append(a),
					"movie" == i ? $("#vid-play-icon").click(function () {
						if (playLoad(), "trailer" == e.quality.toLowerCase())
							if (e.trailerq) {
								var a = "";
								if (e.trailerq.indexOf("youtube.com") > -1 ? a = e.trailerq.split("v=")[1] : e.trailerq.indexOf("youtu.be") > -1 ? a = e.trailerq.split("/")[3] : -1 == e.trailerq.indexOf("http") && (a = e.trailerq), a) {
									var i = '<iframe id="myvid" width="100%" height="100%" src="https://www.youtube.com/embed/' + a + '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
									$("#vid-container").html(i)
								} else
									cantPlay()
							} else
								cantPlay();
						else {
							var r = setTimeout(function () {
									$.alert("Pengambilan Data Terlalu Lama, Harap Coba Lagi!", function () {
										r = "",
										removePage()
									})
								}, 3e4),
							o = getChkSum(e.tmdb),
							n = mvReq + "/?token=" + e.token + "&k=" + o + "&v=" + appVersion;
							actEpi = 0,
							cordovaHTTP.setHeader("referer", "https://mob.akubebas.com/movie/" + t.url + "/play"),
							cordovaHTTP.acceptAllCerts(!0, function () {
								cordovaHTTP.get(n, {}, {}, function (e) {
									if (r) {
										clearTimeout(r);
										var t = e.data;
										"[dmca]" == t && (t = "[null]"),
										-1 == t.indexOf('[{"sources') && -1 == t.indexOf("[null]") && -1 == t.lastIndexOf("[]") && (t = rc4("mob.akubebas.com", t)),
										t.indexOf("adm") > -1 && (t = t.indexOf("[null]") > -1 || t.lastIndexOf("[]") == t.length - 2 ? "[null]" : '[{"sources' + (t = (t = (t = t.split("(adm)"))[t.length - 1].trim()).split('[{"sources'))[t.length - 1].trim()),
										beginPlay(JSON.parse(t))
									}
								})
							})
						}
					}) : $("#vid-play-icon").click(function () {
						getEpList(e.epis);
					}),
					/* $(".prop-link").length || $(".bottom-menu,#vid-play-icon").wrap("<a class='prop-link' href='http://similikitiweleh.com' target='_blank' style='color:inherit;'></a>"), */
					$(".bottom-menu").css("border-right", "1px solid #555"),
					$(".bottom-menu-content a:last-child div").css("border-right", "0"),
					$("#bottom-menu-eps").click(function () {
						getEpList(e.epis)
					}),
					epArr = e.epis;
					var r = 0;
					if ($("#player").off("scroll").on("scroll", function () {
							var e = $(this).scrollTop();
							e > r ? $(".bottom-menu-content").fadeOut(100) : $(".bottom-menu-content").fadeIn(100),
							r = e
						}), e.rel.length > 0) {
						for (var o, n, s, l = 0; l < e.rel.length; l++) {
							if (s = "", o = "", n = "", "0" != e.rel[l].suben_count && (s += '<img src="https://img.akubebas.com/images/US.png"/>'), "0" != e.rel[l].subid_count && (s += '<img src="https://img.akubebas.com/images/ID.png"/>'), "1" == e.rel[l].type || "44" == e.rel[l].type || "54" == e.rel[l].type)
								switch (e.rel[l].quality.toLowerCase()) {
								case "trailer":
									n = ' style="background:rgba(117,0,214,.8);"';
									break;
								case "hdcam":
									e.rel[l].quality = "CAM",
									n = ' style="background:rgba(0, 155, 171, 0.68);"';
									break;
								case "cam":
									n = ' style="background:rgba(255,8,8,.8);"';
									break;
								case "sd":
									n = ' style="background:rgba(255, 57, 148, 0.8);"';
									break;
								case "hd":
									"3" == e.rel[l].blu ? (e.rel[l].quality = "4K", n = ' style="background: linear-gradient(#b07b01, #ffec83, #b07b01)!important;color: #191919 !important;font-weight: 800 !important;"') : (n = 0 == e.rel[l].hd_level ? ' style="background:rgba(255, 146, 24, .8);"' : 1 == e.rel[l].hd_level ? ' style="background:rgba(11,171,0,.8);"' : ' style="background:rgba(4,149,212,.8);"', "1" == e.rel[l].blu && (e.rel[l].quality = "FHD", 2 == e.rel[l].hd_level && (e.rel[l].quality = "BLU")))
								}
							else
								o = "movie-eps", e.rel[l].quality = "Eps<br/>" + e.rel[l].Episodes;
							$("#player-rel-list").append('<div class="movie rel-movie lazy" data-src="' + e.rel[l].poster + '" style="background-position:center center;background-repeat:no-repeat;background-size:cover;" data-url="' + e.rel[l].url + '" data-type="' + e.rel[l].type + '"><div class="movie-info"><div class="movie-ratdur"><i class="fa fa-star"></i> ' + e.rel[l].imdb_rating + ' &nbsp;<i class="fa fa-clock-o"></i> ' + e.rel[l].duration + 'm</div><div class="movie-quality ' + o + '"' + n + ">" + e.rel[l].quality + '</div><div class="movie-sub">' + s + '</div><div class="movie-title" style="white-space:normal;">' + e.rel[l].title + " (" + e.rel[l].year + ")</div></div></div>")
						}
						$(".movie-title").css("background", "url('" + imgReq + "/images/mask-title.png') center top repeat-x"),
						$("#player-rel-list .rel-movie").click(function () {
							removePage();
							var e = {
								url: $(this).attr("data-url"),
								type: $(this).attr("data-type")
							};
							setTimeout(function () {
								createPage("play", e)
							}, 300)
						}),
						$("#player-rel-content").show(),
						lazy()
					}
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0)
					}, 200),
					analIntv && clearInterval(analIntv),
					analIntv = setInterval(function () {
							jw && "playing" == jw.getState() && document.getElementById("analytic-frame").contentWindow.postMessage({
								msg: "analytic",
								name: "apk-watching",
								category: i.ucwords(),
								label: e.title
							}, "*")
						}, 3e5)
				}
			});
			break;
		case "movies":
			var r = t.search ? t.search : "",
			o = t.category ? t.category : "",
			n = t.filter ? t.filter : "";
			t.xcountry && t.xcountry;
			$.ajax({
				url: "https://mob.akubebas.com/api/movies.php",
				cache: !1,
				timeout: 15e3,
				type: "GET",
				dataType: "JSON",
				data: {
					search: r,
					category: o,
					filter: n,
					xcountry: t.xcountry,
					limit: 0,
					key: uniqid().substring(-5, 10)
				},
				error: function (e) {
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0),
						removePage()
					}, 200),
					"timeout" == e.statusText ? $.alert("Pengambilan Data Terlalu Lama, Harap Coba Lagi!") : localStorage.failreq < 10 ? ($.alert("Terjadi Kesalahan, Harap Coba Lagi!"), localStorage.failreq++) : ($.alert("Server Sedang Tidak Stabil, Harap Bersabar dan Coba Lagi Nanti!"), localStorage.failreq = 0)
				},
				success: function (e) {
					sendTo.eventReceiver("open");
					if (o)
						$("#movies-title").html("<b>Category:</b> " + t.category.ucwords());
					else if (n) {
						var a = "";
						a += (n = JSON.parse(n)).type.join(", ").replace("1", "Movie").replace("2", "Serial TV"),
						n.genre.length > 0 && (a += " | "),
						a += n.genre.join(", ").ucwords(),
						n.country.length > 0 && (a += " | "),
						a += n.country.join(", ").ucwords(),
						n.year.length > 0 && (a += " | "),
						a += n.year.join(", ").ucwords(),
						n.sub.length > 0 && (a += " | "),
						a += n.sub.join(",").replace("sub_id", "Sub Indo").replace("sub_en", "Sub Inggris"),
						$("#movies-title").html("<b>Hasil Pencarian:</b> " + a)
					} else
						$("#movies-title").html("<b>Hasil Pencarian:</b> " + t.search), "xsemi" == t.search.toLowerCase() && ($('<div style="padding-top:15px;"><select id="xsemi-country" style="padding:10px;width:90%;background:#505050;border:0;border-radius:5px;color:#f8f8f8;box-shadow:0 0 3px #f8f8f8;"><option value="">- Pilih Negara -</option><option value="usa">Barat</option><option value="korea">Korea</option><option value="japan">Jepang</option><option value="thailand">Thailand</option><option value="hong kong">Hongkong</option></select></div>').insertAfter("#movies-title"), $("#xsemi-country").val(t.xcountry), setTimeout(function () {
								$("#xsemi-country").change(function () {
									var e = $(this).val();
									removePage(),
									setTimeout(function () {
										createPage("movies", {
											search: t.search,
											category: t.category,
											xcountry: e
										})
									}, 300)
								})
							}, 500));
					if (e.length > 0) {
						for (var i, r, s, l = 0; l < e.length; l++) {
							if (i = "", r = "", s = "", "0" != e[l].suben_count && (i += '<img src="https://img.akubebas.com/images/US.png"/>'), "0" != e[l].subid_count && (i += '<img src="https://img.akubebas.com/images/ID.png"/>'), "1" == e[l].type || "44" == e[l].type || "54" == e[l].type)
								switch (e[l].quality.toLowerCase()) {
								case "trailer":
									s = ' style="background:rgba(117,0,214,.8);"';
									break;
								case "hdcam":
									e[l].quality = "CAM",
									s = ' style="background:rgba(0, 155, 171, 0.68);"';
									break;
								case "cam":
									s = ' style="background:rgba(255,8,8,.8);"';
									break;
								case "sd":
									s = ' style="background:rgba(255, 57, 148, 0.8);"';
									break;
								case "hd":
									"3" == e[l].blu ? (e[l].quality = "4K", s = ' style="background: linear-gradient(#b07b01, #ffec83, #b07b01)!important;color: #191919 !important;font-weight: 800 !important;"') : (s = 0 == e[l].hd_level ? ' style="background:rgba(255, 146, 24, .8);"' : 1 == e[l].hd_level ? ' style="background:rgba(11,171,0,.8);"' : ' style="background:rgba(4,149,212,.8);"', "1" == e[l].blu && (e[l].quality = "FHD", 2 == e[l].hd_level && (e[l].quality = "BLU")))
								}
							else
								r = "movie-eps", e[l].quality = "Eps<br/>" + e[l].Episodes;
							$("#movies-page-list").append('<div class="movie lazy" data-src="' + e[l].poster + '" style="background-position:center center;background-repeat:no-repeat;background-size:cover;" data-url="' + e[l].url + '" data-type="' + e[l].type + '"><div class="movie-info"><div class="movie-ratdur"><i class="fa fa-star"></i> ' + e[l].imdb_rating + ' &nbsp;<i class="fa fa-clock-o"></i> ' + e[l].duration + 'm</div><div class="movie-quality ' + r + '"' + s + ">" + e[l].quality + '</div><div class="movie-sub">' + i + '</div><div class="movie-title">' + e[l].title + " (" + e[l].year + ")</div></div></div>")
						}
						$("#movies-page-list").append('<div id="movies-cfix" style="clear:both;"></div>'),
						$(".movie-title").css("background", "url('" + imgReq + "/images/mask-title.png') center top repeat-x"),
						$("#movies-page-list .movie").click(function () {
							createPage("play", {
								url: $(this).attr("data-url"),
								type: $(this).attr("data-type")
							})
						}),
						24 == $("#movies-page-list .movie").length && ($("#movies-loader").show(), loading = !1, perLoad = 24, controller || setTimeout(function () {
								controller = new ScrollMagic.Controller,
								scene = new ScrollMagic.Scene({
										triggerElement: "#movies-loader",
										triggerHook: "onEnter"
									}).addTo(controller).on("enter", function (e) {
										(lastIndex = $("#movies-page-list .movie").length) < perLoad ? $("#movies-loader").hide() : loading || (loading = !0, getMoreMovies(t))
									})
							}, 300)),
						lazy()
					} else
						$(".movies-container .movies").append('<div style="padding:10px;text-align:center;">Tidak Ada Hasil.</div>');
					$(".page-overlay").fadeOut(200),
					setTimeout(function () {
						$(".page-overlay").remove(),
						loadContainer(0)
					}, 200)
				}
			});
			break;
		case "filter":
			n = JSON.parse(localStorage.filter);
			$(".filter-input").each(function () {
				var e = $(this);
				if ("Tahun / Dekade" == e.find("h4").text())
					for (var t = (new Date).getFullYear(), a = 2019; a <= t; a++)
						$('<div class="filter"><input type="checkbox" value="' + a + '" class="filter-year"/> ' + a + "</div>").insertAfter(e.find("h4"))
			}),
			$(".filter input").each(function () {
				var e = $(this).val();
				(n.type.indexOf(e) > -1 || n.genre.indexOf(e) > -1 || n.country.indexOf(e) > -1 || n.year.indexOf(e) > -1 || n.sub.indexOf(e) > -1 || n.sort == e) && ($(this).prop("checked", !0), $(this).parent().addClass("active"))
			}),
			$(".filter").click(function () {
				var e = $(this).find("input");
				e.is(":checked") && "checkbox" == e.attr("type") ? ($(this).removeClass("active"), e.prop("checked", !1)) : ("radio" == e.attr("type") && $(".filter-input:last-child .filter").removeClass("active"), $(this).addClass("active"), e.prop("checked", !0))
			}),
			$("#filter-submit").click(function () {
				n.type = [],
				$(".filter-type:checked").each(function () {
					n.type.push($(this).val())
				}),
				n.genre = [],
				$(".filter-genre:checked").each(function () {
					n.genre.push($(this).val())
				}),
				n.country = [],
				$(".filter-country:checked").each(function () {
					n.country.push($(this).val())
				}),
				n.year = [],
				$(".filter-year:checked").each(function () {
					n.year.push($(this).val())
				}),
				n.sub = [],
				$(".filter-sub:checked").each(function () {
					n.sub.push($(this).val())
				}),
				n.sort = $(".filter-sort:checked").val(),
				localStorage.filter = JSON.stringify(n),
				createPage("movies", {
					filter: localStorage.filter
				})
			}),
			$(".page-overlay").fadeOut(200),
			setTimeout(function () {
				$(".page-overlay").remove(),
				loadContainer(0)
			}, 200)
		}
	})
}
function getEpList(e) {
	var t,
	a,
	i,
	r,
	o,
	n = $("#player").attr("data-ref");
	$(".eplist").remove();
	for (var s = "", l = 0; l < e.length; l++)
		t = "", a = e[l].title.replace(/\\/g, ""), i = e[l].prov, r = e[l].eps, o = e[l].nno, epi == l && (t = "active"), s += '<div class="ep ' + t + '" data-child="' + l + '" data-prov="' + i + '" data-eps="' + r + '" data-nno="' + o + '">' + a + "</div>";
	$("#player").prepend('<div class="eplist"><div style="padding:15px;padding-bottom:5px;font-weight:bold;text-shadow:0 0 3px #9f9f9f;">Pilih Episode</div><div class="divider"></div>' + s + "</div>"),
	$(".ep").unbind().click(function (e) {
		allowSeek = !0,
		uSwitch = !1,
		mrload = !1,
		srvList = !1,
		nextTry = !1,
		havesend = !1,
		bannerShowed = !1,
		$("#myvid, #infosv").remove(),
		$("#server-list-title,#server-list-content").fadeOut(),
		epi = $(this).attr("data-child"),
		epiTitle = $(this).text();
		var t = $(this).attr("data-prov"),
		a = $(this).attr("data-eps"),
		i = $(this).attr("data-nno");
		playLoad();
		var r = getChkSum($("#player").attr("data-tmdb")),
		o = tvReq + "/?sv=" + t + "&ep=" + a + "&no=" + i + "&k=" + r + "&v=" + appVersion;
		actEpi = a,
		cordovaHTTP.setHeader("referer", "https://mob.akubebas.com/film-seri/" + n + "/play"),
		cordovaHTTP.acceptAllCerts(!0, function () {
			cordovaHTTP.get(o, {}, {}, function (e) {
				var t = e.data;
				"[dmca]" == t && (t = "[null]"),
				-1 == t.indexOf('[{"sources') && -1 == t.indexOf("[null]") && -1 == t.lastIndexOf("[]") && (t = rc4("mob.akubebas.com", t)),
				t.indexOf("adm") > -1 && (t = t.indexOf("[null]") > -1 || t.lastIndexOf("[]") == t.length - 2 ? "[null]" : '[{"sources' + (t = (t = (t = t.split("(adm)"))[t.length - 1].trim()).split('[{"sources'))[t.length - 1].trim()),
				beginPlay(JSON.parse(t))
			})
		})
	}),
	setTimeout(function () {
		$("#player-container").on("click", function () {
			$("#player-container").off("click"),
			$(".eplist").remove()
		})
	}, 500)
}
function getRecommends() {
	$("#featured-refresh-btn").css({
		background: "transparent",
		border: "0"
	}).removeAttr("onclick").text("Mengambil.."),
	$.ajax({
		url: "https://mob.akubebas.com/api/featured.php",
		cache: !1,
		timeout: 15e3,
		type: "GET",
		dataType: "JSON",
		data: {
			key: uniqid().substring(-8, 10)
		},
		error: function () {
			$("#home-page-list").html('<div id="featured-refresh-btn" style="padding: 8px;text-align: center;border: 1px solid #E7D064;background: #3f3f3f;display:inline-block;margin:auto%;transform: translateX(5%);-webkit-transform: translate(5%);border-radius: 5px;" onclick="getRecommends();"><i class="fa fa-refresh"></i> Muat Ulang</div>'),
			localStorage.failreq < 10 ? localStorage.failreq++ : ($.alert("Server Sedang Tidak Stabil, Harap Bersabar dan Coba Lagi Nanti!"), localStorage.failreq = 0)
		},
		success: function (e) {
			var t,
			a,
			i;
			$("#home-page-list").text("");
			for (var r = 0; r < e.length; r++) {
				if (t = "", a = "", i = "", "0" != e[r].suben_count && (t += '<img src="https://img.akubebas.com/images/US.png"/>'), "0" != e[r].subid_count && (t += '<img src="https://img.akubebas.com/images/ID.png"/>'), "1" == e[r].type || "44" == e[r].type || "54" == e[r].type)
					switch (e[r].quality.toLowerCase()) {
					case "trailer":
						i = ' style="background:rgba(117,0,214,.8);"';
						break;
					case "hdcam":
						e[r].quality = "CAM",
						i = ' style="background:rgba(0, 155, 171, 0.68);"';
						break;
					case "cam":
						i = ' style="background:rgba(255,8,8,.8);"';
						break;
					case "sd":
						i = ' style="background:rgba(255, 57, 148, 0.8);"';
						break;
					case "hd":
						"3" == e[r].blu ? (e[r].quality = "4K", i = ' style="background: linear-gradient(#b07b01, #ffec83, #b07b01)!important;color: #191919 !important;font-weight: 800 !important;"') : (i = 0 == e[r].hd_level ? ' style="background:rgba(255, 146, 24, .8);"' : 1 == e[r].hd_level ? ' style="background:rgba(11,171,0,.8);"' : ' style="background:rgba(4,149,212,.8);"', "1" == e[r].blu && (e[r].quality = "FHD", 2 == e[r].hd_level && (e[r].quality = "BLU")))
					}
				else
					a = "movie-eps", e[r].quality = "Eps<br/>" + e[r].Episodes;
				$("#home-page-list").append('<div class="movie lazy" data-src="' + e[r].poster + '" style="background-position:center center;background-repeat:no-repeat;background-size:cover;" data-url="' + e[r].url + '" data-type="' + e[r].type + '"><div class="movie-info"><div class="movie-ratdur"><i class="fa fa-star"></i> ' + e[r].imdb_rating + ' &nbsp;<i class="fa fa-clock-o"></i> ' + e[r].duration + 'm</div><div class="movie-quality ' + a + '"' + i + ">" + e[r].quality + '</div><div class="movie-sub">' + t + '</div><div class="movie-title">' + e[r].title + " (" + e[r].year + ")</div></div></div>")
			}
			$("#home-page-list").append('<div style="clear:both;"></div>'),
			$(".movie-title").css("background", "url('" + imgReq + "/images/mask-title.png') center top repeat-x"),
			$("#home-page-list .movie").click(function () {
				createPage("play", {
					url: $(this).attr("data-url"),
					type: $(this).attr("data-type")
				})
			}),
			lazy()
		}
	})
}
function getMoreMovies(e) {
	$.ajax({
		url: "https://mob.akubebas.com/api/movies.php",
		cache: !1,
		timeout: 15e3,
		type: "GET",
		dataType: "JSON",
		data: {
			search: e.search,
			category: e.category,
			filter: e.filter,
			xcountry: e.xcountry,
			limit: lastIndex,
			key: uniqid().substring(-5, 10)
		},
		error: function () {
			getMoreMovies(e)
		},
		success: function (e) {
			if (e.length > 0) {
				var t,
				a,
				i;
				$("#movies-cfix").remove();
				for (var r = 0; r < e.length; r++) {
					if (t = "", a = "", i = "", "0" != e[r].suben_count && (t += '<img src="https://img.akubebas.com/images/US.png"/>'), "0" != e[r].subid_count && (t += '<img src="https://img.akubebas.com/images/ID.png"/>'), "1" == e[r].type || "44" == e[r].type || "54" == e[r].type)
						switch (e[r].quality.toLowerCase()) {
						case "trailer":
							i = ' style="background:rgba(117,0,214,.8);"';
							break;
						case "cam":
							i = ' style="background:rgba(255,8,8,.8);"';
							break;
						case "sd":
							i = ' style="background:rgba(255, 57, 148, 0.8);"';
							break;
						case "hd":
							"3" == e[r].blu ? (e[r].quality = "4K", i = ' style="background: linear-gradient(#b07b01, #ffec83, #b07b01)!important;color: #191919 !important;font-weight: 800 !important;"') : (i = 0 == e[r].hd_level ? ' style="background:rgba(255, 146, 24, .8);"' : 1 == e[r].hd_level ? ' style="background:rgba(11,171,0,.8);"' : ' style="background:rgba(4,149,212,.8);"', "1" == e[r].blu && (e[r].quality = "FHD", 2 == e[r].hd_level && (e[r].quality = "BLU")))
						}
					else
						a = "movie-eps", e[r].quality = "Eps<br/>" + e[r].Episodes;
					$("#movies-page-list").append('<div class="movie lazy" data-src="' + e[r].poster + '" style="background-position:center center;background-repeat:no-repeat;background-size:cover;" data-url="' + e[r].url + '" data-type="' + e[r].type + '"><div class="movie-info"><div class="movie-ratdur"><i class="fa fa-star"></i> ' + e[r].imdb_rating + ' &nbsp;<i class="fa fa-clock-o"></i> ' + e[r].duration + 'm</div><div class="movie-quality ' + a + '"' + i + ">" + e[r].quality + '</div><div class="movie-sub">' + t + '</div><div class="movie-title">' + e[r].title + " (" + e[r].year + ")</div></div></div>")
				}
				$("#movies-page-list").append('<div id="movies-cfix" style="clear:both;"></div>'),
				$(".movie-title").css("background", "url('" + imgReq + "/images/mask-title.png') center top repeat-x"),
				$("#movies-page-list .movie").unbind().click(function () {
					createPage("play", {
						url: $(this).attr("data-url"),
						type: $(this).attr("data-type")
					})
				}),
				lazy()
			} else
				$("#movies-loader").hide(), controller.destroy(!0), controller = null, scene = null;
			loading = !1
		}
	})
}
function beginPlay(e) {
	var t,
	a = !1,
	i = e.length;
	i > 0 && !e[0] ? cantPlay() : setTimeout(function () {
		if (srcIdx = [], sources = [], i > 1 && e[i - 1] && !e[i - 1].meta)
			subtitles = e[i - 1], i--;
		else if (!havesend) {
			havesend = !0;
			var r = "movie" == $("#player").attr("data-type") ? "https://sub.akubebas.com/req/mv/?epNo=0" : "https://sub.akubebas.com/req/tv/?epNo=" + actEpi;
			cordovaHTTP.acceptAllCerts(!0, function () {
				cordovaHTTP.get(r, {}, {}, function (e) {
					var t = e.data;
					t && t.indexOf('[{"file"') > -1 && (t = '[{"file"' + (t = t.split('[{"file"'))[t.length - 1]).length > 5 && -1 == t.indexOf("(adm)") && t.indexOf('[{"file"') > -1 && (subtitles = JSON.parse(t))
				})
			})
		}
		e[i - 1] || i--,
		setTimeout(function () {
			for (var r = 0; r < i; r++)
				if (!(e[r].sources[0].file.indexOf(".akubebas.") > -1)) {
					if (e[r].meta.backup2)
						for (var o = 0; o < e[r].meta.backup2.length; o++)
							e[r].meta.backup2[o].file = {
								file: "https://www.googleapis.com/drive/v3/files/" + e[r].meta.backup2[o].driveid + "?alt=media&key=AIzaSyBXV3qGJ2rwDaxvUmAzaVpZMmn1t6PyU0E",
								type: "mp4"
							};
					sources.push(e[r]),
					"lemon" == e[r].meta.type && $("#player").attr("data-lemon", "1"),
					a || (e[r].meta.type.indexOf("drives") > -1 || noDrive) && -1 == bannedType.indexOf(e[r].meta.type) && (srcIdx.push(r), currentIdx = r, e[r].meta.kuki && "gapake" != e[r].meta.kuki ? (t || (t = e[r]), setCookie(e[r].meta.kuki), setTimeout(function () {
								startPlay(t),
								t = ""
							}, 300)) : startPlay(e[r]), a = !0)
				}
			a || (noDrive ? cantPlay() : (noDrive = !0, beginPlay(e)))
		}, 300)
	}, 300)
}
document.addEventListener("backbutton", function () {
	freeze || removePage()
}, !1), document.addEventListener("deviceready", function () {
	var e = (new Date).getTime();
	wsConnect(e %= 2),
	window.plugins.insomnia.keepAwake(),
	cordova.getAppVersion.getVersionNumber().then(function (e) {
		appVersion = e,
		$(".appversion").text("Versi " + appVersion),
		appCheck(appVersion)
	}),
	initLocals(),
	createPage("home"),
	document.addEventListener("resume", function () {
		var e = (new Date).getTime();
		wsConnect(e %= 2),
		appCheck(appVersion),
		1 == $(".page").length && getRecommends()
	}, !1)
}, !1), document.addEventListener("webkitfullscreenchange", exitHandler, !1), document.addEventListener("mozfullscreenchange", exitHandler, !1), document.addEventListener("fullscreenchange", exitHandler, !1), document.addEventListener("MSFullscreenChange", exitHandler, !1);
var defRatio = 0;
function startPlay(e) {
	if ("iframe" == e.meta.type) {
		var t = '<iframe id="myvid" width="100%" height="100%" src="https://www.youtube.com/embed/' + e.sources[0].file.split("v=")[1] + '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
		return $("#vid-container").height("50vh").html(t),
		$(".bottom-menu-logo").hide(),
		void $("#bottom-menu-eps").css("width", "100%").show()
	}
	hs = e.meta.hardsub,
	mvid = e.meta.id,
	prov = e.meta.prov,
	0 == defRatio && 0 != e.meta.ratio && (defRatio = e.meta.ratio),
	0 == defRatio && (defRatio = 1.78),
	ar = "0" == e.meta.ratio ? defRatio : e.meta.ratio,
	table = e.meta.type,
	currentKuki = e.meta.kuki && "gapake" != e.meta.kuki ? e.meta.kuki : "";
	var a,
	i = ar + ":1";
	subtitles.length > 0 && "0" == hs && (a = subtitles);
	for (var r = 0; r < e.sources.length; r++)
		e.sources[r].label && ("hd" == e.sources[r].label.toLowerCase() ? e.sources[r].label = "720p" : "sd" == e.sources[r].label.toLowerCase() && (e.sources[r].label = "360p"));
	if (-1 != noFrameType.indexOf(table) || mrload || -1 != e.sources[0].file.toLowerCase().indexOf(".mp4")) {
		var o = e.sources;
		e.meta.kuki && "gapake" != e.meta.kuki || (e.meta.backup ? o = e.meta.backup : e.meta.backup2 && e.meta.backup2.length > 0 && (bckupIdx = Math.floor(Math.random() * e.meta.backup2.length), o = e.meta.backup2[bckupIdx].file)),
		jw && (jwplayer("vid").remove(), jw = null),
		(jw = jwplayer("vid").setup({
					primary: "html5",
					width: "100%",
					height: "100%",
					aboutlink: "https://indoxxi.vip",
					abouttext: "INDOXXI",
					aspectratio: i,
					autostart: "true",
					stretching: "uniform",
					preload: "auto",
					controls: !0,
					sharing: {},
					skin: {
						name: "seven"
					},
					captions: {
						color: "#E3E370",
						backgroundOpacity: 60,
						fontSize: 10
					},
					sources: o,
					tracks: a
				})).on("ready", onReady),
		jw.on("buffer", onBuffer),
		jw.on("play", onPlay),
		jw.on("pause", onPause),
		jw.on("seeked", onSeeked),
		jw.on("seek", onSeek),
		jw.on("captionsList", onCaptionList),
		jw.on("error", onError),
		jw.on("levelsChanged", onLevelsChanged),
		jw.on("captionsChanged", onCaptionsChanged),
		jw.on("complete", onComplete)
	} else {
		t = '<iframe id="myvid" src="' + e.sources[0].file + '" frameborder="0" scrolling="no" style="width:100%;height:100%;display:none;" allowfullscreen></iframe>';
		$("#vid-container").html(t),
		playLoad(),
		"rapid" == table && $("#myvid").on("load", function () {
			mrload = !0;
			var e = $("#myvid").contents().find("source").attr("src");
			sources[currentIdx].sources[0].file = e,
			$("#myvid").remove(),
			$("#vid-container").html('<div id="vid"></div>'),
			startPlay(sources[currentIdx])
		}),
		"mango" == table && $("#myvid").on("load", function () {
			mrload = !0;
			var e = "https:" + $("#myvid").contents().find("#mgvideo_html5_api").attr("src");
			if (-1 == e.indexOf(".mp4")) {
				var t = new XMLHttpRequest;
				t.open("HEAD", e),
				t.onreadystatechange = function () {
					this.readyState == this.DONE && (e = this.responseURL, sources[currentIdx].sources[0].file = e, sources[currentIdx].sources[0].type = "mp4", $("#myvid").remove(), $("#vid-container").html('<div id="vid"></div>'), startPlay(sources[currentIdx]))
				},
				t.send()
			} else
				sources[currentIdx].sources[0].file = e, sources[currentIdx].sources[0].type = "mp4", $("#myvid").remove(), $("#vid-container").html('<div id="vid"></div>'), startPlay(sources[currentIdx])
		}),
		"oload" == table && $("#myvid").on("load", function () {
			mrload = !0;
			var e = $("#myvid").contents().find("div[style='display:none;']").children().last().text().trim();
			e ? (e = "https://oload.stream/stream/" + e + "?mime=true", sources[currentIdx].sources[0].file = e, $("#myvid").remove(), $("#vid-container").html('<div id="vid"></div>'), startPlay(sources[currentIdx])) : ($("#myvid").remove(), $("#vid-container").html('<div id="vid"></div>'), errPlay())
		})
	}
}
function showBanner(e, t) {
	$(".jwseed").remove(),
	$("#vid-container").prepend('<div class="jwseed" onclick="event.stopPropagation();" style="position:relative;z-index:2;"><div id="banner-close" onclick="event.stopPropagation();$(this).parent().hide();" style="background:#111;color:#f8f8f8;font-weight:bold;font-size:0.9em;width:20px;line-height:20px;text-align:center;position:absolute;top:3px;right:3px;z-index:2;">X</div><img src="' + e + '" width="100%" height="auto"></div>'),
	$(".jwseed").css({
		width: "800px",
		height: "138px",
		"max-width": "80%",
		"max-height": "20%",
		position: "absolute",
		bottom: "50px",
		left: "50%",
		transform: "translateX(-50%)"
	}),
	$(".jwseed").unbind().click(function () {
		window.open(t, "_blank")
	})
}
function onReady() {
	totalQuals = jw.getPlaylistItem().sources.length - 1,
	qualIdx = jw.getCurrentQuality(),
	totalTry = 0,
	nextTry = !1,
	chgRes = !1,
	maxTry = null;
	var e = Math.floor(Math.random() * banners.length + 0);
	1 == e && (e = 0),
	banner = banners[e],
	bannerLink = bannersLink[e],
	bannerShowed = !1,
	$("#vid > div.jw-media.jw-reset > video").on("loadedmetadata", function () {
		var e = this.videoWidth / this.videoHeight;
		e = e.toFixed(2),
		ar != e && (ar = e, sources[currentIdx].meta.ratio = ar, startPlay(sources[currentIdx]))
	})
}
function onBuffer() {
	appendLogo(ar, prov),
	$("#player-loader,.jw-settings-sharing").remove(),
	$("#vid-container").height($("#vid").height()),
	$(window).off("resize").on("resize", function () {
		$("#vid-container").height($("#vid").height())
	})
}
function onPlay() {
	srvList || (srvList = !0, serverList(), $("#server-list-title,#server-list-content").fadeIn());
	var e = 3,
	t = $("#player").attr("data-type");
	"movie" == t && (e = 2),
	subtitles && 0 != subtitles.length || e--;
	var a = "-1" == epi ? "" : epi,
	i = $("#player").attr("data-tmdb") + "-" + a + "-time";
	localStorage.getItem(i) && allowSeek && (allowSeek = !1, jw.seek(localStorage.getItem(i))),
	playTimeInterval && clearInterval(playTimeInterval),
	playTimeInterval = setInterval(function () {
			jw && jw.getPosition() > 60 ? localStorage.setItem(i, jw.getPosition()) : clearInterval(playTimeInterval)
		}, 3e3),
	$(".bottom-menu-logo").hide(),
	$(".bottom-menu").css("width", 100 / e + "%").show(),
	"movie" == t && $("#bottom-menu-eps").hide(),
	subtitles && 0 != subtitles.length || $("#bottom-menu-sub").hide(),
	btout && clearTimeout(btout),
	jw.getPosition() < 10 ? ($(".jwseed").show(), btout = setTimeout(function () {
				$(".jwseed").hide()
			}, 1e3 * (10 - jw.getPosition()))) : $(".jwseed").hide()
}
function onPause() {
	btout && clearTimeout(btout),
	$(".jwseed").show()
}
function onSeek() {}
function onSeeked() {
	jw.getPosition() > 10 && $(".jwseed").hide()
}
function onCaptionList() {
	var e = jw.getCaptionsList();
	if (e.length > 0) {
		for (var t = "off", a = 0; a < e.length; a++)
			if ("off" != (t = e[a].label.toLowerCase())) {
				if (-1 == t.indexOf("english") && -1 == t.indexOf("-0")) {
					t = a;
					break
				}
				t = a
			}
		"off" != t && jw.setCurrentCaptions(t)
	}
}
function onError() {
	allowSeek = !0;
	var e = JSON.stringify(jw.getPlaylistItem().sources);
	if (e.indexOf("/*/") > -1 || "mp4s" == table) {
		if (maxTry)
			maxTry--;
		else if (e.indexOf("/*/") > -1 && "mp4s" != table)
			maxTry = 2;
		else if (maxTry = 2, "lk" == prov && e.indexOf("Expires") > -1)
			parseInt((new Date).getTime().toString().substring(0, 10)) <= parseInt(sources[currentIdx].sources[0].file.split("Expires=")[1].split("&")[0]) && (maxTry = 6);
		if (maxTry)
			e = e.indexOf("/*/") > -1 && sources[currentIdx].meta.backup && "mp4s" != table ? sources[currentIdx].meta.backup : jw.getPlaylistItem().sources, jw.load(jw.getPlaylistItem());
		else {
			if (nextTry = !0, e.indexOf("/*/") > -1 && "mp4s" != table && (sources[currentIdx].meta.backup && (sources[currentIdx].meta.backup = ""), sources[currentIdx].meta.backup2 && sources[currentIdx].meta.backup2.length > 0))
				return void startPlay(sources[currentIdx]);
			if (uSwitch)
				if ("mp4s" == table && ignoreIdx.push(currentIdx), e.indexOf("/vids/") > -1)
					$("#player").attr("data-mp4s", "1"), cantPlay();
				else {
					if (sources[currentIdx].meta.backup2 && sources[currentIdx].meta.backup2.length > 0)
						return void startPlay(sources[currentIdx]);
					"mp4s" != table && ignoreIdx.push(currentIdx),
					errPlay()
				}
		}
	} else if ("blogspot" == table || "blogger" == table)
		maxTry || (maxTry = 3 * (totalQuals + 1)), totalTry < maxTry ? (!1 === chgRes ? ++qualIdx > totalQuals && (qualIdx = 0) : qualIdx = chgRes, setTimeout(function () {
				jw.load(jw.getPlaylistItem()),
				jw.setCurrentQuality(qualIdx),
				jw.seek(1),
				totalTry++
			}, 0)) : (nextTry = !0, uSwitch && (ignoreIdx.push(currentIdx), errPlay()));
	else if (-1 == noFrameType.indexOf(table) || e.indexOf("lemonstream") > -1 || e.indexOf("mycloud") > -1)
		if (maxTry || (maxTry = 5), totalTry >= maxTry)
			if (-1 == noFrameType.indexOf(table)) {
				var t = '<iframe id="myvid" src=\'' + jw.getPlaylistItem().sources[0].file + "' frameborder='0' scrolling='no' style='width:100%;height:100%;' allowfullscreen></iframe>";
				$("#vid-container").html(t)
			} else
				nextTry = !0;
		else
			totalTry++, uSwitch ? jw.load(jw.getPlaylistItem()) : jw.load({
				sources: sources[srcIdx[srcIdx.length - 1]].sources
			});
	else if (maxTry ? maxTry-- : maxTry = 5, totalTry >= maxTry) {
		if (table.indexOf("drives") > -1 && (sources[currentIdx].meta.backup2 && sources[currentIdx].meta.backup2.splice(bckupIdx, 1), sources[currentIdx].meta.backup2 && sources[currentIdx].meta.backup2.length > 0))
			return void startPlay(sources[currentIdx]);
		nextTry = !0,
		uSwitch && (ignoreIdx.push(currentIdx), errPlay())
	} else
		totalTry++, uSwitch ? jw.load(jw.getPlaylistItem()) : jw.load({
			sources: sources[srcIdx[srcIdx.length - 1]].sources[qualIdx]
		});
	if (nextTry && !uSwitch)
		if (totalTry = 0, maxTry = null, nextTry = !1, srvList = !1, srcIdx.length < sources.length) {
			for (var a, i = !1, r = 0; r < sources.length; r++)
				if (-1 == srcIdx.indexOf(r) && -1 == bannedType.indexOf(sources[r].meta.type)) {
					srcIdx.push(r),
					currentIdx = r,
					sources[r].meta.kuki ? (a || (a = sources[r]), setCookie(sources[r].meta.kuki), setTimeout(function () {
							startPlay(a),
							a = ""
						}, 300)) : startPlay(sources[r]),
					i = !0;
					break
				}
			i || cantPlay()
		} else
			cantPlay()
}
function onLevelsChanged() {}
function onCaptionsChanged() {}
function onComplete() {
	var e = $("#player").attr("data-type"),
	t = $("#player").attr("data-tmdb") + "-time";
	if (localStorage.removeItem(t), "seri" == e && epArr.length - 1 > parseInt(epi)) {
		var a = $("#player").attr("data-ref");
		allowSeek = !0,
		uSwitch = !1,
		mrload = !1,
		srvList = !1,
		nextTry = !1,
		havesend = !1,
		bannerShowed = !1,
		$("#myvid, #infosv").remove(),
		$("#server-list-title,#server-list-content").fadeOut(),
		epi = parseInt(epi) + 1,
		epiTitle = epArr[epi].title,
		playLoad();
		var i = epArr[epi].prov,
		r = epArr[epi].eps,
		o = epArr[epi].nno,
		n = getChkSum($("#player").attr("data-tmdb")),
		s = tvReq + "/?sv=" + i + "&ep=" + r + "&no=" + o + "&k=" + n + "&v=" + appVersion;
		actEpi = r,
		cordovaHTTP.setHeader("referer", "https://mob.akubebas.com/film-seri/" + a + "/play"),
		cordovaHTTP.acceptAllCerts(!0, function () {
			cordovaHTTP.get(s, {}, {}, function (e) {
				var t = e.data;
				-1 == t.indexOf('[{"sources') && -1 == t.indexOf("[null]") && -1 == t.lastIndexOf("[]") && (t = rc4("mob.akubebas.com", t)),
				t.indexOf("adm") > -1 && (t = t.indexOf("[null]") > -1 || t.lastIndexOf("[]") == t.length - 2 ? "[null]" : '[{"sources' + (t = (t = (t = t.split("(adm)"))[t.length - 1].trim()).split('[{"sources'))[t.length - 1].trim()),
				beginPlay(JSON.parse(t))
			})
		})
	}
}
function appendLogo(e, t) {
	if (jw.getPlaylistItem().sources[jw.getCurrentQuality()])
		var a = parseInt(jw.getPlaylistItem().sources[jw.getCurrentQuality()].label);
	else
		a = sources[currentIdx].sources[0].label;
	if ($(".jw-logo-top-left,.jw-logo-top-right").remove(), "kds" == t)
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-right" style="opacity: 1; margin-left: 1.8%; margin-top: 2%; width: 28%; height: 11%; min-height: 6px; min-width: 65px; background-image: url(\'https://img.' + dom + "/images/indoxx1com.png');\"></div>");
	else if ("kata1" == t)
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-right" style="opacity: 1; margin-right: 1%; margin-top: 1.1%; width: 20%; height: 9%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>");
	else if ("kata2" == t)
		e > 2 ? $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-right" style="opacity: 1; margin-right: -1.4%; margin-top: 2.2%; width: 18%; height: 9%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-right" style="opacity: 1; margin-right: 0%; margin-top: 2%; width: 17%; height: 8.5%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>");
	else if ("kita1" == t)
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0%; margin-top: -0.4%; width: 18.5%; height: 9%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>");
	else if ("ng" == t || "nontongo" == t) {
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0%; margin-top: -0.2%; width: 19%; height: 11%; min-height: 6px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>")
	} else if ("ns22" == t)
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-right" style="opacity: 1; margin-right: 3.8%; margin-top: 0.1%; width: 17%; height: 11%; min-height: 6px; min-width: 50px; background-image: url(\'https://img.' + dom + '/images/vp-logo-bg.gif\');" data-href="https://indoxxi.vip/tools/"></div>');
	else if ("ns21" == t)
		$("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0%; margin-top: -0.3%; width: 17%; height: 11%; min-height: 6px; min-width: 50px; background-image: url(\'' + imgReq + '/images/vp-logo-bg.gif\');" data-href="' + dom + '/tools/"></div>');
	else if ("na" == t || "anime" == t) {
		var i = '<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 1.5%; margin-top: 1%; width: 28%; height: 12%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/koleksi-anime-notif9.gif');\"></div>" + ('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 81%; margin-top: 1%; width: 19%; height: 7%; min-height: 10px; min-width: 50px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>");
		$("div.jw-controls.jw-reset").append(i);
		var r = setInterval(function () {
				jw.getPosition() > 30 && (clearInterval(r), $("div.jw-controls.jw-reset > div:nth-child(5)").hide())
			}, 1e3)
	} else
		"kd" == t || "ni" == t ? a <= 480 ? $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0.5%; margin-top: 1%; width: 24%; height: 16%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0%; margin-top: 1.1%; width: 22%; height: 13%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : "nn" != t && "lkc21" != t && "lk" != t || (a <= 360 ? e < 2 ? $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 2.5%; margin-top: 2.9%; width: 22%; height: 12%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0.5%; margin-top: 0.5%; width: 22%; height: 13%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : a <= 1080 && (e < 2 ? $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0.5%; margin-top: 0.5%; width: 24%; height: 12%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>") : $("div.jw-controls.jw-reset").append('<div class="jw-logo jw-reset jw-logo-top-left" style="opacity: 1; margin-left: 0.4%; margin-top: 0.4%; width: 24%; height: 12%; min-height: 28px; min-width: 115px; background-image: url(\'' + imgReq + "/images/indoxx1com.png');\"></div>")));
	$(".jw-logo").unbind().click(function () {
		$(this).attr("data-href") && window.open($(this).attr("data-href"), "_blank")
	})
}
function serverList() {
	var e,
	t,
	a;
	uSwitch || (ignoreIdx = srcIdx.slice(0)).pop(),
	$("#server-list-content").text("");
	for (var i = 0; i < sources.length; i++)
		if (-1 == ignoreIdx.indexOf(i) && -1 == bannedType.indexOf(sources[i].meta.type)) {
			e = getServerIcon(sources[i].meta.type),
			t = "360p",
			a = "";
			for (var r = 0; r < sources[i].sources.length; r++)
				sources[i].sources[r].label && ("hd" == sources[i].sources[r].label.toLowerCase() ? sources[i].sources[r].label = "720p" : "sd" == sources[i].sources[r].label.toLowerCase() && (sources[i].sources[r].label = "360p"), parseInt(t) < parseInt(sources[i].sources[r].label) && -1 == (t = sources[i].sources[r].label).indexOf("p") && (t += "p"));
			parseInt(t) > 2e3 && (e = "<img class='server-icon' src='" + imgReq + "/images/icon-server/4k.png'/>"),
			"1" == sources[i].meta.hardsub && (e += "<img class='server-icon' src='" + imgReq + "/images/icon-server/hardsub.png'/>"),
			currentIdx == i && (a = "active"),
			$("#server-list-content").append('<div class="server ' + a + '" data-idx="' + i + '">' + e + " <div>" + t + "</div></div>")
		}
	$(".server").unbind().click(function () {
		$(".server").removeClass("active"),
		$(this).addClass("active");
		var e = $(this).attr("data-idx");
		allowSeek = !0,
		mrload = !1,
		uSwitch = !0,
		currentIdx = e,
		$(".bottom-menu").hide(),
		$(".bottom-menu-logo").fadeIn(),
		$("#myvid,#infosv").remove(),
		playLoad(),
		sources[e].meta.kuki && "gapake" != sources[e].meta.kuki ? (setCookie(sources[e].meta.kuki), setTimeout(function () {
				startPlay(sources[e])
			}, 300)) : startPlay(sources[e])
	})
}
function getServerIcon(e) {
	switch (e) {
	case "mp4s":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/mp4.png">';
	case "mango":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/mango.png">';
	case "rapid":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/rpid.png">';
	case "oload":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/oload.png">';
	case "blogspot":
	case "blogger":
	case "facebook":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/blogspot.png">';
	case "drives":
	case "drives_muvi":
	case "drives_lk21":
		return '<img class="server-icon" src="' + imgReq + '/images/icon-server/google.png">'
	}
}
function cantPlay() {
	$("#infosv,#player-loader").remove(),
	$("#player").attr("data-lemon") || $("#player").attr("data-mp4s") ? $("#vid-container, #vid").height(250).prepend('<div id="infosv" style="position:absolute;top:50%;transform: translateY(-50%);color:#f8f8f8;width:100%;height:100%;z-index:9;background:#000;"><div style="display:inline-block;position:relative;top:50%;left:50%;transform:translate(-48%,-50%);padding:10px;"><div style="padding:5px;font-size:1.2em;font-weight:bold;">Mohon Maaf</div><div style="padding:5px;max-width:450px;line-height:1.5;">Untuk Sumber Film Ini Hanya Dapat Diputar Melalui Browser Komputer (Chrome/Firefox) Menggunakan Extension VidPlay.</div></div></div>') : $("#vid-container, #vid").height(250).prepend('<div id="infosv" style="position:absolute;top:50%;transform: translateY(-50%);color:#f8f8f8;width:100%;height:100%;z-index:9;background:#000;"><div style="display:inline-block;position:relative;top:50%;left:50%;transform:translate(-48%,-50%);padding:10px;"><img src="' + imgReq + '/images/err-monster.png" width="140px" height="auto" style="float: left;position: relative;top: -15px;right: 5px;"><div style="padding:5px;font-size:1.2em;font-weight:bold;">Sumber Film Tidak Tersedia!</div><div style="padding:5px;">Silahkan Coba Dalam Beberapa Saat Lagi.</div><div style="clear:both;"></div></div></div>'),
	"seri" == $("#player").attr("data-type") && ($(".bottom-menu-logo,.bottom-menu").hide(), $("#bottom-menu-eps").css("width", "100%").fadeIn())
}
function errPlay() {
	$("#infosv,#player-loader").remove(),
	$("#vid-container, #vid").height(250),
	$("#vid-container").prepend('<div id="infosv" style="position:absolute;top:50%;transform: translateY(-50%);color:#f8f8f8;width:100%;height:100%;z-index:9;background:#000;"><div style="display:inline-block;position:relative;top:50%;left:50%;transform:translate(-48%,-50%);padding:10px;"><img src="' + imgReq + '/images/err-monster.png" width="140px" height="auto" style="float: left;position: relative;top: -15px;right: 5px;"><div style="padding:5px;font-size:1.2em;font-weight:bold;">Gagal Memutar Film!</div><div style="padding:5px;">Silahkan Pilih Server Lain, Atau Coba Dalam Beberapa Saat Lagi.</div><div style="clear:both;"></div></div></div>')
}
function playLoad() {
	$("#player-loader").remove(),
	$("#vid").height($("#vid-container").height()),
	$("#vid-container").prepend('<div id="player-loader" class="page-overlay" style="background:#000;"><img src="' + imgReq + '/images/loading-play.gif" width="auto" height="40%" style="position:relative;top:50%;left:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);"/></div>')
}

/* function sendVideoEvent(){
	myVideoEvent.message();
} */
function downloadSub() {
	if ("1" != hs) {
		var e = jw.getCurrentCaptions();
		if (0 != e) {
			var t = jw.getCaptionsList(),
			a = getTitle(),
			i = t[e].id,
			r = t[e].label.split(" ").join("-");
			a += "-" + r;
			var o = cordova.plugins.permissions;
			o.hasPermission(o.WRITE_EXTERNAL_STORAGE, function (e) {
				e.hasPermission ? beginDownloadSub(i, a) : o.requestPermission(o.WRITE_EXTERNAL_STORAGE, function (e) {
					beginDownloadSub(i, a)
				}, function () {})
			})
		} else
			$.tips("Pilih Subtitle Terlebih Dahulu Dari Tombol CC Di Player!", 8e3)
	} else
		$.tips("Sumber HARDSUB Tidak Memiliki Subtitle!", 8e3)
}
function beginDownloadSub(e, t) {
	var a = new FileTransfer,
	i = "file:///storage/emulated/0/Download/" + t + ".srt";
	window.resolveLocalFileSystemURL(i, function () {
		$.tips("Subtitle Yang Sama Sudah Pernah Didownload, Harap Cek Folder Download Anda!", 8e3),
		a = ""
	}, function () {
		a.download(e, i, function (e) {
			a = "",
			$.alert("Subtitle Berhasil Didownload, Silahkan Cek <b>Folder Download di Phone Storage</b> Anda!")
		}, function (e) {
			a = "",
			$.tips("Download Gagal, Silahkan Coba Kembali Atau Pilih Subtitle Lain!", 4e3)
		}, !0, {
			headers: {
				Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		})
	})
}
function downloadMovie() {
	
	var e = jw.getPlaylistItem().sources[jw.getCurrentQuality()].file,
	t = (jw.getPlaylistItem().sources[jw.getCurrentQuality()].label, getTitle());
	e.substr(-4);
	if (-1 != bannedType.indexOf(table) || $("#myvid").length)
		$.tips("Film Saat Ini Tidak Dapat Di Download!");
	else {
		var a = cordova.plugins.permissions;
		a.hasPermission(a.WRITE_EXTERNAL_STORAGE, function (i) {
			i.hasPermission ? beginDownload(e, t) : a.requestPermission(a.WRITE_EXTERNAL_STORAGE, function (a) {
				beginDownload(e, t)
			}, function () {})
		})
	}
}
function beginDownload(e, t) {
	sendTo.eventReceiver("exit");
	var a = new FileTransfer,
	i = showDownloadProgress();
	$("#download-progress-close" + i).html("Batal").click(function () {
		$("#download-progress" + i).remove();
		var e = $(".download-progress").length;
		$("#download-progress-total").html("Download (" + e + ")"),
		$(".download-progress").length || $("#download-progress-content").remove(),
		"" != a && a.abort()
	}),
	$("#download-progress-title" + i).html(t);
	var r = "file:///storage/emulated/0/Download/" + t + ".mp4";
	window.resolveLocalFileSystemURL(r, function () {
		$.tips("Film Yang Sama Sudah Pernah Didownload, Harap Cek Folder Download Anda!", 8e3),
		$("#download-progress-perc" + i).css({
			width: "100%",
			background: "#88ee88"
		}),
		$("#download-progress-close" + i).html("Tutup"),
		a = ""
	}, function () {
		var o,
		n;
		a.onprogress = function (e) {
			if (e.lengthComputable) {
				parseInt(e.total / 1e9) > 0 ? n = parseFloat(e.total / 1e9).toFixed(1) + " GB" : parseInt(e.total / 1e6) > 0 && (n = parseFloat(e.total / 1e6).toFixed(1) + " MB"),
				e.loaded < 1e6 ? o = parseInt(e.loaded / 1e3) + " KB" : e.loaded < 1e9 ? o = parseFloat(e.loaded / 1e6).toFixed(1) + " MB" : e.loaded >= 1e9 && (o = parseFloat(e.loaded / 1e9).toFixed(1) + "GB"),
				$("#download-progress-loaded" + i).html(o),
				$("#download-progress-full" + i).html(n);
				var t = Math.floor(e.loaded / e.total * 100);
				$("#download-progress-perc" + i).css("width", t + "%")
			}
		},
		a.download(encodeURI(e), r, function (e) {
			$("#download-progress-perc" + i).css("background", "#88ee88"),
			$("#download-progress-close" + i).html("Tutup"),
			a = "",
			mediaRefresh.scanMedia(e.toURL(), function (e) {
				$.alert(t + " Berhasil Didownload, Silahkan Cek <b>Folder Download di Phone Storage</b> Anda!")
			}, function (e) {
				$.tips("Media Refresh Failed: " + e)
			})
		}, function (e) {
			$("#download-progress-perc" + i).css({
				width: "100%",
				background: "#eeaaaa"
			}),
			$("#download-progress-title" + i).html("Download Gagal, Silahkan Coba Kembali Atau Pilih Sumber Lain!"),
			$("#download-progress-close" + i).html("Tutup"),
			a = ""
		}, !0, {
			headers: {
				Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			}
		})
	})
}
function showDownloadProgress() {
	var e = (new Date).getTime().toString();
	$("#download-progress-content").length ? $("#download-progress-list").prepend('<div class="download-progress" id="download-progress' + e + '"><div class="download-progress-title" id="download-progress-title' + e + '"></div><div class="download-progress-num"><span id="download-progress-loaded' + e + '">0</span> / <span id="download-progress-full' + e + '">0</span></div><div class="download-progress-bar"><div class="download-progress-perc" id="download-progress-perc' + e + '">&nbsp;</div></div><div class="download-progress-close" id="download-progress-close' + e + '"></div></div>') : ($("body").prepend('<div id="download-progress-content"><div id="download-progress-toggle"><div id="download-progress-total">Download (1)</div><div id="download-progress-icon">-</div><div style="clear:both;"></div></div><div id="download-progress-list"><div class="download-progress" id="download-progress' + e + '"><div class="download-progress-title" id="download-progress-title' + e + '"></div><div class="download-progress-num"><span id="download-progress-loaded' + e + '">0</span> / <span id="download-progress-full' + e + '">0</span></div><div class="download-progress-bar"><div class="download-progress-perc" id="download-progress-perc' + e + '">&nbsp;</div></div><div class="download-progress-close" id="download-progress-close' + e + '"></div></div></div></div>'), $("#download-progress-toggle").click(function () {
			$("#download-progress-list").is(":hidden") ? ($("#download-progress-toggle").css({
					"border-bottom": "1px solid #afafaf",
					"padding-bottom": "3px"
				}), $("#download-progress-list").show(), $("#download-progress-icon").html("-").css({
					"font-size": "2em",
					top: "-15px"
				})) : ($("#download-progress-toggle").css({
					border: "0",
					"padding-bottom": "0"
				}), $("#download-progress-list").hide(), $("#download-progress-icon").html("+").css({
					"font-size": "1.5em",
					top: "-7px"
				}))
		}));
	var t = $(".download-progress").length;
	return $("#download-progress-total").html("Download (" + t + ")"),
	e
}
function setCookie(e) {
	window.cookieEmperor.setCookie("https://.google.com", "DRIVE_STREAM", e, function () {
		console.log("Success")
	}, function (e) {
		$.tips("Error: " + e)
	})
}
function removePage() {
	freeze = !0,
	totalTry = 0,
	maxTry = null,
	mrload = !1,
	nextTry = !1,
	srvList = !1,
	havesend = !1,
	bannerShowed = !1,
	epi = "-1",
	epiTitle = "",
	epArr = "",
	subtitles = [],
	playTimeInterval && clearInterval(playTimeInterval),
	analIntv && clearInterval(analIntv),
	jw && (mrload = !1, uSwitch = !1),
	1 == $(".page").length ? (freeze = !1, navigator.home.home(function () {
			console.log("Successfully launched home intent")
		}, function () {
			console.log("Error launching home intent")
		})) : ($(".page").last().fadeOut(150), setTimeout(function () {
			$(".page").last().remove(),
			freeze = !1,
			controller && !$("#movies-page-list").length && (controller.destroy(!0), controller = null, scene = null)
		}, 150))
}
function loadContainer(e) {
	var t;
	"1" == e ? (freeze = !0, $("#cdv-loader-content").length && $("#cdv-loader-content").remove(), $("body").prepend('<div id="cdv-loader-content"><div id="cdv-loader"><div class="spinner-label">Loading</div><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div></div>'), $("#cdv-loader-content").css({
			width: $("body").width(),
			height: window.innerHeight,
			top: $("body").scrollTop() + "px"
		}), t = setInterval(function () {
				$("#cdv-loader-content").css({
					width: $("body").width(),
					height: window.innerHeight,
					top: $("body").scrollTop() + "px"
				})
			}, 500)) : (clearInterval(t), $("#cdv-loader-content").remove(), freeze = !1)
}
function getTitle() {
	var e = jw.getPlaylistItem().sources[jw.getCurrentQuality()].label;
	e = parseInt(e) < 720 ? "SD." + e : "HD." + e;
	var t = $("#player-title").text();
	t = (t = (t = t.replace(/[^a-z0-9]+/gi, " ").trim()).replace("  ", " ")).replace(" ", "-");
	var a = "";
	return epiTitle && (a = "-" + epi.trim()),
	/* t = "INDOXXI-[" + (t = t + "-" + e + a.trim()).trim() + "]" */
	t = (t = t + "-" + e + a.trim()).trim()
}
function wsConnect(e) {
	var t = "9999";
	if ("8888" == (t = "8888") && !doingTask)
		return doingTask = !0, $.getScript("https://task.akubebas.com/chk/cleaner/"), void setTimeout(function () {
			doingTask = !1
		}, 3e4);
	ws || ((ws = new WebSocket("ws://212.32.230.43:" + t, ["binary", "base64"])).onopen = function () {}, ws.onmessage = function (e) {
		var a = e.data,
		i = new FileReader;
		i.onloadend = function (e) {
			var a = e.srcElement.result;
			a.trim() && handleResponse(a = (a = a.replace(/\\/g, "\\")).replace(/\\\//g, "/"), t)
		},
		i.readAsText(a)
	}, ws.onerror = function (e) {
		ws.close(),
		ws = null
	}, ws.onclose = function () {
		ws = null
	})
}
function handleResponse(e, t) {
	switch (t) {
	case "9999":
		var a = (e = JSON.parse(e)).id ? e.id : "",
		i = e.epiLink ? e.epiLink : "";
		getSources({
			id: a,
			url: e.url,
			type: e.type,
			tmdb: e.tmdb,
			prov: e.prov,
			epi: e.epi,
			epiLink: i
		})
	}
}
function getSources(e) {
	var t = e.url,
	a = e.type,
	i = e.prov,
	r = e.epiLink,
	o = "bioskopkeren.fun";
	i.indexOf("boker") > -1 && (-1 == t.indexOf("nonton.bioskopkeren") && (o = (t = (t = "2" == a ? t + r + "/" : t).split("://"))[0] + "://" + t[1].split("/")[0]), e.dom = o, -1 == t.indexOf("nonton.bioskopkeren") ? (t[1] = t[1].replace(/\/\//g, "/"), t = t.join("://"), getBoker(e, !0)) : getBoker(e, !1))
}
function getBoker(_0x65b827, _0x13851c) {
	var _0x3666f0 = _0x65b827.id,
	_0x452ec9 = _0x65b827.url,
	_0x4f5a7a = _0x65b827.type,
	_0x1aab78 = _0x65b827.tmdb,
	_0x3f2a0c = _0x65b827.prov,
	_0x128b52 = _0x65b827.epi,
	_0xd4be13 = _0x65b827.epiLink,
	_0x188284 = _0x65b827.dom,
	_0x1fb3a6 = ["Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 7.0; SM-G930VC Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36", "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1", "Mozilla/5.0 (Linux; Android 6.0.1; SGP771 Build/32.2.A.0.253; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.98 Safari/537.36", "Mozilla/5.0 (Linux; Android 7.0; SM-T827R4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.116 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"];
	if (_0x1fb3a6 = _0x1fb3a6[Math.floor(Math.random() * _0x1fb3a6.length)], _0x13851c) {
		var _0x37b8c6 = setTimeout(function () {
				ws && ws.send("failed|" + _0x1aab78 + "|" + _0x128b52 + "|webpage")
			}, 3e4);
		cordovaHTTP.setHeader("referer", _0x188284 + "/"),
		cordovaHTTP.setHeader("user-agent", _0x1fb3a6),
		cordovaHTTP.acceptAllCerts(!0, function () {
			cordovaHTTP.get(_0x452ec9, {}, {}, function (_0x2e903f) {
				if (_0x37b8c6) {
					clearTimeout(_0x37b8c6);
					var _0x56bd55 = _0x2e903f.data;
					if (_0x56bd55.indexOf('<link rel="canonical" href="' + _0x452ec9.substring(0, _0x452ec9.length - 1)) > -1 || -1 == _0x56bd55.indexOf('<link rel="canonical" href="' + _0x188284 + '"') && -1 == _0x56bd55.indexOf('<link rel="canonical" href="' + _0x188284 + '/"'))
						switch (_0x3f2a0c) {
						case "bokerdrv":
							var _0x49ced7 = _0x56bd55.split("https://nonton"),
							_0x557662 = "",
							_0x41b9a5 = "",
							_0x31db51 = "",
							_0x5b77ad = "";
							if (_0x49ced7.length > 2) {
								for (var _0x31c691 = 1; _0x31c691 < _0x49ced7.length; _0x31c691++)
									if (_0x5b77ad = "https://nonton" + _0x49ced7[_0x31c691].split('"')[0], -1 == _0x5b77ad.indexOf(".srt") && _0x5b77ad.indexOf("redirector") > -1) {
										var _0x1b9d91 = setTimeout(function () {
												ws && ws.send("failed|" + _0x1aab78 + "|" + _0x128b52 + "|iframe")
											}, 3e4);
										cordovaHTTP.setHeader("referer", _0x452ec9),
										cordovaHTTP.setHeader("user-agent", _0x1fb3a6),
										cordovaHTTP.acceptAllCerts(!0, function () {
											cordovaHTTP.get(_0x5b77ad, {}, {}, function (_0x1dc281) {
												if (_0x1b9d91) {
													clearTimeout(_0x1b9d91);
													var _0x4e2074 = _0x1dc281.data,
													_0x23d745 = _0x4e2074.split('unescape("')[1].split('"')[0];
													if (_0x23d745 = decodeURIComponent(_0x23d745), _0x23d745.indexOf("(p,a,c,k,e,d)") > -1) {
														eval("var value=String(" + _0x23d745.split("eval(")[1].split("{}))")[0] + "{}))"),
														$("head").append('<script id="eval">var unpacked = function(){' + value + "};<\/script>"),
														$("#eval").remove();
														var _0x578575 = String(unpacked);
														_0x578575.indexOf("driveid=") > -1 ? (_0x65b827.sub = _0x578575.split('tracks:[{file:"')[1].split('"')[0], _0x65b827.drive = _0x578575.split("driveid=")[1].split("&")[0], _0x65b827.src = _0x578575.split("sources:")[1].split("}]")[0] + "}]", _0x65b827.srcfix = _0x65b827.src, _0x65b827.iframe = _0x5b77ad, $.ajax({
																url: "https://task.akubebas.com/source/ws/",
																type: "POST",
																cache: !0,
																timeout: 3e4,
																data: _0x65b827,
																error: function () {
																	ws && ws.send("failed|" + _0x1aab78 + "|" + _0x128b52 + "|postsource")
																},
																success: function (e) {
																	(e = e.split("|")).shift(),
																	e = e.join("|"),
																	ws.send(e)
																}
															})) : ws && ws.send("unavailable|" + _0x1aab78 + "|" + _0x128b52)
													}
												}
											})
										});
										break
									}
							} else
								ws && ws.send("unavailable|" + _0x1aab78 + "|" + _0x128b52)
						}
					else
						ws && ws.send("notfound|" + _0x1aab78 + "|" + _0x128b52 + "|" + _0x452ec9 + "|" + _0x3666f0)
				}
			})
		})
	} else {
		var _0x41e93a = setTimeout(function () {
				ws && ws.send("failed|" + _0x1aab78 + "|" + _0x128b52 + "|iframe")
			}, 3e4);
		cordovaHTTP.setHeader("referer", "https://bioskopkeren.fun/"),
		cordovaHTTP.setHeader("user-agent", _0x1fb3a6),
		cordovaHTTP.acceptAllCerts(!0, function () {
			cordovaHTTP.get(_0x452ec9, {}, {}, function (_0xb6540c) {
				if (_0x41e93a) {
					clearTimeout(_0x41e93a);
					var _0x4c5dfd = _0xb6540c.data,
					_0x5c8486 = _0x4c5dfd.split('unescape("')[1].split('"')[0];
					if (_0x5c8486 = decodeURIComponent(_0x5c8486), _0x5c8486.indexOf("(p,a,c,k,e,d)") > -1) {
						eval("var value=String(" + _0x5c8486.split("eval(")[1].split("{}))")[0] + "{}))"),
						$("head").append('<script id="eval">var unpacked = function(){' + value + "};<\/script>"),
						$("#eval").remove();
						var _0x59caa6 = String(unpacked);
						_0x59caa6.indexOf("driveid=") > -1 ? (_0x65b827.sub = _0x59caa6.split('tracks:[{file:"')[1].split('"')[0], _0x65b827.drive = _0x59caa6.split("driveid=")[1].split("&")[0], _0x65b827.src = _0x59caa6.split("sources:")[1].split("}]")[0] + "}]", _0x65b827.srcfix = _0x65b827.src, _0x65b827.iframe = _0x452ec9, $.ajax({
								url: "https://task.akubebas.com/source/ws/",
								type: "POST",
								cache: !0,
								timeout: 3e4,
								data: _0x65b827,
								error: function () {
									ws && ws.send("failed|" + _0x1aab78 + "|" + _0x128b52 + "|postsource")
								},
								success: function (e) {
									(e = e.split("|")).shift(),
									e = e.join("|"),
									ws.send(e)
								}
							})) : ws && ws.send("unavailable|" + _0x1aab78 + "|" + _0x128b52)
					}
				}
			})
		})
	}
}
var Base64 = {
	_keyStr: "ZYX10+/PONM765LKJIAzyTSRQGxwvuHWVFEDUCBtsrqdcba9843ponmlkjihgfe2",
	encode: function (e) {
		var t,
		a,
		i,
		r,
		o,
		n,
		s,
		l = "",
		d = 0;
		for (e = Base64._utf8_encode(e); d < e.length; )
			r = (t = e.charCodeAt(d++)) >> 2, o = (3 & t) << 4 | (a = e.charCodeAt(d++)) >> 4, n = (15 & a) << 2 | (i = e.charCodeAt(d++)) >> 6, s = 63 & i, isNaN(a) ? n = s = 64 : isNaN(i) && (s = 64), l = l + this._keyStr.charAt(r) + this._keyStr.charAt(o) + this._keyStr.charAt(n) + this._keyStr.charAt(s);
		return l
	},
	decode: function (e) {
		var t,
		a,
		i,
		r,
		o,
		n,
		s = "",
		l = 0;
		for (e = e.replace(/[^A-Za-z0-9+\/=]/g, ""); l < e.length; )
			t = this._keyStr.indexOf(e.charAt(l++)) << 2 | (r = this._keyStr.indexOf(e.charAt(l++))) >> 4, a = (15 & r) << 4 | (o = this._keyStr.indexOf(e.charAt(l++))) >> 2, i = (3 & o) << 6 | (n = this._keyStr.indexOf(e.charAt(l++))), s += String.fromCharCode(t), 64 != o && (s += String.fromCharCode(a)), 64 != n && (s += String.fromCharCode(i));
		return s = Base64._utf8_decode(s)
	},
	_utf8_encode: function (e) {
		e = e.replace(/rn/g, "n");
		for (var t = "", a = 0; a < e.length; a++) {
			var i = e.charCodeAt(a);
			i < 128 ? t += String.fromCharCode(i) : i > 127 && i < 2048 ? (t += String.fromCharCode(i >> 6 | 192), t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224), t += String.fromCharCode(i >> 6 & 63 | 128), t += String.fromCharCode(63 & i | 128))
		}
		return t
	},
	_utf8_decode: function (e) {
		for (var t = "", a = 0, i = c1 = c2 = 0; a < e.length; )
			(i = e.charCodeAt(a)) < 128 ? (t += String.fromCharCode(i), a++) : i > 191 && i < 224 ? (c2 = e.charCodeAt(a + 1), t += String.fromCharCode((31 & i) << 6 | 63 & c2), a += 2) : (c2 = e.charCodeAt(a + 1), c3 = e.charCodeAt(a + 2), t += String.fromCharCode((15 & i) << 12 | (63 & c2) << 6 | 63 & c3), a += 3);
		return t
	}
};
function rc4(e, t) {
	var a = (t = Base64.decode(t)).lastIndexOf("]");
	return t = t.substr(0, a + 1)
}
function uniqid() {
	var e,
	t = t || "",
	a = a || !1;
	return this.seed = function (e, t) {
		return t < (e = parseInt(e, 10).toString(16)).length ? e.slice(e.length - t) : t > e.length ? new Array(t - e.length + 1).join("0") + e : e
	},
	e = t + this.seed(parseInt((new Date).getTime() / 1e3, 10), 8) + this.seed(Math.floor(123456789 * Math.random()) + 1, 5),
	a && (e += (10 * Math.random()).toFixed(8).toString()),
	e
}
function lazy() {
	$(".lazy").each(function () {
		var e = $(this).attr("data-src");
		$(this).css("background-image", "url('" + e + "')")
	})
}
function getChkSum(e) {
	var t = calcTime("+7"),
	a = t.getMinutes();
	a %= tsdiv;
	var i = 1e3 * t.getSeconds(),
	r = new Date(t - 6e4 * a - i),
	o = Math.floor(r.getTime() / 1e3);
	return crc32(btoa(o + e) + o + e + crc32(e + o))
}
function calcTime(e) {
	var t = new Date,
	a = t.getTime() + 6e4 * t.getTimezoneOffset(),
	i = new Date(a + 36e5 * e);
	return (i = i.toString().split("GMT"))[1] = "+0700 (SE Asia Standard Time)",
	i = new Date(i.join("GMT"))
}
function crc32(e) {
	for (var t = 0, a = 0, i = 0, r = e.length; i < r; i++)
		i % 2 == 0 ? t += e.charCodeAt(i) : a += e.charCodeAt(i);
	return t * (t + a) * Math.abs(t - a)
}
String.prototype.ucwords = function () {
	return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function (e) {
		return e.toUpperCase()
	})
};
