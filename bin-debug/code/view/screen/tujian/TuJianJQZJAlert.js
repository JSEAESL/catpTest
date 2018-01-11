/**
*   @author cy
*   @date 2017.11.15
*   @desc 剧情宝鉴
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
    var TuJianJQZJAlert = (function (_super) {
        __extends(TuJianJQZJAlert, _super);
        function TuJianJQZJAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_page = 1;
            _this.max_page = 1;
            _this.page_info = {};
            return _this;
        }
        TuJianJQZJAlert.mx_support = function () {
            return ["assets.tujian_jqzj"];
        };
        TuJianJQZJAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.registerMediator(new mx.TuJianJQZJAlertMediator(this));
            this.zj_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.fresh_view();
        };
        TuJianJQZJAlert.prototype.fresh_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var task_api2 = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", fproxy.tar_jq_stage);
            var stage_id = task_api2.finish_parameter.split('|');
            var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", stage_id[0]);
            var stage_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "ChapterID", stage_api.ChapterID);
            this.zj_p.source = "jqzj" + stage_api.ChapterID + "_png";
            var all_arr = [];
            for (var k in stage_apis) {
                var task_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "finish_parameter", stage_apis[k].id + "|1");
                if (task_api && Number(task_api.step1_id)) {
                    all_arr.push(Number(task_api.id));
                }
            }
            this.cur_page = Math.ceil((Number(all_arr.indexOf(fproxy.tar_jq_stage)) + 1) / 6);
            this.max_page = Math.ceil(all_arr.length / 6);
            this.page_info = {};
            for (var k = 1; k <= this.max_page; k++) {
                this.page_info[k] = all_arr.splice(0, 6);
            }
            this.fresh_list();
        };
        TuJianJQZJAlert.prototype.fresh_list = function () {
            this.btn_g.removeChildren();
            var ssb2 = new mx.SSButton();
            ssb2.set_ssres("jqzjpre_png");
            this.btn_g.addChild(ssb2);
            ssb2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            var ssb = new mx.SSButton();
            ssb.set_ssres("jqzjnext_png");
            this.btn_g.addChild(ssb);
            ssb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.page_click, this);
            ssb.visible = ssb2.visible = true;
            if (this.cur_page == 1) {
                //首页
                ssb2.visible = false;
            }
            else if (this.cur_page >= this.max_page) {
                //最后一页
                ssb.visible = false;
            }
            var stage = this.page_info[this.cur_page];
            var arr = [];
            var facade = mx.ApplicationFacade.getInstance();
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var now_task = fproxy.now_task;
            for (var k in stage) {
                var task_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", stage[k]);
                arr.push({
                    "index": 6 * (this.cur_page - 1) + Number(k) + 1,
                    "tar_jq": task_api.step1_id,
                    "name": task_api.name,
                    "flow": [{ "text": task_api.name, "style": { "underline": true } }],
                    "task_id": stage[k],
                    "id": task_api.step1_id,
                    "wkq": now_task < Number(task_api.id),
                    "cor": now_task < Number(task_api.id) ? 0xb1b1b1 : 0x000000,
                });
            }
            this.zj_list.dataProvider = new eui.ArrayCollection(arr);
        };
        TuJianJQZJAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var cd = e.item;
            if (cd.wkq) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.tj00006 });
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.AVGView.S_NAME,
                "param": {
                    "id": cd.id,
                    "type": "tjjq",
                    "title": cd.name,
                    "hua": cd.index,
                },
            });
        };
        TuJianJQZJAlert.prototype.page_click = function (e) {
            switch (e.currentTarget.res_name) {
                case "jqzjnext_png":
                    this.cur_page = Math.min(this.max_page, this.cur_page + 1);
                    break;
                case "jqzjpre_png":
                    this.cur_page = Math.max(1, this.cur_page - 1);
                    break;
            }
            this.fresh_list();
        };
        TuJianJQZJAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.zj_list.dataProvider = null;
            this.zj_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
            this.btn_g.removeChildren();
            mx.ApplicationFacade.getInstance().removeMediator(mx.TuJianJQZJAlertMediator.NAME);
        };
        TuJianJQZJAlert.S_NAME = "TuJianJQZJAlert";
        return TuJianJQZJAlert;
    }(mx.AlertView));
    mx.TuJianJQZJAlert = TuJianJQZJAlert;
    __reflect(TuJianJQZJAlert.prototype, "mx.TuJianJQZJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianJQZJAlert.js.map