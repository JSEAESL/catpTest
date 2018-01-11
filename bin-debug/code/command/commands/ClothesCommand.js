/**
 * qianjun
 * 服装数据处理
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
    var ClothesCommand = (function (_super) {
        __extends(ClothesCommand, _super);
        function ClothesCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ClothesCommand.prototype.register = function () {
            this.facade.registerCommand(mx.MX_NOTICE.CLOTHES_TAKE_CHANGE, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_GET_BY_TYPE, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_GET_DRESSED, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_QIANGHUA, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_JINJIE, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_DATE_TUIJIAN, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_ZHIZUO, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_BUY, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_DATA_CLOTH, ClothesCommand);
            this.facade.registerCommand(mx.MX_NETS.SC_CLOTH_REPLACE_DRESSED, ClothesCommand);
            this.facade.registerCommand(mx.MX_NOTICE.DATE_HUANZHUANG_TASK, ClothesCommand);
            this.facade.registerCommand(mx.MX_NOTICE.TEMPLE_HZHUANG_TEST, ClothesCommand);
            this.facade.registerCommand(mx.MX_NOTICE.ALL_BUY_CLOTH, ClothesCommand);
        };
        ClothesCommand.prototype.execute = function (notification) {
            var data = notification.getBody();
            var cProxy = (this.facade.retrieveProxy(mx.ClothesProxy.NAME));
            switch (notification.getName()) {
                case mx.MX_NOTICE.CLOTHES_TAKE_CHANGE:
                    cProxy.take_clothes_change(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_GET_BY_TYPE:
                    cProxy.init_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_GET_DRESSED:
                    cProxy.init_dressed_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_QIANGHUA:
                    cProxy.set_qianghua_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_JINJIE:
                    cProxy.set_jinjie_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_DATE_TUIJIAN:
                    //cProxy.init_tuijian_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_ZHIZUO:
                    cProxy.set_zhizuo_clothes(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_BUY:
                    cProxy.set_buy_clothes(data);
                    break;
                case mx.MX_NETS.SC_DATA_CLOTH:
                    cProxy.add_cloth(data);
                    break;
                case mx.MX_NETS.SC_CLOTH_REPLACE_DRESSED:
                    cProxy.save_cloth(data);
                    break;
                case mx.MX_NOTICE.DATE_HUANZHUANG_TASK:
                    cProxy.change_scene_date_huanzhuang(data);
                    break;
                case mx.MX_NOTICE.TEMPLE_HZHUANG_TEST:
                    cProxy.change_temple_huanzhuang(data);
                    break;
                case mx.MX_NOTICE.ALL_BUY_CLOTH:
                    cProxy.buy_clothes(data);
                    break;
                default:
                    break;
            }
        };
        ClothesCommand.NAME = "Clothes";
        return ClothesCommand;
    }(puremvc.SimpleCommand));
    mx.ClothesCommand = ClothesCommand;
    __reflect(ClothesCommand.prototype, "mx.ClothesCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=ClothesCommand.js.map