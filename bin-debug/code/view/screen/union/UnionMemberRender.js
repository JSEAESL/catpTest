/**
 *   @author cy
 *   @date 2017.4.22
 *   @desc 家族成员render
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
    var UnionMemberRender = (function (_super) {
        __extends(UnionMemberRender, _super);
        function UnionMemberRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UnionMemberRender.prototype.init_render = function () {
            this.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
            this.dataChanged();
        };
        UnionMemberRender.prototype.fun_click = function (e) {
            var data = this.data;
            var facade = mx.ApplicationFacade.getInstance();
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            uProxy.target_user_id = data.user_id;
            switch (e.item.bg) {
                case "jrtyi_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_AGREE,
                        "apply_id": data.user_id
                    });
                    break;
                case "jrjjue_png":
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_UNION_REFUSE,
                        "apply_id": data.user_id
                    });
                    break;
            }
        };
        UnionMemberRender.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.fun_list.dataProvider = null;
            this.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.fun_click, this);
        };
        UnionMemberRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            // this.g_g.height = data.style == 3 ? 81 : 69;
            // this.g_g.width = data.style == 3 ? 218 : 200;
            // if(data.beiti){
            //     this.height = 0;
            //     this.visible = false;
            // }else{
            //     this.height = this.g_g.height + 18;
            //     this.visible = true;
            // }
            var facade = mx.ApplicationFacade.getInstance();
            var source = "tx78_" + data.avatar + "_png";
            //this.tx_avatar.source = source;
            var uProxy = (facade.retrieveProxy(mx.UnionProxy.NAME));
            // this.lv_t.size = this.name_t.size = data.style == 3 ? 16 : 15;
            this.style1_g.visible = data.style != 3;
            this.style2_g.visible = data.style == 3;
            this.vip_t.text = data.vip;
            this.vip_t.left = 28;
            this.vip_t.top = 10;
            this.lv_t.text = mx.Tools.format(mx.Lang.bh001, data.level);
            this.name_t.text = data.name;
            this.gongxian_t.text = mx.Lang.jz029 + "：" + data.count;
            if (data.selected) {
                this.tx_bg.visible = true;
            }
            else {
                this.tx_bg.visible = false;
            }
            // this.di2_p.visible = this.di_p.visible = this.di3_p.visible = false;
            // switch(data.style){
            //     case 1://自己
            //         this.di3_p.visible = true;
            //         break;
            //     case 2://公会
            //         this.di_p.visible = true;
            //         break;
            //     case 3://申请
            //         this.di2_p.visible = true;
            //         break;
            // }
            this.fun_list.itemRenderer = mx.SSButtonRender;
            var t_arr = [
                { "bg": "jrtyi_png" },
                { "bg": "jrjjue_png" },
            ];
            this.fun_list.dataProvider = new eui.ArrayCollection(t_arr);
            var zhiwu = "cybqian_png";
            switch (Number(data.zhiwu)) {
                case 0://普通
                    zhiwu = "cybqian_png";
                    break;
                case 1://会长
                    zhiwu = "zzbqian_png";
                    break;
                case 2://副会长
                    zhiwu = "fzzbqian_png";
                    break;
                default://
                    var arr = ["ygbqian_png", "xgbqian_png", "hjbqian_png", "qjbqian_png"];
                    zhiwu = arr[Number(data.zhiwu) - 3];
                    break;
            }
            this.state_p.source = zhiwu;
        };
        return UnionMemberRender;
    }(mx.BasicRender));
    mx.UnionMemberRender = UnionMemberRender;
    __reflect(UnionMemberRender.prototype, "mx.UnionMemberRender");
})(mx || (mx = {}));
//# sourceMappingURL=UnionMemberRender.js.map