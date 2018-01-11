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
/**
 * @cy/2017.4.24
 *  选择加入方式alert
 */
var mx;
(function (mx) {
    var UnionJoinKindAlert = (function (_super) {
        __extends(UnionJoinKindAlert, _super);
        function UnionJoinKindAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionJoinKindAlert.mx_support = function () {
            return ["assets.jz_join"];
        };
        UnionJoinKindAlert.prototype.init_view_by_type = function () {
            this.queren_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            if (this.adata == 1) {
                var arr = [{ "bg": "xysqjru_png" }, { "bg": "wxsqjru_png" }, { "bg": "jzrhrjru_png" }];
                this.select_list.dataProvider = new eui.ArrayCollection(arr);
                this.select_list.selectedIndex = uProxy.union_kind;
                this.miaoshu_p.visible = false;
                this.title_p.source = "jrszhi_png";
                this.select_list.visible = this.queren_b.visible = true;
            }
            else {
                this.miaoshu_p.visible = true;
                this.title_p.source = "zwsmbti_png";
                this.select_list.visible = this.queren_b.visible = false;
            }
        };
        UnionJoinKindAlert.prototype.xiugai_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_UNION_RULER,
                "kind": this.select_list.selectedIndex
            });
        };
        UnionJoinKindAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.select_list.dataProvider = null;
            this.queren_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
        };
        UnionJoinKindAlert.S_NAME = "UnionJoinKindAlert";
        return UnionJoinKindAlert;
    }(mx.AlertView));
    mx.UnionJoinKindAlert = UnionJoinKindAlert;
    __reflect(UnionJoinKindAlert.prototype, "mx.UnionJoinKindAlert");
})(mx || (mx = {}));
//# sourceMappingURL=UnionJoinKindAlert.js.map