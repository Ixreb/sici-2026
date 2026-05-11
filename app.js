const CSV_DATA = `name;address;latitude;longitude
"Lungomare d'Ortigia";"";37.056465599999996;15.2951301
"Palazzo Adriano";"";37.6815579;13.379220199999999
"Mondello Beach";"";38.2000633;13.328589299999999
"L'Agorà di Segesta - Sala Ricevimenti";"";37.9479261;12.839030399999999
"Sunset White Wall";"";37.291046;13.473106699999999
"Cementerio";"";36.8639912;14.748769999999999
"Bar gelateria La Sirenetta";"";38.177805299999996;12.733297
"Fuente de Diana";"";37.0612486;15.2938566
"Módica";"97015 Módica, Ragusa, Italia";36.8589716;14.760840499999999
"Valle de los Templos";"";37.2923664;13.593701099999999
"Cefalú";"Cefalú, Palermo, Italia";38.0349976;14.021222
"Isola Bella";"";37.8505475;15.3001048
"Palermo";"Palermo, Italia";38.1156864;13.3614635
"Erice Panorama";"";38.0416599;12.5875358
"Templo de Apolo";"";37.0638837;15.293036599999999
"Templo de Segesta";"";37.941424399999995;12.8323789
"stairs down to sea";"";37.8572053;15.293717
"Grotta La Seggia";"";37.091519999999996;15.2999271
"Basílica de Santa Lucía del Sepulcro";"";37.0730445;15.291226199999999
"Piazza Duomo";"96100 Siracusa, Italia";37.0593903;15.293143899999999
"Porta Carmine";"";38.039961999999996;12.5869193
"Siracusa";"96100 Siracusa, Italia";37.075401299999996;15.2867415
"Erice";"91016 Erice, Trapani, Italia";38.03778;12.5879274
"Teatro de Taormina";"";37.8523175;15.292134299999999
"Antiguo mercado de Ortigia";"";37.0645971;15.2933335
"Spiaggia di Cefalù";"";38.0357333;14.015926799999999
"Catedral de San Jorge";"";36.8639343;14.7614574
"Monreale";"90046 Monreale, Palermo, Italia";38.0807591;13.288089999999999
"Catedral de Cefalú";"";38.0400904;14.023171699999999
"Noto";"96017 Noto, Siracusa, Italia";36.8924433;15.065194499999999
"Ingresso Scala dei Turchi";"";37.2899396;13.473826899999999
"Parque Arqueológico de Segesta";"";37.9417689;12.835728
"Theater of Segesta";"";37.9410989;12.843865099999999
"Passeggio Foro Vittorio Emanuele II";"";37.0599606;15.2919281
"Parque Arqueológico de Neapolis";"";37.0752692;15.2785727
"Trapani-Erice Cableway";"";38.036508399999995;12.5825125
"Stair of the Turks";"";37.2899672;13.472761799999999
"Duomo di San Giorgio";"";36.9266706;14.7426202
"Duomo di San Pietro Apostolo";"";36.8606792;14.760751099999998
"Spiaggia di Calamosche";"";36.824427199999995;15.1058358
"Sentiero per Cala Mancina";"";38.183425799999995;12.725432399999999
"Villa Romana del Casale";"";37.3647239;14.334552299999999
"Riserva naturale orientata Oasi Faunistica di Vendicari";"";36.7986425;15.0929749
"Riserva Naturale Orientata dello Zingaro";"";38.1223635;12.7850634
"Favignana";"Isla Favignana, Trapani, Italia";37.9298834;12.3282875
"Pizzo viewpoint";"";36.8665763;14.7597664
"Isola delle Sirene";"";37.858425;15.3009419
"Cala rossa";"";37.9220325;12.3626303
"Castle of Venus";"";38.035323399999996;12.591744
"Cala Rossa";"";38.187858299999995;12.7272964
"Cala Mancina";"";38.1759081;12.7167566
"Al Sabbione Lido";"";38.1753723;12.7421498
"Santuario di Contrada Mango";"";37.9336207;12.843189599999999
"Parco Archeologico di Cava d'Ispica";"";36.850161;14.837929299999999
"Panorama Città Ragusa";"";36.919588499999996;14.7588159
"Catacumbas de San Juan";"";37.0768637;15.2844024
"Villa Siliqua";"";36.9209575;14.745670299999999
"Punta Cannone";"";37.1102402;15.2820857
"Cave of Pillirina";"";37.0218646;15.3174239
"San Vito Lo Capo";"San Vito Lo Capo, Trapani, Italia";38.1759419;12.7335733
"Cimitero di Ibla";"";36.91974;14.7455635
"Arethusa Spring";"";37.0572976;15.292928199999999
"Santa Maria di Gesu";"";36.8720066;14.7588327
"View Point Scala dei Turchi";"";37.2921519;13.472239
"Grotta dei Cavalli";"";38.167979599999995;12.720106399999999
"Castello Maniace";"";37.0538429;15.2949605
"Cala Rossa";"91030 San Vito Lo Capo, Trapani, Italia";38.1822249;12.7239262
"Belvedere Scala dei Turchi";"";37.2932853;13.470120399999999
"Sicilia";"Italia";37.3979297;14.6587821
"Escursioni Galeone Sultan";"";38.1820735;12.734145199999999
"Fortified Area Medieval Castle";"";37.9403347;12.8438994
"Ibla";"97100 Ragusa, Italia";36.926293199999996;14.744105399999999`;

const trip = {
  title: "Sicilia 2026",
  totalDays: 14,
  totalNights: 13,
};

const bases = [
  {
    id: "siracusa",
    range: "20-24 junio",
    nights: 4,
    area: "Siracusa / Ortigia o alrededores con parking",
    reason: "Base muy buena para Ortigia, Neapolis, Noto, Vendicari, Ragusa y Modica.",
    lat: 37.0754013,
    lng: 15.2867415,
  },
  {
    id: "agrigento",
    range: "24-25 junio",
    nights: 1,
    area: "Agrigento / Realmonte",
    reason: "Noche bisagra para ver templos y subir al oeste sin una paliza extra.",
    lat: 37.2923664,
    lng: 13.5937011,
  },
  {
    id: "trapani",
    range: "25-29 junio",
    nights: 4,
    area: "Trapani como base equilibrada",
    reason: "Mejor punto logístico para Favignana, Erice, Segesta y ferri.",
    lat: 38.0176,
    lng: 12.5365,
  },
  {
    id: "palermo",
    range: "29 junio-1 julio",
    nights: 2,
    area: "Palermo con parking claro",
    reason: "El coche debe quedar quieto y la ciudad debe hacerse andando.",
    lat: 38.1156864,
    lng: 13.3614635,
  },
  {
    id: "taormina",
    range: "1-3 julio",
    nights: 2,
    area: "Giardini Naxos / Letojanni",
    reason: "Mucho más práctico que dormir dentro de Taormina y mejor cierre para Etna.",
    lat: 37.8278,
    lng: 15.2679,
  },
];

const additions = [
  {
    name: "Etna",
    why: "No aparece en las chinchetas, pero sí debería estar en el viaje.",
    type: "Naturaleza",
  },
  {
    name: "Marzamemi",
    why: "Muy buen cierre suave tras Noto o Vendicari.",
    type: "Pueblo costero",
  },
  {
    name: "Scicli",
    why: "Solo como refuerzo del bloque barroco si realmente os sobra energía.",
    type: "Ciudad",
  },
  {
    name: "Tonnara di Scopello",
    why: "Encaja muy bien con Zingaro como tarde estética y manejable.",
    type: "Costa",
  },
  {
    name: "Salinas de Trapani / Marsala",
    why: "Plan muy lógico para atardecer el día de Erice.",
    type: "Paisaje",
  },
  {
    name: "Aci Castello / Aci Trezza",
    why: "Parada breve de último día si no queréis meteros en Catania.",
    type: "Parada final",
  },
];

