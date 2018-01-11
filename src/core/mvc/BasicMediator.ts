class BasicMediator extends puremvc.Mediator implements puremvc.IMediator{
	public constructor(mediatorName?: string, viewComponent?: any) 
	{
		super(mediatorName, viewComponent);
	}

	protected addEvent():void
	{

	}

	protected init():void
	{

	}

	protected removeOther():void
	{

	}

	protected removeEvent():void
	{

	}


	public onRegister(): void
	{	
		this.addEvent();
		this.init();
	}

    public onRemove(): void
	{
		this.removeEvent();
		this.removeOther();
	}
}