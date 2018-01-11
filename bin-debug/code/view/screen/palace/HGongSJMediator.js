/**
 *   @author mx
 *   @date 2014.12.28
 *   @desc AVG Mediator
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
    var HGongSJMediator = (function (_super) {
        __extends(HGongSJMediator, _super);
        function HGongSJMediator(viewComponent) {
            return _super.call(this, HGongSJMediator.NAME, viewComponent) || this;
        }
        Object.defineProperty(HGongSJMediator.prototype, "view", {
            get: function () {
                return (this.viewComponent);
            },
            enumerable: true,
            configurable: true
        });
        HGongSJMediator.prototype.listNotificationInterests = function () {
            return [
                mx.MX_NOTICE.GUIDE_INFO,
            ];
        };
        HGongSJMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case mx.MX_NOTICE.GUIDE_INFO:
                    this.show_guide(data);
                    break;
            }
        };
        HGongSJMediator.prototype.show_guide = function (gkey) {
            switch (gkey) {
                case "v_sj_hz"://保皇子
                    var cd = this.view.adata.shijian;
                    var msg = Number(cd.msg_id);
                    if (msg == 1) {
                        this.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            "t": mx.MX_NETS.CS_FZ_NANCHAN,
                            "id": cd.id,
                            "answer": 2
                        });
                    }
                    else {
                        this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.MainScreen.S_NAME); //查看皇子直接回到首页。进皇子引导
                    }
                    break;
                case "v_hg_hzcs":
                    // let gproxy = <GuideProxy><any> ApplicationFacade.getInstance().retrieveProxy(GuideProxy.NAME);
                    // let guide = gproxy.get_curr_guide();
                    // if(guide.jqid == "m_yxd"){
                    //    this.sendNotification(MX_NOTICE.SKIP_GUIDE, {
                    //        "gkey" : "m_hzs", "touch": "s_hg_hzs"
                    //    }); 
                    // }
                    this.sendNotification(mx.MX_NOTICE.SKIP_GUIDE, {
                        "gkey": "m_hzs", "touch": "s_hg_hzs"
                    });
                    this.sendNotification(mx.MX_NOTICE.SCENE_CHANGE, mx.HZSuoScreen.S_NAME);
                    break;
            }
        };
        HGongSJMediator.NAME = "HGongSJMediator";
        return HGongSJMediator;
    }(puremvc.Mediator));
    mx.HGongSJMediator = HGongSJMediator;
    __reflect(HGongSJMediator.prototype, "mx.HGongSJMediator", ["puremvc.IMediator", "puremvc.INotifier"]);
})(mx || (mx = {}));
//# sourceMappingURL=HGongSJMediator.js.map