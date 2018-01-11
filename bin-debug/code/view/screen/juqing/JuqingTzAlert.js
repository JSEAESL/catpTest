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
/**
*   @author qianjun
*   @date 2016.8.29
*   @desc 副本挑战弹窗
**/
var mx;
(function (mx) {
    var JuqingTzAlert = (function (_super) {
        __extends(JuqingTzAlert, _super);
        function JuqingTzAlert() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.sd_t = {
                "text": "",
                "size": 25,
                "horizontalCenter": 16,
                "verticalCenter": -2
            };
            return _this;
        }
        JuqingTzAlert.mx_support = function () {
            return ["assets.jq_tz", "api.VIP", "data.2109"];
        };
        JuqingTzAlert.prototype.get_guide_pos = function (gkey) {
            var tar;
            switch (gkey) {
                case "v_fb_tz"://关卡1
                    tar = this.tzhan_b;
                    break;
            }
            return tar;
        };
        Object.defineProperty(JuqingTzAlert.prototype, "fproxy", {
            get: function () {
                return (mx.ApplicationFacade.getInstance().retrieveProxy(mx.FubenProxy.NAME));
            },
            enumerable: true,
            configurable: true
        });
        JuqingTzAlert.prototype.init_view = function () {
            var view = this;
            view.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.exit_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzhan_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.stong_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            // this.draw_line(this.tili_g, new egret.Point(0, 35), new egret.Point(225, 35));
            // this.draw_line(this.getInfo_g, new egret.Point(0, 35), new egret.Point(225, 35));
            // this.init_listener();
            var fproxy = this.fproxy;
            var data = this.adata;
            var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", data.stage);
            view.stage_name_t.text = stage_api.stagename;
            view.ylq_p.visible = false;
            //背景
            view.bg.source = stage_api.icon + "bg_png";
            //奖励物品
            var arr2 = [];
            var award = stage_api.perfect_award;
            var award_item = award.split('|');
            for (var i in award_item) {
                var unit = award_item[i].split('*');
                var item = unit[0].split(':');
                var num = unit[1];
                arr2.push({
                    "id": item[1],
                    "type": item[0],
                    "chicun": 64,
                    'num': num,
                    "no_num": true,
                    'di_cor': 0x6B559D,
                    'di_size': 17,
                    'top': 71
                });
            }
            view.award_list.itemRenderer = mx.GNumRender;
            view.award_list.dataProvider = new eui.ArrayCollection(arr2);
            view.ylq_p.visible = Number(data.pass) > 0;
            if (mx.MX_COMMON.IN_GUIDE) {
                if (Math.abs(mx.Tools.screen_height - mx.MX_COMMON.GS_HEIGHT) < 4) {
                    mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.GET_GUIDE);
                }
                else {
                    this.c_g.addEventListener(eui.UIEvent.MOVE, this.mx_test, this);
                }
            }
        };
        JuqingTzAlert.prototype.mx_test = function (event) {
            this.c_g.removeEventListener(eui.UIEvent.MOVE, this.mx_test, this);
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.GET_GUIDE);
        };
        JuqingTzAlert.prototype.btn_click = function (e) {
            var view = this;
            var fproxy = this.fproxy;
            var data = this.adata;
            var facade = mx.ApplicationFacade.getInstance();
            switch (e.currentTarget) {
                case view.tzhan_b://挑战
                    facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                        "name": mx.AVGView.S_NAME,
                        "param": {
                            "cd": this.adata,
                            "type": "zhandou_before",
                        }
                    });
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, JuqingTzAlert.S_NAME);
                    break;
                case view.exit_b:
                case view.rect:
                    facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, JuqingTzAlert.S_NAME);
                    break;
                case view.stong_b:
                    var target = view.stong_b;
                    var stage_api = mx.ApiTool.getAPINode(mx.MX_APINAME.STAGE, "id", data.stage);
                    var point = target.parent.localToGlobal(target.x, target.y);
                    //奖励物品
                    var arr2 = [];
                    var award = stage_api.first_award;
                    var award_item = award.split('|');
                    for (var i in award_item) {
                        var unit = award_item[i].split('*');
                        var item = unit[0].split(':');
                        var num = unit[1];
                        arr2.push({
                            "item_id": item[1],
                            "award_type": item[0],
                            'num': num,
                        });
                    }
                    facade.sendNotification(mx.MX_NOTICE.SHOW_UI, {
                        "x": point.x + 154,
                        "y": point.y,
                        "w": target.width,
                        "h": target.height,
                        "type": "items",
                        "items": arr2,
                        "name": '首次通关宝箱内容',
                    });
                    break;
            }
        };
        JuqingTzAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.exit_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.tzhan_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            view.stong_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btn_click, this);
            //ApplicationFacade.getInstance().removeMediator(FBTZhanMediator.NAME);
        };
        JuqingTzAlert.S_NAME = "JuqingTzAlert";
        return JuqingTzAlert;
    }(mx.BasicView));
    mx.JuqingTzAlert = JuqingTzAlert;
    __reflect(JuqingTzAlert.prototype, "mx.JuqingTzAlert");
})(mx || (mx = {}));
//# sourceMappingURL=JuqingTzAlert.js.map