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
 *   @date 2014.12.28
 *   @desc
*/
var mx;
(function (mx) {
    var ServerListRender = (function (_super) {
        __extends(ServerListRender, _super);
        function ServerListRender() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ServerListRender.prototype.dataChanged = function () {
            var data = this.data;
            if (!data || !this.skin) {
                return;
            }
            this.ser_name_t.text = data.txt;
            this.level_t.text = data.level;
            this.name_t.text = data.name;
            this.tuijian.visible = data.tuijian;
            this.bqian_p.source = data.bqian;
            this.name_t.left = 315 + this.level_t.textWidth + 13;
        };
        return ServerListRender;
    }(mx.BasicRender));
    mx.ServerListRender = ServerListRender;
    __reflect(ServerListRender.prototype, "mx.ServerListRender");
})(mx || (mx = {}));
//# sourceMappingURL=ServerListRender.js.map