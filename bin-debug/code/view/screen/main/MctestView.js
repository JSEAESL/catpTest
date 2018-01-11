/**
 *   @author gaojing
 *   @date 2017.12.26
 *   @desc 社交弹窗
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
    var MctestView = (function (_super) {
        __extends(MctestView, _super);
        function MctestView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MctestView.mx_support = function () {
            return ["assets.main_alert_sjtchuang"];
        };
        MctestView.prototype.init_view_by_type = function () {
            this.adata = this.adata || {};
            var cdata = this.adata;
            this.sjjzbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sjjzbtn_click, this);
            cdata.notice_ok = mx.MX_NOTICE.SCENE_CHANGE;
            cdata.sdata_ok = mx.FriendScreen.S_NAME;
            this.init_xren();
        };
        MctestView.prototype.init_xren = function () {
            var view = this;
            var bs = 1.2;
            // let xren1_2 = new GeneralEffect("jcxren");
            // xren1_2.scaleX = xren1_2.scaleY = bs;
            // xren1_2.play_by_times(-1);
            // view.bg.addChild(xren1_2);
            // for(let i = 1; i < 100; i++){
            //     let xren1_2 = new GeneralEffect("jcxren");
            //     xren1_2.scaleX = xren1_2.scaleY = bs;
            //     xren1_2.play_by_times(-1);
            //     view.bg.addChild(xren1_2);
            // }
            for (var i = 1; i < 100; i++) {
                // let cg = view["mc" + i];
                var mc = new mx.GeneralEffect("xren5");
                mc.scaleX = mc.scaleY = bs;
                mc.play_by_times(-1);
                view.bg.addChild(mc);
            }
        };
        MctestView.prototype.sjjzbtn_click = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_UNION_INIT });
        };
        MctestView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.sjjzbtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sjjzbtn_click, this);
        };
        MctestView.S_NAME = "MctestView";
        return MctestView;
    }(mx.AlertView));
    mx.MctestView = MctestView;
    __reflect(MctestView.prototype, "mx.MctestView");
})(mx || (mx = {}));
//# sourceMappingURL=MctestView.js.map