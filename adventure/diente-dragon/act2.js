(function () {
    const campaign = window.ADVENTURE_EXTERNAL_CAMPAIGNS?.["diente-dragon"];
    if (!campaign) return;

    const baseHelpers = campaign.helpers || {};

    function getChosenCompanion(state) {
        return typeof baseHelpers.getChosenCompanion === "function" ? (baseHelpers.getChosenCompanion(state) || null) : null;
    }

    function getChosenCompanionCondition(state) {
        return typeof baseHelpers.getChosenCompanionCondition === "function"
            ? String(baseHelpers.getChosenCompanionCondition(state) || "none")
            : "none";
    }

    function canChosenCompanionAct(state) {
        return typeof baseHelpers.canChosenCompanionAct === "function"
            ? !!baseHelpers.canChosenCompanionAct(state)
            : false;
    }

    function buildCompanionCombatant(state) {
        return typeof baseHelpers.buildCompanionCombatant === "function"
            ? (baseHelpers.buildCompanionCombatant(state) || null)
            : null;
    }

    function getAct2ClueCount(state) {
        return Math.max(0, Number(state?.metrics?.act2Clues || 0));
    }

    function isAct2Late(state) {
        return Number(state?.day || 1) >= 4;
    }

    function getAct2CompanionLine(state, key) {
        const companion = getChosenCompanion(state);
        if (!companion) return "";
        const condition = getChosenCompanionCondition(state);
        const byState = {
            ready: {
                arannis: {
                    arrival: "Arannis no mira las torres blancas de Medoran. Mira las gruas, las compuertas y el barro que llega del agua negra. \"Las ciudades tambien dejan rastro\", dice. \"Solo hay que leerlo distinto.\"",
                    hub: "Arannis sigue incomodo entre piedra, aduanas y voces medidas, pero ya encontro tres cosas que no le gustan: agua de cisterna donde no deberia, carros demasiado limpios y guardias que se hablan sin mirarse.",
                    pozo: "Arannis baja al Pozo con el cuerpo apenas inclinado, como si temiera menos a los hombres que al lugar mismo. Las marcas en la piedra le recuerdan cosas viejas, y eso lo pone mucho mas serio que cualquier guardia."
                },
                brunna: {
                    arrival: "Brunna mastica el aire de Medoran con la misma cara que pondria ante un hierro impuro. \"Mucho brillo arriba\", gruñe. \"Eso siempre significa que abajo alguien esta pagando el precio.\"",
                    hub: "Brunna entiende rapido la ciudad: contratos limpios, manos sucias y demasiada gente obedeciendo sellos sin preguntar que mueven realmente esos carros.",
                    pozo: "Brunna baja al Pozo con una furia mas fria que ruidosa. No le impresiona el mecanismo ni el miedo del lugar: le ofende que alguien haya montado algo asi debajo de una ciudad que pretende llamarse civilizada."
                },
                kael: {
                    arrival: "Kael tarda menos de un minuto en olerle el negocio al puerto. \"Medoran no tapa sus pecados\", murmura. \"Solo les pone uniforme, recibo y gente educada delante.\"",
                    hub: "Kael ya separo a los estibadores reales de los cobradores, a los cobradores de los soplones y a los soplones de los que cobran por mirar para otro lado. Para el, Medoran es casi un idioma conocido.",
                    pozo: "Kael baja al Pozo con los ojos encendidos, no por valentia sino por oficio. Donde otros ven una camara de horror, el ve cadena de suministro, rutina y puntos de quiebre."
                }
            },
            wounded: {
                arannis: {
                    hub: "Arannis sigue el rastro igual, aunque ahora mide cada escalon como si el cuerpo le cobrara peaje por cada error. Lo que antes era soltura ahora es voluntad pura.",
                    pozo: "Arannis llega al Pozo con el gesto endurecido por la herida. Sigue siendo util, pero ya no se mueve como alguien que pueda regalar una sola decision."
                },
                brunna: {
                    hub: "Brunna sigue al frente, aunque el costado le recuerda a cada rato que el siguiente golpe mal dado puede cobrarle caro hasta a ella.",
                    pozo: "Brunna baja herida y lo sabe. Eso no la vuelve mas cauta: la vuelve mucho menos paciente."
                },
                kael: {
                    hub: "Kael sigue funcionando, pero la herida ya le saco margen para lucirse. Ahora juega mas corto, mas sucio y bastante mas rapido.",
                    pozo: "Kael entra al Pozo con menos aire del que finge tener. Aun asi, sigue viendo grietas donde otros solo ven guardias."
                }
            },
            fallen: {
                arannis: {
                    hub: "Arannis ya no puede ayudarte a moverte por Medoran. La ciudad se siente mas opaca sin sus ojos leyendo rastros por debajo del ruido.",
                    pozo: "Arannis no llega en pie hasta el Pozo. La bajada se siente peor por eso."
                },
                brunna: {
                    hub: "Brunna ya no puede sostener este tramo. Sin ella, cada puerta cerrada en Medoran parece un poco mas insolente.",
                    pozo: "Brunna no baja contigo al Pozo. Donde antes habria martillo y presencia, ahora solo hay trabajo pendiente."
                },
                kael: {
                    hub: "Kael quedo fuera de juego, y Medoran castiga mucho mas cuando falta alguien que entienda sus rincones sucios.",
                    pozo: "Kael no llega hasta el Pozo. Sin el, cada sello y cada cerradura te cuestan un poco mas."
                }
            },
            perish: {
                arannis: {
                    hub: "Arannis ya no esta. Medoran no cambia por eso, pero vos si: ahora cada pista pesa mas porque falta una voz que sabia leer donde otros apenas miraban.",
                    pozo: "Arannis no baja al Pozo. La sombra de esa perdida se siente incluso entre cadenas y agua negra."
                },
                brunna: {
                    hub: "Brunna ya no esta para plantarse entre vos y el primer cobarde con sello. La ciudad parece aun mas soberbia desde esa ausencia.",
                    pozo: "Brunna no llega al Pozo. El hueco de su perdida vuelve todo esto mucho menos perdonable."
                },
                kael: {
                    hub: "Kael ya no esta para abrirte los huecos del puerto. Medoran sigue llena de atajos; simplemente ya no cuentas con el mejor ojo para encontrarlos.",
                    pozo: "Kael no ve el Pozo. Lo que encuentras ahi abajo ya no puede compartirse con quien habria entendido mejor que nadie el negocio entero."
                }
            }
        };
        const bucket = byState[condition] || byState.ready;
        return bucket?.[companion.id]?.[key] || "";
    }

    function buildPozoLoot(state, enhanced) {
        const items = [
            "Llave de cadena consular",
            "Clavo ritual ennegrecido",
            "Medallon de peaje del Pozo"
        ];
        if (state.flags.dd_act2_record_priority) items.push("Libro de peajes manchado de sal negra");
        if (state.flags.dd_act2_rescue_priority) items.push("Placa arrancada de un grillete de traslado");
        if (enhanced) items.push("Anillo de sello del capataz del Pozo");
        return items;
    }

    function buildAct2PitCombat(state, variant) {
        const companion = buildCompanionCombatant(state);
        const stealthEdge = !!(state.flags.dd_act2_entry_stealth || state.flags.dd_act2_entry_papers || state.flags.dd_act2_entry_forge || state.flags.dd_act2_entry_clean || state.flags.dd_act2_final_edge);
        const alert = !!state.flags.dd_act2_guardia_alertada;
        const late = isAct2Late(state);
        const enemies = [
            {
                id: "larok",
                name: "Larok del Pozo",
                ac: variant === "companion" || stealthEdge ? "16" : "17",
                hp: variant === "companion" || stealthEdge ? "18" : "22",
                maxHp: variant === "companion" || stealthEdge ? "18" : "22",
                attackBonus: "+6",
                damage: "1d10+4",
                morale: "fight",
                targetWeight: 1.7
            },
            {
                id: "cadenero",
                name: "Cadenero Consular",
                ac: "15",
                hp: stealthEdge ? "11" : "14",
                maxHp: stealthEdge ? "11" : "14",
                attackBonus: "+4",
                damage: "1d8+2",
                morale: "fight",
                targetWeight: 1.25
            },
            {
                id: "adepta",
                name: "Adepta del Sello",
                ac: "13",
                hp: variant === "companion" ? "8" : "10",
                maxHp: variant === "companion" ? "8" : "10",
                attackBonus: "+4",
                damage: "1d6+2",
                morale: "flee25",
                fleeOutcome: "failure",
                targetWeight: 0.9
            }
        ];
        if (alert || late) {
            enemies.push({
                id: "vigia",
                name: "Vigia de hierro",
                ac: "14",
                hp: "9",
                maxHp: "9",
                attackBonus: "+3",
                damage: "1d6+1",
                morale: "fight",
                targetWeight: 0.8
            });
        }
        return {
            enemies,
            allies: companion ? [companion] : []
        };
    }

    function buildAct2ChaseChoice(state) {
        const companion = getChosenCompanion(state);
        const companionReady = canChosenCompanionAct(state);
        const choices = [
            {
                label: "Perseguir a Nereza Pell y el estuche negro",
                desc: "Si esa escriba sale del Pozo con lo que lleva bajo el brazo, la mitad del trabajo se escurre con ella.",
                check: { type: "ability", target: "DEX", dc: state.flags.dd_act2_final_edge ? 13 : 15, label: "Destreza" },
                success: {
                    next: "dd_act2_cierre",
                    text: "La alcanzas donde el conducto vuelve a dividirse. Nereza intenta negociar primero, mentir despues y correr por tercera vez, pero ya no le alcanza. El estuche cede, y dentro hay piedra antigua, notas de traslado y una ruta escrita hacia Lethariel con demasiada seguridad como para ser un ensayo.",
                    effects: {
                        setFlags: ["dd_act2_talisman_fragment", "dd_act2_nereza_captured", "dd_act2_route_lethariel"],
                        adjustMetrics: { pistasTalisman: 2, reputacionMedoran: 1 },
                        addItems: ["Fragmento del talisman de Ilyr-Vael", "Cuaderno lacrado de Nereza Pell", "Llave fina de drenaje"],
                        advanceTime: 1
                    }
                },
                failure: {
                    next: "dd_act2_cierre",
                    text: "No llegas a cerrarle del todo el paso. Nereza desaparece por un conducto lateral, pero no tan limpia como queria: deja atras hojas rotas, una ruta incompleta y la certeza de que Lethariel ya no es una suposicion vaga sino el siguiente punto real del mapa.",
                    effects: {
                        setFlags: ["dd_act2_nereza_escaped", "dd_act2_route_lethariel"],
                        adjustMetrics: { influenciaVael: 1, pistasTalisman: 1 },
                        addItems: ["Media hoja del cuaderno de Nereza", "Hebilla de estuche lacrado"],
                        advanceTime: 1
                    }
                }
            },
            {
                label: "Quedarte con los cautivos y cerrar el Pozo",
                desc: "Perseguir a la escriba puede esperar menos que unas cadenas a medio abrir.",
                next: "dd_act2_cierre",
                effects: {
                    setFlags: ["dd_act2_captives_secured", "dd_act2_nereza_escaped", "dd_act2_route_lethariel"],
                    adjustMetrics: { reputacionMedoran: 2, pistasTalisman: 1 },
                    addItems: ["Registro de salida del Pozo", "Sello de compuerta de cuarentena"],
                    advanceTime: 1,
                    journal: "Priorizas sacar gente viva y apagar el mecanismo del Pozo antes de lanzarte a una persecucion ciega por los drenajes de Medoran."
                }
            }
        ];
        if (companion && companionReady) {
            const byCompanion = {
                arannis: {
                    label: "Dejar que Arannis te lea la fuga por ruido y corriente",
                    desc: "Arannis no corre detras de pasos: corre detras de patrones.",
                    check: { type: "skill", target: "Survival", dc: 13, label: "Survival" },
                    successText: "Arannis adivina la salida correcta por una corriente de aire y una salpicadura fuera de tiempo. La cortas dos giros antes de que Nereza crea estar a salvo, y el estuche negro termina en tus manos junto con un mapa mucho mas completo.",
                    failureText: "Arannis sigue el rastro correcto al principio, pero Nereza sacrifica peso y velocidad para ganar una esquina mas. Aun asi, deja atras suficiente informacion como para que Lethariel ya no pueda esconderse del todo."
                },
                brunna: {
                    label: "Dejar que Brunna te abra paso a puro golpe por la galeria lateral",
                    desc: "No siempre se persigue mejor por la ruta fina.",
                    check: { type: "ability", target: "STR", dc: 13, label: "Fuerza" },
                    successText: "Brunna parte la reja de mantenimiento antes de que el candado termine de existir como problema. Ese atajo brutal pero eficaz le corta la fuga a Nereza y te deja encima del estuche antes de que pueda tirarlo al agua negra.",
                    failureText: "Brunna abre el paso, pero un segundo tarde. Nereza se te va por un drenaje mas estrecho de lo que esperabas, aunque no sin dejar rastros y papeles arrancados atras."
                },
                kael: {
                    label: "Dejar que Kael piense como Nereza y le cierre la salida buena",
                    desc: "Kael entiende demasiado bien que hace alguien que huye con algo que vale mas que su vida.",
                    check: { type: "skill", target: "Bluff", dc: 12, label: "Bluff" },
                    successText: "Kael no corre detras de la escriba: corre hacia el lugar donde el pisaria si llevara un estuche asi. Le acierta de lleno. Nereza intenta venderte una mentira justo antes de descubrir que ya le cerraron la unica salida limpia.",
                    failureText: "Kael adivina la logica, pero Nereza sacrifica una ruta segura por una mas sucia y mas rapida. Se va, aunque demasiado apurada como para proteger todo lo que llevaba."
                }
            };
            const extra = byCompanion[companion.id];
            if (extra) {
                choices.unshift({
                    label: extra.label,
                    desc: extra.desc,
                    check: extra.check,
                    success: {
                        next: "dd_act2_cierre",
                        text: extra.successText,
                        effects: {
                            setFlags: ["dd_act2_talisman_fragment", "dd_act2_nereza_captured", "dd_act2_route_lethariel"],
                            adjustMetrics: { pistasTalisman: 2, reputacionMedoran: 1 },
                            addItems: ["Fragmento del talisman de Ilyr-Vael", "Cuaderno lacrado de Nereza Pell", "Marca de ruta a Lethariel"],
                            advanceTime: 1
                        }
                    },
                    failure: {
                        next: "dd_act2_cierre",
                        text: extra.failureText,
                        effects: {
                            setFlags: ["dd_act2_nereza_escaped", "dd_act2_route_lethariel"],
                            adjustMetrics: { influenciaVael: 1, pistasTalisman: 1 },
                            addItems: ["Media hoja del cuaderno de Nereza"],
                            advanceTime: 1
                        }
                    }
                });
            }
        }
        return choices;
    }

    Object.assign(campaign.scenes, {
        dd_act2_arribo_medoran: {
            title: "Arribo a Medoran",
            location: "Bajo puerto de Medoran",
            objective: "Entrar en Medoran, reunir al menos dos pistas firmes y encontrar el Pozo antes de que el siguiente traslado desaparezca.",
            text: state => [
                "Medoran se levanta desde el agua por terrazas. Abajo, el puerto huele a brea, sal vieja y cuerda mojada; arriba, las fachadas blancas y los bronces consulares hacen como si la ciudad perteneciera a otra clase de mundo. Cuanto mas alto mira uno, mas limpio parece todo. Cuanto mas bajo pisa, mas rapido entiende quien paga esa limpieza.",
                "El viaje desde Iareth no te trajo descanso verdadero, solo distancia. Los nombres que arrancaste en Caer Vorn siguen ahi, ardiendo por debajo del cansancio: Halren, Medoran, Altiplano, Pozo. Los cautivos que lograste sacar apenas se sostienen, y sus testimonios apuntan a carros nocturnos, patios cerrados y hombres educados que no se ensucian las manos pero si firman los papeles.",
                getAct2CompanionLine(state, "arrival") || "Medoran no ruge como una fortaleza ni se esconde como una ruina. Te recibe con el peor tipo de amenaza: la que funciona a plena luz y con sello oficial."
            ],
            choices: [
                {
                    label: "Entrar por el Barrio Bajo y seguir el rastro antes del proximo traslado",
                    desc: "Si la red consular todavia mueve gente, lo hace con horarios. Cuanto antes los leas, mejor.",
                    next: "dd_act2_hub_barrio_bajo",
                    effects: {
                        setFlags: ["dd_act2_medoran_arrival"],
                        objective: "Conseguir al menos dos pistas convergentes sobre el Pozo y la mano que lo financia.",
                        journal: "Llegas a Medoran con pruebas reales y muy poco margen. La ciudad es demasiado grande para peinarla entera, asi que toca seguir la carga, los sellos y a quien le molestan las preguntas correctas."
                    }
                }
            ]
        },

        dd_act2_hub_barrio_bajo: {
            title: "Barrio Bajo",
            location: "Muelle de carga y calles de peaje",
            objective: "Conseguir al menos dos pistas convergentes sobre el Pozo y la mano que lo financia.",
            text: state => {
                const clues = getAct2ClueCount(state);
                const lines = [];
                lines.push("El Barrio Bajo de Medoran vive entre compuertas, carros y oficinas donde el papel vale mas que un hombre si lleva el sello correcto. Todo pasa por algun control: peaje, cuarentena, almacen, registro. Eso no vuelve mas puro el negocio; solo lo vuelve mas dificil de seguir sin que te vean.");
                if (clues <= 0) {
                    lines.push("Todavia no tienes mas que nombres, piezas y mala intuicion. Pero ya se repite un rumor entre descargadores y mozos de muelle: antes del siguiente amanecer, algo vuelve a moverse por debajo del consulado de cuarentenas.");
                } else if (clues === 1) {
                    lines.push("Una de las capas ya empezo a caerse. Ahora sabes que no se trata de una sola cuadrilla sino de una ruta armada: carros sin manifiesto limpio, sellos que vuelven a aparecer y un sitio subterraneo que nadie nombra entero dos veces.");
                } else {
                    lines.push("Las pistas ya convergen. Los nombres no coinciden del todo, pero apuntan al mismo subsuelo: una vieja cisterna reconvertida, oficinas falsas arriba y cadenas reales abajo. Ya no se trata de encontrar el Pozo sino de decidir como entrar y que estas dispuesto a perder por el camino.");
                }
                if (isAct2Late(state)) {
                    lines.push("Cada tramo extra se nota. Hay mas guardias donde antes habia cobradores, mas papeles quemados y menos gente dispuesta a mirar de frente. Alguien en la red ya empezo a sentir que la presion se viene encima.");
                }
                lines.push(getAct2CompanionLine(state, "hub") || "Medoran te obliga a pensar en capas: quien mueve, quien firma, quien cobra y quien desaparece cuando llega el momento de responder.");
                return lines;
            },
            choices: [
                {
                    label: "Seguir los peajes nocturnos de los muelles cubiertos",
                    desc: "Los carros que no quieren verse casi siempre quieren moverse con mala luz.",
                    next: "dd_act2_muelles_cubiertos",
                    requires: {
                        notFlags: ["dd_act2_muelles_done"],
                        timeAny: ["atardecer", "noche", "alba"]
                    }
                },
                {
                    label: "Revisar el archivo gris de cargas y cuarentenas",
                    desc: "Si alguien lava este negocio en papel, tiene que dejar un patron.",
                    next: "dd_act2_archivo_gris",
                    requires: {
                        notFlags: ["dd_act2_archivo_done"],
                        timeAny: ["alba", "dia"]
                    }
                },
                {
                    label: "Buscar a Fuego y Hierro en los patios de cadena",
                    desc: "Alguien forjo rejas, grilletes y compuertas para este sistema. Eso deja memoria en las manos correctas.",
                    next: "dd_act2_patios_cadena",
                    requires: {
                        notFlags: ["dd_act2_forge_done"],
                        timeAny: ["alba", "dia", "atardecer"]
                    }
                },
                {
                    label: "Bajar al Pozo antes de que vuelvan a mover la carga",
                    desc: "Las pistas ya alcanzan. Lo que falta ahora es entrar, romper el mecanismo y salir con algo que no puedan negar.",
                    next: "dd_act2_umbral_pozo",
                    requires: {
                        metricMin: { act2Clues: 2 }
                    }
                },
                {
                    label: "Atender heridas y reordenar equipo en la pension del Ancla Ciega",
                    desc: "No es un descanso limpio, pero si unas horas para volver a respirar.",
                    next: "dd_act2_hub_barrio_bajo",
                    effects: {
                        rest: "field",
                        advanceTime: 1,
                        journal: "Te tomas unas horas en la pension del Ancla Ciega para limpiar sangre, vendar lo urgente y ordenar cabeza y equipo antes de seguir."
                    }
                },
                {
                    label: "Cerrar la jornada y descansar una noche completa",
                    desc: "Recuperas fuerzas, pero la ciudad no se queda quieta mientras duermes.",
                    next: "dd_act2_hub_barrio_bajo",
                    effects: {
                        rest: "long",
                        advanceDays: 1,
                        nextTimeIndex: 0,
                        adjustMetrics: { influenciaVael: 1, cultoMuerte: 1 },
                        journal: "Decides pasar la noche entera fuera de la calle. Descansar ayuda, pero tambien le regala a la red un dia mas para cerrar puertas, mover papeles o vaciar media ruta."
                    }
                }
            ]
        },

        dd_act2_muelles_cubiertos: {
            title: "Muelles cubiertos",
            location: "Pasarelas de brea y lona",
            text: state => [
                "Los muelles cubiertos estan hechos para proteger mercancia del agua y de los ojos. Lonas alquitranadas cuelgan entre vigas viejas, las gruas tapan media linea de vision y los carros entran y salen con campanas amortiguadas para que el ruido grande del puerto se coma el detalle importante.",
                "No todo lo que se mueve aca es ilegal. Justamente por eso funciona tan bien esconder lo peor entre carga legitima. Un carro de sal, otro de hierro, un tercero de telas pesadas, y de repente una compuerta que nunca deberia estar abierta a esa hora.",
                getAct2CompanionLine(state, "hub") || "Si el Pozo se alimenta desde la ciudad, alguna vena entra por aqui."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const companionReady = canChosenCompanionAct(state);
                const choices = [
                    {
                        label: "Seguir el convoy entre lonas y pescantes",
                        desc: "Pegarte a la sombra del muelle puede darte la ruta exacta.",
                        check: { type: "skill", target: "Move Silently", dc: 13, label: "Move Silently" },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Te pegas al convoy lo suficiente como para ver lo que importaba: un giro falso hacia un almacen vacio, una compuerta baja y un sello de cuarentena usado como coartada en vez de control. La ruta no termina en el muelle. Se hunde debajo.",
                            effects: {
                                setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route"],
                                adjustMetrics: { act2Clues: 1 },
                                addItems: ["Ficha de peaje ennegrecida", "Gancho de amarre con marca de cuarentena"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Casi te ven antes de tiempo, pero el error igual sirve: un grito, una compuerta que se cierra de golpe y un carro desviado a toda prisa te senalan la direccion correcta. Salis con la ruta, aunque pagando el aprendizaje con sangre y barro.",
                            effects: {
                                setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route", "dd_act2_guardia_alertada"],
                                adjustMetrics: { act2Clues: 1, influenciaVael: 1 },
                                addItems: ["Gancho de amarre con marca de cuarentena"],
                                damage: 2,
                                advanceTime: 1
                            }
                        }
                    },
                    {
                        label: "Voltear al factor del muelle y sacarle el recorrido a golpes",
                        desc: "No es elegante, pero un capataz asustado suele recordar mejor.",
                        check: { type: "attack", dc: 14, label: "Ataque principal" },
                        combat: {
                            enemies: [
                                { id: "rusk", name: "Rusk Vane, factor de muelle", ac: "14", hp: "15", maxHp: "15", attackBonus: "+4", damage: "1d8+2", morale: "flee25", fleeOutcome: "failure" },
                                { id: "estiba", name: "Estibador de cadena", ac: "12", hp: "9", maxHp: "9", attackBonus: "+3", damage: "1d6+1", morale: "fight" }
                            ],
                            allies: buildCompanionCombatant(state) ? [buildCompanionCombatant(state)] : []
                        },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Rusk se rompe antes de hacerse heroe. Entre el golpe y el miedo suelta la verdad util: la carga sin manifiesto baja por una compuerta secundaria y desaparece hacia una cisterna vieja que ya no figura en planos publicos.",
                            effects: {
                                setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route"],
                                adjustMetrics: { act2Clues: 1 },
                                addItems: ["Silbato de capataz", "Talon de peaje tachado", "Llave de compuerta oxidada"],
                                addCurrency: 2,
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "No controlas limpio la pelea, pero el muelle igual se desordena lo suficiente como para regalarte lo esencial: de donde sale el carro correcto y por que compuerta deja de estar a la vista.",
                            effects: {
                                setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route", "dd_act2_guardia_alertada"],
                                adjustMetrics: { act2Clues: 1, influenciaVael: 1 },
                                addItems: ["Talon de peaje tachado"],
                                damage: 3,
                                advanceTime: 1
                            }
                        }
                    }
                ];

                if (companion && companionReady) {
                    const extraByCompanion = {
                        arannis: {
                            label: "Dejar que Arannis lea rodadas, mareas y lodo de descarga",
                            desc: "Arannis entiende que carro miente con solo ver donde piso y donde no.",
                            check: { type: "skill", target: "Survival", dc: 12, label: "Survival" },
                            successText: "Arannis te lleva por donde no pisaria nadie sin haber mirado primero. Rodadas, salpicaduras y peso mal repartido le cantan la ruta entera. Cuando termina, el Pozo ya no es un rumor: es una direccion.",
                            failureText: "Arannis no reconstruye todo el trayecto, pero si lo suficiente como para distinguir el carro correcto del resto y seguir el hilo hasta su compuerta real."
                        },
                        brunna: {
                            label: "Dejar que Brunna apriete a los descargadores correctos",
                            desc: "Algunos hombres obedecen mejor a la verdad cuando viene envuelta en acero.",
                            check: { type: "skill", target: "Intimidate", dc: 12, label: "Intimidate" },
                            successText: "Brunna no necesita gritar demasiado. Dos preguntas, un empujon al carro indicado y un descargador palido bastan para que la version util aparezca entera, con compuerta, horario y hombre a cargo.",
                            failureText: "El miedo no suelta una confesion limpia, pero si un gesto torpe y una mirada hacia la compuerta equivocada. Te alcanza para reconstruir la verdad despues."
                        },
                        kael: {
                            label: "Dejar que Kael entre como cobrador tarde de una cuenta falsa",
                            desc: "Kael sabe fingir que pertenece justo al tipo de lugar que nadie mira dos veces.",
                            check: { type: "skill", target: "Bluff", dc: 12, label: "Bluff" },
                            successText: "Kael se mete en la rutina del muelle como si siempre hubiera cobrado ahi. Sale con una ficha negra, un nombre medio borrado y algo mejor que una sospecha: la logica completa del recorrido.",
                            failureText: "La mentira no aguanta intacta, pero si lo bastante como para que Kael vea el sello correcto, el carro correcto y la direccion que intentaron taparle."
                        }
                    };
                    const extra = extraByCompanion[companion.id];
                    if (extra) {
                        choices.unshift({
                            label: extra.label,
                            desc: extra.desc,
                            check: extra.check,
                            success: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.successText,
                                effects: {
                                    setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route", "dd_act2_final_edge"],
                                    adjustMetrics: { act2Clues: 1 },
                                    addItems: ["Marca de ruta del muelle", "Ficha de peaje ennegrecida"],
                                    advanceTime: 1
                                }
                            },
                            failure: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.failureText,
                                effects: {
                                    setFlags: ["dd_act2_muelles_done", "dd_act2_pier_route"],
                                    adjustMetrics: { act2Clues: 1 },
                                    advanceTime: 1
                                }
                            }
                        });
                    }
                }

                return choices;
            }
        },

        dd_act2_archivo_gris: {
            title: "Archivo gris",
            location: "Oficinas de peaje y cuarentena",
            text: state => [
                "El archivo gris ocupa la parte mas fea del edificio de peajes: piedra humeda, ventanas angostas y mesas donde el polvo se mezcla con cera de sello. Huele a tinta, cuerda mojada y resignacion administrativa. Es el tipo de lugar donde un crimen puede vivir anos si alguien lo aprende a registrar con palabras correctas.",
                "A simple vista todo parece legitimo: cobros, decomisos, faltantes, cargas demoradas por contagio, bultos sin abrir por orden consular. A segunda lectura aparece otra musica. Cantidades que no cierran. Barcos que descargan dos veces. Patios que figuran vacios justo cuando alguien recuerda haberlos visto trabajar de noche.",
                "En un anaquel del fondo hay libros que nadie consulta por voluntad propia. Justamente por eso suelen guardar lo que mas importa."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const companionReady = canChosenCompanionAct(state);
                const choices = [
                    {
                        label: "Peinar los libros de carga hasta encontrar la grieta",
                        desc: "Los papeles pueden mentir, pero rara vez todos mienten de la misma forma.",
                        check: { type: "skill", target: "Search", dc: 14, label: "Search" },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Encuentras el patron justo donde nadie esperaba que alguien tuviera paciencia para buscarlo: cuarentenas repetidas, compuertas anuladas solo en teoria y una inicial que vuelve a aparecer al margen de los asientos mas sucios. H.V. no dirige el barrio, pero claramente lo usa.",
                            effects: {
                                setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers", "dd_act2_halren_alias"],
                                adjustMetrics: { act2Clues: 1, pistasTalisman: 1 },
                                addItems: ["Hoja de peaje con margen azul", "Calco de sello H.V.", "Media planilla de cuarentena falsificada"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "No armas un cuadro perfecto, pero si uno suficiente: existe una cisterna anulada en papeles publicos que sigue recibiendo carga real bajo coberturas de cuarentena. Aunque los libros esten lavados, el lavado ya se nota.",
                            effects: {
                                setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers"],
                                adjustMetrics: { act2Clues: 1, influenciaVael: 1 },
                                addItems: ["Media planilla de cuarentena falsificada"],
                                advanceTime: 1
                            }
                        }
                    },
                    {
                        label: "Acorralar al escribiente de turno con las pruebas de Caer Vorn",
                        desc: "A veces el archivo se abre mas rapido por miedo que por metodo.",
                        requires: { flagsAny: ["dd_pruebas_medoran", "dd_halren_nombrado"] },
                        check: { type: "skill", target: "Intimidate", dc: 13, label: "Intimidate" },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "El escribiente aguanta dos preguntas. La tercera lo quiebra. No te entrega una declaracion heroica, pero si un nombre dicho casi en susurro, una escalera de servicio y la certeza de que la oficina de cuarentena no esta arriba del Pozo por accidente.",
                            effects: {
                                setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers", "dd_act2_halren_alias"],
                                adjustMetrics: { act2Clues: 1, reputacionMedoran: 1 },
                                addItems: ["Pase de escritorio del archivo", "Tira de inventario recortada"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "No cantan todo, pero si demasiado. Lo justo para que veas donde mienten al unisono, a quien protegen con iniciales y por que toda la ruta se pliega alrededor de un mismo subsuelo.",
                            effects: {
                                setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers"],
                                adjustMetrics: { act2Clues: 1, influenciaVael: 1 },
                                addItems: ["Tira de inventario recortada"],
                                advanceTime: 1
                            }
                        }
                    }
                ];

                if (companion && companionReady) {
                    const extraByCompanion = {
                        arannis: {
                            label: "Dejar que Arannis siga el margen que no parece humano del todo",
                            desc: "Algunas marcas no vienen de contabilidad sino de memoria vieja.",
                            check: { type: "skill", target: "Spot", dc: 12, label: "Spot" },
                            successText: "Arannis detecta en el margen de dos planillas una notacion heredada de escritura elfica administrativa, usada fuera de lugar y fuera de epoca. No explica el Pozo, pero si confirma algo peor: alguien esta conectando esta red con ruinas y nombres mucho mas antiguos.",
                            failureText: "Arannis no puede reconstruir la nota entera, pero si reconoce que el archivo huele a una mezcla rara de burocracia actual y referencia vieja, como si alguien estuviera usando lenguaje heredado para esconder otra cosa."
                        },
                        brunna: {
                            label: "Dejar que Brunna doblegue al oficial de archivo mas orgulloso",
                            desc: "Los papeles tiemblan mas rapido cuando tiembla quien los guarda.",
                            check: { type: "skill", target: "Intimidate", dc: 12, label: "Intimidate" },
                            successText: "Brunna parte la compostura del archivo antes que un escritorio. El oficial se encierra en tecnicismos primero y en confesiones despues, y de esa mezcla sale justo lo que necesitabas: nombre parcial, oficina falsa y bajada real.",
                            failureText: "Brunna no le saca una admision limpia, pero si la reaccion util. La manera en que protege cierto estante te alcanza para saber donde mirar despues."
                        },
                        kael: {
                            label: "Dejar que Kael limpie la llave correcta y abra el anaquel restringido",
                            desc: "Kael sabe que siempre existe un cajon que el archivo no admite en voz alta.",
                            check: { type: "skill", target: "Search", dc: 12, label: "Search" },
                            successText: "Kael no roba oro ni joyas: roba acceso. Una llave, un giro corto y un anaquel mal disimulado te regalan papeles que nadie pensaba revisar hoy, justamente los que atan cuarentena, peaje y compuerta a la misma mano.",
                            failureText: "Kael no abre el anaquel entero, pero si lo suficiente para ver el sello repetido y el patron de hojas arrancadas. A veces media prueba alcanza para encontrar la puerta completa."
                        }
                    };
                    const extra = extraByCompanion[companion.id];
                    if (extra) {
                        choices.unshift({
                            label: extra.label,
                            desc: extra.desc,
                            check: extra.check,
                            success: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.successText,
                                effects: {
                                    setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers", "dd_act2_halren_alias", "dd_act2_final_edge"],
                                    adjustMetrics: { act2Clues: 1, pistasTalisman: 1 },
                                    addItems: ["Hoja de peaje con margen azul", "Marca auxiliar del archivo"],
                                    advanceTime: 1
                                }
                            },
                            failure: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.failureText,
                                effects: {
                                    setFlags: ["dd_act2_archivo_done", "dd_act2_archive_ledgers"],
                                    adjustMetrics: { act2Clues: 1 },
                                    advanceTime: 1
                                }
                            }
                        });
                    }
                }

                return choices;
            }
        },

        dd_act2_patios_cadena: {
            title: "Patios de cadena",
            location: "Fuego y Hierro, sector de servicio",
            text: state => [
                "Los patios de cadena no son una forja ceremonial ni una sala noble. Son el intestino de Medoran: poleas, grilletes, placas, rejas, ruedas de elevacion y hombres que hablan mientras trabajan porque si dejan de hacerlo escuchan demasiado el metal.",
                "Fuego y Hierro no es inocente por defecto ni culpable por costumbre. Es una casa de negocio, y eso significa dos cosas: que alguien cobro por piezas del Pozo, y que alguien mas puede recordar exactamente cuales fueron si tiene motivo para hablar.",
                "Dagna Vor, capataza de turno, no te ofrece amistad. Te ofrece tiempo corto y una mirada de quien ya sospecha que le traes un problema caro."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const companionReady = canChosenCompanionAct(state);
                const choices = [
                    {
                        label: "Mostrar sellos y exigir trazabilidad de las piezas del Pozo",
                        desc: "Si la casa vendio algo, dejo registro en algun lado aunque sea para cobrar.",
                        check: { type: "skill", target: "Diplomacy", dc: 13, label: "Diplomacy" },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Dagna no sonrien jamas, pero tampoco miente cuando decide hablar. Reconoce el patron de las piezas, el pedido triangulado y el taller auxiliar que fabrico refuerzos para una cisterna vieja bajo cobertura de cuarentena. No te da amistad. Te da una bajada de servicio y la marca para que no te maten al verla entrar.",
                            effects: {
                                setFlags: ["dd_act2_forge_done", "dd_act2_forge_token"],
                                adjustMetrics: { act2Clues: 1, tensionMedoranFuegoHierro: 1, reputacionFuegoHierro: 1 },
                                addItems: ["Marca de servicio Fuego y Hierro", "Clavo templado con hollin gris"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Dagna no te abre la puerta de golpe, pero si te suelta lo bastante como para seguirla despues: el pedido existio, vino con blindaje consular y exigio piezas que ninguna bodega sanitaria deberia necesitar.",
                            effects: {
                                setFlags: ["dd_act2_forge_done", "dd_act2_forge_token"],
                                adjustMetrics: { act2Clues: 1, tensionMedoranFuegoHierro: 1 },
                                addItems: ["Clavo templado con hollin gris"],
                                advanceTime: 1
                            }
                        }
                    },
                    {
                        label: "Apagar a los saboteadores antes de que incendien el patio",
                        desc: "Si alguien quiere borrar rastros justo ahora, vale mas seguirlo de cerca que fingir que no importa.",
                        check: { type: "attack", dc: 15, label: "Ataque principal" },
                        combat: {
                            enemies: [
                                { id: "brasero", name: "Brasero marcado", ac: "15", hp: "14", maxHp: "14", attackBonus: "+4", damage: "1d8+2", morale: "fight" },
                                { id: "cadena", name: "Saboteador de cadena", ac: "13", hp: "10", maxHp: "10", attackBonus: "+3", damage: "1d6+1", morale: "flee25", fleeOutcome: "failure" }
                            ],
                            allies: buildCompanionCombatant(state) ? [buildCompanionCombatant(state)] : []
                        },
                        success: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "Los saboteadores caen antes de prender el patio entero, y entre herramientas tiradas, aceite derramado y una bolsa de marcas de servicio aparece lo que importaba de verdad: la conexion exacta entre Fuego y Hierro y la bajada usada por el Pozo.",
                            effects: {
                                setFlags: ["dd_act2_forge_done", "dd_act2_forge_token"],
                                adjustMetrics: { act2Clues: 1, reputacionFuegoHierro: 1 },
                                addItems: ["Marca de servicio Fuego y Hierro", "Bolsa de remaches negros", "Pase de patio auxiliar"],
                                addCurrency: 2,
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_hub_barrio_bajo",
                            text: "No controlas limpio el patio, pero si bastante como para que Dagna vea una cosa clara: alguien esta intentando borrar el mismo rastro que vos queres seguir. Eso basta para que te entregue la bajada y te saque del medio antes de que lleguen mas preguntas.",
                            effects: {
                                setFlags: ["dd_act2_forge_done", "dd_act2_forge_token", "dd_act2_guardia_alertada"],
                                adjustMetrics: { act2Clues: 1, tensionMedoranFuegoHierro: 1 },
                                addItems: ["Pase de patio auxiliar"],
                                damage: 3,
                                advanceTime: 1
                            }
                        }
                    }
                ];

                if (companion && companionReady) {
                    const extraByCompanion = {
                        arannis: {
                            label: "Dejar que Arannis lea el hollin y el agua negra en las piezas",
                            desc: "Arannis no necesita entender la forja entera para entender de donde volvieron esas cadenas.",
                            check: { type: "skill", target: "Spot", dc: 12, label: "Spot" },
                            successText: "Arannis encuentra en las piezas usadas el detalle que nadie habia querido nombrar: sal negra pegada donde deberia haber solo oxido y agua de cisterna. No es poesia; es geografia. La ruta baja, y baja por un sitio vivo todavia.",
                            failureText: "Arannis no lee todo el recorrido, pero si la prueba material que faltaba: esas piezas volvieron de un subsuelo mojado, profundo y operativo. El Pozo respira."
                        },
                        brunna: {
                            label: "Dejar que Brunna se gane a Dagna desde el oficio, no desde la politica",
                            desc: "Hay puertas que en un patio se abren mejor con vocabulario de herramienta.",
                            check: { type: "ability", target: "STR", dc: 12, label: "Fuerza" },
                            successText: "Brunna no sermonea: endereza una rueda atascada con el gesto seco de quien sabe exactamente cuanto debe ceder el metal. Dagna la mira, entiende y deja de tratarte como visita. Cuando habla, ya habla en serio.",
                            failureText: "Brunna no compra la confianza completa, pero si el respeto minimo que necesitabas para dejar de ser un problema ajeno y convertirte en alguien al que vale la pena responder."
                        },
                        kael: {
                            label: "Dejar que Kael huela la coima dentro del patio",
                            desc: "Si hubo triangulacion, hubo bolsillo intermedio.",
                            check: { type: "skill", target: "Search", dc: 12, label: "Search" },
                            successText: "Kael pesca la costura donde no cerraba una cuenta menor y de ahi tira del hilo entero: pagos dobles, piezas cambiadas de nombre y un pase de servicio reservado para un subsuelo que oficialmente no existe.",
                            failureText: "Kael no encuentra la bolsa exacta, pero si el vacio correcto en la contabilidad. A veces un agujero vale mas que una moneda."
                        }
                    };
                    const extra = extraByCompanion[companion.id];
                    if (extra) {
                        choices.unshift({
                            label: extra.label,
                            desc: extra.desc,
                            check: extra.check,
                            success: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.successText,
                                effects: {
                                    setFlags: ["dd_act2_forge_done", "dd_act2_forge_token", "dd_act2_final_edge"],
                                    adjustMetrics: { act2Clues: 1, reputacionFuegoHierro: 1 },
                                    addItems: ["Marca de servicio Fuego y Hierro", "Pase de patio auxiliar"],
                                    advanceTime: 1
                                }
                            },
                            failure: {
                                next: "dd_act2_hub_barrio_bajo",
                                text: extra.failureText,
                                effects: {
                                    setFlags: ["dd_act2_forge_done", "dd_act2_forge_token"],
                                    adjustMetrics: { act2Clues: 1 },
                                    advanceTime: 1
                                }
                            }
                        });
                    }
                }

                return choices;
            }
        },

        dd_act2_umbral_pozo: {
            title: "Umbral del Pozo",
            location: "Compuertas bajo el consulado de cuarentenas",
            objective: "Entrar al Pozo, romper la cadena de traslado y salir con cautivos, pruebas o ambas cosas.",
            text: state => {
                const lines = [];
                lines.push("Las tres rutas no coinciden en lenguaje, pero si en destino. Debajo del consulado de cuarentenas duerme una cisterna vieja reconvertida en algo mucho peor: un espacio de retencion, clasificacion y envio donde la ciudad esconde gente con la misma prolijidad con la que esconde mercaderia comprometida.");
                lines.push("Arriba siguen sonando campanas, carros y oficina. Abajo esperan agua negra, hierro de servicio, escalas humedas y hombres que confian demasiado en que nadie va a bajar hasta ellos por voluntad propia.");
                if (isAct2Late(state)) {
                    lines.push("Llegas tarde para el ideal pero no demasiado tarde para el trabajo. Se nota que algo ya fue movido o preparado: mas vigias, menos descuido y un silencio mecanico que no es de lugar abandonado sino de maquinaria lista.");
                }
                lines.push(getAct2CompanionLine(state, "pozo") || "Ya no quedan demasiadas capas entre vos y el mecanismo real de Medoran.");
                return lines;
            },
            choices: state => {
                const companion = getChosenCompanion(state);
                const companionReady = canChosenCompanionAct(state);
                const choices = [];

                if (state.flags.dd_act2_pier_route) {
                    choices.push({
                        label: "Entrar por la pasarela de descarga inundada",
                        desc: "La ruta del muelle te mete por abajo y por su lado menos noble.",
                        check: { type: "skill", target: "Move Silently", dc: 14, label: "Move Silently" },
                        success: {
                            next: "dd_act2_camara_entrada",
                            text: "Te deslizas por la pasarela humeda con el agua golpeando abajo y hierro oxidado a la altura de la cara. No es comodo, pero sirve: entras por donde la mercaderia baja, no por donde los hombres patrullan.",
                            effects: {
                                setFlags: ["dd_act2_entry_stealth", "dd_act2_final_edge"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_camara_entrada",
                            text: "La pasarela canta mas de lo que deberia y alguien llega a mirar. No pierdes la entrada, pero si la limpieza: ahora abajo saben que algo se les vino por un costado.",
                            effects: {
                                setFlags: ["dd_act2_entry_stealth", "dd_act2_guardia_alertada"],
                                damage: 2,
                                advanceTime: 1
                            }
                        }
                    });
                }

                if (state.flags.dd_act2_archive_ledgers) {
                    choices.push({
                        label: "Abrir la compuerta con papeles de inspeccion y sello prestado",
                        desc: "Si la red vive de burocracia, tambien puede ahogarse en una mentira bien vestida.",
                        check: { type: "skill", target: "Bluff", dc: 14, label: "Bluff" },
                        success: {
                            next: "dd_act2_camara_entrada",
                            text: "Entras por la ruta mas insolente de todas: la oficial. Un sello, dos palabras correctas y la costumbre humana de obedecer el papel antes que el instinto te abren una puerta que nadie esperaba ver cuestionada.",
                            effects: {
                                setFlags: ["dd_act2_entry_papers", "dd_act2_final_edge"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_camara_entrada",
                            text: "La mentira no aguanta todo el peso, pero aguanta lo bastante como para abrirte la compuerta antes del grito. Bajas con margen corto y demasiados ojos ya medio despiertos.",
                            effects: {
                                setFlags: ["dd_act2_entry_papers", "dd_act2_guardia_alertada"],
                                advanceTime: 1
                            }
                        }
                    });
                }

                if (state.flags.dd_act2_forge_token) {
                    choices.push({
                        label: "Bajar por el conducto de servicio con marca de forja",
                        desc: "Fuego y Hierro ya te dio el tipo de acceso que no aparece en planos publicos.",
                        check: { type: "ability", target: "STR", dc: 12, label: "Fuerza" },
                        success: {
                            next: "dd_act2_camara_entrada",
                            text: "La rueda de servicio cede justo donde Dagna prometio que cederia. Bajas entre cadenas, guias de hierro y polvo viejo, entrando por un lugar que el Pozo considera propio y por eso mismo casi nunca vigila bien.",
                            effects: {
                                setFlags: ["dd_act2_entry_forge", "dd_act2_final_edge"],
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_camara_entrada",
                            text: "La rueda no baja fino y te arranca ruido donde querias silencio, pero igual te deja adentro. El acceso funciona; lo que pierde es elegancia.",
                            effects: {
                                setFlags: ["dd_act2_entry_forge", "dd_act2_guardia_alertada"],
                                damage: 2,
                                advanceTime: 1
                            }
                        }
                    });
                }

                if (companion && companionReady && getAct2ClueCount(state) >= 3) {
                    const extraByCompanion = {
                        arannis: {
                            label: "Dejar que Arannis combine rutas y te meta por el angulo muerto real",
                            desc: "Con tres pistas distintas, Arannis ya no sigue un rastro: construye una geometria.",
                            check: { type: "skill", target: "Survival", dc: 13, label: "Survival" },
                            successText: "Arannis junta agua, pasos y planos mentidos hasta encontrar el angulo que el Pozo cree seguro. Bajas por donde nadie pisaria sin haber entendido la estructura entera primero.",
                            failureText: "Arannis no clava el angulo perfecto, pero igual evita la peor ruta. El precio es entrar apretado y con menos aire, no quedarte afuera."
                        },
                        brunna: {
                            label: "Dejar que Brunna rompa el punto exacto y te abra una bajada corta",
                            desc: "Brunna no quiere una puerta. Quiere el lugar donde la piedra ya esta cansada.",
                            check: { type: "ability", target: "STR", dc: 13, label: "Fuerza" },
                            successText: "Brunna encuentra la union enferma entre soporte y pared y la revienta con una precision inesperada para tanta violencia. Lo que se abre no es solo un hueco: es una entrada que el Pozo no contaba tener que defender.",
                            failureText: "Brunna abre igual, pero con mas ruido del deseable. La bajada corta existe; la sorpresa completa, no."
                        },
                        kael: {
                            label: "Dejar que Kael use media verdad, media rutina y media sonrisa",
                            desc: "Kael sabe que tres pistas juntas tambien sirven para contar una mentira mucho mejor.",
                            check: { type: "skill", target: "Bluff", dc: 13, label: "Bluff" },
                            successText: "Kael mezcla lenguaje de patio, sello viejo y prisa administrativa hasta sonar exactamente como alguien que deberia estar ahi. No abre una puerta: abre costumbre.",
                            failureText: "Kael no compra la rutina entera, pero si la vacilacion justa. Te alcanza para bajar antes de que la duda termine de transformarse en alarma."
                        }
                    };
                    const extra = extraByCompanion[companion.id];
                    if (extra) {
                        choices.unshift({
                            label: extra.label,
                            desc: extra.desc,
                            check: extra.check,
                            success: {
                                next: "dd_act2_camara_entrada",
                                text: extra.successText,
                                effects: {
                                    setFlags: ["dd_act2_entry_clean", "dd_act2_final_edge"],
                                    advanceTime: 1
                                }
                            },
                            failure: {
                                next: "dd_act2_camara_entrada",
                                text: extra.failureText,
                                effects: {
                                    setFlags: ["dd_act2_entry_clean", "dd_act2_guardia_alertada"],
                                    advanceTime: 1
                                }
                            }
                        });
                    }
                }

                return choices;
            }
        },

        dd_act2_camara_entrada: {
            title: "La camara del Pozo",
            location: "Pozo de Almas",
            objective: "Romper la cadena de traslado del Pozo y decidir que salvar primero cuando todo se desordene.",
            text: state => [
                "El Pozo no es una cueva ceremonial ni una mazmorra vieja reciclada a las apuradas. Es una instalacion funcional. Una cisterna profunda con plataformas de hierro, ruedas de cadena, mesas de inventario, compuertas de agua y jaulas suspendidas que suben o bajan segun la carga. Justamente por eso da mas asco: alguien penso esto con calma.",
                "Hay cautivos vivos en espera, otros ya marcados con yeso oscuro en antebrazo y nuca, y hombres ocupados en registrar, mover o clasificar como si la gente frente a ellos fuera solo un problema logistico. Una escriba delgada con estuche negro levanta la vista apenas un segundo. No te mira como a una amenaza. Te mira como a un retraso imprevisto.",
                getAct2CompanionLine(state, "pozo") || "La sala entera pide una decision rapida: rescatar, robar pruebas, o partirle el eje a todo antes de que vuelva a girar."
            ],
            choices: [
                {
                    label: "Ir primero por los cautivos al borde de las cadenas",
                    desc: "Si la sala estalla, lo primero que cae no van a ser los papeles.",
                    next: "dd_act2_patron_pozo",
                    effects: {
                        setFlags: ["dd_act2_rescue_priority"],
                        clearFlags: ["dd_act2_record_priority"],
                        adjustMetrics: { reputacionMedoran: 1 },
                        journal: "Priorizas a la gente que podria morir primero si la sala se convierte en una pelea abierta."
                    }
                },
                {
                    label: "Ir primero por la mesa lacrada y los sellos",
                    desc: "Si prenden esa mesa antes de caer, pierdes la mitad del mapa.",
                    next: "dd_act2_patron_pozo",
                    effects: {
                        setFlags: ["dd_act2_record_priority"],
                        clearFlags: ["dd_act2_rescue_priority"],
                        adjustMetrics: { pistasTalisman: 1 },
                        journal: "Priorizas cortar la mano que registra el negocio antes de que borre sus huellas mas delicadas."
                    }
                }
            ]
        },

        dd_act2_patron_pozo: {
            title: "Larok del Pozo",
            location: "Plataformas de cadena",
            objective: "Quebrar la cadena de mando del Pozo antes de que Nereza o los guardias recompongan la sala.",
            text: state => [
                "Larok no lleva corona ni simbolo religioso. Lleva la autoridad sucia de quien dirige un lugar que cree inexpugnable porque funciona escondido dentro de una ciudad orgullosa. A un lado tiene al cadenero; al otro, a la adepta que marca y registra. Detras, el agua negra golpea la piedra como si estuviera esperando turno.",
                state.flags.dd_act2_record_priority
                    ? "La mesa de sellos ya empezo a cerrarse. Nereza no pelea; calcula. Mira primero el estuche, despues la compuerta secundaria y solo al final te dedica el minimo interes que exige la supervivencia."
                    : "Los cautivos mas cercanos ya entendieron que algo cambio. Algunos intentan no hacer ruido; otros aprietan dientes como quien no se atreve todavia a creer que la ayuda haya bajado de verdad.",
                "No hay discurso largo. Solo una verdad inmediata: si Larok se mantiene de pie, el Pozo sigue siendo un mecanismo. Si lo rompes, todo lo demas empieza a soltarse."
            ],
            choices: state => {
                const companion = getChosenCompanion(state);
                const companionReady = canChosenCompanionAct(state);
                const choices = [
                    {
                        label: "Romper la sala en combate frontal",
                        desc: "No hace falta convencer a nadie si el eje entero deja de girar.",
                        check: { type: "attack", dc: 17, label: "Ataque principal" },
                        combat: buildAct2PitCombat(state, "default"),
                        success: {
                            next: "dd_act2_despues_pozo",
                            text: "Larok cae o huye ya sin mando, el cadenero suelta la rueda y la sala deja de obedecer a una sola voluntad. Entre agua, hierro y gritos, el Pozo deja de funcionar como sistema y pasa a convertirse por fin en un problema vivo para quienes lo sostenian.",
                            effects: {
                                setFlags: ["dd_act2_pozo_broken"],
                                adjustMetrics: { reputacionMedoran: 1 },
                                addItems: buildPozoLoot(state, false),
                                addCurrency: 3,
                                advanceTime: 1
                            }
                        },
                        failure: {
                            next: "dd_act2_despues_pozo",
                            text: "No ganas limpio, pero si lo bastante como para romper ritmo, cadena y registro. El Pozo sigue mordiendote al salir, aunque ya no vuelve a quedar ordenado como antes cuando la sangre y el metal terminan de asentarse.",
                            effects: {
                                setFlags: ["dd_act2_pozo_bloody"],
                                adjustMetrics: { influenciaVael: 1 },
                                addItems: buildPozoLoot(state, false).slice(0, 2),
                                damage: 4,
                                advanceTime: 1
                            }
                        }
                    }
                ];

                if (companion && companionReady) {
                    const extraByCompanion = {
                        arannis: {
                            label: "Tomar el balcon de poleas con Arannis y partirles el ritmo",
                            desc: "Con altura, linea y lectura del espacio, la sala deja de pertenecerle a Larok.",
                            textSuccess: "Arannis te compra el segundo exacto que necesitabas. Desde arriba parte linea, obliga a girar cabezas y te deja caer sobre Larok cuando la sala aun no entiende de donde le llego el problema real.",
                            textFailure: "Arannis no rompe la sala del todo, pero si lo suficiente como para que Larok tenga que defenderse peor de lo que queria. El combate se vuelve sucio, no imposible."
                        },
                        brunna: {
                            label: "Romper la rueda principal con Brunna y pelear sobre el caos",
                            desc: "Si la maquinaria cae primero, el miedo cae pegado a ella.",
                            textSuccess: "Brunna revienta la rueda de cadena con una violencia precisa y todo el Pozo pierde centro de gravedad. Larok ya no dirige un mecanismo: intenta sobrevivir dentro de los pedazos que le quedan.",
                            textFailure: "La rueda no muere de un solo golpe, pero si pierde orden. Lo que sigue es mas peligroso y mas desprolijo, aunque tambien mucho mas favorable que pelear con el sistema intacto."
                        },
                        kael: {
                            label: "Dejar que Kael apague faroles, cierre salidas y envenene la rutina",
                            desc: "Si el Pozo depende de costumbre, Kael puede matarle justo eso.",
                            textSuccess: "Kael no gana por dano: gana por desorden inteligente. Luces fuera, salida mala cerrada, una voz falsa en el momento correcto, y de pronto Larok ya no pelea desde control sino desde sospecha.",
                            textFailure: "Kael no llega a oscurecerlo todo, pero si a torcer dos ritmos clave. Eso basta para ensuciarles el control y darte una pelea menos limpia para ellos."
                        }
                    };
                    const extra = extraByCompanion[companion.id];
                    if (extra) {
                        choices.unshift({
                            label: extra.label,
                            desc: extra.desc,
                            check: { type: "attack", dc: 16, label: "Ataque principal" },
                            combat: buildAct2PitCombat(state, "companion"),
                            success: {
                                next: "dd_act2_despues_pozo",
                                text: extra.textSuccess,
                                effects: {
                                    setFlags: ["dd_act2_pozo_broken", "dd_act2_final_edge"],
                                    adjustMetrics: { reputacionMedoran: 1 },
                                    addItems: buildPozoLoot(state, true),
                                    addCurrency: 3,
                                    advanceTime: 1
                                }
                            },
                            failure: {
                                next: "dd_act2_despues_pozo",
                                text: extra.textFailure,
                                effects: {
                                    setFlags: ["dd_act2_pozo_bloody"],
                                    adjustMetrics: { influenciaVael: 1 },
                                    addItems: buildPozoLoot(state, false).slice(0, 2),
                                    damage: 3,
                                    advanceTime: 1
                                }
                            }
                        });
                    }
                }

                return choices;
            }
        },

        dd_act2_despues_pozo: {
            title: "La escriba que corre",
            location: "Pasarela de drenaje",
            objective: "Decidir si persigues a Nereza Pell o aseguras cautivos y pruebas antes de que el Pozo termine de venirse abajo.",
            text: state => {
                const lines = [];
                lines.push("Cuando Larok pierde la sala, lo primero que realmente importa intenta huir. Nereza Pell no corre con oro ni con espada: corre con un estuche negro apretado contra las costillas y la clase de disciplina que solo tiene quien sabe exactamente cuanto vale lo que lleva.");
                lines.push(state.flags.dd_act2_rescue_priority
                    ? "Detras de vos, las cadenas mas cercanas ya empiezan a soltarse y los cautivos pelean por mantenerse en pie sin estorbarse entre si. Hay gente viva para sacar de ahi, pero tambien una escriba escapando con informacion que no vas a volver a ver entera si la dejas ir."
                    : "La mesa lacrada ya no esta intacta y el humo fino de cera quemada empieza a subir. Ganaste papeles y desorden, pero justo por eso Nereza entendio antes que nadie por donde conviene retirarse."
                );
                if (isAct2Late(state)) {
                    lines.push("El Pozo ya estaba mas vaciado de lo que habria estado un dia antes, y eso vuelve la decision todavia mas fea: lo poco que queda delante tuyo ahora vale mas.");
                }
                lines.push("No hay forma de tenerlo todo al mismo tiempo. O corres, o aseguras.");
                return lines;
            },
            choices: state => buildAct2ChaseChoice(state)
        },

        dd_act2_cierre: {
            title: "Medoran herida",
            location: "Salida del subsuelo",
            complete: true,
            endingTone: state => {
                if (state.flags.dd_act2_talisman_fragment || state.flags.dd_act2_captives_secured) return "success";
                return "partial";
            },
            objective: "Acto II completado. El siguiente rastro apunta a Lethariel y a algo mucho mas antiguo que una simple red de esclavos.",
            text: state => {
                const lines = [];
                lines.push("Sales del subsuelo con el cuerpo peor de lo que te gustaria y la certeza mucho mejor de lo que Medoran queria permitir. El Pozo ya no es una sospecha. Fue real, funciono bajo la ciudad y ahora dejo suficientes heridas como para que alguien tenga que explicar por que existia.");
                if (state.flags.dd_act2_talisman_fragment) {
                    lines.push("En tus manos queda un fragmento del talisman de Ilyr-Vael, frio incluso fuera del agua negra, junto con notas y rutas que no pertenecen al puerto ni al consulado. No es una respuesta final. Es una llave parcial que mira hacia Lethariel con demasiada insistencia.");
                } else {
                    lines.push("Nereza no te dejo el fragmento entero, pero si demasiado rastro para seguir negando la direccion verdadera. Las notas salvadas, los sellos rotos y la ruta marcada alcanzan para empujar la campana fuera de Medoran y hacia Lethariel.");
                }
                if (state.flags.dd_act2_captives_secured || state.flags.dd_act2_rescue_priority) {
                    lines.push("Los cautivos que consigues sacar te devuelven a Medoran una clase de verdad que no cabe en archivo ni manifiesto. Vieron caras, oyeron nombres y pueden decir en voz alta lo que hasta ahora solo habias probado a medias.");
                } else {
                    lines.push("No todo el mundo sale de ahi contigo, y esa falta pesa. Lo que ganaste en pruebas y direccion viene manchado por la cuenta de quienes quedaron mas atras de lo que te gustaria admitir.");
                }
                lines.push(getAct2CompanionLine(state, "pozo") || "La ciudad de arriba sigue fingiendo normalidad, pero vos ya viste el mecanismo escondido debajo.");
                lines.push("El siguiente tramo ya no trata solo de Medoran. Trata de por que esta red necesitaba ruinas, marcas viejas y rutas hacia Lethariel en primer lugar.");
                return lines;
            }
        }
    });
})();
