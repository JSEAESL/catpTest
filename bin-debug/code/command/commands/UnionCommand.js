/**
 * cy
 * 家族相关
 * 2017/4/18.
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
    var UnionCommand = (function (_super) {
        __extends(UnionCommand, _super);
        function UnionCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_BUILD, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_INIT, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_SHENQ, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_SQLIST, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_AGREE, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_REFUSE, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_REFUSES, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_QUIT, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_SEARCH, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_TIREN, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RENMIN, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_GONGGAO, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_CHEXIAO, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_LIST, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_LOG, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RENAME, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_MAIN, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RIZHI, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_MLIST, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RULER, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RANDTEN, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_DONATE, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_SHOP, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_DUIHUAN, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_FRESH, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_RANK, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_DONATES, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_SHENQING_LIST, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_UNION_KSJR, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_INIT_JZXF, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_GOUM_JZXF, UnionCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_PAIH_JZXF, UnionCommand);
        };
        UnionCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var uProxy = (this.facade.retrieveProxy(mx.UnionProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NETS.SC_UNION_BUILD:
                    uProxy.build_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_LIST:
                    uProxy.union_list_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_SHENQ:
                    uProxy.union_shenqing_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_CHEXIAO:
                    uProxy.union_cxsq_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_MAIN:
                    uProxy.init_union(data);
                    break;
                case mx.MX_NETS.SC_UNION_RANDTEN:
                    uProxy.union_randten_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_SEARCH:
                    uProxy.union_search_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_INIT:
                    uProxy.union_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_LOG:
                    uProxy.union_logo_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_RENAME:
                    uProxy.union_name_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_MLIST:
                    uProxy.union_member_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_SQLIST:
                    uProxy.union_sqlist_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_AGREE:
                    uProxy.union_agree_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_REFUSE:
                    uProxy.union_refuse_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_REFUSES:
                    uProxy.union_refuses_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_TIREN:
                    uProxy.union_tiren_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_QUIT:
                    uProxy.union_quit_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_RULER:
                    uProxy.union_rule_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_RIZHI:
                    uProxy.union_log_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_GONGGAO:
                    uProxy.union_gonggao_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_RENMIN:
                    uProxy.union_renming_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_DONATES:
                    uProxy.union_donates_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_SHOP:
                    uProxy.union_shop_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_FRESH:
                    uProxy.fresh_union_shop(data);
                    break;
                case mx.MX_NETS.SC_UNION_DUIHUAN:
                    uProxy.duihuan_union_shop(data);
                    break;
                case mx.MX_NETS.SC_UNION_DONATE:
                    uProxy.union_donate_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_RANK:
                    uProxy.union_rank_cb(data);
                    break;
                case mx.MX_NETS.SC_SHENQING_LIST:
                    uProxy.union_sq_list_cb(data);
                    break;
                case mx.MX_NETS.SC_UNION_KSJR:
                    uProxy.union_ksjr_cb(data);
                    break;
                case mx.MX_NETS.SC_INIT_JZXF:
                    uProxy.union_init_jzxf(data);
                    break;
                case mx.MX_NETS.SC_GOUM_JZXF:
                    uProxy.union_goum_jzxf(data);
                    break;
                case mx.MX_NETS.SC_PAIH_JZXF:
                    uProxy.union_paih_jzxf(data);
                    break;
                default:
                    break;
            }
        };
        UnionCommand.NAME = "UnionCommand";
        return UnionCommand;
    }(puremvc.SimpleCommand));
    mx.UnionCommand = UnionCommand;
    __reflect(UnionCommand.prototype, "mx.UnionCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=UnionCommand.js.map