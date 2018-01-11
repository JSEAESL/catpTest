/**
*   @author mx
*   @date 2015.1.3
*   @desc 选秀奖励弹窗
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
    var XXiuResAlert = (function (_super) {
        __extends(XXiuResAlert, _super);
        function XXiuResAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XXiuResAlert.mx_support = function () {
            return ["assets.xx_res"];
        };
        XXiuResAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_xxr_qd":
                case "v_xxr_qd2":
                    tar = this.exit_b;
                    break;
                default:
                    break;
            }
            return tar;
        };
        XXiuResAlert.prototype.init_view_by_type = function () {
            var cd = this.adata;
            if (!cd) {
                return;
            }
            this.items = cd.items;
            for (var k in this.items) {
                var cd_1 = mx.Tools.get_item_info(this.items[k].type, this.items[k].id) || {};
                this.items[k].top = 115;
                this.items[k].width = 108;
                // this.items[k].height = 108;
                this.items[k].xuanxiu = true;
                this.items[k].di_size = 24;
                this.items[k].str = cd_1.name || cd_1.hero_name;
                this.items[k].no_num = true;
                this.items[k].di_cor = 0xffffff;
                this.items[k].chicun = 108;
            }
            var layout;
            this.item_s.width = 496;
            if (cd.type == 5) {
                // this.item_list.width = 400 * 1.5;
                // this.item_list.height = 330 * 1.5;
                layout = new mx.MXCircleLayout({
                    "ww": 40 * 1.5,
                    "hh": 50 * 1.5,
                    "sa": -30 / 180 * Math.PI,
                });
            }
            else {
                layout = new eui.TileLayout();
                if (this.items.length == 1) {
                    layout.requestedColumnCount = 1;
                    layout.verticalCenter = 0;
                    this.g_g.height = 600;
                    this.item_s.width = 108;
                }
                else {
                    layout.requestedColumnCount = 4;
                    layout.paddingLeft = 10;
                    this.item_s.width = 566;
                }
                layout.horizontalGap = 38;
                layout.verticalGap = 18;
                layout.paddingTop = 7;
            }
            this.item_list.layout = layout;
            this.item_list.itemRenderer = mx.GNumRender;
            this.btn_g.visible = false;
            this.exit_b.set_ssres("qding_png");
            this.hb.source = "ybao_20_png";
            this.ok_b.set_ssres("zxyci_png");
            var zg = new mx.GeneralEffect("zguang");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1.2;
            var sz = new mx.GeneralEffect("sznew");
            this.ef_g.addChild(sz);
            sz.set_retain(true);
            egret.Tween.get(this.ef_g).to({ "y": 200 }, 600).call(this.show_item, this);
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.XXiuProxy.NAME));
            //是否半价
            if (proxy.ybcd > 0 && Number(cd.type == 1)) {
                this.bj_ts.visible = this.bj_t.visible = this.bj_xian.visible = (proxy.half == 1);
            }
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XXiuResMediator(this));
        };
        XXiuResAlert.prototype.show_item = function () {
            var cd = this.adata;
            var price, item;
            switch (Number(cd.type)) {
                case 1://元宝1次
                    price = 288;
                    item = mx.Tools.get_item_info(4, 290);
                    break;
                case 2://元宝10次
                    price = 2590;
                    item = mx.Tools.get_item_info(4, 290);
                    this.ok_b.set_ssres("zxsci_png");
                    break;
                case 3://银币1次
                    price = 10000;
                    var proxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XXiuProxy.NAME));
                    if (proxy.ybicd <= 0 && proxy.ybimf > 0) {
                        price = mx.Lang.p0023;
                    }
                    this.hb.source = "ybi_20_png";
                    item = mx.Tools.get_item_info(4, 218);
                    break;
                case 4://银币10次
                    price = 90000;
                    this.hb.source = "ybi_20_png";
                    item = mx.Tools.get_item_info(4, 218);
                    this.ok_b.set_ssres("zxsci_png");
                    break;
                case 5://大量元宝1次
                    price = 400;
                    item = mx.Tools.get_item_info(4, 440);
                    break;
                case 6://大量元宝10次
                    price = 4000;
                    item = mx.Tools.get_item_info(4, 440);
                    this.ok_b.set_ssres("zxsci_png");
                    break;
                case 7://无双币1次
                    price = 90;
                    item = { "name": mx.Lang.p0148 };
                    this.ok_b.set_ssres("wsanniu1_png");
                    this.exit_b.set_ssres("wsqueding_png");
                    this.exit_b.bottom = 22;
                    break;
                case 8://无双币10次
                    price = 780;
                    item = { "name": mx.Lang.p0148 };
                    this.ok_b.set_ssres("wsanniu2_png");
                    this.exit_b.set_ssres("wsqueding_png");
                    this.exit_b.bottom = 22;
                    break;
                case 9://财源滚滚
                    var aproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME));
                    price = aproxy.free_cygg > 0 ? mx.Lang.p0023 : 20000;
                    item = mx.Tools.get_item_info(4, 169);
                    this.ok_b.set_ssres("cyggzxyci_png");
                    this.hb.source = "ybi_20_png";
                    break;
            }
            var str = mx.Tools.format(mx.Lang.xx001, item.name, (cd.type % 2 ? 1 : 10));
            if (Number(cd.type) == 9) {
                str = mx.Lang.cygg010;
            }
            this.award_t.textFlow = mx.Tools.setKeywordColor2(str, [0xffffff]);
            this.price_t.text = "" + price;
            this.c_items = [];
            var ln = this.items.length;
            if (ln <= 10) {
                if (cd.type == 5) {
                    this._type = 2;
                }
                else {
                    this._type = 1;
                }
            }
            else {
                this._type = 3;
                for (var k in this.items) {
                    var c_item = this.items[k];
                    if (c_item.hero_id || c_item.type == 7) {
                        this.c_items.push(c_item);
                    }
                }
            }
            this.check_item_ef();
        };
        XXiuResAlert.prototype.check_item_ef = function () {
            var c_item;
            if (this._type == 3) {
                if (this.c_items.length) {
                    c_item = this.c_items.shift();
                }
                else {
                    this.item_list.dataProvider = new eui.ArrayCollection(this.items);
                    this.item_list.validateNow();
                    var len_1 = 500 - this.item_s.height;
                    var idTimeout = egret.setTimeout(function (arg) {
                        egret.Tween.get(this.item_s.viewport, { "loop": false }).to({ "scrollV": len_1 }, 8000);
                    }, this, 500, "egret");
                    this.btn_g.visible = true;
                    return;
                }
            }
            else {
                c_item = this.items[0];
            }
            if (c_item.hero_id || c_item.type == 7) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.XXiuHeroAlert.S_NAME,
                    "param": {
                        "id": c_item.hero_id || c_item.id,
                        "type": c_item.type,
                        "num": c_item.shuliang,
                        "notice": mx.MX_NOTICE.FRESH_CPOP,
                        "ntype": XXiuResAlert.S_NAME,
                    }
                });
            }
            else {
                this.fresh_view();
            }
        };
        XXiuResAlert.prototype.fresh_view = function () {
            if (this._type == 3) {
                this.check_item_ef();
                return;
            }
            var zg = new mx.GeneralEffect("cqu");
            this.g_g.addChild(zg);
            zg.visible = true;
            zg.x = 240;
            zg.y = 100;
            zg.scaleX = zg.scaleY = 3;
            zg.set_event(mx.MX_COMMON.MX_EFOVER);
            zg.addEventListener(mx.MX_COMMON.MX_EFOVER, this.zg_over, this);
            var pos = this.get_pos();
            egret.Tween.get(zg).to({ "x": pos[0], "y": pos[1] }, 500);
        };
        XXiuResAlert.prototype.get_pos = function () {
            var ln = this.c_items.length;
            if (this._type == 2) {
                //   let pos = [[100,207],[340,207],[440,307],[340,407],[100,407],[20,307]];
                var pos = [[160, 347], [330, 347], [420, 497], [330, 647], [140, 647], [50, 497]];
                var cpos = pos[ln];
                return [cpos[0], cpos[1] - 7];
            }
            var base = this.g_g.height == 600 ? 240 : 24;
            var x = base + (ln % 4) * 146;
            var basey = 256; //scroll的y
            var y = basey + Math.floor(ln / 4) * 157 + 62;
            return [x, y];
        };
        XXiuResAlert.prototype.zg_over = function (e) {
            var zg = new mx.GeneralEffect("wpfguang");
            this.g_g.addChild(zg);
            zg.visible = true;
            var pos = this.get_pos();
            zg.x = pos[0];
            zg.y = pos[1];
            zg.scaleX = zg.scaleY = 1.35;
            zg.set_event(mx.MX_COMMON.MX_EFOVER);
            zg.addEventListener(mx.MX_COMMON.MX_EFOVER, this.show_next, this);
            var c_item = this.items.shift();
            this.c_items.push(c_item);
            if (this.items.length) {
                this.check_item_ef();
            }
        };
        XXiuResAlert.prototype.show_next = function (e) {
            var c_arr = this.c_items.concat();
            if (this._type == 2) {
                while (c_arr.length < 6) {
                    c_arr.push({ "unvis": true });
                }
            }
            this.item_list.dataProvider = new eui.ArrayCollection(c_arr);
            if (!this.items.length) {
                if (mx.MX_COMMON.IN_GUIDE) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                this.btn_g.visible = true;
            }
        };
        XXiuResAlert.prototype.btn_click = function (evt) {
            if (mx.MX_COMMON.IN_GUIDE) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.ok_b://再來一次
                    var t = void 0, type = void 0;
                    switch (this.adata.type) {
                        case 6://大量元宝十连
                            type = 1;
                        case 5://大量元寶一次
                            t = mx.MX_NETS.CS_XXIU_GSWS;
                            break;
                        case 7://
                            t = mx.MX_NETS.CS_ACT_WS_BUY;
                            type = 0;
                            break;
                        case 8://
                            t = mx.MX_NETS.CS_ACT_WS_BUY;
                            type = 1;
                            break;
                        case 9://
                            t = mx.MX_NETS.CS_ACT_CYGG_BUY;
                            break;
                        default:
                            t = mx.MX_NETS.CS_XXIU_TYPE;
                            type = this.adata.type;
                    }
                    var cd = { "t": t, "type": type };
                    if (type == 2 || this.adata.type == 6) {
                        cd.xh = true;
                    }
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, cd);
                    break;
                default:
                    break;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, XXiuResAlert.S_NAME);
        };
        XXiuResAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            egret.Tween.removeTweens(this.ef_g);
            egret.Tween.removeTweens(this.item_s);
            mx.ApplicationFacade.getInstance().removeMediator(mx.XXiuResMediator.NAME);
        };
        XXiuResAlert.S_NAME = "XXiuResAlert";
        return XXiuResAlert;
    }(mx.AlertView));
    mx.XXiuResAlert = XXiuResAlert;
    __reflect(XXiuResAlert.prototype, "mx.XXiuResAlert");
})(mx || (mx = {}));
//# sourceMappingURL=XXiuResAlert.js.map