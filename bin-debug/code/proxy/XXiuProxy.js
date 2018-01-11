/**
*   @author mx
*   @date 2015.2.25
*   @desc 选秀数据管理
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
    var XXiuProxy = (function (_super) {
        __extends(XXiuProxy, _super);
        function XXiuProxy() {
            return _super.call(this, XXiuProxy.NAME) || this;
        }
        XXiuProxy.prototype.init_xxiu_info = function (data) {
            this.ybimf = Number(data.coin_free);
            this.ybcd = data.diamond_cold;
            this.ybicd = data.coin_cold;
            this.xxrecord = data.pick; //{"coin","diamond"}
            this.half = Number(data.banjia);
            this.old_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
            this.server_xuanxiu_time = Number(data.time);
            this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
        };
        XXiuProxy.prototype.up_xxiu_time = function (data) {
            if (typeof this.ybcd == "undefined") {
                return;
            }
            var cd = data.delay;
            if (cd) {
                if (this.ybicd > 0) {
                    this.ybicd -= cd;
                }
            }
            this.sendNotification(mx.MX_NOTICE.FRESH_TIME, null, "xxiu");
        };
        XXiuProxy.prototype.xxiu_type_cb = function (data) {
            var str;
            var p_d;
            switch (data.state) {
                case 1://元宝不足，
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "param": mx.Lang.a0006
                    };
                    p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2://银币不足
                    this.sendNotification(mx.MX_NOTICE.CHOOSE_CHECK, null, "ybi");
                    return;
                case 3://成功
                    p_d = {
                        "name": mx.XXiuResAlert.S_NAME,
                        "param": {
                            "items": data.awards,
                            "type": data.type,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    var ntype = Number(data.type);
                    if (mx.MX_COMMON.IN_GUIDE && ntype == 1) {
                        this.sendNotification(mx.MX_NOTICE.COMP_GUIDE); //debug
                    }
                    if (typeof data.coin_cold != "undefined") {
                        this.ybicd = data.coin_cold;
                    }
                    if (typeof data.coin_free != "undefined") {
                        this.ybimf = data.coin_free;
                    }
                    if (typeof data.diamond_cold != "undefined") {
                        this.ybcd = data.diamond_cold;
                    }
                    if (typeof data.bizhong != "undefined") {
                        this.xxrecord.bizhong = data.bizhong;
                    }
                    if (typeof data.banjia != "undefined") {
                        this.half = Number(data.banjia);
                    }
                    if (ntype == 2) {
                        this.xxrecord.Tendiamond = this.xxrecord.Tendiamond ? Number(this.xxrecord.Tendiamond) + 1 : 1;
                    }
                    else if (ntype == 1) {
                        this.xxrecord.diamond = this.xxrecord.diamond ? Number(this.xxrecord.diamond) + 1 : 1;
                    }
                    this.sendNotification(mx.MX_NOTICE.FRESH_CSCREEN, null, mx.XXiuScreen.S_NAME);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 8,
                        'num': ntype % 2 ? 1 : 10
                    });
                    this.old_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
                    this.sendNotification(mx.MX_NOTICE.NEW_XIAOHONGDIAN);
                    if (ntype <= 2) {
                        this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, {
                            "act_id": 7,
                            "add": data.type == 1 ? 1 : 10,
                        });
                    }
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        XXiuProxy.prototype.xxiu_gsws_cb = function (data) {
            var str;
            var p_d;
            switch (data.state) {
                case 0://VIP等级不足
                    str = mx.Lang.p0021;
                    break;
                case 1://元宝不足
                    var a_d2 = {
                        "notice_ok": mx.MX_NOTICE.SHOW_RECHARGE,
                        "notice_exit": mx.MX_NOTICE.CLOSE_POP,
                        "sdata_exit": mx.QBuyYbiView.S_NAME,
                        "param": mx.Lang.a0006
                    };
                    p_d = { "name": mx.AlertView.S_NAME, "param": a_d2 };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    return;
                case 2://成功
                    var ctype = data.type && Number(data.type == 1) ? 6 : 5;
                    p_d = {
                        "name": mx.XXiuResAlert.S_NAME,
                        "param": {
                            "items": data.awards,
                            "type": ctype,
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                        'id': 8,
                        'num': data.type == 1 ? 10 : 1
                    });
                    this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, {
                        "act_id": 7,
                        "add": data.type == 1 ? 10 : 1,
                    });
                    return;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        XXiuProxy.NAME = "XXiuProxy";
        return XXiuProxy;
    }(puremvc.Proxy));
    mx.XXiuProxy = XXiuProxy;
    __reflect(XXiuProxy.prototype, "mx.XXiuProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=XXiuProxy.js.map