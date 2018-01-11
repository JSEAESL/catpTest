/**
 *   @author hxj
 *   @date 2017.12.22
 *   @desc 添加桌面
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
    var AddTableView = (function (_super) {
        __extends(AddTableView, _super);
        function AddTableView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.award_arr = [
                { "source": "sczmltpai_png", "id": 2000, "type": 4 },
                { "source": "sczmsswjing_png", "id": 2019, "type": 4 },
                { "source": "sczmdyb_png", "type": 1 },
                { "source": "sczmybao_png", "type": 2 },
            ];
            return _this;
        }
        AddTableView.mx_support = function () {
            return ["assets.share_addtable", "api.QINMI", "api.TJZMAWARD", "api.EQUIP"];
        };
        AddTableView.prototype.show_dg = function () {
            var a = new mx.GeneralEffect("fszmbxiang");
            a.play_by_times(-1);
            this.dg_g.addChild(a);
        };
        AddTableView.prototype.init_view_by_type = function () {
            //DataTool.getInstance().data_tool("DESK_OPEN");
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.AddTableViewMediator(this));
            this.show_dg();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            if (!gproxy.tishi_data.desktop) {
                this.baoxiang_state.source = "sczmylqu_png";
            }
            this.award_list.dataProvider = new eui.ArrayCollection(this.award_arr);
            this.award_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.award_click, this);
            this.add_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addtotable, this);
        };
        AddTableView.prototype.award_click = function (e) {
            var target = e.itemRenderer;
            var point = target.parent.localToGlobal(target.x, target.y);
            var p_d = {
                "x": point.x,
                "y": point.y,
                "w": target.width,
                "h": target.height,
                "id": e.item.id,
                "type": e.item.type,
            };
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_UI, p_d);
        };
        AddTableView.prototype.fresh_view = function () {
            this.baoxiang_state.source = "sczmylqu_png";
        };
        AddTableView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, AddTableView.S_NAME);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CHECK_MAIN_ALERT); //主动关闭时检查下一个弹窗
        };
        AddTableView.prototype.addtotable = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = facade.retrieveProxy(mx.GameProxy.NAME);
            /*if (this.add_b.res_name == 'zfxlqjli_png') {
                facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, { "t": mx.MX_NETS.CS_ADD_TABLE_REWARD });
            } else if (this.add_b.res_name == 'tjzmljtjaniu_png') {*/
            //DataTool.getInstance().data_tool("DESK_CLICK");
            if (window && window["addQQGameShortcut"]) {
                window["addQQGameShortcut"]();
            }
            /*
            this.tid = egret.setTimeout(()=>{
                if(window && window["create_shortcut"]){
                    window["create_shortcut"](true);
                }
            }, this, 500);
            */
            //}
        };
        AddTableView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.add_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addtotable, this);
            view.award_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.award_click, this);
            view.award_list.dataProvider = null;
            mx.ApplicationFacade.getInstance().removeMediator(mx.AddTableViewMediator.NAME);
            for (var i = 0; i < this.dg_g.numChildren; i++) {
                var a = this.dg_g.getChildAt(i);
                a.on_remove();
            }
        };
        AddTableView.S_NAME = "AddTableView";
        return AddTableView;
    }(mx.AlertView));
    mx.AddTableView = AddTableView;
    __reflect(AddTableView.prototype, "mx.AddTableView");
})(mx || (mx = {}));
//# sourceMappingURL=AddTableView.js.map