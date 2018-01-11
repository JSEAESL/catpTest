/**
*   @author mx
*   @date 2015.1.3
*   @desc 任务奖励彈窗
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
    var TaskReward = (function (_super) {
        __extends(TaskReward, _super);
        function TaskReward() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TaskReward.mx_support = function () {
            return ["assets.taskreward"];
        };
        TaskReward.prototype.get_guide_pos = function (gkey) {
            var tar = this.exit_b;
            return tar;
        };
        TaskReward.prototype.init_view_by_type = function () {
            var cd = this.adata;
            var zg = new mx.GeneralEffect("rwjl");
            this.ef_g.addChild(zg);
            zg.play_by_times(-1);
            zg.scaleX = zg.scaleY = 1.5;
            var info, arr;
            if (cd.type == "day") {
                info = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", cd.id);
                arr = mx.Tools.MAXLEVEL ? info.maxlevel_reward : info.reward;
            }
            else {
                info = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", cd.id);
                arr = info.reward;
            }
            if (arr == 0) {
                arr = "1:0*12500"; //?????
            }
            arr = arr.split("|");
            var arr2 = [];
            for (var k in arr) {
                var c_d = arr[k].split(":"); //type：id*sl
                var num = c_d[1].split("*");
                var item = mx.Tools.get_item_info(c_d[0], num[0]);
                arr2.push({
                    "type": c_d[0],
                    "id": num[0],
                    "num": num[1],
                    "no_num": true,
                    "di_cor": 0x6E57A3,
                    "di_size": 20,
                    "top": 100,
                    "width": 90,
                    "chicun": 90,
                    "height": 120
                });
            }
            this.item_list.itemRenderer = mx.GNumRender;
            this.item_list.dataProvider = new eui.ArrayCollection(arr2);
            var reward_width = 441;
            if (arr2.length < 4) {
                reward_width = arr2.length * 90 + (arr2.length - 1) * 26;
            }
            this.item_list.width = reward_width;
            var distance_bottom = 133;
            var distance_top = 87;
            var might_top = 66;
            if (cd.reward_tip) {
                this.tip_t.visible = true;
                this.tip_t.text = cd.reward_text;
                might_top = distance_top + this.tip_t.height;
            }
            else {
                this.tip_t.visible = false;
            }
            this.item_list.top = might_top;
            var hang = Math.ceil(arr2.length / 4);
            this.di_p.height = might_top + distance_bottom + (this.item_list.height + 10) * hang;
            if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
            }
            else {
                this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            }
        };
        TaskReward.prototype.mx_test2 = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test2, this);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        TaskReward.prototype.close_self = function () {
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.TaskView.S_NAME });
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, TaskReward.S_NAME);
            facade.sendNotification(mx.MX_NOTICE.TASK_EF);
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            dproxy.check_lv_up();
        };
        TaskReward.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.item_list.dataProvider = null;
        };
        TaskReward.S_NAME = "TaskReward";
        return TaskReward;
    }(mx.AlertView));
    mx.TaskReward = TaskReward;
    __reflect(TaskReward.prototype, "mx.TaskReward");
})(mx || (mx = {}));
//# sourceMappingURL=TaskReward.js.map