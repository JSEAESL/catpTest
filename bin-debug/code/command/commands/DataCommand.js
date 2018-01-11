/**
 * mx
 * 用户数据处理
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
    var DataCommand = (function (_super) {
        __extends(DataCommand, _super);
        function DataCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DataCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_INFO, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_TILI, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_DJS, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHAT_ZINV, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHAT_KANJIA, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHAT_KANJIA_JUJUE, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHAT_KANJIA_AGREE, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHIJIAN_LY_DEAL, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHARE_YBNLI, DataCommand); //元宝小奴隶，列表信息
            this.facade.registerCommand(mx.MX_NETS.SC_SHARE_FZ, DataCommand); //元宝小奴隶，列表信息
            this.facade.registerCommand(mx.MX_NETS.SC_WB_YBNL_YQJL, DataCommand); //邀请奖励信息
            this.facade.registerCommand(mx.MX_NETS.SC_WB_YBNL_LQ, DataCommand); //领取分享 邀请奖励
            this.facade.registerCommand(mx.MX_NETS.SC_WB_YBNL_YQTHHD, DataCommand); //邀请土豪红点
            this.facade.registerCommand(mx.MX_NETS.SC_INIT_SHIHE, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QUCHU_SHIHE, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FANGRU_SHIHE, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GET_RANK_INFO, DataCommand);
            //小接口处理
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_TILI, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_UEXP, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_REWARD, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_JYB, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_YB, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_ZJB, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_SHARE_EXP, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_NEW_FBS, DataCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SYS_MESSAGE, DataCommand);
            //本地消息处理
            this.facade.registerCommand(mx.MX_NOTICE.FRESH_VIP, DataCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SHOW_BUY_TILI, DataCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SHOW_AWARD, DataCommand);
            this.facade.registerCommand(mx.MX_NOTICE.GET_AWARD, DataCommand);
            this.facade.registerCommand(mx.MX_NOTICE.NEXT_AWARD, DataCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SHOW_RECHARGE, DataCommand);
        };
        DataCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var dProxy = (this.facade.retrieveProxy(mx.DataProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_BUY_INFO:
                    dProxy.init_buy_info(data);
                    break;
                case mx.MX_NETS.SC_BUY_TILI:
                    dProxy.buy_tili_cb(data);
                    break;
                case mx.MX_NETS.SC_BUY_DJS:
                    dProxy.buy_djs_cb(data);
                    break;
                //本地接口处理：
                case mx.MX_NOTICE.FRESH_VIP:
                    dProxy.reset_vip_dproxy();
                    break;
                case mx.MX_NOTICE.SHOW_BUY_TILI:
                    dProxy.check_currency_info(data);
                    break;
                //小接口处理
                case mx.MX_NETS.SC_DATA_TILI://体力
                    dProxy.set_currency("tili", data.total, data.num);
                    break;
                case mx.MX_NETS.SC_DATA_UEXP://角色经验
                    dProxy.exp_up(data);
                    break;
                case mx.MX_NETS.SC_DATA_REWARD://奖励物品
                    dProxy.ud_reward_cb(data);
                    break;
                case mx.MX_NETS.SC_DATA_JYB://金元宝
                    var yb_num = dProxy.get_currency("ybao");
                    var xiaohao = Math.max(yb_num - data.total, 0);
                    if (xiaohao) {
                        this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                            'id': 28,
                            'num': xiaohao
                        });
                        this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                            'id': 29,
                            'num': xiaohao
                        });
                        this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                            'id': 30,
                            'num': xiaohao
                        });
                        this.sendNotification(mx.MX_NOTICE.DAYTASK_FINISH, {
                            'id': 31,
                            'num': xiaohao
                        });
                        this.sendNotification(mx.MX_NOTICE.WEEKLYTASK_FINISH, {
                            "act_id": 8,
                            "add": xiaohao
                        });
                    }
                    dProxy.set_currency("ybao", data.total, data.num);
                    if (data.type) {
                        mx.DataTool.getInstance().onItemPurchase({
                            "type": data.type,
                            "num": Number(data.cost)
                        });
                        //消耗元宝
                        var gProxy_1 = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                        gProxy_1.total_use += Number(data.cost);
                        var aProxy = (this.facade.retrieveProxy(mx.ActyProxy.NAME));
                        aProxy.acty_use_change();
                    }
                    break;
                case mx.MX_NETS.SC_DATA_YB://银币
                    dProxy.set_currency("ybi", data.total, data.num);
                    break;
                case mx.MX_NETS.SC_DATA_ZJB://紫晶币
                    dProxy.set_currency("zjb", data.total, data.num);
                    break;
                case mx.MX_NETS.SC_HERO_SHARE_EXP://上阵英雄获取经验
                    dProxy.set_hero_share_exp(data);
                    break;
                case mx.MX_NETS.SC_NEW_FBS://副本新关卡开启，MXDEBUG
                    var gProxy = (this.facade.retrieveProxy(mx.GameProxy.NAME));
                    gProxy.juqing_flag = 1;
                    dProxy.set_new_stage(data.data[0]);
                    break;
                case mx.MX_NOTICE.SHOW_AWARD:
                    dProxy.check_preward(data);
                    break;
                case mx.MX_NOTICE.NEXT_AWARD:
                    dProxy.get_preward();
                    break;
                case mx.MX_NOTICE.SHOW_RECHARGE:
                    this.facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.ShopAlert.S_NAME, "param": 2 });
                    break;
                case mx.MX_NETS.SC_SYS_MESSAGE:
                    dProxy.sys_message(data);
                    break;
                case mx.MX_NETS.SC_CHAT_ZINV:
                    dProxy.init_chat_zinv(data);
                    break;
                case mx.MX_NETS.SC_SHARE_YBNLI:
                    dProxy.init_ybnli_info(data);
                    break;
                case mx.MX_NETS.SC_CHAT_KANJIA:
                    dProxy.init_kanjia_cb(data);
                    break;
                case mx.MX_NETS.SC_CHAT_KANJIA_JUJUE:
                    dProxy.kanjia_jujue_cb(data);
                    break;
                case mx.MX_NETS.SC_CHAT_KANJIA_AGREE:
                    dProxy.kanjia_agree_cb(data);
                    break;
                case mx.MX_NETS.SC_SHIJIAN_LY_DEAL:
                    dProxy.shijian_ly_deal_cb(data);
                    break;
                case mx.MX_NETS.SC_SHARE_FZ:
                    dProxy.init_share_fz(data);
                    break;
                case mx.MX_NETS.SC_WB_YBNL_YQJL:
                    dProxy.init_ybnl_yqjl(data);
                    break;
                case mx.MX_NETS.SC_WB_YBNL_LQ:
                    dProxy.init_ybnl_jllq(data);
                    break;
                case mx.MX_NETS.SC_WB_YBNL_YQTHHD:
                    dProxy.init_ybnl_hongdian(data);
                    break;
                case mx.MX_NETS.SC_INIT_SHIHE:
                    dProxy.init_shihe(data);
                    break;
                case mx.MX_NETS.SC_QUCHU_SHIHE:
                    dProxy.quchu_shihe(data);
                    break;
                case mx.MX_NETS.SC_FANGRU_SHIHE:
                    dProxy.fangru_shihe(data);
                    break;
                case mx.MX_NETS.SC_GET_RANK_INFO:
                    //dProxy.init_rank_info(data);
                    break;
                default:
                    break;
            }
        };
        DataCommand.NAME = "DataCommand";
        return DataCommand;
    }(puremvc.SimpleCommand));
    mx.DataCommand = DataCommand;
    __reflect(DataCommand.prototype, "mx.DataCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=DataCommand.js.map