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
    var LueDuoCommand = (function (_super) {
        __extends(LueDuoCommand, _super);
        function LueDuoCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LueDuoCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_MINE, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_USEBHL, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_OTHER, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_OTHER_ZINV, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_QJYZ, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_CHZHFL, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_GMLDD, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_SSDR, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_LDDZT, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_FIGHT, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_RESULT, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_QINGJIA, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_XIANGQ, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_TRXQ, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_CHECK, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_CHECKHG, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QFG_DATA, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QFG_USE_ITEM, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QFG_MOVE_HG, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QFG_MOVE_JFS, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QFG_BACK_HUIGUO, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_QUE, LueDuoCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LUEDUO_BGSG, LueDuoCommand);
        };
        LueDuoCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var lproxy = (this.facade.retrieveProxy(mx.LueDuoProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_LUEDUO_MINE://掠夺个人主页
                    lproxy.init_ld_mine(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_USEBHL://使用保护令
                    lproxy.ld_use_bhl(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_OTHER://掠夺对手列表
                    lproxy.init_ld_other(data);
                    break;
                case mx.MX_NETS.SC_OTHER_ZINV://他人子女
                    lproxy.init_other_zinv(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_QJYZ://亲家援助
                    lproxy.ld_qjyzh_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_CHZHFL://处置俘虏
                    lproxy.ld_chzhfl_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_GMLDD://购买掠夺点
                    lproxy.ld_buy_ldd(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_SSDR://搜索对手
                    lproxy.ld_ssdr_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_LDDZT://掠夺点的数目，恢复时间，购买次数
                    lproxy.init_ld_ldd(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_FIGHT://可以掠夺对象的战斗数据
                    lproxy.init_ld_fight(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_RESULT://掠夺战斗结果
                    lproxy.ld_fight_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_QINGJIA://获取亲家数据
                    lproxy.ld_qinjia_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_XIANGQ://详情
                    lproxy.ld_xiangq_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_TRXQ://他人详情
                    lproxy.ld_trxq_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_CHECK://校验
                    lproxy.ld_fight_check(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_CHECKHG://进入后宫获得自己没有处理的归属
                    lproxy.ld_fight_checkhg(data);
                    break;
                case mx.MX_NETS.SC_QFG_DATA://囚凤宫首页数据
                    lproxy.qfg_init_data(data);
                    break;
                case mx.MX_NETS.SC_QFG_USE_ITEM://囚凤宫使用道具
                    lproxy.qfg_item_cb(data);
                    break;
                case mx.MX_NETS.SC_QFG_MOVE_HG://囚凤宫收入后宫
                    lproxy.qfg_hg_cb(data);
                    break;
                case mx.MX_NETS.SC_QFG_MOVE_JFS://囚凤宫打入教坊司
                    lproxy.qfg_jfs_cb(data);
                    break;
                case mx.MX_NETS.SC_QFG_BACK_HUIGUO://囚凤宫遣送回国
                    lproxy.qfg_huiguo_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_QUE://目标防御队列
                    lproxy.yuanzhu_info_cb(data);
                    break;
                case mx.MX_NETS.SC_LUEDUO_BGSG://闭关锁国
                    lproxy.bgsg_cb(data);
                    break;
            }
        };
        LueDuoCommand.NAME = "LueDuoCommand";
        return LueDuoCommand;
    }(puremvc.SimpleCommand));
    mx.LueDuoCommand = LueDuoCommand;
    __reflect(LueDuoCommand.prototype, "mx.LueDuoCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=LueDuoCommand.js.map