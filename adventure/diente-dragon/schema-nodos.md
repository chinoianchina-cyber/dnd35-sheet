# Esquema de Campana y Nodos

## Archivos
- `world.js`: metadata, aliados, facciones, variables y configuracion global.
- `act1.js`: escenas jugables del Acto I.
- `manifest.json`: descriptor humano y de repo.

## Objeto de campana
```js
{
  id,
  title,
  blurb,
  recommended,
  startSceneId,
  startObjective,
  openingJournal,
  initialState,
  structure,
  metrics,
  allies,
  factions,
  scenes
}
```

## initialState
```js
{
  day,
  timeIndex,
  wealthGp,
  flags,
  metrics
}
```

## Escena
```js
{
  title,
  location,
  text,        // array o funcion(state, campaign)
  objective,
  complete,
  endingTone,
  choices
}
```

## Choice
```js
{
  label,
  desc,
  next,
  journal,
  requires,
  check,
  combat,
  effects,
  success,
  failure
}
```

## requires
```js
{
  classAny,
  flagsAll,
  flagsAny,
  notFlags,
  itemsAll,
  itemsAny,
  minDay,
  maxDay,
  timeAny,
  timeNot,
  minTimeIndex,
  maxTimeIndex,
  metricMin,
  metricMax
}
```

## effects
```js
{
  setFlags,
  clearFlags,
  setMetrics,
  adjustMetrics,
  addItems,
  addCurrency,
  damage,
  heal,
  healFull,
  advanceTime,
  advanceDays,
  setTimeIndex,
  rest,
  resetSpells,
  objective,
  journal,
  complete,
  endingTone
}
```

## Convenciones para escribir actos futuros
- Cada eleccion importante debe gastar tiempo o explicitar por que no lo gasta.
- Todo combate duro debe tener salida alternativa o submision de recuperacion.
- Las elecciones de descanso no deben ser gratis: cambian el mundo.
- Las metricas grandes de campana no se resuelven en una sola escena; se empujan por acumulacion.
- Los nodos deben ser compactos: una escena, una decision, una consecuencia clara.
