/**
 * @qianjun
 * /2016.8.29
 * 解除封印view
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
    var JCFYView = (function (_super) {
        __extends(JCFYView, _super);
        function JCFYView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.c_type = []; //类型按钮组
            _this.id_arr = [];
            _this.cur_type = 0;
            _this.fy_type = 0;
            _this.slt_arr = []; //选中图片对应id
            return _this;
        }
        JCFYView.mx_support = function () {
            return ["assets.yhjs_alert", "api.ACTHUYAOTASK", "api.STAGE", "api.JINJI", "api.FENGJUE", "api.FENGJUE"];
        };
        JCFYView.prototype.init_view = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var view = this;
            view.fy_type = view.adata;
            mx.DataTool.getInstance().data_tool("HUYAO_ALERT", { "type": "hyrw" + view.adata }); //统计狐妖界面被打开次数
            view.cur_type = 0;
            view.biaoti.source = view.fy_type + "fyin_png";
            // let obj = {
            // 	"1" : ["hzzlu","ljtzhi","jltxia"],
            // 	"2" : ["zxncai","qjmgu"],
            // 	"3" : ["jlsqian","lfcxiang","yysge","qytxiang"],
            // 	"4" : ["txwdi"],
            // 	"5" : ["rmkhu","hslhe"],
            // };
            var obj = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUYAO, "kaiqi", view.fy_type);
            var name = [];
            this.c_type = [];
            this.id_arr = [];
            for (var i in obj) {
                name.push(obj[i].name);
                this.c_type.push(Number(i));
                this.id_arr.push(obj[i].id);
            }
            view.typename = name;
            view.type_list.selectedIndex = 0;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            this.show_list();
            this.init_listener();
            this.fresh_time();
            facade.registerMediator(new mx.JCFYViewMediator(this));
        };
        JCFYView.prototype.type_click = function (e) {
            this.cur_type = e.item.type;
            var view = this;
            this.show_list();
        };
        Object.defineProperty(JCFYView.prototype, "proxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ActyProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JCFYView.prototype.show_list = function (newType) {
            if (newType === void 0) { newType = false; }
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            //任务详情 等级 侍从 竞技场 掠夺 服装 
            //初始化类型按钮组
            var item_arr = [];
            var proxy = (facade.retrieveProxy(mx.ActyProxy.NAME));
            for (var k in this.typename) {
                var ztab = void 0, der = 1, name_position = 0;
                if (this.c_type[k] == 0) {
                    ztab = "zytab_png";
                    der = -1;
                    name_position = -10;
                }
                else if (this.c_type[k] == this.typename.length - 1) {
                    ztab = "zytab_png";
                    name_position = 10;
                }
                else {
                    ztab = "zjtab_png";
                }
                var ts = proxy.get_hy_huodong_ts_type(this.id_arr[k]);
                var complete = proxy.get_hy_complete("type", this.id_arr[k]);
                item_arr.push({
                    "type_name": this.typename[k] + "_png",
                    "type": this.c_type[k],
                    "down": ztab,
                    "up": "",
                    "der": der,
                    "name_position": name_position,
                    "ts": ts ? "tishi_png" : (complete ? null : "tishi3_png")
                });
            }
            view.type_list.dataProvider = new eui.ArrayCollection(item_arr);
            view.fenge_p.width = 20 + 120 * item_arr.length;
            var layout = view.type_list.layout;
            layout.gap = item_arr.length > 4 ? 6 : 8;
            //let proxy = <ActyProxy><any>(facade.retrieveProxy(ActyProxy.NAME));
            //当前任务类型
            var cur_task_type = this.id_arr[this.cur_type];
            var tasks = mx.ApiTool.getAPINodes(mx.MX_APINAME.ACTHUYAOTASK, "type", cur_task_type);
            var arr = [];
            for (var i in tasks) {
                arr.push({
                    "type": tasks[i].type,
                    "canshu": tasks[i].canshu,
                    "awards": tasks[i].awards,
                });
            }
            var old = view.acty_scro.viewport.scrollV;
            view.act_list.itemRenderer = mx.FYJCTaskRender;
            view.act_list.dataProvider = new eui.ArrayCollection(tasks);
            view.act_list.validateNow();
            if (newType) {
                view.acty_scro.viewport.scrollV = old;
            }
        };
        JCFYView.prototype.fresh_time = function () {
            var view = this;
            var cold = this.proxy.yhu_res;
            if (cold > 86400) {
                cold -= 86400;
            }
            var time = mx.Tools.format_second2(cold);
            view.time_t.text = "解封剩余时间：" + time;
        };
        JCFYView.prototype.btn_click = function (e) {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.back_b:
                    if (this.proxy.yiwei_yaohu) {
                        this.proxy.yiwei_yaohu = false;
                        facade.sendNotification(mx.MX_NOTICE.YIWEI_YAOHU);
                    }
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, JCFYView.S_NAME);
                    break;
            }
        };
        JCFYView.prototype.init_listener = function () {
            var view = this;
            view.type_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.back_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
        };
        JCFYView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.type_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.type_click, this);
            view.back_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            mx.ApplicationFacade.getInstance().removeMediator(mx.JCFYViewMediator.NAME);
        };
        JCFYView.S_NAME = "JCFYView";
        return JCFYView;
    }(mx.BasicView));
    mx.JCFYView = JCFYView;
    __reflect(JCFYView.prototype, "mx.JCFYView");
})(mx || (mx = {}));
//# sourceMappingURL=JCFYView.js.map