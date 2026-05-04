(function(){
let translateObjs = {};
const trans = (...a) => {
    return translateObjs[a[0x0]] = a, '';
};
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var m = (function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }());
            if (m)
                return function () {
                    var r, s, t = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        r = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (v) {
                            var w = v['get']('player');
                            return w && w['get']('viewerArea') == t;
                        })['map'](function (v) {
                            return v['get']('media')['get']('playList');
                        });
                    else
                        r = this['_getPlayListsWithViewer'](t), s = j['bind'](this, t);
                    if (!c) {
                        for (var u = 0x0; u < r['length']; ++u) {
                            r[u]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, r, m, s);
                };
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var n = k['split']('.'), o = n[0x1];
                if (o) {
                    var p = n['slice'](0x2)['join']('.');
                    return d(p, { 'viewerName': o });
                }
            } else {
                if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                    var q = undefined, m = (function () {
                            switch (k['toLowerCase']()) {
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                            case 'quiz.score':
                                return TDV['Quiz']['PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.time.remaining':
                                return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                            case 'quiz.time.elapsed':
                                return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                            case 'quiz.time.limit':
                                return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            case 'quiz.media.index':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                            case 'quiz.media.count':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                            case 'quiz.media.visited':
                                return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                            default:
                                var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                                if (s) {
                                    q = s[0x1];
                                    switch ('quiz.' + s[0x2]) {
                                    case 'quiz.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                                    case 'quiz.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                                    case 'quiz.media.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                                    case 'quiz.media.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                                    case 'quiz.media.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                                    case 'quiz.media.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                                    case 'quiz.questions.answered':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                                    case 'quiz.question.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                                    case 'quiz.items.found':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                                    case 'quiz.item.count':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                                    case 'quiz.media.score':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                                    case 'quiz.media.score.total':
                                        return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                                    }
                                }
                            }
                        }());
                    if (m)
                        return function () {
                            var r = this['get']('data')['quiz'];
                            if (r) {
                                if (!c) {
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, t[u]['id'], m), this);
                                            }
                                        } else
                                            r['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, q, m), this);
                                    } else
                                        r['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, m), this);
                                    c = !![];
                                }
                                try {
                                    var w = 0x0;
                                    if (q != undefined) {
                                        if (q == 'global') {
                                            var s = this['get']('data')['quizConfig'], t = s['objectives'];
                                            for (var u = 0x0, v = t['length']; u < v; ++u) {
                                                w += r['getObjective'](t[u]['id'], m);
                                            }
                                        } else
                                            w = r['getObjective'](q, m);
                                    } else {
                                        w = r['get'](m);
                                        if (m == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                            w += 0x1;
                                    }
                                    return w;
                                } catch (x) {
                                    return undefined;
                                }
                            }
                        };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a], a['split']('.')[0x0]);
        let l = a['split']('.'), m = l[0x0] + '_vr';
        m in this && k['updateText'](k['translateObjs'][a], m);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l], n = function () {
                    m['unbind']('begin', n, this), e['call'](this);
                };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            k in l && e['call'](this);
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            k == m && l in n && e['call'](this);
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n], p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.'), r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"scrollBarMargin":2,"width":"100%","backgroundColorRatios":[0],"id":"rootPlayer","data":{"locales":{"ru":"locale/ru.txt"},"name":"Player1619","defaultLocale":"ru","displayTooltipInTouchScreens":true,"history":{},"textToSpeechConfig":{"pitch":1,"speechOnTooltip":false,"speechOnInfoWindow":false,"rate":1,"speechOnQuizQuestion":false,"stopBackgroundAudio":false,"volume":1}},"backgroundColor":["#FFFFFF"],"layout":"absolute","start":"this.init()","watermark":false,"scripts":{"getOverlays":TDV.Tour.Script.getOverlays,"getMediaByName":TDV.Tour.Script.getMediaByName,"enableVR":TDV.Tour.Script.enableVR,"quizStart":TDV.Tour.Script.quizStart,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"openLink":TDV.Tour.Script.openLink,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"executeJS":TDV.Tour.Script.executeJS,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"mixObject":TDV.Tour.Script.mixObject,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"historyGoBack":TDV.Tour.Script.historyGoBack,"setValue":TDV.Tour.Script.setValue,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"showWindow":TDV.Tour.Script.showWindow,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"initQuiz":TDV.Tour.Script.initQuiz,"cloneBindings":TDV.Tour.Script.cloneBindings,"downloadFile":TDV.Tour.Script.downloadFile,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"getPixels":TDV.Tour.Script.getPixels,"getComponentByName":TDV.Tour.Script.getComponentByName,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"shareSocial":TDV.Tour.Script.shareSocial,"clone":TDV.Tour.Script.clone,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"toggleVR":TDV.Tour.Script.toggleVR,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"textToSpeech":TDV.Tour.Script.textToSpeech,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"getKey":TDV.Tour.Script.getKey,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"init":TDV.Tour.Script.init,"showPopupImage":TDV.Tour.Script.showPopupImage,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"isComponentVisible":TDV.Tour.Script.isComponentVisible,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"registerKey":TDV.Tour.Script.registerKey,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"createTweenModel3D":TDV.Tour.Script.createTweenModel3D,"initAnalytics":TDV.Tour.Script.initAnalytics,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"updateIndexGlobalZoomImage":TDV.Tour.Script.updateIndexGlobalZoomImage,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"setMapLocation":TDV.Tour.Script.setMapLocation,"unregisterKey":TDV.Tour.Script.unregisterKey,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"unloadViewer":TDV.Tour.Script.unloadViewer,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"showWindowBase":TDV.Tour.Script.showWindowBase,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"quizFinish":TDV.Tour.Script.quizFinish,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"createTween":TDV.Tour.Script.createTween,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"existsKey":TDV.Tour.Script.existsKey,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"playAudioList":TDV.Tour.Script.playAudioList,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"historyGoForward":TDV.Tour.Script.historyGoForward,"quizShowScore":TDV.Tour.Script.quizShowScore,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"isPanorama":TDV.Tour.Script.isPanorama,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"getMainViewer":TDV.Tour.Script.getMainViewer,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"resumePlayers":TDV.Tour.Script.resumePlayers,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"translate":TDV.Tour.Script.translate,"setModel3DCameraWithCurrentSpot":TDV.Tour.Script.setModel3DCameraWithCurrentSpot,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"startMeasurement":TDV.Tour.Script.startMeasurement,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"disableVR":TDV.Tour.Script.disableVR,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"setLocale":TDV.Tour.Script.setLocale},"class":"Player","propagateClick":false,"minHeight":0,"minWidth":0,"gap":10,"scrollBarColor":"#000000","defaultMenu":["fullscreen","mute","rotation"],"hash": "b5ec7225d71a032ae0393f79f199b0ba96173bcc453889fb82e9b63bb1e77c79", "definitions": [{"hfovMax":130,"class":"Panorama","hfov":360,"adjacentPanoramas":[{"data":{"overlayID":"overlay_00CD9837_1006_37F0_419D_EFA26726BDBE"},"distance":28.59,"yaw":-164.7,"panorama":"this.panorama_00F05883_1006_0890_41AA_28039B1E27DB","backwardYaw":131.98,"class":"AdjacentPanorama","select":"this.overlay_00CD9837_1006_37F0_419D_EFA26726BDBE.get('areas').forEach(function(a){ a.trigger('click') })"}],"vfov":180,"id":"panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF","thumbnailUrl":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_t.jpg","overlays":["this.overlay_00CD9837_1006_37F0_419D_EFA26726BDBE"],"frames":[{"cube":{"class":"ImageResource","levels":[{"rowCount":8,"height":4096,"url":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_0/{face}/0/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":48,"tags":"ondemand","width":24576},{"rowCount":4,"height":2048,"url":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_0/{face}/1/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":24,"tags":"ondemand","width":12288},{"rowCount":2,"height":1024,"url":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_0/{face}/2/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":12,"tags":"ondemand","width":6144},{"rowCount":1,"height":512,"url":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_0/{face}/3/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":6,"tags":["ondemand","preload"],"width":3072}]},"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_t.jpg"}],"data":{"label":"IMG_20250830_173408_00_003"},"label":trans('panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF.label')},{"class":"PanoramaCamera","id":"panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_camera","enterPointingToHorizon":true,"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"initialSequence":"this.sequence_1E43CBFF_1006_086F_41A0_CFF81E35F4F9"},{"hfovMax":130,"class":"Panorama","hfov":360,"adjacentPanoramas":[{"data":{"overlayID":"overlay_00DD783B_1006_37F0_4178_635050AF9A4C"},"distance":7.65,"yaw":131.98,"panorama":"this.panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF","backwardYaw":-164.7,"class":"AdjacentPanorama","select":"this.overlay_00DD783B_1006_37F0_4178_635050AF9A4C.get('areas').forEach(function(a){ a.trigger('click') })"}],"vfov":180,"id":"panorama_00F05883_1006_0890_41AA_28039B1E27DB","thumbnailUrl":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_t.jpg","overlays":["this.overlay_00DD783B_1006_37F0_4178_635050AF9A4C"],"frames":[{"cube":{"class":"ImageResource","levels":[{"rowCount":8,"height":4096,"url":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_0/{face}/0/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":48,"tags":"ondemand","width":24576},{"rowCount":4,"height":2048,"url":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_0/{face}/1/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":24,"tags":"ondemand","width":12288},{"rowCount":2,"height":1024,"url":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_0/{face}/2/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":12,"tags":"ondemand","width":6144},{"rowCount":1,"height":512,"url":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_0/{face}/3/{row}_{column}.jpg","class":"TiledImageResourceLevel","colCount":6,"tags":["ondemand","preload"],"width":3072}]},"class":"CubicPanoramaFrame","thumbnailUrl":"media/panorama_00F05883_1006_0890_41AA_28039B1E27DB_t.jpg"}],"data":{"label":"IMG_20250830_172644_00_001"},"label":trans('panorama_00F05883_1006_0890_41AA_28039B1E27DB.label')},{"id":"mainPlayList","items":[{"camera":"this.panorama_00F05883_1006_0890_41AA_28039B1E27DB_camera","media":"this.panorama_00F05883_1006_0890_41AA_28039B1E27DB","class":"PanoramaPlayListItem","player":"this.MainViewerPanoramaPlayer","begin":"this.setEndToItemIndex(this.mainPlayList, 0, 1)"},{"camera":"this.panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF_camera","media":"this.panorama_1E2CB1FD_1006_1870_4190_9ABA42B746BF","class":"PanoramaPlayListItem","end":"this.trigger('tourEnded')","player":"this.MainViewerPanoramaPlayer","begin":"this.setEndToItemIndex(this.mainPlayList, 1, 0)"}],"class":"PlayList"},{"class":"PanoramaCamera","id":"panorama_00F05883_1006_0890_41AA_28039B1E27DB_camera","enterPointingToHorizon":true,"initialPosition":{"pitch":0,"class":"PanoramaCameraPosition","yaw":0},"initialSequence":"this.sequence_1E3C5BFE_1006_0871_41AD_46FB9C65732F"},{"class":"PanoramaPlayer","touchControlMode":"drag_rotation","viewerArea":"this.MainViewer","arrowKeysAction":"translate","keepModel3DLoadedWithoutLocation":true,"mouseControlMode":"drag_rotation","displayPlaybackBar":true,"id":"MainViewerPanoramaPlayer","aaEnabled":true},{"height":"100%","toolTipPaddingLeft":6,"subtitlesFontColor":"#FFFFFF","playbackBarHeadShadowColor":"#000000","playbackBarHeadShadowHorizontalLength":0,"progressBarBackgroundColor":["#3399FF"],"progressBorderColor":"#000000","playbackBarHeadBackgroundColor":["#111111","#666666"],"toolTipBackgroundColor":"#F6F6F6","subtitlesTextShadowHorizontalLength":1,"progressBackgroundColor":["#000000"],"progressBottom":10,"surfaceReticleColor":"#FFFFFF","playbackBarBottom":5,"progressHeight":2,"data":{"name":"Main Viewer"},"subtitlesBottom":50,"playbackBarBackgroundColor":["#FFFFFF"],"toolTipPaddingTop":4,"subtitlesTop":0,"progressBorderSize":0,"subtitlesTextShadowColor":"#000000","progressBarBorderSize":0,"progressBarBorderRadius":2,"playbackBarHeight":10,"playbackBarHeadWidth":6,"propagateClick":false,"width":"100%","playbackBarProgressBorderSize":0,"toolTipPaddingBottom":4,"playbackBarBackgroundColorDirection":"vertical","subtitlesFontSize":"3vmin","playbackBarProgressBorderRadius":0,"playbackBarRight":0,"subtitlesTextShadowVerticalLength":1,"toolTipShadowColor":"#333138","progressLeft":"33%","surfaceReticleSelectionColor":"#FFFFFF","progressBorderRadius":2,"playbackBarHeadShadowOpacity":0.7,"subtitlesBackgroundOpacity":0.2,"subtitlesBorderColor":"#FFFFFF","playbackBarProgressBackgroundColor":["#3399FF"],"playbackBarProgressBackgroundColorRatios":[0],"playbackBarBorderColor":"#FFFFFF","subtitlesFontFamily":"Arial","playbackBarBorderRadius":0,"toolTipFontSize":"1.11vmin","playbackBarProgressBorderColor":"#000000","id":"MainViewer","vrPointerSelectionColor":"#FF6600","toolTipBorderColor":"#767676","vrPointerSelectionTime":2000,"subtitlesGap":0,"playbackBarHeadBorderColor":"#000000","subtitlesBackgroundColor":"#000000","playbackBarHeadShadowVerticalLength":0,"playbackBarHeadBorderRadius":0,"playbackBarBorderSize":0,"toolTipFontColor":"#606060","vrPointerColor":"#FFFFFF","toolTipPaddingRight":6,"class":"ViewerArea","minHeight":50,"playbackBarHeadShadowBlurRadius":3,"toolTipFontFamily":"Arial","minWidth":100,"playbackBarBackgroundOpacity":1,"progressBackgroundColorRatios":[0],"playbackBarLeft":0,"progressOpacity":0.7,"progressRight":"33%","progressBarBackgroundColorDirection":"horizontal","toolTipTextShadowColor":"#000000","progressBarBorderColor":"#000000","playbackBarHeadHeight":15,"playbackBarHeadBackgroundColorRatios":[0,1],"firstTransitionDuration":0,"playbackBarHeadBorderSize":0,"subtitlesTextShadowOpacity":1,"progressBarBackgroundColorRatios":[0],"playbackBarHeadShadow":true},{"data":{"hasPanoramaAction":true,"label":"Перейти Img_20250830_172644_00_001"},"class":"HotspotPanoramaOverlay","enabledInVR":true,"items":[{"pitch":-3.39,"distance":50,"class":"HotspotPanoramaOverlayImage","hfov":10.5,"yaw":-164.7,"data":{"label":"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 Img_20250830_172644_00_001"},"vfov":10.5,"rotationY":-56.67,"image":"this.res_02EE32E4_1007_F890_41A3_ABF1EAACAD65","roll":0.09,"scaleMode":"fit_inside"}],"maps":[],"id":"overlay_00CD9837_1006_37F0_419D_EFA26726BDBE","useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_013B4851_1006_37B0_4199_FAD3E7D892D5"]},{"class":"PanoramaCameraSequence","id":"sequence_1E43CBFF_1006_086F_41A0_CFF81E35F4F9","movements":[{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":18.5,"easing":"cubic_in"},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":323},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":18.5,"easing":"cubic_out"}]},{"data":{"hasPanoramaAction":true,"label":"Перейти Img_20250830_173408_00_003"},"class":"HotspotPanoramaOverlay","enabledInVR":true,"items":[{"pitch":-12.52,"distance":50,"class":"HotspotPanoramaOverlayImage","scaleMode":"fit_inside","yaw":131.98,"data":{"label":"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 Img_20250830_173408_00_003"},"vfov":10.5,"hfov":10.5,"image":"this.res_02EE32E4_1007_F890_41A3_ABF1EAACAD65"}],"maps":[],"id":"overlay_00DD783B_1006_37F0_4178_635050AF9A4C","useHandCursor":true,"areas":["this.HotspotPanoramaOverlayArea_036EC496_1006_38B0_41AE_79B46E523541"]},{"class":"PanoramaCameraSequence","id":"sequence_1E3C5BFE_1006_0871_41AD_46FB9C65732F","movements":[{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":18.5,"easing":"cubic_in"},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":323},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":18.5,"easing":"cubic_out"}]},{"id":"res_02EE32E4_1007_F890_41A3_ABF1EAACAD65","levels":[{"height":151,"url":"media/res_02EE32E4_1007_F890_41A3_ABF1EAACAD65_0.png","class":"ImageResourceLevel","width":151}],"class":"ImageResource"},{"click":"this.setPlayListSelectedIndex(this.mainPlayList, 0)","class":"HotspotPanoramaOverlayArea","displayTooltipInTouchScreens":true,"id":"HotspotPanoramaOverlayArea_013B4851_1006_37B0_4199_FAD3E7D892D5","mapColor":"any"},{"click":"this.setPlayListSelectedIndex(this.mainPlayList, 1)","class":"HotspotPanoramaOverlayArea","displayTooltipInTouchScreens":true,"id":"HotspotPanoramaOverlayArea_036EC496_1006_38B0_41AE_79B46E523541","mapColor":"any"}],"height":"100%","children":["this.MainViewer"]};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs, script['data']['createQuizConfig'] = function () {
    let a = {}, b = this['get']('data')['translateObjs'];
    for (const c in translateObjs) {
        if (!b['hasOwnProperty'](c))
            b[c] = translateObjs[c];
    }
    return a;
}, TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device.js.map
})();
//Generated with v2026.0.5, Sat Mar 21 2026