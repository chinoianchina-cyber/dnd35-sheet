(function () {
    window.ADVENTURE_EXTERNAL_CAMPAIGNS = window.ADVENTURE_EXTERNAL_CAMPAIGNS || {};

    window.ADVENTURE_EXTERNAL_CAMPAIGNS["diente-dragon"] = {
        id: "diente-dragon",
        title: "DienteDragon: Sombras sobre Iareth",
        blurb: "En la isla de Iareth, unas desapariciones en Irivith abren la puerta a una campana de rastreo, ruinas, politica sucia y corrupcion antigua que crece acto a acto.",
        recommended: "Actos I-II cargados - Niveles 2-4 - 1 PJ + 1 aliado",
        levelPlan: {
            startingLevel: 2,
            milestones: [
                {
                    id: "dd_act1_complete",
                    sceneId: "dd_act2_arribo_medoran",
                    targetLevel: 3,
                    title: "Fin del Acto I",
                    text: "Sobreviviste a Irivith, seguiste la red hasta Caer Vorn y saliste con una pista real hacia Medoran. La campana te lleva automaticamente a nivel 3 para el siguiente tramo.",
                    journal: "El cierre del Acto I endurece al personaje y lo deja listo para entrar en la siguiente etapa de la campana con mas nivel y herramientas."
                },
                {
                    id: "dd_act2_complete",
                    sceneId: "dd_act2_cierre",
                    requireComplete: true,
                    targetLevel: 4,
                    title: "Fin del Acto II",
                    text: "Medoran ya no es un rumor ni una sospecha: ahora sabes quien movia cautivos, que ocultaba el Pozo y por que el rastro verdadero apunta hacia Lethariel. La campana te empuja a nivel 4 para el proximo acto.",
                    journal: "El cierre del Acto II deja atras la investigacion costera y convierte la persecucion en una caceria mas honda, mas vieja y mucho mas peligrosa."
                }
            ]
        },
        startSceneId: "dd_act1_arribo_irivith",
        startObjective: "Investigar las desapariciones en Irivith antes de que el rastro se enfrie en el bosque.",
        openingJournal: "Desembarcas en Irivith cuando la lluvia fina ya no refresca: solo golpea sobre tablas mojadas, sal vieja y rumores que nadie quiere pronunciar demasiado fuerte.",
        initialState: {
            day: 1,
            timeIndex: 2,
            wealthGp: 0,
            flags: {
                dd_act1_started: true
            },
            metrics: {
                pistasTalisman: 0,
                influenciaVael: 0,
                tensionMedoranFuegoHierro: 0,
                cultoDraconico: 0,
                cultoMuerte: 0,
                act2Clues: 0,
                reputacionIrivith: 0,
                reputacionMedoran: 0,
                reputacionFuegoHierro: 0,
                reputacionElfos: 0
            }
        },
        structure: {
            acts: [
                { id: "act1", title: "Acto I - Iareth", status: "loaded" },
                { id: "act2", title: "Acto II - Medoran", status: "loaded" },
                { id: "act3", title: "Acto III - Lethariel", status: "planned" },
                { id: "act4", title: "Acto IV - Fractura del Archipielago", status: "planned" },
                { id: "act5", title: "Acto V - El Primer Diente", status: "planned" }
            ]
        },
        allies: [
            {
                id: "arannis",
                name: "Arannis Vel-Shae",
                className: "Ranger",
                role: "Rastreo, sigilo y lectura de ruinas elficas",
                summary: "Explorador elfico de voz baja y mirada larga; destaca siguiendo rastros, leyendo bosque y detectando viejas huellas de civilizaciones caidas."
            },
            {
                id: "brunna",
                name: "Brunna Fuegoamargo",
                className: "Fighter / Cleric",
                role: "Choque, aguante y autoridad de campo",
                summary: "Enana frontal, religiosa sin sermones y dificil de mover una vez que decide plantar los pies."
            },
            {
                id: "kael",
                name: "Kael Morcant",
                className: "Rogue / Bard",
                role: "Infiltracion, rumores, puertos y submundo",
                summary: "Superviviente rapido, encantador cuando conviene y peligrosamente observador cuando nadie lo nota."
            }
        ],
        factions: [
            {
                id: "irivith",
                name: "Irivith",
                summary: "Aldea costera cansada, dependiente del mar y golpeada por desapariciones que ya dejaron de parecer hechos aislados."
            },
            {
                id: "semiorcos",
                name: "Banda semiorca",
                summary: "Raptan aldeanos y obedecen una cadena de mando mas compleja de lo que Irivith imagina."
            },
            {
                id: "medoran",
                name: "Medoran",
                summary: "Centro politico de la Alianza; refinado por fuera, utilitario y opaco por dentro."
            },
            {
                id: "fuego-hierro",
                name: "Fuego y Hierro",
                summary: "Mercaderes, herreros y capataces enanos cuya logica industrial puede convertirse en alianza, presion o frente de guerra segun quien toque sus contratos."
            }
        ],
        scenes: {}
    };
})();
