/**
*   @author dingyunfeng
*   @date 2017.11.3
*   @desc 服装店铺界面
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
    var ClothShopScreen = (function (_super) {
        __extends(ClothShopScreen, _super);
        function ClothShopScreen() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.clothes = [];
            _this.newclothes = [];
            _this.wear_order = [];
            _this.my_clothes = [];
            _this.dress = 0;
            _this.num = 28;
            _this.pos = 1080;
            return _this;
        }
        ClothShopScreen.prototype.init_view = function () {
            this.aid_arr = [0, 1, 2];
            this.tophuobi.set_hide({ tili: true });
            for (var i = 0; i < 3; i++) {
                this["xx_ui" + i].set_scale(0.8);
            }
            var cproxy = (mx.ApplicationFacade.getInstance().retrieveProxy(mx.ClothesProxy.NAME));
            var allcloth = mx.ApiTool.getAPINodes(mx.MX_APINAME.CLOTH, 'type', 1);
            var idcloth = mx.Tools.arr2obj(allcloth, "id");
            this.my_clothes = cproxy.all_clothes["1"];
            for (var j in this.my_clothes) {
                if (this.my_clothes[j].new) {
                    this.newclothes.push(this.my_clothes[j]);
                }
            }
            var new_id = [];
            //新品在前，其它按序号排序
            for (var j in this.newclothes) {
                if (idcloth[this.newclothes[j].cloth_id].obtain <= 2) {
                    this.clothes.push(idcloth[this.newclothes[j].cloth_id]);
                    new_id.push(this.newclothes[j].cloth_id);
                }
            }
            for (var j in idcloth) {
                if (new_id.indexOf(j) < 0 && idcloth[j].obtain <= 2) {
                    this.clothes.push(idcloth[j]);
                }
            }
            this.num = this.clothes.length;
            this.dress = 0;
            this.fresh_screen();
            mx.ApplicationFacade.getInstance().registerMediator(new mx.ClothShopScreenMediator(this));
        };
        ClothShopScreen.prototype.on_remove = function () {
            _super.prototype.on_remove.call(this);
            var view = this;
            for (var i = 0; i < 3; i++) {
                var c_g = view["avatar" + i + "_g"];
                egret.Tween.removeTweens(c_g);
                egret.Tween.removeTweens(view['xx_ui' + i]);
                view['xx_ui' + i].on_remove();
            }
            this.tophuobi.on_remove();
            mx.ApplicationFacade.getInstance().removeMediator(mx.ClothShopScreenMediator.NAME);
        };
        ClothShopScreen.prototype.fresh_screen = function (fresh) {
            this.move_mode = false;
            var view = this;
            for (var i = 0; i < 3; i++) {
                var now = (this.dress + i - 1) % this.num;
                if (now < 0)
                    now += this.num;
                view["xx_ui" + this.aid_arr[i]].set_avatar(this.clothes[now].id);
            }
            this.fresh_info();
            //this.fresh_view();
            //this.fresh_list();
        };
        ClothShopScreen.prototype.move_apos = function (n) {
            if (this.move_mode) {
                return;
            }
            var view = this;
            for (var i = 0; i < 3; i++) {
                var aid = this.aid_arr[i];
                var avatar = view["avatar" + aid + "_g"];
                avatar.x += n;
            }
        };
        ClothShopScreen.prototype.reset_mode = function (data) {
            //let hProxy = <HeroProxy><any>(ApplicationFacade.getInstance().retrieveProxy(HeroProxy.NAME));
            //hProxy.fresh_hero(data);
            if (data < 0) {
                var rid = this.aid_arr[2]; //右侧直接放到左侧。
                var ravatar = this["avatar" + rid + "_g"];
                ravatar.x = -this.pos;
                this.aid_arr.unshift(this.aid_arr.pop());
                this.dress--;
            }
            else {
                var lid = this.aid_arr[0]; //左侧放到右侧。
                var lavatar = this["avatar" + lid + "_g"];
                lavatar.x = this.pos;
                this.aid_arr.push(this.aid_arr.shift());
                this.dress++;
            }
            this.b_g.touchChildren = true; //按钮组可点击
            if (this.dress < 0)
                this.dress += this.num;
            this.dress %= this.num;
            this.fresh_screen(); //滑动结束
        };
        ClothShopScreen.prototype.reset_apos = function (n) {
            if (this.move_mode) {
                return;
            }
            var view = this;
            if (n == 0) {
                var pos = [-this.pos, 0, this.pos];
                for (var i = 0; i < 3; i++) {
                    var aid = this.aid_arr[i];
                    var avatar = view["avatar" + aid + "_g"];
                    avatar.x = pos[i];
                }
            }
            else if (n > 0) {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到右边
                var mavatar = view["avatar" + mid + "_g"];
                var dx = this.pos - mavatar.x;
                egret.Tween.get(mavatar).to({ "x": this.pos }, dx * mx.MX_COMMON.MX_SPERDIS)
                    .call(this.reset_mode, this, [-1]);
                var lid = this.aid_arr[0]; //左侧滑到中间。
                var lavatar = view["avatar" + lid + "_g"];
                egret.Tween.get(lavatar).to({ "x": 0 }, dx * mx.MX_COMMON.MX_SPERDIS);
                var rid = this.aid_arr[2]; //右侧
                var ravatar = view["avatar" + rid + "_g"];
                ravatar.x = -this.pos;
            }
            else {
                this.move_mode = true;
                var mid = this.aid_arr[1]; //中间的形象滑到左边
                var mavatar = view["avatar" + mid + "_g"];
                var dx = this.pos + mavatar.x;
                egret.Tween.get(mavatar).to({ "x": -this.pos }, dx * mx.MX_COMMON.MX_SPERDIS)
                    .call(this.reset_mode, this, [1]);
                var rid = this.aid_arr[2]; //右侧滑到中间。
                var ravatar = view["avatar" + rid + "_g"];
                egret.Tween.get(ravatar).to({ "x": 0 }, dx * mx.MX_COMMON.MX_SPERDIS);
                var lid = this.aid_arr[0]; //左侧
                var lavatar = view["avatar" + lid + "_g"];
                lavatar.x = this.pos;
            }
        };
        ClothShopScreen.prototype.fresh_info = function () {
            var view = this;
            var name = this.clothes[this.dress].name;
            var arr = name.split("");
            this.name_t.text = "";
            this.name_t.lineSpacing = 15 * (4 - arr.length);
            for (var i in arr) {
                this.name_t.text += arr[i];
            }
            this.money.text = mx.Tools.num2str(this.clothes[this.dress].price);
            if (this.my_clothes[this.clothes[this.dress].id]) {
                this.buy_b.set_ssres("bought_png");
                this.buy_b.touchEnabled = false;
            }
            else {
                this.buy_b.set_ssres("buy_png");
                this.buy_b.touchEnabled = true;
            }
            if (this.clothes[this.dress].obtain == 1) {
                this.obtain.source = "yinbi_36_png";
            }
            else {
                this.obtain.source = "yuanbao_36_png";
            }
        };
        ClothShopScreen.S_NAME = "ClothShopScreen";
        ClothShopScreen.M_NAME = "TeamScreen";
        return ClothShopScreen;
    }(mx.BasicView));
    mx.ClothShopScreen = ClothShopScreen;
    __reflect(ClothShopScreen.prototype, "mx.ClothShopScreen");
})(mx || (mx = {}));
//# sourceMappingURL=ClothShopScreen.js.map