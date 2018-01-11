/**
 * mx
 * 养心殿相关
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
    var YXDianCommand = (function (_super) {
        __extends(YXDianCommand, _super);
        function YXDianCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        YXDianCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_INFO, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_SHIQIN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_CHILDREN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_PF_CIZI, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_PF_XIAOZI, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_SQ_EVENT, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_LENGGONG, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_YXD_LGFZINFO, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_LENGGONG_NUM, YXDianCommand);
            //this.facade.registerCommand(MX_NETS.SC_YXD_CHUGONG,YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HOUGONG_WEIFEN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CEFENG_WEIFEN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FZ_INFO, YXDianCommand);
            this.facade.registerCommand(mx.MX_NOTICE.SET_CXG_FZ, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FZ_NANCHAN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HG_SHIJIAN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_ADD_LENGGONG, YXDianCommand);
            this.facade.registerCommand(mx.MX_NOTICE.YXD_ADD_MN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_FZ_SCDJ, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_TANWANG, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_PINGJIA, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_XINGGE_SELECT, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HZS_HYZJ, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CFZ_INFO, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHIJIAN, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_RENLIAN_RONGHE, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_RENLIAN_REVERT, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GUIZU_HUAPI, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GUIZU_GUITAI, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HOUGONG_PROPERTY, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HLY_FEIZI, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_HOUGONG_LEVELUP, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_XUANZE_TAIFU, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHOURU, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHIJIAN_CHECHA, YXDianCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_MAIN_LH, YXDianCommand);
        };
        YXDianCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var pProxy = (this.facade.retrieveProxy(mx.PalaceProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_CFZ_INFO:
                    pProxy.init_fz_info(data);
                    break;
                case mx.MX_NETS.SC_FZ_SCDJ:
                    pProxy.scdj_fz_cb(data);
                    break;
                case mx.MX_NETS.SC_YXD_INFO:
                    pProxy.init_yxd_mn_d(data);
                    break;
                case mx.MX_NETS.SC_YXD_SHIQIN:
                    pProxy.shiqin_succ(data);
                    break;
                case mx.MX_NETS.SC_YXD_CHILDREN:
                    pProxy.init_yxd_zinv(data);
                    break;
                case mx.MX_NETS.SC_YXD_PF_CIZI:
                    pProxy.cizi_end(data);
                    break;
                case mx.MX_NETS.SC_YXD_PF_XIAOZI:
                    pProxy.xiaozi_end(data);
                    break;
                case mx.MX_NETS.SC_YXD_SQ_EVENT:
                    pProxy.sq_event_cb(data);
                    break;
                case mx.MX_NETS.SC_YXD_LENGGONG:
                    pProxy.lenggong_cb(data);
                    break;
                case mx.MX_NETS.SC_YXD_LGFZINFO:
                    pProxy.init_lgfz_list(data);
                    break;
                case mx.MX_NETS.SC_HOUGONG_WEIFEN://获取后宫位分
                    pProxy.save_weifen_cb(data);
                    break;
                case mx.MX_NETS.SC_CEFENG_WEIFEN://册封位分
                    pProxy.cefeng_weifen(data);
                    break;
                case mx.MX_NETS.SC_SHOURU:
                    pProxy.cefeng_weifen(data);
                    break;
                case mx.MX_NETS.SC_FZ_INFO://妃子简介
                    pProxy.feizi_jianjie_cb(data);
                    break;
                case mx.MX_NOTICE.SET_CXG_FZ:
                    pProxy.cur_cxgfz = data;
                    break;
                case mx.MX_NETS.SC_FZ_NANCHAN:
                    pProxy.nanchan_cb(data);
                    break;
                case mx.MX_NETS.SC_HG_SHIJIAN:
                    pProxy.init_shijian(data);
                    break;
                case mx.MX_NETS.SC_ADD_LENGGONG:
                    pProxy.add_longgongfz(data);
                    break;
                case mx.MX_NOTICE.YXD_ADD_MN:
                    pProxy.add_yxd_mn(data);
                    break;
                case mx.MX_NETS.SC_HZS_TANWANG:
                    pProxy.hzs_tanwang_zinv(data);
                    break;
                case mx.MX_NETS.SC_HZS_PINGJIA:
                    pProxy.hzs_pingjia_zinv(data);
                    break;
                case mx.MX_NETS.SC_HZS_XINGGE_SELECT:
                    pProxy.hzs_xingge_select(data);
                    break;
                case mx.MX_NETS.SC_HZS_HYZJ:
                    pProxy.hzs_hyzj(data);
                    break;
                case mx.MX_NETS.SC_SHIJIAN:
                    pProxy.init_shijian_info(data);
                    break;
                case mx.MX_NETS.SC_RENLIAN_RONGHE:
                    pProxy.renlian_ronghe(data);
                    break;
                case mx.MX_NETS.SC_RENLIAN_REVERT:
                    pProxy.renlian_revert(data);
                    break;
                case mx.MX_NETS.SC_GUIZU_HUAPI:
                    pProxy.guizu_huapi_cb(data);
                    break;
                case mx.MX_NETS.SC_GUIZU_GUITAI:
                    pProxy.guizu_guitai_cb(data);
                    break;
                case mx.MX_NETS.SC_LENGGONG_NUM:
                    pProxy.lenggong_num_cb(data);
                    break;
                case mx.MX_NETS.SC_HOUGONG_PROPERTY:
                    pProxy.init_hougong_property(data);
                    break;
                case mx.MX_NETS.SC_HOUGONG_LEVELUP:
                    pProxy.hougong_levelup_cb(data);
                    break;
                case mx.MX_NETS.SC_HLY_FEIZI:
                    pProxy.init_hly(data);
                    break;
                case mx.MX_NETS.SC_XUANZE_TAIFU:
                    pProxy.xuanze_taifu_cb(data);
                    break;
                case mx.MX_NETS.SC_SHIJIAN_CHECHA:
                    pProxy.shijian_checha_cb(data);
                    break;
                case mx.MX_NETS.SC_MAIN_LH:
                    pProxy.set_main_lh(data);
                default:
                    break;
            }
        };
        YXDianCommand.NAME = "YXDianCommand";
        return YXDianCommand;
    }(puremvc.SimpleCommand));
    mx.YXDianCommand = YXDianCommand;
    __reflect(YXDianCommand.prototype, "mx.YXDianCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=YXDianCommand.js.map