/**
 *   @author mx、cy、wf
 *   @date 2015.1.3
 *   @desc 其他用戶信息
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
    var OtherScreen = (function (_super) {
        __extends(OtherScreen, _super);
        function OtherScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.flag = false;
            return _this;
        }
        OtherScreen.mx_support = function () {
            return ["assets.user_main", "api.JINJI", "api.QINMI"];
        };
        //   private line:egret.Shape;
        OtherScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.OtherMediator(this));
            var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
            var view = this;
            var data = gProxy.info;
            //临时代码 2017.11.8 dyf
            var clothes = data.clothes;
            var c_aid, c_bid;
            for (var i in clothes) {
                if (clothes[i] < 2000) {
                    c_aid = clothes[i];
                }
                else if (clothes[i] < 3000) {
                    c_bid = clothes[i];
                }
            }
            if (!c_aid)
                c_aid = 1001;
            if (!c_bid)
                c_bid = 2001;
            view.xx_ui.set_avatar(c_aid);
            view.bj_ui.set_bjk(c_bid);
            view.vip_t.text = data.vip + "";
            view.rname_t.text = data.name; //view.name_t.text =
            view.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level);
            view.tx_p.source = "tx70_" + data.avatar + "_png";
            var dProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
            var isFriend = data.guanxi == 1 || data.guanxi == 3;
            var qinmi = Number(data.qinmi);
            view.friend_b.touchEnabled = false;
            if (!isFriend) {
                if (Number(data.apply)) {
                    view.friend_b.set_ssres("trxxhysqzhong_png");
                    view.friend_b.touchEnabled = true;
                }
                else if (qinmi >= 0) {
                    view.friend_b.set_ssres("trxxjwhyou_png");
                    view.friend_b.touchEnabled = true;
                }
                else {
                    this.set_qinmi(qinmi);
                }
            }
            else {
                this.set_qinmi(qinmi);
            }
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TAIMIAO, "id", data.xian_level);
            view.zhanghaoId_t.text = data.user_id + "";
            // view.xianpin_t.text = api ? api.name : Lang.tm017;
            view.huanghou_t.text = data.fenghou || mx.Lang.swkf;
            view.union_t.text = data.gh_name || mx.Lang.jz216;
            view.union_t.textColor = data.gh_name ? 0xa2788d : 0x9e9e9d;
            view.qianming_t.text = data.qianming || mx.Lang.myqm;
            view.level_g.left = view.rname_t.left + view.rname_t.width + 6;
            view.info_g.visible = true;
            view.detail_b.visible = false;
            view.bg.touchEnabled = false;
            view.sliao_b.visible = false;
            view.detail_b.horizontalCenter = 0;
            //this.init_ani();
            this.fresh_pinbi();
            view.cz_bg.touchEnabled = view.czuo_g.visible = false;
            //   this.line=this.set_line();
            view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hgong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hznv_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.friend_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.detail_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cz_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hdong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cyming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pbi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        OtherScreen.prototype.set_line = function () {
            var myShape = new egret.Shape();
            myShape.graphics.lineStyle(5, 0x9263B3, 1);
            myShape.graphics.moveTo(189, 887); //将画笔移动到起点位置
            myShape.graphics.lineTo(556, 887); //从起点位置划线到终点
            myShape.graphics.endFill();
            return myShape;
        };
        OtherScreen.prototype.set_qinmi = function (qinmi) {
            var gxibg = mx.Tools.qinmi_to_gxi(qinmi);
            this.friend_b.visible = false;
            this.czuo_bg.height = 130;
            this.cyming_b.top = 10;
            this.pbi_b.top = 76;
            var image = new eui.Image(gxibg);
            image.left = 166 + this.rname_t.width;
            image.top = 27;
            this.info_g.addChild(image);
        };
        OtherScreen.prototype.init_ani = function () {
            var _this = this;
            //后添加的动画
            this.ef.removeChildren();
            //水平方向的花瓣
            var flower_v = new mx.GeneralEffect("flower_v");
            flower_v.x = 80;
            flower_v.y = 180;
            flower_v.play_by_times(-1);
            this.ef.addChild(flower_v);
            egret.setTimeout(function () {
                var flower_v1 = new mx.GeneralEffect("flower_v");
                flower_v1.x = 200;
                flower_v1.y = 240;
                flower_v1.play_by_times(-1);
                _this.ef.addChild(flower_v1);
            }, this, 1000);
            egret.setTimeout(function () {
                var flower_v2 = new mx.GeneralEffect("flower_v");
                flower_v2.x = 360;
                flower_v2.y = 200;
                flower_v2.play_by_times(-1);
                _this.ef.addChild(flower_v2);
            }, this, 2000);
        };
        OtherScreen.prototype.fresh_pinbi = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var data = gProxy.info;
            var view = this;
            var hmdan = egret.localStorage.getItem("hmdan");
            var in_pinbi = false;
            if (!hmdan || hmdan == "") {
                var str = JSON.stringify([]);
                egret.localStorage.setItem("hmdan", str);
            }
            else {
                var arr = JSON.parse(hmdan);
                if (arr.indexOf(data.user_id) > -1) {
                    in_pinbi = true;
                }
            }
            view.pbi_b.set_ssres(in_pinbi ? "trjcpbi_png" : "trpbxxi_png");
        };
        OtherScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var lProxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
            var data = gProxy.info;
            var view = this;
            switch (evt.currentTarget) {
                case view.back_b://返回到进入界面。
                    this.flag = true; //
                    if (gProxy.pre_other_scene) {
                        if (gProxy.pre_other_scene == mx.ShiJianScreen.S_NAME) {
                            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
                            dproxy.shijian_type = 1;
                        }
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, gProxy.pre_other_scene);
                        gProxy.pre_other_scene = null;
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE);
                    }
                    break;
                case view.friend_b:
                    if (Number(data.apply)) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy035 });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FRIEND_SQING,
                            "to_id": data.user_id
                        });
                    }
                    break;
                case view.hgong_b://后宫
                    var user = lProxy.get_cur_user();
                    if (user) {
                        user.name = data.name;
                    }
                    else {
                        var obj_1 = {
                            "name": data.name,
                            "user_id": data.user_id
                        };
                        lProxy.set_cur_user(obj_1);
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_FRIEND_HGONG,
                        'other_id': data.user_id,
                        'page': 1,
                        'page_limit': 8,
                    });
                    break;
                case view.hznv_b://皇子女:
                    var obj = {
                        "name": data.name,
                        "user_id": data.user_id
                    };
                    lProxy.set_cur_user(obj);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_OTHER_ZINV,
                        "id": data.user_id
                    });
                    break;
                case view.cyming_b://曾用名
                    if (gProxy.info.old_names) {
                        var point = evt.currentTarget.parent.localToGlobal(evt.currentTarget.x, evt.currentTarget.y);
                        mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, {
                            "x": point.x,
                            "y": point.y,
                            "w": 58,
                            "h": 29,
                            "initial_name": gProxy.info.chushi_name.name,
                            "old_name": gProxy.info.old_names,
                            "type": "oldName"
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs23 });
                    }
                    evt.stopPropagation();
                    break;
                case view.hdong_b:
                    if (this.czuo_g.visible) {
                        this.czuo_g.visible = this.cz_bg.touchEnabled = false;
                    }
                    else {
                        this.czuo_g.visible = this.cz_bg.touchEnabled = true;
                    }
                    break;
                case view.cz_bg:
                    this.cz_bg.touchEnabled = this.czuo_g.visible = false;
                    break;
                case view.pbi_b://加入黑名单
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.HEIMINGDAN,
                        "sdata_ok": view.pbi_b.res_name == 'trjcpbi_png',
                        "param": view.pbi_b.res_name == 'trjcpbi_png' ? mx.Lang.hmdan04 : mx.Lang.hmdan02
                    };
                    var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    break;
                case view.sliao_b:
                    if (mx.Tools.in_hmd(data.user_id)) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hmdan13 });
                    }
                    else {
                        mx.Tools.open_pri_chat({
                            "user_id": data.user_id,
                            "avatar": "tx70_" + data.avatar + "_png",
                            "name": data.name
                        });
                    }
                    break;
                default:
                    var target = evt.target;
                    if (target != view.sliao_b && target != view.cz_bg && target != view.pbi_b && target != view.hdong_b && target != view.back_b && target != view.friend_b && target != view.bg && target != view.hgong_b && target != view.hznv_b) {
                        this.switch_info();
                    }
                    break;
            }
        };
        OtherScreen.prototype.switch_info = function () {
            var view = this;
            view.bg.touchEnabled = true;
            if (view.info_g.alpha) {
                egret.Tween.get(view.info_g).to({ "alpha": 0, "bottom": -210 }, 500); //一秒淡出
                view.timeid = egret.setTimeout(function (arg) {
                    view.bg.touchEnabled = false;
                    view.czuo_g.visible = false;
                    view.detail_b.visible = true;
                }, this, 400, "egret");
            }
            else {
                view.detail_b.visible = false;
                view.bg.touchEnabled = false;
                egret.Tween.get(view.info_g).to({ "alpha": 1, "bottom": 26 }, 500); //一秒淡出
            }
        };
        OtherScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.OtherMediator.NAME);
            var view = this;
            egret.Tween.removeTweens(view.info_g);
            egret.clearTimeout(view.timeid2);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hgong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hznv_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.friend_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.detail_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cz_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sliao_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hdong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.cyming_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.pbi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.bj_ui.on_remove();
            view.xx_ui.on_remove();
            view.ef.removeChildren();
        };
        OtherScreen.S_NAME = "OtherScreen";
        return OtherScreen;
    }(mx.BasicView));
    mx.OtherScreen = OtherScreen;
    __reflect(OtherScreen.prototype, "mx.OtherScreen");
})(mx || (mx = {}));
//# sourceMappingURL=OtherScreen.js.map