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
    var TuJianJQBJAlert = (function (_super) {
        __extends(TuJianJQBJAlert, _super);
        function TuJianJQBJAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianJQBJAlert.mx_support = function () {
            return ["assets.tujian_jqbj"];
        };
        TuJianJQBJAlert.prototype.init_view_by_type = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
            var info = gproxy.main_task_info;
            var now_task = 0;
            for (var i in info) {
                var c_d = info[i];
                var c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", c_d.task_id);
                if (Number(c_api.step1_id)) {
                    if (c_d.juqing == 0) {
                        now_task = Number(c_d.task_id) - 1;
                    }
                    else {
                        now_task = Number(c_d.task_id);
                    }
                    break;
                }
            }
            if (now_task == 0) {
                now_task = mx.MX_COMMON.JUQING_TASK; //最终章节任务id
            }
            fproxy.now_task = now_task;
            var task_info = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", now_task);
            var stage_id = task_info.finish_parameter.split('|');
            var cid = stage_id[0];
            var api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", cid);
            var chapter = Number(api.ChapterID);
            var arr = [];
            for (var k = 1; k <= 14; k++) {
                var flag = k <= chapter;
                arr.push({
                    "bg": flag ? "jqbj" + k + "_png" : "jqbjhui" + k + "_png",
                    "flag": flag,
                    "di": flag ? "zhang_png" : "zhang-pre_png",
                    "chapter": k,
                });
            }
            this.bj_list.itemRenderer = mx.TuJianJQBJRender;
            this.bj_list.dataProvider = new eui.ArrayCollection(arr);
            this.bj_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        TuJianJQBJAlert.prototype.onTabChange = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.flag) {
                var fproxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                var stage_apis = mx.ApiTool.getAPINodes(mx.MX_APINAME.STAGE, "ChapterID", e.item.chapter);
                for (var k in stage_apis) {
                    var api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "finish_parameter", stage_apis[k].id + "|1");
                    if (api) {
                        fproxy.tar_jq_stage = api.id;
                        break;
                    }
                }
                facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TuJianJQZJAlert.S_NAME });
            }
            else {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.tj00006 });
            }
        };
        TuJianJQBJAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.bj_list.dataProvider = null;
            this.bj_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTabChange, this);
        };
        TuJianJQBJAlert.S_NAME = "TuJianJQBJAlert";
        TuJianJQBJAlert.V_MODE = mx.MX_COMMON.VM_ALL_ALERT;
        return TuJianJQBJAlert;
    }(mx.AlertView));
    mx.TuJianJQBJAlert = TuJianJQBJAlert;
    __reflect(TuJianJQBJAlert.prototype, "mx.TuJianJQBJAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianJQBJAlert.js.map