const days = [
  {
    id: 1,
    date: "Sáb 20 junio",
    title: "Llegada a Catania -> Siracusa",
    summary: "Arrancar directamente hacia Siracusa es la forma más limpia de empezar.",
    base: "Siracusa",
    drive: "~1 h 05 min desde el aeropuerto",
    pace: "Suave",
    focusZones: ["Sureste"],
    focusPlaces: ["Siracusa", "Piazza Duomo", "Lungomare d'Ortigia", "Castello Maniace"],
    morning: ["Llegada a las 16:10", "Recoger coche", "Salida hacia Siracusa"],
    afternoon: ["Check-in", "Paseo corto por Ortigia", "Cena tranquila"],
    mustDo: ["Recoger coche con calma", "Llegar a la base", "Primer paseo breve"],
    optional: ["Cena larga", "Paseo extra si os veis muy enteros"],
    notes: [
      "No merece la pena intentar meter Catania esta tarde.",
      "Si dormís dentro de Ortigia, el parking tiene que estar muy claro.",
    ],
    parking: "Nada de improvisar ZTL. Alojamiento con parking o parking externo muy bien atado.",
    booking: "Sin reservas críticas, salvo el alojamiento con parking confirmado.",
    planB: "Si vais cansados, check-in, cena cerca y a dormir.",
    tags: ["Llegada", "Paseo suave", "Sin apreturas"],
  },
  {
    id: 2,
    date: "Dom 21 junio",
    title: "Ortigia a fondo + playa cómoda",
    summary: "Mañana histórica fuerte y tarde sencilla junto al mar.",
    base: "Siracusa",
    drive: "~20-35 min hacia playas cercanas",
    pace: "Equilibrado",
    focusZones: ["Sureste"],
    focusPlaces: [
      "Templo de Apolo",
      "Antiguo mercado de Ortigia",
      "Fuente de Diana",
      "Piazza Duomo",
      "Arethusa Spring",
      "Lungomare d'Ortigia",
      "Castello Maniace",
    ],
    morning: [
      "Templo de Apolo",
      "Mercado de Ortigia",
      "Fuente de Diana",
      "Piazza Duomo",
      "Fonte Aretusa",
      "Lungomare",
      "Castello Maniace",
    ],
    afternoon: ["Arenella o Fontane Bianche si queréis comodidad", "Plemmirio / Pillirina si os compensa el acceso"],
    mustDo: ["Piazza Duomo", "Fonte Aretusa", "Lungomare", "Castello Maniace"],
    optional: ["Plemmirio", "Pillirina", "Paseo largo tras la cena"],
    notes: [
      "Domingo es mejor no obsesionarse con playas remotas o con aparcar en primera línea.",
      "Ortigia se disfruta andando; no hace falta convertirla en lista infinita.",
    ],
    parking: "Mover el coche una sola vez os quita mucha fricción.",
    booking: "Sin reservas importantes. Sí conviene decidir la playa antes de salir.",
    planB: "Si el día se alarga, Ortigia larga + helado + tarde muy tranquila.",
    tags: ["Ciudad", "Mar", "Domingo"],
  },
  {
    id: 3,
    date: "Lun 22 junio",
    title: "Neapolis + mar",
    summary: "Arqueología temprano y tarde libre junto al agua.",
    base: "Siracusa",
    drive: "~15 min a Neapolis + playa según opción",
    pace: "Equilibrado",
    focusZones: ["Sureste"],
    focusPlaces: ["Parque Arqueológico de Neapolis", "Catacumbas de San Juan", "Basílica de Santa Lucía del Sepulcro"],
    morning: ["Parque Arqueológico de Neapolis", "Teatro griego", "Orecchio di Dionisio", "Anfiteatro romano"],
    afternoon: ["Fontane Bianche si queréis cero complicaciones", "Pillirina si prima paisaje sobre comodidad"],
    mustDo: ["Neapolis", "Teatro griego", "Orecchio di Dionisio"],
    optional: ["Catacumbas de San Juan", "Basílica de Santa Lucía"],
    notes: [
      "Neapolis debe hacerse muy pronto: poca sombra y mucho sol.",
      "Las catacumbas son un buen extra, pero no obligación.",
    ],
    parking: "Importa más la hora de entrada que el parking en sí.",
    booking: "Comprobar horario oficial la semana del viaje os deja tranquilos.",
    planB: "Quitar extras y guardar la tarde para descansar de verdad.",
    tags: ["Arqueología", "Calor", "Flexible"],
  },
  {
    id: 4,
    date: "Mar 23 junio",
    title: "Noto + Vendicari / Calamosche + Marzamemi",
    summary: "Uno de los días más redondos si elegís bien y no intentáis hacerlo todo.",
    base: "Siracusa",
    drive: "~40 min a Noto + movimientos cortos en el sureste",
    pace: "Equilibrado",
    focusZones: ["Sureste"],
    focusPlaces: ["Noto", "Spiaggia di Calamosche", "Riserva naturale orientata Oasi Faunistica di Vendicari"],
    morning: ["Noto", "Corso Vittorio Emanuele", "Catedral", "Paseo corto y miradores"],
    afternoon: ["Elegir solo una opción principal: Calamosche o Vendicari", "Marzamemi si apetece paseo y cena"],
    mustDo: ["Noto", "Una sola playa / reserva fuerte", "Cierre suave si queda cuerpo"],
    optional: ["Marzamemi", "Segunda parada costera solo si vais sueltos"],
    notes: [
      "No intentéis hacer todas las playas del parque.",
      "Calamosche luce mucho, pero tiene caminata y calor.",
    ],
    parking: "Aparcar fuera del meollo de Noto y no pelear por la playa perfecta.",
    booking: "No hace falta reservar nada, pero sí decidir si queréis caminata o comodidad.",
    planB: "Noto + Marzamemi ya es un día muy bueno si vais más justos.",
    tags: ["Barroco", "Reserva natural", "Pueblo costero"],
  },
  {
    id: 5,
    date: "Mié 24 junio",
    title: "Ragusa Ibla + Modica -> noche en Agrigento",
    summary: "Día de transición bonito, pero con riesgo claro de sobrecarga si metéis demasiados extras.",
    base: "Agrigento / Realmonte",
    drive: "~1 h 20 Siracusa -> Ragusa · 20 min Ragusa -> Modica · 2 h 30 Modica -> Agrigento",
    pace: "Cargado",
    focusZones: ["Sureste", "Sur"],
    focusPlaces: ["Ibla", "Duomo di San Giorgio", "Panorama Città Ragusa", "Módica", "Duomo di San Pietro Apostolo", "Catedral de San Jorge"],
    morning: ["Ragusa Ibla", "Duomo di San Giorgio", "Miradores y paseo sin prisa"],
    afternoon: ["Modica", "Duomo di San Pietro", "Chocolate", "Traslado a Agrigento"],
    mustDo: ["Ragusa Ibla", "Modica", "Dormir ya en Agrigento"],
    optional: ["Scicli", "Parada corta en Sampieri"],
    notes: [
      "Scicli debe ser opcional real, no obligatoria encubierta.",
      "Es más importante llegar bien a Agrigento que coleccionar pueblos.",
    ],
    parking: "En Ragusa y Modica, mejor aparcar fuera y caminar.",
    booking: "El alojamiento de Agrigento debe estar resuelto para llegar tarde sin fricción.",
    planB: "Si vais lentos, Scicli sale fuera sin remordimientos.",
    tags: ["Transición", "Barroco", "Conducción media"],
  },
  {
    id: 6,
    date: "Jue 25 junio",
    title: "Valle de los Templos + Scala dei Turchi -> Trapani",
    summary: "Día fuerte de patrimonio y paisaje antes del salto al noroeste.",
    base: "Trapani",
    drive: "~15 min a templos · 20 min a Scala · 2 h 40 hacia Trapani",
    pace: "Cargado",
    focusZones: ["Sur", "Noroeste"],
    focusPlaces: ["Valle de los Templos", "Ingresso Scala dei Turchi", "View Point Scala dei Turchi", "Belvedere Scala dei Turchi"],
    morning: ["Valle de los Templos temprano", "Recorrido corto y bien medido por lo principal"],
    afternoon: ["Scala dei Turchi como paisaje", "Baño solo si os compensa", "Traslado a Trapani"],
    mustDo: ["Templos temprano", "Scala como parada visual", "Llegar ya a Trapani"],
    optional: ["Baño corto en Realmonte"],
    notes: [
      "Scala dei Turchi es más mirador / paisaje que gran tarde de playa.",
      "Trapani sale mejor que San Vito como base global si queréis equilibrio.",
    ],
    parking: "Trapani con parking previsto antes de salir de Agrigento.",
    booking: "Revisar acceso de Scala dei Turchi cerca del viaje porque ha tenido control de aforo y pases.",
    planB: "Si vais justos, Scala muy breve y a seguir.",
    tags: ["Arqueología", "Paisaje", "Cambio de base"],
  },
  {
    id: 7,
    date: "Vie 26 junio",
    title: "Favignana",
    summary: "Uno de los mejores días de mar del viaje si vais ligeros y bien reservados.",
    base: "Trapani",
    drive: "Coche quieto · ferry de pasajeros",
    pace: "Playa fuerte",
    focusZones: ["Noroeste"],
    focusPlaces: ["Favignana", "Cala rossa", "Punta Cannone"],
    morning: ["Ferry temprano", "Bici eléctrica o scooter", "Cala Rossa / Bue Marino"],
    afternoon: ["Cala Azzurra o ritmo relajado", "Pueblo de Favignana sin prisas"],
    mustDo: ["Ferry temprano", "Moverse ligero", "Elegir 2 o 3 calas buenas"],
    optional: ["Punta Cannone", "Paseo largo por el pueblo"],
    notes: [
      "No tiene sentido llevar el coche a la isla.",
      "A finales de junio reservar ferry con margen es buena idea.",
    ],
    parking: "Coche parado en Trapani y logística sencilla.",
    booking: "Ferry recomendable reservarlo con antelación.",
    planB: "Si el mar está peor de lo esperado, cambiar Favignana por Erice o Trapani.",
    tags: ["Isla", "Ferry", "Playa fuerte"],
  },
  {
    id: 8,
    date: "Sáb 27 junio",
    title: "Zingaro + Scopello",
    summary: "Naturaleza potente por la mañana y tarde mucho más ligera para no morir de calor.",
    base: "Trapani",
    drive: "~1 h hasta la entrada según base exacta",
    pace: "Activo",
    focusZones: ["Noroeste"],
    focusPlaces: ["Riserva Naturale Orientata dello Zingaro", "Sentiero per Cala Mancina", "Cala Mancina", "Grotta dei Cavalli"],
    morning: ["Entrar temprano", "Elegir 1 o 2 calas", "No intentar la reserva entera"],
    afternoon: ["Tonnara di Scopello", "Baño o aperitivo", "Atardecer muy tranquilo"],
    mustDo: ["Zingaro temprano", "Moderación", "Scopello como remate"],
    optional: ["Cala extra", "Paseo un poco más largo si hace fresco"],
    notes: [
      "Agua, gorra, escarpines y comida ligera son casi obligatorios.",
      "El error típico aquí es pasarse de caminata y arruinar la tarde.",
    ],
    parking: "Llegar pronto ayuda tanto por parking como por temperatura.",
    booking: "Revisar acceso y recorrido disponible la semana del viaje.",
    planB: "Si hace demasiado calor, Scopello y playa más sencilla.",
    tags: ["Naturaleza", "Calas", "Sábado"],
  },
  {
    id: 9,
    date: "Dom 28 junio",
    title: "Erice + Trapani + salinas",
    summary: "Muy buen día para bajar un punto la exigencia sin perder esencia siciliana.",
    base: "Trapani",
    drive: "~25 min a teleférico o ~35 min en coche hasta Erice",
    pace: "Medio",
    focusZones: ["Noroeste"],
    focusPlaces: ["Erice", "Castle of Venus", "Erice Panorama", "Trapani-Erice Cableway", "Porta Carmine"],
    morning: ["Erice", "Calles medievales", "Castle of Venus", "Dulces locales"],
    afternoon: ["Trapani suave", "Salinas al atardecer"],
    mustDo: ["Erice", "Miradores", "Salinas"],
    optional: ["Teleférico", "Paseo más largo por Trapani"],
    notes: [
      "Erice puede cambiar mucho con niebla o viento.",
      "El teleférico suma encanto si está operativo y os encaja bien.",
    ],
    parking: "Si subís en coche, no apuréis. Si subís en teleférico, simplificáis mucho.",
    booking: "No suele requerir reserva, pero sí revisar operativa del teleférico.",
    planB: "Menos Erice si la meteo está fea y más Trapani / salinas.",
    tags: ["Pueblo", "Atardecer", "Ritmo medio"],
  },
  {
    id: 10,
    date: "Lun 29 junio",
    title: "Segesta -> Monreale -> Palermo",
    summary: "Cambio de base bien armado si no llegáis tarde y tensos a Palermo.",
    base: "Palermo",
    drive: "~35 min Trapani -> Segesta · 1 h 15 Segesta -> Monreale · 25 min Monreale -> Palermo",
    pace: "Cargado",
    focusZones: ["Noroeste", "Palermo"],
    focusPlaces: ["Templo de Segesta", "Parque Arqueológico de Segesta", "Theater of Segesta", "Monreale"],
    morning: ["Segesta", "Templo", "Teatro", "Shuttle si no queréis subir andando"],
    afternoon: ["Monreale", "Catedral", "Claustro", "Llegada a Palermo"],
    mustDo: ["Segesta", "Monreale", "Aparcar y olvidarse del coche"],
    optional: ["Teatro con subida más cómoda", "Paseo breve si llegáis bien a Palermo"],
    notes: [
      "Aquí sí compensa dormir ya en Palermo.",
      "Entrar en Palermo sin parking claro es mala idea.",
    ],
    parking: "Palermo solo con parking ya previsto.",
    booking: "Comprobar horario de Segesta os evita improvisar.",
    planB: "Recortar tiempo en Segesta antes que tensionar la llegada a Palermo.",
    tags: ["Cambio de base", "Monumento", "Sin coche por la noche"],
  },
  {
    id: 11,
    date: "Mar 30 junio",
    title: "Palermo sin coche + Mondello opcional",
    summary: "Palermo debe respirarse; Mondello solo si entra con naturalidad.",
    base: "Palermo",
    drive: "A pie / bus / taxi según plan",
    pace: "Flexible",
    focusZones: ["Palermo"],
    focusPlaces: ["Palermo", "Mondello Beach"],
    morning: ["Centro histórico", "Catedral", "Quattro Canti", "Mercado", "Teatro Massimo por fuera"],
    afternoon: ["Mondello si de verdad os pide mar", "o seguir con Palermo en clave suave"],
    mustDo: ["Centro histórico", "Mercado", "Uno o dos hitos grandes"],
    optional: ["Mondello", "Capilla Palatina", "Más calle y gastronomía"],
    notes: [
      "No merece la pena intentar verlo todo en Palermo.",
      "Mondello es secundaria y no debe mandar sobre el día.",
    ],
    parking: "El coche debería seguir parado.",
    booking: "Solo si queréis alguna visita interior muy concreta.",
    planB: "Palermo más ligera y más gastronómica si os abruma la lista de monumentos.",
    tags: ["Ciudad grande", "Sin coche", "Flexible"],
  },
  {
    id: 12,
    date: "Mié 1 julio",
    title: "Palermo -> Cefalù -> zona Taormina",
    summary: "Buena transición, pero mejor tratar Cefalù como paseo con baño corto que como media jornada larga de playa.",
    base: "Giardini Naxos / Letojanni",
    drive: "~1 h 10 Palermo -> Cefalù · 2 h 20 Cefalù -> Giardini Naxos",
    pace: "Transición",
    focusZones: ["Palermo", "Taormina / Etna"],
    focusPlaces: ["Cefalú", "Catedral de Cefalú", "Spiaggia di Cefalù"],
    morning: ["Cefalù", "Centro", "Catedral", "Paseo"],
    afternoon: ["Comida y paseo marítimo", "Baño corto si apetece", "Conducción hasta la base del este"],
    mustDo: ["Cefalù", "Comer bien", "Llegar al este con tiempo razonable"],
    optional: ["Baño corto", "Paseo más largo por el casco"],
    notes: [
      "Dormir ya fuera de Taormina es de las mejores decisiones logísticas del viaje.",
      "No añadáis otra ciudad este día.",
    ],
    parking: "Llegar pronto a Cefalù ayuda mucho con parking y ritmo.",
    booking: "Nada especial, pero sí alojamiento del este con parking claro.",
    planB: "Si vais justos, quitar baño y dejar Cefalù en paseo + comida.",
    tags: ["Cambio de base", "Playa urbana", "Costa norte"],
  },
  {
    id: 13,
    date: "Jue 2 julio",
    title: "Etna suave + Taormina / Isola Bella",
    summary: "Es el día más delicado del viaje: funciona bien si el Etna se hace en versión contenida.",
    base: "Giardini Naxos / Letojanni",
    drive: "~1 h 20 hasta Rifugio Sapienza + regreso al área de Taormina",
    pace: "Delicado",
    focusZones: ["Taormina / Etna"],
    focusPlaces: ["Teatro de Taormina", "Isola Bella", "stairs down to sea", "Isola delle Sirene"],
    morning: ["Etna Sur", "Cráteres Silvestri", "Teleférico solo si queréis mantener el día centrado en el volcán"],
    afternoon: ["Taormina", "Teatro greco", "Corso", "Isola Bella si queda energía"],
    mustDo: ["Etna en modo contenido", "Taormina al final", "No apretar demasiado"],
    optional: ["Teleférico", "Baño final", "Miradores extra"],
    notes: [
      "Si hacéis Etna largo, Taormina debe quedar claramente simplificada.",
      "Etna básico + Taormina funciona mejor que intentar exprimir ambas cosas.",
    ],
    parking: "Taormina en parking grande y enfoque práctico, no peleando por una calle ideal.",
    booking: "Conviene revisar Funivia / tour si queréis una subida concreta.",
    planB: "Si el Etna se alarga o la meteo se complica, quitar Isola Bella o simplificar Taormina.",
    tags: ["Volcán", "Icono", "Última noche"],
  },
  {
    id: 14,
    date: "Vie 3 julio",
    title: "Mañana ligera -> aeropuerto de Catania",
    summary: "El último día no debe competir con el vuelo.",
    base: "Vuelo",
    drive: "~50 min-1 h hasta el aeropuerto",
    pace: "Muy suave",
    focusZones: ["Taormina / Etna"],
    focusPlaces: [],
    morning: ["Desayuno tranquilo", "Paseo corto por Giardini Naxos / Letojanni", "Salida con margen"],
    afternoon: ["Devolver coche", "Vuelo a las 16:55"],
    mustDo: ["Salir con margen", "Devolver coche sin prisas"],
    optional: ["Aci Castello", "Aci Trezza"],
    notes: [
      "No meter una visita ambiciosa el último día.",
      "Si hay duda de tiempos, aeropuerto directo.",
    ],
    parking: "No hagáis una última parada que os obligue a aparcar dos veces.",
    booking: "Revisar condiciones de devolución del coche.",
    planB: "Directos al aeropuerto y viaje cerrado con calma.",
    tags: ["Vuelo", "Margen", "Cierre"],
  },
];

