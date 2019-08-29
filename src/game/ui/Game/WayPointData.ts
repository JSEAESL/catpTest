class WayPointData {
	public constructor() {
	}
	private _state:number = PointStateEnum.empety;
	public index:number = -1;
	public i:number = -1;
	public j:number = -1;

	public catIndex:number = - 1; 
	public static creatData(index:number,i:number,j:number):WayPointData
	{
		var result:WayPointData = new WayPointData();
		result.index = index;
		result.i = i;
		result.j = j;
		return result;
	}


	public get state():string
	{
		if(this._state  == PointStateEnum.empety)
		{
			return "empty"
		}else if(this._state  == PointStateEnum.has)
		{
			return "has"
		}
		return "empty"
	}

	public clickState():void
	{
		this._state = PointStateEnum.has;
	}

	public restState():void
	{
		this._state = PointStateEnum.empety;
	}

	public get walkable():Boolean
	{
		if(this._state  == PointStateEnum.empety)
		{
			return true;
		}else if(this._state  == PointStateEnum.has)
		{
			return false;
		}
		return true
	}

	public copy():WayPointData
	{
		var result = WayPointData.creatData(this.index,this.i,this.j);
		result.catIndex = this.catIndex;
		return result
	}

	public g:number;
	public parent:WayPointData;
    public f:number;
    public h:number;
   	public distance:number;
	   /** 得到此节点到另一节点的网格距离 */
    public getDistanceTo( targetNode:WayPointData ):number{
        var disX:number = targetNode.i - this.i;
        var disY:number = targetNode.j - this.j;
        this.distance = Math.sqrt( disX * disX + disY * disY );
        return this.distance;
    }
}