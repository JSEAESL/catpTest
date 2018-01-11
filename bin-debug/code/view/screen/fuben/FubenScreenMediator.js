/**
 *   @author qinajun, wf
 *   @desc 副本界面Mediator
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mx;
(function (mx) {
    var FubenScreenMediator = (function (_super) {
        __extends(FubenScreenMediator, _super);
        function FubenScreenMediator(viewComponent) {
            var _this = _super.call(this, FubenScreenMediator.NAME, viewComponent) || this;
            _this._cur_type = 1; //1简单 2精英
            _this._scene = 1; //1 剧情界面 2关卡界面
            _this._cur_chapter_id = 0; //当期章节号
            _this.init_view();
            if (_this.fproxy.jump) {
                _this.restore_view();
            }
            else {
                _this._cur_type = _this.fproxy.stage_type ? _this.fproxy.stage_type : 1; //普通剧情
                _this.view.type_list.selectedIndex = _this._cur_type - 1;
                _this.fresh_screen();
            }
            _this.init_listener();
            var gProxy = (_this.facade.retrieveProxy(mx.GameProxy.NAME));
            var lv = gProxy.user_lv;
            if (lv < 11 || _this._scene != 1 || !mx.Tools.can_local_s) {
                return _this;
            }
            if (mx.Tools.check_user_locals(mx.MX_COMMON.MX_JYFB)) {
                _this.sendNotification(mx.MX_NOTICE.OPEN_GUIDE, "jyfb");
            }
            return _this;
        }
        FubenScreenMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "v_fb_tz"://挑战
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FBTZhanAlert.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CHANGE_QUEUE, "team_id": this.fproxy.curr_team
                    });
                    break;
                case "s_fb_jy"://精英FB
                    var list = this.view.type_list;
                    var evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                    var tar = list.getChildAt(1);
                    evt.item = tar.data;
                    list.dispatchEvent(evt);
                    list.selectedIndex = 1;
                    break;
                case "v_rw_gb"://任务关闭
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskReward.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.TaskView.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                    break;
            }
        };
        Object.defineProperty(FubenScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FubenScreenMediator.prototype, "fproxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        FubenScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            view.ef_g.removeChildren();
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.type_list.dataProvider = null;
            view.fuben_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.fuben_list.dataProvider = null;
            this.fproxy.set_jump(false);
            this.fproxy.set_pop_jump(false);
            this.fproxy.set_stage_type(1);
        };
        FubenScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_FUBEN,
                mx.MX_NOTICE.FRESH_FUBEN_STAGE,
                mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER,
                mx.MX_NOTICE.GUIDE_INFO,
                mx.MX_NOTICE.OPEN_TASK,
                mx.MX_NOTICE.MAINTASK_FUBEN,
            ];
        };
        FubenScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_FUBEN:
                    this.init_tab();
                    this.init_stage_list();
                    break;
                case mx.MX_NOTICE.FRESH_FUBEN_STAGE:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FUBEN_STAGE_LIST,
                        "chapter": this._cur_chapter_id,
                        "difficult": this._cur_type,
                    });
                    break;
                case mx.MX_NOTICE.UNLOCK_FUBEN_CHAPTER:
                    this.show_ef();
                    break;
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
                case mx.MX_NOTICE.OPEN_TASK:
                    gproxy.check_task_id();
                    break;
                case mx.MX_NOTICE.MAINTASK_FUBEN:
                    var chapter_list = this._cur_type == 1 ? this.fproxy.easy_chapter_list : this.fproxy.hard_chapter_list;
                    var len = chapter_list.length;
                    if (data <= len - 1) {
                        this.change_scene({ "chapter_id": data });
                    }
                    else {
                        var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'ChapterID', data);
                        var kqlv = Number(stage.UnlockLevel);
                        var str = gproxy.user_lv >= kqlv ? mx.Lang.fb026 : mx.Tools.format(mx.Lang.fb024, kqlv);
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                    }
                    break;
                default:
                    break;
            }
        };
        FubenScreenMediator.prototype.init_view = function () {
            var view = this.view;
            this.init_tab();
            view.type_list.selectedIndex = 0;
            view.back_b.set_ssres("back_png");
        };
        FubenScreenMediator.prototype.init_tab = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var lv = gproxy.user_lv;
            var arr = ["ptjqing"];
            if (lv > 10) {
                arr = ["ptjqing", "jyjqing"];
            }
            var item_arr = [];
            for (var k in arr) {
                var type = arr[k];
                item_arr.push({
                    "up": type + "1_png",
                    "down": type + "2_png",
                    "type": parseInt(k) + 1,
                    "tishi": this.fproxy.hongdian_flag[Number(k)]
                });
            }
            this.view.type_list.dataProvider = new eui.ArrayCollection(item_arr);
        };
        /*----------还原界面-----------*/
        FubenScreenMediator.prototype.restore_view = function () {
            var proxy = this.fproxy;
            var cid = 0;
            cid = Number(proxy.stage_id);
            var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'id', cid);
            this._cur_type = parseInt(stage.Difficulty);
            var chapter_list = this._cur_type == 1 ? proxy.easy_chapter_list : proxy.hard_chapter_list;
            var len = chapter_list.length;
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var lv = gproxy.user_lv;
            var lvapi = mx.ApiTool.getAPINode(mx.MX_APINAME.LEVEL, 'Chapter', stage.ChapterID);
            if ((lvapi && lvapi.id > lv) || stage.ChapterID > len) {
                proxy.set_pop_jump(false);
                proxy.set_jump(false);
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": stage.ChapterID > len ? mx.Lang.fb022 : mx.Lang.fb023 });
                //this._cur_type = proxy.stage_type ? proxy.stage_type : 1;//普通剧情
                this.view.type_list.selectedIndex = this._cur_type - 1;
                this._cur_chapter_id = len;
                this.fresh_screen();
                return;
            }
            this.change_scene({ "chapter_id": stage.ChapterID }, true);
            this.init_stage_list();
        };
        /*----------监听事件初始化-----------*/
        FubenScreenMediator.prototype.init_listener = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_click, this);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.fuben_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
        };
        /*----------点击事件-----------*/
        FubenScreenMediator.prototype.back_click = function (evt) {
            this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.FBTZhanAlert.S_NAME); //??
            if (this._scene == 1) {
                var p_name = mx.FubenScreen.P_NAME;
                if (p_name) {
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, p_name);
                    mx.FubenScreen.P_NAME = null;
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
                }
            }
            else {
                this.fresh_screen();
            }
        };
        FubenScreenMediator.prototype.list_click = function (e) {
            var cd = e.item;
            if (!cd.suo) {
                if (this._scene == 2) {
                    if (parseInt(cd.state) == -1) {
                        return;
                    }
                    this.fproxy.set_curr_fuben(cd);
                    //挑战弹窗
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FBTZhanAlert.S_NAME,
                        "param": cd
                    });
                }
                else {
                    this.change_scene(cd);
                }
            }
            else {
                if (this._scene == 1) {
                    var stage = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, 'ChapterID', cd.chapter_id);
                    var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    var kqlv = Number(stage.UnlockLevel);
                    var str = gproxy.user_lv >= kqlv ? mx.Lang.fb026 : mx.Tools.format(mx.Lang.fb024, kqlv);
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                }
                else {
                    this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb036 });
                }
            }
        };
        //切换成list处理，切换普通|精英副本
        FubenScreenMediator.prototype.type_click = function (e) {
            if (e === void 0) { e = null; }
            var c_n = e.item.type;
            if (this._cur_type == c_n) {
                return;
            }
            this._cur_type = c_n;
            this.fresh_screen();
        };
        //刷新副本列表界面
        FubenScreenMediator.prototype.fresh_screen = function () {
            this._scene = 1;
            this.change_pos(); //切换显示及列表位置
            var view = this.view;
            view.name_p.source = "jqing_png";
            var list = view.fuben_list;
            //获取不同的章节
            var chapter_list = this._cur_type == 1 ? this.fproxy.easy_chapter_list : this.fproxy.hard_chapter_list;
            if (this.fproxy.stage_list.length && this.fproxy.stage_list[0].chapter == chapter_list[chapter_list.length - 1]) {
                var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "ChapterID", chapter_list[chapter_list.length - 1], "Difficulty", this._cur_type);
                if (apis.length == this.fproxy.stage_list.length) {
                    if (this.fproxy.stage_list[0].state > 0) {
                        this.fproxy.hongdian_flag[this._cur_type - 1] = 0;
                    }
                }
            }
            this.init_tab();
            //初始化list
            var max_len = 14; //???
            var len = chapter_list.length;
            if (typeof len != "undefined") {
                var str = this._cur_type == 1 ? "jq" : "jy";
                var item_info = [];
                for (var i = 0; i < max_len; ++i) {
                    item_info.push({
                        "id": i + 1,
                        "bg": str + (i % 10 + 1) + "_png",
                        "chapter_id": i + 1,
                        "chapter": mx.Tools.format(mx.Lang.fb001, i + 1),
                        "chapter_name": mx.Lang.fb016[i],
                        "suo": i > len - 1,
                        "type": this._cur_type,
                        "hongdian": i == len - 1 && this.fproxy.hongdian_flag[this._cur_type - 1]
                    });
                }
                view.fuben_scroller.stopAnimation();
                list.itemRenderer = mx.ChapterItemRender;
                list.dataProvider = new eui.ArrayCollection(item_info);
                if (len > 3) {
                    view.fuben_list.validateNow();
                    if (len == max_len) {
                        view.fuben_scroller.viewport.scrollV = 215 * (len - 4);
                    }
                    else {
                        view.fuben_scroller.viewport.scrollV = 215 * (len - 3);
                    }
                }
            }
            else {
                list.dataProvider = null;
            }
        };
        /*------------剧情、关卡来回切换时，位置变化-------------*/
        FubenScreenMediator.prototype.change_pos = function () {
            var view = this.view;
            var flag = this._scene == 1;
            var lay = view.fuben_list.layout;
            view.type_list.visible = flag;
            view.jqing2_g.visible = !flag;
            view.bg.source = !flag ? 'listBG_jpg' : (this._cur_type == 1 ? 'listBG_jpg' : 'jyfbbg_png');
            view.fuben_scroller.top = flag ? 200 : 177;
            lay.paddingTop = flag ? 0 : 18;
            view.fuben_list.validateNow();
            var list = view.fuben_list;
            list.dataProvider = null;
            list.itemRenderer = null;
        };
        /*------------剧情切换到关卡-------------*/
        FubenScreenMediator.prototype.change_scene = function (data, skip) {
            this._scene = 2;
            this.change_pos();
            var cid = Number(data.chapter_id);
            cid = this.fproxy.check_open_id(cid, this._cur_type);
            this._cur_chapter_id = cid;
            var view = this.view;
            view.name_p.source = this._cur_type == 1 ? "jqing_png" : "jyjqing_png";
            view.fuben_list.validateNow();
            var str = mx.Tools.format(mx.Lang.fb001, cid);
            view.chapter_name_t.text = str + "  " + mx.Lang.fb016[cid - 1];
            if (skip) {
                this.sendNotification(mx.MX_NOTICE.FRESH_FUBEN);
                return;
            }
            this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FUBEN_STAGE_LIST,
                "chapter": cid,
                "difficult": this._cur_type,
            });
        };
        //初始化某个章节对应的所有关卡
        FubenScreenMediator.prototype.init_stage_list = function () {
            var view = this.view;
            var data = this.fproxy.stage_list;
            var len = data.length;
            var list = view.fuben_list;
            var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "ChapterID", this._cur_chapter_id, "Difficulty", this._cur_type);
            var max_len = apis.length;
            if (len) {
                var jump_id = 0;
                var item_info = [];
                var jump_stage = this.fproxy.stage_id;
                if (Number(this.fproxy.stage_id) == 0) {
                    jump_stage = this.fproxy.cur_stage;
                }
                var list_arr = this._cur_type == 1 ? this.fproxy.easy_chapter_list : this.fproxy.hard_chapter_list;
                var flag = list_arr[list_arr.length - 1] == this._cur_chapter_id;
                for (var i = 0; i < max_len; ++i) {
                    var unit = void 0;
                    if (i < len) {
                        data[i]["chapter"] = this._cur_chapter_id;
                        data[i]["hongdian"] = i == 0 && this.fproxy.hongdian_flag[this._cur_type - 1] && flag;
                        unit = data[i];
                        if (unit.stage == jump_stage) {
                            jump_id = len - i;
                        }
                    }
                    else {
                        unit = {
                            "cishu": 999,
                            "max": 999,
                            "purchase": 0,
                            "stage": apis[0].id + i,
                            "state": -10,
                            "chapter": this._cur_chapter_id,
                            "hongdian": false
                        };
                        if (unit.stage == jump_stage) {
                            jump_id = i;
                        }
                    }
                    unit.replay = apis[unit.stage - apis[0].id].KeyStage == 1;
                    unit.suo = i > len - 1;
                    item_info.push(unit);
                }
                item_info.sort(function (a, b) {
                    return a.stage - b.stage;
                });
                //list初始化
                list.itemRenderer = mx.StageItemRender;
                list.dataProvider = new eui.ArrayCollection(item_info);
                if (len > 3) {
                    view.fuben_list.validateNow();
                    if (this.fproxy.jump) {
                        view.fuben_scroller.viewport.scrollV = Math.max(0, 190 * (jump_id - 3));
                    }
                    else if (len == max_len) {
                        if (jump_id == 0) {
                            view.fuben_scroller.viewport.scrollV = 190 * (len - 4);
                        }
                        else {
                            view.fuben_scroller.viewport.scrollV = Math.max(0, 190 * (jump_id - 3));
                        }
                    }
                    else {
                        if (jump_id == 0) {
                            view.fuben_scroller.viewport.scrollV = 190 * (len - 3);
                        }
                        else {
                            view.fuben_scroller.viewport.scrollV = Math.max(0, 190 * (jump_id - 3));
                        }
                    }
                }
            }
            else {
                list.dataProvider = null;
            }
            var proxy = this.fproxy;
            if (proxy.pop_jump) {
                proxy.set_pop_jump(false);
                var cid = 0;
                cid = Number(proxy.stage_id);
                var cd = proxy.stage_info(cid);
                if (cd) {
                    proxy.set_curr_fuben(cd);
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FBTZhanAlert.S_NAME,
                        "param": cd
                    });
                }
            }
        };
        //章节解锁动画
        FubenScreenMediator.prototype.show_ef = function () {
            var view = this.view;
            view.ef_g.removeChildren();
            var yy = mx.Tools.screen_height * 0.45;
            var hzcg2 = new mx.GeneralEffect("hzcg2");
            hzcg2.x = 240;
            hzcg2.y = yy;
            hzcg2.play_by_times(1);
            hzcg2.set_retain(true);
            hzcg2.set_event(mx.MX_COMMON.MX_EFOVER);
            hzcg2.addEventListener(mx.MX_COMMON.MX_EFOVER, this.ef_over, this);
            view.ef_g.addChild(hzcg2);
            var xzj1 = new mx.GeneralEffect("xzj1");
            xzj1.x = 240;
            xzj1.y = yy;
            xzj1.play_by_times(1);
            xzj1.set_retain(true);
            view.ef_g.addChild(xzj1);
        };
        FubenScreenMediator.prototype.ef_over = function (e) {
            var view = this.view;
            e.currentTarget.removeEventListener(mx.MX_COMMON.MX_EFOVER, this.ef_over, this);
            var yy = mx.Tools.screen_height * 0.45;
            var hzcg3 = new mx.GeneralEffect("hzcg3");
            hzcg3.x = 240;
            hzcg3.y = yy;
            hzcg3.play_by_times(-1);
            hzcg3.set_retain(true);
            view.ef_g.addChildAt(hzcg3, 0);
            egret.setTimeout(function () {
                e.currentTarget.alpha = 0;
            }, this, 100);
            egret.setTimeout(function () {
                view.ef_g.removeChildren();
            }, this, 1300);
        };
        FubenScreenMediator.NAME = "FubenScreenMediator";
        return FubenScreenMediator;
    }(puremvc.Mediator));
    mx.FubenScreenMediator = FubenScreenMediator;
    __reflect(FubenScreenMediator.prototype, "mx.FubenScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=FubenScreenMediator.js.map