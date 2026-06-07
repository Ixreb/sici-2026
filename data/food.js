// Comer bien y barato por zonas: platos típicos, sitios calidad-precio,
// mercados y street food, desayunos y meriendas. Precios orientativos y
// MODESTOS (Sicilia 2026). Pareja sin alcohol (granita, latte di mandorla,
// spremuta). Sitios verificados con investigación; reconfirmar aperturas y
// horarios in situ (muchos cierran 1 día/semana o solo abren a mediodía).

export const foodTips = [
  "Menù del giorno / fisso a mediodía: la mejor relación calidad-precio (varios platos por ~12-18 €).",
  "Come donde hay locales y carta corta del día. Huye de cartas plastificadas con fotos y 'menú turístico' junto a los monumentos.",
  "Tavola calda / rosticceria / friggitoria: comer rico y barato de pie (arancini, panelle, pizzette) por 3-6 €.",
  "Desayuno siciliano de verano: granita + brioche col tuppo (~3-4 €). Mucho mejor con calor que el dulce-café.",
  "Mercados (Ortigia, Ballarò/Capo en Palermo, Pescheria en Catania): el mejor street food y a precio local. Lleva efectivo.",
  "Pescado fresco 'al peso': pregunta SIEMPRE el precio por etto (100 g) antes de pedir; es donde se dispara la cuenta.",
  "El 'coperto' (1,5-3 €/persona) es normal. Sin alcohol: acqua, spremuta d'arancia, latte di mandorla o chinotto; la granita además hidrata.",
];

