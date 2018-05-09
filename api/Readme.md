# Api plan

## GET /events?start_date=12&end_date=2112

```
Response:{
  events: [
    Id, name, description, timestamp, pairs: {
      pair: (ca pair info), odd: 3.2
    }
  ]
}
```

## GET /event_info?id=1212

```
POST /bet
Body: {
	event_id, amount
}
```


## GET /pair_info?id=211212

```
Response: {
	Id, img_url, name, description, full_description, history: [
		{timestamp, place}
  ]
}
```


## POST /authenticate


## GET /profile

```
Response: {
	pending_bets,
	name, 
	avatar,
	credit,
	history
}
```






## GET /news

```
Response: {
	news: [
		{title, description, thumbnail (url imagine mica)}
  ]
}
```


```
Bet: {
	event_id,
	won: true,
	amount
}
```

## GET /admin_statistics

```
Response: {
	statistics: {
		total_count,
		profit,
		top_events,
		top_users: [name],
		last_bets_total_7_days: [12092092, ….]
  }
}
```

## POST /admin/pair

```
Body: {
	pair
}
```

## POST /admin/new_event

```
Body: {
	event
}
```

## POST /admin/update_event

```
Body: {
	id, event
}
```