const dayMetrics = {
  1: { driveKm: 72, walkKm: 3 },
  2: { driveKm: 24, walkKm: 7 },
  3: { driveKm: 18, walkKm: 5 },
  4: { driveKm: 58, walkKm: 6 },
  5: { driveKm: 235, walkKm: 6 },
  6: { driveKm: 205, walkKm: 4 },
  7: { driveKm: 0, walkKm: 5 },
  8: { driveKm: 68, walkKm: 8 },
  9: { driveKm: 54, walkKm: 5 },
  10: { driveKm: 128, walkKm: 4 },
  11: { driveKm: 0, walkKm: 8 },
  12: { driveKm: 270, walkKm: 5 },
  13: { driveKm: 118, walkKm: 7 },
  14: { driveKm: 58, walkKm: 2 },
};

const fuelAssumptions = {
  litersPer100Km: 6.8,
  pricePerLiter: 1.8,
};

const criticalLogistics = [
  {
    title: "Ortigia / Siracusa",
    type: "Parking",
    priority: "Alta",
    body: "Alojamiento con parking claro o parking externo fiable. Nada de entrar en la isla sin tener resuelta la ZTL.",
  },
  {
    title: "Favignana",
    type: "Reserva",
    priority: "Alta",
    body: "Comprar ferry con antelación y no llevar coche. Elegir bici eléctrica o scooter según calor y ganas.",
  },
  {
    title: "Palermo",
    type: "Parking",
    priority: "Alta",
    body: "Entrar solo con parking o garaje ya atado. La ciudad se disfruta dejando el coche quieto.",
  },
  {
    title: "Taormina",
    type: "Parking",
    priority: "Alta",
    body: "Dormir fuera del centro y subir desde parking grande o transporte simple. No perseguir calle perfecta.",
  },
  {
    title: "Etna",
    type: "Revisión",
    priority: "Media",
    body: "Decidir antes del viaje si haréis solo Rifugio Sapienza + Silvestri o si queréis teleférico / subida organizada.",
  },
  {
    title: "Scala dei Turchi",
    type: "Acceso",
    priority: "Media",
    body: "Comprobar regulación de acceso cerca del viaje y tratarla sobre todo como parada de paisaje.",
  },
];

