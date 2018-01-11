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
 * @qianjun/2016.11.23
 *  商城alert
 */
var mx;
(function (mx) {
    var HeiShiShangJiaView = (function (_super) {
        __extends(HeiShiShangJiaView, _super);
        function HeiShiShangJiaView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeiShiShangJiaView.mx_support = function () {
            return ["assets.market_sell_shangjia", "api.ZINVSKILL"];
        };
        ;
        Object.defineProperty(HeiShiShangJiaView.prototype, "hproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.HeiShiProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeiShiShangJiaView.prototype, "dproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        HeiShiShangJiaView.prototype.init_view = function () {
            var view = this;
            mx.ApplicationFacade.getInstance().registerMediator(new mx.HeiShiShangJiaViewMediator(this));
            view.close_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzzn_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.sell_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //this.ts_p.visible = true;
            this.price_t.text = "";
            view.price_t.addEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.price_t.addEventListener(egret.Event.FOCUS_OUT, this.check_end, this);
            view.price_t.addEventListener(egret.Event.CHANGE, this.check_str, this);
            //初始未选择
            this.baodi_arr = [60, 108, 150, 198, 288];
            this.fresh_view(this.hproxy.jump_zinv_info);
        };
        HeiShiShangJiaView.prototype.fresh_view = function (cd) {
            var view = this;
            if (cd) {
                this.temp_info = cd;
                view.none_p.visible = false;
                view.whznv_g.visible = true;
                var state = Number(cd.zhuangtai);
                view.whznv_g.visible = true;
                //姓名
                var mli = Number(cd.meili);
                view.name_t.text = (cd.xing + cd.name);
                view.name_t.textColor = mx.Tools.num2color(mli);
                //魅力
                view.mli_t.text = cd.meili;
                //头像
                view.avatar.source = mx.Tools.get_bb_res("tx", state, cd.avatar);
                //技能
                var jneng1 = void 0, jneng2 = void 0, cor1 = void 0, cor2 = void 0;
                cor1 = cor2 = 0xB4B1B5;
                if (Number(cd.skill[0]) <= 0) {
                    jneng1 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.skill[0]);
                    jneng1 = api.name;
                }
                if (jneng1 != mx.Lang.hzs75) {
                    cor1 = 0x72bd6a;
                }
                if (Number(cd.skill[1]) <= 0) {
                    jneng2 = mx.Lang.hzs75;
                }
                else {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.ZINVSKILL, "id", cd.skill[1]);
                    jneng2 = api.name;
                }
                if (jneng2 != mx.Lang.hzs75) {
                    cor2 = 0x72bd6a;
                }
                view.skill1_t.text = jneng1;
                view.skill1_t.textColor = cor1;
                view.skill2_t.text = jneng2;
                view.skill2_t.textColor = cor2;
                //状态
                if (Number(cd.sb_level) && Number(cd.zhuangtai) >= 0) {
                    view.zhuangtai_t.textFlow = [{ "text": mx.Lang.ysjj, "style": { "underline": true, "textColor": mx.Tools.num2color(1, true) } }];
                }
                //封号
                //view.rank_t.text = Tools.num2chinese(d.paiwei) + (d.sex == 2 ? Lang.hzs03 : Lang.hzs04);
                var str = mx.Tools.get_xuetong_info(cd);
                view.rank_t.textFlow = [
                    { "text": cd.fenghao, "style": { "textColor": 0xF282A7, "bold": true } },
                    { "text": "  【 " + str.str + " 】", "style": { "textColor": 0xa09095, "bold": true } }
                ];
                view.rank_t.left = view.name_t.left + view.name_t.width + 12;
                view.price_t.text = "";
                view.ts_p.visible = true;
                view.baodi_t.text = "10";
            }
            else {
                view.none_p.visible = true;
                view.whznv_g.visible = false;
                view.baodi_t.text = view.price_t.text = mx.Lang.wu;
                view.ts_p.visible = false;
            }
        };
        HeiShiShangJiaView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.bg_rect:
                    this.close_self();
                    break;
                case view.sell_b:
                    if (this.temp_info) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_HS_SHANGJIA_ZN,
                            "zinv_id": this.temp_info.id,
                            "price": Number(this.price_t.text)
                        });
                        // facade.sendNotification(MX_NOTICE.POP_VIEW, {
                        //     name: AlertView.S_NAME,
                        //     param: {
                        //         notice_ok: MX_NOTICE.CS_GET_DATA,
                        //         sdata_ok: {
                        //             t: MX_NETS.CS_HS_SHANGJIA_ZN,
                        //             "zinv_id" : this.temp_info.id,
                        //             "price" : Number(this.price_t.text)
                        //         },
                        //         param: Tools.format(Lang.hs0032,this.price_t.text,this.bhfei_t.text)
                        //     }
                        // });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hs0016 });
                    }
                    break;
                case view.xzzn_b:
                    //选择子女界面
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_HS_GET_ZN,
                    });
                    //facade.sendNotification(MX_NOTICE.POP_VIEW,{"name": HeiShiShangJiaView.S_NAME});
                    break;
            }
        };
        HeiShiShangJiaView.prototype.check_str = function (e) {
            var str = this.price_t.text;
            this.price_t.text = mx.Tools.check_num_str(str);
        };
        HeiShiShangJiaView.prototype.start_edit = function (e) {
            if (this.price_t.text == '') {
                this.ts_p.visible = false;
            }
            this.price_t.text = '';
        };
        HeiShiShangJiaView.prototype.check_end = function (e) {
            var view = this;
            var pattern = /[0-9]+/g;
            var str = this.price_t.text;
            this.price_t.text = "";
            if (str == "" || !pattern.test(str)) {
                view.ts_p.visible = true;
            }
            else if (Number(str) < Number(view.baodi_t.text)) {
                str = view.baodi_t.text;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.hs0008
                });
            }
            else if (Number(str) > 99999) {
                str = view.baodi_t.text;
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, {
                    "text": mx.Lang.p0017
                });
            }
            this.price_t.text = str;
        };
        HeiShiShangJiaView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            this.hproxy.set_jump_zinv(null);
            view.close_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close_self, this);
            view.bg_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.xzzn_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.price_t.removeEventListener(egret.Event.FOCUS_IN, this.start_edit, this);
            view.price_t.removeEventListener(egret.Event.FOCUS_OUT, this.check_end, this);
            view.price_t.removeEventListener(egret.Event.CHANGE, this.check_str, this);
            view.sell_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.HeiShiShangJiaViewMediator.NAME);
        };
        HeiShiShangJiaView.S_NAME = "HeiShiShangJiaView";
        return HeiShiShangJiaView;
    }(mx.AlertView));
    mx.HeiShiShangJiaView = HeiShiShangJiaView;
    __reflect(HeiShiShangJiaView.prototype, "mx.HeiShiShangJiaView");
})(mx || (mx = {}));
//# sourceMappingURL=HeiShiShangJiaView.js.map