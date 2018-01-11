/**
*   @author mx
*   @date 2015.1.3
*   @desc 加载小界面
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
    var PopLoadView = (function (_super) {
        __extends(PopLoadView, _super);
        function PopLoadView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PopLoadView.mx_support = function () {
            var arr = ["assets.load", "api.JSONVER", "api.LOADSTR"];
            if (mx.AppConfig.MXTag == "wxgame") {
                arr.push("api.MXLang");
            }
            return arr;
        };
        PopLoadView.prototype.on_remove = function () {
            this.jd_bar.value = 0;
            this.jd_bar.validateNow();
            this.ef_g.removeChildren();
        };
        PopLoadView.prototype.init_view = function (data) {
            this.jd_bar.set_res({ "up": "ymjzjdtiao_png", "down": "ymjzdchen_png" });
            this.fresh_view();
        };
        PopLoadView.prototype.fresh_view = function (data) {
            this.adata = data || this.adata;
            if (!this.adata) {
                return;
            }
            var ef = new mx.GeneralEffect("load2");
            ef.play_by_times(-1);
            this.ef_g.addChild(ef);
            var apis;
            var cname = this.adata; //即将加载的组件
            if (cname.indexOf("Screen") > -1) {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOADSTR, "screen", cname);
                if (!apis) {
                    var c_class = egret.getDefinitionByName("mx." + cname);
                    apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOADSTR, "screen", c_class.M_NAME);
                }
            }
            if (!apis && mx.AppConfig.CURR_SCENE_ID) {
                cname = mx.AppConfig.CURR_SCENE_ID;
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOADSTR, "screen", cname);
            }
            if (!apis) {
                var c_class = egret.getDefinitionByName("mx." + cname);
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOADSTR, "screen", c_class.M_NAME);
            }
            if (!apis) {
                apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.LOADSTR, "screen", mx.MainScreen.S_NAME);
            }
            var aln = apis.length;
            var api = apis[Math.floor(Math.random() * aln)];
            this.jd_t.text = api.con;
            apis = null;
            api = null;
        };
        PopLoadView.prototype.setProgress = function (current, total) {
            if (!this.jd_bar) {
                return;
            }
            this.jd_bar.value = current / total * 100;
            var str = this.jd_t.text;
            var arr = str.split("...");
            this.jd_t.text = arr[0] + "..." + current + "/" + total;
        };
        PopLoadView.S_NAME = "PopLoadView";
        return PopLoadView;
    }(mx.BasicView));
    mx.PopLoadView = PopLoadView;
    __reflect(PopLoadView.prototype, "mx.PopLoadView");
})(mx || (mx = {}));
//# sourceMappingURL=PopLoadView.js.map