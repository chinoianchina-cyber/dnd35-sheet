(function () {
    const campaign = window.ADVENTURE_EXTERNAL_CAMPAIGNS?.["diente-dragon"];
    if (!campaign) return;

    Object.assign(campaign.scenes, {
        dd_act1_arribo_irivith: {
            title: "Arribo a Irivith",
            location: "Muelle de Irivith",
            text: [
                "La lluvia fina cae sobre redes, madera hinchada y caras que ya aprendieron a hablar poco. Irivith huele a sal, pez abierto y miedo mal disimulado.",
                "No tardas en notar la tension: hay desaparecidos, los guardias no entran al bosque y todo el mundo tiene un rumor, pero nadie una version entera."
            ],
            choices: [
                {
                    label: "Escuchar a Mara Vens y aceptar el problema de inmediato",
                    desc: "La posadera conoce nombres, deudas y silencios. Si ella baja la voz, conviene escuchar.",
                    next: "dd_act1_hub_irivith",
                    journal: "Mara Vens te pone al frente de una aldea que ya no distingue entre resignacion y miedo.",
                    effects: {
                        setFlags: ["dd_mara_contacto", "dd_desapariciones_confirmadas"],
                        adjustMetrics: { reputacionIrivith: 1 },
                        objective: "Hablar con la gente correcta en Irivith y encontrar un rastro util antes de perder la noche."
                    }
                },
                {
                    label: "Buscar al alguacil Tollan Grev antes de moverte",
                    desc: "Si hay autoridad formal, aunque sea floja, conviene medirla primero.",
                    next: "dd_act1_hub_irivith",
                    journal: "Tollan admite que la situacion lo supera, pero te da margen para investigar por tu cuenta.",
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
                "Con el problema ya abierto, la aldea deja de parecer un puerto triste y se vuelve un tablero chico donde cada rumor importa.",
                `${state.flags.dd_fresh_tracks ? "Ya sabes que hubo movimiento reciente hacia el borde del bosque." : "Todavia no tienes un rastro limpio; solo versiones parciales y una urgencia que no deja de crecer."}`
            ],
            choices: [
                {
                    label: "Hablar con las familias de los desaparecidos",
                    desc: "Si el dolor repite detalles, esos detalles suelen ser reales.",
                    requires: { notFlags: ["dd_familias_revisadas"] },
                    check: { type: "skill", target: "Gather Information", dc: 12, label: "Gather Information" },
                    success: {
                        next: "dd_act1_hub_irivith",
                        text: "Las familias conectan horarios, ropa y recorridos. Dos de los ausentes fueron vistos cerca del mismo sendero humedo antes del anochecer.",
                        effects: {
                            setFlags: ["dd_familias_revisadas", "dd_fresh_tracks"],
                            advanceTime: 1,
                            adjustMetrics: { reputacionIrivith: 1 }
                        }
                    },
                    failure: {
                        next: "dd_act1_hub_irivith",
                        text: "Ganas contexto y nombres, pero no un rastro util. Aun asi, la aldea ve que al menos alguien se esta moviendo.",
                        effects: {
                            setFlags: ["dd_familias_revisadas"],
                            advanceTime: 1
                        }
                    }
                },
                {
                    label: "Abrir oidos en la taberna de Mara",
                    desc: "Los marineros mienten mucho, pero rara vez todos mienten exactamente igual.",
                    requires: { notFlags: ["dd_taberna_revisada"] },
                    next: "dd_act1_taberna_mara",
                    effects: { advanceTime: 1 }
                },
                {
                    label: "Ir al santuario de Hermana Solenne",
                    desc: "Algunos miedos entran primero en los sueños y despues en la calle.",
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
                        journal: "Te tomas un momento para ordenar el cuerpo y el equipo mientras la aldea sigue respirando por la herida."
                    }
                }
            ]
        },

        dd_act1_taberna_mara: {
            title: "La taberna de Mara",
            location: "Sala comun de Irivith",
            text: [
                "La taberna huele a brea, cerveza aguada y pescado seco. Las conversaciones no se cortan del todo cuando entras, pero cambian de forma.",
                "Mara no te sirve informacion gratis: te empuja en la direccion correcta y deja que el resto lo hagan los silencios ajenos."
            ],
            choices: [
                {
                    label: "Presionar por rumores concretos sobre luces y senderos",
                    desc: "No necesitas una teoria. Necesitas una direccion.",
                    check: { type: "skill", target: "Gather Information", dc: 12, label: "Gather Information" },
                    success: {
                        next: "dd_act1_hub_irivith",
                        text: "Tres voces distintas coinciden en algo raro: una linterna vieja volviendo del borde oriental y botas pesadas donde ya no deberia haber comercio.",
                        effects: {
                            setFlags: ["dd_taberna_revisada", "dd_rumor_linterna"],
                            adjustMetrics: { reputacionIrivith: 1 }
                        }
                    },
                    failure: {
                        next: "dd_act1_hub_irivith",
                        text: "No sacas una version limpia, pero queda claro que el miedo no empezo con bestias. Alguien organiza esto.",
                        effects: { setFlags: ["dd_taberna_revisada"] }
                    }
                }
            ]
        },

        dd_act1_santuario: {
            title: "El santuario de Solenne",
            location: "Galeria de piedra junto al mar",
            text: [
                "El santuario es pequeno, humedo y terco. Solenne no habla como quien especula, sino como quien ya vio demasiado para seguir llamandolo casualidad.",
                "Te cuenta que algunos familiares sueñan con agua negra y con un ojo bajo una luna partida. Todavia no entiende que significa; solo sabe que no es normal."
            ],
            choices: [
                {
                    label: "Pedirle una bendicion breve y llevarte su advertencia al bosque",
                    desc: "No es una solucion, pero una aldea que todavia reza tambien recuerda.",
                    next: "dd_act1_hub_irivith",
                    effects: {
                        setFlags: ["dd_santuario_revisado", "dd_marea_cala"],
                        addItems: ["Concha bendita de Solenne"],
                        adjustMetrics: { reputacionIrivith: 1 }
                    }
                }
            ]
        },

        dd_act1_borde_bosque: {
            title: "Borde de Vhalia",
            location: "Linde del bosque",
            text: state => [
                "El bosque de Vhalia traga el sonido del puerto mas rapido de lo normal. Las huellas, cuando aparecen, son demasiado pesadas para aldeanos y demasiado ordenadas para bestias.",
                `${state.flags.dd_rumor_linterna ? "Tambien ves restos de aceite viejo entre barro y agujas de pino." : "La lluvia no borro todo; alguien paso por aca con carga y disciplina."}`
            ],
            choices: [
                {
                    label: "Seguir las huellas antes de que se rompan del todo",
                    desc: "La mejor pista es la que aun no tiene tiempo de mentirte.",
                    check: { type: "skill", target: "Survival", dc: 13, label: "Survival" },
                    success: {
                        next: "dd_act1_party_intro",
                        text: "Encuentras ramas cortadas con criterio, no al azar. Alguien conoce el monte o lo aprendio a sangre.",
                        effects: {
                            setFlags: ["dd_bosque_rastro_firme"],
                            advanceTime: 1
                        }
                    },
                    failure: {
                        next: "dd_act1_party_intro",
                        text: "Pierdes precision, pero no direccion. El rastro se vuelve mas sucio justo antes de un claro peleado.",
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
                "En un claro embarrado encuentras a tres aventureros discutiendo sobre un cuerpo de bestia recien abatido. Tienen hambre, cansancio y una pista incompleta, que en el fondo es otra forma de decir que todavia son utiles.",
                "No forman una party armonica. Forman un accidente todavia reversible."
            ],
            choices: [
                {
                    label: "Confiar en Arannis Vel-Shae",
                    desc: "Silencio, rastreo y lectura de sendas viejas antes que fuerza bruta.",
                    next: "dd_act1_ruta_arannis",
                    effects: {
                        setFlags: ["dd_ally_arannis"],
                        setMetrics: { aliadoElegido: 1 },
                        journal: "Arannis acepta acompanarte. Los otros dos no desaparecen: se apartan, con sus propias razones."
                    }
                },
                {
                    label: "Confiar en Brunna Fuegoamargo",
                    desc: "Si el bosque es hostil, tambien se lo puede obligar a responder de frente.",
                    next: "dd_act1_ruta_brunna",
                    effects: {
                        setFlags: ["dd_ally_brunna"],
                        setMetrics: { aliadoElegido: 2 },
                        journal: "Brunna se suma sin vueltas. Su forma de calmar el miedo es darle trabajo."
                    }
                },
                {
                    label: "Confiar en Kael Morcant",
                    desc: "Una pista sucia en un bosque suele venir de una cadena mas sucia todavia.",
                    next: "dd_act1_ruta_kael",
                    effects: {
                        setFlags: ["dd_ally_kael"],
                        setMetrics: { aliadoElegido: 3 },
                        journal: "Kael te sigue con una sonrisa que no promete honestidad, pero si iniciativa."
                    }
                }
            ]
        },

        dd_act1_ruta_arannis: {
            title: "La senda que casi no existe",
            location: "Rastro elfico cubierto",
            text: [
                "Arannis te mete por una senda que no parece sendero. Donde vos ves maleza, el ve cortes viejos, paso repetido y arcos naturales pensados para ocultar movimiento.",
                "No habla mucho, pero alcanza con verlo detenerse un segundo para entender que alguien ya penso el camino antes."
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
                "Brunna evita las sendas invisibles y elige una quebrada mala, pero honesta: piedra mojada, poco espacio y buenas chances de que quien espere arriba crea que manda.",
                "Para ella, el problema no es entrar al castillo. Es llegar blando."
            ],
            choices: [
                {
                    label: "Forzar paso entre rocas y limpiar vigias",
                    desc: "Menos sutileza, mas control del terreno antes del asalto.",
                    check: { type: "ability", target: "STR", dc: 12, label: "Fuerza" },
                    success: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "Empujas una piedra justa donde hacia falta. El eco cambia y Brunna te dedica el equivalente enano a un elogio.",
                        effects: {
                            advanceTime: 1,
                            setFlags: ["dd_brunna_gate_edge"],
                            addCurrency: 6
                        }
                    },
                    failure: {
                        next: "dd_act1_arroyo_sin_reflejo",
                        text: "La roca baja peor de lo pensado y terminas corrigiendo sobre la marcha hacia un arroyo raro.",
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
                "Kael reconoce marcas cortadas en troncos bajos y te lleva a un campamento abandonado hace poco. No es semiorco: es humano, sucio y organizado.",
                "Eso es peor. Significa que alguien compra, mueve o encubre."
            ],
            choices: [
                {
                    label: "Revisar cofres y lonas antes de seguir",
                    desc: "Un campamento de paso suele perder monedas, llaves o nombres.",
                    check: { type: "skill", target: "Search", dc: 12, label: "Search" },
                    success: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "Encuentras un salvoconducto roto, un sello menor de Medoran y una nota de entrega a ruinas del valle.",
                        effects: {
                            advanceTime: 1,
                            setFlags: ["dd_kael_contrabando", "dd_medoran_hint"],
                            addCurrency: 12,
                            addItems: ["Sello roto de Medoran"]
                        }
                    },
                    failure: {
                        next: "dd_act1_caer_vorn_gate",
                        text: "No sacas un nombre limpio, pero si la certeza de que la cadena no termina en este bosque.",
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
                "Dentro del roble encuentras restos de un explorador muerto hace mas de un dia y menos de una semana. Lo vaciaron de provisiones, no de dignidad.",
                "Su diario mojado alcanza para una frase clara: los llevan vivos."
            ],
            choices: [
                {
                    label: "Tomar el diario, una pocion y volver al rastro principal",
                    desc: "No resuelve nada, pero ordena la prioridad correcta.",
                    next: "dd_act1_caer_vorn_gate",
                    effects: {
                        setFlags: ["dd_roble_diario"],
                        addItems: ["Diario mojado del explorador", "Pocion de curacion ligera"],
                        advanceTime: 1
                    }
                }
            ]
        },

        dd_act1_arroyo_sin_reflejo: {
            title: "El arroyo sin reflejo",
            location: "Quebrada interior",
            text: [
                "El agua corre, pero no devuelve imagen. No hace falta magia academica para saber que algo aca esta torcido.",
                "Ni Brunna ni vos hablan de miedo. Los dos pisan como si el arroyo pudiera escuchar."
            ],
            choices: [
                {
                    label: "Cruzar rapido y seguir el monte antes de perder mas tiempo",
                    desc: "Quedarte mirando lo raro no lo vuelve menos raro.",
                    next: "dd_act1_caer_vorn_gate",
                    effects: {
                        setFlags: ["dd_agua_torcida"],
                        adjustMetrics: { influenciaVael: 1 },
                        advanceTime: 1
                    }
                }
            ]
        },

        dd_act1_caer_vorn_gate: {
            title: "Ruinas de Caer Vorn",
            location: "Entrada del valle oculto",
            text: state => [
                "Las ruinas aparecen entre piedra vieja y enredaderas como si el bosque hubiera querido tragarlas, pero no digerirlas.",
                `${state.flags.dd_medoran_hint ? "Ahora sabes que este lugar no es solo guarida: es eslabon." : "Lo primero evidente es que alguien lo usa con criterio: vigias, movimiento y cautivos vivos."}`
            ],
            choices: [
                {
                    label: "Entrar en silencio por una grieta lateral",
                    desc: "Si logras ver las jaulas primero, el asalto cambia por completo.",
                    check: { type: "skill", target: "Move Silently", dc: 13, label: "Move Silently" },
                    success: {
                        next: "dd_act1_jaulas_caer_vorn",
                        text: "Te cuelas sin romper el ritmo del lugar y llegas a las jaulas antes de que los vigias entiendan que ya estas dentro.",
                        effects: { setFlags: ["dd_caer_vorn_infiltrado"], advanceTime: 1 }
                    },
                    failure: {
                        next: "dd_act1_guardia_semiorca",
                        text: "La piedra te devuelve un ruido minimo, pero alcanza. Alguien gira antes de tiempo.",
                        effects: { advanceTime: 1, damage: 1 }
                    }
                },
                {
                    label: "Barrer la entrada a golpes y tomar la iniciativa",
                    desc: "A veces la mejor forma de entrar es que sepan que ya llegaste.",
                    next: "dd_act1_guardia_semiorca",
                    effects: { setFlags: ["dd_caer_vorn_asalto"], advanceTime: 1 }
                }
            ]
        },

        dd_act1_guardia_semiorca: {
            title: "Guardia de Caer Vorn",
            location: "Patio derruido",
            text: [
                "Dos semiorcos y un perro flaco sostienen la entrada como si custodiaran un peaje, no una ruina.",
                "El orden del puesto dice mas que sus gritos: alguien les enseño a esperar gente viva."
            ],
            choices: [
                {
                    label: "Romper la guardia y abrirte paso",
                    desc: "No es un duelo heroico. Es cortar la puerta correcta.",
                    check: { type: "attack", dc: 15, label: "Ataque principal" },
                    combat: {
                        enemies: [
                            { id: "scout-1", name: "Semiorco vigia", ac: "15", hp: "10", maxHp: "10", attackBonus: "+3", damage: "1d8+2", morale: "flee25" },
                            { id: "scout-2", name: "Semiorco vigia", ac: "15", hp: "10", maxHp: "10", attackBonus: "+3", damage: "1d8+2", morale: "flee25" },
                            { id: "hound-1", name: "Perro de guerra flaco", ac: "13", hp: "8", maxHp: "8", attackBonus: "+2", damage: "1d6+1", morale: "fight" }
                        ]
                    },
                    success: {
                        next: "dd_act1_jaulas_caer_vorn",
                        text: "La guardia se rompe antes de organizarse del todo. El camino a las jaulas queda abierto, aunque no silencioso.",
                        effects: {
                            setFlags: ["dd_guardia_rota"],
                            addCurrency: 8
                        }
                    },
                    failure: {
                        next: "dd_act1_jaulas_caer_vorn",
                        text: "Pasas igual, pero pagas el precio en costillas, tiempo y ruido.",
                        effects: {
                            damage: 3,
                            setFlags: ["dd_guardia_alertada"]
                        }
                    }
                }
            ]
        },

        dd_act1_jaulas_caer_vorn: {
            title: "Jaulas y nombres",
            location: "Interior de Caer Vorn",
            text: [
                "Las jaulas estan abajo, entre columnas rajadas y lona vieja. No todos los cautivos son de Irivith, y eso cambia la escala del problema de golpe.",
                "Uno de los prisioneros alcanza a decir dos cosas utiles antes de pedir agua: Ghorvash manda aca, pero alguien de Medoran paga mejor."
            ],
            choices: [
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
                        text: "Encuentras un listado de traslados, cuentas de pago y marcas comerciales demasiado limpias para semiorcos solos.",
                        effects: {
                            setFlags: ["dd_pruebas_medoran"],
                            addItems: ["Listado de traslados de Caer Vorn"],
                            addCurrency: 10
                        }
                    },
                    failure: {
                        next: "dd_act1_ghorvash",
                        text: "No recuperas un documento entero, pero si restos suficientes para oler Medoran en la cadena.",
                        effects: { setFlags: ["dd_pruebas_medoran"] }
                    }
                }
            ]
        },

        dd_act1_ghorvash: {
            title: "Ghorvash el Claro",
            location: "Sala principal derruida",
            text: state => [
                "Ghorvash no parece chaman ni bestia. Parece un capataz brutal que aprendio a hablar de tierras, botin y venganza a hombres que necesitaban escuchar eso.",
                `${state.flags.dd_pruebas_medoran ? "Cuando ve los papeles en tus manos, se da cuenta de que ya no estas peleando solo contra el bosque." : "No te recibe como intruso casual. Te recibe como a alguien que ya toco el nervio del lugar."}`
            ],
            choices: [
                {
                    label: "Quebrarlo en combate antes de que recomponga la sala",
                    desc: "Si cae el jefe, cae el orden.",
                    check: { type: "attack", dc: 16, label: "Ataque principal" },
                    combat: {
                        enemies: [
                            { id: "ghorvash", name: "Ghorvash el Claro", ac: "16", hp: "18", maxHp: "18", attackBonus: "+5", damage: "1d10+3", morale: "flee25", fleeOutcome: "success" }
                        ]
                    },
                    success: {
                        next: "dd_act1_cierre",
                        text: "Ghorvash cae o huye malherido entre piedra y gritos. Lo importante no es solo el cuerpo que dejas atras, sino la evidencia que logras sacar con vida.",
                        effects: {
                            setFlags: ["dd_ghorvash_quebrado"],
                            adjustMetrics: { reputacionIrivith: 2, reputacionMedoran: 1 },
                            addItems: ["Sello de pago medorano"],
                            addCurrency: 16
                        }
                    },
                    failure: {
                        next: "dd_act1_cierre",
                        text: "No lo rematas limpio, pero le rompes la base lo suficiente como para salvar cautivos y salir con pruebas. El resto queda abierto.",
                        effects: {
                            damage: 4,
                            setFlags: ["dd_ghorvash_escapo"],
                            adjustMetrics: { influenciaVael: 1 },
                            addItems: ["Fragmento de carta de pago"],
                            addCurrency: 8
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
                        text: "Ghorvash no te da una confesion elegante, pero si un nombre util: Halren. Medoran. Altiplano. Pozo.",
                        effects: {
                            setFlags: ["dd_halren_nombrado", "dd_ghorvash_vivo"],
                            adjustMetrics: { reputacionMedoran: 1 },
                            addCurrency: 6
                        }
                    },
                    failure: {
                        next: "dd_act1_cierre",
                        text: "No logras quebrarlo del todo. Aun asi, reacciona demasiado fuerte ante el nombre de Medoran y eso ya cuenta como pista.",
                        effects: {
                            setFlags: ["dd_halren_nombrado"],
                            adjustMetrics: { influenciaVael: 1 }
                        }
                    }
                }
            ]
        },

        dd_act1_cierre: {
            title: "Salida de Caer Vorn",
            location: "Valle de Caer Vorn",
            text: state => [
                `Sales de Caer Vorn con mas de lo que entraste: cautivos, deuda, barro y una direccion nueva.${state.flags.dd_halren_nombrado ? " El nombre Halren ya no suena a rumor: suena a destino." : " Las pruebas apuntan a Medoran aunque nadie haya querido decirlo en voz alta."}`,
                "Irivith respira mejor, pero ya no alcanza con salvar un pueblo. La cadena es regional."
            ],
            complete: true,
            endingTone: () => "success",
            objective: "Acto I completado. El siguiente paso es seguir la red hacia Medoran y descubrir quien compra, ritualiza y mueve cautivos.",
            choices: [
                {
                    label: "Cerrar Acto I",
                    desc: "La ruta hacia Medoran queda abierta para la siguiente tanda de la campana.",
                    next: "dd_act1_cierre",
                    effects: {
                        complete: true,
                        journal: "Acto I cerrado. La campana ya no trata solo de Irivith: trata de la cadena que conecta Iareth con Medoran."
                    }
                }
            ]
        }
    });
})();
