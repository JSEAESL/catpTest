/**
 * @cy、mx
 *  2016.9.12
 *  册封圣旨alert
 */
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
    var ShengZhiAlert = (function (_super) {
        __extends(ShengZhiAlert, _super);
        function ShengZhiAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShengZhiAlert.mx_support = function () {
            return ["assets.shengzhi"];
        };
        ShengZhiAlert.prototype.init_view = function () {
            var cd = this.adata;
            if (!cd) {
                return;
            }
            this.shengzhi_p.alpha = 0;
            this.wz_g.alpha = 0;
            this.pro_state = 1;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            var zg = new mx.GeneralEffect("zguang");
            this.ef1_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 6;
            this.timeid1 = egret.setTimeout(function (arg) {
                egret.clearTimeout(this.timeid1);
                this.fresh_pop();
            }, this, 500, "egret"); //先播放0.5s光效
        };
        ShengZhiAlert.prototype.fresh_pop = function () {
            var cd = this.adata;
            var arr = [];
            if (this.adata.type == 1) {
                arr[0] = mx.Lang.h0044;
                arr[1] = cd.name.length > 6 ? " " + cd.name : mx.Tools.format(mx.Lang.h00440, cd.name);
                arr[2] = mx.Lang.h0045;
                arr[3] = mx.Tools.format(mx.Lang.h00440, cd.weifen);
            }
            else {
                var str = void 0;
                switch (this.adata.type) {
                    case 2://打入冷宫
                        str = mx.Tools.format(mx.Lang.hglg1, cd.weifen, cd.name);
                        str += mx.Lang.hglg2;
                        str += mx.Lang.hglg3;
                        break;
                    case 3://赐字
                        str = mx.Tools.format(mx.Lang.hgcz1, cd.weifen, cd.name);
                        str += mx.Lang.hgcz2;
                        str += mx.Tools.format(mx.Lang.hgcz3, cd.cizi);
                        break;
                    case 4://内务府，1女2男
                        var sm = cd.xingbie == 2 ? mx.Lang.hgnw4 : mx.Lang.hgnw6;
                        var act = cd.xingbie == 2 ? mx.Lang.hgnw8 : mx.Lang.hgnw9;
                        var xb = cd.xingbie == 2 ? mx.Lang.hgnw5 : mx.Lang.hgnw7;
                        str = mx.Tools.format(mx.Lang.hgnw1, cd.weifen, cd.name, sm);
                        str += mx.Tools.format(mx.Lang.hgnw2, act, cd.zhangren);
                        str += mx.Tools.format(mx.Lang.hgnw3, xb, cd.mingfen);
                        break;
                    case 5://教坊司
                        str = mx.Tools.format(mx.Lang.hgcz1, cd.weifen, cd.name);
                        str += mx.Lang.jfs35;
                        break;
                    case 6://俘虏打入教坊司
                        str = mx.Tools.format(mx.Lang.ld048, cd.name);
                        break;
                    case 7://囚凤宫
                        str = mx.Tools.format(mx.Lang.ld051, cd.name);
                        break;
                    case 8://放回
                        str = mx.Tools.format(mx.Lang.ld049, cd.name);
                        break;
                    case 9://处死
                        str = mx.Tools.format(mx.Lang.ld050, cd.name);
                        break;
                    case 10://赐封谥号
                        var xproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
                        str = mx.Tools.format(mx.Lang.xgs12, mx.Lang.aixxx[xproxy.cur_xgs_type], xproxy.get_object().name, cd.shihao);
                        break;
                    case 11://更改昵称
                        if (mx.MX_COMMON.IN_GUIDE) {
                            str = mx.Tools.format(mx.Lang.xgs37, cd.name);
                        }
                        else {
                            str = mx.Tools.format(mx.Lang.xgs31, cd.name);
                        }
                }
                while (str.length) {
                    var min = Math.min(8, str.length);
                    var cstr = str.substr(0, min);
                    str = str.substr(min);
                    arr.push(cstr);
                }
            }
            this.txt_list.dataProvider = new eui.ArrayCollection(arr);
            egret.Tween.get(this.shengzhi_p).to({ "alpha": 1 }, 1000); //圣旨一秒淡入
            this.timeid2 = egret.setTimeout(function (arg) {
                egret.clearTimeout(this.timeid2);
                egret.Tween.get(this.wz_g).to({ "alpha": 1 }, 1000).call(this.btn_click, this); //文字一秒淡入,自动播放圣旨
            }, this, 1000, "egret");
            if (mx.MX_COMMON.IN_GUIDE) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.HIDE_GUIDE);
            }
        };
        ShengZhiAlert.prototype.clear_pre = function () {
            this.shengzhi_p.alpha = 1;
            egret.Tween.removeTweens(this.shengzhi_p);
            this.wz_g.alpha = 1;
            egret.Tween.removeTweens(this.wz_g);
            if (this.timeid1) {
                egret.clearTimeout(this.timeid1);
            }
            if (this.timeid2) {
                egret.clearTimeout(this.timeid2);
            }
        };
        ShengZhiAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.clear_pre();
            this.ef1_g.removeChildren();
            this.ef2_g.removeChildren();
            var cd = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            if (cd.notice_exit) {
                facade.sendNotification(cd.notice_exit, cd.sdata_exit);
                if (cd.type == 6 || cd.type == 7 || cd.type == 8 || cd.type == 9) {
                    if (mx.AppConfig.PREV_SCENE_ID == mx.LDMainScreen.S_NAME || mx.AppConfig.PREV_SCENE_ID == mx.PalaceScreen.S_NAME) {
                        var jproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                        jproxy.check_fl();
                        return;
                    }
                }
            }
            if (cd.type == 5 || cd.type == 4) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_AWARD);
            }
            if (mx.MX_COMMON.IN_GUIDE) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GUIDE_SHOW);
            }
        };
        ShengZhiAlert.prototype.btn_click = function (evt) {
            switch (this.pro_state) {
                case 1://前置准备
                    this.clear_pre();
                    var zg = new mx.GeneralEffect("yzhang");
                    this.ef2_g.addChild(zg);
                    zg.play_by_times(1);
                    zg.set_retain(true);
                    this.pro_state = 2;
                    break;
                case 2:
                    var facade = mx.ApplicationFacade.getInstance();
                    if (mx.AppConfig.CURR_SCENE_ID == mx.YueHuiScreen.S_NAME) {
                        var hProxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                        var cd = hProxy.get_chero_info();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_CHERO_INFO,
                            "id": cd.id,
                        });
                    }
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, ShengZhiAlert.S_NAME);
                    break;
            }
        };
        ShengZhiAlert.S_NAME = "ShengZhiAlert";
        return ShengZhiAlert;
    }(mx.BasicView));
    mx.ShengZhiAlert = ShengZhiAlert;
    __reflect(ShengZhiAlert.prototype, "mx.ShengZhiAlert");
})(mx || (mx = {}));
//# sourceMappingURL=ShengZhiAlert.js.map