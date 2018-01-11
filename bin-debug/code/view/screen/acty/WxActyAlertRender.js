/**
 *   @author wxw qianjun
 *   @date 2017.12.12
 *   @desc 活动列表条目render
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
    var WxActyAlertRender = (function (_super) {
        __extends(WxActyAlertRender, _super);
        function WxActyAlertRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WxActyAlertRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.award_list.dataProvider = null;
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        WxActyAlertRender.prototype.init_render = function () {
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        WxActyAlertRender.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.hasget) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd009 });
            }
            else if (this.canget) {
                switch (this.data.type) {
                    case 1:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ACTY_SIGN });
                        break;
                    case 16:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_ACTY_LEIJISIGN_AWARD
                        });
                        break;
                    case 997:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_YONGJIU_PAY_AWARD,
                            "act_id": this.data.awards[0].baoxiang
                        });
                        break;
                    default:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_ACTY_AWARD,
                            "key_id": this.data.type - 1,
                            "act_id": this.data.group
                        });
                        break;
                }
            }
            else if (this.data.open) {
                switch (this.data.type) {
                    case 16:
                        var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
                        if (this.data.group < aproxy.cur_leiji_sign) {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd040 });
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd026 });
                        }
                        break;
                    case 997:
                    case 3:
                    case 4:
                        facade.sendNotification(mx.MX_NOTICE.SHOW_RECHARGE);
                        break;
                    default:
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd026 });
                        break;
                }
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hd008 });
            }
        };
        WxActyAlertRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var adata = aproxy.acty_data;
            var word = mx.Lang.hd003[d.type - 1];
            view.get_b.visible = true;
            switch (d.type) {
                case 1://七日登陆
                    view.sming_t.text = mx.Tools.format(word, mx.Lang.numword[d.group]);
                    this.canget = adata.has_sign ? false : d.group == adata.sign_count + 1;
                    break;
                case 2://女皇等级
                    view.sming_t.text = mx.Tools.format(word, d.group + '');
                    this.canget = d.group <= adata.level;
                    break;
                case 3://累计充值
                    view.sming_t.text = mx.Tools.format(word, adata.total_pay + '', d.group + '');
                    this.canget = d.group <= adata.total_pay;
                    break;
                case 4://每日充值
                    if (!adata.pay_daily) {
                        adata.pay_daily = 0;
                    }
                    view.sming_t.text = mx.Tools.format(word, adata.pay_daily + '', d.group + '');
                    this.canget = d.group <= adata.pay_daily;
                    break;
                case 5://累计消耗
                    if (!adata.total_use) {
                        adata.total_use = 0;
                    }
                    view.sming_t.text = mx.Tools.format(word, adata.total_use + '', d.group + '');
                    this.canget = d.group <= adata.total_use;
                    break;
                case 16://累计签到
                    view.sming_t.text = mx.Tools.format(mx.Lang.hd039, d.group);
                    this.canget = d.group == aproxy.cur_leiji_sign && !d.log;
                    break;
                case 997://永久累充
                    view.sming_t.text = mx.Tools.format(mx.Lang.hd028, aproxy.yongjiu_pay + '', d.group + '');
                    this.canget = d.group <= aproxy.yongjiu_pay;
                    break;
            }
            switch (d.type) {
                case 1:
                    this.hasget = this.itemIndex + 1 <= adata.sign_count;
                    break;
                case 16:
                case 997:
                    this.hasget = d.log;
                    break;
                default:
                    this.hasget = d.log.indexOf(d.group + '') >= 0;
                    break;
            }
            var get_b_res;
            switch (d.type) {
                case 16:
                    get_b_res = d.group <= aproxy.cur_leiji_sign ? "hdwdcheng_png" : "dqdao_png"; //过期：待签到
                    break;
                case 997:
                case 3:
                case 4:
                    get_b_res = "hdczhi_png"; //去充值
                    break;
                default:
                    get_b_res = "hdwdcheng_png";
            }
            if (this.hasget) {
                switch (d.type) {
                    case 16:
                        get_b_res = "gqyqdao_png";
                        break;
                    default:
                        get_b_res = "hdylingqu_png";
                        break;
                }
            }
            else if (this.canget) {
                switch (d.type) {
                    case 16:
                        get_b_res = "gqqdao_png";
                        break;
                    default:
                        get_b_res = "hdlingqu_png";
                        break;
                }
            }
            if (get_b_res == "hdwdcheng_png") {
                view.get_b.visible = false;
            }
            else {
                view.get_b.set_ssres(get_b_res);
            }
            view.wordbg.width = 14 + view.sming_t.width + 14;
            var arr = [];
            for (var i = 0; i < d.awards.length; i++) {
                var cd = d.awards[i];
                arr.push({
                    "type": cd.award_type,
                    "id": cd.item_id,
                    "num": cd.num,
                    "chicun": 85,
                    "no_num": true,
                    "top": 95,
                    "di_cor": 0x9689BA,
                    "di_size": 22
                });
            }
            view.award_list.itemRenderer = mx.GNumRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr);
        };
        return WxActyAlertRender;
    }(mx.BasicRender));
    mx.WxActyAlertRender = WxActyAlertRender;
    __reflect(WxActyAlertRender.prototype, "mx.WxActyAlertRender");
})(mx || (mx = {}));
//# sourceMappingURL=WxActyAlertRender.js.map