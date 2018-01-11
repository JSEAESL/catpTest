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
 * @cy/2017.11.13
 *  图鉴封面
 */
var mx;
(function (mx) {
    var TuJianShouYeAlert = (function (_super) {
        __extends(TuJianShouYeAlert, _super);
        function TuJianShouYeAlert() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TuJianShouYeAlert.mx_support = function () {
            return ["assets.tujian_fm"];
        };
        TuJianShouYeAlert.prototype.init_view_by_type = function () {
            this.hs_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.mr_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            var facade = mx.ApplicationFacade.getInstance();
            var pproxy = facade.retrieveProxy(mx.PalaceProxy.NAME);
            var feizi_tujian_info = pproxy.feizi_tujian_info;
            var hz_tujian_info = pproxy.hz_tujian_info;
            var tishi1 = false;
            var tishi2 = false;
            for (var k in feizi_tujian_info) {
                var wenhua_info = feizi_tujian_info[k];
                for (var k_1 in wenhua_info.info) {
                    if (Number(wenhua_info.info[k_1]) == 0) {
                        tishi1 = true;
                        break;
                    }
                }
                if (tishi1) {
                    break;
                }
            }
            for (var k in hz_tujian_info) {
                var wenhua_info = hz_tujian_info[k];
                for (var k_2 in wenhua_info.info) {
                    if (Number(wenhua_info.info[k_2]) == 0) {
                        tishi2 = true;
                        break;
                    }
                }
                if (tishi2) {
                    break;
                }
            }
            this.hs_b.set_tsres(tishi2 ? "tishi_png" : null);
            this.mr_b.set_tsres(tishi1 ? "tishi_png" : null);
            /*let obj = {
                "1" : [[7,11],[11,15],[7,10],[4,6]],
                "2" : [[1,2],[2,2],[3,3],[2,2]],
                "3" : [[3,4],[4,6],[4,4],[2,2]],
                "4" : [[3,4],[4,6],[2,3],[3,3]],
                "5" : [[0,0],[0,0],[3,4],[2,2]],
                "6" : [[1,1],[1,1],[2,2],[2,2]],
                "7" : [[0,0],[0,0],[3,2],[1,2]],
                "8" : [[1,1],[2,2],[2,2],[1,1]],
                "9" : [[1,1],[2,2],[3,1],[1,1]],
                "11" : [[0,0],[0,0],[1,3],[1,1]],
                "12" : [[1,1],[1,2],[2,3],[1,1]],
            }

            let id = 1;
            let lihui_arr = [];
            //console.log('id','lihui','wenhua','meili')
            for(let k in obj){
                let lihui = "";
                let arr1 = obj[k];
                for(let t in arr1){
                    let arr = arr1[t];
                    for(let m in arr){
                        for(let n = 0; n < arr[m]; n ++){
                            lihui = "" + k + (Number(m) + 1) + (Number(t) + 1) + Tools.n2s_2(n + 1,2);
                            //console.log("(" + id + "," + lihui + "," + k  + "," + (Number(t) + 1) + "),");
                            id ++;
                        }
                    }
                }
            }*/
        };
        TuJianShouYeAlert.prototype.xiugai_click = function (evt) {
            this.close_self();
            var facade = mx.ApplicationFacade.getInstance();
            facade.sendNotification(mx.MX_NOTICE.POP_VIEW, {
                "name": mx.TuJianSelectAlert.S_NAME,
                "param": evt.currentTarget == this.hs_b ? 1 : 2
            });
        };
        TuJianShouYeAlert.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            this.hs_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
            this.mr_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.xiugai_click, this);
        };
        TuJianShouYeAlert.S_NAME = "TuJianShouYeAlert";
        return TuJianShouYeAlert;
    }(mx.AlertView));
    mx.TuJianShouYeAlert = TuJianShouYeAlert;
    __reflect(TuJianShouYeAlert.prototype, "mx.TuJianShouYeAlert");
})(mx || (mx = {}));
//# sourceMappingURL=TuJianShouYeAlert.js.map