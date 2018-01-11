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
 * @author cy
 * @date 2017.9.7
 * 周末活动
 */
var mx;
(function (mx) {
    var ActyWeekendView = (function (_super) {
        __extends(ActyWeekendView, _super);
        function ActyWeekendView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ActyWeekendView.mx_support = function () {
            return ["assets.acty_weekend"];
        };
        ActyWeekendView.prototype.init_view_by_type = function () {
            this.fun_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.acty_click, this);
            var arr = {
                "8": ["cafbei_png", 0x76865e],
                "9": ["qzfbei_png", 0x447db0],
                "10": ["twfbei_png", 0x846296],
                "11": ["tqfbei_png", 0xbb6036],
                "12": ["jqfbei_png", 0x892f32],
            };
            var facade = mx.ApplicationFacade.getInstance();
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            if (aproxy.weekend_flag == 1) {
                facade.sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
            }
            var arr2 = [];
            for (var i = 8; i <= 12; i++) {
                var acty = void 0;
                var yugao = void 0;
                var starttime = void 0;
                var endtime = void 0;
                if (aproxy.acty_time2[i]) {
                    acty = aproxy.acty_time2[i];
                    yugao = false;
                    starttime = mx.Tools.format_time(acty.start, "yrsf", 2, true);
                    endtime = mx.Tools.format_time(acty.end, "yrsf", 2, true);
                }
                else if (aproxy.acty_time_show[i]) {
                    acty = aproxy.acty_time_show[i];
                    yugao = true;
                    starttime = mx.Tools.format_time(acty.start, "yrsf", 2, true);
                    endtime = mx.Tools.format_time(acty.end, "yrsf", 2, true);
                }
                else {
                    continue;
                }
                arr2.push({
                    "id": i,
                    "bg": arr[i][0],
                    "cor": arr[i][1],
                    "starttime": Number(acty.start),
                    "yugao": yugao,
                    "kaiqi": !yugao,
                    "time": starttime + "-" + endtime,
                });
            }
            arr2.sort(function (a, b) {
                if (a.yugao != b.yugao) {
                    return a.yugao ? 1 : -1;
                }
                return a.starttime - b.starttime;
            });
            if (arr2.length <= 2) {
                this.g_g.height = 336;
            }
            this.fun_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        ActyWeekendView.prototype.acty_click = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            if (e.item.yugao) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.jjkf });
                return;
            }
            var aproxy = facade.retrieveProxy(mx.ActyProxy.NAME);
            var pproxy = facade.retrieveProxy(mx.PackProxy.NAME);
            switch (e.item.bg) {
                case "cafbei_png":
                case "qzfbei_png":
                    pproxy.check_pack_type_item("11", "acty_yxd");
                    break;
                case "jqfbei_png":
                    // let fProxy = <FubenProxy><any>(facade.retrieveProxy(FubenProxy.NAME));
                    // fProxy.set_stage_id(0);
                    // fProxy.cur_stage = 0;
                    // fProxy.set_jump(false);
                    // fProxy.set_pop_jump(false);
                    // facade.sendNotification(MX_NOTICE.SCENE_CHANGE, FubenScreen.S_NAME);
                    var fProxy = (facade.retrieveProxy(mx.FubenProxy.NAME));
                    fProxy.cur_chapter = 1;
                    fProxy.cur_stage = 1;
                    fProxy.set_jump(false);
                    fProxy.set_pop_jump(false);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_JUQING_INFO,
                        'chapter': fProxy.cur_chapter
                    });
                    break;
                case "tqfbei_png":
                    pproxy.check_pack_type_item("11", "acty_xq");
                    break;
                case "twfbei_png":
                    pproxy.check_pack_type_item("11", "acty_hzs");
                    break;
            }
        };
        ActyWeekendView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.fun_list.dataProvider = null;
            this.fun_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.acty_click, this);
        };
        ActyWeekendView.S_NAME = "ActyWeekendView";
        return ActyWeekendView;
    }(mx.AlertView));
    mx.ActyWeekendView = ActyWeekendView;
    __reflect(ActyWeekendView.prototype, "mx.ActyWeekendView");
})(mx || (mx = {}));
//# sourceMappingURL=ActyWeekendView.js.map