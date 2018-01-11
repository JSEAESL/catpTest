/**
*   @author mx,qianjun
*   @date 2016.9.8
*   @desc 劇情
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
    var JuqingScreen = (function (_super) {
        __extends(JuqingScreen, _super);
        function JuqingScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_chapter = 1;
            _this.cur_stage = 1;
            _this.cur_max_chpter = 6;
            _this.kai_new_chapter = false;
            _this.arr_temp = [];
            _this.juqing_pos = {
                3: { 1: { 'x': 367, 'y': 0 }, 2: { 'x': 150, 'y': 93 }, 3: { 'x': 417, 'y': 234 } },
                5: { 1: { 'x': 398, 'y': 0 }, 2: { 'x': 181, 'y': 93 }, 3: { 'x': 448, 'y': 232 }, 4: { 'x': 276, 'y': 329 }, 5: { 'x': 197, 'y': 542 } },
                8: { 1: { 'x': 411, 'y': 0 }, 2: { 'x': 194, 'y': 93 }, 3: { 'x': 461, 'y': 232 }, 4: { 'x': 247, 'y': 288 }, 5: { 'x': 451, 'y': 411 }, 6: { 'x': 386, 'y': 628 }, 7: { 'x': 165, 'y': 494 }, 8: { 'x': 167, 'y': 717 }, 9: { 'x': 386, 'y': 881 }, 10: { 'x': 169, 'y': 1019 }, 11: { 'x': 417, 'y': 1157 }, 12: { 'x': 443, 'y': 1399 }, 13: { 'x': 211, 'y': 1307 }, 14: { 'x': 260, 'y': 1551 } }
            };
            _this.old_sid = 0;
            _this.right_click = false;
            _this.cur_idx = 0;
            _this.stop_touch = false;
            return _this;
        }
        JuqingScreen.mx_support = function () {
            return [
                "assets.juqing",
                "api.VIP", "api.STAGE", "api.BATTLE", "api.QUALITYADD", "api.SKILLNEWGROUP", "api.SKILLNEW", "api.EQUIP",
            ];
        };
        Object.defineProperty(JuqingScreen.prototype, "fproxy", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                return (facade.retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JuqingScreen.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "s_fb_jy"://精英FB
                    tar = this.type_list.getChildAt(1);
                    break;
            }
            return tar;
        };
        JuqingScreen.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingScreenMediator(this));
            var view = this;
            var proxy = view.fproxy;
            view.name_g.visible = false;
            view.fresh_view();
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.charpter_click, this);
            view.fuben_list.itemRenderer = mx.JuqingStageRender;
            view.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.xjjli_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yljli_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fuben_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fuben_click, this);
            view.mrsc_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JuqingScreen.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingScreenMediator(this));
            var view = this;
            var proxy = view.fproxy;
            view.cur_chapter = proxy.cur_chapter;
            view.cur_max_chpter = Number(proxy.juqing_info.max);
            view.fresh_right();
            view.fresh_bottom();
            view.fresh_list();
            view.check_jump();
        };
        JuqingScreen.prototype.fresh_bottom = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingScreenMediator(this));
            var view = this;
            view.cur_max_chpter = Number(view.fproxy.juqing_info.max);
            var arr = [];
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            var lv = gproxy.user_lv;
            for (var i = 0; i < 7; ++i) {
                var chapter_info = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "chapterid", (Number(i) + 1));
                var unit = chapter_info[0].icon;
                var kaiqi = ((Number(i) + 1) <= view.cur_max_chpter);
                var state = '';
                var panluan = 0; //Math.floor(Math.random()*2);
                if (kaiqi) {
                    if (panluan) {
                        state = 'ypkuan_png';
                    }
                    else {
                        state = (Number(chapter_info[0].chapterid) == view.cur_max_chpter) ? 'zzzhong_png' : '';
                    }
                }
                arr.push({
                    "up": kaiqi ? (unit + "_png") : (unit + "3_png"),
                    "down": kaiqi ? (unit + "2_png") : (unit + "3_png"),
                    'chapter_id': chapter_info[0].chapterid,
                    'suo': Number(chapter_info[0].unlocklevel) > lv,
                    'kqlv': chapter_info[0].unlocklevel,
                    'state': state
                });
            }
            view.type_list.dataProvider = new eui.ArrayCollection(arr);
            view.type_list.selectedIndex = Number(view.cur_chapter) - 1;
            view.type_list.validateNow();
            if (!view.chapter_scro.viewport.scrollH) {
                if (view.cur_chapter >= 4) {
                    view.chapter_scro.viewport.scrollH = 310;
                }
                else if (view.cur_chapter < 4) {
                    view.chapter_scro.viewport.scrollH = 0;
                }
            }
        };
        JuqingScreen.prototype.check_jump = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingScreenMediator(this));
            var view = this;
            var proxy = view.fproxy;
            //跳转而来的弹窗是否打开
            if (proxy.pop_jump) {
                var gen_ef = this.ef_g.getChildByName("djmrgxiao");
                if (gen_ef) {
                    gen_ef.mx_stop();
                    gen_ef.on_remove();
                    this.ef_g.removeChild(gen_ef);
                }
                view.cur_stage = Number(proxy.cur_stage);
                for (var i in this.arr_temp) {
                    if (Number(this.arr_temp[i].stage == view.cur_stage)) {
                        this.cur_idx = this.arr_temp[i].order_id;
                        view.fuben_click({ "item": this.arr_temp[i] });
                        break;
                    }
                }
                view.fresh_bottom();
                proxy.set_pop_jump(false);
            }
        };
        JuqingScreen.prototype.show_avg = function () {
            //播放后续avg
            if (this.right_click) {
                this.right_click = false;
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", this.cur_stage);
            if (stage_api) {
                var jqid = (stage_api.jqid + '').split('|');
                if (jqid.length == 2) {
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": {
                                'stage': stage_api.id,
                                'jqid': stage_api.jqid,
                                'pass': 0,
                                'juqing': false //剧情
                            },
                            "type": "zhandou_after",
                            'only_play': true
                        }
                    });
                }
                else {
                    if (this.kai_new_chapter) {
                        this.kai_new_chapter = false;
                        this.unlock_chapter();
                    }
                    else {
                        this.go_to_task();
                    }
                }
            }
        };
        JuqingScreen.prototype.fresh_right = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.JuqingScreenMediator(this));
            var view = this;
            var proxy = view.fproxy;
            var tongguan_log = mx.Tools.arr2obj(proxy.juqing_info.data, 'stage');
            var chapter_info = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "chapterid", view.cur_chapter);
            //总星级
            var xji = 0;
            for (var i in proxy.juqing_info.data) {
                if (Number(proxy.juqing_info.data[i].state) > 0) {
                    xji += Number(proxy.juqing_info.data[i].state);
                }
            }
            view.xji_bt.text = xji + '';
            //税收相关
            var lq_log = true;
            var sshou_res = '';
            if (Number(proxy.juqing_info.daily)) {
                sshou_res = 'ckjli_png';
            }
            else {
                if (tongguan_log[chapter_info[chapter_info.length - 1].id] && Number(tongguan_log[chapter_info[chapter_info.length - 1].id].state != 0)) {
                    sshou_res = 'jqlqjli_png';
                }
                else {
                    sshou_res = 'ckjli_png';
                }
            }
            view.mrsc_b.set_ssres(sshou_res);
            //游历宝箱
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var vip_api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIP, "id", gproxy.user_vip);
            var jdu = Number(proxy.juqing_info.has);
            view.jdu_bt.text = jdu + "x" + vip_api.youli;
            view.jdu_bar.set_res({ "up": "jdtshang_png", "down": "jdtxia_png" });
            view.jdu_bar.value = (jdu / vip_api.youli) * 100;
        };
        JuqingScreen.prototype.fresh_list = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var stage_api = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "chapterid", view.cur_chapter);
            this.arr_temp = [];
            var fproxy = this.fproxy;
            var tongguan_log = mx.Tools.arr2obj(fproxy.juqing_info.data, 'stage');
            // let temp = [3,7,10,11,12,13,14];
            var total_stage = stage_api.length;
            var cur_max_id = fproxy.juqing_info.data.length;
            var cur_idx = 1;
            for (var i = 0; i < total_stage; ++i) {
                var state = '';
                var kaiqi = ((Number(i) + 1) <= cur_max_id);
                var new_flag = (Number(i) + 1) == cur_max_id && Number(fproxy.juqing_info.max) == view.cur_chapter && tongguan_log[stage_api[i].id].state == 0;
                if (new_flag) {
                    cur_idx = Number(i) + 1;
                }
                this.arr_temp.push({
                    'chapter': view.cur_chapter,
                    'order_id': Number(i) + 1,
                    'stage': stage_api[i].id,
                    'jqid': stage_api[i].jqid,
                    'kaiqi': kaiqi,
                    'suo': !kaiqi,
                    'new': new_flag,
                    'pass': kaiqi ? tongguan_log[stage_api[i].id].state : 0,
                    'juqing': Number(stage_api[i].type) == 2 //剧情
                });
            }
            var pos_type = (total_stage == 3 ? (3) : (total_stage < 8 ? 5 : 8));
            var layout = new mx.MXArithmeticLayout({
                "type": "juqing",
                "pos_type": pos_type
            });
            view.fuben_list.layout = layout;
            if (total_stage == 3) {
                view.fuben_scroller.top = 335;
            }
            else if (total_stage == 5) {
                view.fuben_scroller.top = 212;
            }
            else {
                view.fuben_scroller.top = 106;
            }
            var group = view["lxian" + pos_type + "_g"];
            view.lxian3_g.visible = view.lxian5_g.visible = view.lxian8_g.visible = false;
            group.visible = true;
            for (var i = 0; i < group.numElements; ++i) {
                var ui = group.getChildAt(i);
                ui.visible = i < (total_stage - 1);
                var str = ui.source.split('2');
                if (!str[1]) {
                    str = ui.source.split('1');
                }
                ui.source = str[0] + ((Number(i) < (cur_max_id - 1) ? '2' : '1')) + str[1];
            }
            view.fuben_scroller.stopAnimation();
            var hh = mx.Tools.screen_height; //实际屏幕高度
            var sh = hh - view.fuben_scroller.top - 180; //滑动的可视区域
            var curh = this.juqing_pos[pos_type][cur_idx].y + 172;
            var ks_h = this.juqing_pos[pos_type][this.arr_temp.length].y + 172;
            var height = 0;
            if (curh > sh) {
                height = ks_h - sh;
            }
            // if(cur_idx < 9){
            //     height = 0;
            // }
            // else if(cur_idx < 13){
            //     height = 580;
            // }
            // else{
            //     height = 640;
            // }
            view.fuben_scroller.viewport.scrollV = height;
            view.fuben_list.dataProvider = new eui.ArrayCollection(this.arr_temp);
            view.fuben_list.selectedIndex = 0;
            view.fuben_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fuben_click, this);
            //
            view.fuben_list.height = ks_h;
            // let las_render = + 172;
            // let cur_hh = 0;
            // view.fuben_list.height = total_stage  < 8 ? 714 : 1724;
        };
        JuqingScreen.prototype.change_click = function (e) {
            var view = this;
            //点击后关闭光效
            var gen_ef = this.ef_g.getChildByName("djmrgxiao");
            if (gen_ef) {
                gen_ef.mx_stop();
                gen_ef.on_remove();
                this.ef_g.removeChild(gen_ef);
            }
            if (view.stop_touch) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if ((view.cur_chapter == 1 && e.currentTarget == view.left_b)) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": "陛下，疆土已到尽头，请往回走~" });
                return;
            }
            var chapter = e.currentTarget == view.left_b ? Math.max(0, view.cur_chapter - 1) : Math.min(view.type_list.dataProvider.length, view.cur_chapter + 1);
            var data = view.type_list.dataProvider.getItemAt(chapter - 1);
            if (data.suo) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.fb024, data.kqlv) });
                view.type_list.selectedIndex = view.old_sid;
                return;
            }
            if (chapter > view.cur_max_chpter) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb026 });
                view.type_list.selectedIndex = view.old_sid;
                return;
            }
            view.cur_chapter = chapter;
            view.old_sid = view.type_list.selectedIndex;
            view.type_list.selectedIndex = chapter - 1;
            this.fproxy.cur_chapter = chapter;
            view.type_list.validateNow();
            if (view.cur_chapter > 5) {
                view.chapter_scro.viewport.scrollH = 181;
            }
            else if (view.cur_chapter < 3) {
                view.chapter_scro.viewport.scrollH = 0;
            }
            view.cur_stage = 1;
            view.cur_idx = 1;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_JUQING_INFO,
                'chapter': this.fproxy.cur_chapter
            });
        };
        JuqingScreen.prototype.charpter_click = function (e) {
            var view = this;
            //点击后关闭光效
            var gen_ef = this.ef_g.getChildByName("djmrgxiao");
            if (gen_ef) {
                gen_ef.mx_stop();
                gen_ef.on_remove();
                this.ef_g.removeChild(gen_ef);
            }
            if (view.stop_touch) {
                return;
            }
            var sel_chapter = e.item.chapter_id;
            var facade = mx.ApplicationFacade.getInstance();
            if (sel_chapter == view.cur_chapter) {
                return;
            }
            if (e.item.suo) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.fb024, e.item.kqlv) });
                view.type_list.selectedIndex = view.old_sid;
                return;
            }
            if (sel_chapter > view.cur_max_chpter) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb026 });
                view.type_list.selectedIndex = view.old_sid;
                return;
            }
            view.old_sid = view.type_list.selectedIndex;
            view.cur_chapter = sel_chapter;
            this.fproxy.cur_chapter = sel_chapter;
            view.type_list.validateNow();
            if (sel_chapter >= 4) {
                view.chapter_scro.viewport.scrollH = 310;
            }
            else if (sel_chapter < 4) {
                view.chapter_scro.viewport.scrollH = 0;
            }
            view.cur_stage = 1;
            view.cur_idx = 1;
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_JUQING_INFO,
                'chapter': this.fproxy.cur_chapter
            });
        };
        JuqingScreen.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            if (view.stop_touch) {
                return;
            }
            view.right_click = true;
            switch (e.currentTarget) {
                case view.xjjli_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JuqingXingjiAlert.S_NAME, "param": view.cur_chapter });
                    break;
                case view.yljli_b:
                    var jdu = Number(this.fproxy.juqing_info.has);
                    if (jdu) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JUQING_YLI_LQ,
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fb040 });
                    }
                    break;
                case view.sm_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JqsmingAlert.S_NAME });
                    break;
                case view.mrsc_b:
                    var str = view.mrsc_b.res_name;
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JuqingXunshiAlert.S_NAME });
                    break;
            }
        };
        JuqingScreen.prototype.fuben_click = function (e) {
            var view = this;
            if (view.stop_touch) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.kaiqi) {
                this.cur_stage = e.item.stage;
                this.fproxy.cur_stage = e.item.stage;
                this.cur_idx = Number(e.item.order_id);
                //剧情关卡
                if (e.item.juqing) {
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": e.item,
                            "type": "zhandou_before",
                            'only_play': true
                        }
                    });
                }
                else {
                    //3星通关不可挑战只能查看剧情
                    if (Number(e.item.pass) == 3) {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AVGView.S_NAME,
                            "param": {
                                "cd": e.item,
                                "type": "zhandou_before",
                                'only_play': true
                            }
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.JuqingTzAlert.S_NAME, "param": e.item });
                    }
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": "请先完成之前的关卡~" });
            }
        };
        JuqingScreen.prototype.go_to_task = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            if (gproxy.task_id) {
                var proxy = this.fproxy;
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", gproxy.task_id);
                var stage_id = api.finish_parameter.split('|');
                api = null;
                var cid = Number(stage_id[0]);
                if (proxy.result == 1 && cid == Number(proxy.cur_stage)) {
                    this.kai_new_chapter = false;
                    var finish_parameter = cid + "|1";
                    var info = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, 'finish_parameter', finish_parameter);
                    if (info && gproxy.main_task_info[info.id]) {
                        gproxy.main_task_info[info.id].state = 1;
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.TaskView.S_NAME,
                            "param": { "type": "main" },
                        });
                    }
                    info = null;
                    gproxy.set_task_id(0);
                }
            }
        };
        JuqingScreen.prototype.close_self = function () {
            var view = this;
            if (view.stop_touch) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME);
        };
        JuqingScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            egret.Tween.removeTweens(view.ef_g);
            view.ef_g.removeChildren();
            view.name_g.removeChildren();
            //this.tabmenu.on_remove();
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.charpter_click, this);
            view.type_list.dataProvider = null;
            view.fuben_list.dataProvider = null;
            view.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.change_click, this);
            view.xjjli_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.yljli_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.fuben_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.fuben_click, this);
            view.mrsc_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JuqingScreenMediator.NAME);
        };
        JuqingScreen.prototype.unlock_chapter = function () {
            var view = this;
            view.stop_touch = true;
            view.rect_bg.visible = true;
            var proxy = view.fproxy;
            var max_chapter = proxy.juqing_info.max;
            var chapter_info = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "chapterid", max_chapter);
            view.name_p.source = "kq" + chapter_info[0].icon + "_png";
            view.name_g.scaleX = view.name_g.scaleY = 0.5;
            view.name_g.visible = true;
            egret.Tween.get(view.name_g).to({ 'scaleX': 1, 'scaleY': 1, 'horizontalCenter': 0, 'verticalCenter': 0 }, 100).call(function () {
                var new_ef = new mx.GeneralEffect("zjkqdhua");
                new_ef.name = "zjkqdhua";
                new_ef.play_by_times(1);
                new_ef.set_retain(true);
                new_ef.verticalCenter = -330;
                new_ef.horizontalCenter = -220;
                this.name_g.addChild(new_ef);
            }, this).wait(2000).to({ 'alpha': 0 }, 30 * mx.FightView.FLASH_DESC).call(function () {
                view.rect_bg.visible = false;
                var new_ef = new mx.GeneralEffect("djmrgxiao");
                new_ef.name = "djmrgxiao";
                new_ef.play_by_times(-1);
                var baseui = view.type_list.getChildAt(max_chapter - 1);
                var newpoint = this.type_list.localToGlobal(baseui.x, baseui.y);
                new_ef.left = newpoint.x - 5;
                new_ef.bottom = 150;
                this.ef_g.addChild(new_ef);
                view.name_g.scaleX = view.name_g.scaleY = 0.5;
                view.name_g.alpha = 1;
                view.name_g.visible = false;
                view.stop_touch = false;
                this.go_to_task();
            }, this);
        };
        JuqingScreen.S_NAME = "JuqingScreen";
        return JuqingScreen;
    }(mx.BasicView));
    mx.JuqingScreen = JuqingScreen;
    __reflect(JuqingScreen.prototype, "mx.JuqingScreen");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingScreen.js.map