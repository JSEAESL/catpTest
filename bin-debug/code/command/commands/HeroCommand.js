/**
 * mx
 * 英雄(美男)-团队管理
 * 2016/05/24.
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
    var HeroCommand = (function (_super) {
        __extends(HeroCommand, _super);
        function HeroCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //注册消息
        HeroCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_LIST, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHERO_INFO, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_EQUIP, HeroCommand);
            //this.facade.registerCommand(MX_NETS.SC_HERO_UNEQUIP, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_UPPZ, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_UPXX, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SAVE_QUEUE, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHANGE_QUEUE, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_QUEUE_INFO, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_UPLV, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_INIT_SKILL, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SKILL_LEVELUP, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_BUY_SKILLPOINT, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ADD_HERO, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHERO_LHSDH, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_YUEHUI_STATE, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ALL_JUQING, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_PASS_JUQING, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_USE_PJCYD, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_YUEHUI, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HERO_YUEHUIVIEW, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_INIT_XUYUUAN, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XUYUUAN, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JINLI, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_JIUZI_UP, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CHERO_FYUP, HeroCommand);
            // this.facade.registerCommand(MX_NETS.SC_SHOURU, HeroCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HUNPO_ZHUANHUA, HeroCommand);
        };
        HeroCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var hProxy = (this.facade.retrieveProxy(mx.HeroProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_HERO_LIST://英雄列表
                    hProxy.init_hero_list(data);
                    break;
                case mx.MX_NETS.SC_CHERO_INFO://单英雄详细信息
                    hProxy.init_chero_info(data);
                    break;
                case mx.MX_NETS.SC_HERO_EQUIP://英雄装备物品
                    hProxy.chero_equip_cb(data);
                    break;
                /*case MX_NETS.SC_HERO_UNEQUIP://解装物品
                    hProxy.chero_unequip_cb(data);
                    break;*/
                case mx.MX_NETS.SC_HERO_UPPZ://升级品质（集齐装备）
                    hProxy.chero_uppz_cb(data);
                    break;
                case mx.MX_NETS.SC_HERO_UPXX://升级星星（集齐碎片）
                    hProxy.chero_upxx_cb(data);
                    break;
                case mx.MX_NETS.SC_SAVE_QUEUE://保存队列
                    hProxy.save_queue_cb(data);
                    break;
                case mx.MX_NETS.SC_CHANGE_QUEUE://切换出战队列
                    hProxy.change_queue_cb(data);
                    break;
                case mx.MX_NETS.SC_QUEUE_INFO://获取所有队列信息
                    hProxy.set_queue_info(data);
                    break;
                case mx.MX_NETS.SC_HERO_UPLV://英雄升级
                    hProxy.chero_uplv_cb(data);
                    break;
                case mx.MX_NETS.SC_INIT_SKILL://技能界面初始
                    hProxy.init_skill(data);
                    break;
                case mx.MX_NETS.SC_SKILL_LEVELUP://技能升级
                    hProxy.skill_levelup(data);
                    break;
                case mx.MX_NETS.SC_BUY_SKILLPOINT://购买技能点
                    hProxy.buy_skillpoint(data);
                    break;
                case mx.MX_NETS.SC_ADD_HERO://增加英雄
                    hProxy.add_new_hero(data);
                    break;
                case mx.MX_NETS.SC_CHERO_LHSDH://兑换英雄
                    hProxy.chero_lhsdh_cb(data);
                    break;
                case mx.MX_NETS.SC_HERO_YUEHUI_STATE://获取约会状态
                    hProxy.save_yuehui_cb(data);
                    break;
                case mx.MX_NETS.SC_ALL_JUQING://获取所有剧情状态
                    hProxy.save_juqing_cb(data);
                    break;
                case mx.MX_NETS.SC_HERO_PASS_JUQING://剧情通关状态
                    hProxy.juqing_pass(data);
                    break;
                case mx.MX_NETS.SC_USE_PJCYD://剧情通关状态
                    hProxy.use_pjcyd(data);
                    break;
                case mx.MX_NETS.SC_HERO_YUEHUI:
                    hProxy.fresh_yuehui(data);
                    break;
                case mx.MX_NETS.SC_HERO_YUEHUIVIEW://初始化约会
                    hProxy.init_yuehui(data);
                    break;
                case mx.MX_NETS.SC_INIT_XUYUUAN://许愿
                    hProxy.init_xuyuan(data);
                    break;
                case mx.MX_NETS.SC_XUYUUAN://
                    hProxy.xuyuan_cb(data);
                    break;
                case mx.MX_NETS.SC_JINLI://
                    hProxy.jinli_cb(data);
                    break;
                case mx.MX_NETS.SC_JIUZI_UP://
                    hProxy.jiuzi_up_cb(data);
                    break;
                case mx.MX_NETS.SC_CHERO_FYUP://封印之力升级
                    hProxy.hero_fyup(data);
                    break;
                // case MX_NETS.SC_SHOURU:
                //     hProxy.srhg(data);
                case mx.MX_NETS.SC_HUNPO_ZHUANHUA://
                    hProxy.hp_zhuanhua_cb(data);
                    break;
                default:
                    break;
            }
        };
        HeroCommand.NAME = "HeroCommand";
        return HeroCommand;
    }(puremvc.SimpleCommand));
    mx.HeroCommand = HeroCommand;
    __reflect(HeroCommand.prototype, "mx.HeroCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HeroCommand.js.map