export const foodZones = [
  {
    zona: "Siracusa · Ortigia",
    dias: "Días 1-2",
    platos: [
      "Pasta con le sarde (sardina, hinojo, pasas, piñones) — ~10-13 €",
      "Sarde a beccafico o caponata (para empezar) — ~6-10 €",
      "Spaghetti ai ricci (erizo, en temporada) o pesce spada — ~14-18 €",
    ],
    sitios: [
      { nombre: "Caseificio Borderi", tipo: "Mercado · bocadillos", plato: "Bocadillo gigante a medida (quesos y embutidos)", precio: "~6-10 €" },
      { nombre: "Fratelli Burgio", tipo: "Mercado · con mesas", plato: "Tagliere mixto tierra-mar (menos cola que Borderi)", precio: "~12-20 €/2 pers." },
      { nombre: "Trattoria La Foglia", tipo: "Trattoria casera", plato: "Sarde a beccafico, pasta siracusana", precio: "primi ~10-13 €" },
    ],
    mercado: "Mercato di Ortigia (mañanas lun-sáb): el mejor street food de la zona. Borderi (ve antes de las 10:30 por la cola) y Fratelli Burgio.",
    desayuno: "Granita (limón femminello, almendra) + brioche col tuppo en Caffè Apollo — ~3,5-5 €.",
    merienda: "Cannolo relleno al momento o granita por el Lungomare — ~2,5-3,5 €.",
    aviso: "Evita los menús turísticos de Piazza Duomo y el Lungomare: come una calle hacia dentro.",
  },
  {
    zona: "Noto · Marzamemi",
    dias: "Día 3",
    platos: [
      "GRANITA de Noto (almendra, mandarino, mora): el desayuno estrella del viaje — ~2,5-4 €",
      "Ravioli de ricotta al ragù de cerdo (Noto) — ~10-12 €",
      "Marzamemi: linguine al gambero rosso o atún — ~14-16 €",
    ],
    sitios: [
      { nombre: "Caffè Costanzo (Noto)", tipo: "Pastelería histórica", plato: "Granita (mejor calidad-precio del Corso)", precio: "~3,5-5 €" },
      { nombre: "Caffè Sicilia (Noto)", tipo: "Pastelería de culto", plato: "Granita de Corrado Assenza (la mejor; algo más cara)", precio: "~4-6 €" },
      { nombre: "Trattoria L'Approdo (Marzamemi)", tipo: "Pescado asequible", plato: "Pasta de gambero/atún", precio: "~20-30 €" },
    ],
    mercado: "",
    desayuno: "Granita + brioche en Caffè Costanzo (calidad-precio) o Caffè Sicilia (la mejor) — Corso V. Emanuele, Noto.",
    merienda: "Helado artesano o un dolce di mandorla en el Corso de Noto — ~3 €.",
    aviso: "En Marzamemi pregunta el precio del pescado 'al etto'; la piazza concentra los precios altos. (Crocifisso, en Noto, es estrella Michelin ~135 €: fuera de plan.)",
  },
  {
    zona: "Ragusa Ibla · Modica",
    dias: "Días 3-4",
    platos: [
      "Scacce ragusane (focaccia fina enrollada y rellena) — ~3-5 €",
      "Lolli con le fave o pasta fresca iblea; caciocavallo ragusano — ~9-12 €",
      "Modica: cioccolato di Modica y 'mpanatigghi (empanadilla dulce) — ~2-5 €",
    ],
    sitios: [
      { nombre: "Trattoria La Bettola (Ibla)", tipo: "Trattoria casera", plato: "Cocina iblea, raciones generosas", precio: "primi ~5-8 € · secondi 7-10 €" },
      { nombre: "That's a Moro (Ibla)", tipo: "Trattoria", plato: "Comida local + ambiente, buen precio", precio: "~25-35 €" },
      { nombre: "Antica Dolceria Bonajuto (Modica)", tipo: "Obrador histórico (1880)", plato: "Chocolate de Modica y 'mpanatigghi", precio: "tableta ~3-5 €" },
    ],
    mercado: "Scacce en Hybla Street Food o Cantunera (Ibla) y en panaderías de Modica — ~3-5 €.",
    desayuno: "Granita + brioche en un bar de Piazza Duomo (Ibla) — ~3,5-5 €.",
    merienda: "Gelato artesano en Gelati DiVini (frente al Duomo de Ibla) o chocolate de Bonajuto (Modica) — ~3-5 €.",
    aviso: "Ibla es zona de alta cocina (Duomo de Sultano 3★, 100 €+). Para calidad-precio: La Bettola, That's a Moro o scacce. (I Banchi, de Sultano, tiene menú del día ~29 € si os apetece un capricho.)",
  },
  {
    zona: "Agrigento · San Leone",
    dias: "Días 4-5",
    platos: [
      "Pasta cô niuru di siccia (tinta de sepia) o con tenerumi — ~9-13 €",
      "Frittura di paranza / calamari fritti — ~10-14 €",
      "Pescado a la brasa en San Leone (zona de playa) — ~14-18 €",
    ],
    sitios: [
      { nombre: "Trattoria Concordia", tipo: "Trattoria familiar (casco)", plato: "Pescado fresco y pasta tradicional", precio: "~25-35 €" },
      { nombre: "Osteria Ninin", tipo: "Osteria", plato: "Cocina de mar y de tierra tradicional", precio: "~25-35 €" },
    ],
    mercado: "Sin gran mercado callejero: rosticcerie de Via Atenea y chioschi del lungomare de San Leone para arancini, panelle y cudduruni — ~1,5-4 €.",
    desayuno: "Granita + brioche col tuppo en Caffè Concordia (Piazza Pirandello, desde 1948) — ~3-5 €.",
    merienda: "Cassatella/raviola alla ricotta (frita) o gelo di melone en verano — ~1,5-2,5 €.",
    aviso: "Evita los restaurantes con vistas a los Templos y la primera línea de San Leone (sobreprecio). Come en el casco o calles interiores.",
  },
  {
    zona: "Trapani · Erice · Favignana",
    dias: "Días 6-8",
    platos: [
      "Cous cous di pesce trapanés (la estrella local) — ~13-18 €",
      "Busiate al pesto trapanese (almendra, tomate, ajo, albahaca) — ~9-13 €",
      "Pane cunzato (pan, tomate, anchoa, primo sale, orégano, aceite) — ~4-6 €",
      "Erice: genovese caliente (crema); Favignana: atún (tonno) — ~2-3 € / ~12-20 €",
    ],
    sitios: [
      { nombre: "Cantina Siciliana (Trapani)", tipo: "Trattoria histórica", plato: "Cous cous di pesce, busiate", precio: "~25-40 €" },
      { nombre: "Pizzeria Calvino (Trapani)", tipo: "Pizzería de barrio", plato: "Pizza trapanese / rianata (cena barata)", precio: "~10-15 €" },
      { nombre: "Maria Grammatico (Erice)", tipo: "Pastelería legendaria", plato: "Genovese caliente y dulces de almendra", precio: "~2-3 €/pieza" },
      { nombre: "Panificio Costanza / Er Paninaro (Favignana)", tipo: "Street food", plato: "Panino col tonno, pane cunzato", precio: "~6-8 €" },
    ],
    mercado: "Mercato del Pesce de Trapani (solo mañanas): pescado fresquísimo; cerca, Panificio Oddo para arancine (~1,5 €). En Marinella di Selinunte (día 6), pane cunzato + granita en un chiosco, o Trattoria Casa Mia si paráis a comer.",
    desayuno: "Granita di mandorla + brioche en Antica Pasticceria Colicchia (Trapani, desde 1885); en Erice, café con genovese caliente; en Favignana, brioche en granita en Caffè Aegusa — ~3-5 €.",
    merienda: "Genovese de Erice o cassatelle trapanesas; latte di mandorla frío — ~2-3 €.",
    aviso: "En el lungomare de Trapani y el puerto de Favignana confirma el precio del pescado 'al etto'. La Bettolaccia (Trapani) y La Bettola (Favignana) son alternativas de pescado muy fiables.",
  },
  {
    zona: "Palermo",
    dias: "Días 9-10",
    platos: [
      "Pane câ meusa (pan con bazo) — ~3-4 €",
      "Panelle e crocchè (tortita de garbanzo + croqueta de patata) — ~1,5-3,5 €",
      "Sfincione (focaccia esponjosa: tomate, cebolla, anchoa) — ~1,5-2,5 €",
      "Arancina (femenino aquí) y pasta con le sarde — ~2-3,5 € / ~10-12 €",
    ],
    sitios: [
      { nombre: "Mercato di Ballarò", tipo: "Mercado · street food", plato: "Panelle, sfincione, stigghiola, fruta", precio: "~1,5-5 €" },
      { nombre: "Friggitoria Chiluzzo (Kalsa)", tipo: "Friggitoria de barrio", plato: "Panino de panelle recién fritas", precio: "~2-3 €" },
      { nombre: "Nni Franco u' Vastiddaru", tipo: "Paninoteca (Corso V. Emanuele)", plato: "Pane ca' meusa y pane e panelle", precio: "~3-5 €" },
    ],
    mercado: "Ballarò (el más local y barato, 8-12h) y Capo (las mejores panelle e crocchè). Vucciria, de noche, para stigghiola y ambiente. De pie por 5-7 €/persona; lleva efectivo.",
    desayuno: "Brioche col tuppo + granita; o un iris (brioche frito relleno de ricotta) — ~3-4 €.",
    merienda: "Cannolo relleno al momento (nunca pre-relleno), cassata o gelo di mellone; latte di mandorla — ~2,5-4 €.",
    aviso: "Dentro de Ballarò/Capo evita los puestos 'vistosos' del borde turístico (arancine recalentadas al doble): compra donde haya cola de locales.",
  },
  {
    zona: "Cefalù",
    dias: "Día 11",
    platos: [
      "Coppo de fritura (calamar/gambas) o pane e panelle — ~3-6 €",
      "Pasta con le sarde o involtini di pesce spada — ~10-14 €",
      "Arancino para el camino — ~2-3 €",
    ],
    sitios: [
      { nombre: "Sfizi Nostrani", tipo: "Street food (centro)", plato: "Panelle calientes y coppo de pescado frito", precio: "~3-6 €" },
      { nombre: "La Brace", tipo: "Bracería tradicional", plato: "Involtini di pesce spada", precio: "~20-30 €" },
    ],
    mercado: "Street food en el centro histórico (Sfizi Nostrani y similares): arancine, sfincione y coppo frito — ~3-6 €.",
    desayuno: "Granita + brioche con vistas a la catedral (Bar Duomo, Piazza del Duomo) — ~3 €.",
    merienda: "Cannoli, cassate y cartocci (espiral de brioche con ricotta) en L'Angolo delle Dolcezze — ~2,5-4 €.",
    aviso: "Las terrazas del lungomare y Piazza Duomo cobran la vista: come una calle hacia dentro.",
  },
  {
    zona: "Catania · Taormina",
    dias: "Días 11-13",
    platos: [
      "Pasta alla Norma (tomate, berenjena frita, ricotta salada) — ~8-12 €",
      "Arancino (masculino aquí; al ragú o alla catanese) — ~2-3,5 €",
      "Pescado del mercato / frittura di paranza — ~9-14 €",
      "Pistacho de Bronte: granita o gelato — ~3-5 €",
    ],
    sitios: [
      { nombre: "Osteria Antica Marina", tipo: "Osteria en La Pescheria", plato: "Pescado del día, frittura, spaghetti ai ricci", precio: "platos ~9-20 €" },
      { nombre: "Trattoria de Norma del centro (Catania)", tipo: "Trattoria", plato: "Pasta alla Norma", precio: "~10-12 €" },
      { nombre: "Aci Trezza / Aci Castello (día 13)", tipo: "Pescado frente al mar", plato: "Pescado y marisco a buen precio", precio: "~15-20 €/pers." },
    ],
    mercado: "La Pescheria de Catania (mañanas, junto a Piazza Duomo): ostras al momento (1-2 €), cuoppo de fritura (~5-7 €), parmigiana di spada. Comer barato y auténtico en los puestos del entorno.",
    desayuno: "El ritual catanés: GRANITA (almendra/pistacho) + brioche col tuppo en Pasticceria Savia (1897) o Spinella — ~3 €.",
    merienda: "Cannolo o granita de pistacho de Bronte; latte di mandorla frío — ~2,5-4 €.",
    aviso: "Taormina es cara y turística (el Corso Umberto cobra por sentarse y por la vista). Allí toma solo una granita/gelato de pistacho (Bam Bar, Novè) o un arancino (Da Cristina); reserva las comidas para Catania o Aci Trezza.",
  },
];
