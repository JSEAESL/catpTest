/**
 * mx
 * 网络请求
 * 2015/1/27.
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
    var GameCommand = (function (_super) {
        __extends(GameCommand, _super);
        function GameCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_SERVER_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_USER_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CREATE_ROLE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_RENAME, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_RECHARGE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WX_RECHARGE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FRECHARGE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_RECHARGE_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WX_BUY_YBAO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_VIP_LIBAOSTATE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_VIP_LIBAO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DAYTASK_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DAYTASK_AWARD, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_MAINTASK_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_MAINTASK_AWARD, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TASK_STORY, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHECK_AVATAR, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PLAYER_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_TASK_OPEN, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LINGQU_SC, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUG_JIJIN, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LQ_JIJIN, GameCommand);
            //this.facade.registerCommand(MX_NETS.SC_ZAIXIAN_TIME, GameCommand);
            //this.facade.registerCommand(MX_NETS.SC_LQ_ZAIXIAN, GameCommand);
            this.facade.registerCommand(mx.MX_NOTICE.DAYTASK_FINISH, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHANGE_TOUXIANG, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GET_AVATAR, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLIENT_SHARE, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_COVER, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LQ_COVER, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_VIP, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_LQVIP, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GETHMD_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JUBAO_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_PET, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_WANBA_PETLQ, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QIFU_LOG, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QIFU, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QIFU_MAIN, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_NHKQ_INFO, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_NHKQ_LQ, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SDK_AWARD, GameCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ZLCB_FRESH, GameCommand);
        };
        GameCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_CHANGE_TOUXIANG://换头像
                    gProxy.change_touxiang(data);
                    break;
                case mx.MX_NETS.SC_SERVER_INFO:
                    gProxy.init_server_data(data);
                    break;
                case mx.MX_NETS.SC_USER_INFO:
                    gProxy.init_user_data(data);
                    break;
                case mx.MX_NETS.SC_CREATE_ROLE:
                    this.create_role_cb(data);
                    break;
                case mx.MX_NETS.SC_PLAYER_INFO:
                    gProxy.player_info_cb(data);
                    break;
                case mx.MX_NETS.SC_RENAME:
                    gProxy.rename_cb(data);
                    break;
                case mx.MX_NETS.SC_RECHARGE:
                case mx.MX_NETS.SC_WX_RECHARGE:
                    gProxy.recharge_cb(data);
                    break;
                case mx.MX_NETS.SC_FRECHARGE:
                    gProxy.frecharge_cb(data);
                    break;
                case mx.MX_NETS.SC_RECHARGE_INFO:
                    gProxy.init_recharge_info(data);
                    break;
                case mx.MX_NETS.SC_WX_BUY_YBAO:
                    gProxy.buy_ybao_cb(data);
                    break;
                case mx.MX_NETS.SC_VIP_LIBAOSTATE:
                    gProxy.init_vip_libao(data);
                    break;
                case mx.MX_NETS.SC_VIP_LIBAO:
                    gProxy.vip_libao_cb(data);
                    break;
                //任务相关
                case mx.MX_NETS.SC_DAYTASK_INFO://每日任务领取状态
                    gProxy.init_daytask_info(data);
                    break;
                case mx.MX_NETS.SC_DAYTASK_AWARD://每日任务领取奖励
                    gProxy.daytask_award_cb(data);
                    break;
                case mx.MX_NETS.SC_MAINTASK_INFO://主线任务领取状态
                    gProxy.init_maintask_info(data);
                    break;
                case mx.MX_NETS.SC_MAINTASK_AWARD://主线任务领取奖励
                    gProxy.maintask_award_cb(data);
                    break;
                case mx.MX_NETS.SC_TASK_STORY://主线任务剧情
                    gProxy.task_story_cb(data);
                    break;
                case mx.MX_NETS.SC_TASK_OPEN://新任务开启
                    gProxy.set_tishi('task', [data.task[0].task_id, data.task[0].state]);
                    break;
                case mx.MX_NETS.SC_LINGQU_SC://领取首冲奖励
                    gProxy.lingqu_sc_cb(data);
                    break;
                case mx.MX_NETS.SC_CHECK_AVATAR://检测用户头像变化
                    gProxy.set_avatar(data);
                    break;
                case mx.MX_NOTICE.DAYTASK_FINISH://每日任务检测
                    gProxy.daytask_finish(data.id, data.num);
                    break;
                case mx.MX_NETS.SC_BUG_JIJIN://购买基金
                    gProxy.buy_jijin_cb(data);
                    break;
                case mx.MX_NETS.SC_LQ_JIJIN://领取基金
                    gProxy.lq_jijin_cb(data);
                    break;
                case mx.MX_NETS.SC_GET_AVATAR:
                    gProxy.get_avatar(data);
                    break;
                case mx.MX_NETS.SC_CLIENT_SHARE:
                    gProxy.share_succ(data);
                    break;
                case mx.MX_NETS.SC_WANBA_COVER:
                    gProxy.init_cover(data);
                    break;
                case mx.MX_NETS.SC_LQ_COVER:
                    gProxy.lq_cover(data);
                    break;
                case mx.MX_NETS.SC_WANBA_VIP:
                    gProxy.init_wb_vip(data);
                    break;
                case mx.MX_NETS.SC_WANBA_LQVIP:
                    gProxy.lq_wb_vip(data);
                    break;
                case mx.MX_NETS.SC_GETHMD_INFO:
                    gProxy.init_hmdan_info(data);
                    break;
                case mx.MX_NETS.SC_JUBAO_INFO:
                    gProxy.jubao_cb(data);
                    break;
                case mx.MX_NETS.SC_WANBA_PET:
                    gProxy.init_wanba_pet(data);
                    break;
                case mx.MX_NETS.SC_WANBA_PETLQ:
                    gProxy.wanba_pet_lq(data);
                    break;
                case mx.MX_NETS.SC_QIFU_LOG:
                    gProxy.init_qifu(data);
                    break;
                case mx.MX_NETS.SC_QIFU:
                    gProxy.qifu_cb(data);
                    break;
                case mx.MX_NETS.SC_QIFU_MAIN:
                    gProxy.check_qifu(data);
                    break;
                case mx.MX_NETS.SC_NHKQ_INFO:
                    gProxy.init_nhkq_info(data);
                    break;
                case mx.MX_NETS.SC_NHKQ_LQ:
                    gProxy.lq_nhkq_award(data);
                    break;
                /*case MX_NETS.SC_ZAIXIAN_TIME://在线时间
                    gProxy.zaixian_time = data.num;
                    gProxy.zaixian_id = data.award_id;
                    break;
                case MX_NETS.SC_LQ_ZAIXIAN://领取在线礼包
                    gProxy.lq_zaixian_cb(data);
                    break;*/
                case mx.MX_NETS.SC_SDK_AWARD:
                    gProxy.sdk_lq(data);
                    break;
                case mx.MX_NETS.SC_ZLCB_FRESH:
                    gProxy.report_zhanli(data);
                    break;
                default:
                    break;
            }
        };
        GameCommand.prototype.create_role_cb = function (data) {
            var str;
            switch (data.state) {
                case 1:
                    mx.MX_COMMON.NEW_ROLE = true;
                    var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    gProxy.init_user_data(data);
                    mx.DataTool.getInstance().set_QQ_Score(29, data.name);
                    mx.DataTool.getInstance().set_QQ_Score(25, Math.floor(new Date().getTime() / 1000));
                    return;
                case 2://含有敏感字
                    str = mx.Lang.st006 + mx.Lang.st005;
                    break;
                case 3://重名
                    str = mx.Lang.st007 + mx.Lang.st005;
                    break;
                case 4://空或者长度超过6个
                    str = mx.Lang.st008 + mx.Lang.st005;
                    break;
                case 5://已经存在角色？
                    str = mx.Lang.st009;
                    break;
                default:
                    str = mx.Lang.p0007;
                    break;
            }
            this.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": str });
        };
        GameCommand.NAME = "GameCommand";
        return GameCommand;
    }(puremvc.SimpleCommand));
    mx.GameCommand = GameCommand;
    __reflect(GameCommand.prototype, "mx.GameCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=GameCommand.js.map