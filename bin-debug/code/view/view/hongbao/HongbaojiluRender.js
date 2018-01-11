/**
 *   @author qianjun
 *   @date 2014.12.28
 *   @desc 红包记录render
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
    var HongbaojiluRender = (function (_super) {
        __extends(HongbaojiluRender, _super);
        function HongbaojiluRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HongbaojiluRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.jtou_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.get_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.state_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        HongbaojiluRender.prototype.init_render = function () {
            this.get_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.jtou_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.state_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.dataChanged();
        };
        HongbaojiluRender.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.get_b:
                    switch (view.get_b.res_name) {
                        case "rsyxia_png":
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                                "t": mx.MX_NETS.CS_FRIEND_SQING,
                                "to_id": this.data.send_id
                            });
                            break;
                        case "hbfhbao_png":
                            mx.Tools.share_game({
                                "stype": "share_hb",
                                "uid": Main.SER_ID + "|" + Main.USER_ID,
                                "param": this.data.id
                            });
                            break;
                    }
                    break;
                case view.jtou_p:
                case view.state_t:
                    if (view.data.type == 2) {
                        if (view.show_hb) {
                            view.show_hb = false;
                            view.fresh_hb_log();
                        }
                        else {
                            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_HONGBAO_SENDDETAIL, "id": view.data.id });
                        }
                    }
                    break;
            }
        };
        HongbaojiluRender.prototype.fresh_log = function () {
            var view = this;
            var data = view.data;
            if (data.type == 2) {
                view.show_hb = true;
                view.total_t.text = mx.Tools.format(mx.Lang.hb003, data.total, data.remain);
                view.hb_list.dataProvider = new eui.ArrayCollection(data.log);
                view.fresh_hb_log();
            }
        };
        HongbaojiluRender.prototype.fresh_hb_log = function () {
            var view = this;
            var data = view.data;
            view.height = view.show_hb ? 532 : 151;
            view.show_hb_g.visible = view.show_hb;
            view.jtou_p.rotation = view.show_hb ? 90 : 0;
            view.jtou_p.top = view.show_hb ? 88 : 83;
            var list = view.parent;
            list.validateNow();
        };
        HongbaojiluRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            var view = this;
            view.fachu_g.visible = data.type == 2;
            view.sdao_g.visible = data.type == 1;
            view.num_t.text = data.num;
            view.time_t.text = mx.Tools.format_time(data.time, 'nyrsf');
            view.sming_t.text = data.type == 1 ? "登录红包" : "充值红包";
            view.name_t.text = data.name;
            view.show_hb_g.visible = view.show_hb = false;
            view.get_b.set_ssres(data.type == 1 ? "rsyxia_png" : "hbfhbao_png");
            view.get_b.top = data.type == 1 ? 55 : 31;
            view.get_b.right = data.type == 1 ? 42 : 17;
            if (data.type == 1) {
                view.state_t.text = "已自动领取";
                //已经是好友 sign标志量用于判断发红包人与领红包人的关系，sign=0表示二者为好友关系，sign=1表示二者在同一大区，sign=2表示不在同一大区
                view.get_b.visible = !(data.sign == 0);
                view.hyou_t.visible = data.sign == 0;
            }
            else {
                view.state_t.textFlow = [{ "text": "领取记录", "style": { "underline": true } }];
            }
        };
        return HongbaojiluRender;
    }(mx.BasicRender));
    mx.HongbaojiluRender = HongbaojiluRender;
    __reflect(HongbaojiluRender.prototype, "mx.HongbaojiluRender");
})(mx || (mx = {}));
//# sourceMappingURL=HongbaojiluRender.js.map