/**
 *   @author cy
 *   @date 2016.11.23
 *   @desc 商城render
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
    var ShopRender = (function (_super) {
        __extends(ShopRender, _super);
        function ShopRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ShopRender.prototype.init_render = function () {
            this.goumai_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        ShopRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            //1银币2元宝3体力4item5女王经验6美男经验7英雄8技能点
            var chicun = 90;
            var item_api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIP, "id", data.id);
            if (Number(item_api && item_api.Category) == 4) {
                chicun = 90;
            }
            var obj;
            obj = {
                "chicun": chicun,
                "type": data.type,
                "id": data.id,
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height
            };
            this.item.data = obj;
            var di_res, di_res2;
            var ygm_res = "ygmtbiao_png";
            this.goumai_b.set_ssres("shopgm_png");
            switch (Number(data.price_type)) {
                case 1://银币
                    di_res = "ptddban_png"; //"tbybdchen_png";
                    di_res2 = "yinbi_36_png";
                    break;
                case 2://元宝
                    di_res = "ptddban_png"; //"tbdban_png";
                    di_res2 = "yuanbao_36_png";
                    break;
                case 4://竞技币
                    di_res = "ptddban_png";
                    ygm_res = "ydhtbiao_png";
                    di_res2 = "jjdhwxun_png";
                    this.goumai_b.set_ssres("dhaniu_png");
                    break;
                case 3://家族币
                    di_res = "ptddban_png"; //"jzdhuandban_png";
                    ygm_res = "ydhtbiao_png";
                    di_res2 = "jzbix_png";
                    this.goumai_b.set_ssres("dhaniu_png");
                    break;
            }
            this.di_p.source = di_res;
            this.di_h.source = di_res2;
            this.ygm_p.source = ygm_res;
            if (mx.Tools.get_item_info(data.type, data.id).name) {
                this.name_t.text = mx.Tools.get_item_info(data.type, data.id).name;
            }
            if (data.tab == 3) {
                this.res_bt.visible = false;
            }
            else {
                this.res_bt.visible = true;
                this.res_bt.text = data.num;
            }
            this.num_t.text = data.price;
            this.goumai_b.touchEnabled = true;
            this.ygm_p.visible = false;
            if (Number(data.state == 1)) {
                this.goumai_b.visible = false;
                this.goumai_b.touchEnabled = false;
                this.ygm_p.visible = true;
            }
        };
        ShopRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.goumai_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        ShopRender.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            if (this.data.state == 1 && this.data.tab == 3) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0077 });
            }
            else {
                var a_d = void 0;
                switch (this.data.tab) {
                    case 2:
                        a_d = {
                            "param": {
                                "item": this.data.id,
                            },
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_SHOP_BUY,
                                "id": this.data.jiangli,
                                "num": 1
                            }
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.BuyAlertView.S_NAME,
                            "param": a_d
                        });
                        break;
                    case 1:
                    case 3:
                        a_d = {
                            "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                            "sdata_ok": {
                                "t": mx.MX_NETS.CS_SHOP_BUY,
                                "id": this.data.jiangli,
                                "num": 1
                            },
                            "param": mx.Lang.p0076
                        };
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            "name": mx.AlertView.S_NAME,
                            "param": a_d
                        });
                        break;
                    case 5:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JJC_DUIHUAN,
                            "id": this.data.jiangli
                        });
                        break;
                    case 4:
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_UNION_DUIHUAN,
                            "id": this.data.jiangli
                        });
                        break;
                }
            }
        };
        return ShopRender;
    }(mx.BasicRender));
    mx.ShopRender = ShopRender;
    __reflect(ShopRender.prototype, "mx.ShopRender");
})(mx || (mx = {}));
//# sourceMappingURL=ShopRender.js.map