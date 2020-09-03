    QYAdsManager: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "b8128b6LvRMApm5nzj3y/Yj", "QYAdsManager"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = e("./Base64Tools"),
            o = {
                1000: "\u540e\u7aef\u63a5\u53e3\u8c03\u7528\u5931\u8d25",
                1001: "\u53c2\u6570\u9519\u8bef",
                1002: "\u5e7f\u544a\u5355\u5143\u65e0\u6548",
                1003: "\u5185\u90e8\u9519\u8bef",
                1004: "\u4eca\u65e5\u5e7f\u544a\u5df2\u8fbe\u4e0a\u9650",
                1005: "\u5e7f\u544a\u7ec4\u4ef6\u5ba1\u6838\u4e2d",
                1006: "\u5e7f\u544a\u7ec4\u4ef6\u88ab\u9a73\u56de",
                1007: "\u5e7f\u544a\u7ec4\u4ef6\u88ab\u5c01\u7981",
                1008: "\u5e7f\u544a\u5355\u5143\u5df2\u5173\u95ed"
            },
            a = Date.now() / 1e3,
            r = function () {
                function t() {
                    this.lastStyle = {}, this.is_no_ads = !1, this._last_show_interstitial_milsec = 0, this._qy_ads = null, this.enable_admob_banner = !0, this.enable_admob_launch = !0, this.enable_admob_interstitial = !0, this.enable_admob_rewardVideo = !0, this.EnableGoogleNativeAd = !0, this.enable_chartboost_interstitial = !0, this.enable_chartboost_rewardVideo = !0, this.enable_chartboost_launch = !0, this.enable_unity_interstitial = !0, this.enable_unity_rewardvideo = !0, this.enableQYBannerAd = !0, this.enableQYInterstitialAd = !0, this.enableQYRewardVideoAd = !0, this.enableQYLaunchAd = !0, this.EnableQYNativeAd = !0, this.index = 1, this.show_banner = !1, this._isVideoLimit = !1, this.data4399Video = {
                        canPlayAd: !0,
                        remain: 0
                    }, this.playVideoData = {
                        isSuccess: !1,
                        success: null,
                        fail: null,
                        non: null,
                        defFail: null,
                        defNon: null
                    }, this.minGameVideoShowData = {
                        videoMgr: null,
                        isShowing: !1,
                        isLoaded: !1,
                        onLoadCall: null,
                        onErrorCall: null,
                        onCloseCall: null,
                        preLoadEndCall: null
                    }, this.minGameBlockAd = {
                        showIndex: 1,
                        map: {}
                    }, this.bannerData = {
                        lockShowKeys: []
                    }, this.playVideoSuccessCallMap = {}, this.is_no_ads = LocalDataManager.readBool("NoAds", !1), this._initIntersitialIntervalTime(), this._qyAdsInit(), this._4399AdsInit(), this.isNoAds() || (this._minGameAdsInit(), cc.sys.isNative && void 0 != window.sdkbox && (void 0 !== sdkbox.PluginAdMob && this._admobInit(), void 0 !== sdkbox.PluginUnityAds && this._unityAdsInit(), void 0 !== sdkbox.PluginChartboost && this._chartboostInit(), void 0 != window.qy && window.qy.PluginAdMobNativeAds && window.qy.PluginAdMobNativeAds.init()))
                }
                return t.getInstance = function () {
                    return this._instance || (this._instance = new t)
                }, Object.defineProperty(t, "instance", {
                    get: function () {
                        return this._instance || (this._instance = new t)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.settingNoAds = function () {
                    this.is_no_ads = !0, LocalDataManager.write("NoAds", this.is_no_ads)
                }, t.prototype.isNoAds = function () {
                    return this.is_no_ads
                }, t.prototype.isMinGameVideoValid = function () {
                    var e = window.wx || window.uc || window.bl;
                    return window.uc && !e.createRewardedVideoAd && (e.createRewardedVideoAd = e.createRewardedVideoAd || e.createRewardVideoAd), e && !!e.createRewardedVideoAd
                }, t.prototype._minGameAdsInit = function () {
                    var e = this,
                        t = window.wx || window.uc || window.bl,
                        i = this.minGameVideoShowData;
                    if (this.isMinGameVideoValid() && !i.videoMgr) {
                        var n = {
                            adUnitId: window.wxAdVideoId
                        };
                        window.swan && (n.adUnitId = window.swanVideoId, n.appSid = window.swanSid), i.isLoaded = !1, window.bl ? i.videoMgr = t.createRewardedVideoAd() : i.videoMgr = t.createRewardedVideoAd(n)
                    }
                    var o = i.videoMgr;
                    o && !i.isShowing && (i.onLoadCall || (i.onLoadCall = function () {
                        console.log("\u6fc0\u52b1\u89c6\u9891 \u5e7f\u544a\u52a0\u8f7d\u6210\u529f"), i.preLoadEndCall && i.preLoadEndCall(), i.videoMgr && i.onLoadCall && i.videoMgr.offLoad(i.onLoadCall), i.onLoadCall = null, e.minGameVideoShowData.isLoaded = !0, i.isShowing && e._showMinGameVideo(!0)
                    }, o.onLoad(i.onLoadCall)), i.onErrorCall || (i.onErrorCall = function (t) {
                        console.log("激励视频加载失败hacker", t), e._clearMingameVideo()
                        wxsdk.share({pos:"default"})
                        e._reward(!0)
                    }, o.onError(i.onErrorCall)), i.onCloseCall || (i.onCloseCall = function (t) {
                        t && t.isEnded || void 0 === t ? (cc.log("wx reward success"), e._reward(!0)) : (console.log("wx reward fail"), e._reward(!1)), e._clearMingameVideo()
                    }, o.onClose(i.onCloseCall)))
                }, t.prototype._clearMingameVideo = function () {
                    this.minGameVideoShowData.isShowing = !1, this.minGameVideoShowData.isLoaded = !1;
                    var e = this.minGameVideoShowData,
                        t = this.minGameVideoShowData.videoMgr;
                    t && t.destroy && (e.onLoadCall && t.offLoad(e.onLoadCall), e.onCloseCall && t.offClose(e.onCloseCall), e.onErrorCall && t.offError(e.onErrorCall), e.onLoadCall = null, e.onCloseCall = null, e.onErrorCall = null, t.destroy())
                }, t.prototype._qyAdsInit = function () {
                    cc.log("_qyAdsInit");
                    var t = this;
                    if (void 0 != window.sdkbox && cc.sys.isNative && cc.sys.isMobile) {
                        var i = new XMLHttpRequest,
                            o = window.server_control_ads_url_prefix + window.package_name;
                        i.onreadystatechange = function () {
                            if (4 == i.readyState && i.status >= 200 && i.status < 400) try {
                                i.responseText;
                                var e = JSON.parse(i.responseText),
                                    o = n.decode(e.Data, window.base64_decode_key);
                                o = o.replace(/[^A-Za-z0-9+/=\",{}:]/g, "");
                                var a = JSON.parse(o);
                                t.enable_admob_banner = !a.hasOwnProperty("EnableGoogleBannerAd") || a.EnableGoogleBannerAd, t.enable_admob_launch = !a.hasOwnProperty("EnableGoogleSpreadAd") || a.EnableGoogleSpreadAd, t.enable_admob_interstitial = !a.hasOwnProperty("EnableGoogleInterstitialAd") || a.EnableGoogleInterstitialAd, t.enable_admob_rewardVideo = !a.hasOwnProperty("EnableGoogleRewardBasedVideoAd") || a.EnableGoogleRewardBasedVideoAd, t.EnableGoogleNativeAd = !a.hasOwnProperty("EnableGoogleNativeAd") || a.EnableGoogleNativeAd, cc.log("admob" + t.enable_admob_banner + " " + t.enable_admob_interstitial + " " + t.enable_admob_rewardVideo + " " + t.enable_admob_launch), t.enable_chartboost_interstitial = !a.hasOwnProperty("EnableChartBoostInterstitialAd") || a.EnableChartBoostInterstitialAd, t.enable_chartboost_rewardVideo = !a.hasOwnProperty("EnableChartBoostRewardBasedVideoAd") || a.EnableChartBoostRewardBasedVideoAd, t.enable_chartboost_launch = !a.hasOwnProperty("EnableChartBoostSpreadAd") || a.EnableChartBoostSpreadAd, cc.log("chartboost" + t.enable_chartboost_interstitial + " " + t.enable_chartboost_rewardVideo + " " + t.enable_chartboost_launch), t.enable_qy_banner = !a.hasOwnProperty("EnableQYBannerAd") || a.EnableQYBannerAd, t.enable_qy_interstitial = !a.hasOwnProperty("EnableQYInterstitialAd") || a.EnableQYInterstitialAd, t.enable_qy_rewardvideo = !a.hasOwnProperty("EnableQYRewardBasedVideoAd") || a.EnableQYRewardBasedVideoAd, t.enable_qy_launch = !a.hasOwnProperty("EnableQYSpreadAd") || a.EnableQYSpreadAd, t.EnableQYNativeAd = !a.hasOwnProperty("EnableQYNativeAd") || a.EnableQYNativeAd, cc.log("qy" + t.enable_qy_banner + " " + t.enable_qy_interstitial + " " + t.enable_qy_rewardvideo + " " + t.enable_qy_launch), cc.log("Ads Config", JSON.stringify(a)), t.showLaunchAds()
                            } catch (e) {
                                cc.log("qyadsmanager:invalid json: " + e)
                            } else cc.log("????")
                        }, i.open("GET", o, !0), i.send()
                    }
                    var a = e("./QingYouAds/QYAds");
                    this.qy_ads = new a
                }, t.prototype._4399AdsInit = function () {
                    this.is4399VideoValid() && this._4399AdsStateRefresh()
                }, t.prototype._4399AdsStateRefresh = function () {
                    var e = this;
                    this.is4399VideoValid() && window.h5api.canPlayAd && window.h5api.canPlayAd(function (t) {
                        t && (e.data4399Video.canPlayAd = !!t.canPlayAd, e.data4399Video.remain = t.remain || 0)
                    })
                }, t.prototype.isQTTAdsValid = function () {
                    return void 0 !== window.qttGame
                }, t.prototype.is4399VideoValid = function () {
                    return window.h5api && void 0 !== window.h5api.playAd
                }, t.prototype.isDebugAdsValid = function () {
                    return window.plug && window.plug.DebugAds && window.plug.DebugAds.isValid()
                }, t.prototype.isAdmobValid = function () {
                    return void 0 !== window.sdkbox && void 0 !== window.sdkbox.PluginAdMob
                }, t.prototype.isUnityValid = function () {
                    return void 0 !== window.sdkbox && void 0 !== window.sdkbox.PluginUnityAds
                }, t.prototype.isChartboostValid = function () {
                    return void 0 !== window.sdkbox && void 0 !== window.sdkbox.PluginChartboost
                }, t.prototype._admobInit = function () {
                    if (this.isAdmobValid()) {
                        cc.log("_admobInit");
                        var e = this;
                        sdkbox.PluginAdMob.setListener({
                            adViewDidReceiveAd: function (t) {
                                if (cc.log("admob adViewDidReceiveAd name=" + t), "banner" == t && !e.isNoAds()) {
                                    var i = cc.director.getScene().getChildByName("Interstitial");
                                    i ? i.getComponent("Interstitial").registCloseCallback(function () {}) : e.showBanner(!1)
                                }
                            },
                            adViewDidFailToReceiveAdWithError: function (e, t) {
                                cc.log("admob adViewDidFailToReceiveAdWithError name=" + e + " msg=" + t)
                            },
                            adViewWillPresentScreen: function (e) {
                                cc.log("admob adViewWillPresentScreen name=" + e)
                            },
                            adViewDidDismissScreen: function (t) {
                                console.log("admob adViewDidDismissScreen name=" + t), "interstitial" == t ? e._interstitialEnd(!0) : "rewardedVideo" == t && e._reward(!1)
                            },
                            adViewWillDismissScreen: function (t) {
                                cc.log("admob adViewWillDismissScreen=" + t), "interstitial" == t && e._interstitialEnd(!0)
                            },
                            adViewWillLeaveApplication: function (e) {
                                cc.log("admob adViewWillLeaveApplication=" + e)
                            },
                            reward: function (t, i, n) {
                                cc.log("admob reward=" + t, i, n), e.playVideoData.isSuccess = !0
                            }
                        }), sdkbox.PluginAdMob.init()
                    }
                }, t.prototype.showAdmobInterstitial = function () {
                    0 != this.enable_admob_interstitial && this.isAdmobValid() && sdkbox.PluginAdMob.isAvailable("interstitial") && (sdkbox.PluginAdMob.show("interstitial"), setTimeout(function () {
                        cc.log("adcache admob interstitial"), sdkbox.PluginAdMob.cache("interstitial")
                    }, 1e4))
                }, t.prototype.showAdmobRewardVideo = function () {
                    0 != this.enable_admob_rewardVideo && this.isAdmobValid() && sdkbox.PluginAdMob.isAvailable("rewardedVideo") && (sdkbox.PluginAdMob.show("rewardedVideo"), setTimeout(function () {
                        cc.log("adcache admob rewardedVideo3"), sdkbox.PluginAdMob.cache("rewardedVideo")
                    }, 1e4))
                }, t.prototype._unityAdsInit = function () {
                    if (this.isUnityValid()) {
                        var e = this;
                        sdkbox.PluginUnityAds.setListener({
                            unityAdsDidClick: function (e) {
                                cc.log("unityAdsDidClick " + e)
                            },
                            unityAdsPlacementStateChanged: function (e, t, i) {
                                cc.log("unityAdsPlacementStateChanged:" + e + " oldState:" + t + " newState:" + i)
                            },
                            unityAdsReady: function (e) {
                                cc.log("unityAdsReady " + e)
                            },
                            unityAdsDidError: function (t, i) {
                                console.log("unityAdsDidError:" + t + " message:" + i), name, e._interstitialEnd(!1), e._reward(!1)
                            },
                            unityAdsDidStart: function (e) {
                                cc.log("unityAdsDidStart=" + e)
                            },
                            unityAdsDidFinish: function (t, i) {
                                cc.log("unityAdsDidFinish " + t + " state:" + i), i === sdkbox.PluginUnityAds.SBUnityAdsFinishState.kUnityAdsFinishStateCompleted && "rewardedVideo" === t ? e._reward(!0) : "interstitial" != t && "video" != t || e._interstitialEnd(!0)
                            }
                        }), sdkbox.PluginUnityAds.init()
                    }
                }, t.prototype.showUnityInterstitial = function () {
                    this.isUnityValid() && (sdkbox.PluginUnityAds.show("video"), sdkbox.PluginUnityAds && sdkbox.PluginUnityAds.isReady("interstitial") && sdkbox.PluginUnityAds.show("interstitial"))
                }, t.prototype.showUnityRewardVideo = function () {
                    this.isUnityValid() && sdkbox.PluginUnityAds && sdkbox.PluginUnityAds.isReady("rewardedVideo") && sdkbox.PluginUnityAds.show("rewardedVideo")
                }, t.prototype._chartboostInit = function () {
                    if (this.isChartboostValid()) {
                        sdkbox.PluginChartboost.init();
                        var e = this;
                        sdkbox.PluginChartboost.setListener({
                            onChartboostCached: function (e) {
                                cc.log("onChartboostCached " + e)
                            },
                            onChartboostShouldDisplay: function (e) {
                                cc.log("onChartboostShouldDisplay " + e)
                            },
                            onChartboostDisplay: function (e) {
                                cc.log("onChartboostDisplay " + e)
                            },
                            onChartboostDismiss: function (e) {
                                cc.log("onChartboostDismiss " + e)
                            },
                            onChartboostClose: function (t) {
                                cc.log("onChartboostClose " + t), e._interstitialEnd(!1)
                            },
                            onChartboostClick: function (e) {
                                cc.log("onChartboostClick " + e)
                            },
                            onChartboostReward: function (t, i) {
                                cc.log("onChartboostReward " + t + " reward " + i.toString()), e._reward(!0)
                            },
                            onChartboostFailedToLoad: function (e, t) {
                                cc.log("onChartboostFailedToLoad " + e + " load error " + t.toString())
                            },
                            onChartboostFailToRecordClick: function (e, t) {
                                cc.log("onChartboostFailToRecordClick " + e + " click error " + t.toString())
                            },
                            onChartboostConfirmation: function () {
                                cc.log("onChartboostConfirmation")
                            },
                            onChartboostCompleteStore: function () {
                                cc.log("onChartboostCompleteStore")
                            }
                        })
                    }
                }, t.prototype.showChartboostInterstitial = function () {
                    this.isChartboostValid() && sdkbox.PluginChartboost && sdkbox.PluginChartboost.isAvailable("interstitial") && sdkbox.PluginChartboost.show("interstitial")
                }, t.prototype.showChartboostRewardVideo = function () {
                    this.isChartboostValid() && sdkbox.PluginChartboost && sdkbox.PluginChartboost.isAvailable("rewardedVideo") && sdkbox.PluginChartboost.show("rewardedVideo")
                }, t.prototype.showLaunchAds = function () {
                    this.enable_qy_launch ? this.isNoAds() || (cc.log("showLaunchAds"), this.qy_ads.qyRequestLaunchAds()) : cc.log("showLaunchAds false")
                }, t.prototype.showQYInterstitial = function () {
                    this.isNoAds() || 0 != this.enable_qy_interstitial && (this.qy_ads.qyRequestInterstitial(!1, this.interstitial_callback), this.interstitial_callback = null, cc.log("\u6d4b\u8bd5 this.interstitial_callback = null"))
                }, t.prototype.hasAppBoxAds = function () {
                    return window.qq && !!window.qqAppBoxId
                }, t.prototype.showAppBoxAds = function () {
                    if (this.hasAppBoxAds()) {
                        var e = window.qq.createAppBox({
                            adUnitId: window.qqAppBoxId
                        });
                        e.load().then(function () {
                            e.show()
                        }), e.onClose(function () {
                            e.destroy()
                        })
                    }
                }, t.prototype.canShowAdmobNativeAd = function () {
                    return this.EnableGoogleNativeAd
                }, t.prototype.canShowQyNativeAd = function () {
                    return this.EnableQYNativeAd
                }, t.prototype.hasPatch = function () {}, t.prototype.showPatch = function () {}, t.prototype.hidePatch = function () {}, t.prototype.removeNativeAds = function () {
                    if (this.hidePatch(), !this._isValid() || void 0 == window.qy || !window.qy.PluginAdMobNativeAds) return !1;
                    window.qy.PluginAdMobNativeAds.removeNativeAds()
                }, t.prototype._hasPatchQTT = function () {
                    return this.isQTTAdsValid() && window.qttGame.showInterstitialAd
                }, t.prototype._showPatchQTT = function () {
                    if (this._hasPatchQTT()) {
                        var e = cc.view.getFrameSize(),
                            t = {
                                x: 0,
                                y: 0,
                                w: 375,
                                h: 100,
                                stage_width: e.width,
                                stage_height: e.height
                            };
                        return window.qttGame.showInterstitialAd(t), !0
                    }
                    return !1
                }, t.prototype._isBlockValid = function () {
                    return window.wx && !!window.wx.createBlockAd && window.wxAdBlockId && window.wxAdBlockId.length > 0
                }, t.prototype.getNextBlockIndex = function () {
                    return this.minGameBlockAd.showIndex
                }, t.prototype.showBlock = function (e, t, i, n, o) {
                    if (void 0 === t && (t = 1), void 0 === i && (i = !0), this._isBlockValid()) {
                        var a = this.minGameBlockAd.showIndex++,
                            r = i ? "landscape" : "vertical",
                            s = {
                                adUnitId: window.wxAdBlockId,
                                style: {
                                    top: e.top,
                                    left: e.left
                                },
                                size: t,
                                orientation: r
                            },
                            c = window.wx.createBlockAd(s);
                        if (c) {
                            this.minGameBlockAd.map[a] = c, c.isResize = !1;
                            var l = function (t) {
                                c.isResize || (c.isResize = !0, n && (n(t), n = null), c.left = e.left, c.top = e.top, c.offResize && c.offResize(l))
                            };
                            c.onResize(l), c.show().then(function (e) {
                                o && o()
                            }), c.onError(function (e) {
                                console.log(e)
                            })
                        }
                        return a
                    }
                    return 0
                }, t.prototype.hideBlock = function (e) {
                    var t = this.minGameBlockAd.map[e];
                    t && t.hide && t.hide()
                }, t.prototype.updateBlockPos = function (e, t) {
                    var i = this.minGameBlockAd.map[e];
                    i && i.style && (i.style.top = t.top, i.style.left = t.left)
                }, t.prototype.resumeBlock = function (e) {
                    var t = this.minGameBlockAd.map[e];
                    t && t.hide && t.show()
                }, t.prototype.destroyBlock = function (e) {
                    var t = this.minGameBlockAd.map[e];
                    t && t.destroy && t.destroy()
                }, t.prototype.destroyAllBlock = function () {
                    for (var e = Object.keys(this.minGameBlockAd.map), t = 0; t < e.length; t++) {
                        var i = e[t];
                        this.destroyBlock(Number(i))
                    }
                }, t.prototype.addBannerLock = function (e) {
                    void 0 === e && (e = ""), -1 == this.bannerData.lockShowKeys.indexOf(e) && (0 == this.bannerData.lockShowKeys.length && this.hideBanner(), this.bannerData.lockShowKeys.push(e))
                }, t.prototype.removeBannerLock = function (e) {
                    void 0 === e && (e = "");
                    var t = this.bannerData.lockShowKeys.indexOf(e); - 1 !== t && this.bannerData.lockShowKeys.splice(t, 1)
                }, t.prototype.showBanner = function (e, t) {
                    if (void 0 === e && (e = !0), e && (this.show_banner = !0), !this.show_banner || this.isNoAds() || this.bannerData.lockShowKeys.length > 0) return !1;
                    var i = !1;
                    return i = (i = (i = (i = i || this._showDebugBanner(t)) || this.showWxBanner(t)) || this._showNativeBanner()) || this._showQyBanner()
                }, t.prototype.hideBanner = function () {
                    this.show_banner = !1, this._hideDebugBanner(), this.destroyWXBanner(), this._hideQTTBanner(), this.hideQyBanner(), this._hideNativeBanner()
                }, t.prototype.pauseBanner = function () {
                    this.show_banner && (this._hideDebugBanner(), this.hideWxBanner(), this._hideQTTBanner(), this._hideNativeBanner(), this.hideQyBanner())
                }, t.prototype.resumeBanner = function () {
                    this.show_banner && (this._showDebugBanner() || this.resumeWxBanner() || this._showQTTBanner() || this._showNativeBanner() || this.showQYBanner())
                }, t.prototype._showNativeBanner = function () {
                    if (this._isNative() && this._isSdkboxValid() && this.enable_admob_banner && this.isAdmobValid()) {
                        if (sdkbox.PluginAdMob.isAvailable("banner")) return cc.log("ad show sdkad banner"), sdkbox.PluginAdMob.show("banner"), this.hideQyBanner(), !0;
                        cc.log("ad cache admob banner"), sdkbox.PluginAdMob.cache("banner")
                    }
                    return !1
                }, t.prototype._hideNativeBanner = function () {
                    return !!(this._isNative() && this.isAdmobValid() && this._isSdkboxValid()) && (sdkbox.PluginAdMob.hide("banner"), !0)
                }, t.prototype._showQyBanner = function () {
                    return !!this.enable_qy_banner && (this.showQYBanner(), !0)
                }, t.prototype._showQTTBanner = function () {
                    if (this.isQTTAdsValid() && window.qttGame.showBanner) {
                        var e = {
                            index: 1,
                            x: 0,
                            y: 0,
                            w: cc.view.getFrameSize().width,
                            stage_width: cc.view.getFrameSize().width,
                            stage_height: cc.view.getFrameSize().height
                        };
                        return window.qttGame.showBanner(e), !0
                    }
                    return !1
                }, t.prototype._hideQTTBanner = function () {
                    return !!this.isQTTAdsValid() && (window.qttGame.hideBanner && window.qttGame.hideBanner(), !0)
                }, t.prototype._showDebugBanner = function (e) {
                    return !!this.isDebugAdsValid() && (window.plug.DebugAds.showBanner(e), !0)
                }, t.prototype._hideDebugBanner = function () {
                    return !!(window.plug && window.plug.DebugAds && window.plug.DebugAds.isValid()) && (window.plug.DebugAds.hideBanner(), !0)
                }, t.prototype.showWxBanner = function (e) {

                    var t = this;
                    if (this._showDebugBanner(e)) return !0;
                    var i = window.wx || window.bl;
                    if (i && i.createBannerAd) {
                        var n = null == e;
                        e = e || window.resetWxStyle(), this.lastStyle = this.lastStyle || {};
                        var o = {
                            adUnitId: window.wxAdBannerId,
                            style: e
                        };
                        if (window.swan) {
                            if (o.adUnitId = window.swanBannerId, o.appSid = window.swanSid, n) {
                                var a = e.width / 16 * 9;
                                e.width = Math.floor(3 * a), e.height = a, e.left = (cc.view.getFrameSize().width - e.width) / 2
                            }
                        } else if (window.qq) {
                            if (n) {
                                a = e.width / 16 * 9;
                                e.width = Math.floor(3 * a), e.height = .24 * e.width, e.left = (cc.view.getFrameSize().width - e.width) / 2, e.top = cc.view.getFrameSize().height - e.height
                            }
                        } else window.bl && delete o.adUnitId;
                        return this.wxBannerAd = i.createBannerAd(o), e.left == this.lastStyle.left && e.top == this.lastStyle.top && e.width == this.lastStyle.width || (this.wxBannerAd.style.left = e.left, this.wxBannerAd.style.top = e.top, this.wxBannerAd.style.width = e.width), this.lastStyle = e, this.wxBannerAd.onError && this.wxBannerAd.onError(function (e) {
                            console.log("banner",e)
                        }), this.wxBannerAd.onResize && this.wxBannerAd.onResize(function (e) {
                            if (console.log("onResize"), n) {
                                var i = cc.view.getFrameSize().height - e.height,
                                    o = (cc.view.getFrameSize().width - e.width) / 2,
                                    a = t.wxBannerAd.style;
                                0 == e.height || a.top == i && a.left == o || (t.wxBannerAd.style.top = i, t.wxBannerAd.style.left = o)
                            } else {
                                i = t.lastStyle.top, o = t.lastStyle.left;
                                var r = t.wxBannerAd.style;
                                r.top == i && r.left == o || (t.wxBannerAd.style.top = i, t.wxBannerAd.style.left = o)
                            }
                        }), this.wxBannerAd.onLoad && this.wxBannerAd.onLoad(function () {
                            console.log("wx banner 广告加载成功 hacker"), t.wxBannerAd && (cc.log("show"), t.wxBannerAd.show && t.wxBannerAd.show(), cc.log(t.wxBannerAd.style), t.wxBannerAd.style.width = e.width + 1)
                        }), !0
                    }
                    return !1
                }, t.prototype.hideWxBanner = function () {
                    var e = window.wx || window.bl;
                    return !(!e || !e.createBannerAd) && (this.wxBannerAd && this.wxBannerAd.hide(), !0)
                }, t.prototype.resumeWxBanner = function () {
                    return !!this.wxBannerAd && (this.wxBannerAd.show(), !0)
                }, t.prototype.getWxBanner = function () {
                    return this.wxBannerAd
                }, t.prototype.destroyWXBanner = function () {
                    var e = window.wx || window.bl;
                    return !(!e || !e.createBannerAd) && (this.wxBannerAd && (this.wxBannerAd.destroy(), this.wxBannerAd = null), !0)
                }, t.prototype.hideQyBanner = function () {
                    if (this.enable_qy_banner) {
                        var e = cc.director.getScene().getChildByName("Banner");
                        if (null != e) return e.destroy(), !0
                    }
                    return !1
                }, t.prototype.showQYBanner = function () {
                    this.enable_qy_banner && (cc.log("showQYBanner"), this.qy_ads.qyRequestBanner())
                }, t.prototype.getCurrentBannerSize = function () {
                    return this._isNative() && this._isSdkboxValid() && this.isAdmobValid() ? new cc.Size(sdkbox.PluginAdMob.getCurrBannerWidth(), sdkbox.PluginAdMob.getCurrBannerHeight()) : cc.Size.ZERO
                }, t.prototype._judgeInterstitialIntervalTimeValid = function () {
                    var e = window.show_interstitial_interval || 1;
                    return !(Date.now() / 1e3 - this._last_show_interstitial_milsec < 60 * e)
                }, t.prototype._initIntersitialIntervalTime = function () {
                    var e = 60 * (window.interstitialStartDelay || 0),
                        t = 60 * (window.show_interstitial_interval || 1);
                    this._last_show_interstitial_milsec = a - t + e
                }, t.prototype._resetIntersitialIntervalTime = function () {
                    var e = Date.now() / 1e3;
                    this._last_show_interstitial_milsec = e
                }, t.prototype._hasInterstitialWx = function () {
                    if (window.wx) {
                        var e = -1 !== window.wx.getSystemInfoSync().platform.indexOf("ios"),
                            t = !!window.wx.createInterstitialAd;
                        if (window.tt) {
                            var i = "Toutiao" === window.wx.getSystemInfoSync().appName;
                            t = t && i && !e
                        }
                        return t
                    }
                    return !1
                }, t.prototype._hasInterstitialNative = function () {
                    if (!this._isNative() || !this._isSdkboxValid()) return this.enable_qy_interstitial;
                    var e = -1;
                    this.lastShowInterstitial = this.lastShowInterstitial || 0;
                    for (var t = [0, 1, 2, 3, 0, 1, 2, 3], i = 0; i < 4; i++) {
                        var n = t[this.lastShowInterstitial + i];
                        if (0 == n) {
                            if (this.isAdmobValid() && sdkbox.PluginAdMob && sdkbox.PluginAdMob.isAvailable("interstitial") && this.enable_admob_interstitial) {
                                e = t[n];
                                break
                            }
                        } else if (1 == n) {
                            if (this.isChartboostValid() && sdkbox.PluginChartboost && sdkbox.PluginChartboost.isAvailable("Default") && this.enable_chartboost_interstitial) {
                                e = t[n];
                                break
                            }
                        } else if (2 == n) {
                            if (this.isUnityValid() && sdkbox.PluginUnityAds && sdkbox.PluginUnityAds.isReady("video") && this.enable_unity_interstitial) {
                                e = t[n];
                                break
                            }
                        } else if (3 == n && this.enable_qy_interstitial) {
                            e = t[n];
                            break
                        }
                    }
                    return e >= 0
                }, t.prototype.hasInterstitial = function () {
                    var e = !1,
                        t = !this.isNoAds(),
                        i = this._judgeInterstitialIntervalTimeValid();
                    return t && i && (e = this.isDebugAdsValid() || this._hasInterstitialWx() || this._hasInterstitialNative()), e
                }, t.prototype._showInterstitialDebugAds = function () {
                    return !!(window.plug && window.plug.DebugAds && window.plug.DebugAds.isValid()) && (window.plug.DebugAds.showInterstitial(this, this._interstitialEnd), !0)
                }, t.prototype._showInterstitialWxAds = function () {
                    var e = this;
                    if (window.wx && this._hasInterstitialWx()) {
                        var t = window.wx.createInterstitialAd({
                            adUnitId: window.wxAdInterstitialId
                        });
                        return t.onError(function (i) {
                            console.log(i), e._interstitialEnd(!1), t.destroy()
                        }), t.onClose(function (i) {
                            console.log(i), e._interstitialEnd(!0), t.destroy()
                        }), t.load().then(function () {
                            e._resetIntersitialIntervalTime(), e._stopMusic(), t.show()
                        }).catch(function (t) {
                            console.log(t), e._interstitialEnd(!1, !1)
                        }), !0
                    }
                    return !1
                }, t.prototype._showInterstitialNativeAds = function () {
                    if (!this._isNative() || !this._isSdkboxValid()) return !1;
                    var e = -1;
                    this.lastShowInterstitial = this.lastShowInterstitial || 0;
                    for (var t = [0, 1, 2, 3, 0, 1, 2, 3], i = 0; i < 4; i++) {
                        var n = t[this.lastShowInterstitial + i];
                        if (0 == n) {
                            if (this.isAdmobValid()) {
                                if (sdkbox.PluginAdMob && sdkbox.PluginAdMob.isAvailable("interstitial") && this.enable_admob_interstitial) {
                                    this._stopMusic(), sdkbox.PluginAdMob.show("interstitial"), setTimeout(function () {
                                        cc.log("adcache admob interstitial2"), sdkbox.PluginAdMob.cache("interstitial")
                                    }, 5e4), e = t[n];
                                    break
                                }
                                this.enable_admob_interstitial && (cc.log("adcache admob interstitial3"), sdkbox.PluginAdMob.cache("interstitial"))
                            }
                        } else if (1 == n) {
                            if (this.isChartboostValid() && sdkbox.PluginChartboost && sdkbox.PluginChartboost.isAvailable("Default") && this.enable_chartboost_interstitial) {
                                cc.log("show Chartboost interstitial"), this._stopMusic(), sdkbox.PluginChartboost.show("Default"), e = t[n];
                                break
                            }
                        } else if (2 == n) {
                            if (this.isUnityValid() && sdkbox.PluginUnityAds && sdkbox.PluginUnityAds.isReady("video") && this.enable_unity_interstitial) {
                                cc.log("show Unity interstitial"), this._stopMusic(), sdkbox.PluginUnityAds.show("video"), e = t[n];
                                break
                            }
                        } else if (3 == n && this.enable_qy_interstitial) {
                            this.showQYInterstitial(), e = t[n];
                            break
                        }
                    }
                    return e >= 0 && (this._resetIntersitialIntervalTime(), this.lastShowInterstitial = e + 1, this._stopMusic(), !0)
                }, t.prototype.showInterstitial = function (e) {
                    void 0 === e && (e = null), this.interstitial_callback = e;
                    var t = !1,
                        i = !this.isNoAds(),
                        n = this._judgeInterstitialIntervalTimeValid();
                    return i && n && (t = (t = (t = t || this._showInterstitialDebugAds()) || this._showInterstitialWxAds()) || this._showInterstitialNativeAds()), t || this._interstitialEnd(!1, !1), t
                }, t.prototype._interstitialEnd = function (e, t) {
                    void 0 === e && (e = !1), void 0 === t && (t = !0), this.interstitial_callback ? (this.interstitial_callback(e), this.interstitial_callback = null) : cc.log("this.interstitial_callback() is null"), t && this._playMusic()
                }, t.prototype.loadRewardVideo = function (e) {
                    var t = this.minGameVideoShowData;
                    if (t.isLoaded) e && e();
                    else {
                        this._minGameAdsInit(), t.preLoadEndCall = e;
                        var i = t.videoMgr;
                        i && !t.isShowing && i.load()
                    }
                }, t.prototype.has4399RewardVideo = function () {
                    return this.data4399Video.canPlayAd && this.data4399Video.remain > 0
                }, t.prototype._hasNativeVideo = function () {
                    if (this._isNative() && this._isSdkboxValid()) {
                        if (this.isAdmobValid() && sdkbox.PluginAdMob.isAvailable("rewardedVideo") && this.enable_admob_rewardVideo) return !0;
                        if (this.isUnityValid() && sdkbox.PluginUnityAds.isReady("rewardedVideo") && this.enable_unity_rewardvideo) return !0;
                        if (this.isChartboostValid() && sdkbox.PluginChartboost.isAvailable("rewardedVideo") && this.enable_chartboost_rewardVideo) return !0
                    }
                    return !1
                }, t.prototype._hasQTTVideo = function () {
                    return this.isQTTAdsValid() && window.qttGame.showVideo
                }, t.prototype._hasMinGameVideo = function () {
                    return !!this.isMinGameVideoValid() && !this._isVideoLimit
                }, t.prototype.hasRewardVideo = function () {
                    return this.isDebugAdsValid() || this._hasMinGameVideo() || this.has4399RewardVideo() || this._hasQTTVideo() || this._hasNativeVideo()
                }, t.prototype.addPlayVideoSuccessCallFunc = function (e, t) {
                    this.playVideoSuccessCallMap[e] = t
                }, t.prototype.delPlayVideoSuccessCallFunc = function (e) {
                    delete this.playVideoSuccessCallMap[e]
                }, t.prototype.setNonVideoCallFunc = function (e) {
                    this.playVideoData.defNon = e
                }, t.prototype.setFailVideoCallFunc = function (e) {
                    var t = this;
                    setTimeout(function () {
                        t.playVideoData.defFail = e
                    }, 500)
                }, t.prototype.doDefaultNonVideo = function (e) {
                    this.playVideoData.defNon && this.playVideoData.defNon(e)
                }, t.prototype.doDefaultFailVideo = function (e) {
                    this.playVideoData.defFail && this.playVideoData.defFail(!1, e)
                }, t.prototype._showDebugVideo = function () {
                    return !!this.isDebugAdsValid() && (window.plug.DebugAds.showVideo(this, this._reward, this.playVideoData.non || this.playVideoData.defNon), !0)
                }, t.prototype._showMinGameVideo = function (e) {
                    var t = this;
                    if (void 0 === e && (e = !1), this.isMinGameVideoValid()) {
                        this._minGameAdsInit();
                        var i = this.minGameVideoShowData;
                        return !i.videoMgr || i.isShowing && !e || (i.isShowing = !0, i.isLoaded ? (i.isLoaded = !1, i.videoMgr.show().then(function () {
                            cc.log("\u5e7f\u544a\u663e\u793a\u6210\u529f"), t._stopMusic(), i.isShowing = !1
                        }).catch(function (e) {
                            console.log("\u5e7f\u544a\u7ec4\u4ef6\u51fa\u73b0\u95ee\u9898", e);
                            var n = {
                                errCode: e.errCode,
                                msg: o[e.errCode] || "\u5e7f\u544a\u64ad\u653e\u5931\u8d25"
                            };
                            i.isShowing = !1, t._isVideoLimit = !0, t._doVideoNonCall(n) || t._reward(!1, n, !1), t._clearMingameVideo()
                        })) : i.videoMgr.load()), !0
                    }
                    return !1
                }, t.prototype._showNativeAdsVideo = function () {
                    if (!this._isNative() || !this._isSdkboxValid()) return !1;
                    if (this.isAdmobValid()) {
                        if (sdkbox.PluginAdMob && sdkbox.PluginAdMob.isAvailable("rewardedVideo") && this.enable_admob_rewardVideo) return this._stopMusic(), sdkbox.PluginAdMob.show("rewardedVideo"), setTimeout(function () {
                            cc.log("adcache admob rewardedVideo"), sdkbox.PluginAdMob.cache("rewardedVideo")
                        }, 3e4), !0;
                        this.enable_admob_rewardVideo && (cc.log("adcache admob rewardedVideo2"), sdkbox.PluginAdMob.cache("rewardedVideo"))
                    }
                    return this.isUnityValid() && sdkbox.PluginUnityAds && sdkbox.PluginUnityAds.isReady("rewardedVideo") && this.enable_unity_rewardvideo ? (this._stopMusic(), sdkbox.PluginUnityAds.show("rewardedVideo"), !0) : !!(this.isChartboostValid() && sdkbox.PluginChartboost && sdkbox.PluginChartboost.isAvailable("rewardedVideo") && this.enable_chartboost_rewardVideo) && (this._stopMusic(), sdkbox.PluginChartboost.show("rewardedVideo"), !0)
                }, t.prototype._show4399Video = function () {
                    var e = this;
                    return !!this.is4399VideoValid() && (window.h5api.playAd(function (t) {
                        if (cc.log("\u4ee3\u7801:" + t.code + ",\u6d88\u606f:" + t.message), 1e4 === t.code) cc.log("\u5f00\u59cb\u64ad\u653e"), e._stopMusic();
                        else if (10001 === t.code) cc.log("\u64ad\u653e\u7ed3\u675f"), e._reward(!0), e._4399AdsStateRefresh();
                        else {
                            var i = {
                                errCode: t.code,
                                msg: t.message
                            };
                            cc.log("\u5e7f\u544a\u5f02\u5e38"), e._reward(!1, i, !1), e._4399AdsStateRefresh()
                        }
                    }), !0)
                }, t.prototype._showQTTVideo = function () {
                    var e = this;
                    if (this._hasQTTVideo()) {
                        this._stopMusic();
                        var t = {
                            index: 1
                        };
                        return t.gametype = Math.floor(3 * Math.random()) + 1, t.rewardtype = 1, t.data = {}, t.data.title = "\u83b7\u5f97\u5956\u52b1", window.qttGame.showVideo(function (t) {
                            if (1 == t) e._videoReward(!0);
                            else {
                                var i = {
                                    errCode: t,
                                    msg: 0 == t ? "\u586b\u5145\u5e7f\u544a\u4e0d\u8db3" : "\u5e7f\u544a\u64ad\u653e\u5931\u8d25"
                                };
                                2 != t && e._doVideoNonCall(i) || e._videoReward(!1, i)
                            }
                        }, t), !0
                    }
                    return !1
                }, t.prototype.showRewardVideo = function (e, t, i) {
                    void 0 === e && (e = null), void 0 === t && (t = null), void 0 === i && (i = null), cc.log("QYAdsManager showRewardVideo"), this.playVideoData.isSuccess = !1, this.playVideoData.success = e, this.playVideoData.fail = t, this.playVideoData.non = i;
                    var n = this.isNoAds();
                    return (n = (n = (n = (n = (n = n || this._showDebugVideo()) || this._showMinGameVideo()) || this._show4399Video()) || this._showQTTVideo()) || this._showNativeAdsVideo()) || (this._doVideoNonCall() || this._reward(!1), this._clearVideoCall()), !1
                }, t.prototype.closeAds = function () {
                    this._isNative() && this._isSdkboxValid() && this.hideBanner()
                }, t.prototype.getPlatformString = function () {
                    return cc.log("getPlatformString"), cc.sys.platform === cc.sys.IPAD || cc.sys.platform === cc.sys.IPHONE ? "iPhone" : cc.sys.platform === cc.sys.ANDROID ? "Android" : "iPhone"
                }, t.prototype._doVideoNonCall = function (e) {
                    return this.playVideoData.non ? (this.playVideoData.non(e), !0) : !!this.playVideoData.defNon && (this.playVideoData.defNon(e), !0)
                }, t.prototype._reward = function (e, t, i) {
                    if (void 0 === e && (e = !0), void 0 === t && (t = void 0), void 0 === i && (i = !0), e = e || this.playVideoData.isSuccess) {
                        for (var n in this.playVideoSuccessCallMap)
                            if (this.playVideoSuccessCallMap.hasOwnProperty(n)) {
                                var o = this.playVideoSuccessCallMap[n];
                                "function" == typeof o && o()
                            } this.playVideoData.success ? this.playVideoData.success(!0) : cc.log("this.playVideoData.success() is null")
                    } else this.playVideoData.fail ? this.playVideoData.fail(!1, t) : this.playVideoData.defFail ? this.playVideoData.defFail(!1, t) : cc.log("this.playVideoData.fail() is null");
                    this._clearVideoCall(), i && this._playMusic()
                }, t.prototype._videoReward = function (e, t, i) {
                    void 0 === e && (e = !0), void 0 === t && (t = void 0), void 0 === i && (i = !0), this._reward(e, t, i)
                }, t.prototype._clearVideoCall = function () {
                    this.playVideoData.isSuccess = !1, this.playVideoData.fail = null, this.playVideoData.success = null, this.playVideoData.non = null
                }, t.prototype._isNative = function () {
                    return !!cc.sys.isNative
                }, t.prototype._isValid = function () {
                    return cc.sys.isMobile && cc.sys.isNative && void 0 != window.sdkbox && void 0 != sdkbox.PluginSdkboxPlay
                }, t.prototype._isSdkboxValid = function () {
                    return "undefined" != typeof sdkbox
                }, t.prototype._stopMusic = function () {
                    AudioManager.setMusicVolume(0, !1), AudioManager.stopAllEffects()
                }, t.prototype._playMusic = function () {
                    AudioManager.setMusicVolume(1, !0)
                }, t
            }();
        i.default = r, window.plug = window.plug || {}, window.plug.QYAdsManager = t.exports = r, r.default = r, t.exports = r, cc._RF.pop()
    }, {
        "./Base64Tools": "Base64Tools",
        "./QingYouAds/QYAds": "QYAds"
    }]
    QYAds: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "96149w1+CNEiKWMQhYlJabX", "QYAds");
        var n = e("../Base64Tools"),
            o = cc.Class({
                name: "Phone",
                properties: {
                    banner_width: 0,
                    banner_height: 0,
                    screen_width: 0,
                    screen_height: 0
                },
                __ctor__: function (e, t, i, n) {
                    this.init(e, t, i, n)
                },
                init: function (e, t, i, n) {
                    this.banner_width = e, this.banner_height = t, this.screen_width = i, this.screen_height = n
                },
                screenRatio: function () {
                    return 0 == this.screen_height || 0 == this.screen_height ? 750 / 1334 : this.screen_width > this.screen_height ? this.screen_height / this.screen_width : this.screen_width / this.screen_height
                }
            });
        cc.Class({
            properties: {
                phones: {
                    type: [o],
                    default: []
                },
                _banner: null,
                _interstitial: null
            },
            ctor: function () {
                this.phones.push(new o(320, 50, 320, 480)), this.phones.push(new o(320, 50, 320, 568)), this.phones.push(new o(375, 50, 375, 667)), this.phones.push(new o(384, 50, 384, 512)), this.phones.push(new o(413, 100, 413, 736)), this.phones.push(new o(375, 50, 375, 812)), this.phones.push(new o(720, 100, 720, 1280)), this.phones.push(new o(1080, 150, 1080, 1920)), cc.log("qyads ctor")
            },
            qyRequestBanner: function () {
                if (cc.director.getScene().getChildByName("Banner")) cc.log("\u6709Banner\u5e7f\u544a\u5b58\u5728");
                else {
                    var t = this._getSizeWithWidth(),
                        i = t.banner_width,
                        o = t.banner_height;
                    cc.log("_qyRequestBanner" + i + " " + o);
                    var a = e("../QYAdsManager").getInstance().getPlatformString(),
                        r = banner_sid,
                        s = cc.js.formatStr(qy_banner_request_url, i, o, a, r),
                        c = new XMLHttpRequest;
                    c.onreadystatechange = function () {
                        if (4 == c.readyState && c.status >= 200 && c.status < 400) try {
                            var e = c.responseText;
                            cc.log("_qyRequestBanner: " + e);
                            var t = JSON.parse(c.responseText);
                            if (0 == t.IsSuccess) return;
                            var i = n.decode(t.Data, base64_decode_key).split("|"),
                                o = i[0],
                                a = i[1],
                                r = i[2],
                                s = i[3];
                            cc.log(o), cc.log(a), cc.log(r), cc.log(s), cc.loader.loadRes("Prefab/ads/Banner", function (e, t) {
                                var i = cc.instantiate(t);
                                cc.director.getScene().addChild(i, 500), cc.game.addPersistRootNode(i), i.getComponent("Banner").init(o, r, s, a)
                            })
                        } catch (e) {
                            cc.log("qyRequestBanner:invalid json: " + e)
                        } else cc.log("request error")
                    }, c.open("GET", s, !0), c.send()
                }
            },
            qyRequestInterstitial: function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                if (cc.director.getScene().getChildByName("Interstitial")) cc.log("\u6709interstitial\u5e7f\u544a\u5b58\u5728");
                else {
                    cc.log("qyRequestInterstitial");
                    var o = cc.view.getFrameSize().width,
                        a = cc.view.getFrameSize().height,
                        r = e("../QYAdsManager").getInstance().getPlatformString(),
                        s = "";
                    s = 1 == t ? launch_sid : interstitial_sid;
                    var c = cc.js.formatStr(qy_interstitial_request_url, o, a, r, s);
                    cc.log("url" + c);
                    var l = new XMLHttpRequest;
                    l.onreadystatechange = function () {
                        if (4 == l.readyState && l.status >= 200 && l.status < 400) try {
                            var e = l.responseText;
                            cc.log("_qyRequestInterstitial: " + e);
                            var t = JSON.parse(l.responseText);
                            if (0 == t.IsSuccess) return;
                            var o = n.decode(t.Data, base64_decode_key).split("|"),
                                a = o[0],
                                r = o[1],
                                s = o[2],
                                c = o[3];
                            cc.log(a), cc.log(r), cc.log(s), cc.log(c), cc.loader.loadRes("Prefab/ads/Interstitial", function (e, t) {
                                var n = cc.instantiate(t);
                                cc.director.getScene().addChild(n, 1e3), cc.game.addPersistRootNode(n);
                                var o = n.getComponent("Interstitial");
                                o.registCloseCallback(i), o.init(a, s, c, r)
                            })
                        } catch (e) {
                            cc.log("_qyRequestInterstitial:invalid json: " + e)
                        } else cc.log("request error")
                    }, l.open("GET", c, !0), l.send()
                }
            },
            qyRequestLaunchAds: function () {
                this.qyRequestInterstitial(!0)
            },
            _qyOnInterstitialClick: function (e) {},
            _qyGenerateTokey: function () {},
            _getSizeWithWidth: function () {
                this.phones[0];
                var e = Math.min(cc.view.getFrameSize().width, cc.view.getFrameSize().height) / Math.max(cc.view.getFrameSize().width, cc.view.getFrameSize().height);
                for (var t in this.phones) {
                    var i = this.phones[t];
                    if (Math.abs(e - i.screenRatio()) <= .01) {
                        i;
                        break
                    }
                }
                return cc.log("phone: " + i.banner_width + " " + i.banner_height), cc.log("banner_width: " + i.banner_width + " banner_height: " + i.banner_height), {
                    banner_width: i.banner_width,
                    banner_height: i.banner_height
                }
            }
        });
        cc._RF.pop()
    }, {
        "../Base64Tools": "Base64Tools",
        "../QYAdsManager": "QYAdsManager"
    }]
    QYInteger: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "71e26Z6vAlEZo7w0Hgrpims", "QYInteger"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = function () {
            function e() {
                this._value = 0
            }
            return Object.defineProperty(e.prototype, "value", {
                get: function () {
                    return this._value
                },
                set: function (t) {
                    this._value = e.parseValue(t)
                },
                enumerable: !0,
                configurable: !0
            }), e.parseInteger = function (t) {
                return e.create(e.parseValue(t))
            }, e.parseValue = function (t) {
                var i;
                return i = "number" == typeof t ? t : t instanceof Number ? t.valueOf() : parseFloat(t), Math.floor(i + e.accuracy)
            }, e.create = function (t) {
                var i = new e;
                return i.value = e.getNumber(t), i
            }, e.prototype.valueOf = function () {
                return this.value
            }, e.prototype.equals = function (e) {
                return e.value == this.value
            }, e.prototype.clone = function () {
                return e.create(this.value)
            }, e.prototype.lerp = function (t, i) {
                return e.create(Math.lerp(this.value, t.value, i))
            }, e.prototype.set = function (e) {
                this.value = e.value
            }, e.prototype.toString = function () {
                return String(this.value)
            }, e.prototype.add = function (t) {
                return e.create(this.value + e.getNumber(t))
            }, e.prototype.addSelf = function (t) {
                this.value = Math.floor(this.value + e.getNumber(t) + e.accuracy)
            }, e.prototype.sub = function (t) {
                return e.create(this.value - e.getNumber(t))
            }, e.prototype.subSelf = function (t) {
                this.value = Math.floor(this.value - e.getNumber(t) + e.accuracy)
            }, e.prototype.mul = function (t) {
                return e.create(this.value * e.getNumber(t))
            }, e.prototype.mulSelf = function (t) {
                this.value = Math.floor(this.value * e.getNumber(t) + e.accuracy)
            }, e.prototype.div = function (t) {
                return e.create(this.value / e.getNumber(t))
            }, e.prototype.divSelf = function (t) {
                this.value = Math.floor(this.value / e.getNumber(t) + e.accuracy)
            }, e.prototype.divReversal = function (t) {
                return e.create(e.getNumber(t) / this.value)
            }, e.getNumber = function (e) {
                return "number" == typeof e ? e : e instanceof Number ? e.valueOf() : e.value
            }, e.accuracy = 1e-6, e.zero = new e, e
        }();
        i.default = n, cc._RF.pop()
    }, {}]
    QYQuoteObjectPool: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "49b77UNV4NJnL323HkmuElO", "QYQuoteObjectPool"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = e("../Helper/ObjectHelper"),
            o = function () {
                function e(e, t, i, n, o) {
                    void 0 === t && (t = !0), void 0 === i && (i = null), void 0 === n && (n = null), void 0 === o && (o = null), this.list = [], this.target = null, this.onCreate = e, this.verify = t, this.target = i, this.onPop = n, this.onPush = o
                }
                return Object.defineProperty(e.prototype, "size", {
                    get: function () {
                        return this.list.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.clear = function (e) {
                    if (void 0 === e && (e = null), null != e)
                        for (var t = 0; t < this.list.length; t++) e(this.list[t]);
                    this.list.clear()
                }, e.prototype.contains = function (e) {
                    return this.list.contains(e)
                }, e.prototype.pop = function () {
                    var e = null;
                    return e = this.size < 1 ? null == this.target ? this.onCreate() : this.onCreate.call(this.target) : this.list.pop(), null != this.onPop && (null == this.target ? this.onPop(e) : this.onPop.call(this.target, e)), e
                }, e.prototype.pushWithNotContains = function (e) {
                    this.contains(e) || this.push(e)
                }, e.prototype.push = function (e) {
                    if (this.verify) {
                        if (n.default.isNullOrUndefined(e)) throw "\u76ee\u6807\u5143\u7d20 " + e + " \u662f\u4e00\u4e2a\u65e0\u6548\u5143\u7d20\uff01";
                        if (this.contains(e)) throw "\u76ee\u6807\u5143\u7d20 " + e + " \u5df2\u7ecf\u5b58\u5728\u5728\u5bf9\u8c61\u6c60\u4e2d\uff0c\u8bf7\u4e0d\u8981\u91cd\u590d\u653e\u5165\u5bf9\u8c61\u6c60\uff01"
                    }
                    null != this.onPush && (null == this.target ? this.onPush(e) : this.onPush.call(this.target, e)), this.list.push(e)
                }, e
            }();
        i.default = o, cc._RF.pop()
    }, {
        "../Helper/ObjectHelper": "ObjectHelper"
    }]