const importantNames = new Set([
  "siracusa",
  "piazza duomo",
  "fuente de diana",
  "arethusa spring",
  "templo de apolo",
  "antiguo mercado de ortigia",
  "lungomare d'ortigia",
  "castello maniace",
  "parque arqueologico de neapolis",
  "noto",
  "ibla",
  "modica",
  "valle de los templos",
  "villa romana del casale",
  "ingresso scala dei turchi",
  "parque arqueologico de segesta",
  "templo de segesta",
  "erice",
  "san vito lo capo",
  "riserva naturale orientata dello zingaro",
  "favignana",
  "cala rossa",
  "palermo",
  "monreale",
  "cefalu",
  "catedral de cefalu",
  "teatro de taormina",
  "isola bella",
]);

const mediumNames = new Set([
  "catacumbas de san juan",
  "basilica de santa lucia del sepulcro",
  "parco archeologico di cava d'ispica",
  "cave of pillirina",
  "mondello beach",
  "grotta la seggia",
  "punta cannone",
  "isola delle sirene",
  "trapani-erice cableway",
  "spiaggia di calamosche",
  "riserva naturale orientata oasi faunistica di vendicari",
  "stairs down to sea",
  "castle of venus",
  "erice panorama",
  "view point scala dei turchi",
]);

const lowNames = new Set([
  "palazzo adriano",
  "l'agora di segesta - sala ricevimenti",
  "cementerio",
  "cimitero di ibla",
  "sicilia",
  "bar gelateria la sirenetta",
  "villa siliqua",
  "fortified area medieval castle",
  "escursioni galeone sultan",
  "al sabbione lido",
  "porta carmine",
  "santuario di contrada mango",
]);

const state = {
  selectedDayId: 1,
  activeSideTab: "map",
  search: "",
  type: "all",
  priority: "all",
  zone: "all",
};

