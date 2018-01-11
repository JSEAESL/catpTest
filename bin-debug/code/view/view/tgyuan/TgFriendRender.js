/**
 *   @author dingyunfeng
 *   @date 2018.1.2
 *   @desc 推广员好友render
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
    var TgFriendRender = (function (_super) {
        __extends(TgFriendRender, _super);
        function TgFriendRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TgFriendRender.prototype.init_render = function () {
            var view = this;
            view.button1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.mxbutton1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        TgFriendRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.button1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.button2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.mxbutton1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        TgFriendRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var res_name = e.currentTarget.res_name;
            if (!res_name) {
                res_name = e.currentTarget.bg_name;
            }
            switch (e.currentTarget.res_name) {
                case "tgjhyou_png"://加好友
                    //外部接口QQ加好友
                    break;
                case "tgtxing_png"://提醒
                    //外部接口提醒（发送QQ消息）
                    break;
                case "tgciphone_png"://开始抽奖
                    //窗口跳转
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.ZhuanPanCJView.S_NAME,
                        "param": { "name": this.data.name, "lv": Number(this.data.lv) }
                    });
                    break;
                case "tgxccjiang_png"://抽奖差多少级
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Tools.format(mx.Lang.tgy006, d.name, d.award) });
                    break;
                default:
                    break;
            }
        };
        TgFriendRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            this.id_t.text = d.id;
            this.name_t.text = d.name;
            this.lv_t.text = mx.Tools.format(mx.Lang.bh001, d.lv);
            this.avatar.source = d.tx;
            if (d.award < 0) {
                this.mxbutton1.visible = false;
                this.button1.set_ssres("tgciphone_png");
            }
            else {
                this.button1.visible = false;
                this.mxbutton1.set_ssres("tgxccjiang_png", { "text": d.award, "x": 39, "y": 15, "size": 16, "textColor": 0x751B11 });
            }
            if (d.isfriend) {
                this.button2.set_ssres("tgtxing_png");
            }
            else {
                this.button2.set_ssres("tgjhyou_png");
            }
        };
        return TgFriendRender;
    }(mx.BasicRender));
    mx.TgFriendRender = TgFriendRender;
    __reflect(TgFriendRender.prototype, "mx.TgFriendRender");
})(mx || (mx = {}));
//# sourceMappingURL=TgFriendRender.js.map