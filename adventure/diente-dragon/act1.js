(function () {
    const campaign = window.ADVENTURE_EXTERNAL_CAMPAIGNS?.["diente-dragon"];
    if (!campaign) return;

    function getPlayerName() {
        return String(document.getElementById("charName")?.value || "").trim() || "aventurero";
    }

    function getPlayerClassName() {
        return String(document.getElementById("class")?.value || "").trim() || "Aventurero";
    }

    function getClassArrivalFlavor() {
        const clsName = getPlayerClassName();
        const map = {
            Barbarian: "Mara te recorre de arriba abajo y resopla por la nariz. \"Bien. Vos no pareces de los que miran una herida desde lejos.\"",
            Bard: "Mara no tarda en notarte la cara de quien escucha mas de lo que habla. \"Si sabes separar una mentira de un temblor de voz, llegaste en buen momento.\"",
            Cleric: "Desde el fondo de la sala, Solenne levanta apenas la vista hacia vos. En un puerto chico, ese gesto ya alcanza para sentirse llamado.",
            Druid: "Antes de oir un solo rumor ya notaste lo raro: las aves giran alto, el borde del bosque no suena parejo y la lluvia cae distinta del lado de Vhalia.",
            Fighter: "Tollan te mira como un hombre cansado mira una pared que aun no sabe si va a resistir. \"Si sabes sostener una linea\", dice, \"Irivith puede usar eso.\"",
            Monk: "La aldea respira corto. No hace falta oir gritos para reconocer una comunidad que ya se acostumbro a tensar el cuerpo antes de la noche.",
            Paladin: "Tollan evita sostenerte la mirada demasiado tiempo, como si sospechara que vas a obligarlo a nombrar cosas que lleva dias esquivando.",
            Ranger: "Antes de entrar en la aldea ya viste barro removido donde no deberia haber tanto paso. Algo entra y sale de Vhalia con costumbre.",
            Rogue: "Te alcanza un minuto para entender el tono del lugar: puertas cerradas temprano, voces achicadas y gente midiendo quien escucha antes de hablar.",
            Sorcerer: "La incomodidad del puerto no viene solo de la lluvia ni del cansancio. Hay algo torcido en el aire, de esos restos que se pegan a supersticiones viejas.",
            Wizard: "Nada termina de cerrar del todo: un bosque evitado, un puerto en silencio y demasiados indicios pequenos apuntando hacia la misma sombra."
        };
        return map[clsName] || "La aldea te recibe como si hubieras llegado apenas un poco tarde para evitar el problema, pero a tiempo para meterte dentro.";
    }

    function getChosenCompanion(state) {
        if (state?.flags?.dd_ally_arannis) {
            return {
                id: "arannis",
                name: "Arannis Vel-Shae",
                role: "rastreador",
                short: "Arannis",
                flags: { wounded: "dd_arannis_wounded", fallen: "dd_arannis_fell", perish: "dd_arannis_perish" },
                reaction: "Arannis estudia la piedra, las huellas y los bordes oscuros del lugar antes de decir nada.",
                gateLine: "Arannis se agacha junto a la base del muro y marca con dos dedos una grieta donde la musgosa mamposteria ya no cierra bien. \"Por ahi entra alguien que no quiera pedir permiso\", murmura.",
                jailLine: "Arannis no mira primero a los cautivos: mira los soportes, la distribucion de sombras y las rutas de salida. Ya esta pensando como sacar gente sin regalar otra muerte.",
                ghorvashLine: "Arannis gira apenas el cuerpo para no perder la salida de vista. Si Ghorvash intenta correrse un paso de mas, el elfo ya esta listo para cortarle el camino.",
                optionLabel: "Dejar que Arannis lea el terreno y te abra una ventana limpia",
                optionDesc: "Si alguien puede ver por donde se afloja una defensa vieja, es el elfo.",
                optionCheck: { type: "skill", target: "Spot", dc: 13, label: "Spot" },
                optionSuccessText: "Arannis te marca un ritmo exacto: donde pisar, que sombra evitar y cual de las columnas ya no aguanta otra vibracion. Cuando te mueves, lo haces sobre una ventaja que el ya encontro para vos.",
                optionFailureText: "Arannis encuentra el punto flojo, pero no alcanza a explotarlo del todo antes de que uno de los guardias levante la cabeza. La ventaja existe, aunque dura menos de lo que deberia.",
                combat: { ac: "14", hp: "12", maxHp: "12", attackBonus: "+4", damage: "1d8+2", morale: "fight", targetWeight: 1.45 }
            };
        }
        if (state?.flags?.dd_ally_brunna) {
            return {
                id: "brunna",
                name: "Brunna Fuegoamargo",
                role: "martillo",
                short: "Brunna",
                flags: { wounded: "dd_brunna_wounded", fallen: "dd_brunna_fell", perish: "dd_brunna_perish" },
                reaction: "Brunna no baja la voz: baja el centro de gravedad y aprieta el mango del martillo hasta que cruje el cuero.",
                gateLine: "Brunna ladea la cabeza, mide el porton rehecho y escupe al barro. \"Esto aguanta pinta de fortaleza\", dice. \"Golpe de verdad, no.\"",
                jailLine: "Brunna recorre las jaulas con una mirada corta y feroz. Donde vos ves hierro, ella ya esta calculando bisagras, pernos y que barra hay que partir primero.",
                ghorvashLine: "Brunna ni siquiera finge interes por la charla de Ghorvash. Da un paso adelante y deja claro, con una sonrisa torcida, que si el semiorco quiere hablar va a tener que hacerlo sabiendo quien pega mas fuerte en la sala.",
                optionLabel: "Seguir a Brunna y quebrar la posicion antes de que se afiance",
                optionDesc: "Brunna ve defensas donde otros ven ruido. Si hay que abrir una entrada, ella sabe cual duele.",
                optionCheck: { type: "ability", target: "STR", dc: 13, label: "Fuerza" },
                optionSuccessText: "Sigues el primer golpe de Brunna y la estructura responde como ella habia prometido: un poste cede, un apoyo se corre y la defensa enemiga pierde orden justo cuando necesita tenerlo.",
                optionFailureText: "Brunna encuentra el punto de impacto, pero el estruendo sale mas sucio de lo esperado. La posicion se resquebraja igual, solo que ahora todos saben que estas ahi.",
                combat: { ac: "17", hp: "16", maxHp: "16", attackBonus: "+5", damage: "1d10+3", morale: "fight", targetWeight: 3.15 }
            };
        }
        if (state?.flags?.dd_ally_kael) {
            return {
                id: "kael",
                name: "Kael Morcant",
                role: "infiltrado",
                short: "Kael",
                flags: { wounded: "dd_kael_wounded", fallen: "dd_kael_fell", perish: "dd_kael_perish" },
                reaction: "Kael deja que otros miren el peligro grande; el busca cuerdas, sellos, rutas de recambio y el detalle que delata negocio.",
                gateLine: "Kael sonrie sin alegria al ver las cuerdas, las lonas y el orden del puesto. \"Esto huele a gente pagada por mover bultos\", dice. \"Y donde hay rutina, hay costumbre. Donde hay costumbre, hay huecos.\"",
                jailLine: "Kael ya esta revisando cierres, cofres y rincones donde un capataz guardaria lo que no quiere perder en un apuro. No rescata con solemnidad: rescata mientras roba informacion.",
                ghorvashLine: "Kael no le saca los ojos a la mesa de cuentas de Ghorvash. Cada vez que el semiorco se mueve, el ladron mira el papel, no el hacha.",
                optionLabel: "Dejar que Kael juegue con los ritmos del lugar y te abra una falla",
                optionDesc: "Kael entiende mejor que nadie la logica de guardias, sobornos y manos apuradas.",
                optionCheck: { type: "skill", target: "Bluff", dc: 13, label: "Bluff" },
                optionSuccessText: "Kael provoca el gesto exacto: una mirada fuera de lugar, una orden repetida, una duda breve en el hombre que tendria que haber reaccionado antes. Cuando la ventana se abre, ya estas adentro.",
                optionFailureText: "La jugada de Kael no compra el tiempo que queria, pero si desordena lo justo como para que el primer intercambio no te agarre totalmente vendido.",
                combat: { ac: "14", hp: "10", maxHp: "10", attackBonus: "+4", damage: "1d6+2", morale: "fight", targetWeight: 1.2 }
            };
        }
        return null;
    }

    function getChosenCompanionCondition(state) {
        const companion = getChosenCompanion(state);
        if (!companion) return "none";
        if (companion.flags?.perish && state?.flags?.[companion.flags.perish]) return "perish";
        if (companion.flags?.fallen && state?.flags?.[companion.flags.fallen]) return "fallen";
        if (companion.flags?.wounded && state?.flags?.[companion.flags.wounded]) return "wounded";
        return "ready";
    }

    function canChosenCompanionAct(state) {
        const condition = getChosenCompanionCondition(state);
        return !!getChosenCompanion(state) && condition !== "fallen" && condition !== "perish";
    }

    function getChosenCompanionSceneLine(state, key) {
        const companion = getChosenCompanion(state);
        if (!companion) return "";
        const condition = getChosenCompanionCondition(state);
        if (condition === "perish") {
            const perishLines = {
                gate: `${companion.short} ya no puede seguirte. Lo que paso en el camino te obliga a avanzar con un silencio mucho mas pesado, porque donde antes habia apoyo ahora solo queda ausencia.`,
                jail: `${companion.short} no llego vivo hasta este punto. Cada decision dentro de Caer Vorn carga ahora con ese hueco irreparable.`,
                ghorvash: `${companion.short} ya no forma parte de esta ultima presion sobre Ghorvash. La sala se siente mas grande, mas fria y bastante menos perdonable.`,
                close: `${companion.short} no sale de esta historia. Lo que lograste en Caer Vorn queda atado para siempre al precio de haberlo perdido en el camino.`
            };
            return perishLines[key] || "";
        }
        if (condition === "fallen") {
            const fallenLines = {
                gate: `${companion.short} ya no esta en condiciones de cubrirte. La ruta hasta Caer Vorn se siente mas vacia, y cada decision pesa como si ahora faltara una mano entera en el grupo.`,
                jail: `${companion.short} quedo fuera de combate antes de llegar hasta aqui. El hueco que deja se nota en cada segundo que pierdes repartiendo tareas que antes habrian caido solas sobre otra espalda.`,
                ghorvash: `${companion.short} no llego en pie hasta la sala de Ghorvash. Lo que digas o hagas ahora ya no cuenta con esa segunda voz, esa segunda hoja o ese segundo par de ojos.`,
                close: `${companion.short} no sale de Caer Vorn en condiciones de seguir el ritmo del resto. La victoria pesa mas por eso: ganaste el tramo, pero no saliste intacto de el.`
            };
            return fallenLines[key] || "";
        }
        if (condition === "wounded") {
            const woundedLines = {
                jail: `${companion.short} sigue contigo, pero la herida ya le recorto el margen. Se mueve, ayuda y opina, aunque cada gesto recuerda que la siguiente pelea no le va a salir gratis.`,
                ghorvash: `${companion.short} llega hasta Ghorvash con sangre seca en la ropa y menos aire del que le gustaria admitir. Sigue siendo util, pero ya no puede regalar ni un error.`,
                close: `${companion.short} sale vivo de Caer Vorn, aunque bastante peor de lo que entro. El proximo tramo va a encontrarlo mas duro, pero tambien mas castigado.`
            };
            return woundedLines[key] || (companion[key + "Line"] || "");
        }
        return companion[key + "Line"] || "";
    }

    function buildCompanionCombatant(state) {
        const companion = getChosenCompanion(state);
        const condition = getChosenCompanionCondition(state);
        if (!companion || condition === "fallen" || condition === "perish") return null;
        const wounded = condition === "wounded";
        const maxHp = wounded
            ? String(Math.max(1, Math.ceil((parseInt(companion.combat.maxHp, 10) || parseInt(companion.combat.hp, 10) || 1) / 2)))
            : companion.combat.maxHp;
        return {
            id: companion.id,
            name: companion.name,
            ac: wounded ? String(Math.max(10, (parseInt(companion.combat.ac, 10) || 10) - 1)) : companion.combat.ac,
            hp: maxHp,
            maxHp,
            attackBonus: wounded ? `${Math.max(0, parseInt(companion.combat.attackBonus, 10) - 1) >= 0 ? "+" : ""}${Math.max(0, parseInt(companion.combat.attackBonus, 10) - 1)}` : companion.combat.attackBonus,
            damage: companion.combat.damage,
            morale: companion.combat.morale
            ,
            targetWeight: companion.combat.targetWeight,
            injuryFlag: companion.flags?.wounded || "",
            fallenFlag: companion.flags?.fallen || "",
            perishFlag: companion.flags?.perish || "",
            conditionAtStart: condition,
            startHp: maxHp,
            injuryNote: `${companion.name} sale herido del combate y el resto del tramo lo encuentra mucho mas limitado.`,
            perishNote: `${companion.name} no sobrevive a la presion de este tramo y su perdida ya no tiene vuelta atras.`,
            fallenNote: `${companion.name} cae fuera de combate y ya no puede sostener el resto de la incursión como venia haciendolo.`
        };
    }

    campaign.helpers = {
        ...(campaign.helpers || {}),
        getChosenCompanion,
        getChosenCompanionCondition,
        canChosenCompanionAct,
        getChosenCompanionSceneLine,
        buildCompanionCombatant
    };

    Object.assign(campaign.scenes, {
        dd_act1_arribo_irivith: {
            title: "Arribo a Irivith",
            location: "Muelle de Irivith",
            text: () => [
                `${getPlayerName()} pisa el muelle y la madera cede apenas bajo las botas. La llovizna pega las redes podridas a los postes, junta aceite viejo entre las tablas y no alcanza a borrar el olor del pescado abierto. Nadie deja de trabajar cuando llegas, pero varios miran primero hacia el camino interior y despues hacia vos.`,
                "Un bote golpea dos veces contra el pilote. Un muchacho arrastra una caja sin hacer ruido. Una mujer recoge sogas del suelo como si quisiera vaciar el puerto antes de que caiga del todo la noche.",
                `Detras del mostrador de la taberna del muelle, Mara Vens seca una jarra con un trapo ya empapado y te calcula en silencio. ${getClassArrivalFlavor()}`
            ],
            choices: [
                {
                    label: "Escuchar a Mara Vens y aceptar el problema de inmediato",
                    desc: "La posadera conoce nombres, deudas y silencios. Si baja la voz, conviene escuchar.",
                    next: "dd_act1_hub_irivith",
                    journal: "Mara Vens no pierde tiempo: en Irivith falta gente, sobran excusas y nadie parece creer que la guardia vaya a resolverlo sola.",
                    effects: {
                        setFlags: ["dd_mara_contacto", "dd_desapariciones_confirmadas"],
                        adjustMetrics: { reputacionIrivith: 1 },
                        objective: "Hablar con la gente correcta en Irivith y encontrar un rastro util antes de perder la noche."
                    }
                },
                {
                    label: "Buscar al alguacil Tollan Grev antes de moverte",
                    desc: "Si todavia queda autoridad en la aldea, mejor medirla de frente.",
                    next: "dd_act1_hub_irivith",
                    journal: "Tollan Grev ya no finge tener control completo. Lo poco que puede darte es permiso para actuar antes de que la noche cierre del todo.",
                    effects: {
                        setFlags: ["dd_tollan_contacto", "dd_desapariciones_confirmadas"],
                        adjustMetrics: { reputacionIrivith: 1 },
                        objective: "Reunir pistas en Irivith y definir por donde cortar hacia el bosque."
                    }
                }
            ]
        },

        dd_act1_hub_irivith: {
            title: "Irivith bajo lluvia",
            location: "Centro de Irivith",
            text: state => [
                state.flags.dd_mara_contacto
                    ? "Sales de la taberna con el gusto agrio de la cerveza en el aire y las palabras de Mara todavia frescas. Ahora que alguien se animo a decirlo sin rodeos, la aldea entera parece haberse encogido alrededor del problema."
                    : "Te apartas de Tollan con la sensacion clara de haber hablado con un hombre cansado, no con una solucion. Desde la plaza, Irivith se ordena sola: casas cerradas, velas prendidas a deshora y calles donde nadie quiere quedarse quieto demasiado tiempo.",
                "La taberna junta murmullos detras de puertas entornadas. En el santuario, una campana chica suena cada tanto con el viento del mar. En tres casas distintas hay platos servidos para gente que no volvio.",
                state.flags.dd_fresh_tracks
                    ? "Ahora ya no se trata solo de rumores. Sabes que hubo movimiento real hacia el bosque, y cada tramo de tiempo que dejes pasar trabaja a favor de quien se llevo a esa gente."
                    : "Todavia no tienes un rastro limpio. Tienes nombres, horarios cruzados y la clase de silencio que una aldea aprende cuando ya empezo a contar ausentes."
            ],
            choices: [
                {
                    label: "Hablar con las familias de los desaparecidos",
                    desc: "Si el dolor repite detalles, esos detalles suelen ser reales.",
                    requires: { notFlags: ["dd_familias_revisadas"] },
                    check: { type: "skill", target: "Gather Information", dc: 12, label: "Gather Information" },
                    success: {
                        next: "dd_act1_hub_irivith",
                        text: "Pasas de puerta en puerta, tragando llanto seco, voces gastadas y platos intactos sobre la mesa. Al final quedan dos datos firmes: uno de los ausentes fue visto cerca del borde oriental del bosque y otra muchacha llevaba una cinta azul cuando la perdieron de vista.",
                        effects: {
                            setFlags: ["dd_familias_revisadas", "dd_fresh_tracks"],
                            advanceTime: 1,
                            adjustMetrics: { reputacionIrivith: 1 }
                        }
                    },
                    failure: {
                        next: "dd_act1_hub_irivith",
                        text: "No sacas una direccion clara, pero si algo igual de util: nadie habla de una sola mala noche. La aldea lleva dias intentando convencerse de que esto fue casualidad, y ya no le sale.",
                        effects: {
                            setFlags: ["dd_familias_revisadas"],
                            advanceTime: 1
                        }
                    }
                },
                {
                    label: "Abrir oidos en la taberna de Mara",
                    desc: "Los marineros mienten mucho, pero rara vez todos mienten igual.",
                    requires: { notFlags: ["dd_taberna_revisada"] },
                    next: "dd_act1_taberna_mara",
                    effects: { advanceTime: 1 }
                },
                {
                    label: "Ir al santuario de Hermana Solenne",
                    desc: "Algunos miedos entran primero en los suenos y despues en la calle.",
                    requires: { notFlags: ["dd_santuario_revisado"] },
                    next: "dd_act1_santuario",
                    effects: { advanceTime: 1 }
                },
                {
                    label: "Seguir de inmediato las huellas frescas en el borde del bosque",
                    desc: "Si alguien fue arrastrado hace poco, cada tramo que pase va a borrar algo.",
                    requires: {
                        flagsAny: ["dd_fresh_tracks", "dd_marea_cala", "dd_rumor_linterna"],
                        maxDay: 1,
                        timeAny: ["atardecer", "noche"]
                    },
                    next: "dd_act1_borde_bosque",
                    effects: {
                        objective: "Entrar en Vhalia con un rastro aun util y descubrir si los raptores son hombres, bestias o algo peor."
                    }
                },
                {
                    label: "Retirarte y atender heridas antes de meterte en el bosque",
                    desc: "Puede ser prudente. Tambien puede costarte la mejor ventana de la noche.",
                    next: "dd_act1_hub_irivith",
                    effects: {
                        rest: "field",
                        journal: "Te tomas un momento para ajustar equipo, vendas y respiracion mientras Irivith sigue contando horas en lugar de respuestas."
                    }
                }
            ]
        },

        dd_act1_taberna_mara: {
            title: "La taberna de Mara",
            location: "Sala comun de Irivith",
            text: [
                "La taberna transpira cerveza agria, algas secas y lana mojada. Las conversaciones no se cortan cuando entras; se achican. Un marinero baja la voz a mitad de frase. Otro tapa una linterna vieja con el codo, como si fuera una carta mala en una mesa de juego.",
                "Mara apoya tu jarra sin hacer ruido. \"Los del fondo vieron algo\", murmura. \"No quieren decirlo como hombres valientes. Vas a tener que sacarselo como quien saca una espina.\"",
                "En una mesa torcida, dos pescadores discuten por una ruta de marea y un tercero se empena en jurar que las huellas que vio no eran de gente del puerto."
            ],
            choices: [
                {
                    label: "Presionar por rumores concretos sobre luces y senderos",
                    desc: "No necesitas una teoria. Necesitas una direccion.",
                    check: { type: "skill", target: "Gather Information", dc: 12, label: "Gather Information" },
                    success: {
                        next: "dd_act1_hub_irivith",
                        text: "Tiras de una frase, despues de otra, hasta que las piezas encajan: una linterna vieja volvio del borde oriental, alguien oyo un silbido corto entre la niebla y las huellas en el barro no tenian paso de aldeano. Mara no sonrie; solo inclina la cabeza como quien confirma un mal presentimiento.",
                        effects: {
                            setFlags: ["dd_taberna_revisada", "dd_rumor_linterna"],
                            adjustMetrics: { reputacionIrivith: 1 }
                        }
                    },
                    failure: {
                        next: "dd_act1_hub_irivith",
                        text: "No arrancas una version limpia, pero si un tono comun: nadie habla de bestias. Hablan de ordenes, de pasos pesados y de gente que no quiere ser reconocida.",
                        effects: { setFlags: ["dd_taberna_revisada"] }
                    }
                }
            ]
        },

        dd_act1_santuario: {
            title: "El santuario de Solenne",
            location: "Galeria de piedra junto al mar",
            text: [
                "El santuario cabe casi entero en el sonido de la lluvia. Hay sal en las juntas de la piedra, cera vieja sobre el suelo y santos gastados por dedos que han pedido demasiado. Las velas tiemblan cada vez que el viento entra desde la galeria.",
                "Solenne te recibe sin apuro. Tiene los ojos cansados y las manos quietas, lo cual en ese lugar vale mas que una sonrisa. \"Las familias ya no vienen a pedir consuelo\", dice. \"Vienen a preguntar cuanto tarda Dios en mirar para este lado.\"",
                "Antes de dejarte hablar, agrega algo peor que un rumor: varios deudos sonaron con agua negra y una silueta inmovil del otro lado de la lluvia. No lo predica. Lo recuerda."
            ],
            choices: [
                {
                    label: "Pedirle una bendicion breve y llevarte su advertencia al bosque",
                    desc: "Solenne no ofrece certezas, pero sus fieles llevan dias juntando suenos, ausencias y detalles que otros prefieren callar.",
                    next: "dd_act1_hub_irivith",
                    effects: {
                        setFlags: ["dd_santuario_revisado", "dd_marea_cala"],
                        addItems: ["Concha bendita de Solenne", "Cordel de nudos votivos"],
                        adjustMetrics: { reputacionIrivith: 1 }
                    }
                }
            ]
        },

        dd_act1_borde_bosque: {
            title: "Borde de Vhalia",
            location: "Linde del bosque",
            text: state => [
                "A diez pasos del ultimo cercado, el puerto desaparece. No de golpe: primero se apagan las voces, despues las campanas de los botes, despues hasta el crujido del muelle parece quedar lejos. Bajo los arboles, la lluvia cae mas gruesa.",
                state.flags.dd_rumor_linterna
                    ? "Encuentras aceite viejo entre barro, agujas de pino y una marca de hierro baja sobre la corteza. No parece una pasada aislada. Parece una ruta usada por gente que vuelve sobre sus propios pasos."
                    : "Las huellas son pesadas, parejas y demasiado constantes para ser de animales. Quien entro por aqui cargaba peso y no iba con miedo.",
                "Cada gota golpea barro, hoja y huella como si quisiera emparejarlo todo antes de que alguien llegue a leerlo bien."
            ],
            choices: [
                {
                    label: "Seguir las huellas antes de que se rompan del todo",
                    desc: "La mejor pista es la que aun no tiene tiempo de mentirte.",
                    check: { type: "skill", target: "Survival", dc: 13, label: "Survival" },
                    success: {
                        next: "dd_act1_party_intro",
                        text: "Te agachas, apartas barro con el dorso de la mano y sigues el paso correcto entre ramas cortadas y tierra hundida. Hay varias botas, al menos dos tramos de arrastre y un ritmo de marcha demasiado parejo para ser improvisado.",
                        effects: {
                            setFlags: ["dd_bosque_rastro_firme"],
                            advanceTime: 1
                        }
                    },
                    failure: {
                        next: "dd_act1_party_intro",
                        text: "La lluvia te roba la lectura fina, pero no la direccion. Avanzas corrigiendo sobre la marcha, perdiendo detalle y ganando apenas lo suficiente para no soltar el rastro del todo.",
                        effects: {
                            setFlags: ["dd_bosque_rastro_torpe"],
                            advanceTime: 1,
                            damage: 1
                        }
                    }
                }
            ]
        },

        dd_act1_party_intro: {
            title: "Tres aventureros en un claro roto",
            location: "Claro de Vhalia",
            text: [
                "El claro se abre de pronto entre ramas bajas. Hay barro levantado hasta la corteza de los arboles, sangre fresca mezclada con lluvia y una bestia del monte todavia humeando en el suelo. Tres desconocidos estan alrededor del cadaver. Ninguno festeja.",
                "Uno limpia su hoja corta con paciencia de cirujano. El segundo, una enana de hombros anchos, patea la costilla del animal para comprobar que no vuelva a levantarse. El tercero te mira antes de mirar el cuerpo, como si quisiera saber cuanto problema acabas de traer.",
                "\"Arannis Vel-Shae\", dice el elfo, sin mas. \"Brunna Fuegoamargo\", grune la enana. El otro hace una media reverencia embarrada. \"Kael Morcant. Si venis siguiendo las mismas huellas que nosotros, ya somos demasiada gente con la misma mala noticia.\""
            ],
            choices: [
                {
                    label: "Confiar en Arannis Vel-Shae",
                    desc: "Silencio, rastreo y lectura de sendas viejas antes que fuerza bruta.",
                    next: "dd_act1_ruta_arannis",
                    effects: {
                        setFlags: ["dd_ally_arannis"],
                        setMetrics: { aliadoElegido: 1 },
                        journal: "Arannis se suma sin ceremonia. Antes de moverse, roza una marca en la corteza y murmura: \"Si queres llegar vivos, deja de caminar como gente del puerto.\""
                    }
                },
                {
                    label: "Confiar en Brunna Fuegoamargo",
                    desc: "Si el bosque es hostil, tambien se lo puede obligar a responder de frente.",
                    next: "dd_act1_ruta_brunna",
                    effects: {
                        setFlags: ["dd_ally_brunna"],
                        setMetrics: { aliadoElegido: 2 },
                        journal: "Brunna toma el mango del martillo y asiente una sola vez. \"Bien\", grune. \"Ahora avancemos antes de que algo se crea dueno del monte.\""
                    }
                },
                {
                    label: "Confiar en Kael Morcant",
                    desc: "Una pista sucia en un bosque suele venir de una cadena mas sucia todavia.",
                    next: "dd_act1_ruta_kael",
                    effects: {
                        setFlags: ["dd_ally_kael"],
                        setMetrics: { aliadoElegido: 3 },
                        journal: "Kael te sigue con paso liviano y una sonrisa dudosa. \"Si esto ya huele a negocio\", dice, \"entonces estamos cerca de gente peor que bandidos.\""
                    }
                }
            ]
        },

        dd_act1_ruta_arannis: {
            title: "La senda que casi no existe",
            location: "Rastro elfico cubierto",
            text: [
                "Arannis no aparta ramas: elige cuales no tocar. Avanza por huecos que no parecian existir hasta que el pasa por ellos. Dos veces se detiene, roza una marca vieja en la corteza y cambia el rumbo sin explicacion.",
                "\"No confundas silencio con paz\", dice en voz baja. Despues vuelve a callar, y el bosque parece cerrarse un poco mas alrededor de ambos."
            ],
            choices: [
                {
                    label: "Cruzar el roble hueco y leer lo que quedo atras",
                    desc: "Si los raptores usan este lado del monte, dejaron algo mas que huellas.",
                    next: "dd_act1_roble_hueco",
                    effects: { advanceTime: 1, setFlags: ["dd_ally_path_open"] }
                },
                {
                    label: "Ir directo hacia la linea de ruinas cubiertas",
                    desc: "Arannis cree que la base real esta cerca de piedra vieja, no de simples chozas.",
                    next: "dd_act1_caer_vorn_gate",
                    effects: { advanceTime: 1, setFlags: ["dd_arannis_shortcut"] }
                }
            ]
        },

        dd_act1_ruta_brunna: {
            title: "Quebrada de piedra mojada",
            location: "Subida rocosa de Vhalia",
            text: [
                "Brunna mira el sendero bajo, escupe a un lado y elige la subida. La quebrada trepa entre piedra negra y liquen resbaloso; el agua baja por grietas demasiado rectas para ser comodas.",
                "\"Si tienen vigias\", dice, ajustandose el martillo al hombro, \"alla arriba van a tener que respirar. Y si respiran, se los oye.\""
            ],
            choices: [
                {
                    label: "Forzar paso entre rocas y limpiar vigias",
                    desc: "Menos sutileza, mas control del terreno antes del asalto.",
                    check: { type: "ability", target: "STR", dc: 12, label: "Fuerza" },
                    success: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "Metes el hombro donde Brunna te indica, la laja cede y el desprendimiento baja por la quebrada con un estruendo corto. No derrumba medio monte, pero basta para abrirte paso y desordenar a cualquiera que estuviera escuchando arriba.",
                        effects: {
                            advanceTime: 1,
                            setFlags: ["dd_brunna_gate_edge"],
                            addItems: ["Cuna de hierro de cantero", "Pieza de arnes remachado"],
                            addCurrency: 3
                        }
                    },
                    failure: {
                        next: "dd_act1_arroyo_sin_reflejo",
                        text: "La roca baja antes de tiempo y te obliga a corregir el paso hacia una quebrada lateral. Brunna maldice enano antiguo. Aunque no entiendas las palabras, el tono alcanza.",
                        effects: {
                            advanceTime: 1,
                            damage: 2
                        }
                    }
                }
            ]
        },

        dd_act1_ruta_kael: {
            title: "Campamento de contrabandistas caido",
            location: "Margen oculto del bosque",
            text: [
                "Kael reconoce primero lo que falta: no hay animales de carga, no hay olla al fuego y no hay nada tirado por descuido. El campamento fue levantado rapido, si, pero tambien limpiado por manos acostumbradas.",
                "\"Esto no es saqueo de monte\", murmura mientras levanta una lona embarrada con la punta de la bota. \"Es paso. Gente moviendo gente. Y cobrando por hacerlo.\""
            ],
            choices: [
                {
                    label: "Revisar cofres y lonas antes de seguir",
                    desc: "Un campamento de paso suele perder monedas, llaves o nombres.",
                    check: { type: "skill", target: "Search", dc: 12, label: "Search" },
                    success: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "Apartas sal, cuerda y lona hasta dar con lo importante: un salvoconducto roto, un sello menor de Medoran y una nota de entrega escrita con letra demasiado prolija para pertenecer a un simple bandido.",
                        effects: {
                            advanceTime: 1,
                            setFlags: ["dd_kael_contrabando", "dd_medoran_hint"],
                            addItems: ["Sello roto de Medoran", "Salvoconducto rasgado", "Bolsa de clavos de amarre"],
                            addCurrency: 5
                        }
                    },
                    failure: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "No levantas una prueba cerrada, pero si demasiados indicios parejos: cuerda de embarque, marcas de recuento y una forma de ordenar el sitio que no encaja con mera brutalidad de monte.",
                        effects: {
                            advanceTime: 1,
                            setFlags: ["dd_kael_contrabando"]
                        }
                    }
                }
            ]
        },

        dd_act1_roble_hueco: {
            title: "El roble hueco",
            location: "Interior de Vhalia",
            text: [
                "Dentro del roble hay olor a cuero humedo, lluvia estancada y carne que lleva demasiado tiempo enfriandose sola. El explorador muerto no fue desvalijado del todo. Le sacaron lo urgente y lo dejaron donde tarde o temprano alguien tenia que encontrarlo.",
                "Arannis hojea un cuaderno pegado por el agua, arranca una pagina que aun se deja leer y te la muestra sin comentario: los llevan vivos."
            ],
            choices: [
                {
                    label: "Tomar el diario, una pocion y volver al rastro principal",
                    desc: "No resuelve nada, pero ordena la prioridad correcta.",
                    next: "dd_act1_caer_vorn_gate",
                    effects: {
                        setFlags: ["dd_roble_diario"],
                        addItems: ["Diario mojado del explorador", "Pocion de curacion ligera", "Broche de capa grabado"],
                        advanceTime: 1
                    }
                }
            ]
        },

        dd_act1_arroyo_sin_reflejo: {
            title: "El arroyo sin reflejo",
            location: "Quebrada interior",
            text: [
                "El agua corre clara, pero no devuelve imagen. Ni tu cara ni la de Brunna aparecen enteras en la superficie; apenas manchas cortadas que se desarman antes de tomar forma.",
                "\"No me gusta\", dice Brunna, y en su boca eso pesa mas que una queja. Ninguno de los dos se agacha a tocar el agua."
            ],
            choices: [
                {
                    label: "Cruzar rapido y seguir el monte antes de perder mas tiempo",
                    desc: "Quedarte mirando lo raro no lo vuelve menos raro.",
                    next: "dd_act1_caer_vorn_gate",
                    effects: {
                        setFlags: ["dd_agua_torcida"],
                        adjustMetrics: { influenciaVael: 1 },
                        addItems: ["Piedra negra pulida por corriente"],
                        advanceTime: 1
                    }
                }
            ]
        },

        dd_act1_caer_vorn_gate: {
            title: "Ruinas de Caer Vorn",
            location: "Entrada del valle oculto",
            text: state => [
                "Caer Vorn aparece por partes: primero una torre partida detras de las ramas, despues un arco hundido en musgo, despues muros viejos reforzados con madera nueva. Alguien colgo lonas entre columnas nobles, clavo postes donde antes hubo escudos y convirtio la entrada en un cuello de botella.",
                state.flags.dd_medoran_hint
                    ? "Ahora miras el lugar de otra manera. No ves solo escondite: ves paso, recuento y trabajo hecho para durar. Cada cuerda y cada vigia encajan demasiado bien para ser una ocurrencia salvaje."
                    : "No parece un nido improvisado. Hay vigias donde tienen que estar, tramos despejados para arrastrar carga y un orden feo en la forma de usar las ruinas.",
                "Desde dentro llegan cadenas leves, el resuello de un perro mal alimentado y una voz ronca que da ordenes sin alzar demasiado el tono.",
                getChosenCompanionSceneLine(state, "gate") || "Avanzar hasta ahi sin hacer ruido o sin llamar a toda la ruina va a depender de lo que leas primero: la piedra o a la gente."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const choices = [
                    {
                        label: "Entrar en silencio por una grieta lateral",
                        desc: "Si logras ver las jaulas primero, el asalto cambia por completo.",
                        check: { type: "skill", target: "Move Silently", dc: 13, label: "Move Silently" },
                        success: {
                            next: "dd_act1_jaulas_caer_vorn",
                            text: "Te pegas a la piedra mojada, te deslizas por la grieta lateral y bajas la respiracion hasta oir primero las cadenas y despues a la gente. Cuando alcanzas la nave interior, ya estas dentro.",
                            effects: { setFlags: ["dd_caer_vorn_infiltrado"], advanceTime: 1 }
                        },
                        failure: {
                            next: "dd_act1_guardia_semiorca",
                            text: "Una piedra suelta rueda donde no debe. Del otro lado responden con un silbido corto y botas que ya vienen hacia vos. El sigilo dura exactamente lo que tarda en morir ese eco.",
                            effects: { advanceTime: 1, damage: 1 }
                        }
                    },
                    {
                        label: "Barrer la entrada a golpes y tomar la iniciativa",
                        desc: "A veces la mejor forma de entrar es que sepan que ya llegaste.",
                        next: "dd_act1_guardia_semiorca",
                        effects: { setFlags: ["dd_caer_vorn_asalto"], advanceTime: 1 }
                    }
                ];
                if (companion && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: companion.optionLabel,
                        desc: companion.optionDesc,
                        check: companion.optionCheck,
                        success: {
                            next: "dd_act1_jaulas_caer_vorn",
                            text: companion.optionSuccessText,
                            effects: {
                                setFlags: [`dd_${companion.id}_edge`],
                                advanceTime: 1,
                                addItems: companion.id === "kael" ? ["Tira de precinto cortada"] : companion.id === "arannis" ? ["Trozo de tela de vigia"] : ["Remache partido del porton"]
                            }
                        },
                        failure: {
                            next: "dd_act1_guardia_semiorca",
                            text: companion.optionFailureText,
                            effects: {
                                setFlags: [`dd_${companion.id}_pressure`],
                                advanceTime: 1
                            }
                        }
                    });
                }
                return choices;
            }
        },

        dd_act1_guardia_semiorca: {
            title: "Guardia de Caer Vorn",
            location: "Patio derruido",
            text: state => [
                "La guardia no tiene nada de ceremonial: dos semiorcos con equipo rehecho a partir de restos de guerra y un perro de guerra flaco al que alguien acostumbro a hambre, hierro y silbidos cortos.",
                "Las llaves estan colgadas alto. Los grilletes, a mano. El suelo junto a la entrada esta marcado por pasos de ida y vuelta, como si sacar gente de ahi fuese rutina.",
                getChosenCompanion(state)?.reaction || "No estas entrando solo en un patio de ruinas: estas entrando en una rutina de secuestro bien aceitada."
            ],
            choices: [
                {
                    label: "Romper la guardia y abrirte paso",
                    desc: "Si la cerradura cede y el guardia cae a tiempo, las jaulas pueden abrirse antes de que todo el patio despierte.",
                    check: { type: "attack", dc: 15, label: "Ataque principal" },
                    combat: state => ({
                        enemies: [
                            { id: "scout-1", name: "Semiorco vigia", ac: "15", hp: "10", maxHp: "10", attackBonus: "+3", damage: "1d8+2", morale: "flee25" },
                            { id: "scout-2", name: "Semiorco vigia", ac: "15", hp: "10", maxHp: "10", attackBonus: "+3", damage: "1d8+2", morale: "flee25" },
                            { id: "hound-1", name: "Perro de guerra flaco", ac: "13", hp: "8", maxHp: "8", attackBonus: "+2", damage: "1d6+1", morale: "fight" }
                        ],
                        allies: buildCompanionCombatant(state) ? [buildCompanionCombatant(state)] : []
                    }),
                    success: {
                        next: "dd_act1_jaulas_caer_vorn",
                        text: "La refriega es corta y fea. Una llave golpea piedra, el perro retrocede chillando y la entrada queda abierta de golpe, como si al lugar le hubieran arrancado un diente.",
                        effects: {
                            setFlags: ["dd_guardia_rota"],
                            addItems: ["Llaves remachadas de jaula", "Cuchillo curvo semiorco", "Collar de castigo para perro de guerra"],
                            addCurrency: 2
                        }
                    },
                    failure: {
                        next: "dd_act1_jaulas_caer_vorn",
                        text: "Entras igual, pero pagandolo en carne. Un golpe mal cerrado, un ladrido demasiado cerca y el ruido suficiente para avisarle al resto que alguien ya cruzo la puerta.",
                        effects: {
                            damage: 3,
                            setFlags: ["dd_guardia_alertada"],
                            addItems: ["Llave torcida de candado"]
                        }
                    }
                }
            ]
        },

        dd_act1_jaulas_caer_vorn: {
            title: "Jaulas y nombres",
            location: "Interior de Caer Vorn",
            text: state => [
                "Las jaulas ocupan una nave lateral entre columnas partidas y lona vieja usada para cortar el viento. Hay barro del puerto, acentos que no son de Irivith y marcas de cuerda en munecas demasiado distintas entre si como para pertenecer a un solo pueblo.",
                "Un cautivo con la boca partida te agarra del antebrazo apenas llegas. \"Ghorvash manda aqui\", te susurra. Traga saliva y corrige: \"Pero no cobra de los suyos. Cobra de hombres limpios.\"",
                getChosenCompanionSceneLine(state, "jail") || "Todo lo que hagas ahora va a decidir si sales de Caer Vorn con gente viva, con pruebas, o con las dos cosas."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const choices = [
                    {
                        label: "Liberar a los cautivos que puedas y presionar hacia el mando",
                        desc: "Si el castillo revienta despues, al menos no con la gente adentro.",
                        next: "dd_act1_ghorvash",
                        effects: {
                            setFlags: ["dd_cautivos_liberados"],
                            adjustMetrics: { reputacionIrivith: 2 },
                            objective: "Derrotar o quebrar a Ghorvash y salir de Caer Vorn con una pista firme hacia Medoran."
                        }
                    },
                    {
                        label: "Registrar los cofres antes de que alguien huya con papeles y sellos",
                        desc: "Los hombres se rescatan. Las cadenas tambien se prueban.",
                        check: { type: "skill", target: "Search", dc: 13, label: "Search" },
                        success: {
                            next: "dd_act1_ghorvash",
                            text: "Apartas viveres, herramientas y lona hasta dar con lo que no deberia estar ahi: un listado de traslados, marcas de pago y una letra demasiado prolija para una banda de monte.",
                            effects: {
                                setFlags: ["dd_pruebas_medoran"],
                                addItems: ["Listado de traslados de Caer Vorn", "Faja de cuero con sellos viejos", "Anillo de bronce de peaje"],
                                addCurrency: 4
                            }
                        },
                        failure: {
                            next: "dd_act1_ghorvash",
                            text: "No recuperas un papel entero, pero si retazos suficientes para oler peaje, inventario y una cadena de mando que no termina en Caer Vorn.",
                            effects: { setFlags: ["dd_pruebas_medoran"] }
                        }
                    }
                ];
                if (companion?.id === "arannis" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Seguir la lectura de Arannis y sacar primero a los cautivos mas comprometidos",
                        desc: "El elfo detecta en segundos que jaula aguanta y cual esta por convertirse en desastre.",
                        check: { type: "skill", target: "Survival", dc: 12, label: "Survival" },
                        success: {
                            next: "dd_act1_ghorvash",
                            text: "Arannis te marca que cadena cortar primero y a quien mover antes de que la estructura se venga abajo. Sacan a los peores heridos sin abrir un caos imposible de ordenar.",
                            effects: {
                                setFlags: ["dd_cautivos_liberados", "dd_arannis_rescate_fino"],
                                adjustMetrics: { reputacionIrivith: 2, reputacionElfos: 1 },
                                addItems: ["Tira de mapa bosquejada por Arannis"]
                            }
                        },
                        failure: {
                            next: "dd_act1_ghorvash",
                            text: "Arannis lee bien el espacio, pero el apuro igual los alcanza. Logran sacar gente, aunque el ruido y la confusion obligan a dejar la elegancia para otra noche.",
                            effects: { setFlags: ["dd_cautivos_liberados"] }
                        }
                    });
                } else if (companion?.id === "brunna" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Dejar que Brunna parta barrotes y abra una salida inmediata",
                        desc: "No es fino, pero a veces sacar a la gente rapido vale mas que cualquier papel.",
                        check: { type: "ability", target: "STR", dc: 12, label: "Fuerza" },
                        success: {
                            next: "dd_act1_ghorvash",
                            text: "Brunna hunde el martillo donde la jaula cede de verdad y abre una boca de hierro por la que los cautivos salen de a uno, casi empujados por la furia de la enana.",
                            effects: {
                                setFlags: ["dd_cautivos_liberados", "dd_brunna_breach"],
                                adjustMetrics: { reputacionIrivith: 2 },
                                addItems: ["Perno doblado de jaula", "Grillete roto por Brunna"]
                            }
                        },
                        failure: {
                            next: "dd_act1_ghorvash",
                            text: "Brunna abre igual el paso, pero el primer golpe no parte donde deberia y obliga a redoblar fuerza y ruido. Salvar a la gente sigue siendo posible; hacerlo sin avisar al resto, ya no.",
                            effects: { setFlags: ["dd_cautivos_liberados", "dd_guardia_alertada"] }
                        }
                    });
                } else if (companion?.id === "kael" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Dejar que Kael limpie escritorio, cierres y papeles mientras sueltas a los presos",
                        desc: "Kael puede saquear informacion al mismo tiempo que salvas gente.",
                        check: { type: "skill", target: "Search", dc: 11, label: "Search" },
                        success: {
                            next: "dd_act1_ghorvash",
                            text: "Kael mete mano donde un capataz esconderia lo importante y sale con mas que unos sellos: rutas, marcas de cobro y pruebas suficientes para que Medoran deje de ser una sospecha vaga.",
                            effects: {
                                setFlags: ["dd_cautivos_liberados", "dd_pruebas_medoran", "dd_kael_ledgers"],
                                adjustMetrics: { reputacionIrivith: 2, reputacionMedoran: 1 },
                                addItems: ["Talonario de peajes oculto", "Llave fina de cofre", "Sello mercantil limado"],
                                addCurrency: 3
                            }
                        },
                        failure: {
                            next: "dd_act1_ghorvash",
                            text: "Kael no sale con un paquete prolijo, pero si con suficientes restos como para saber que este negocio pisa suelo mas limpio de lo que aparenta.",
                            effects: {
                                setFlags: ["dd_cautivos_liberados", "dd_pruebas_medoran"]
                            }
                        }
                    });
                }
                return choices;
            }
        },

        dd_act1_ghorvash: {
            title: "Ghorvash el Claro",
            location: "Sala principal derruida",
            text: state => [
                "Ghorvash esta junto a una mesa de campana, no a un altar. Tiene las mangas arremangadas, una mano sobre un libro de cuentas y la otra cerca del hacha. No ruge cuando entras. Mira primero tus armas, despues las llaves, despues la salida.",
                state.flags.dd_pruebas_medoran
                    ? "Cuando ve papeles o sellos en tus manos, la sonrisa se le tuerce apenas. No parece sorprendido de que hayas encontrado algo. Parece molesto por no haberlo sacado antes."
                    : "Te recibe como quien ya habia calculado que tarde o temprano alguien pisaria demasiado hondo dentro de sus ruinas.",
                "\"Irivith no entiende nada\", dice al fin. \"Solo ve gente que falta. Nunca ve lo que paga por moverla.\"",
                getChosenCompanionSceneLine(state, "ghorvash") || "Nadie en la sala esta midiendo solo fuerza. Todos estan midiendo quien sale vivo con la verdad en la mano."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const choices = [
                    {
                        label: "Quebrarlo en combate antes de que recomponga la sala",
                        desc: "Si cae el jefe, cae el orden.",
                        check: { type: "attack", dc: 16, label: "Ataque principal" },
                        combat: {
                            enemies: [
                                { id: "ghorvash", name: "Ghorvash el Claro", ac: "16", hp: "18", maxHp: "18", attackBonus: "+5", damage: "1d10+3", morale: "flee25", fleeOutcome: "success" }
                            ],
                            allies: buildCompanionCombatant(state) ? [buildCompanionCombatant(state)] : []
                        },
                        success: {
                            next: "dd_act1_cierre",
                            text: "Lo tumbas o lo obligas a huir roto entre madera rajada, cuentas abiertas y hierro mal colgado. Cuando el aire se aquieta, lo que queda en la sala no es gloria: son pruebas, cautivos y una direccion nueva.",
                            effects: {
                                setFlags: ["dd_ghorvash_quebrado"],
                                adjustMetrics: { reputacionIrivith: 2, reputacionMedoran: 1 },
                                addItems: ["Hacha mellada de Ghorvash", "Sello de pago medorano", "Collar de colmillos marcados"],
                                addCurrency: 6
                            }
                        },
                        failure: {
                            next: "dd_act1_cierre",
                            text: "No lo rematas limpio, pero si le rompes el centro al lugar. Los cautivos salen, la sala pierde orden y Ghorvash deja atras justo el desorden suficiente como para que Caer Vorn ya no vuelva a cerrarse del todo esta noche.",
                            effects: {
                                damage: 4,
                                setFlags: ["dd_ghorvash_escapo"],
                                adjustMetrics: { influenciaVael: 1 },
                                addItems: ["Fragmento de carta de pago", "Aro de hierro de cuadrilla"],
                                addCurrency: 3
                            }
                        }
                    },
                    {
                        label: "Forzarlo a hablar de quien paga realmente",
                        desc: "A veces el jefe local vale mas por lo que sabe que por lo que cae.",
                        requires: { flagsAny: ["dd_pruebas_medoran"] },
                        check: { type: "skill", target: "Intimidate", dc: 14, label: "Intimidate" },
                        success: {
                            next: "dd_act1_cierre",
                            text: "Aprietas donde duele y el nombre sale a tirones. \"Halren\", escupe. \"Medoran. Altiplano. Pozo.\" No te da una confesion. Te da tres palabras que un hombre prudente habria preferido callar.",
                            effects: {
                                setFlags: ["dd_halren_nombrado", "dd_ghorvash_vivo"],
                                adjustMetrics: { reputacionMedoran: 1 },
                                addItems: ["Aguja de sello contable", "Moneda de peaje medorana"],
                                addCurrency: 2
                            }
                        },
                        failure: {
                            next: "dd_act1_cierre",
                            text: "No llegas a quebrarlo del todo, pero el gesto equivocado alcanza: Medoran le importa demasiado, y eso basta para convertir una sospecha en rumbo.",
                            effects: {
                                setFlags: ["dd_halren_nombrado"],
                                adjustMetrics: { influenciaVael: 1 },
                                addItems: ["Tira de cuero marcada"]
                            }
                        }
                    }
                ];
                if (companion?.id === "arannis" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Dejar que Arannis le cierre la retirada y hablarle desde la ventaja",
                        desc: "Con la salida vigilada, Ghorvash tiene menos margen para fanfarronear.",
                        check: { type: "skill", target: "Spot", dc: 13, label: "Spot" },
                        success: {
                            next: "dd_act1_cierre",
                            text: "Arannis se mueve apenas lo necesario y Ghorvash lo nota demasiado tarde: la retirada ya no es limpia. Habla porque entiende que esta vez la sala no le pertenece entera.",
                            effects: {
                                setFlags: ["dd_halren_nombrado", "dd_arannis_cutoff", "dd_ghorvash_vivo"],
                                adjustMetrics: { reputacionMedoran: 1, reputacionElfos: 1 },
                                addItems: ["Marca de ruta a Medoran", "Cordel de cuenta semiorco"],
                                addCurrency: 2
                            }
                        },
                        failure: {
                            next: "dd_act1_cierre",
                            text: "Arannis le complica la salida, pero no la cierra del todo. Aun asi, basta para ver que el nombre que Ghorvash protege importa mas que el oro inmediato.",
                            effects: {
                                setFlags: ["dd_halren_nombrado"],
                                adjustMetrics: { influenciaVael: 1 }
                            }
                        }
                    });
                } else if (companion?.id === "brunna" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Dejar que Brunna le hable en el unico idioma que respeta",
                        desc: "Presion, presencia y acero a medio alzar. A veces alcanza.",
                        check: { type: "skill", target: "Intimidate", dc: 12, label: "Intimidate" },
                        success: {
                            next: "dd_act1_cierre",
                            text: "Brunna da un paso, apoya el martillo contra la piedra y la sala entera entiende el mensaje antes de que abra la boca. Ghorvash cede terreno, palabras y algo de orgullo al mismo tiempo.",
                            effects: {
                                setFlags: ["dd_halren_nombrado", "dd_brunna_broke_ghorvash", "dd_ghorvash_vivo"],
                                adjustMetrics: { reputacionIrivith: 2, reputacionMedoran: 1 },
                                addItems: ["Tira de inventario ensangrentada", "Ficha de cobro medorana"],
                                addCurrency: 2
                            }
                        },
                        failure: {
                            next: "dd_act1_cierre",
                            text: "Brunna no le arranca una confesion limpia, pero si suficiente miedo como para que cada evasiva de Ghorvash apunte en la direccion correcta.",
                            effects: {
                                setFlags: ["dd_halren_nombrado"],
                                adjustMetrics: { influenciaVael: 1 }
                            }
                        }
                    });
                } else if (companion?.id === "kael" && canChosenCompanionAct(state)) {
                    choices.unshift({
                        label: "Dejar que Kael le vacie la mesa mientras vos lo apretas",
                        desc: "Cuando el capataz ve sus cuentas en manos ajenas, suele hablar peor y mas rapido.",
                        requires: { flagsAny: ["dd_pruebas_medoran"] },
                        check: { type: "skill", target: "Bluff", dc: 13, label: "Bluff" },
                        success: {
                            next: "dd_act1_cierre",
                            text: "Kael le roba el centro a la escena sin tocar el hacha: un papel menos en la mesa, un sello en tu mano y la certeza de que Ghorvash ya no negocia desde arriba. El nombre sale casi por reflejo.",
                            effects: {
                                setFlags: ["dd_halren_nombrado", "dd_kael_blackmail", "dd_ghorvash_vivo"],
                                adjustMetrics: { reputacionMedoran: 2 },
                                addItems: ["Media hoja de cuentas de Ghorvash", "Sello de cobro oculto"],
                                addCurrency: 3
                            }
                        },
                        failure: {
                            next: "dd_act1_cierre",
                            text: "Kael no pesca el papel exacto, pero si el nervio correcto. Ghorvash mira la mesa, no tu arma, y con eso basta para saber hacia donde tirar despues.",
                            effects: {
                                setFlags: ["dd_halren_nombrado"],
                                adjustMetrics: { influenciaVael: 1 }
                            }
                        }
                    });
                }
                return choices;
            }
        },

        dd_act1_cierre: {
            title: "Salida de Caer Vorn",
            location: "Valle de Caer Vorn",
            text: state => [
                `Cuando dejas atras las ruinas, el aire del valle sigue frio, pero ya no pesa igual. ${state.flags.dd_halren_nombrado ? "Ahora la historia tiene un nombre y un sitio al que mirar de frente." : "Las pruebas apuntan a Medoran aunque nadie en Irivith hubiera imaginado una mano tan lejos de su costa."}`,
                "Los cautivos que logras sacar caminan poco y miran mucho. Nadie canta victoria. Hay barro en las botas, hierro en las manos y una certeza nueva: el bosque no era el final del rastro.",
                "Detras de ustedes, Caer Vorn queda abierta como una muela partida entre enredaderas. Delante, por primera vez, la campana deja de ser un problema de aldea y toma forma de persecucion.",
                getChosenCompanionSceneLine(state, "close") || "Nadie sale de Caer Vorn igual a como entro."
            ],
            objective: "Salir de Iareth y llevar la pista a Medoran antes de que la red que compra cautivos se limpie a si misma.",
            choices: [
                {
                    label: "Zarpar hacia Medoran con las pruebas",
                    desc: "No conviene darle a Halren ni a su red ni una noche mas de ventaja.",
                    next: "dd_act2_arribo_medoran",
                    effects: {
                        rest: "long",
                        advanceDays: 1,
                        nextTimeIndex: 1,
                        setFlags: ["dd_act1_closed", "dd_act2_started"],
                        objective: "Entrar en Medoran, reunir al menos dos pistas firmes y encontrar el Pozo antes de que el siguiente traslado desaparezca.",
                        journal: "Dejas Iareth atras con cautivos, sellos y nombres reales. La ruta ya no apunta al bosque: apunta a Medoran."
                    }
                }
            ]
        }
    });
})();
