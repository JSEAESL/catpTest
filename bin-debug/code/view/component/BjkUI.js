/*
 * Author: mx
 * Date: 2017/11/7
 * 人物背景卡支持光效，缓动
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
    var BjkUI = (function (_super) {
        __extends(BjkUI, _super);
        function BjkUI() {
            var _this = _super.call(this) || this;
            var bj = new eui.Image();
            _this.addChild(bj);
            _this.bj = bj;
            var e_g = new eui.Group;
            e_g.width = 720;
            e_g.height = 1280;
            _this.addChild(e_g);
            _this.ef_g = e_g;
            _this.width = 720;
            _this.height = 1280;
            return _this;
        }
        BjkUI.prototype.set_bjk = function (id) {
            if (!id) {
                var cproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.ClothesProxy.NAME);
                id = cproxy.bjkid || 1;
            }
            this.bid = id;
            var skey = "bjk" + id;
            this.bj.source = skey + "_jpg"; //初始化背景
            this.fresh_ef(); //刷新动画效果
            var isf = RES.hasRes(skey + "_f_jpg"); //刷新前景
            var fp = this.getChildByName("bj_f");
            if (isf) {
                if (!fp) {
                    fp = new eui.Image();
                    fp.name = "bj_f";
                    this.addChild(fp);
                }
                fp.source = skey + "_f_jpg";
            }
            else if (fp) {
                this.removeChild(fp);
            }
        };
        BjkUI.prototype.fresh_ef = function () {
            this.remove_ef();
            this.remove_tween();
            var apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTHEF, "mid", "b" + this.bid);
            for (var k in apis) {
                var c_api = apis[k];
                if (c_api.type == "mc") {
                    var c_ef = new mx.GeneralEffect(c_api.name);
                    c_ef.play_by_times(-1);
                    c_ef.x = c_api.p1;
                    c_ef.y = c_api.p2;
                    if (c_api.p4) {
                        c_ef.rotation = c_api.p4;
                    }
                    if (c_api.p3) {
                        c_ef.scaleX = c_api.p3;
                        if (c_api.p3 > 0) {
                            c_ef.scaleY = c_api.p3;
                        }
                    }
                    this.ef_g.addChild(c_ef);
                }
                else if (c_api.type == "tween") {
                }
            }
        };
        BjkUI.prototype.remove_ef = function () {
            var view = this.ef_g;
            var ln = view.numChildren;
            for (var i = ln - 1; i > -1; i--) {
                var c_ef = view.getChildAt(i);
                c_ef.on_remove();
            }
            view.removeChildren();
        };
        BjkUI.prototype.remove_tween = function () {
            /*这个版本暂时不需要处理tween
            egret.Tween.removeTweens(this);
            let fp = this.getChildByName("bj_f");
            if(fp){
                egret.Tween.removeTweens(fp);
            }
            */
        };
        BjkUI.prototype.on_remove = function () {
            this.remove_ef();
            this.remove_tween();
            this.removeChildren();
        };
        return BjkUI;
    }(eui.Component));
    mx.BjkUI = BjkUI;
    __reflect(BjkUI.prototype, "mx.BjkUI");
})(mx || (mx = {}));
//# sourceMappingURL=BjkUI.js.map