var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 算法类
 * @author
 *
 */
var AStar = (function () {
    function AStar() {
        /** 是否结束寻路 */
        this.isEnd = false;
        /**启发函数方法*/
        //private _heuristic:Function = manhattan;
        //private _heuristic:Function = euclidian;
        //private _heuristic:Function = this.diagonal;
        /**直线代价权值*/
        this._straightCost = 1.0;
        /**对角线代价权值*/
        this._diagCost = Math.SQRT2;
        /**寻路*/
        this.loopArr = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]];
        this.loopArr2 = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, 0]];
        this.Paths = [];
    }
    /**在网格中是否找到路径*/
    AStar.prototype.initPath = function (grid) {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.currCatPoint;
        this._endNodes = this._grid.endPoints;
        this._otherNode = this._grid.otherCatPoint;
        this._endNode = this._grid.endPoint;
        this._startNode.g = 0;
        //sthis._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g; //+ this._startNode.h;
        ////将开始节点加入开放列表
        //this._open[0].inOpenList = true;
        //return false;
        var endNodeslen = this._endNodes.length;
        this.Paths = [];
        for (var i = 0; i < endNodeslen; i++) {
            this._open = [];
            this._open[0] = this._startNode;
            this._closed = [];
            this.isEnd = false;
            this._endNode = this._grid.endPoints[i];
            this.search();
        }
        this.Paths.sort(function (a, b) {
            if (a[0] > b[0]) {
                return 1;
            }
            return -1;
        });
        if (this.Paths.length == 1) {
            return null;
        }
        return this.Paths[0];
    };
    AStar.prototype.CanMove = function (grid) {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.currCatPoint;
        this._otherNode = this._grid.otherCatPoint;
        this._endNodes = this._grid.endPoints;
        this._endNode = this._grid.endPoint;
        this._startNode.g = 0;
        this._startNode.f = this._startNode.g;
        var result = [];
        this._startNode = this._grid.currCatPoint;
        var len;
        var dimArr;
        if (this._startNode.j % 2 > 0) {
            len = this.loopArr.length;
            dimArr = this.loopArr;
        }
        else {
            len = this.loopArr2.length;
            dimArr = this.loopArr2;
        }
        for (var i = 0; i < len; i++) {
            var datapos = dimArr[i];
            var xx = this._startNode.i + datapos[0];
            var yy = this._startNode.j + datapos[1];
            var test = this._grid.getNode(xx, yy);
            if (!test) {
                continue;
            }
            if ((test.i == this._startNode.i && test.j == this._startNode.j) || !test.walkable || (test.i == this._otherNode.i && test.j == this._otherNode.j)) {
                continue;
            }
            result.push([1, test.i, test.j]);
        }
        return result[0];
    };
    AStar.prototype.search = function () {
        var node;
        while (!this.isEnd) {
            // 当前节点在开放列表中的索引位置
            var currentNum;
            ////在开放列表中查找具有最小 F 值的节点，并把查找到的节点作为下一个要九宫格中心节点
            var ilen = this._open.length;
            node = this._open[0];
            currentNum = 0;
            for (i = 0; i < ilen; i++) {
                if (this._open[i].f < node.f) {
                    node = this._open[i];
                    currentNum = i;
                }
            }
            ////把当前节点从开放列表删除, 加入到封闭列表
            //node.inOpenList = false;
            //如果开放列表中最后一个节点是最小 F 节点 相当于直接openList.pop()  否则相当于交换位置来保存未比较的节点
            this._open[currentNum] = this._open[this._open.length - 1];
            this._open.pop();
            this._closed.push(node);
            var len;
            var dimArr;
            if (node.j % 2 > 0) {
                len = this.loopArr.length;
                dimArr = this.loopArr;
            }
            else {
                len = this.loopArr2.length;
                dimArr = this.loopArr2;
            }
            for (var i = 0; i < len; i++) {
                var datapos = dimArr[i];
                var xx = node.i + datapos[0];
                var yy = node.j + datapos[1];
                var test = this._grid.getNode(xx, yy);
                if (!test) {
                    continue;
                }
                if ((test.i == node.i && test.j == node.j) || !test.walkable || (test.i == this._otherNode.i && test.j == this._otherNode.j)) {
                    continue;
                }
                var cost = this._straightCost;
                var g = node.g + cost;
                var f = g;
                ////在开启列表或关闭列表中找到 表示已经被探测过的节点
                if (this._open.indexOf(test) != -1 || this._closed.indexOf(test) != -1) {
                    ////如果该相邻节点在开放列表中, 则判断若经由当前节点到达该相邻节点的G值是否小于原来保存的G值,若小于,则将该相邻节点的父节点设为当前节点,并重新设置该相邻节点的G和F值
                    if (f < test.f) {
                        test.f = f;
                        test.g = g;
                        test.parent = node;
                    }
                }
                else {
                    test.f = f;
                    test.g = g;
                    test.parent = node;
                    this._open.push(test);
                }
                ////循环结束条件：当结束节点被加入到开放列表作为待检验节点时，表示路径被找到，此时应终止循环
                if (test.i == this._endNode.i && test.j == this._endNode.j) {
                    //console.log(test);
                    this._endNode = test;
                    this.isEnd = true;
                }
            }
            ////未找到路径
            if (this._open.length == 0) {
                console.log("no path found");
                this.isEnd = true;
                return false;
            }
        }
        this.buildPath();
        return true;
    };
    AStar.prototype.buildPath = function () {
        var tPath = [];
        var node = this._endNode;
        tPath.push(node);
        while (node != this._startNode) {
            node = node.parent;
            tPath.unshift(node);
        }
        this.Paths.push([tPath.length, tPath[1].i, tPath[1].j]);
    };
    Object.defineProperty(AStar.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AStar.prototype, "floydPath", {
        get: function () {
            return this._floydPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AStar.prototype, "visited", {
        get: function () {
            //return this._closed.concat(this._open);
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
//# sourceMappingURL=AStar.js.map