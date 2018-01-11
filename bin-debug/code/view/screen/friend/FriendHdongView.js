/**
 *   @author gaojing、mx
 *   @date 2017.12.25
 *   @desc 好友互动弹框
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
    var FriendHdongView = (function (_super) {
        __extends(FriendHdongView, _super);
        function FriendHdongView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FriendHdongView.mx_support = function () {
            return ["assets.friend_hd"];
        };
        FriendHdongView.prototype.init_view_by_type = function () {
            var view = this;
            var data = this.adata;
            //let hdtype : any = ['jwhyou', 'hdsli', 'hdtxi', 'hdsliao'];
            var hdtype;
            if (data.type == 1 && data.guanxi != 3 && data.guanxi != 1) {
                hdtype = ['jwhyou', 'hdsli', 'hdtxi', 'hdsliao'];
            }
            else {
                hdtype = ['hdsli', 'hdtxi', 'hdschyou', 'hdsliao'];
            }
            var arr = [];
            for (var i = 0; i < hdtype.length; i++) {
                arr.push({ 'bg': hdtype[i] + '_png' });
            }
            view.hd_list.itemRenderer = mx.SSButtonRender;
            view.hd_list.dataProvider = new eui.ArrayCollection(arr);
            view.hd_list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.hdong, this);
        };
        FriendHdongView.prototype.hdong = function (e) {
            var facade = mx.ApplicationFacade.getInstance();
            var type = e.itemIndex;
            var d = this.adata;
            switch (type) {
                case 0://改为加好友或者删好友
                    if (d.type == 1 && d.guanxi != 3 && d.guanxi != 1) {
                        if (d.guanxi == 3 || d.guanxi == 1) {
                            this.del_friend(d);
                        }
                        else {
                            this.add_friend(d);
                        }
                    }
                    else {
                        d.atype = "friend";
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendGiftView.S_NAME, "param": d });
                    }
                    break;
                case 1://亲家界面为送礼，好友界面为调戏后宫
                    if (d.type == 1 && d.guanxi != 3 && d.guanxi != 1) {
                        d.atype = "friend";
                        facade.sendNotification(mx.MX_NOTICE.POP_VIEW, { "name": mx.FriendGiftView.S_NAME, "param": d });
                    }
                    else {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_FRIEND_HGONG,
                            'other_id': d.user_id,
                            'page': 1,
                            'page_limit': 8,
                        });
                    }
                    break;
                case 20://掠夺(屏蔽)
                    if (d.xian_level <= 3) {
                        facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.kq001 });
                        return;
                    }
                    var lproxy = (facade.retrieveProxy(mx.LueDuoProxy.NAME));
                    lproxy.setLD(true);
                    lproxy.set_cur_user(d);
                    facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                        't': mx.MX_NETS.CS_LUEDUO_CHECK,
                        'id': d.user_id
                    });
                    break;
                case 2://亲家界面为调戏后宫好友界面为删除好友
                    if (d.type == 1 && d.guanxi != 3 && d.guanxi != 1) {
                        facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                            't': mx.MX_NETS.CS_FRIEND_HGONG,
                            'other_id': d.user_id,
                            'page': 1,
                            'page_limit': 8,
                        });
                    }
                    else {
                        this.del_friend(d);
                    }
                    break;
                case 3://私聊
                    mx.Tools.open_pri_chat({
                        "user_id": d.user_id,
                        "avatar": "tx70_" + d.avatar + "_png",
                        "name": d.name
                    });
                    break;
                default:
                    facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.p0006 });
                    return;
            }
            facade.sendNotification(mx.MX_NOTICE.CLOSE_POP, FriendHdongView.S_NAME);
        };
        FriendHdongView.prototype.add_friend = function (d) {
            var facade = mx.ApplicationFacade.getInstance();
            if (d.apply) {
                facade.sendNotification(mx.MX_NOTICE.SHOW_TOP_UI, { "text": mx.Lang.hy032 });
                return;
            }
            facade.sendNotification(mx.MX_NOTICE.CS_GET_DATA, {
                "t": mx.MX_NETS.CS_FRIEND_SQING,
                "to_id": d.user_id
            });
        };
        FriendHdongView.prototype.del_friend = function (d) {
            var facade = mx.ApplicationFacade.getInstance();
            var p_d = {
                "name": mx.AlertView.S_NAME,
                "param": {
                    "notice_ok": mx.MX_NOTICE.CS_GET_DATA,
                    "sdata_ok": { "t": mx.MX_NETS.CS_FRIEND_REMOVE, "to_id": d.user_id },
                    "param": mx.Tools.setStrColor(mx.Lang.hy020, [d.name], [0xFF0000])
                }
            };
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, p_d);
        };
        FriendHdongView.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            view.hd_list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.hdong, this);
            view.hd_list.dataProvider = null;
        };
        FriendHdongView.S_NAME = "FriendHdongView";
        return FriendHdongView;
    }(mx.AlertView));
    mx.FriendHdongView = FriendHdongView;
    __reflect(FriendHdongView.prototype, "mx.FriendHdongView");
})(mx || (mx = {}));
//# sourceMappingURL=FriendHdongView.js.map