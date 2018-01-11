/**
*   @author cy
*   @date 2017.2.3
*   @desc 进阶消耗弹窗
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
    var JJXHAlert = (function (_super) {
        __extends(JJXHAlert, _super);
        function JJXHAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJXHAlert.mx_support = function () {
            return ["assets.jjxh"];
        };
        JJXHAlert.prototype.init_view_by_type = function () {
            //this.title_t.text = this.adata.flag ? Lang.h0076 : Lang.h0079;
            if (!this.adata.flag) {
                this.ok_b.set_ssres("tyqren_png");
            }
            this.item_list.itemRenderer = mx.GeneralRender;
            this.item_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            var arr = [];
            var temp = this.adata.arr;
            for (var k in temp) {
                if (k == "ybi" && temp[k] > 0) {
                    arr.push({ "chicun": 120, "type": 1, "num": temp["ybi"] });
                }
                else {
                    if (Number(temp[k]) != 0) {
                        arr.push({ "chicun": 120, "type": 4, "id": Number(k), "num": temp[k] });
                    }
                }
            }
            this.item_list.dataProvider = new eui.ArrayCollection(arr);
        };
        JJXHAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = e.item;
            if (cd.type == 4) {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.EQUIPOBTAIN, "id", cd.id);
                if (!api) {
                    return;
                }
                var pproxy = (facade.retrieveProxy(mx.PackProxy.NAME));
                var has = pproxy.get_item_num(cd.id);
                var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                fproxy.set_sd_tar_info(cd.id, has + Number(cd.num));
                facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, JJXHAlert.S_NAME);
            }
        };
        JJXHAlert.prototype.btn_click = function (evt) {
            var view = this;
            switch (evt.currentTarget) {
                case view.bg_rect:
                case view.close_b://离开
                    this.close_self();
                    break;
                case view.ok_b:
                    if (this.adata.flag) {
                        var facade = mx.ApplicationFacade.getInstance();
                        var Hproxy = (facade.retrieveProxy(mx.HeroProxy.NAME));
                        var c_hero = Hproxy.get_chero_info();
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_HERO_UPPZ, "id": c_hero.id
                        });
                    }
                    this.close_self();
                    break;
                default:
                    break;
            }
        };
        JJXHAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
            this.item_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        JJXHAlert.S_NAME = "JJXHAlert";
        return JJXHAlert;
    }(mx.AlertView));
    mx.JJXHAlert = JJXHAlert;
    __reflect(JJXHAlert.prototype, "mx.JJXHAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JJXHAlert.js.map