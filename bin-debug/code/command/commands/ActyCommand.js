/**
 * wf
 * 活动网络请求
 * 2016/12/20.
 */
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
    var ActyCommand = (function (_super) {
        __extends(ActyCommand, _super);
        function ActyCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_GET_OPEN_ACTY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_SIGN_DATA, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_SIGN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_DATA, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUYAO_DAY_DATA, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUYAO_FY_ACT, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUYAO_TISHI, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUYAO_DAY_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUYAO_FINAL_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YONGJIU_PAY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YONGJIU_PAY_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LAST_PAY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LAST_PAY_BOX, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_CAT, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_CAT_INPUT, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_LEIJISIGN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACTY_LEIJISIGN_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LIXIAN_DATA, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TEGONG_SHOP, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TEGONG_BUY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LIXIAN_LQ, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CZ_LOOP_INFO, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CZ_LOOP_BOX, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXG_XXIU, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXG_INITXXIU, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXG_LQJL, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XXG_QCCD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LIANDAN_INFO, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LIANDAN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LIANDAN_AWARD, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WEEK_ACT, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WEEK_LQ, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_WS_MAIN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_WS_BUY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_WS_DUIHUAN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_CYGG_MAIN, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_CYGG_BUY, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ACT_CYGG_CHOU, ActyCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ZLCB_RANK, ActyCommand);
            //本地消息，刷新活动数据
            this.facade.registerCommand(mx.MX_NOTICE.USER_LV_CHANGE, ActyCommand);
            this.facade.registerCommand(mx.MX_NOTICE.USER_PAY_CHANGE, ActyCommand);
            this.facade.registerCommand(mx.MX_NOTICE.WEEKLYTASK_FINISH, ActyCommand);
        };
        ActyCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var aproxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.USER_LV_CHANGE:
                    aproxy.acty_lv_change();
                    break;
                case mx.MX_NOTICE.USER_PAY_CHANGE:
                    aproxy.acty_pay_change();
                    break;
                case mx.MX_NOTICE.WEEKLYTASK_FINISH:
                    aproxy.fresh_week_act(data);
                    break;
                case mx.MX_NETS.SC_GET_OPEN_ACTY:
                    aproxy.init_acty(data);
                    break;
                case mx.MX_NETS.SC_ACTY_SIGN_DATA:
                    aproxy.init_acty_sign(data);
                    break;
                case mx.MX_NETS.SC_ACTY_SIGN:
                    aproxy.acty_sign_cb(data);
                    break;
                case mx.MX_NETS.SC_ACTY_DATA:
                    aproxy.init_acty_data(data);
                    break;
                case mx.MX_NETS.SC_ACTY_AWARD:
                    aproxy.acty_award_cb(data);
                    break;
                case mx.MX_NETS.SC_HUYAO_DAY_DATA:
                    aproxy.init_huyao_day_data(data);
                    break;
                case mx.MX_NETS.SC_HUYAO_FY_ACT:
                    aproxy.init_huyao_act(data);
                    break;
                case mx.MX_NETS.SC_HUYAO_TISHI:
                    aproxy.init_huyao_ts(data);
                    break;
                case mx.MX_NETS.SC_HUYAO_DAY_AWARD:
                    aproxy.huyao_day_award(data);
                    break;
                case mx.MX_NETS.SC_HUYAO_FINAL_AWARD:
                    aproxy.huyao_final_award(data);
                    break;
                case mx.MX_NETS.SC_YONGJIU_PAY:
                    aproxy.yongjiu_pay_info(data);
                    break;
                case mx.MX_NETS.SC_YONGJIU_PAY_AWARD:
                    aproxy.yongjiu_pay_cb(data);
                    break;
                case mx.MX_NETS.SC_LAST_PAY:
                    aproxy.last_pay_info(data);
                    break;
                case mx.MX_NETS.SC_LAST_PAY_BOX:
                    aproxy.last_pay_box(data);
                    break;
                case mx.MX_NETS.SC_ACTY_CAT:
                    aproxy.init_cat(data);
                    break;
                case mx.MX_NETS.SC_ACTY_CAT_INPUT:
                    aproxy.cat_input_cb(data);
                    break;
                case mx.MX_NETS.SC_ACTY_LEIJISIGN:
                    aproxy.init_leiji_sign(data);
                    break;
                case mx.MX_NETS.SC_ACTY_LEIJISIGN_AWARD:
                    aproxy.leiji_sign_cb(data);
                    break;
                case mx.MX_NETS.SC_LIXIAN_DATA:
                    aproxy.init_lixian_data(data);
                    break;
                case mx.MX_NETS.SC_LIXIAN_LQ:
                    aproxy.init_lixian_lq(data);
                    break;
                case mx.MX_NETS.SC_TEGONG_SHOP:
                    aproxy.init_baihuashop(data);
                    break;
                case mx.MX_NETS.SC_TEGONG_BUY:
                    aproxy.baihuashop_buy(data);
                    break;
                case mx.MX_NETS.SC_CZ_LOOP_INFO:
                    aproxy.init_cz_loop(data);
                    break;
                case mx.MX_NETS.SC_CZ_LOOP_BOX:
                    aproxy.lq_loop_box(data);
                    break;
                case mx.MX_NETS.SC_XXG_XXIU:
                    aproxy.xxg_xxiu_cb(data);
                    break;
                case mx.MX_NETS.SC_XXG_INITXXIU:
                    aproxy.init_xxg_xxiu(data);
                    break;
                case mx.MX_NETS.SC_XXG_LQJL:
                    aproxy.xxg_lqjl_cb(data);
                    break;
                case mx.MX_NETS.SC_XXG_QCCD:
                    aproxy.xxg_qccd_cb(data);
                    break;
                case mx.MX_NETS.SC_LIANDAN_INFO:
                    aproxy.init_liandan(data);
                    break;
                case mx.MX_NETS.SC_LIANDAN:
                    aproxy.liandan_cb(data);
                    break;
                case mx.MX_NETS.SC_LIANDAN_AWARD:
                    aproxy.liandan_award_cb(data);
                    break;
                case mx.MX_NETS.SC_WEEK_ACT:
                    aproxy.init_week_act(data);
                    break;
                case mx.MX_NETS.SC_WEEK_LQ:
                    aproxy.week_act_lq(data);
                    break;
                case mx.MX_NETS.SC_ACT_WS_MAIN:
                    aproxy.init_ws(data);
                    break;
                case mx.MX_NETS.SC_ACT_WS_BUY:
                    aproxy.ws_buy_cb(data);
                    break;
                case mx.MX_NETS.SC_ACT_WS_DUIHUAN:
                    aproxy.ws_duihuan_cb(data);
                    break;
                case mx.MX_NETS.SC_ACT_CYGG_MAIN:
                    aproxy.init_cygg(data);
                    break;
                case mx.MX_NETS.SC_ACT_CYGG_BUY:
                    aproxy.cygg_buy_cb(data);
                    break;
                case mx.MX_NETS.SC_ACT_CYGG_CHOU:
                    aproxy.cygg_cj_cb(data);
                    break;
                case mx.MX_NETS.SC_ZLCB_RANK:
                    aproxy.init_zlcb_rank(data);
                    break;
            }
        };
        ActyCommand.NAME = "ActyCommand";
        return ActyCommand;
    }(puremvc.SimpleCommand));
    mx.ActyCommand = ActyCommand;
    __reflect(ActyCommand.prototype, "mx.ActyCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ActyCommand.js.map