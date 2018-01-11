/**
 *   @author qianjun
 *   @date 2016.10.9
 *   @desc 黑市代售子女render
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
    var HSDsznRender = (function (_super) {
        __extends(HSDsznRender, _super);
        function HSDsznRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HSDsznRender.prototype.on_remove = function (evt) {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.lyzzhi_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.twang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.zhuangtai_t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
        };
        HSDsznRender.prototype.init_render = function () {
            var view = this;
            view.lyzzhi_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.twang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //view.zhuangtai_t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer.start();
            }
            this.dataChanged();
        };
        HSDsznRender.prototype.timerFunc = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            if (typeof data.res_time == 'undefined') {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this.timer = null;
            }
            else {
                data.res_time--;
                this.time2_t.text = mx.Tools.format_second(data.res_time);
                this.time2_t.visible = data.res_time > 0 ? true : false;
            }
        };
        HSDsznRender.prototype.btn_click = function (e) {
            var view = this;
            var d = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var proxy = (facade.retrieveProxy(mx.HeiShiProxy.NAME));
            switch (e.currentTarget) {
                case view.lyzzhi_b:
                    if (view.lyzzhi_b.res_name == "hssell_xyzzhi_png") {
                        //结缘终止
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            name: mx.AlertView.S_NAME,
                            param: {
                                notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                                sdata_ok: {
                                    t: mx.MX_NETS.CS_HS_XYEND,
                                    zinv_id: this.data.id
                                },
                                param: mx.Lang.hzs42
                            }
                        });
                    }
                    else {
                        //购买
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                            name: mx.AlertView.S_NAME,
                            param: {
                                notice_ok: mx.MX_NOTICE.CS_GET_DATA,
                                sdata_ok: {
                                    t: mx.MX_NETS.CS_HS_BUY_ZN,
                                    id: this.data.hei_id
                                },
                                param: mx.Tools.format(mx.Lang.hs0019, this.data.jiage)
                            }
                        });
                    }
                    break;
                case view.twang://子女简介
                    if (typeof d.res_time == 'undefined') {
                        proxy.set_jump_zinv(this.data);
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FZ_INFO,
                            "mid": Number(d.id) + 1000,
                            "type": 17
                        });
                    }
                    break;
            }
        };
        HSDsznRender.prototype.dataChanged = function () {
            var d = this.data;
            if (!d || !this.skin) {
                return;
            }
            var view = this;
            var state = Number(d.zhuangtai);
            view.whznv_g.visible = true;
            view.name_t.text = (d.xing + d.name);
            view.name_t.textColor = mx.Tools.num2color(d.meili);
            view.mli_t.text = d.meili;
            // view.mli_t.textFlow = [
            //     { "text": Lang.mli + '：', "style": { "textColor": 0xa07d7a, "bold": true } },
            //     { "text": d.meili || "???", "style": { "textColor": 0x9c86a5, "bold": true } }
            // ];
            view.avatar.source = mx.Tools.get_bb_res("tx", state, d.avatar);
            //未婚子女
            var str = mx.Tools.get_xuetong_info(d);
            view.rank_t.textFlow = [
                { "text": d.fenghao, "style": { "textColor": 0xF282A7, "bold": true } },
                { "text": "  【 " + str.str + " 】", "style": { "textColor": 0xa09095, "bold": true } }
            ];
            view.rank_t.left = view.name_t.left + view.name_t.width + 12;
            //状态
            if (Number(d.sb_level) && Number(d.zhuangtai) >= 0) {
                view.zhuangtai_t.textFlow = [{ "text": mx.Lang.ysjj, "style": { "underline": true, "textColor": mx.Tools.num2color(1, true) } }];
                view.zhuangtai_t.touchEnabled = true;
            }
            else {
                //皇子所未婚子女不再显示健康状态，只显示病\阳寿将尽的负面状态。（因为没有病/阳寿将尽就是健康，没必要显示）
                // view.zhuangtai_t.textColor = 0x9c86a5;
                // view.zhuangtai_t.text = Tools.status_to_str(0, "fz");
                view.zhuangtai_t.text = "";
                view.zhuangtai_t.touchEnabled = false;
            }
            //技能
            var jneng1, jneng2, cor1, cor2;
            cor1 = cor2 = 0xB4B1B5;
            if (Number(d.skill[0]) <= 0) {
                jneng1 = mx.Lang.hzs75;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", d.skill[0]);
                jneng1 = api.name;
            }
            if (jneng1 != mx.Lang.hzs75) {
                cor1 = 0x72bd6a;
            }
            if (Number(d.skill[1]) <= 0) {
                jneng2 = mx.Lang.hzs75;
            }
            else {
                var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", d.skill[1]);
                jneng2 = api.name;
            }
            if (jneng2 != mx.Lang.hzs75) {
                cor2 = 0x72bd6a;
            }
            view.skill1_t.text = jneng1;
            view.skill1_t.textColor = cor1;
            view.skill2_t.text = jneng2;
            view.skill2_t.textColor = cor2;
            //卖家时间
            if (typeof d.res_time == 'undefined') {
                view.hsb_g.visible = true;
                view.time2_t.visible = false;
                view.price_t.text = d.jiage;
                view.lyzzhi_b.set_ssres("mjia_buy_png");
            }
            else {
                view.hsb_g.visible = false;
                view.time2_t.visible = true;
                if (d.res_time < 0) {
                    d.res_time = null;
                }
                else {
                    view.time2_t.text = mx.Tools.format_second(d.res_time);
                    view.lyzzhi_b.set_ssres("hssell_xyzzhi_png");
                }
            }
        };
        return HSDsznRender;
    }(mx.BasicRender));
    mx.HSDsznRender = HSDsznRender;
    __reflect(HSDsznRender.prototype, "mx.HSDsznRender");
})(mx || (mx = {}));
//# sourceMappingURL=HSDsznRender.js.map