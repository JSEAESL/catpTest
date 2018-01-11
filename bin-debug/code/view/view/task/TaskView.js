/**
*   @author mx
*   @date 2015.1.3
*   @desc 任务彈窗
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
    var TaskView = (function (_super) {
        __extends(TaskView, _super);
        function TaskView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.typename = ["tab_zxrw", "tab_rcrw"];
            _this.cur_type = 1; //1主线任务 2日常任务
            return _this;
        }
        TaskView.mx_support = function () {
            return ["assets.task", "api.STAGE", "api.DAILYACTIVITY", "api.EQUIP", "api.VIP"];
        };
        TaskView.prototype.get_guide_pos = function (gkey) {
            var tar = this.task_list.getChildAt(0);
            switch (gkey) {
                case "v_rw_qwjq"://剧情
                    var item = tar.data;
                    var facade = mx.ApplicationFacade.getInstance();
                    switch (item.jd) {
                        case 3://需要显示剧情，正常引导
                            break;
                        case 0://需要打副本
                            facade.sendNotification(mx.MX_NOTICE.SKIP_GUIDE); //跳一步
                            break;
                        case 1://领奖励
                            facade.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                                "gkey": "m_rw", "touch": "v_rw_jl", "gid": mx.MX_COMMON.IN_GUIDE == 2 ? 41 : 0
                            });
                            break;
                    }
                    break;
                case "v_rw_qwfb": //副本
                case "v_rw_jl"://奖励                  
                    break;
                case "v_rw_gb":
                    tar = this.exit_b;
                    return tar;
            }
            return tar.fun_b;
        };
        TaskView.prototype.init_view_by_type = function () {
            var view = this;
            this.task_list.itemRenderer = mx.TaskRender;
            view.tab_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            this.fresh_pop();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.TaskViewMediator(this));
        };
        TaskView.prototype.check_task_tishi = function () {
            var view = this;
            var gproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.GameProxy.NAME);
            var tishi = gproxy.tishi_data;
            var task_tishi = [];
            task_tishi[0] = false;
            var tasks = gproxy.main_task_info;
            for (var i in tasks) {
                var task = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", tasks[i].task_id);
                if (tasks[i].state == 1) {
                    if (task.step1_id == 0 || tasks[i].juqing == 1) {
                        task_tishi[0] = true;
                        break;
                    }
                }
            }
            task_tishi[1] = tishi['daytask'];
            var item_arr = [];
            for (var i = 0; i < this.typename.length; i++) {
                if (this.typename[i] != "") {
                    item_arr.push({
                        "word": this.typename[i] + '0_png',
                        "word2": this.typename[i] + '1_png',
                        "tishi": task_tishi[i] ? true : false,
                    });
                }
            }
            view.tab_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.tab_list.selectedIndex = this.cur_type - 1;
        };
        TaskView.prototype.fresh_pop = function (d) {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var arr = [];
            var arr2;
            this.check_task_tishi();
            if (this.cur_type == 2) {
                this.currentState = this.skin.currentState = "day";
                var info = gproxy.day_task_info; //每日任务信息
                for (var k in info) {
                    var c_d = info[k];
                    var c_api = void 0;
                    if (Number(c_d.id) == 1) {
                        var now_time = Math.floor(new Date().getTime() / 1000); //当前时间戳
                        var server_time = now_time - gproxy.client_day_time + gproxy.server_day_time; //服务端当前时间戳
                        var time = Number(new Date(server_time * 1000).getUTCHours());
                        if (time < 6) {
                            c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", 1);
                        }
                        else if (time < 12) {
                            c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", 2);
                        }
                        else {
                            c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", 3);
                        }
                    }
                    else {
                        if (c_d.lq == 1 && Number(c_d.id) != 4) {
                            continue;
                        }
                        c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.DAILYACTIVITY, "id", c_d.id);
                        if (!c_api) {
                            continue;
                        }
                    }
                    c_api.type = "day";
                    c_api.jd = c_d.lq; //0未达成，1已经领取，2可领取
                    c_api.cond = c_d.cond;
                    c_api.month = c_d.month;
                    if (Number(c_api.released) == 0) {
                        continue;
                    }
                    if (Number(c_api.jd) != 1 || Number(c_api.id) == 4) {
                        arr.push(c_api);
                    }
                    c_api = null;
                }
                this.task_list.itemRenderer = mx.TaskRender2;
                arr2 = [1, 0, 2];
            }
            else {
                this.currentState = this.skin.currentState = "main";
                var info = gproxy.main_task_info;
                for (var i in info) {
                    var c_d = info[i];
                    var c_api = mx.ApiTool.getAPINode(mx.MX_APINAME.TASK, "id", c_d.task_id);
                    c_api.jd = c_d.state; //1可以领取，0不能领取。2已领取
                    c_api.cond = c_d.cond; //已完成进度
                    c_api.all = c_d.num;
                    c_api.jq = Number(c_d.juqing);
                    c_api.type = "main";
                    if (Number(c_api.jd) != 2) {
                        arr.push(c_api);
                    }
                    c_api = null;
                }
                for (var k in arr) {
                    var info_1 = arr[k];
                    if (Number(info_1.step1_id)) {
                        if (info_1.jq == 0) {
                            info_1.jd = 3; //有剧情且未完成
                        }
                        else {
                            var task = gproxy.tishi_data.task;
                            task[1] = 1;
                            var task_data = { "bg": "task_png", "task": task };
                            // facade.sendNotification(MX_NOTICE.FRESH_CSCREEN, task_data, MainScreen.S_NAME);//刷新主线任务图标
                        }
                    }
                }
                this.task_list.itemRenderer = mx.TaskRender;
                arr2 = [1, 3, 0, 2];
            }
            arr = arr.sort(function (a, b) {
                var res = arr2[b.jd] - arr2[a.jd]; //按层级关系排序
                if (res == 0) {
                    res = a.step2_type - b.step2_type;
                }
                return res;
            });
            if (this.task_scroll.viewport) {
                var old = this.task_scroll.viewport.scrollV;
                this.task_list.dataProvider = new eui.ArrayCollection(arr);
                this.task_list.validateNow();
                this.task_scroll.viewport.scrollV = old;
            }
            else {
                this.task_list.dataProvider = new eui.ArrayCollection(arr);
            }
        };
        TaskView.prototype.tab_click = function (e) {
            //      console.log("aaaaaaaaa")
            this.cur_type = e.itemIndex + 1;
            this.task_scroll.stopAnimation();
            this.task_list.scrollV = 0;
            this.task_list.validateNow();
            this.fresh_pop(e.itemIndex);
        };
        TaskView.prototype.show_ef = function () {
            var ef_g = this.ef_g;
            var zg = ef_g.getChildByName("rwdc2");
            if (!zg) {
                zg = new mx.GeneralEffect("rwdc2");
                ef_g.addChild(zg);
            }
            var zg2 = ef_g.getChildByName("rwdc1");
            if (!zg2) {
                zg2 = new mx.GeneralEffect("rwdc1");
                ef_g.addChild(zg2);
            }
        };
        TaskView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.task_list.dataProvider = null;
            var facade = mx.ApplicationFacade.getInstance();
            this.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            facade.sendNotification(mx.MX_NOTICE.CHECK_MAIN_ALERT); //最后一步引导，打开充值弹窗
            facade.removeMediator(mx.TaskViewMediator.NAME);
        };
        TaskView.S_NAME = "TaskView";
        return TaskView;
    }(mx.AlertView));
    mx.TaskView = TaskView;
    __reflect(TaskView.prototype, "mx.TaskView");
})(mx || (mx = {}));
//# sourceMappingURL=TaskView.js.map