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
*   @author dingyunfeng
*   @date 2017.11.30
*   @desc 翻页UI组件
**/
var mx;
(function (mx) {
    var PageUI = (function (_super) {
        __extends(PageUI, _super);
        function PageUI() {
            var _this = _super.call(this) || this;
            //逻辑属性
            _this.cur_list = 0; //视图停留页,初始0
            _this.arr_data = []; //数据源
            _this.num = 8; //每页显示数量
            _this.max_page = 0; //最大页数
            _this.page = 1; //当前页数
            _this.pre_position = 0; //上一次x位置，校验速度
            _this.speed = 0; //速度
            _this.derection = 0;
            _this.movestate = false; //滑动状态
            return _this;
        }
        PageUI.prototype.pre_init = function () {
            this.set_style(this.style);
            this.freshstyle();
            this.freshdata();
            //his.set_data(this.arr_data, this.num);
            this.sc.addEventListener(eui.UIEvent.CHANGE_START, this.scoll_start, this);
            this.sc.addEventListener(egret.Event.CHANGE, this.scoll_move, this);
            this.sc.addEventListener(eui.UIEvent.CHANGE_END, this.scoll_end, this);
            this.page_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            this.page_sl.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            this.sc.throwSpeed = 0;
            this.sc.bounces = false;
            this.sc.viewport.scrollH = 0;
        };
        /*  样式设置范例
            let style = [];
            style["itemRenderer"] = ShopRender;
            style["layout_type"] = "TileLayout";
            style["layout_style"] = {};
            style["layout_style"]["horizontalGap"] = 9;
            style["layout_style"]["verticalGap"] = 14;
            style["layout_style"]["requestedColumnCount"] = 3;
            view.pageui.set_style(style);
        */
        PageUI.prototype.set_style = function (style) {
            this.style = style;
            if (!this.skin || !style) {
                return;
            }
            for (var i = 0; i < 3; i++) {
                this["list" + i]["itemRenderer"] = style["itemRenderer"];
                if (style["layout_type"] == "TileLayout") {
                    this["list" + i].layout = new eui.TileLayout;
                }
                else if (style["layout_type"] == "HorizontalLayout") {
                    this["list" + i].layout = new eui.HorizontalLayout;
                }
                else if (style["layout_type"] == "VerticalLayout") {
                    this["list" + i].layout = new eui.VerticalLayout;
                }
                else {
                    this["list" + i].layout = new eui.BasicLayout;
                }
                for (var k in style["layout_style"]) {
                    this["list" + i].layout[k] = style["layout_style"][k];
                }
                this["list" + i].horizontalCenter = 720 * i;
            }
        };
        PageUI.prototype.set_page = function (arr, fpage, npage) {
            if (this.max_page != fpage) {
                this.max_page = fpage;
                this.freshstyle();
            }
            for (var k in arr) {
                this.arr_data[(npage - 1) * this.num + Number(k)] = arr[k];
            }
            if (!this.skin) {
                return;
            }
            this.freshdata();
        };
        PageUI.prototype.set_data = function (arr, num) {
            this.arr_data = arr;
            this.num = num;
            //重新初始化
            this.bottom_g.visible = false;
            this.list0.dataProvider = new eui.ArrayCollection(arr);
            this.max_page = 0;
            this.page = 1;
            this.cur_list = 0;
            if (!arr) {
                return;
            }
            this.max_page = Math.max(Math.ceil(arr.length / this.num), 1);
            if (!this.skin) {
                return;
            }
            this.freshstyle();
            this.freshdata();
        };
        PageUI.prototype.freshstyle = function () {
            if (this.max_page <= 10) {
                this.page_list.visible = true;
                this.page_select.visible = true;
                this.page_sl.visible = false;
                var arr3 = [];
                for (var i = 0; i < this.max_page; i++) {
                    arr3.push("1");
                }
                this.page_list.dataProvider = new eui.ArrayCollection(arr3);
                this.page_sx = -(this.max_page * 14 + 20 * (this.max_page - 1)) / 2 + 7;
                this.page_select.horizontalCenter = this.page_sx;
            }
            else if (this.max_page > 10) {
                this.page_list.visible = false;
                this.page_select.visible = false;
                this.page_sl.visible = true;
                // let shape: egret.Shape = new egret.Shape();
                // shape.graphics.beginFill(0xd8caf1);
                // shape.graphics.drawRect(-this.width / 2, 6, this.width, 2)
                // shape.graphics.endFill();
                // this.bottom_g.addChild(shape);
                this.page_sl.minimum = 1; //定义最小值
                this.page_sl.maximum = this.max_page; //定义最大值
                this.page_sl.value = 1; //定义默认值
                var sli_obj = {
                    "up": "djcsjdtiao_png",
                    "down": "djcsjdtdchen_png",
                    "middle": "page_now_png",
                };
                this.page_sl.set_res(sli_obj);
                this.page_sl.track.height = this.page_sl.trackHighlight.height = 2;
                this.page_sl.track.width = this.page_sl.trackHighlight.width = 664;
            }
            //仅1页的处理
            if (this.max_page == 1) {
                this.list1.visible = this.list2.visible = false;
                this.list1.horizontalCenter = this.list2.horizontalCenter = false;
                // this.page_list.width = 14;//未知原因
                this.bottom_g.visible = false;
            }
            else {
                this.list1.visible = this.list2.visible = true;
                this.list1.horizontalCenter = 720 * 1;
                this.list2.horizontalCenter = 720 * 2;
                this.bottom_g.visible = true;
            }
        };
        PageUI.prototype.changeHandler = function (evt) {
            var view = this;
            this.reset_mode(evt.target.value - this.page);
        };
        PageUI.prototype.freshdata = function () {
            var arr = this.arr_data;
            if (!arr || arr.length < 1) {
                return;
            }
            for (var i = 0; i < 3; i++) {
                var cur_page = this.page + (i - this.cur_list);
                var arr2 = arr.slice((cur_page - 1) * this.num, Math.min(cur_page * this.num, arr.length));
                this["list" + i].dataProvider = new eui.ArrayCollection(arr2);
            }
            this.page_sl.value = this.page;
            this.sc.viewport.scrollH = this["list" + this.cur_list].horizontalCenter;
        };
        PageUI.prototype.on_remove = function () {
            this.list0.dataProvider = null;
            this.list1.dataProvider = null;
            this.list2.dataProvider = null;
            this.sc.removeEventListener(eui.UIEvent.CHANGE_START, this.scoll_start, this);
            this.sc.removeEventListener(egret.Event.CHANGE, this.scoll_move, this);
            this.sc.removeEventListener(eui.UIEvent.CHANGE_END, this.scoll_end, this);
            this.page_sl.removeEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
            this.page_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btn_click, this);
            _super.prototype.on_remove.call(this);
        };
        //
        PageUI.prototype.btn_click = function (e) {
            this.reset_mode(e.itemIndex + 1 - this.page);
            egret.Tween.get(this.page_select).to({ "horizontalCenter": this.page_sx + 34 * e.itemIndex }, 400);
        };
        //滑动相关
        PageUI.prototype.scoll_start = function () {
            this.movestate = true;
            this.page_select.horizontalCenter = this.page_sx + 34 * (this.page - 1);
            this.speed = 0;
            this.pre_position = this.sc.viewport.scrollH;
        };
        PageUI.prototype.scoll_move = function () {
            var view = this;
            var dis = view.sc.viewport.scrollH - view.pre_position;
            if (view.page == view.max_page && dis > 0) {
                view.sc.viewport.scrollH += dis;
            }
            view.speed += dis;
            view.speed /= 2;
            this.page_select.horizontalCenter += dis * 34 / 720;
            view.pre_position = view.sc.viewport.scrollH;
        };
        PageUI.prototype.scoll_end = function () {
            if (!this.movestate) {
                return;
            }
            this.movestate = false;
            var view = this;
            var position = view.sc.viewport.scrollH;
            var to_position = this.checkto(position);
            egret.Tween.get(this.page_select).to({ "horizontalCenter": this.page_sx + 34 * (this.page + this.derection - 1) }, 300);
            egret.Tween.get(this.sc.viewport).to({ "scrollH": to_position }, 300).call(this.reset_mode, this, [this.derection]);
        };
        PageUI.prototype.reset_mode = function (der) {
            var pre_page = this.page;
            this.page += 1 * der;
            ////console.log("page" + this.page)
            if (pre_page != this.page) {
                mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.PAGE_CHANGE);
            }
            if (this.page == 1) {
                this.cur_list = 0;
            }
            else if (this.page == this.max_page) {
                this.cur_list = 2;
            }
            else {
                this.cur_list = 1;
            }
            this.freshdata();
        };
        PageUI.prototype.checkto = function (position) {
            var view = this;
            view.derection = 0 - view.cur_list;
            //距离检测，优先近的
            var dis0 = Math.abs(view.list0.horizontalCenter - position);
            var dis1 = Math.abs(view.list1.horizontalCenter - position);
            var dis2 = Math.abs(view.list2.horizontalCenter - position);
            var min = dis0;
            var to_position = view.list0.horizontalCenter;
            if (dis1 < min) {
                min = dis1;
                view.derection = 1 - view.cur_list;
                to_position = view.list1.horizontalCenter;
            }
            if (dis2 < min) {
                min = dis2;
                view.derection = 2 - view.cur_list;
                to_position = view.list2.horizontalCenter;
            }
            //速度检测，足够则前往滑动方向
            ////console.log("speed:" + view.speed);
            if (Math.abs(view.speed) > 10) {
                if (view.speed > 0) {
                    view.derection = 1;
                    var to = view.cur_list + 1;
                    if (to > 2) {
                        to = 2;
                    }
                    to_position = view["list" + to].horizontalCenter;
                }
                else {
                    view.derection = -1;
                    var to = view.cur_list - 1;
                    if (to < 0) {
                        to = 0;
                    }
                    to_position = view["list" + to].horizontalCenter;
                }
            }
            view.speed = 0;
            view.pre_position = to_position;
            return to_position;
        };
        return PageUI;
    }(mx.BasicUI));
    mx.PageUI = PageUI;
    __reflect(PageUI.prototype, "mx.PageUI");
})(mx || (mx = {}));
//# sourceMappingURL=PageUI.js.map