var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WayPointData = (function () {
    function WayPointData() {
        this._state = PointStateEnum.empety;
        this.index = -1;
        this.i = -1;
        this.j = -1;
        this.catIndex = -1;
    }
    WayPointData.creatData = function (index, i, j) {
        var result = new WayPointData();
        result.index = index;
        result.i = i;
        result.j = j;
        return result;
    };
    Object.defineProperty(WayPointData.prototype, "state", {
        get: function () {
            if (this._state == PointStateEnum.empety) {
                return "empty";
            }
            else if (this._state == PointStateEnum.has) {
                return "has";
            }
            return "empty";
        },
        enumerable: true,
        configurable: true
    });
    WayPointData.prototype.clickState = function () {
        this._state = PointStateEnum.has;
    };
    WayPointData.prototype.restState = function () {
        this._state = PointStateEnum.empety;
    };
    Object.defineProperty(WayPointData.prototype, "walkable", {
        get: function () {
            if (this._state == PointStateEnum.empety) {
                return true;
            }
            else if (this._state == PointStateEnum.has) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    WayPointData.prototype.copy = function () {
        var result = WayPointData.creatData(this.index, this.i, this.j);
        result.catIndex = this.catIndex;
        return result;
    };
    /** 得到此节点到另一节点的网格距离 */
    WayPointData.prototype.getDistanceTo = function (targetNode) {
        var disX = targetNode.i - this.i;
        var disY = targetNode.j - this.j;
        this.distance = Math.sqrt(disX * disX + disY * disY);
        return this.distance;
    };
    return WayPointData;
}());
__reflect(WayPointData.prototype, "WayPointData");
//# sourceMappingURL=WayPointData.js.map