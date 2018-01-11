/**
 *   @author qianjun、mx
 *   @date 2017.2.22
 *   @desc 每日得元宝-分享拉新得元宝
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
    var YbxnliView = (function (_super) {
        __extends(YbxnliView, _super);
        function YbxnliView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.cur_type = 1; //奖励 奴隶
            _this.xy_arr = {
                "yzha": { "3": { "x": -35, "y": 85 }, "4": { "x": 17, "y": 45 } },
                "mbai": { "1": { "x": -8, "y": 122 }, "2": { "x": -92, "y": 108 }, "3": { "x": 0, "y": 70 }, "4": { "x": 83, "y": -42 } }
            };
            return _this;
        }
        YbxnliView.mx_support = function () {
            return ["assets.share_ybxnli", "api.QINMI"];
        };
        YbxnliView.prototype.init_view_by_type = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var dProxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            dProxy.ybnli_pop = true;
            this.next_b.scaleX = -1;
            this.mc_g.visible = this.mc_rect.visible = this.mc_rect.touchEnabled = false;
            view.mc_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mc_over, this);
            view.share_g.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            view.tuijian_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.huanyihuan, this);
            view.award_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.award_list.itemRenderer = mx.YbyqjlRender;
            view.tj_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.tj_click, this);
            view.tj_list.itemRenderer = mx.YbmyRender;
            view.nuli_list.itemRenderer = mx.YbnliRender;
            this.cur_type = 1;
            var isqq = mx.AppConfig.MXTag.indexOf("h5") > -1; //手Q分享到QQ，其他分享到微信
            view.ts_t_p.source = this.cur_type == 1 ? (isqq ? "yqjlwben_png" : "wxyqjlwben_png") : "ybnlwzi_png";
            view.smbg.source = isqq ? "mrlybsming_png" : "wxmrlybsming_png";
            view.share_b.set_ssres(isqq ? "fsdqqqun_png" : "fsdwx_png");
            this.fresh_view();
            facade.registerMediator(new mx.YbxnliViewMediator(this));
            mx.DataTool.getInstance().data_tool("SNULI_OPEN");
        };
        YbxnliView.prototype.list_click = function (e) {
            var item = e.item.data;
            if (item) {
                if (Number(item.lq) == 1) {
                    var facade = mx.ApplicationFacade.getInstance();
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_WB_YBNL_LQ, "type": 1, "to_id": item.to_id
                    });
                }
            }
        };
        YbxnliView.prototype.tj_click = function (e) {
            mx.Tools.share_game({
                "stype": "share_xnl",
                "uid": Main.SER_ID + "|" + Main.USER_ID,
                "param": null
            });
        };
        Object.defineProperty(YbxnliView.prototype, "random_arr", {
            get: function () {
                var res = [];
                while (res.length < 4) {
                    var cur = Math.floor(Math.random() * 20);
                    while (res.indexOf(cur) > -1) {
                        cur = Math.floor(Math.random() * 20);
                    }
                    res.push(cur);
                }
                return res;
            },
            enumerable: true,
            configurable: true
        });
        YbxnliView.prototype.fresh_view = function () {
            var view = this;
            var facade = mx.ApplicationFacade.getInstance();
            var gProxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            view.cishu_t.text = mx.Lang.fx012 + " " + (3 - gProxy.yb_biaoji.nuli[0]) + "/3";
            var time = Number(gProxy.yb_biaoji.nuli[1]);
            var str = "";
            if (time > 0) {
                egret.Tween.removeTweens(view.share_g);
                if (!this._timer) {
                    this._timer = new egret.Timer(1000);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                    this._timer.start();
                }
                str = mx.Lang.fx013 + mx.Tools.format_second(time);
            }
            else {
                mx.TweenTool.getInstance().get_tween(this.share_g, "btnshake", true);
            }
            view.cd_t.text = str;
            view.show_list();
            /*let dProxy = <DataProxy><any> (facade.retrieveProxy(DataProxy.NAME));
            if(!this.total_page){
                this.total_page = dProxy.ybnli_total;
            }
            view.fresh_page();*/
            var dproxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            var random_arr = this.random_arr;
            var arr2 = [];
            for (var k in random_arr) {
                arr2.push({
                    "avatar": dproxy.miyou_info[random_arr[k]].head_img_url,
                    "openid": dproxy.miyou_info[random_arr[k]].openid,
                });
            }
            view.tj_list.dataProvider = new eui.ArrayCollection(arr2);
        };
        YbxnliView.prototype.TimerFunc = function () {
            var facade = mx.ApplicationFacade.getInstance();
            var gproxy = (facade.retrieveProxy(mx.GameProxy.NAME));
            var time = gproxy.yb_biaoji.nuli[1];
            if (time > 0) {
                this.cd_t.text = mx.Lang.fx013 + mx.Tools.format_second(time);
            }
            else {
                if (this._timer) {
                    this._timer.stop();
                    this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                    this._timer = null;
                }
                this.cd_t.text = "";
                mx.TweenTool.getInstance().get_tween(this.share_g, "btnshake", true);
            }
        };
        YbxnliView.prototype.close_self = function () {
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.FRESH_RIGHT);
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.CLOSE_POP, YbxnliView.S_NAME);
        };
        YbxnliView.prototype.show_mc = function () {
            this.mc_g.visible = this.mc_rect.visible = this.mc_rect.touchEnabled = true;
            var dProxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME));
            this.mc_type = dProxy.ybnli_type;
            var gx = new mx.GeneralEffect("rwjl");
            gx.play_by_times(-1);
            gx.x = 190;
            gx.y = 50;
            gx.name = "gxiao";
            this.gx_g.addChild(gx);
            var type = this.mc_type;
            var flag = type == 'mbai';
            this.mc_bg.source = flag ? "mbdban_png" : "bddban_png";
            this.name_t1.text = dProxy.cur_ybnli_info.name;
            this.name_t1.horizontalCenter = flag ? -85 : -40;
            this.name_t2.horizontalCenter = flag ? 85 : 40;
            var ef = new mx.GeneralEffect("yb_" + type);
            ef.play_by_times(-1); //只播放一次
            ef.horizontalCenter = flag ? 60 : 42;
            ef.verticalCenter = flag ? 90 : 80;
            ef.name = "yb_" + type;
            this.mc_g.addChild(ef);
            ef.set_event("mc_over");
            ef.addEventListener("mc_over", this.mc_over, this);
            var yb_num = flag ? 1 : 3;
            for (var i = yb_num; i <= 4; ++i) {
                var ef_1 = new mx.GeneralEffect("ybao" + i);
                ef_1.play_by_times(-1);
                ef_1.horizontalCenter = this.xy_arr[type][i].x;
                ef_1.verticalCenter = this.xy_arr[type][i].y;
                ef_1.name = "ybao" + i;
                this.mc_g.addChild(ef_1);
            }
        };
        YbxnliView.prototype.mc_over = function () {
            this.mc_g.visible = this.mc_rect.visible = this.mc_rect.touchEnabled = false;
            var ef = this.mc_g.getChildByName("yb_" + this.mc_type);
            if (ef) {
                ef.removeEventListener("mc_over", this.mc_over, this);
                ef.on_remove();
            }
            ef = null;
            var gx = this.gx_g.getChildByName("gxiao");
            if (gx) {
                gx.on_remove();
            }
            gx = null;
            for (var i = 1; i <= 4; ++i) {
                var ef_2 = this.mc_g.getChildByName("ybao" + i);
                if (ef_2) {
                    ef_2.on_remove();
                }
                ef_2 = null;
            }
            mx.ApplicationFacade.getInstance().sendNotification(mx.MX_NOTICE.SHOW_AWARD);
        };
        /*private cur_page;
        private total_page;
        private page_click(evt : egret.TouchEvent) : void{
            if(this.cur_page == 0){
                return;
            }
            
            let view = this;
            let oldpage = this.cur_page;
            switch(evt.currentTarget){
                case view.prev_b:
                    -- this.cur_page;
                    break;
                case view.next_b:
                     ++ this.cur_page;
                    break;
                case view.head_btn:
                    this.cur_page = 1;
                    break;
                case view.tail_btn:
                    this.cur_page = this.total_page;
                    break;
            }
            this.fresh_page();
            if(oldpage == this.cur_page){
                return;
            }
            //this.show_list();
            let facade = ApplicationFacade.getInstance();
            facade.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_SHARE_YBNLI , "page" : this.cur_page});
        }

        private fresh_page(){
            let view = this;
            let cur = this.cur_page;
            let total = this.total_page;
            if(cur > total){
                this.cur_page = total;
            }else if(cur < 1){
                this.cur_page = 1;
            }

            if(this.total_page != 0){
                view.page_t.text = this.cur_page + "/" + this.total_page;
            }else{
                view.page_t.text = '1/1';
            }
        }
        
        private tab_click(e : any){
            let type = e.item.type;
            if(type == this.cur_type){
                return;
            }
            
            this.cur_type = type;
            let facade = ApplicationFacade.getInstance();
            if(type == 1){
                facade.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_WB_YBNL_YQJL });
            }else{//状态二已经取消
                this.cur_page = 1;
                this.total_page = 0;
                facade.sendNotification(MX_NOTICE.CS_GET_DATA, { "t": MX_NETS.CS_SHARE_YBNLI , "page" : this.cur_page});
            }
        }*/
        YbxnliView.prototype.show_list = function () {
            var view = this;
            var flag = view.cur_type == 1;
            view.award_scro.visible = flag;
            view.nuli_scro.visible = !flag;
            view.page_g.visible = !flag;
            var dproxy = mx.ApplicationFacade.getInstance().retrieveProxy(mx.DataProxy.NAME);
            if (flag) {
                var cd = dproxy.ybnlyqjl_info; //[{"to_id":"3","name":"ss","avatar":"http:\/\/sssssssss","lq":"1"}];
                var arr = [];
                for (var i = 0; i < 40; ++i) {
                    if (cd[i]) {
                        arr.push({
                            "data": cd[i],
                            'idx': i + 1
                        });
                    }
                    else {
                        arr.push({ "empty": true, "idx": i + 1 });
                    }
                }
                view.award_list.dataProvider = new eui.ArrayCollection(arr);
                view.award_list.validateNow();
                //推荐好友
                var cd2 = dproxy.ybnli_info; //[{"to_id":"3","avatar":"5","level":"100","name":"王二狗","vip":"15","get":"144","new":15112}]
                var arr2 = [];
                for (var i = 0; i < 20; ++i) {
                    if (cd2[i]) {
                        arr2.push(cd[i]);
                    }
                    else {
                        arr2.push({ "empty": true });
                    }
                }
                view.nuli_scro.stopAnimation();
                view.nuli_list.dataProvider = new eui.ArrayCollection(arr);
                view.nuli_list.validateNow();
            }
            else {
                var cd = dproxy.ybnli_info; //[{"to_id":"3","avatar":"5","level":"100","name":"王二狗","vip":"15","get":"144","new":15112}]
                var arr = [];
                for (var i = 0; i < 20; ++i) {
                    if (cd[i]) {
                        arr.push(cd[i]);
                    }
                    else {
                        arr.push({ "empty": true });
                    }
                }
                view.nuli_scro.stopAnimation();
                view.nuli_list.dataProvider = new eui.ArrayCollection(arr);
                view.nuli_list.validateNow();
            }
        };
        YbxnliView.prototype.share = function () {
            if (mx.Tools.check_share()) {
                var facade = mx.ApplicationFacade.getInstance();
                var proxy = facade.retrieveProxy(mx.GameProxy.NAME);
                var yb_biaoji = proxy.yb_biaoji.nuli;
                //当日超过三次 或 在cd内
                if (Number(yb_biaoji[0]) < 3 && Number(yb_biaoji[1]) <= 0) {
                    // DataTool.getInstance().data_tool("SNULI_CLICK");
                    // this.tid = egret.setTimeout(() => {
                    //     if (window && window["share_game"]) {
                    //         window["share_game"](Main.USER_ID);
                    //     }
                    // }, this, 500);//延迟500ms，以使数据可以被统计到
                    mx.Tools.share_game({
                        "stype": "share_xnl",
                        "uid": Main.SER_ID + "|" + Main.USER_ID,
                        "param": null
                    });
                }
                else if (Number(yb_biaoji[0]) == 3) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fx007 });
                }
                else if (Number(yb_biaoji[1]) > 0) {
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.fx008 });
                }
            }
        };
        YbxnliView.prototype.huanyihuan = function () {
            if (window && window["getBosomFriends"]) {
                window["getBosomFriends"]();
            }
        };
        YbxnliView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.nuli_list.dataProvider = null;
            view.mc_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mc_over, this);
            view.share_g.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            view.tuijian_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.huanyihuan, this);
            /*view.next_b.removeEventListener(egret.TouchEvent.TOUCH_TAP , this.page_click ,this);
            view.prev_b.removeEventListener(egret.TouchEvent.TOUCH_TAP , this.page_click ,this);
            view.head_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP , this.page_click ,this);
            view.tail_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP , this.page_click ,this);*/
            view.award_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list_click, this);
            view.award_list.dataProvider = null;
            view.tj_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tj_click, this);
            view.tj_list.dataProvider = null;
            //view.tab_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.tab_click, this);
            egret.Tween.removeTweens(view.share_g);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.TimerFunc, this);
                this._timer = null;
            }
            if (this.tid) {
                egret.clearTimeout(this.tid);
                this.tid = null;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var dProxy = (facade.retrieveProxy(mx.DataProxy.NAME));
            dProxy.ybnli_pop = false;
            facade.removeMediator(mx.YbxnliViewMediator.NAME);
        };
        YbxnliView.S_NAME = "YbxnliView";
        return YbxnliView;
    }(mx.AlertView));
    mx.YbxnliView = YbxnliView;
    __reflect(YbxnliView.prototype, "mx.YbxnliView");
})(mx || (mx = {}));
//# sourceMappingURL=YbxnliView.js.map