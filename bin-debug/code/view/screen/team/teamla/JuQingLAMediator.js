/**
 @author mx
 *   @date 2016.10.9
 *   @desc 养心殿-侍寝
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
    var JuQingLAMediator = (function (_super) {
        __extends(JuQingLAMediator, _super);
        function JuQingLAMediator(viewComponent) {
            var _this = _super.call(this, JuQingLAMediator.NAME, viewComponent) || this;
            _this.init_view();
            return _this;
        }
        Object.defineProperty(JuQingLAMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        JuQingLAMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO
            ];
        };
        JuQingLAMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        JuQingLAMediator.prototype.show_guide = function (gkey) {
            var view = this.view;
            switch (gkey) {
                case "s_yh_l1": //第1个约会关卡
                case "s_yh_l2": //第2个约会关卡
                case "s_yh_l3"://第3个约会关卡
                    var evt = new eui.ItemTapEvent(eui.ItemTapEvent.ITEM_TAP);
                    var id = gkey.split("_l")[1];
                    id = Number(id) - 1;
                    var tar = view.juqing_list.getChildAt(id);
                    evt.item = tar.data;
                    evt.itemIndex = id;
                    view.juqing_list.dispatchEvent(evt);
                    break;
                case "s_yh_hg"://收入后宫
                    var evt2 = new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP);
                    view.srhg_b.dispatchEvent(evt2);
                    break;
                case "v_yh_cf"://册封
                    var hProxy = this.facade.retrieveProxy(mx.HeroProxy.NAME);
                    var cd = hProxy.get_chero_info();
                    this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        "t": mx.MX_NETS.CS_CEFENG_WEIFEN,
                        "mid": cd.mid,
                        "weifen": 13,
                        "tab": 1,
                        "type": 1
                    });
                    this.sendNotification(mx.MX_NOTICE.COMP_GUIDE);
                    break;
                case "n_yh_ck"://提示在后宫中查看
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.PalaceScreen.S_NAME);
                    break;
            }
        };
        JuQingLAMediator.prototype.init_view = function () {
            // if(MX_COMMON.IN_GUIDE){//引导中
            //     let view = this.view;
            //     switch(view.hg_s){
            //         case 1://攻略中
            //             let dp = view.juqing_list.dataProvider;
            //             for(let i = 0; i < 3; i++){
            //                 let c_d = dp.getItemAt(i);
            //                 if(c_d.state == 2 && c_d.fj >= 80){//已经有评分
            //                     if(i != 2){
            //                         this.sendNotification(MX_NOTICE.SKIP_GUIDE, {
            //                             "gkey" : "m_yh", "touch" : "s_yh_l" + (i + 1),
            //                         });
            //                     }
            //                 }else{//没有评分或者未解锁
            //                     break;
            //                 }
            //             }
            //             break;
            //         case 2://可收入后宫
            //             this.sendNotification(MX_NOTICE.SKIP_GUIDE, {
            //                 "gkey" : "m_yh", "touch" : "s_yh_l3",
            //             });
            //             break;
            //         case 3://已收入后宫
            //             this.sendNotification(MX_NOTICE.SKIP_GUIDE, {
            //                 "gkey" : "m_yh", "touch" : "v_yh_cf",
            //             });
            //             break;
            //     }
            //     this.sendNotification(MX_NOTICE.GET_GUIDE);
            // }
        };
        JuQingLAMediator.NAME = "JuQingLAMediator";
        return JuQingLAMediator;
    }(puremvc.Mediator));
    mx.JuQingLAMediator = JuQingLAMediator;
    __reflect(JuQingLAMediator.prototype, "mx.JuQingLAMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=JuQingLAMediator.js.map