/**
 *   @author cy
 *   @date 2017.4.22
 *   @desc 家族成员界面 Mediator
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
    var UnionMemberScreenMediator = (function (_super) {
        __extends(UnionMemberScreenMediator, _super);
        function UnionMemberScreenMediator(viewComponent) {
            var _this = _super.call(this, UnionMemberScreenMediator.NAME, viewComponent) || this;
            _this.cur_index = 0;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(UnionMemberScreenMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        UnionMemberScreenMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.FRESH_CSCREEN,
                mx.MX_NOTICE.UPDATE_FRIEND,
                mx.MX_NOTICE.TIME_TICK,
            ];
        };
        UnionMemberScreenMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.FRESH_CSCREEN:
                    this.set_list(data);
                    break;
                case mx.MX_NOTICE.UPDATE_FRIEND:
                    this.set_avatar();
                    break;
                case mx.MX_NOTICE.TIME_TICK:
                    this.set_time(data);
                    break;
            }
        };
        Object.defineProperty(UnionMemberScreenMediator.prototype, "proxy", {
            get: function () {
                return (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        UnionMemberScreenMediator.prototype.init_view = function () {
            var view = this.view;
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwsm_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.caozuo_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.haoyou_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.top_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.shenhe_list.itemRenderer = mx.UnionMemberRender;
            view.shenhe_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.member_list.itemRenderer = mx.UnionMemberRender;
            view.member_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.caozuo_list.itemRenderer = mx.SSButtonRender;
            view.caozuo_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.caozuo_click, this);
            view.me_list.itemRenderer = mx.UnionMemberRender;
            view.me_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.fun_list.itemRenderer = mx.SSButtonRender;
            view.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
            view.pull_back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.member_list_group.bottom = 30;
            view.type_list.selectedIndex = 0;
            this.SINDEX = 0;
            this.start_time = new Date().getTime() / 1000;
            view.type_p.visible = view.type_list.visible = this.proxy.my_zhiwu == 1 || this.proxy.my_zhiwu == 2;
            //view.member_s.top = this.proxy.my_zhiwu == 1 || this.proxy.my_zhiwu == 2 ? 105 : 114;
            this.set_list();
        };
        UnionMemberScreenMediator.prototype.btn_click = function (e) {
            var view = this.view;
            switch (e.currentTarget) {
                case view.back_b:
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_INIT,
                    });
                    break;
                case view.zwsm_b:
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.UnionJoinKindAlert.S_NAME,
                        "param": 2
                    });
                    break;
                case view.caozuo_b:
                    if (e.currentTarget.res_name == "cyczaniu_png") {
                        view.caozuo_g.visible = true;
                        view.top_rect.touchEnabled = true;
                    }
                    else {
                        var p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_UNION_QUIT },
                                "param": mx.Lang.jz053
                            }
                        };
                        this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    }
                    break;
                case view.sliao_b:
                    if (mx.Tools.in_hmd(this.cur_member.user_id)) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan13 });
                    }
                    else {
                        mx.Tools.open_pri_chat({
                            "user_id": this.cur_member.user_id,
                            "avatar": "tx70_" + this.cur_member.avatar + "_png",
                            "name": view.name_t.text
                        });
                    }
                    break;
                case view.haoyou_b:
                    if (e.currentTarget.res_name == "jzschyou_png") {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FRIEND_REMOVE,
                            "to_id": this.cur_member.user_id
                        });
                    }
                    else if (e.currentTarget.res_name == "jzjwhyou_png") {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FRIEND_SQING,
                            "to_id": this.cur_member.user_id
                        });
                    }
                    break;
                case view.top_rect:
                    view.top_rect.touchEnabled = false;
                    view.caozuo_g.visible = false;
                    break;
                case view.sliao_b:
                    if (mx.Tools.in_hmd(this.cur_member.user_id)) {
                        this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan13 });
                    }
                    else {
                        mx.Tools.open_pri_chat({
                            "user_id": this.cur_member.user_id,
                            "avatar": "tx70_" + this.cur_member.avatar + "_png",
                            "name": this.cur_member.name
                        });
                    }
                    break;
                case view.pull_back_btn:
                    if (this.cur_index == 0) {
                        // this.cur_index = 1;
                        // view.pull_back_btn.set_ssres("lkai_png");
                        // view.member_list_group.right = -358;
                        egret.Tween.get(view.name_g).to({ "left": 204 }, 600);
                        egret.Tween.get(view.xx_ui).to({ "horizontalCenter": 0, "alpha": 1 }, 600);
                        egret.Tween.get(view.member_list_group).to({ "right": -358 }, 600).call(this.end_tween, this);
                    }
                    else {
                        // this.cur_index = 0;
                        // view.pull_back_btn.set_ssres("sqi_png");
                        // view.member_list_group.right = 0;
                        egret.Tween.get(view.name_g).to({ "left": 36 }, 600);
                        egret.Tween.get(view.xx_ui).to({ "horizontalCenter": -150, "alpha": 1 }, 600);
                        egret.Tween.get(view.member_list_group).to({ "right": 0 }, 600).call(this.end_tween, this);
                    }
                    break;
            }
        };
        UnionMemberScreenMediator.prototype.end_tween = function () {
            var view = this.view;
            egret.Tween.removeTweens(view.member_list_group);
            egret.Tween.removeTweens(view.xx_ui);
            if (this.cur_index == 0) {
                this.cur_index = 1;
                view.pull_back_btn.set_ssres("lkai_png");
            }
            else {
                this.cur_index = 0;
                view.pull_back_btn.set_ssres("sqi_png");
            }
        };
        UnionMemberScreenMediator.prototype.type_click = function (e) {
            if (e.currentTarget.selectedIndex != this.SINDEX) {
                this.set_list();
                this.SINDEX = e.currentTarget.selectedIndex;
                if (this.SINDEX != 0) {
                    this.view.zwsm_b.visible = false;
                }
                else {
                    this.view.zwsm_b.visible = true;
                }
            }
        };
        UnionMemberScreenMediator.prototype.member_click = function (e) {
            var view = this.view;
            view.caozuo_g.visible = false;
            this.proxy.cur_member = this.cur_member = e.item;
            if (e.target == view.me_list) {
                view.member_list.selectedIndex = -1;
            }
            else if (e.target == view.member_list) {
                view.me_list.selectedIndex = -1;
            }
            this.set_avatar();
        };
        UnionMemberScreenMediator.prototype.caozuo_click = function (e) {
            switch (e.item.bg) {
                case "zwrmaniu_png"://职务任命
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.UnionZhiWuAlert.S_NAME });
                    break;
                case "qljzaniu_png"://踢出家族
                    var p_d = void 0;
                    if (this.proxy.my_zhiwu == 1 && Number(Main.USER_ID) == Number(this.cur_member.user_id)) {
                        if (this.proxy.union_member == 1) {
                            p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": { "t": mx.MX_NETS.CS_UNION_QUIT },
                                    "param": mx.Lang.jz065
                                }
                            };
                        }
                        else {
                            p_d = {
                                "name": mx.AlertView.S_NAME,
                                "param": {
                                    "param": mx.Lang.jz066
                                }
                            };
                        }
                    }
                    else {
                        p_d = {
                            "name": mx.AlertView.S_NAME,
                            "param": {
                                "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                "sdata_ok": { "t": mx.MX_NETS.CS_UNION_TIREN, "to_id": this.cur_member.user_id },
                                "param": mx.Lang.jz040
                            }
                        };
                    }
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
            }
        };
        UnionMemberScreenMediator.prototype.fun_click = function (e) {
            switch (e.item.bg) {
                case "zmcyuan_png"://招募
                    this.proxy.union_zhaomu();
                    break;
                case "jrfshi_png"://加入方式
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.UnionJoinKindAlert.S_NAME,
                        "param": 1
                    });
                    break;
                case "qbjjue_png"://全部拒绝
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_REFUSES
                    });
                    break;
            }
        };
        UnionMemberScreenMediator.prototype.set_list = function (data) {
            var view = this.view;
            var arr;
            var arr2 = [];
            arr = [{ "type_name": "cylbwzi_png" }, { "type_name": "jrsqwzi_png" }];
            switch (this.proxy.my_zhiwu) {
                case 1:
                    arr2 = [{ "bg": "zmcyuan_png" }, { "bg": "jrfshi_png" }, { "bg": "qbjjue_png" }];
                    break;
                case 2:
                    arr2 = [{ "bg": "zmcyuan_png" }, { "bg": "qbjjue_png" }];
                    break;
                default:
                    arr2 = [];
                    break;
            }
            view.fun_list.dataProvider = new eui.ArrayCollection(arr2);
            view.type_list.dataProvider = new eui.ArrayCollection(arr);
            view.me_list.selectedIndex = 0;
            view.top_rect.touchEnabled = false;
            var gproxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            var cproxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            view.member_t.text = this.proxy.union_member + "/" + this.proxy.union_max;
            view.caozuo_g.visible = view.shenhe_s.visible = view.fun_list.visible = view.member_s.visible = false;
            view.member_list_group.bottom = 30;
            if (view.type_list.selectedIndex == 0) {
                view.di_g.visible = view.member_s.visible = view.fenggexian.visible = view.me_list.visible = true;
                view.name_t.visible = view.name_p.visible = view.xx_ui.visible = true;
                var me_data = [{
                        "style": 1,
                        "vip": gproxy.user_vip,
                        "name": gproxy.user_name,
                        "avatar": gproxy.user_avatar,
                        "level": gproxy.user_lv,
                        "count": this.proxy.week_gongxian,
                        "lj_hy": this.proxy.total_gongxian,
                        "zhiwu": this.proxy.my_zhiwu,
                        "user_id": Main.USER_ID,
                        "dress": cproxy.dressed,
                        "enter": this.proxy.my_enter,
                        "bjk": cproxy.bjkid || 2009,
                        "selected": false
                    }];
                for (var k in this.proxy.union_mlist) {
                    if (this.proxy.union_mlist[k].user_id == me_data[0].user_id) {
                        me_data[0].login = this.proxy.union_mlist[k].login;
                        this.proxy.union_mlist[k].selected = true;
                        break;
                    }
                }
                if (data && data >= 1) {
                    var dataProvider = view.member_list.dataProvider;
                    var newdata2 = this.proxy.union_mlist[data];
                    dataProvider.replaceItemAt(newdata2, data);
                    var index = 0;
                    for (var j = data; j <= this.proxy.union_mlist.length - 1; j++) {
                        if (!this.proxy.union_mlist[j].beiti) {
                            index = j;
                            break;
                        }
                    }
                    if (!index) {
                        for (var j = data; j > 0; j--) {
                            if (!this.proxy.union_mlist[j].beiti) {
                                index = j;
                                break;
                            }
                        }
                    }
                    view.member_list.selectedIndex = index;
                    this.cur_member = this.proxy.union_mlist[index];
                    view.member_list.validateDisplayList();
                    view.me_list.selectedIndex = -1;
                }
                else {
                    view.me_list.dataProvider = new eui.ArrayCollection(me_data);
                    view.member_list.dataProvider = new eui.ArrayCollection(this.proxy.union_mlist);
                    this.cur_member = me_data[0];
                    view.member_list.selectedIndex = -1;
                }
                /*if(this.proxy.cur_member){
                    for(let k in this.proxy.union_mlist){
                        if(this.proxy.union_mlist[k].user_id == this.proxy.cur_member.user_id){
                            this.cur_member = this.proxy.union_mlist[k];
                            view.member_list.selectedIndex = Number(k);
                            break;
                        }
                    }
                }else{
                    view.member_list.selectedIndex = -1;
                }*/
                this.proxy.cur_member = this.cur_member;
                this.set_avatar();
                this.sendNotification(mx.MX_NOTICE.CLOSE_POP, mx.HouGongSJView.S_NAME);
            }
            else {
                view.member_list_group.bottom = 192;
                view.di_g.visible = view.member_s.visible = view.caozuo_g.visible = false;
                view.fenggexian.visible = view.me_list.visible = false;
                view.shenhe_s.visible = view.fun_list.visible = true;
                view.shenhe_list.dataProvider = new eui.ArrayCollection(this.proxy.shenqing_list);
                if (this.proxy.shenqing_list.length) {
                    view.name_t.visible = view.name_p.visible = view.xx_ui.visible = true;
                    view.shenhe_list.selectedIndex = 0;
                    this.proxy.cur_member = this.cur_member = this.proxy.shenqing_list[0];
                    this.set_avatar();
                }
                else {
                    view.name_t.visible = view.name_p.visible = view.xx_ui.visible = false;
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.HouGongSJView.S_NAME, "param": { "shijian": { 'msg_id': 4010 } }
                    });
                }
            }
        };
        UnionMemberScreenMediator.prototype.set_time = function (data) {
            var view = this.view;
            var member = this.cur_member;
            var now_time = Math.floor(new Date().getTime() / 1000);
            var time = Math.max(0, now_time - this.start_time) + (Number(member.login) || 0);
            var shijian;
            if (time < 3600) {
                shijian = Math.floor(time / 60) + mx.Lang.ld042;
            }
            else if (time < 3600 * 24) {
                shijian = Math.floor(time / 3600) + mx.Lang.ld041;
            }
            else if (time < 3600 * 24 * 7) {
                shijian = Math.floor(time / (3600 * 24)) + mx.Lang.ld040;
            }
            else {
                shijian = 1 + mx.Lang.ld039;
            }
            shijian += mx.Lang.jz036;
            var shijian2;
            var time2 = Number(member.enter);
            if (time2 == 0) {
                //9.14之前
                var nine_14 = 1505318400;
                var gap_time = now_time - nine_14;
                if (gap_time < 3600 * 34 * 7 * 4) {
                    shijian2 = Math.floor(gap_time / (3600 * 24 * 7)) + mx.Lang.ld039;
                }
                else if (gap_time < 3600 * 34 * 7 * 4 * 12) {
                    shijian2 = Math.floor(gap_time / (3600 * 24 * 7 * 4)) + mx.Lang.yue;
                }
                else {
                    shijian2 = 1 + mx.Lang.nian;
                }
                shijian2 += mx.Lang.jz036;
            }
            else {
                shijian2 = mx.Tools.format_time(time2, "nyr", 2);
            }
            view.caozuo_t.text = mx.Lang.jz030 + "：" + shijian + "\n" + mx.Lang.jz031 + "：" + member.lj_hy + "\n" + mx.Lang.jz222 + "：" + shijian2;
        };
        UnionMemberScreenMediator.prototype.set_avatar = function () {
            var view = this.view;
            var member = this.cur_member;
            for (var k in this.proxy.union_mlist) {
                if (this.proxy.union_mlist[k].user_id == member.user_id) {
                    this.proxy.union_mlist[k].selected = true;
                }
                else {
                    this.proxy.union_mlist[k].selected = false;
                }
            }
            view.member_list.dataProvider = new eui.ArrayCollection(this.proxy.union_mlist);
            view.name_t.text = member.name;
            this.set_time();
            switch (Number(member.guanxi)) {
                case 0:
                case 2:
                case 4:
                case 5:
                    view.haoyou_b.set_ssres("jzjwhyou_png");
                    break;
                case 1:
                case 3:
                    view.haoyou_b.set_ssres("jzschyou_png");
                    break;
            }
            view.haoyou_b.touchEnabled = true;
            view.sliao_b.visible = false;
            view.haoyou_b.visible = (Number(member.user_id) != Number(Main.USER_ID));
            if (this.proxy.sq_arr.indexOf(Number(member.user_id)) >= 0) {
                view.haoyou_b.set_ssres("qxsqing_png");
                view.haoyou_b.touchEnabled = false;
            }
            var c_cloth = [];
            for (var key in member.dress) {
                var cid = member.dress[key];
                var c_res = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTHRES, "cid", cid);
                var c_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", cid);
                for (var k in c_res) {
                    var res = c_res[k];
                    c_cloth.push({
                        "id": res.id,
                        "x": parseFloat(res.x),
                        "y": parseFloat(res.y),
                        "z": res.z ? parseFloat(res.z) : 0,
                        "type": c_info.type,
                    });
                }
                if (cid < 2000) {
                    view.xx_ui.set_avatar(cid);
                    view.xx_ui.set_scale(0.8); //需放入initView
                }
                else if (cid > 2000) {
                    view.bj_ui.set_bjk(cid);
                }
            }
            var arr = [];
            view.caozuo_b.visible = true;
            view.caozuo_b.set_ssres("cyczaniu_png");
            var zhiwu = this.proxy.my_zhiwu;
            if (zhiwu == 1) {
                arr = [{ "bg": "zwrmaniu_png" }, { "bg": "qljzaniu_png" }];
                if (Number(Main.USER_ID) == member.user_id) {
                    arr = [{ "bg": "zwrmaniu_png" }];
                }
            }
            else if (zhiwu == 2) {
                arr = [{ "bg": "qljzaniu_png" }];
                if (Number(Main.USER_ID) == member.user_id) {
                    arr = [];
                }
            }
            else if (zhiwu == 0 || zhiwu >= 3) {
                arr = [];
                if (Number(Main.USER_ID) == member.user_id) {
                    arr = [];
                }
            }
            view.caozuo_b.visible = arr.length > 0;
            // view.caozuo_t.left = NaN;
            // view.caozuo_t.horizontalCenter = NaN;
            // if(arr.length){
            //     view.caozuo_t.left = 90;
            // }else{
            //     view.caozuo_t.horizontalCenter = -96;
            // }
            view.caozuo_list.dataProvider = new eui.ArrayCollection(arr);
        };
        UnionMemberScreenMediator.prototype.onRemove = function () {
            var view = this.view;
            this.proxy.cur_member = null;
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.zwsm_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.caozuo_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.haoyou_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.top_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.type_list.dataProvider = null;
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.shenhe_list.dataProvider = null;
            view.shenhe_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.member_list.dataProvider = null;
            view.member_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.caozuo_list.dataProvider = null;
            view.caozuo_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.caozuo_click, this);
            view.me_list.dataProvider = null;
            view.me_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.member_click, this);
            view.fun_list.dataProvider = null;
            view.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
        };
        UnionMemberScreenMediator.NAME = "UnionMemberScreenMediator";
        return UnionMemberScreenMediator;
    }(puremvc.Mediator));
    mx.UnionMemberScreenMediator = UnionMemberScreenMediator;
    __reflect(UnionMemberScreenMediator.prototype, "mx.UnionMemberScreenMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionMemberScreenMediator.js.map