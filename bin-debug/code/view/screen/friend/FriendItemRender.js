/**
 *   @author wf
 *   @date 2016.11.29
 *   @desc 好友列表render
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
    var FriendItemRender = (function (_super) {
        __extends(FriendItemRender, _super);
        function FriendItemRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendItemRender.prototype.init_render = function () {
            var view = this;
            view.hgong_b.visible = mx.AppConfig.CURR_SCENE_ID == mx.TiaoXiScreen.S_NAME;
            view.hdong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hgong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.head_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.del_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.gift_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tyi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jjue_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckmdi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzqj_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        FriendItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hdong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.hgong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.head_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.del_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.gift_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tyi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.jjue_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.ckmdi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzqj_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        FriendItemRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.hdong_b://互动
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { 'name': mx.FriendHdongView.S_NAME, 'param': d });
                    break;
                case view.hgong_b://查看后宫
                    var wproxy = facade.retrieveProxy(mx.WaiJiaoProxy.NAME);
                    if (wproxy.isTx) {
                        wproxy.tar_uid = d.user_id;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_FRIEND_HGONG,
                            'other_id': d.user_id,
                            'page': 1,
                            'page_limit': 8,
                        });
                    }
                    break;
                case view.ckmdi_b: //选择
                case view.head_b://头像
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_PLAYER_INFO, "other_id": d.user_id,
                    });
                    break;
                case view.add_b://加好友
                    if (d.apply) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy032 });
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_FRIEND_SQING,
                        "to_id": d.user_id
                    });
                    break;
                case view.del_b://删好友(改为拜访)
                    // let p_d: IPOP_D = {
                    //     "name": AlertView.S_NAME,
                    //     "param": {
                    //         "notice_ok": MX_NOTICE.CS_GET_DATA,
                    //         "sdata_ok": { "t": MX_NETS.CS_FRIEND_REMOVE, "to_id": d.user_id },
                    //         "param": Tools.setStrColor(Lang.hy020, [d.name], [0xFF0000])
                    //     }
                    // };
                    // facade.sendNotification(MX_NOTICE.POP_VIEW, p_d);
                    switch (view.del_b.res_name) {
                        case "lqu_png":
                            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
                            if (dproxy.get_currency("tili") >= 2000) {
                                var a_d2 = {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": {
                                        "t": mx.MX_NETS.CS_FREIEND_SHOULI,
                                        "from_id": d.user_id
                                    },
                                    "param": mx.Lang.hy046
                                };
                                var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_FREIEND_SHOULI,
                                    "from_id": d.user_id
                                });
                            }
                            break;
                        case "bfang_png":
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_FRIEND_VISIT,
                                "to_id": d.user_id
                            });
                            break;
                        case "ybfang_png":
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy004 });
                            break;
                    }
                    break;
                case view.tyi_b: //同意
                case view.jjue_b://拒绝
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_FRIEND_ACCEPT,
                        'apply_id': d.id,
                        'type': e.currentTarget == view.tyi_b ? 1 : 0
                    });
                    break;
                case view.gift_b://送礼
                    d.atype = "friend";
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendGiftView.S_NAME, "param": d });
                    break;
                case view.xzqj_b://查看
                    var proxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
                    proxy.target_friend = d;
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
            }
        };
        FriendItemRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            view.name_t.text = d.name;
            view.vip_t.text = d.vip + '';
            view.lv_t.text = d.level;
            view.qmdu_t.text = d.qinmi;
            view.qmdu.x = view.qmdu_t.left + view.qmdu_t.width + 12;
            view.gxibg.x = view.name_t.left + view.name_t.width + 14;
            var arr = [];
            var xin = d.qinmi;
            if (xin > 0)
                arr.push(1);
            if (xin > 600)
                arr.push(1);
            if (xin > 2400)
                arr.push(1);
            if (xin > 4500)
                arr.push(1);
            if (xin > 10000)
                arr.push(1);
            view.qmdu.dataprovide = null;
            view.qmdu.dataProvider = new eui.ArrayCollection(arr);
            var qj_gxi = [2, 3, 5];
            var gxibg = mx.Tools.qinmi_to_gxi(d.qinmi);
            if (qj_gxi.indexOf(Number(d.guanxi)) >= 0) {
                view.gxibg.source = 'qjia_png';
            }
            else {
                view.gxibg.source = !d.guanxi ? 'lren_png' : gxibg;
            }
            view.avatar.source = "tx78_" + d.avatar + "_png";
            view.add_b.bottom = d.type == 1 ? 12 : 32;
            view.add_b.set_ssres(d.apply ? 'sqzhong_png' : 'fdjhy_png');
            var hasAdd = d.guanxi == 3 || d.guanxi == 1;
            view.hdong_b.visible = view.add_b.visible = view.del_b.visible = view.gift_b.visible =
                view.tyi_b.visible = view.jjue_b.visible = false;
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = facade.retrieveProxy(mx.FriendProxy.NAME);
            if (Number(d.shouli) == 0 && fproxy.shouli_flag[2 - d.type] && Number(fproxy["shouli" + d.type]) < Number(fproxy.slmax)) {
                //可以收礼并且收礼次数未达上限显示为收礼
                view.del_b.set_ssres("lqu_png");
            }
            else if (Number(d.bf) == 0 && fproxy["baifang" + d.type]) {
                //可以拜访且未拜访过显示为拜访
                view.del_b.set_ssres("bfang_png");
            }
            else {
                view.del_b.set_ssres("ybfang_png");
            }
            switch (d.type) {
                case 1://亲家
                    view.hdong_b.visible = true;
                    // view.add_b.visible = hasAdd ? false : true;
                    // view.del_b.visible = hasAdd ? true : false;
                    view.del_b.visible = true;
                    break;
                case 2://好友
                    if (d.qinmi >= 0) {
                        view.hdong_b.visible = view.del_b.visible = true;
                    }
                    else {
                        view.gift_b.visible = true;
                    }
                    break;
                case 3://推荐
                    view.add_b.visible = hasAdd ? false : true;
                    view.del_b.visible = hasAdd ? true : false;
                    //view.ytjia.visible = hasAdd ? true : false;
                    break;
                case 4://仇人
                    view.gift_b.visible = true;
                    break;
                case 5://申请
                    view.tyi_b.visible = view.jjue_b.visible = true;
                    view.xzqj_b.visible = false;
                    break;
            }
            if (mx.AppConfig.CURR_SCENE_ID == mx.TiaoXiScreen.S_NAME) {
                view.hdong_b.visible = view.gift_b.visible = view.add_b.visible = view.del_b.visible = false;
            }
            if (mx.AppConfig.PREV_SCENE_ID == mx.HZSuoScreen.S_NAME) {
                view.hdong_b.visible = view.gift_b.visible = view.add_b.visible = view.del_b.visible = false;
                // if (d.type != 5) {
                //     view.xzqj_b.visible = true;
                // }
                //问题代码，名为查看，实为选择
            }
            if (mx.AppConfig.CURR_SCENE_ID == mx.HzHudongScreen.S_NAME) {
                view.ckmdi_b.visible = true;
                var color_arr = [0xC26F7E, 0xf67eba, 0xe671ff, 0xff42b9];
                var rate = Math.max(0, Number(d.rate) - 3);
                this.gxibg.visible = this.qmdu.visible = false;
                view.lv_t.textFlow = [
                    { "text": d.level, "style": { "textColor": 0xCA4EA4, "size": 24 } },
                ];
                this.qmdu_t.textFlow = [
                    { "text": mx.Lang.hzs63[rate], "style": { "textColor": color_arr[rate], "size": 24 } }
                ];
                this.info2_t.text = mx.Lang.gxi;
            }
        };
        return FriendItemRender;
    }(mx.BasicRender));
    mx.FriendItemRender = FriendItemRender;
    __reflect(FriendItemRender.prototype, "mx.FriendItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=FriendItemRender.js.map