const elements = {
  statsGrid: document.getElementById("statsGrid"),
  baseGrid: document.getElementById("baseGrid"),
  dayList: document.getElementById("dayList"),
  dayDetail: document.getElementById("dayDetail"),
  additionList: document.getElementById("additionList"),
  criticalLogistics: document.getElementById("criticalLogistics"),
  journeySummary: document.getElementById("journeySummary"),
  placeList: document.getElementById("placeList"),
  placeCount: document.getElementById("placeCount"),
  typeFilter: document.getElementById("typeFilter"),
  priorityFilter: document.getElementById("priorityFilter"),
  zoneFilter: document.getElementById("zoneFilter"),
  searchInput: document.getElementById("searchInput"),
  printButton: document.getElementById("printButton"),
  overviewButton: document.getElementById("overviewButton"),
  mapFallback: document.getElementById("mapFallback"),
  mapPanel: document.querySelector(".sticky-panel"),
  mapFrame: document.getElementById("map"),
  sideTabButtons: Array.from(document.querySelectorAll("[data-side-tab]")),
  sideTabPanels: Array.from(document.querySelectorAll("[data-tab-panel]")),
};

const places = parseCsv(CSV_DATA).map((place, index) => enrichPlace(place, index));

let map = null;
let markerLayer = null;
let routeLayer = null;

init();

function init() {
  populateFilters();
  renderSideTabs();
  renderStats();
  renderBases();
  renderDayList();
  renderDayDetail();
  renderAdditions();
  renderJourneySummary();
  renderCriticalLogistics();
  initMap();
  renderPlaces();
  bindEvents();
}

