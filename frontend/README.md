## In React & Redux, MVC-ul poate fi tradus ca si RCA.

Model -> Reducer (are rolul de a primi si salva rezultatul in urma unei actiuni, si de a-l face disponibil pt Componente)

View -> Component (are rolul de a arata userului aplicatia si de interactiona cu acesta)

Controller -> Action (are rolul de a interactiona cu un API si de a transmite rezultatul catre reducere)


## View-ul aplicatiei contine urmatoarele:

### Containere: 
	Login, Register, Events, Pair, User, Admin, News
### Componente: 
  Layout (Header, UserMenu, NewsMenu, props.children), LayoutAdmin( HeaderAdmin, props.children)



## Actiuni

### Componenta Register

Actiuni: startRegister({username, mail, password}) -> dispatch REGISTER_START, REGISTER_SUCCESS / REGISTER_FAILED

### Componenta Login

Actiuni: startLogin({mail, password}) -> dispatch LOGIN_START, LOGIN_SUCCESS / LOGIN_FAILED

### Componenta Events
Actiuni: getEvents(type) type: ( 3_hours, main, 1day, 2days,...) -> dispatch LOADING_START, EVENTS, LOADING_END

### Componenta Pair

Actiuni: getPair(id) -> dispatch PAIR

### Componenta User

Actiuni: getUserInfo(token) -> dispatch USER 

### Componenta News

Actiuni: getNews() -> dispatch NEWS

## Reducere: 
State-urile initiale din reducere sunt:

### registerReducer: 
{success, loading, message}

### loginReducer: 
{token, success, loading, message}

### eventsReducer: 
{loading, main, mainAdmin, races_history, races_list, add_races, add_pairs, 3_hours}

### newsReducer: 
{news}

### pairsReducer: 
{}

### userReducer: 
{userInfo, loading}



### Rutele aplicatiei: 

/register -> Register in aplicatie
/login -> Login in aplicatie
/events/:type -> view eventuri pe tipuri (urmatoarele 3 ore, 1 zi, 2 zile, evenimente “hot”)
/event/:id -> informatii despre unui eveniment
/pair:/:id -> informatii despre o pereche
/user -> infromatiile userului (pariurile facute, starea acestora)
/admin/:type -> (board-ul de control al aplicatiei ce permite adaugarea & updatarea unei curse, adaugarea unei perechi noi, statistici generale ale aplicatiei).