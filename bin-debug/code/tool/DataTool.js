/**
 *   @author mx
 *   @date 2015.1.21
 *   @desc 数据统计工具类
 **/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mx;
(function (mx) {
    mx.MX_DL_CONST = {
        //玩家基础数据类型info_type
        "DL_IT_LEVEL": "DL_IT_LEVEL",
        //关卡统计类型
        "DL_FB_BEGAIN": "DL_FB_BEGAIN",
        "DL_FB_COMP": "DL_FB_COMP",
        "DL_FB_FAIL": "DL_FB_FAIL",
        //自定义事件
        "DL_EVT_PRE3S": "DL_EVT_PRE3S",
        "DL_EVT_2LOAD": "DL_EVT_2LOAD",
        "DL_EVT_GUIDE": "DL_EVT_GUIDE",
    };
    var DataTool = (function () {
        function DataTool() {
            this._tdga = window["TDGA"];
        }
        DataTool.getInstance = function () {
            if (!DataTool.instance) {
                DataTool.instance = new DataTool();
            }
            return DataTool.instance;
        };
        DataTool.prototype.data_tool = function (name, param) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            this._tdga.onEvent(name, param);
        };
        DataTool.prototype.init_datatool = function () {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga) {
                return;
            }
            var facade = mx.ApplicationFacade.getInstance();
            var groxy = facade.retrieveProxy(mx.GameProxy.NAME);
            this._tdga.Account({
                accountId: Main.USER_ID + "",
                level: groxy.user_lv,
                gameServer: Main.SER_ID,
                accountType: 1,
                accountName: groxy.user_name,
                gender: 2 //性别，2为女目前默认为女，用不到
            });
            this._inited = true;
        };
        DataTool.prototype.on_dl_leave = function () {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            this._tdga.onPageLeave();
        };
        DataTool.prototype.set_dl_info = function (type, val) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            switch (type) {
                case mx.MX_DL_CONST.DL_IT_LEVEL://等级，目前只用到这个
                    this._tdga.Account.setLevel(val);
                    break;
            }
        };
        DataTool.prototype.onChargeRequest = function (data) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            /*this._tdga.onChargeRequest({
                "orderId" : data.orderId,//订单号
                "iapId" : data.iapId,//购买物品名称
                "currencyAmount" : data.currencyAmount,//花费真实货币数量
                "currencyType" : 'CNY',
                "virtualCurrencyAmount" : data.currencyAmount * 10,//获得虚拟货币数量
                "paymentType" : 'wx',
            });*/
        };
        DataTool.prototype.onChargeSuccess = function (data) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            /*this._tdga.onChargeSuccess({
                "orderId" : data.orderId,//订单号
                "iapId" : data.iapId,//购买物品名称
                "currencyAmount" : data.currencyAmount,//花费真实货币数量
                "currencyType" : 'CNY',
                "virtualCurrencyAmount" : data.currencyAmount * 10,//获得虚拟货币数量
                "paymentType" : 'wx',
            });*/
        };
        DataTool.prototype.onReward = function (num, type) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            this._tdga.onReward(num, type);
        };
        DataTool.prototype.onItemPurchase = function (data) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            this._tdga.onItemPurchase({
                item: data.type,
                itemNumber: 1,
                priceInVirtualCurrency: data.num
            });
        };
        DataTool.prototype.onItemUse = function (data) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            this._tdga.onItemUse({
                item: data.type,
                itemNumber: data.num,
            });
        };
        DataTool.prototype.onMission = function (type, id, cause) {
            if (!mx.MX_COMMON.MX_DC_OPEN || !this._tdga || !this._inited) {
                return;
            }
            switch (type) {
                case mx.MX_DL_CONST.DL_FB_BEGAIN://开始打FB
                    this._tdga.onMissionBegin(id);
                    break;
                case mx.MX_DL_CONST.DL_FB_COMP://完成
                    this._tdga.onMissionCompleted(id);
                    break;
                case mx.MX_DL_CONST.DL_FB_FAIL://失败
                    this._tdga.onMissionFailed(id, cause);
                    break;
            }
        };
        DataTool.prototype.set_QQ_Score = function (type, data, flag, expires, bcover) {
            if (window && window["set_QQ_Score"]) {
                var d = {
                    "type": type,
                    "data": String(data),
                    "expires": expires ? expires : 0,
                    "bcover": bcover ? bcover : 1,
                };
                window["set_QQ_Score"](d, flag);
            }
        };
        return DataTool;
    }());
    mx.DataTool = DataTool;
    __reflect(DataTool.prototype, "mx.DataTool");
})(mx || (mx = {}));
//# sourceMappingURL=DataTool.js.map