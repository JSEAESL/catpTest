/**
*   @author hxj
*   @date 2017.7.3
*   @desc 相国寺（水月庵）妃嫔谥号
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
    var XGSAllQueen = (function (_super) {
        __extends(XGSAllQueen, _super);
        function XGSAllQueen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XGSAllQueen.mx_support = function () {
            return ["assets.xgs_fpsh", "api.JINJI", "data.3901"];
        };
        XGSAllQueen.prototype.init_view = function () {
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.prev_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.sye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.wye_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.fz_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.render_click, this);
            this.fresh_screen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.XGSAllQueenMediator(this));
        };
        Object.defineProperty(XGSAllQueen.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.XGSProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        XGSAllQueen.prototype.fresh_screen = function () {
            var proxy = this.proxy;
            this.fznum_t.text = proxy.total_len + "";
            if (proxy.total_len == 0) {
                this.no_tip = new mx.EmptyTip({
                    "xdz": "pu",
                    "text": mx.Lang.xgs13
                });
                this.addChild(this.no_tip);
                this.page_g.visible = false;
                this.fz_list.dataProvider = null;
            }
            else {
                var feizi_arr = proxy["xgs_list" + proxy.cur_xgs_type];
                var arr = [];
                for (var k in feizi_arr) {
                    var cd = feizi_arr[k];
                    var mnres = mx.Tools.get_zn_res(cd.avatar, "tx");
                    var shihao = proxy.get_shihao(cd.id);
                    var meili = cd.meili;
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.JINJI, "id", Number(cd.weifen_ini));
                    arr.push({
                        "id": Number(cd.id),
                        "mid": Number(cd.mid),
                        "tx": mnres,
                        "scale": 1,
                        "name": cd.name,
                        "namecolor": mx.Tools.num2color(meili),
                        "shihao": shihao,
                        "meili": Number(meili),
                        "weifen": Number(cd.sex) == 1 ? api.weifeng : api.weifenb,
                        "haizi": Number(cd.haizi),
                        "pet": Number(cd.pet),
                    });
                }
                this.fz_list.dataProvider = new eui.ArrayCollection(arr);
                this.page_t.text = proxy.cur_page[0] + "/" + proxy.total_page;
                this.page_g.visible = true;
            }
        };
        XGSAllQueen.prototype.btn_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case this.back_b:
                    this.proxy.reset();
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.XGSScreen.S_NAME);
                    break;
            }
        };
        XGSAllQueen.prototype.render_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            this.proxy.set_cur_id(e.item.id);
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FZ_INFO,
                "mid": e.item.mid,
                "type": 16,
            });
        };
        XGSAllQueen.prototype.set_page = function (e) {
            var cur_page = this.proxy.cur_page[0];
            var total_page = this.proxy.total_page;
            var new_page;
            switch (e.currentTarget) {
                case this.sye_b:
                    new_page = 1;
                    break;
                case this.prev_b:
                    new_page = Math.max(1, cur_page - 1);
                    break;
                case this.wye_b:
                    new_page = total_page;
                    break;
                case this.next_b:
                    new_page = Math.min(total_page, cur_page + 1);
                    break;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (new_page != cur_page) {
                this.proxy.new_page = true;
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                    "t": mx.MX_NETS.CS_XGS_FEIZI,
                    "page": new_page,
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.xgs04 });
            }
        };
        XGSAllQueen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.sye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.wye_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.set_page, this);
            this.fz_list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.render_click, this);
            this.fz_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.XGSAllQueenMediator.NAME);
        };
        XGSAllQueen.S_NAME = "XGSAllQueen";
        return XGSAllQueen;
    }(mx.BasicView));
    mx.XGSAllQueen = XGSAllQueen;
    __reflect(XGSAllQueen.prototype, "mx.XGSAllQueen");
})(mx || (mx = {}));
//# sourceMappingURL=XGSAllQueen.js.map