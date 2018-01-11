/**
 *   @author wxw
 *   @date 2017.12.27
 *   @desc 同玩好友列表render
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
    var TwFriendItemRender = (function (_super) {
        __extends(TwFriendItemRender, _super);
        function TwFriendItemRender() {
            return _super.call(this) || this;
        }
        TwFriendItemRender.prototype.init_render = function () {
            var view = this;
            view.hdong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.head_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        TwFriendItemRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hdong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.head_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TwFriendItemRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.add_b://加好友
                    if (!d.apply) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy032 });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FRIEND_SQING,
                            "to_id": d.user_id
                        });
                    }
                    break;
                case view.hdong_b:
                    switch (view.hdong_b.res_name) {
                        case "twlqlwu_png"://领取
                            var dproxy = facade.retrieveProxy(mx.DataProxy.NAME);
                            if (dproxy.get_currency("tili") >= 2000) {
                                var a_d2_1 = {
                                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                                    "sdata_ok": {
                                        "t": mx.MX_NETS.CS_SDK_TWSL,
                                        "to_id": d.user_id
                                    },
                                    "param": mx.Lang.hy046
                                };
                                var p_d_1 = { "name": mx.AlertView.S_NAME, "param": a_d2_1 };
                                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d_1);
                            }
                            else {
                                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                    "t": mx.MX_NETS.CS_SDK_TWSL,
                                    "to_id": d.user_id
                                });
                            }
                            //view.hdong_b.set_ssres("twzsong_png");
                            break;
                        case "twzsong_png"://赠送
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_SDK_TWZS,
                                "to_id": d.user_id,
                            });
                            var a_d3 = {
                                "notice_ok": mx.MX_NOTICE.CALL_JS_FUNCTION,
                                "sdata_ok": {
                                    "name": "shareToFriend",
                                    "param": { "stype": "3", "param": d.openid }
                                },
                                "param": mx.Lang.hy058
                            };
                            var p_d1 = { "name": mx.AlertView.S_NAME, "param": a_d3 };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d1);
                            //view.hdong_b.set_ssres("twsqu_png");
                            break;
                        case "twsqu_png"://索取
                            var a_d2 = {
                                "notice_ok": mx.MX_NOTICE.CALL_JS_FUNCTION,
                                "sdata_ok": {
                                    "name": "share_game",
                                    "param": { "stype": "share_twsq", "param": d.user_id }
                                },
                                "param": mx.Lang.hy053
                            };
                            var p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                            //view.hdong_b.set_ssres("twlqlwu_png");
                            break;
                        case "twysqu_png"://已索取
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy056 });
                            break;
                        case "twlqlwuhui_png"://已领取
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd006 });
                    }
                    break;
            }
        };
        TwFriendItemRender.prototype.get_res = function (td) {
            var view = this.avatar;
            if (view && td) {
                view.source = td;
                var shape = new egret.Shape();
                shape.graphics.beginFill(0xff0000);
                shape.graphics.drawCircle(59, 59, 59);
                shape.graphics.endFill();
                this.avatar_g.addChild(shape);
                this.avatar.mask = shape;
            }
        };
        Object.defineProperty(TwFriendItemRender.prototype, "sname", {
            get: function () {
                var facade = mx.ApplicationFacade.getInstance();
                var proxy = (facade.retrieveProxy(mx.GameProxy.NAME));
                var serd = (window ? window["mx_serd"] : null) || proxy.serd_list;
                var sid = this.data.sid;
                for (var i in serd) {
                    if (serd[i].id == sid) {
                        return serd[i].name;
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        TwFriendItemRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            mx.Tools.url_image(d.avatar + "40", null, this.get_res, this);
            view.name_t.text = d.name;
            view.vip_t.text = d.vip;
            //平台
            if (mx.AppConfig.MXTag.indexOf("h5") > -1) {
                view.info1_t.text = mx.Lang.hy049[1];
            }
            else {
                view.info1_t.text = mx.Lang.hy049[0];
            }
            //服务器信息
            view.nicheng_t.text = mx.Lang.numword[d.sid] + mx.Lang.st001 + " " + this.sname;
            //等级
            view.zdli_t.text = mx.Lang.dji + "  " + d.level;
            view.sex_p.source = d.gender == 1 ? "twtwnan_png" : "twtwnv_png";
            view.paiming_bt.text = d.idx.toString();
            if (!d.apply) {
                view.add_b.set_ssres("twsqzhong_png");
            }
            view.add_b.visible = d.sid == Main.SER_ID;
            if (!d.gather) {
                view.hdong_b.set_ssres("twlqlwu_png");
            }
            else if (d.donate) {
                view.hdong_b.set_ssres("twzsong_png");
            }
            else if (d.demand) {
                view.hdong_b.set_ssres("twsqu_png");
            }
            else {
                if (d.gather == 1) {
                    view.hdong_b.set_ssres("twysqu_png");
                }
                else if (d.gather == 2) {
                    view.hdong_b.set_ssres("twlqlwuhui_png");
                }
            }
        };
        return TwFriendItemRender;
    }(mx.BasicRender));
    mx.TwFriendItemRender = TwFriendItemRender;
    __reflect(TwFriendItemRender.prototype, "mx.TwFriendItemRender");
})(mx || (mx = {}));
//# sourceMappingURL=TwFriendItemRender.js.map