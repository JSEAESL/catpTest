/**
 *   @author wf
 *   @date 2016.11.17
 *   @desc 太庙数据管理
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
    var TempleProxy = (function (_super) {
        __extends(TempleProxy, _super);
        function TempleProxy() {
            var _this = _super.call(this, TempleProxy.NAME) || this;
            _this._can_jibai = false;
            _this._test_type = 1;
            _this.temple_flag = false;
            return _this;
        }
        TempleProxy.prototype.set_can_jibai = function (data) {
            this._can_jibai = data.state == 1;
            this._tishi = data.tip;
            this.user_xlv_max = data.real_xian_level;
        };
        Object.defineProperty(TempleProxy.prototype, "can_jibai", {
            get: function () {
                return this._can_jibai;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TempleProxy.prototype, "tishi", {
            get: function () {
                return this._tishi;
            },
            enumerable: true,
            configurable: true
        });
        TempleProxy.prototype.set_test_type = function (data) {
            this._test_type = data;
        };
        Object.defineProperty(TempleProxy.prototype, "test_type", {
            get: function () {
                return this._test_type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TempleProxy.prototype, "alert_data", {
            get: function () {
                return this._alert_data;
            },
            set: function (data) {
                this._alert_data = data;
            },
            enumerable: true,
            configurable: true
        });
        TempleProxy.prototype.jibai_award_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.tm003;
                    break;
                case 1:
                    this._can_jibai = false;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_TEMPLE);
                    this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, { 'id': 21 });
                    break;
                case 2:
                    msg = mx.Lang.tm018;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //校验战斗数据
        TempleProxy.prototype.check_temple_fight = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1: //成功
                case 2://失败
                    var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                    var pass = data.state == 1;
                    //let i: number = Math.floor(gproxy.user_xlv / 2) - 1;
                    var i = Math.floor(gproxy.user_xlv / 2);
                    var j = gproxy.user_xlv % 2;
                    var pj_name = mx.Lang.fzxp0[j] + mx.Lang.fzxp1[i] + mx.Lang.fzxp2;
                    this._alert_data = {
                        "name": mx.AlertView.S_NAME,
                        "param": {
                            "param": mx.Tools.format(pass ? mx.Lang.tm007 : mx.Lang.tm008, pj_name),
                            "btn_n": 1
                        }
                    };
                    if (data.xian) {
                        this._can_jibai = gproxy.user_xlv != Number(data.xian);
                        gproxy.user_xlv = Number(data.xian);
                    }
                    var p_d = {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": pass ? data.xian : (Number(data.xian) + 1),
                            "type": "temple_finish",
                            "pass": pass,
                            "title": mx.Lang.tm013
                        }
                    };
                    this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.FightResultView.S_NAME,
                        "param": {
                            "notice": mx.MX_NOTICE.POP_VIEW,
                            "sdata": p_d,
                            "temple": true,
                            "awards": [],
                            "sl": pass
                        }
                    });
                    this.check_flag();
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //换装完成
        TempleProxy.prototype.hz_finish_cb = function (data) {
            var msg;
            switch (data.state) {
                case 0:
                    msg = mx.Lang.err01;
                    break;
                case 1:
                    msg = mx.Lang.tm009;
                    break;
                case 2:
                    msg = mx.Lang.tm010;
                    break;
                case 3:
                    if (data.xian) {
                        var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
                        this._can_jibai = gproxy.user_xlv != Number(data.xian);
                        gproxy.user_xlv = Number(data.xian);
                        if (mx.MX_COMMON.IN_GUIDE > 1) {
                            this.sendNotification(mx.MX_NOTICE.COMP_GUIDE); //debug
                        }
                    }
                    var cProxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
                    cProxy.huanzhuang_score = data.score;
                    this.check_flag();
                    break;
                case 4:
                    msg = mx.Lang.p0036;
                    break;
            }
            if (msg) {
                this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": msg });
            }
        };
        //评分完成
        TempleProxy.prototype.score_finish = function (data) {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var pass = data.score[1] == 1 || data.score[1] == 2;
            var xlv = pass ? gproxy.user_xlv : gproxy.user_xlv + 1;
            var i = Math.max(0, Math.floor(xlv / 2) - 1);
            var j = xlv % 2;
            var pj_name = mx.Lang.fzxp0[j] + mx.Lang.fzxp1[i] + mx.Lang.fzxp2;
            this._alert_data = {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "param": mx.Tools.format(pass ? mx.Lang.tm007 : mx.Lang.tm008, pj_name),
                    "btn_n": 1
                }
            };
            this.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "cd": data.id,
                    "type": "temple_finish",
                    "pass": pass,
                    "title": mx.Lang.tm012
                }
            });
            var cproxy = this.facade.retrieveProxy(mx.ClothesProxy.NAME);
            cproxy.set_temple_test(false);
        };
        TempleProxy.prototype.check_flag = function () {
            var gproxy = this.facade.retrieveProxy(mx.GameProxy.NAME);
            var tflag = false;
            var apis = mx.ApiTool.getAPI(mx.MX_APINAME.TAIMIAO);
            if (Number(gproxy.user_xlv) < apis.length && Number(gproxy.user_xlv) < 12) {
                var need_lv = Number(apis[Number(gproxy.user_xlv)].limit);
                if (need_lv <= Number(gproxy.user_lv)) {
                    tflag = true; //有可以进行的考核
                }
            }
            apis = null;
            var pproxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            this.temple_flag = tflag || this._can_jibai || pproxy.tujian_tishi;
        };
        TempleProxy.prototype.jinji_cb = function (data) {
            var str;
            switch (data.state) {
                case 0:
                    var gProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME));
                    gProxy.user_xlv++;
                    this.sendNotification(mx.MX_NOTICE.UPDATE_TEMPLE);
                    str = mx.Lang.xq030;
                    break;
                case 1:
                case 2:
                    break; //无法描述、、
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        TempleProxy.NAME = "TempleProxy";
        return TempleProxy;
    }(puremvc.Proxy));
    mx.TempleProxy = TempleProxy;
    __reflect(TempleProxy.prototype, "mx.TempleProxy", ["puremvc.IProxy", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=TempleProxy.js.map