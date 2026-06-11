(function () {
    window.ADVENTURE_EXTERNAL_CAMPAIGNS = window.ADVENTURE_EXTERNAL_CAMPAIGNS || {};

    window.ADVENTURE_EXTERNAL_CAMPAIGNS["diente-dragon"] = {
        id: "diente-dragon",
        title: "DienteDragon: Sombras sobre Iareth",
        blurb: "En la isla de Iareth, los desaparecidos de Irivith abren la puerta a una campana de rastreo, ruinas, politica y corrupcion espiritual que escala mucho mas alla del bosque.",
        recommended: "Acto I cargado · Niveles 1-4 · 1 PJ + 1 aliado",
        startSceneId: "dd_act1_arribo_irivith",
        startObjective: "Investigar las desapariciones en Irivith antes de que el rastro se enfrie en el bosque.",
        openingJournal: "Desembarcas en Irivith cuando la lluvia fina ya no refresca: solo pega sobre tablas mojadas, sal vieja y rumores que nadie quiere pronunciar demasiado fuerte.",
        initialState: {
            day: 1,
            timeIndex: 2,
            wealthGp: 0,
            flags: {
                dd_act1_started: true
            },
            metrics: {
                pistasTalismán: 0,
                influenciaVael: 0,
                tensionMedoranFuegoHierro: 0,
                cultoDraconico: 0,
                cultoMuerte: 0,
                reputacionIrivith: 0,
                reputacionMedoran: 0,
                reputacionFuegoHierro: 0,
                reputacionElfos: 0
            }
        },
        structure: {
            acts: [
                { id: "act1", title: "Acto I · Iareth", status: "loaded" },
                { id: "act2", title: "Acto II · Medoran", status: "planned" },
                { id: "act3", title: "Acto III · Lethariel", status: "planned" },
                { id: "act4", title: "Acto IV · Fractura del Archipielago", status: "planned" },
                { id: "act5", title: "Acto V · El Primer Diente", status: "planned" }
            ]
        },
        allies: [
            {
                id: "arannis",
                name: "Arannis Vel-Shae",
                className: "Ranger",
                role: "Rastreo, sigilo y lectura de ruinas elficas",
                summary: "Explorador elfico silencioso, util para bosque, emboscadas y secretos antiguos."
            },
            {
                id: "brunna",
                name: "Brunna Fuegoamargo",
                className: "Fighter / Cleric",
                role: "Tanque, resistencia y trato con clanes enanos",
                summary: "Enana frontal y honorable, ideal para rutas duras, choque y autoridad."
            },
            {
                id: "kael",
                name: "Kael Morcant",
                className: "Rogue / Bard",
                role: "Infiltracion, rumores, puertos y submundo",
                summary: "Superviviente encantador y peligroso, perfecto para mentir y abrir rutas sucias."
            }
        ],
        factions: [
            { id: "irivith", name: "Irivith", summary: "Aldea costera cansada, dependiente del mar y golpeada por las desapariciones." },
            { id: "semiorcos", name: "Banda semiorca", summary: "Raptan aldeanos y creen obedecer a una cadena de mando propia, no a un mal absoluto." },
            { id: "medoran", name: "Medoran", summary: "Centro politico de la Alianza; civilizado por fuera, muy mas podrido por dentro." }
        ],
        scenes: {}
    };
})();