function parseCsv(csv) {
  const rows = [];
  const lines = csv.trim().split("\n");
  const headers = splitCsvLine(lines.shift()).map((value) => value.trim());

  for (const line of lines) {
    const values = splitCsvLine(line);
    const entry = {};
    headers.forEach((header, index) => {
      entry[header] = (values[index] || "").trim().replace(/^"|"$/g, "");
    });
    rows.push(entry);
  }

  return rows;
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ";" && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function enrichPlace(place, index) {
  const lat = Number.parseFloat(place.latitude);
  const lng = Number.parseFloat(place.longitude);
  const normalized = normalize(place.name);

  return {
    ...place,
    id: `${normalized || "place"}-${index}`,
    lat,
    lng,
    normalized,
    zone: inferZone(normalized, lat, lng),
    type: inferType(normalized),
    priority: inferPriority(normalized),
    verdict: inferVerdict(normalized),
  };
}

function inferZone(normalizedName, lat, lng) {
  if (normalizedName.includes("taormina") || normalizedName.includes("isola bella")) {
    return "Taormina / Etna";
  }

  if (lng >= 14.9) {
    if (lat >= 37.75) {
      return "Taormina / Etna";
    }
    return "Sureste";
  }

  if (lng <= 13.05) {
    return "Noroeste";
  }

  if (lat >= 37.98 && lng > 13.05 && lng < 13.7) {
    return "Palermo";
  }

  if (lat < 37.55) {
    return "Sur";
  }

  if (lat >= 37.7 && lng >= 13.7 && lng < 14.9) {
    return "Noreste";
  }

  return "Interior";
}

function inferType(normalizedName) {
  const beachTokens = ["beach", "spiaggia", "cala", "isola bella", "lido", "mare"];
  const natureTokens = ["riserva", "grotta", "cave", "punta", "isola delle sirene", "zingaro", "vendicari"];
  const archaeologyTokens = ["templo", "parque arqueologico", "parco archeologico", "catacumbas", "valle de los templos", "villa romana", "teatro"];
  const cityTokens = ["siracusa", "ortigia", "piazza", "duomo", "catedral", "basilica", "castello", "mercado", "palermo", "noto", "modica", "cefalu", "ibla", "erice", "monreale"];
  const viewpointTokens = ["panorama", "view point", "belvedere", "lungomare", "passeggio", "stairs down"];
  const foodTokens = ["gelateria", "mercado"];

  if (beachTokens.some((token) => normalizedName.includes(token))) {
    return "Playa";
  }
  if (natureTokens.some((token) => normalizedName.includes(token))) {
    return "Naturaleza";
  }
  if (archaeologyTokens.some((token) => normalizedName.includes(token))) {
    return "Arqueología";
  }
  if (viewpointTokens.some((token) => normalizedName.includes(token))) {
    return "Mirador";
  }
  if (foodTokens.some((token) => normalizedName.includes(token))) {
    return "Comida";
  }
  if (cityTokens.some((token) => normalizedName.includes(token))) {
    return "Ciudad / monumento";
  }
  return "Miscelánea";
}

function inferPriority(normalizedName) {
  if (importantNames.has(normalizedName)) {
    return "Imprescindible";
  }
  if (mediumNames.has(normalizedName)) {
    return "Secundario";
  }
  if (lowNames.has(normalizedName)) {
    return "Revisar";
  }
  return "Secundario";
}

function inferVerdict(normalizedName) {
  if (importantNames.has(normalizedName)) {
    return "Mantener";
  }
  if (mediumNames.has(normalizedName)) {
    return "Si encaja";
  }
  if (lowNames.has(normalizedName)) {
    return "Probablemente prescindible";
  }
  return "Revisar en contexto";
}

function populateFilters() {
  fillSelect(elements.typeFilter, ["all", ...uniqueValues(places.map((place) => place.type))], "Todos");
  fillSelect(elements.priorityFilter, ["all", "Imprescindible", "Secundario", "Revisar"], "Todas");
  fillSelect(elements.zoneFilter, ["all", ...uniqueValues(places.map((place) => place.zone))], "Todas");
}

function renderSideTabs() {
  elements.sideTabButtons.forEach((button) => {
    const active = button.dataset.sideTab === state.activeSideTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  elements.sideTabPanels.forEach((panel) => {
    const active = panel.dataset.tabPanel === state.activeSideTab;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });
}

function setActiveSideTab(tabId, options = {}) {
  if (!tabId || tabId === state.activeSideTab) {
    if (options.scroll) {
      ensureSidePanelVisible();
    }
    return;
  }

  state.activeSideTab = tabId;
  renderSideTabs();

  if (tabId === "map" && map) {
    window.setTimeout(() => map.invalidateSize(), 30);
  }

  if (options.scroll) {
    ensureSidePanelVisible();
  }
}

function fillSelect(select, options, allLabel) {
  select.innerHTML = options
    .map((option) => {
      const label = option === "all" ? allLabel : option;
      return `<option value="${escapeHtml(option)}">${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderStats() {
  const mustSee = places.filter((place) => place.priority === "Imprescindible").length;
  const secondary = places.filter((place) => place.priority === "Secundario").length;
  const review = places.filter((place) => place.priority === "Revisar").length;

  const stats = [
    { value: `${trip.totalDays}`, label: "días de viaje" },
    { value: `${bases.length}`, label: "bases recomendadas" },
    { value: `${mustSee}`, label: "puntos imprescindibles" },
    { value: `${secondary}`, label: "puntos secundarios útiles" },
    { value: `${review}`, label: "puntos a rebajar o revisar" },
    { value: "Trapani", label: "mejor base equilibrada del noroeste" },
  ];

  elements.statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <article class="stat-card">
          <strong>${escapeHtml(stat.value)}</strong>
          <span>${escapeHtml(stat.label)}</span>
        </article>
      `
    )
    .join("");
}

function renderBases() {
  elements.baseGrid.innerHTML = bases
    .map(
      (base) => `
        <article class="base-card">
          <div class="base-meta">
            <strong>${escapeHtml(base.area)}</strong>
            <span class="badge badge-medium">${base.nights} noches</span>
          </div>
          <p><strong>${escapeHtml(base.range)}</strong></p>
          <p>${escapeHtml(base.reason)}</p>
          <div class="base-actions">
            <button class="mini-button js-focus-base" type="button" data-base-id="${escapeHtml(base.id)}">
              Ver base en mapa
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderDayList() {
  elements.dayList.innerHTML = days
    .map((day) => {
      const activeClass = state.selectedDayId === day.id ? "is-active" : "";
      return `
        <article class="day-card ${activeClass}" data-day-id="${day.id}">
          <div class="day-topline">
            <span>Día ${day.id} · ${escapeHtml(day.date)}</span>
            <span class="badge ${paceBadgeClass(day.pace)}">${escapeHtml(day.pace)}</span>
          </div>
          <h3>${escapeHtml(day.title)}</h3>
          <p>${escapeHtml(day.summary)}</p>
          <div class="day-submeta">
            <span>${escapeHtml(day.base)}</span>
            <span>${escapeHtml(day.drive)}</span>
          </div>
          <div class="day-tags">
            ${day.tags.map((tag) => `<span class="badge badge-type">${escapeHtml(tag)}</span>`).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderDayDetail() {
  const day = days.find((entry) => entry.id === state.selectedDayId) || getOverviewDay();
  elements.dayDetail.classList.toggle("is-selected", day.id !== "overview");
  elements.dayDetail.scrollTop = 0;

  if (day.id === "overview") {
    const totals = getJourneyTotals();
    elements.dayDetail.innerHTML = `
      <div class="detail-header">
        <div>
          <p class="section-kicker">Resumen de ruta</p>
          <h2 class="detail-title">Estructura general del viaje</h2>
          <p class="detail-subtitle">
            Un viaje circular equilibrado: cultura fuerte por la mañana, mar cuando se pueda
            y cambios de base contenidos para no vivir haciendo maletas.
          </p>
        </div>
      </div>
      <div class="fact-grid">
        <article class="fact-card">
          <span class="fact-label">Bases</span>
          <strong>5 paradas bien repartidas</strong>
          <p>Siracusa, Agrigento, Trapani, Palermo y Giardini Naxos / Letojanni.</p>
        </article>
        <article class="fact-card">
          <span class="fact-label">Kilómetros</span>
          <strong>~${totals.driveKm} km en coche</strong>
          <p>Con ~${totals.walkKm} km a pie acumulados en todo el viaje.</p>
        </article>
        <article class="fact-card">
          <span class="fact-label">Gasolina</span>
          <strong>~${totals.fuelCostEuro} €</strong>
          <p>Estimado con ${fuelAssumptions.litersPer100Km} L/100 km y ${fuelAssumptions.pricePerLiter.toFixed(2)} €/L.</p>
        </article>
        <article class="fact-card">
          <span class="fact-label">Clave final</span>
          <strong>Etna en versión contenida</strong>
          <p>Así el cierre en Taormina mantiene encanto y no se convierte en paliza.</p>
        </article>
      </div>
      <div class="detail-toolbar">
        <button class="mini-button js-open-tab" type="button" data-tab="map">Abrir mapa</button>
        <button class="mini-button js-open-tab" type="button" data-tab="places">Ver puntos</button>
        <button class="mini-button js-open-tab" type="button" data-tab="extras">Ver extras</button>
      </div>
      <div class="detail-grid">
        <section class="detail-section">
          <h3>Estructura de la ruta</h3>
          <ul>
            <li>4 noches en Siracusa funcionan muy bien para no castigar el arranque.</li>
            <li>1 noche en Agrigento evita una paliza absurda.</li>
            <li>Trapani es la mejor base global del noroeste para esta ruta.</li>
            <li>Final en Giardini Naxos / Letojanni es mejor que dormir dentro de Taormina.</li>
          </ul>
        </section>
        <section class="detail-section">
          <h3>Días a usar con más cabeza</h3>
          <ul>
            <li>24 junio: Ragusa + Modica ya justifican el día. Scicli solo si sobra mucha energía.</li>
            <li>1 julio: Cefalù mejor como paseo con baño corto que como media tarde larga.</li>
            <li>2 julio: Etna y Taormina caben juntos solo si el Etna se hace en modo suave.</li>
          </ul>
        </section>
        <section class="detail-section">
          <h3>Alertas operativas</h3>
          <ul>
            <li>Parking claro en Ortigia, Palermo y Taormina es más importante de lo que parece.</li>
            <li>Favignana y Etna conviene llevarlos medio decididos antes de viajar.</li>
            <li>Scala dei Turchi y algunas playas ganan si se usan como parada medida, no como objetivo total del día.</li>
          </ul>
        </section>
        <section class="detail-section">
          <h3>Antes de cerrar reservas</h3>
          <ul>
            <li>Confirmar bases con parking fiable o concertado.</li>
            <li>Comprar ferry de Favignana si ya tenéis clara la fecha.</li>
            <li>Decidir si el Etna será versión suave o con subida más completa.</li>
          </ul>
        </section>
      </div>
    `;
    return;
  }

  const placeButtons = day.focusPlaces.length
    ? day.focusPlaces
        .map((name) => {
          const place = places.find((entry) => normalize(entry.name) === normalize(name));
          if (!place) {
            return `<span class="badge badge-type">${escapeHtml(name)}</span>`;
          }
          return `<button class="badge badge-type js-focus-place" type="button" data-place-id="${place.id}">${escapeHtml(
            place.name
          )}</button>`;
        })
        .join("")
    : `<span class="badge badge-type">Sin puntos fijos</span>`;

  const metrics = dayMetrics[day.id] || { driveKm: 0, walkKm: 0 };
  const quickFacts = [
    { label: "Ritmo", value: day.pace },
    { label: "Base", value: day.base },
    { label: "Conducción", value: day.drive },
    { label: "Objetivo", value: day.mustDo[0] || "Mantener el día simple" },
    { label: "Km en coche", value: `~${metrics.driveKm} km` },
    { label: "Km a pie", value: `~${metrics.walkKm} km` },
  ];

  elements.dayDetail.innerHTML = `
    <div class="detail-header">
      <div>
        <p class="section-kicker">Día ${day.id} · ${escapeHtml(day.date)}</p>
        <h2 class="detail-title">${escapeHtml(day.title)}</h2>
        <p class="detail-subtitle">${escapeHtml(day.summary)}</p>
      </div>
      <div class="detail-tags">
        <span class="badge ${paceBadgeClass(day.pace)}">${escapeHtml(day.pace)}</span>
        <span class="badge badge-high">${escapeHtml(day.base)}</span>
      </div>
    </div>
    <div class="fact-grid">
      ${quickFacts
        .map(
          (fact) => `
            <article class="fact-card">
              <span class="fact-label">${escapeHtml(fact.label)}</span>
              <strong>${escapeHtml(fact.value)}</strong>
            </article>
          `
        )
        .join("")}
    </div>
    <div class="detail-toolbar">
      <button class="mini-button js-focus-day-map" type="button" data-day-id="${day.id}">Centrar día en mapa</button>
      <button class="mini-button js-open-tab" type="button" data-tab="places">Ver puntos del día</button>
      <button class="mini-button js-open-tab" type="button" data-tab="extras">Ver extras</button>
    </div>
    <div class="detail-grid">
      <section class="detail-section">
        <h3>Mañana</h3>
        ${renderAgendaList(day.morning, day)}
      </section>
      <section class="detail-section">
        <h3>Tarde / cierre</h3>
        ${renderAgendaList(day.afternoon, day)}
      </section>
      <section class="detail-section">
        <h3>Imprescindible hoy</h3>
        ${renderAgendaList(day.mustDo, day)}
      </section>
      <section class="detail-section">
        <h3>Si vais bien</h3>
        ${renderAgendaList(day.optional, day)}
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Logística y alertas</h3>
        <ul>
          ${day.notes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          <li><strong>Parking:</strong> ${escapeHtml(day.parking)}</li>
          <li><strong>Reservas / revisión previa:</strong> ${escapeHtml(day.booking)}</li>
        </ul>
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Criterio del día</h3>
        <p class="detail-copy">${escapeHtml(day.planB)}</p>
        <p class="detail-copy">${escapeHtml(day.summary)}</p>
      </section>
      <section class="detail-section detail-section-wide">
        <h3>Puntos del día</h3>
        <div class="detail-chip-list">
          ${placeButtons}
        </div>
      </section>
    </div>
  `;
}

function renderAdditions() {
  elements.additionList.innerHTML = additions
    .map(
      (addition) => `
        <article class="addition-card">
          <div class="base-meta">
            <strong>${escapeHtml(addition.name)}</strong>
            <span class="badge badge-type">${escapeHtml(addition.type)}</span>
          </div>
          <p>${escapeHtml(addition.why)}</p>
        </article>
      `
    )
    .join("");
}

function renderJourneySummary() {
  const totals = getJourneyTotals();
  elements.journeySummary.innerHTML = `
    <div class="fact-grid">
      <article class="fact-card">
        <span class="fact-label">Km en coche</span>
        <strong>~${totals.driveKm} km</strong>
        <p>Incluye traslados entre bases y movimientos diarios previstos.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Km a pie</span>
        <strong>~${totals.walkKm} km</strong>
        <p>Valor orientativo sumando centros históricos, yacimientos y paseos costeros.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Gasolina</span>
        <strong>~${totals.fuelCostEuro} €</strong>
        <p>Con ${totals.fuelLiters} L estimados para un turismo gasolina medio.</p>
      </article>
      <article class="fact-card">
        <span class="fact-label">Supuesto usado</span>
        <strong>${fuelAssumptions.litersPer100Km} L/100 km · ${fuelAssumptions.pricePerLiter.toFixed(2)} €/L</strong>
        <p>No incluye peajes, parking, ferris ni subidas especiales como Etna o teleféricos.</p>
      </article>
    </div>
    <p class="summary-note">
      El viaje se mantiene razonable para 14 días si conserváis la filosofía del plan:
      mañanas bien elegidas, tardes con margen y pocos cambios de base.
    </p>
  `;
}

function renderCriticalLogistics() {
  elements.criticalLogistics.innerHTML = `
    <div class="critical-grid">
      ${criticalLogistics
        .map(
          (item) => `
            <article class="critical-card">
              <div class="base-meta">
                <strong>${escapeHtml(item.title)}</strong>
                <span class="badge ${item.priority === "Alta" ? "badge-low" : "badge-medium"}">${escapeHtml(item.priority)}</span>
              </div>
              <p class="critical-type">${escapeHtml(item.type)}</p>
              <p>${escapeHtml(item.body)}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPlaces() {
  const filtered = getFilteredPlaces();
  elements.placeCount.textContent = `${filtered.length} puntos visibles`;

  if (!filtered.length) {
    elements.placeList.innerHTML = `<div class="empty-state">No hay resultados con los filtros actuales.</div>`;
  } else {
    elements.placeList.innerHTML = filtered
      .map(
        (place) => `
          <article class="place-card">
            <h3>${escapeHtml(place.name)}</h3>
            <p>${escapeHtml(place.address || "Sin dirección explícita en la lista")}</p>
            <div class="place-meta">
              <span class="badge ${badgeClass(place.priority)}">${escapeHtml(place.priority)}</span>
              <span class="badge badge-type">${escapeHtml(place.type)}</span>
              <span class="badge badge-type">${escapeHtml(place.zone)}</span>
            </div>
            <p>${escapeHtml(place.verdict)}</p>
            <div class="place-actions">
              <button class="text-button js-focus-place" type="button" data-place-id="${place.id}">
                Ver en el mapa
              </button>
              <a class="text-link" href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">
                Cómo llegar
              </a>
              <span class="place-coords">${place.lat.toFixed(3)}, ${place.lng.toFixed(3)}</span>
            </div>
          </article>
        `
      )
      .join("");
  }

  renderMapMarkers(filtered);
}

function getFilteredPlaces() {
  const selectedDay = days.find((day) => day.id === state.selectedDayId);
  const dayNameSet = selectedDay ? new Set(selectedDay.focusPlaces.map((name) => normalize(name))) : null;

  return places.filter((place) => {
    if (state.search) {
      const haystack = `${place.name} ${place.address} ${place.zone} ${place.type}`.toLowerCase();
      if (!haystack.includes(state.search.toLowerCase())) {
        return false;
      }
    }

    if (state.type !== "all" && place.type !== state.type) {
      return false;
    }

    if (state.priority !== "all" && place.priority !== state.priority) {
      return false;
    }

    if (state.zone !== "all" && place.zone !== state.zone) {
      return false;
    }

    if (dayNameSet && dayNameSet.size > 0) {
      return dayNameSet.has(place.normalized) || selectedDay.focusZones.includes(place.zone);
    }

    return true;
  });
}

function initMap() {
  if (typeof L === "undefined") {
    elements.mapFallback.hidden = false;
    return;
  }

  map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  routeLayer = L.layerGroup().addTo(map);
  renderRoute();
  renderMapMarkers(getFilteredPlaces());
}

function renderRoute() {
  if (!map || !routeLayer) {
    return;
  }

  routeLayer.clearLayers();
  const route = bases.map((base) => [base.lat, base.lng]);

  L.polyline(route, {
    color: "#cf6b2d",
    weight: 4,
    opacity: 0.8,
    dashArray: "8 10",
  }).addTo(routeLayer);

  bases.forEach((base) => {
    const marker = L.circleMarker([base.lat, base.lng], {
      radius: 7,
      color: "#fff8ef",
      weight: 2,
      fillColor: "#cf6b2d",
      fillOpacity: 0.95,
    })
      .bindPopup(`<div class="popup-title">${escapeHtml(base.area)}</div><div class="popup-meta">${escapeHtml(
        base.range
      )}<br>${base.nights} noches</div>`)
      .addTo(routeLayer);

    base._marker = marker;
  });

  map.fitBounds(route, { padding: [28, 28] });
}

function renderMapMarkers(filteredPlaces) {
  if (!map || !markerLayer) {
    return;
  }

  markerLayer.clearLayers();

  filteredPlaces.forEach((place) => {
    const selectedDay = days.find((day) => day.id === state.selectedDayId);
    const highlighted = selectedDay
      ? selectedDay.focusPlaces.some((name) => normalize(name) === place.normalized)
      : false;

    const marker = L.circleMarker([place.lat, place.lng], {
      radius: highlighted ? 9 : 6,
      color: "#fff8ef",
      weight: highlighted ? 2.5 : 1.5,
      fillColor: markerColor(place.priority),
      fillOpacity: highlighted ? 1 : 0.86,
    })
      .bindPopup(`
        <div class="popup-title">${escapeHtml(place.name)}</div>
        <div class="popup-meta">
          ${escapeHtml(place.type)} · ${escapeHtml(place.zone)}<br>
          ${escapeHtml(place.verdict)}
        </div>
        <div class="popup-meta" style="margin-top:8px;">
          <a href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
        </div>
      `)
      .addTo(markerLayer);

    place._marker = marker;
  });

  if (filteredPlaces.length) {
    const bounds = L.latLngBounds(filteredPlaces.map((place) => [place.lat, place.lng]));
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: state.selectedDayId ? 11 : 8 });
  } else {
    renderRoute();
  }
}

function bindEvents() {
  elements.sideTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSideTab(button.dataset.sideTab, { scroll: window.innerWidth <= 1120 });
    });
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    renderPlaces();
  });

  elements.typeFilter.addEventListener("change", (event) => {
    state.type = event.target.value;
    renderPlaces();
  });

  elements.priorityFilter.addEventListener("change", (event) => {
    state.priority = event.target.value;
    renderPlaces();
  });

  elements.zoneFilter.addEventListener("change", (event) => {
    state.zone = event.target.value;
    renderPlaces();
  });

  elements.dayList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-day-id]");
    if (!card) {
      return;
    }

    const dayId = Number.parseInt(card.dataset.dayId, 10);
    state.selectedDayId = dayId;
    renderDayList();
    renderDayDetail();
    renderPlaces();

    if (state.selectedDayId && window.innerWidth <= 1120) {
      requestAnimationFrame(() => {
        elements.dayDetail.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  document.body.addEventListener("click", (event) => {
    const tabButton = event.target.closest(".js-open-tab");
    if (tabButton) {
      setActiveSideTab(tabButton.dataset.tab, { scroll: true });
      return;
    }

    const dayMapButton = event.target.closest(".js-focus-day-map");
    if (dayMapButton) {
      const day = days.find((entry) => entry.id === Number.parseInt(dayMapButton.dataset.dayId, 10));
      if (day) {
        setActiveSideTab("map", { scroll: true });
        focusDayInMap(day);
      }
      return;
    }

    const baseButton = event.target.closest(".js-focus-base");
    if (baseButton) {
      const base = bases.find((entry) => entry.id === baseButton.dataset.baseId);
      if (base) {
        setActiveSideTab("map", { scroll: true });
        focusBaseInMap(base);
      }
      return;
    }

    const button = event.target.closest(".js-focus-place");
    if (!button) {
      const mapButton = event.target.closest(".js-item-map");
      const gmapsLink = event.target.closest(".js-item-gmaps");
      if (mapButton) {
        const day = days.find((entry) => entry.id === Number.parseInt(mapButton.dataset.dayId, 10));
        if (!day) {
          return;
        }
        setActiveSideTab("map", { scroll: true });
        const place = getTargetPlaceForItem(mapButton.dataset.itemText, day);
        if (place) {
          focusPlaceInMap(place);
        } else {
          focusDayInMap(day);
        }
        return;
      }
      if (gmapsLink) {
        return;
      }
      return;
    }

    const place = places.find((entry) => entry.id === button.dataset.placeId);
    if (!place || !place._marker || !map) {
      return;
    }
    setActiveSideTab("map", { scroll: true });
    focusPlaceInMap(place);
  });

  elements.printButton.addEventListener("click", () => window.print());

  elements.overviewButton.addEventListener("click", () => {
    state.selectedDayId = null;
    state.activeSideTab = "map";
    state.search = "";
    state.type = "all";
    state.priority = "all";
    state.zone = "all";
    elements.searchInput.value = "";
    elements.typeFilter.value = "all";
    elements.priorityFilter.value = "all";
    elements.zoneFilter.value = "all";
    renderSideTabs();
    renderDayList();
    renderDayDetail();
    renderPlaces();
    renderRoute();
  });
}

function getOverviewDay() {
  return { id: "overview" };
}

function badgeClass(priority) {
  if (priority === "Imprescindible") {
    return "badge-high";
  }
  if (priority === "Revisar") {
    return "badge-low";
  }
  return "badge-medium";
}

function paceBadgeClass(pace) {
  if (pace === "Suave" || pace === "Muy suave") {
    return "badge-medium";
  }
  if (pace === "Cargado" || pace === "Delicado") {
    return "badge-low";
  }
  return "badge-high";
}

function getDirectionsUrl(place) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${place.lat},${place.lng}`)}`;
}

function getJourneyTotals() {
  const totals = Object.values(dayMetrics).reduce(
    (acc, item) => {
      acc.driveKm += item.driveKm;
      acc.walkKm += item.walkKm;
      return acc;
    },
    { driveKm: 0, walkKm: 0 }
  );

  const fuelLiters = (totals.driveKm * fuelAssumptions.litersPer100Km) / 100;
  const fuelCostEuro = fuelLiters * fuelAssumptions.pricePerLiter;

  return {
    ...totals,
    fuelLiters: Math.round(fuelLiters),
    fuelCostEuro: Math.round(fuelCostEuro),
  };
}

function renderAgendaList(items, day) {
  return `
    <ul class="detail-list">
      ${items
        .map((item) => {
          const place = getTargetPlaceForItem(item, day);
          return `
            <li class="detail-line">
              <span class="detail-line-text">${escapeHtml(item)}</span>
              <span class="detail-item-actions">
                <button class="mini-button js-item-map" type="button" data-day-id="${day.id}" data-item-text="${escapeHtml(item)}">
                  Mapa
                </button>
                ${
                  place
                    ? `<a class="mini-link js-item-gmaps" href="${escapeHtml(getDirectionsUrl(place))}" target="_blank" rel="noopener noreferrer">Cómo llegar</a>`
                    : ""
                }
              </span>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function getTargetPlaceForItem(itemText, day) {
  const normalizedItem = normalize(itemText);
  const dayCandidates = day.focusPlaces
    .map((name) => places.find((entry) => normalize(entry.name) === normalize(name)))
    .filter(Boolean);

  const aliasMap = {
    "fonte aretusa": "arethusa spring",
    "mercado de ortigia": "antiguo mercado de ortigia",
    "mercado": "antiguo mercado de ortigia",
    "teatro griego": "parque arqueologico de neapolis",
    "orecchio di dionisio": "parque arqueologico de neapolis",
    "anfiteatro romano": "parque arqueologico de neapolis",
    "corso vittorio emanuele": "noto",
    "duomo di san pietro": "duomo di san pietro apostolo",
    "dulces locales": "erice",
    "salinas": "trapani",
    "teatro greco": "teatro de taormina",
    "corso": "teatro de taormina",
    "playa": "spiaggia di cefalu",
  };

  const aliasTarget = aliasMap[normalizedItem];
  if (aliasTarget) {
    const aliasPlace = places.find((entry) => entry.normalized === aliasTarget);
    if (aliasPlace) {
      return aliasPlace;
    }
  }

  for (const place of dayCandidates) {
    if (normalizedItem === place.normalized) {
      return place;
    }
    if (normalizedItem.includes(place.normalized) || place.normalized.includes(normalizedItem)) {
      return place;
    }
  }

  return dayCandidates[0] || null;
}

function focusPlaceInMap(place) {
  if (!place || !place._marker || !map) {
    return;
  }

  map.setView([place.lat, place.lng], 13, { animate: true });
  place._marker.openPopup();
  pulseMapPanel();
  ensureMapVisible();
}

function focusBaseInMap(base) {
  if (!base || !base._marker || !map) {
    return;
  }

  map.setView([base.lat, base.lng], 9, { animate: true });
  base._marker.openPopup();
  pulseMapPanel();
  ensureMapVisible();
}

function focusDayInMap(day) {
  if (!map || !markerLayer) {
    return;
  }
  const normalizedFocusPlaces = new Set(day.focusPlaces.map((name) => normalize(name)));
  const filtered = places.filter(
    (place) => day.focusZones.includes(place.zone) || normalizedFocusPlaces.has(place.normalized)
  );
  if (filtered.length) {
    const bounds = L.latLngBounds(filtered.map((place) => [place.lat, place.lng]));
    map.fitBounds(bounds, { padding: [34, 34], maxZoom: 11 });
    pulseMapPanel();
    ensureMapVisible();
  }
}

function pulseMapPanel() {
  if (!elements.mapPanel) {
    return;
  }
  elements.mapPanel.classList.remove("flash-panel");
  void elements.mapPanel.offsetWidth;
  elements.mapPanel.classList.add("flash-panel");
  window.setTimeout(() => elements.mapPanel.classList.remove("flash-panel"), 900);
}

function ensureSidePanelVisible() {
  if (!elements.mapPanel) {
    return;
  }
  const rect = elements.mapPanel.getBoundingClientRect();
  const visibleEnough = rect.top >= 0 && rect.top < window.innerHeight * 0.55;
  if (!visibleEnough || window.innerWidth <= 1120) {
    elements.mapPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function ensureMapVisible() {
  setActiveSideTab("map");
  ensureSidePanelVisible();
}

function markerColor(priority) {
  if (priority === "Imprescindible") {
    return "#16697a";
  }
  if (priority === "Revisar") {
    return "#933c24";
  }
  return "#647a58";
}

function uniqueValues(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "es"));
}

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
