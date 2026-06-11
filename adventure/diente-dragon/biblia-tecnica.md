# DienteDragon

## Proposito
Base tecnica y narrativa para convertir la campana DienteDragon en una aventura guiada, nodal e interactiva dentro del Modo Aventura.

## Identidad
- Genero: fantasia oscura de exploracion, investigacion y guerra regional.
- Formato: 1 PJ principal + 1 aliado estable + NPCs temporales por arco.
- Escala: campana larga, pensada para niveles 1 a 14.
- Estructura: nodos, flags, metricas de mundo, rutas de fallo y submisiones de recuperacion.

## Premisa
El archipielago DienteDragon se esta descomponiendo politica, espiritual y militarmente. Lo que arranca como desapariciones locales en Iareth escala hacia rituales de sacrificio, ruinas elficas, una prision antigua y la liberacion accidental del liche Vael Taryndor.

## Principios de adaptacion
- La historia no se vuelca como novela lineal.
- Cada escena debe tener objetivo, riesgo, costo de tiempo y consecuencia.
- El fallo no bloquea la campana: cambia el estado del mundo.
- Los secretos se revelan por contacto legitimo, no por exposicion gratuita.
- El tiempo es recurso narrativo, igual que HP, slots o loot.

## Regiones
- Iareth: isla de entrada, bosques humedos, aldeas costeras, ruinas humanas y sendas elficas.
- Medoran: capital burocratica, rica y podrida; centro politico y religioso.
- FuegoHierro: clanes enanos, forjas, minas, memoria y juramentos.
- Thurandar: isla volcanica, cultos draconicos y regreso del dragon rojo.
- Lethariel: ruinas elficas, bosque maldito, magia vieja y la Boveda Sellada.

## Antagonista
- Nombre: Vael Taryndor, el Rey Hueco.
- Naturaleza: liche, antiguo archimago elfico.
- Estado inicial: sellado y fragmentado; influye a traves de suenos, visiones y focos corruptos.
- Metodo: empuja fracturas que ya existen en vez de inventar todos los conflictos.

## Verdad oculta
- El Talisman de Ilyr-Vael no es premio: es llave ritual.
- El Pozo de Almas esta conectado con la tecnologia espiritual de Vael.
- La filacteria no esta en las ruinas elficas: esta en el Primer Diente, bajo FuegoHierro.

## Variables globales previstas
- pistasTalismán
- influenciaVael
- tensionMedoranFuegoHierro
- cultoDraconico
- cultoMuerte
- reputacionIrivith
- reputacionMedoran
- reputacionFuegoHierro
- reputacionElfos
- aliadoElegido

## Aliados iniciales
- Arannis Vel-Shae: ranger elfico, sigilo, bosque, rastreo y lectura de ruinas.
- Brunna Fuegoamargo: enana marcial/devota, tanque, honor, trato con clanes.
- Kael Morcant: rogue/bard, puertos, rumores, infiltracion y bajo mundo.

## Estructura por actos
- Acto I: Iareth. Desapariciones, bosque, semiorcos, Caer Vorn, pista hacia Medoran.
- Acto II: Medoran. Pozo de Almas, corrupcion, talisman, politica.
- Acto III: Lethariel. Bosque de las Sombras, ruinas, Boveda Sellada, liberacion de Vael.
- Acto IV: guerra abierta. FuegoHierro, Thurandar, culto draconico, culto de muerte.
- Acto V: filacteria, Primer Diente, Torre Invertida, derrota final de Vael.

## Adaptacion inicial dentro de la app
- Esta primera carga incluye solo Acto I.
- El motor ya soporta tiempo fino, descanso, flags, metricas, loot, combate y requisitos temporales.
- Cada acto futuro deberia vivir en su propio archivo para no volver a inflar index.html.

## Objetivo de esta tanda
- Separar DienteDragon del index.
- Crear loader externo.
- Dejar Acto I arrancable y estructurado como base de escalado.
