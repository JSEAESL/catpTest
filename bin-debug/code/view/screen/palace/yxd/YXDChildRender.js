/**
 *   @author hxj
 *   @date 2017.7.12
 *   @desc 养心殿子女render
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
    var YXDChildRender = (function (_super) {
        __extends(YXDChildRender, _super);
        function YXDChildRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YXDChildRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.tag_list.dataProvider = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        YXDChildRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        YXDChildRender.prototype.btn_click = function (e) {
            var c_d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            if (e.localX > 28) {
                if (mx.AppConfig.PREV_SCENE_ID == mx.HzHudongScreen.S_NAME)
                    return;
                switch (Number(c_d.state)) {
                    case -1: //死亡
                    case 7: //在教坊司中死亡
                    case 8://掠夺处死
                        var str = c_d.hname;
                        if (Number(c_d.sex == 1)) {
                            str += mx.Lang.hg046;
                        }
                        else {
                            str += mx.Lang.hg045;
                        }
                        str = mx.Tools.format(mx.Lang.hzs45, str);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
                        break;
                    default:
                        var pproxy = (facade.retrieveProxy(mx.PalaceProxy.NAME));
                        pproxy.show_zn_dia(c_d.info);
                        break;
                }
            }
        };
        YXDChildRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            //标签列表，[亲|私|野]+(转)
            this.show_tag();
        };
        YXDChildRender.prototype.show_tag = function () {
            var d = this.data;
            var tag_arr = [];
            var tag;
            switch (d.sisheng) {
                case "0":
                    break;
                case Main.USER_ID:
                    tag = "ssz_png";
                    break;
                default://既不是亲生，也不是私生，即为野孩子
                    tag = "yzz_png";
                    break;
            }
            if (tag) {
                tag_arr.push({
                    "tag": tag,
                });
            }
            if (d.zhuan == 1 || d.zhuan == 3) {
                tag_arr.push({
                    "tag": "zsbqian_png",
                });
            }
            this.tag_list.dataProvider = new eui.ArrayCollection(tag_arr);
        };
        return YXDChildRender;
    }(mx.BasicRender));
    mx.YXDChildRender = YXDChildRender;
    __reflect(YXDChildRender.prototype, "mx.YXDChildRender");
})(mx || (mx = {}));
//# sourceMappingURL=YXDChildRender.js.map