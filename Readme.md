# Design patterns

## API

Singleton: Used for the server and the databases pools: Only one server exists and only one pool of connections per database.
Object Pool: Used for the databases connections: A number of connections exist and they are used by the api when needed (instead of creating a connection every time which is time consuming)
Chain of responsibility: The requests 


## Front end

FLUX and State data flow unidirectio: Action -> Dispatcher -> Store -> View -> (Back to) Dispatcher
Each time the state changes the component re-renders
Decoratos: for dynamic content some objects have dynamic responsibilities
Eg: actions have decorators that usually return a different function that is passed on to children
