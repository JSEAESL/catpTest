/**
*   @author cy、mx
*   @date 2016.10.8
*   @desc vip特权彈窗
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
    var VIPTeQuanView = (function (_super) {
        __extends(VIPTeQuanView, _super);
        function VIPTeQuanView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.vip_record = [0, 1, 2];
            return _this;
        }
        VIPTeQuanView.mx_support = function () {
            return ["assets.recharge", "assets.vip", "api.VIP", "api.VIPLIBAO"];
        };
        VIPTeQuanView.prototype.init_view_by_type = function () {
            this.cz_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.left_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.lingqu_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.vips_g.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.vips_g.addEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            this.vips_g.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            this.vips_g.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
            this.vips_g.mask = new egret.Rectangle(0, 0, 591, 600);
            var api = mx.ApiTool.getAPI(mx.MX_APINAME.VIP);
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var now = gproxy.user_vip;
            this.vip_t.text = mx.Tools.format(mx.Lang.bh000, now);
            this.vip_bar.set_res({ "up": "jdtcheng_png", "down": "jdtbai_png" });
            this.res_p.visible = false;
            if (now >= mx.MX_COMMON.MAX_VIP_LV) {
                this.vip_bar.value = 100;
                this.res_t.text = "";
                this.res_p.visible = true;
                this.pro_t.text = "";
            }
            else {
                var ljy = gproxy.user_payall;
                this.vip_bar.value = ljy / Number(api[now + 1].Recharge) * 100;
                this.pro_t.text = ljy + "/" + api[now + 1].Recharge;
                var str = mx.Tools.format(mx.Lang.r0001, Number(api[now + 1].Recharge) - ljy, (now + 1));
                this.res_t.textFlow = mx.Tools.setKeywordColor2(str, [0xffa440]);
            }
            var cProxy = (facade.retrieveProxy(mx.ClothesProxy.NAME));
            if (cProxy.target_id) {
                var libao_api = mx.ApiTool.getAPI(mx.MX_APINAME.VIPLIBAO);
                for (var k in libao_api) {
                    var cloth = String(libao_api[k].reward1).split("|");
                    if (cloth.indexOf(String(cProxy.target_id)) >= 0) {
                        now = libao_api[k].id;
                        break;
                    }
                }
                cProxy.target_id = null;
            }
            this.vip_lv = gproxy.vip_flag || now || 1;
            gproxy.vip_flag = 0;
            this.fresh_pop();
            this.fresh_vips();
        };
        VIPTeQuanView.prototype.fresh_pop = function () {
            this.tq_t.text = mx.Tools.format(mx.Lang.r0005, this.vip_lv);
            mx.Tools.mx_grayfy(this.lingqu_b, true);
            this.lingqu_b.visible = true;
            this.lingqu_b.touchEnabled = true;
            this.lingqu_b.set_ssres("viplqjli_png");
            var libao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIPLIBAO, "id", this.vip_lv);
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var lb_state = gproxy.user_vip_libao.concat();
            if (this.vip_lv > gproxy.user_vip) {
                //this.lingqu_b.visible = false;
            }
            else if (lb_state.indexOf(String(this.vip_lv)) >= 0) {
                mx.Tools.mx_grayfy(this.lingqu_b);
                this.lingqu_b.touchEnabled = false;
                this.lingqu_b.set_ssres("vipylqu_png"); //s
            }
            else {
                if (!libao_api) {
                    this.lingqu_b.touchEnabled = false;
                }
                else {
                    this.lingqu_b.touchEnabled = true;
                }
            }
        };
        VIPTeQuanView.prototype.btn_click = function (evt) {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            switch (evt.currentTarget) {
                case view.left_b:
                    if (this.vip_lv > 1) {
                        this.reset_apos(1);
                    }
                    break;
                case view.right_b:
                    if (this.vip_lv < 15) {
                        this.reset_apos(-1);
                    }
                    break;
                case view.lingqu_b:
                    if (this.vip_lv > gproxy.user_vip) {
                        var str2 = mx.Tools.format(mx.Lang.r0016, this.vip_lv);
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str2 });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_VIP_LIBAO,
                            "vip": this.vip_lv
                        });
                    }
                    break;
                case view.close_b:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, VIPTeQuanView.S_NAME);
                    if (gproxy.vip_data) {
                        facade.sendNotification(gproxy.vip_data.notice_ok, gproxy.vip_data.sdata_ok);
                        gproxy.vip_data = null;
                        return;
                    }
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, VIPTeQuanView.S_NAME);
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 1 });
                    break;
            }
        };
        VIPTeQuanView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.vipui0.on_remove();
            this.vipui1.on_remove();
            this.vipui2.on_remove();
            this.vipui0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cloth_click, this);
            this.vipui1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cloth_click, this);
            this.vipui2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cloth_click, this);
            this.cz_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.left_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.right_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.lingqu_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.vips_g.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pre_move, this);
            this.vips_g.removeEventListener(egret.TouchEvent.TOUCH_END, this.check_move, this);
            this.vips_g.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.show_move, this);
            this.vips_g.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.check_move, this);
        };
        VIPTeQuanView.prototype.fresh_vips = function () {
            var view = this;
            for (var i = 0; i < 3; i++) {
                var ui = view["vipui" + this.vip_record[i]];
                ui.set_data(this.vip_lv + i - 1);
                ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cloth_click, this);
            }
        };
        VIPTeQuanView.prototype.cloth_click = function (evt) {
            var libao_api = mx.ApiTool.getAPINode(mx.MX_APINAME.VIPLIBAO, "id", this.vip_lv);
            if (!libao_api || libao_api.reward1 == "0") {
                return;
            }
            var p_d = {
                "name": mx.ClothDetailView.S_NAME,
                "param": {
                    "id": libao_api.reward1
                }
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        VIPTeQuanView.prototype.pre_move = function (evt) {
            if (this.move_mode) {
                return;
            }
            this.start_x = evt.stageX; //点击起始位置
            this.pre_x = evt.stageX; //上一次响应的位置
        };
        VIPTeQuanView.prototype.show_move = function (evt) {
            if (this.move_mode) {
                return;
            }
            if (this.start_x == null || typeof this.start_x == "undefined") {
                return;
            }
            var dis = evt.stageX - this.pre_x;
            this.pre_x = evt.stageX;
            var view = this;
            for (var i = 0; i < 3; i++) {
                var aid = this.vip_record[i];
                var avatar = view["vipui" + aid];
                avatar.x += dis;
            }
        };
        VIPTeQuanView.prototype.check_move = function (evt) {
            if (this.move_mode) {
                return;
            }
            if (this.start_x == null || typeof this.start_x == "undefined") {
                return;
            }
            var dis = evt.stageX - this.start_x;
            this.start_x = null;
            if (Math.abs(dis) >= 30) {
                if (dis > 0) {
                    if (this.vip_lv > 1) {
                        this.reset_apos(dis);
                    }
                    else {
                        this.reset_apos(0);
                    }
                }
                else {
                    if (this.vip_lv < 15) {
                        this.reset_apos(dis);
                    }
                    else {
                        this.reset_apos(0);
                    }
                }
            }
            else {
                this.reset_apos(0);
            }
        };
        VIPTeQuanView.prototype.reset_apos = function (dir) {
            if (this.move_mode) {
                return;
            }
            var view = this;
            if (dir == 0) {
                var pos = [-660, 30, 720];
                for (var i = 0; i < 3; i++) {
                    var aid = this.vip_record[i];
                    var vipui = view["vipui" + aid];
                    vipui.x = pos[i];
                }
            }
            else if (dir > 0) {
                this.move_mode = true;
                var mid = this.vip_record[1]; //中间的形象滑到右边
                var mvipui = view["vipui" + mid];
                var dx = 720 - mvipui.x;
                egret.Tween.get(mvipui).to({ "x": 720 }, dx * 1)
                    .call(this.reset_mode, this, [-1]);
                var lid = this.vip_record[0]; //左侧滑到中间。
                var lvipui = view["vipui" + lid];
                egret.Tween.get(lvipui).to({ "x": 20 }, dx * 1);
                var rid = this.vip_record[2]; //右侧放到左侧。
                var rvipui = view["vipui" + rid];
                rvipui.x = -660;
            }
            else {
                this.move_mode = true;
                var mid = this.vip_record[1]; //中间的形象滑到左边
                var mvipui = view["vipui" + mid];
                var dx = 720 + mvipui.x;
                egret.Tween.get(mvipui).to({ "x": -660 }, dx * 1)
                    .call(this.reset_mode, this, [1]);
                var rid = this.vip_record[2]; //右侧滑到中间。
                var rvipui = view["vipui" + rid];
                egret.Tween.get(rvipui).to({ "x": 20 }, dx * 1);
                var lid = this.vip_record[0]; //左侧放到右侧。
                var lvipui = view["vipui" + lid];
                lvipui.x = 720;
            }
        };
        VIPTeQuanView.prototype.reset_mode = function (dir) {
            var view = this;
            this.move_mode = false;
            if (dir > 0) {
                if (this.vip_lv < 15) {
                    this.vip_lv++;
                    this.fresh_pop();
                    this.vip_record.push(this.vip_record.shift()); //最左边的放到最右边
                    var vipui = view["vipui" + this.vip_record[2]];
                    vipui.set_data(this.vip_lv + 1);
                }
            }
            else if (dir < 0) {
                if (this.vip_lv > 1) {
                    this.vip_lv--;
                    this.fresh_pop();
                    this.vip_record.unshift(this.vip_record.pop()); //最右边的放到最左边
                    var vipui = view["vipui" + this.vip_record[0]];
                    vipui.set_data(this.vip_lv - 1);
                }
            }
        };
        VIPTeQuanView.S_NAME = "VIPTeQuanView";
        return VIPTeQuanView;
    }(mx.AlertView));
    mx.VIPTeQuanView = VIPTeQuanView;
    __reflect(VIPTeQuanView.prototype, "mx.VIPTeQuanView");
})(mx || (mx = {}));
//# sourceMappingURL=VIPTeQuanView.js.map