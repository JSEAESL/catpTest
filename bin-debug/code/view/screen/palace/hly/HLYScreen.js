/**
*   @author hxj
*   @date 2017.10.26
*   @desc 翰林院首页
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
    var HLYScreen = (function (_super) {
        __extends(HLYScreen, _super);
        function HLYScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fz_arr = [
                { "bg": "yjylist_png", "title": "yjyl_png", "body": "yjynrong_png" },
                { "bg": "qsglist_png", "title": "qsgl_png", "body": "qsgnrong_png" },
                { "bg": "xwclist_png", "title": "xwcl_png", "body": "xwcnrong_png" },
                { "bg": "bjylist_png", "title": "bjyl_png", "body": "bjynrong_png" },
                { "bg": "hmglist_png", "title": "hmgl_png", "body": "hmgnrong_png" },
                { "bg": "gxglist_png", "title": "gxgl_png", "body": "gxgnrong_png" },
            ];
            return _this;
        }
        HLYScreen.mx_support = function () {
            return ["assets.palace_hly_main"];
        };
        Object.defineProperty(HLYScreen.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.PalaceProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HLYScreen.prototype.init_view = function () {
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HLYScreenMediator(this));
            this.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sming_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fz_list.itemRenderer = mx.HLYTaiFuRender;
            this.fresh_list();
        };
        HLYScreen.prototype.fresh_list = function () {
            var fz_list = this.proxy.taifu_list;
            var arr = [];
            for (var i in this.fz_arr) {
                var c_id = Number(fz_list[i]);
                var cd = c_id ? this.proxy.get_curr_mn(c_id) : null;
                var tx = void 0;
                if (cd) {
                    var state = Number(cd.zhuangtai);
                    if (typeof cd.mid == 'undefined' || Number(cd.mid) >= 1000) {
                        tx = mx.Tools.get_bb_res("tx", state, cd.avatar, cd.meili);
                    }
                    else {
                        tx = mx.Tools.get_mn_res(cd.mid, "tx");
                    }
                }
                else {
                    tx = "zwtfu_png";
                }
                arr.push({
                    "bg": this.fz_arr[i].bg,
                    "tx": tx,
                    "title": this.fz_arr[i].title,
                    "body": this.fz_arr[i].body,
                });
            }
            this.fz_list.dataProvider = new eui.ArrayCollection(arr);
        };
        HLYScreen.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            switch (evt.currentTarget) {
                case this.back_b:
                    facade.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
                    break;
                case this.sming_b:
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.Pic2Alert.S_NAME,
                        "param": {
                            "title": "hlysmbti_png",
                            "wenzi": "hlysmwben_png",
                        }
                    });
                    break;
            }
        };
        HLYScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.sming_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.fz_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.HLYScreenMediator.NAME);
        };
        HLYScreen.S_NAME = "HLYScreen";
        return HLYScreen;
    }(mx.BasicView));
    mx.HLYScreen = HLYScreen;
    __reflect(HLYScreen.prototype, "mx.HLYScreen");
})(mx || (mx = {}));
//# sourceMappingURL=HLYScreen.js.map