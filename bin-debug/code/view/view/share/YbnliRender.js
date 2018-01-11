/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc YbnliRender
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
    var YbnliRender = (function (_super) {
        __extends(YbnliRender, _super);
        function YbnliRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YbnliRender.prototype.init_render = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xff0000);
            shape.graphics.drawCircle(14 + 31, 11 + 31, 31);
            shape.graphics.endFill();
            this.addChild(shape);
            this.avatar.mask = shape;
            this.dataChanged();
            //this.yzha_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.yzha_ybao, this);
        };
        //this.yzha_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.yzha_ybao, this);
        /*private yzha_ybao() : void{
            let src = this.yzha_b.res_name;
            switch(src){
                case "yzta_png":
                case "mbta_png":
                    let dProxy = <DataProxy><any> (ApplicationFacade.getInstance().retrieveProxy(DataProxy.NAME));
                    dProxy.ybnli_type = src == "yzta_png" ? "yzha" : "mbai";
                    dProxy.cur_ybnli_info = this.data;
                    let param = {
                        "t" : MX_NETS.CS_SHARE_YAZHAYB,
                        "to_id" : this.data.to_id,
                    };
                    ApplicationFacade.getInstance().sendNotification(MX_NOTICE.CS_GET_DATA, param);
                    break;
            }
        }*/
        YbnliRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            //{"to_id":"3","avatar":"5","level":"100","name":"\u8054\u76df\u82f1\u96c4","vip":"15","get":"0","new":15542}
            var view = this;
            if (typeof data.empty == 'undefined') {
                view.sming_p.visible = false;
                view.nli_g.visible = true;
                view.name_t.text = data.name;
                //Tools.url_image(data.avatar, {"width" : 62, "view" : this.avatar});
                view.get_t.text = Number(data.new) * 10 + "";
                view.new_t.text = data.new;
                var str = "";
                if ((Number(data.new) + Number(data.get)) < 3000) {
                    str = "yzta_png";
                    view.yzha_b.top = 8;
                    view.yzha_b.right = 12;
                }
                else {
                    str = "mbta_png";
                    view.yzha_b.top = 10;
                    view.yzha_b.right = 6;
                }
                view.yzha_b.set_ssres(str);
                if (Number(data.new) == 0) {
                    view.wyb.visible = true;
                    view.yzha_b.visible = false;
                }
            }
            else {
                view.sming_p.visible = true;
                view.nli_g.visible = false;
                view.avatar.source = "dzqtxiang_png";
                view.avatar.left = 14;
                view.yzha_b.set_ssres(null);
                view.yzha_b.top = 8;
                view.yzha_b.right = 4;
            }
        };
        return YbnliRender;
    }(mx.BasicRender));
    mx.YbnliRender = YbnliRender;
    __reflect(YbnliRender.prototype, "mx.YbnliRender");
})(mx || (mx = {}));
//# sourceMappingURL=YbnliRender.js.map