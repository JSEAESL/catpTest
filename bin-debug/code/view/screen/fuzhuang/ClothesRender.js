/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 服装通用 资源，星级，name，已装备，render
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
    var ClothesRender = (function (_super) {
        __extends(ClothesRender, _super);
        function ClothesRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._flag = 0;
            return _this;
        }
        ClothesRender.prototype.init_render = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.end, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
            this.dataChanged();
        };
        ClothesRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.end, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.end, this);
        };
        ClothesRender.prototype.btn_click = function (evt) {
            if (this._flag == 1) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            if (!this.data.has) {
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                    "name": mx.ClothBuyAlert.S_NAME,
                    "param": {
                        "id": this.data.id
                    }
                });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.CLOTHES_TAKE_CHANGE, { "cid": this.data.id, "take_off": this.on_body.visible });
            }
        };
        ClothesRender.prototype.begin = function () {
            var view = this;
            if (!view.data || view.data.no_tip) {
                return;
            }
            view._flag = 0;
            view._timer = egret.setTimeout(this.showTips, this, 750); //长按0.75秒
        };
        ClothesRender.prototype.end = function () {
            var view = this;
            if (view._timer) {
                egret.clearTimeout(view._timer);
                view._timer = null;
            }
        };
        ClothesRender.prototype.showTips = function (e) {
            if (!this.data || this.data.no_tip) {
                return;
            }
            this._flag = 1;
            var cd = this.data;
            var point = this.parent.localToGlobal(this.x, this.y);
            var p_d = {
                "name": mx.ClothDetailView.S_NAME,
                "param": {
                    "id": cd.id
                }
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        ClothesRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.icon) {
                return;
            }
            //依据id拿到服装信息
            var c_info = mx.ApiTool.getAPINode(mx.MX_APINAME.CLOTH, "id", data.id);
            var view = this;
            //类型：服装、背景  
            //新获取
            view.new_b.visible = data.new;
            //图标
            view.icon.source = "i_" + data.id + "_png";
            //服装名
            view.name_t.text = c_info.name;
            //编号
            if (data.no) {
                view.no_t.text = data.no;
            }
            //穿着
            if (data.on_body) {
                view.on_body.visible = data.on_body;
            }
            else {
                view.on_body.visible = false;
            }
            //是否解锁
            if (!data.has) {
                view.not_have.visible = true;
                view.money_t.text = mx.Tools.format(mx.Lang["fz05" + c_info.obtain], mx.Tools.num2str(c_info.price));
                view.touchEnabled = false;
            }
            else {
                view.not_have.visible = false;
            }
        };
        return ClothesRender;
    }(mx.BasicRender));
    mx.ClothesRender = ClothesRender;
    __reflect(ClothesRender.prototype, "mx.ClothesRender");
})(mx || (mx = {}));
//# sourceMappingURL=ClothesRender.js.map