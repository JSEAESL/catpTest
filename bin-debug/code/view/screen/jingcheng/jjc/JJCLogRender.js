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
/**
 * @cy/17.3.20
 * jjc战报render
 */
var mx;
(function (mx) {
    var JJCLogRender = (function (_super) {
        __extends(JJCLogRender, _super);
        function JJCLogRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JJCLogRender.prototype.init_render = function () {
            this.dataChanged();
            this.fun_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx_p.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCLogRender.prototype.btn_click = function (e) {
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var jproxy = facade.retrieveProxy(mx.JingJiProxy.NAME);
            ////console.log(data)
            switch (e.currentTarget) {
                case this.fun_b:
                    jproxy.cur_fight = data;
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JJC_XIANGQING,
                        "id": data.id
                    });
                    break;
                case this.tx_p:
                    jproxy.cur_enemy = data.info;
                    jproxy.cur_enemy.fuchou = false;
                    jproxy.cur_enemy.rank = data.rank;
                    jproxy.cur_enemy.type = data.type;
                    if (Number(data.to_id) == Number(Main.USER_ID)) {
                        jproxy.cur_enemy.fuchou = true;
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JJC_DETAIL,
                            "to_id": data.user_id,
                            "type": data.type,
                        });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_JJC_DETAIL,
                            "to_id": data.to_id,
                            "type": data.type,
                        });
                    }
                    break;
            }
        };
        JJCLogRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            this.fun_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            this.tx_p.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JJCLogRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if ((Number(data.sl) == 2 && Number(data.user_id) == Number(Main.USER_ID)) || (Number(data.sl) != 2 && Number(data.to_id) == Number(Main.USER_ID))) {
                this.result_p.source = "jjzbsli_png";
                this.change_p.source = "mcssjtou_png";
                this.change_t.textColor = 0x6faf49;
            }
            else {
                this.result_p.source = "jjzbsbai_png";
                this.change_p.source = "mcxjjtou_png";
                this.change_t.textColor = 0xe7424a;
            }
            this.change_t.text = data.gaibian;
            if (Number(data.gaibian)) {
                this.change_t.visible = true;
                this.change_p.visible = true;
            }
            else {
                this.change_t.visible = false;
                this.change_p.visible = false;
            }
            this.tx_p.source = "tx70_" + data.info.avatar + "_png";
            this.lv_t.text = mx.Lang.dji + "：" + data.info.level;
            this.vip_t.text = data.info.vip;
            this.name_t.text = data.info.name;
            var now_time = Math.floor(new Date().getTime() / 1000);
            var time = Math.max(0, now_time - Number(data.time));
            var shijian;
            if (time < 3600) {
                shijian = Math.floor(time / 60) + mx.Lang.ld042;
            }
            else if (time < 3600 * 24) {
                shijian = Math.floor(time / 3600) + mx.Lang.ld041;
            }
            else if (time < 3600 * 24 * 7) {
                shijian = Math.floor(time / (3600 * 24)) + mx.Lang.ld040;
            }
            else {
                shijian = 1 + mx.Lang.ld039;
            }
            shijian += mx.Lang.qian;
            this.time_t.text = shijian;
        };
        return JJCLogRender;
    }(mx.BasicRender));
    mx.JJCLogRender = JJCLogRender;
    __reflect(JJCLogRender.prototype, "mx.JJCLogRender");
})(mx || (mx = {}));
//# sourceMappingURL=JJCLogRender.js.map