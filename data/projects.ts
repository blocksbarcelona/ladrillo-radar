export type Platform = "Civislend" | "Urbanitae" | "wecity";
export type Risk = "Medio" | "Medio-alto" | "Alto" | "Muy alto";
export type Severity = "Crítica" | "Alta" | "Media";
export type DocumentStatus =
  | "Disponible en la plataforma"
  | "Acceso restringido"
  | "No localizado";

export const SNAPSHOT_DATE = "2026-07-21";
export const SNAPSHOT_LABEL = "21 JUL 2026";

export const platformMeta: Record<
  Platform,
  { logo: string; legalName: string; register: string }
> = {
  Civislend: {
    logo: "logos/civislend.svg",
    legalName: "CIVISLEND PSFP, S.A.",
    register: "PSFP inscrita en CNMV · nº 8",
  },
  Urbanitae: {
    logo: "logos/urbanitae.svg",
    legalName: "Urbanitae Real Estate Platform, S.L.",
    register: "PSFP inscrita en CNMV · nº 4",
  },
  wecity: {
    logo: "logos/wecity.png",
    legalName: "Cityprive PFP, S.L.",
    register: "PSFP inscrita en CNMV · nº 9",
  },
};

export type Project = {
  id: string;
  platform: Platform;
  name: string;
  location: string;
  date: {
    isoDateTime: string;
    label: string;
    type: string;
    note: string;
  };
  status: string;
  score: number;
  risk: Risk;
  returnLabel: string;
  term: string;
  size: string;
  ltv: string;
  guarantee: string;
  promoter: string;
  progress: string;
  exit: string;
  verdict: string;
  strengths: string[];
  watch: string[];
  facts: Array<{ label: string; value: string; note?: string }>;
  company: {
    publicName: string;
    legalName: string;
    identity: string;
    profile: string;
    trackRecord: string;
    alignment: string;
    caveat: string;
  };
  deficiencies: Array<{
    severity: Severity;
    title: string;
    detail: string;
    impact: string;
    verify: string;
  }>;
  inconsistencies: Array<{
    title: string;
    published: string;
    calculation: string;
    reading: string;
  }>;
  documents: Array<
    | {
        name: string;
        status: Exclude<DocumentStatus, "No localizado">;
        note: string;
        url: string;
      }
    | {
        name: string;
        status: "No localizado";
        note: string;
        url?: never;
      }
  >;
  questions: string[];
  sources: Array<{
    label: string;
    url: string;
    type: "Primaria" | "Normativa" | "Corporativa";
    note: string;
  }>;
};

export const projects: Project[] = [
  {
    id: "toboso-madrid",
    platform: "Civislend",
    name: "Toboso Madrid",
    location: "Carabanchel · Madrid",
    date: {
      isoDateTime: "2026-07-23T12:00:00+02:00",
      label: "23 jul 2026 · 12:00 CEST",
      type: "Apertura",
      note: "Apertura publicada por Civislend. En el corte del análisis todavía no había pasado.",
    },
    status: "Apertura programada",
    score: 6.5,
    risk: "Medio-alto",
    returnLabel: "10% TIN · 17,5% total",
    term: "21 meses · +6 de prórroga",
    size: "1,20 M€ · 2,175 M€ total",
    ltv: "63,8% sobre HET final",
    guarantee: "Hipoteca 1er rango + prenda SPV",
    promoter: "868.059 € previstos",
    progress: "Solar · licencia declarada de 2022",
    exit: "Venta de 9 viviendas, 5 garajes y local",
    verdict:
      "La opción preferible entre los proyectos de Civislend analizados, condicionada a acreditar la vigencia de la licencia y la protección real de los inversores tras liberar las unidades de la permuta.",
    strengths: [
      "LTV HET calculado del 63,8% sobre los activos que quedarían hipotecados al final.",
      "Hipoteca de primer rango y prenda de las participaciones de la sociedad vehículo.",
      "Plazo de 21 meses, más seis de prórroga al mismo TIN, con margen operativo mayor que los proyectos más cortos.",
    ],
    watch: [
      "Debe probarse que la licencia concedida en abril de 2022 sigue plenamente vigente.",
      "La garantía final excluye cinco viviendas y dos garajes entregados en permuta.",
      "No se publican preventas y 200.000 € de la primera disposición liberan fondos del promotor.",
      "Promotor y constructor pertenecen al mismo grupo; hace falta control independiente de costes.",
    ],
    facts: [
      { label: "Activo", value: "14 viviendas · 7 garajes · 1 local" },
      { label: "Superficie", value: "1.228 m² construidos · 912 m² residenciales" },
      { label: "Parcela", value: "326 m² · planta baja + 4 alturas" },
      { label: "Licencia", value: "Abril de 2022, según Civislend", note: "La vigencia y las eventuales prórrogas no están acreditadas en abierto." },
      { label: "Préstamo total", value: "2.175.000 €" },
      { label: "Primer tramo", value: "1.200.000 €" },
      { label: "Primera disposición", value: "323.754 €", note: "200.000 € liberan fondos del promotor y 123.610 € cubren formalización." },
      { label: "Tasación actual", value: "1.491.949 € / 1.494.949 €", note: "Hay una diferencia de 3.000 € entre documentos." },
      { label: "HET garantía final", value: "3.406.586 €" },
      { label: "LTV HET calculado", value: "63,8%" },
      { label: "Aportación promotor", value: "868.059 € total · 323.610 € a firma" },
      { label: "Pago", value: "Capital e intereses al vencimiento · amortización anticipada desde mes 9" },
      { label: "Entrada mínima", value: "250 €" },
      { label: "Comercialización", value: "Sin preventas publicadas" },
    ],
    company: {
      publicName: "Grupo Index",
      legalName: "Proyectos y Soluciones Promonagon, S.L. · CIF B87093720",
      identity:
        "La sociedad promotora figura con domicilio en Calle Henri Dunant 17, Madrid. Civislend la presenta como parte de Grupo Index.",
      profile:
        "Grupo promotor y constructor residencial. La plataforma declara más de 2.000 viviendas entregadas.",
      trackRecord:
        "El volumen agregado publicado es relevante, pero la auditoría no dispone de una relación normalizada de proyectos comparables con costes, plazos y resultados finales.",
      alignment:
        "Se anuncia una aportación total de 868.059 €, aunque sólo 323.610 € aparecen previstos en la firma y no se ve un calendario vinculante para el resto.",
      caveat:
        "Promotor y constructor son partes relacionadas. Conviene exigir certificación independiente, control de precios intragrupo y trazabilidad de cualquier desviación.",
    },
    deficiencies: [
      {
        severity: "Crítica",
        title: "Vigencia de la licencia no acreditada",
        detail:
          "Civislend indica que la licencia se obtuvo en abril de 2022. La documentación visible no prueba el inicio en plazo, una prórroga ni la vigencia administrativa actual.",
        impact:
          "Una incidencia urbanística puede retrasar o impedir el inicio de obra y comprometer el calendario de venta y repago.",
        verify:
          "Certificado municipal o dictamen jurídico que confirme expresamente la vigencia, los hitos cumplidos y las prórrogas, si existen.",
      },
      {
        severity: "Crítica",
        title: "La permuta reduce la garantía final",
        detail:
          "Al constituirse la propiedad horizontal se liberarán cinco de las catorce viviendas y dos de los siete garajes para atender la permuta del solar.",
        impact:
          "La hipoteca dejará de recaer sobre el edificio completo. La cobertura real debe analizarse sólo sobre nueve viviendas, cinco garajes y el local.",
        verify:
          "Escritura de permuta, garantía concedida al transmitente, tasación desglosada de las unidades retenidas y ausencia de condición resolutoria preferente.",
      },
      {
        severity: "Alta",
        title: "Aportación propia sin calendario visible",
        detail:
          "Se publican 868.059 € de fondos del promotor, pero en la firma sólo se identifican 323.610 €.",
        impact:
          "Si la aportación restante llega después de la deuda, el colchón real y la alineación son menores de lo que sugiere la cifra total.",
        verify:
          "Calendario vinculante de desembolsos propios, subordinados a los inversores y previos a cada disposición adicional.",
      },
      {
        severity: "Alta",
        title: "Sin preventas publicadas",
        detail:
          "La devolución depende de construir y vender en un máximo de 27 meses, pero no se informan reservas ni contratos de arras.",
        impact:
          "La falta de tracción comercial aumenta el riesgo de extensión, descuentos y refinanciación.",
        verify:
          "Plan comercial, precios por unidad, reservas verificables y límites de disposición ligados a hitos de preventa.",
      },
      {
        severity: "Media",
        title: "Operaciones con partes vinculadas",
        detail:
          "Promotor y constructor pertenecen al mismo grupo, lo que reduce la independencia en presupuestos, certificaciones y márgenes.",
        impact:
          "Un sobreprecio o una desviación puede trasladar valor fuera de la sociedad prestataria.",
        verify:
          "Contrato cerrado, comparables de mercado y monitor de obra independiente con control de coste a terminación.",
      },
    ],
    inconsistencies: [
      {
        title: "Dos cifras de tasación actual",
        published: "1.491.949 € en una pieza y 1.494.949 € en otra.",
        calculation: "Diferencia = 3.000 €",
        reading: "El efecto en el riesgo es pequeño, pero evidencia falta de control documental y debe corregirse.",
      },
      {
        title: "LTV de la garantía final",
        published: "HET de 3.406.586 € para los activos hipotecados tras la permuta.",
        calculation: "2.175.000 / 3.406.586 = 63,8%",
        reading: "La cobertura nominal es 1.231.586 € antes de intereses, costes y descuentos de ejecución.",
      },
      {
        title: "Aportación al 50/50 en la firma",
        published: "323.610 € del promotor frente a 323.754 € de disposición Civislend.",
        calculation: "Diferencia = 144 €",
        reading: "La diferencia es irrelevante, pero el 50/50 sólo describe la firma; no el conjunto de la financiación.",
      },
      {
        title: "Uso de la primera disposición",
        published: "323.754 € computados como primera disposición.",
        calculation: "200.000 € liberación + 123.610 € formalización",
        reading: "La mayor parte no financia obra nueva: devuelve o libera capital ya adelantado por el promotor.",
      },
    ],
    documents: [
      { name: "Licencia de obras", status: "Acceso restringido", note: "Documento oficial en Civislend; falta acreditar su vigencia actual.", url: "https://www.civislend.com/document/254937" },
      { name: "Nota simple / información registral", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/254946" },
      { name: "Tasación", status: "Acceso restringido", note: "Debe revisarse el desglose final de las unidades que permanecen hipotecadas.", url: "https://www.civislend.com/document/254949" },
      { name: "Planos", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/254952" },
      { name: "Dossier del promotor", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/254955" },
      { name: "Ficha de datos fundamentales", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255534" },
      { name: "Informe de riesgos", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255540" },
      { name: "Teaser", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255543" },
      { name: "Estudio de mercado", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255549" },
      { name: "Estudio económico", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255552" },
    ],
    questions: [
      "¿Puede un certificado municipal o dictamen jurídico confirmar que la licencia de abril de 2022 sigue vigente?",
      "¿Qué valor atribuye la tasación a las nueve viviendas, cinco garajes y local que quedarán hipotecados?",
      "¿La escritura de permuta descarta una condición resolutoria o preferencia que perjudique a los inversores?",
      "¿Cuándo y bajo qué condiciones se aportarán los 544.449 € de fondos propios que no aparecen en la firma?",
      "¿Qué controles independientes se aplicarán al contrato entre promotor y constructor vinculados?",
      "¿Qué hitos de preventa limitarán las disposiciones posteriores?",
    ],
    sources: [
      {
        label: "Civislend · Toboso Madrid",
        url: "https://www.civislend.com/proyecto/963",
        type: "Primaria",
        note: "Página del proyecto, cifras de la operación y acceso a la documentación oficial enlazada en esta ficha.",
      },
      {
        label: "BOE · Ley 9/2001 del Suelo de la Comunidad de Madrid",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2001-18984#a158",
        type: "Normativa",
        note: "Marco general de caducidad y plazos de las licencias; la situación concreta requiere confirmación municipal.",
      },
    ],
  },
  {
    id: "residencial-mas-marti",
    platform: "Civislend",
    name: "Residencial Mas Martí",
    location: "Tordera · Barcelona",
    date: {
      isoDateTime: "2026-07-21T12:00:00+02:00",
      label: "21 jul 2026 · 12:00 CEST",
      type: "Apertura",
      note: "Apertura publicada por Civislend. El radar cambia automáticamente su estado al alcanzarse la hora indicada.",
    },
    status: "Apertura en el corte",
    score: 5.5,
    risk: "Medio-alto",
    returnLabel: "11% TIN · 11% total",
    term: "12 meses · +6 de prórroga",
    size: "1,98 M€",
    ltv: "42,0% sobre HET corregido",
    guarantee: "Hipoteca 1er rango tras cancelar la previa",
    promoter: "1,548 M€ aportados",
    progress: "80% de obra declarado · sin preventas",
    exit: "Venta de 19 viviendas y anexos",
    verdict:
      "Invertible sólo de forma condicionada y con posición moderada. La garantía es sólida si la tasación correcta es 4,716 M€, pero la ausencia de preventas, la refinanciación de deuda y las contradicciones documentales reducen la confianza.",
    strengths: [
      "La tasación HET archivada de 4.715.784,87 € produce la mejor cobertura hipotecaria entre los proyectos de Civislend analizados.",
      "Se declara un 80% de obra ejecutada y una aportación del promotor de 1.548.130 €.",
      "Los nueve documentos principales están disponibles mediante sus enlaces oficiales y permiten contrastar la ficha pública.",
    ],
    watch: [
      "La web mezcla dos HET separados por 540.000 € y publica un LTV incompatible con la cifra menor.",
      "No hay preventas pese al 80% de avance declarado y la entrega prevista para enero de 2027.",
      "La primera disposición refinancia principalmente deuda previa y gastos, no obra futura.",
      "DANEPI presenta patrimonio neto reducido y apalancamiento elevado frente a posibles sobrecostes.",
    ],
    facts: [
      { label: "Activo", value: "19 viviendas · 15 garajes · 6 trasteros" },
      { label: "Superficie", value: "1.928 m² totales · 74 m² medios por vivienda" },
      { label: "Emplazamiento", value: "Camí Mas Martí 44 · Tordera" },
      { label: "Obra", value: "80% declarado", note: "Proyecto original de 2006, reanudado en julio de 2025." },
      { label: "Fin de obra previsto", value: "Noviembre de 2026" },
      { label: "Entrega prevista", value: "Enero de 2027" },
      { label: "Préstamo", value: "1.980.000 €" },
      { label: "Primera disposición", value: "1.421.419 €", note: "1,20 M€ refinancian deuda y 221.419 € cubren formalización." },
      { label: "Tasación actual", value: "3.450.420 €" },
      { label: "HET correcta archivada", value: "4.715.784,87 € · 11 jun 2026" },
      { label: "LTV HET calculado", value: "42,0%" },
      { label: "Ingresos previstos", value: "4.851.500 €" },
      { label: "Costes previstos", value: "4.212.045 €" },
      { label: "Beneficio antes de impuestos", value: "639.455 € · margen 13,18%" },
      { label: "Precio residencial", value: "3.316 €/m² · 246.500 € de ticket medio" },
      { label: "Pago", value: "Bullet · amortización anticipada desde mes 6" },
      { label: "Entrada mínima", value: "250 €" },
    ],
    company: {
      publicName: "DANEPI",
      legalName: "DANEPI, S.A. · CIF A08803108",
      identity:
        "Sociedad constituida el 4 de febrero de 1983. Declara actividad en activos inmobiliarios, hoteleros y sanitarios en Cataluña.",
      profile:
        "Promotor patrimonial con más de treinta años de experiencia declarada y exposición a varios tipos de activo.",
      trackRecord:
        "La antigüedad societaria es amplia, pero el análisis del proyecto debe apoyarse en su capacidad financiera actual y no sólo en la experiencia histórica.",
      alignment:
        "Se publican 1.548.130 € de aportación del promotor, equivalentes aproximadamente al 37% del coste total del estudio económico.",
      caveat:
        "En 2024 declaró 6,335 M€ de activos, 498.916 € de patrimonio neto y 5,765 M€ de pasivo no corriente. El patrimonio supone un 7,9% de los activos y la deuda no corriente equivale a 11,6 veces el patrimonio.",
    },
    deficiencies: [
      {
        severity: "Crítica",
        title: "Tasación HET contradictoria",
        detail:
          "La descripción y el bloque de garantías muestran 4.175.785 €, mientras que los puntos clave, el teaser y la tasación archivada muestran 4.715.784,87 €.",
        impact:
          "La diferencia de 540.000 € altera el colchón hipotecario y erosiona la confianza en el control de la documentación publicada.",
        verify:
          "Confirmación escrita de Civislend, publicación de la tasación íntegra y corrección uniforme de todos los documentos y páginas.",
      },
      {
        severity: "Crítica",
        title: "Cancelación de la hipoteca previa",
        detail:
          "Existe una hipoteca de 1,15 M€ a favor de Loan Capital Prime, con intereses, gastos y vencimiento registral en marzo de 2030.",
        impact:
          "La garantía de los inversores sólo será de primer rango si la deuda anterior se cancela registralmente de forma simultánea.",
        verify:
          "Carta de pago, certificado de deuda, circuito notarial y nota simple posterior que acredite la cancelación y el primer rango de Civislend.",
      },
      {
        severity: "Alta",
        title: "Cero preventas con el 80% de obra",
        detail:
          "La comercialización aún no habría comenzado aunque la obra se declara muy avanzada.",
        impact:
          "El repago en 12 o 18 meses depende de vender diecinueve viviendas sin demanda contractual ya demostrada.",
        verify:
          "Plan comercial, precios por unidad, reservas o contratos de arras y calendario de ventas conservador.",
      },
      {
        severity: "Alta",
        title: "Primera disposición destinada a refinanciación",
        detail:
          "De 1.421.419 €, aproximadamente 1,20 M€ cancelan deuda existente y 221.419 € cubren gastos de formalización.",
        impact:
          "La mayor parte del capital inicial no aumenta el avance de obra; sustituye financiación previa y reduce fondos disponibles para terminar.",
        verify:
          "Estado de origen y aplicación de fondos, coste real pendiente, contingencia y disposiciones futuras ligadas a certificaciones.",
      },
      {
        severity: "Alta",
        title: "Capacidad limitada para absorber desviaciones",
        detail:
          "El margen previsto es del 13,18% y la sociedad presenta patrimonio neto reducido frente a su deuda no corriente.",
        impact:
          "Sobrecostes, retrasos o descuentos de venta podrían agotar rápidamente el beneficio y exigir fondos adicionales.",
        verify:
          "Tesorería consolidada, deudas de grupo, compromiso irrevocable de sobrecostes y evidencia del origen de los fondos propios.",
      },
      {
        severity: "Media",
        title: "Obra reanudada sobre un proyecto antiguo",
        detail:
          "El proyecto original data de 2006 y la obra se reanudó en 2025 tras una larga interrupción.",
        impact:
          "Pueden existir patologías, cambios normativos, seguros pendientes o adaptaciones del proyecto que afecten coste y plazo.",
        verify:
          "Informe técnico de patologías, proyecto actualizado, seguros, certificados de adecuación normativa y coste completo a terminación.",
      },
    ],
    inconsistencies: [
      {
        title: "HET y LTV incompatibles",
        published: "HET de 4.175.785 € en varios bloques y LTV HET del 42%.",
        calculation: "1.980.000 / 4.175.785 = 47,4%",
        reading: "El 42% sólo cuadra con la tasación correcta archivada de 4.715.784,87 €.",
      },
      {
        title: "Plazo económico distinto",
        published: "Contrato, FDD, teaser y web: 12 meses y 11% total, más 6 meses al mismo TIN.",
        calculation: "Estudio económico: 15 meses y 13,75%",
        reading: "Debe confirmarse qué hipótesis usa el presupuesto financiero y cuál es vinculante para el inversor.",
      },
      {
        title: "Reparto 52/48 parcial",
        published: "El reparto 52% promotor / 48% Civislend usa 1.421.419 €, no los 1,98 M€ totales.",
        calculation: "Estructura completa: 45% promotor + 47% Civislend + 8% ventas",
        reading: "El porcentaje destacado describe sólo una fase y puede sobrestimar la aportación relativa del promotor.",
      },
      {
        title: "Dos bases de cobertura",
        published: "Tasación actual de 3.450.420 € y HET de 4.715.784,87 €.",
        calculation: "LTV disposición inicial = 41,2% · LTV total HET = 42,0%",
        reading: "Son ratios sobre momentos y bases distintos; no deben presentarse como si midieran el mismo riesgo.",
      },
    ],
    documents: [
      { name: "Tasación Eurovaloraciones · 11 jun 2026", status: "Acceso restringido", note: "Valor HET: 4.715.784,87 €.", url: "https://www.civislend.com/document/255306" },
      { name: "Información registral", status: "Acceso restringido", note: "Incluye la hipoteca previa y su vencimiento registral.", url: "https://www.civislend.com/document/255309" },
      { name: "Licencia", status: "Acceso restringido", note: "Debe contrastarse con el proyecto actualizado y el reinicio de obra.", url: "https://www.civislend.com/document/255285" },
      { name: "Ficha de datos fundamentales", status: "Acceso restringido", note: "Contiene las condiciones vinculantes del préstamo.", url: "https://www.civislend.com/document/255531" },
      { name: "Informe de riesgos", status: "Acceso restringido", note: "Informe oficial publicado por Civislend.", url: "https://www.civislend.com/document/255300" },
      { name: "Estudio de mercado", status: "Acceso restringido", note: "Comparables y precios de comercialización del proyecto.", url: "https://www.civislend.com/document/255279" },
      { name: "Estudio económico", status: "Acceso restringido", note: "Contiene la hipótesis divergente de 15 meses.", url: "https://www.civislend.com/document/255282" },
      { name: "Teaser", status: "Acceso restringido", note: "Muestra la HET de 4.715.784,87 €.", url: "https://www.civislend.com/document/255303" },
      { name: "Trayectoria del promotor", status: "Acceso restringido", note: "Material promocional; no sustituye cuentas ni verificaciones independientes.", url: "https://www.civislend.com/document/255288" },
    ],
    questions: [
      "¿Puede Civislend confirmar por escrito que el plazo vinculante es 12 meses, el retorno 11% y la prórroga máxima 6 meses al mismo TIN?",
      "¿Se corregirá en todos los documentos la HET a 4.715.784,87 € y se facilitará la tasación íntegra?",
      "¿Qué certificación independiente respalda hoy el 80% y cuál es el coste real, incluida contingencia, para terminar?",
      "¿La hipoteca de Loan Capital Prime se cancelará registralmente de forma simultánea a la nueva hipoteca de primer rango?",
      "¿Cómo se acredita la aportación de 1.548.130 € y que no se retirará antes de reembolsar a los inversores?",
      "¿Qué reservas o contratos respaldarán las ventas antes de realizar nuevas disposiciones?",
    ],
    sources: [
      {
        label: "Civislend · Residencial Mas Martí",
        url: "https://www.civislend.com/proyecto/966",
        type: "Primaria",
        note: "Página del proyecto contrastada con nueve documentos originales, enlazados en esta ficha.",
      },
    ],
  },
  {
    id: "urban-suites-alicante",
    platform: "Civislend",
    name: "Urban Suites Alicante",
    location: "Distrito Mercado · Alicante",
    date: {
      isoDateTime: "2026-07-22T12:00:00+02:00",
      label: "22 jul 2026 · 12:00 CEST",
      type: "Apertura",
      note: "Apertura publicada por Civislend. En la fecha de corte todavía no había pasado.",
    },
    status: "Apertura programada",
    score: 4,
    risk: "Alto",
    returnLabel: "11% TIN · 16,5% total",
    term: "18 meses · +6 de prórroga",
    size: "1,20 M€ · 2,40 M€ total",
    ltv: "84,0% sobre HET por coste",
    guarantee: "Hipoteca 1er rango",
    promoter: "796.546 € · 25% del coste",
    progress: "Solar vacío · licencia declarada",
    exit: "Refinanciación tras iniciar explotación turística",
    verdict:
      "No recomendable sin documentación adicional. El 11% TIN no compensa un LTV del 84% por coste, el inicio desde solar y la dependencia de una explotación turística sometida a hipótesis y regulación.",
    strengths: [
      "Hipoteca de primer rango y licencia de obra declarada por la plataforma.",
      "El promotor aporta 796.546 €, aproximadamente el 25% del coste total publicado.",
      "Localización céntrica y producto de apartamentos con servicios comunes diferenciados.",
    ],
    watch: [
      "El LTV del 15% sólo usa la primera disposición; la financiación total alcanza el 84% del HET por coste.",
      "La tasación completa no figura en la relación pública de documentos pese a publicarse tres valores.",
      "La devolución depende de refinanciar un activo turístico recién construido y aún no estabilizado.",
      "La actividad turística requiere compatibilidad y títulos adicionales a la licencia de obras.",
    ],
    facts: [
      { label: "Activo", value: "16 apartamentos turísticos" },
      { label: "Programa", value: "Estudios y unidades de 1–2 dormitorios" },
      { label: "Superficie", value: "1.456 m² · 63 m² medios con comunes" },
      { label: "Parcela", value: "233 m² · actualmente vacía" },
      { label: "Edificio", value: "2 sótanos · baja · 3 plantas · ático · cubierta" },
      { label: "Servicios", value: "Audiovisual, lavandería, terraza, solárium y jacuzzi" },
      { label: "Financiación total", value: "2.400.000 € · dos tramos" },
      { label: "Primer tramo", value: "1.200.000 €" },
      { label: "Primera disposición", value: "135.220 €", note: "Destinada íntegramente a gastos de formalización." },
      { label: "Compra del solar", value: "385.583 €" },
      { label: "Valor actual del solar", value: "922.479 €" },
      { label: "HET por coste", value: "2.856.050 € · LTV 84,0%" },
      { label: "HET por rentas", value: "3.426.184 € · LTV 70,0%" },
      { label: "Aportación promotor", value: "796.546 € · 25%" },
      { label: "Pago", value: "Bullet · amortización anticipada desde mes 6" },
      { label: "Entrada mínima", value: "250 €" },
    ],
    company: {
      publicName: "Greenfo",
      legalName: "Suites Alicante Plaza, S.L. · CIF B70856042",
      identity:
        "Sociedad con domicilio en Carretera del Plantío 80, Majadahonda. Greenfo declara actividad desde 2022.",
      profile:
        "Promotor orientado a infraestructuras y activos turísticos. Publica tres edificios de apartamentos turísticos en Alicante y dos villas de lujo en Altea.",
      trackRecord:
        "La web corporativa presenta los activos como proyectos en desarrollo; no se ha acreditado un historial público de edificios turísticos terminados y operando de forma estabilizada.",
      alignment:
        "Aporta 796.546 €, pero la deuda representa el 75% del coste total y el segundo tramo debe quedar subordinado a la aportación efectiva del capital propio.",
      caveat:
        "Es su segundo préstamo en Civislend. La primera operación, de septiembre de 2025, se describe como en plazo, pero aún no ofrece un ciclo completo de construcción, explotación y reembolso.",
    },
    deficiencies: [
      {
        severity: "Crítica",
        title: "LTV total del 84% por coste",
        detail:
          "La financiación total de 2,40 M€ se compara con un HET por coste de 2,856 M€. El 15% destacado sólo corresponde a la primera disposición de 135.220 €.",
        impact:
          "El colchón nominal por coste es sólo 456.050 € antes de intereses, gastos, sobrecostes y descuentos de ejecución.",
        verify:
          "Que la garantía cubra los 2,40 M€ completos, disposiciones condicionadas a capital propio y un presupuesto con contingencia suficiente.",
      },
      {
        severity: "Crítica",
        title: "Viabilidad turística no acreditada",
        detail:
          "La licencia de obras no sustituye el informe de compatibilidad urbanística ni los títulos de actividad y registro turístico.",
        impact:
          "Sin habilitación turística, la valoración por rentas y la refinanciación prevista pueden dejar de ser válidas.",
        verify:
          "Compatibilidad municipal favorable, licencia o declaración de actividad aplicable y encaje registral/autonómico para apartamentos turísticos.",
      },
      {
        severity: "Alta",
        title: "Tasación completa no localizada",
        detail:
          "La página publica valor actual, HET por coste y HET por rentas, pero el índice documental no contiene el informe de tasación.",
        impact:
          "No pueden auditarse ocupación, ADR, gastos operativos, tasa de capitalización ni sensibilidad de los 3,426 M€ por rentas.",
        verify:
          "Informe íntegro de tasación y escenarios conservadores de ocupación, tarifa, OPEX, cap rate y plazo de estabilización.",
      },
      {
        severity: "Alta",
        title: "Riesgo completo desde solar",
        detail:
          "El proyecto parte de una parcela vacía y combina construcción, puesta en marcha turística, captación de demanda y refinanciación.",
        impact:
          "Cada fase añade riesgo de plazo y coste; el préstamo puede vencer antes de que el activo alcance ingresos estabilizados.",
        verify:
          "Contrato de obra, presupuesto cerrado, planning, contingencia, monitor independiente y plan de refinanciación con cobertura conservadora.",
      },
      {
        severity: "Alta",
        title: "Salida dependiente de refinanciación",
        detail:
          "El promotor prevé conservar el edificio y devolver el préstamo mediante financiación bancaria tras la construcción.",
        impact:
          "Un banco puede aplicar menor valoración, exigir historial operativo o reducir el LTV de un activo turístico no estabilizado.",
        verify:
          "Term sheet bancaria, DSCR/LTV bajo escenario conservador y plan alternativo si la refinanciación no está disponible al vencimiento.",
      },
      {
        severity: "Media",
        title: "Historial operativo limitado",
        detail:
          "No se han identificado en la información corporativa activos turísticos terminados y explotados por el grupo.",
        impact:
          "La ejecución no termina con la obra: la explotación y estabilización requieren capacidades distintas a la promoción.",
        verify:
          "Equipo operador, contratos de gestión, resultados de activos comparables y experiencia real de apertura y comercialización.",
      },
    ],
    inconsistencies: [
      {
        title: "El 15% no es el LTV total",
        published: "LTV aproximado del 15% sobre el valor actual del solar.",
        calculation: "135.220 / 922.479 = 14,7%",
        reading: "Describe sólo la disposición de formalización. El riesgo contractual total es 2,40 M€.",
      },
      {
        title: "LTV total por coste",
        published: "Financiación total de 2,40 M€ y HET por coste de 2.856.050 €.",
        calculation: "2.400.000 / 2.856.050 = 84,0%",
        reading: "Es la referencia prudente para una obra que aún no ha comenzado y deja un colchón estrecho.",
      },
      {
        title: "Valor por rentas un 20% superior",
        published: "HET por rentas de 3.426.184 € frente a 2.856.050 € por coste.",
        calculation: "3.426.184 / 2.856.050 − 1 = 20,0%",
        reading: "La mejora depende de hipótesis operativas y regulatorias que no pueden auditarse sin la tasación completa.",
      },
      {
        title: "Revalorización del solar",
        published: "Compra por 385.583 € y valor actual de 922.479 €.",
        calculation: "Incremento = 536.896 € · +139,2%",
        reading: "La diferencia puede reflejar licencia y desarrollo, pero debe explicarse y documentarse en la tasación.",
      },
    ],
    documents: [
      { name: "Información registral", status: "Acceso restringido", note: "Documento oficial disponible para usuarios identificados en Civislend.", url: "https://www.civislend.com/document/255225" },
      { name: "Licencia de obras", status: "Acceso restringido", note: "No acredita por sí sola la habilitación de la actividad turística.", url: "https://www.civislend.com/document/255228" },
      { name: "Estudio de mercado", status: "Acceso restringido", note: "Documento oficial publicado por Civislend.", url: "https://www.civislend.com/document/255231" },
      { name: "Estudio económico", status: "Acceso restringido", note: "Debe contrastarse con la tasación y el escenario bancario de salida.", url: "https://www.civislend.com/document/255234" },
      { name: "Ficha de datos fundamentales", status: "Acceso restringido", note: "Documento oficial publicado por Civislend.", url: "https://www.civislend.com/document/255237" },
      { name: "Informe de riesgos", status: "Acceso restringido", note: "Documento oficial publicado por Civislend.", url: "https://www.civislend.com/document/255240" },
      { name: "Proyecto básico", status: "Acceso restringido", note: "Documento oficial publicado por Civislend.", url: "https://www.civislend.com/document/255243" },
      { name: "Teaser", status: "Acceso restringido", note: "Documento oficial publicado por Civislend.", url: "https://www.civislend.com/document/255246" },
      { name: "Tasación completa", status: "No localizado", note: "No aparece en la relación pública de documentos pese a publicarse tres valores." },
      { name: "Compatibilidad y títulos turísticos", status: "No localizado", note: "No se han localizado certificados municipales ni habilitaciones de actividad." },
    ],
    questions: [
      "¿Se facilitará la tasación completa con ocupación, ADR, OPEX, cap rate y sensibilidad del valor por rentas?",
      "¿Existe informe municipal favorable de compatibilidad turística y cuáles son los títulos de actividad y registro aplicables?",
      "¿Cuál es el presupuesto cerrado, la contingencia, el calendario y el coste a terminación certificado independientemente?",
      "¿Qué condiciones tendrá el segundo tramo y se aportarán primero todos los fondos propios comprometidos?",
      "¿Qué entidad o term sheet respalda la refinanciación y qué LTV/DSCR resulta en un escenario conservador?",
      "¿Confirma la escritura que la hipoteca garantiza los 2,40 M€ totales y no sólo el primer tramo?",
    ],
    sources: [
      {
        label: "Civislend · Urban Suites Alicante",
        url: "https://www.civislend.com/proyecto/978",
        type: "Primaria",
        note: "Página del proyecto y documentación oficial protegida enlazada en esta ficha.",
      },
      {
        label: "Ayuntamiento de Alicante · suspensión de títulos para alojamientos turísticos",
        url: "https://www.alicante.es/es/noticias/ampliacion-acuerdo-suspension-otorgamiento-informes-compatibilidad-urbanistica-vuts",
        type: "Normativa",
        note: "Contexto municipal de la suspensión ampliada en julio de 2025.",
      },
      {
        label: "Ayuntamiento de Alicante · regulación de alojamientos turísticos",
        url: "https://www.alicante.es/es/noticias/alicante-regula-alojamientos-turisticos-y-no-concedera-licencias-zonas-saturadas",
        type: "Normativa",
        note: "Criterios municipales y tratamiento de zonas saturadas.",
      },
      {
        label: "Generalitat Valenciana · procedimiento turístico",
        url: "https://sede.gva.es/es/inicio/procedimientos?id_proc=19207&version=red",
        type: "Normativa",
        note: "Procedimiento autonómico de inscripción y requisitos; debe aplicarse al tipo exacto de establecimiento.",
      },
      {
        label: "Greenfo · infraestructuras sostenibles",
        url: "https://greenfo.es/infraestructuras-sostenibles/",
        type: "Corporativa",
        note: "Cartera y proyectos publicados por el propio grupo promotor.",
      },
    ],
  },
  {
    id: "vivaldi-ii",
    platform: "Urbanitae",
    name: "Vivaldi II",
    location: "Sierra Blanca · Marbella",
    date: {
      isoDateTime: "2026-07-21T12:00:00+02:00",
      label: "21 jul 2026 · 12:00 CEST",
      type: "Apertura",
      note: "Fecha y hora de apertura indicadas en la documentación revisada. El estado cambia automáticamente al alcanzarse ese momento.",
    },
    status: "Apertura en el corte",
    score: 7.1,
    risk: "Medio",
    returnLabel: "10,25% anual simple",
    term: "16 meses · hasta 28 con prórrogas",
    size: "1,31 M€ · 9,99 M€ financiación total",
    ltv: "44,9% HET · 51,5% con intereses",
    guarantee: "Hipoteca 1er rango + prendas y cash sweep",
    promoter: "3,70 M€ · 25% del plan",
    progress: "Obra ejecutada al 66,1%",
    exit: "Venta de una única villa ultra-prime",
    verdict:
      "Es la operación con mejor nota del corte y una garantía nominal razonable, pero concentra toda la salida en la venta de una sola villa por 25 M€. Invertible sólo si se acepta esa concentración y se aclaran contrato de obra, actualización registral y capacidad del promotor para cubrir desviaciones.",
    strengths: [
      "Hipoteca de primer rango con prendas sobre cuentas, sociedad vehículo e IVA, además de cash sweep y mandato de venta.",
      "Tasación TASA de 22,24 M€ en hipótesis de edificio terminado y obra ejecutada al 66,1%.",
      "Aportación propia prevista de 3,70 M€ y obligación declarada de cubrir sobrecostes.",
    ],
    watch: [
      "La devolución depende de un único comprador para una villa con precio objetivo de 25 M€.",
      "El precio de salida supera un 12,4% el valor HET de tasación.",
      "El presupuesto de obra y el de project management archivados no constan firmados.",
      "Registro y Catastro todavía describen la vivienda antigua demolida.",
    ],
    facts: [
      { label: "Activo", value: "Villa de lujo en Calle Vivaldi 24 · Sierra Blanca" },
      { label: "Prestataria", value: "Phuket Properties, S.L." },
      { label: "Financiación total", value: "9.990.000 €" },
      { label: "Tramo B", value: "1.310.000 € en Urbanitae" },
      { label: "Aportación propia", value: "3.700.747 € · 25%" },
      { label: "Coste total", value: "14.690.748 €" },
      { label: "Tasación actual", value: "13.292.982,16 € · 1 jun 2026" },
      { label: "Tasación HET", value: "22.240.812,74 €" },
      { label: "Obra ejecutada", value: "3.210.106,81 € · 66,145%" },
      { label: "Venta objetivo", value: "25.000.000 € brutos · 24.000.000 € netos" },
      { label: "LTV calculado", value: "44,9% sin intereses · 51,5% con intereses" },
      { label: "LTC calculado", value: "73,0% sin intereses · 83,6% con intereses" },
      { label: "Pago", value: "Bullet · amortización anticipada desde el mes 3" },
      { label: "Entrada mínima", value: "500 €" },
    ],
    company: {
      publicName: "Promotor residencial ultra-prime",
      legalName: "Phuket Properties, S.L.",
      identity:
        "La financiación se concede a la sociedad vehículo propietaria de la villa de Sierra Blanca.",
      profile:
        "Urbanitae presenta al promotor como una familia especializada en vivienda de lujo en la Costa del Sol con más de cuarenta años de experiencia.",
      trackRecord:
        "La experiencia declarada es relevante, pero los documentos revisados no aportan un listado verificable de operaciones comparables con precio final, plazo y rentabilidad.",
      alignment:
        "El plan atribuye 3,70 M€ de capital propio, aunque 750.000 € se destinan a una recapitalización o add-on inicial y deben explicarse con precisión.",
      caveat:
        "Faltan estados financieros consolidados, detalle del beneficiario último y prueba líquida de la capacidad para cubrir sobrecostes hasta la venta.",
    },
    deficiencies: [
      {
        severity: "Alta",
        title: "Salida concentrada en una sola venta",
        detail: "Capital e intereses dependen de vender una única villa ultra-prime por 25 M€.",
        impact: "Un retraso o descuento de un solo comprador afecta a toda la capacidad de repago.",
        verify: "Mandato comercial, contactos cualificados, comparables cerrados y sensibilidad de plazo y precio.",
      },
      {
        severity: "Alta",
        title: "Precio objetivo por encima de tasación",
        detail: "La salida de 25 M€ supera en un 12,4% el HET de 22,24 M€.",
        impact: "El margen de seguridad publicado depende de conseguir una prima sobre el valor tasado.",
        verify: "Escenario de repago a 20, 21 y 22 M€, incluidos intereses, impuestos y costes de venta.",
      },
      {
        severity: "Alta",
        title: "Presupuestos principales sin firma",
        detail: "La tasación advierte que el presupuesto del constructor y el de project management no están firmados.",
        impact: "Coste, calendario y responsabilidad por desviaciones tienen menor fuerza contractual.",
        verify: "Contrato cerrado y firmado, contingencia, calendario y certificación independiente de coste a terminación.",
      },
      {
        severity: "Media",
        title: "Registro y Catastro desactualizados",
        detail: "Las descripciones siguen reflejando la vivienda anterior demolida.",
        impact: "La garantía debe identificar sin ambigüedad la obra nueva y su estado jurídico.",
        verify: "Declaración de obra nueva en construcción, coordinación catastral y nota simple posterior a la hipoteca.",
      },
      {
        severity: "Media",
        title: "Seguros y eficiencia energética pendientes",
        detail: "La tasación no ve acreditados el seguro decenal ni el certificado energético.",
        impact: "Son hitos relevantes para terminar, transmitir y reducir contingencias de construcción.",
        verify: "Póliza o compromiso del seguro decenal y calendario del certificado energético.",
      },
    ],
    inconsistencies: [
      {
        title: "LTV comercial frente a LTV de tasación",
        published: "El plan presenta un LTV del 40% sin intereses y 45,8% con intereses sobre una venta de 25 M€.",
        calculation: "9,99 / 22,2408 = 44,9% · 11,459 / 22,2408 = 51,5%",
        reading: "La cobertura debe medirse sobre el HET tasado y no sólo sobre el precio objetivo del promotor.",
      },
      {
        title: "Aportación inicial y recapitalización",
        published: "Se presentan 3,70 M€ de aportación propia y 4,45 M€ al día uno.",
        calculation: "4,45 M€ − 0,75 M€ de add-on = 3,70 M€",
        reading: "Los 750.000 € adicionales no deben confundirse con capital nuevo que queda íntegro en la obra.",
      },
      {
        title: "Valor objetivo frente a HET",
        published: "Venta objetivo de 25 M€.",
        calculation: "25 / 22,2408 − 1 = 12,4%",
        reading: "El caso base exige una prima relevante sobre la tasación terminada.",
      },
    ],
    documents: [
      { name: "Ficha de datos fundamentales", status: "Disponible en la plataforma", note: "Condiciones, riesgos, garantías y estructura del préstamo.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000499/public-document/es_ES/Ficha_de_datos_de_inversin.pdf" },
      { name: "Tasación TASA", status: "Disponible en la plataforma", note: "Emitida el 1 de junio de 2026; caduca el 1 de diciembre de 2026.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000499/public-document/Tasacin.pdf" },
      { name: "Nota simple", status: "Disponible en la plataforma", note: "Finca registral 32.831; requiere actualización con la obra nueva y la hipoteca.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000499/public-document/Nota_simple.pdf" },
      { name: "Resumen económico", status: "Disponible en la plataforma", note: "Fuentes, usos, venta objetivo y costes financieros.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000499/public-document/es_ES/Resumen_econmico.pdf" },
      { name: "Contrato de obra firmado", status: "No localizado", note: "La tasación sólo identifica un presupuesto no firmado." },
      { name: "Seguro decenal", status: "No localizado", note: "Advertencia expresa de la tasación." },
    ],
    questions: [
      "¿Existe un contrato de obra firmado, a precio cerrado y con contingencia suficiente?",
      "¿Qué deuda total e intereses quedan cubiertos por la hipoteca de primer rango?",
      "¿Cómo se repaga el préstamo si la venta se cierra por debajo de 22 M€ o tarda más de 28 meses?",
      "¿Quién es el beneficiario último y qué liquidez acredita para cubrir sobrecostes?",
      "¿Cuándo se inscribirán la obra nueva, la hipoteca y la coordinación catastral?",
      "¿Qué comprador o agente acredita demanda real en el tramo de 22–25 M€?",
    ],
    sources: [
      {
        label: "Urbanitae · Vivaldi II",
        url: "https://blog.urbanitae.com/2026/07/17/vivaldi-ii-deuda-al-1025-anual-para-una-villa-ultra-prime-en-sierra-blanca/",
        type: "Primaria",
        note: "Presentación pública de la oportunidad; contrastada con la FDD, la tasación y el resumen económico enlazados.",
      },
      {
        label: "CNMV · registro de Urbanitae",
        url: "https://www.cnmv.es/portal/consultas/servicios-financiacion-participativa/proveedor?lang=es&nif=B87516932&nreg=4",
        type: "Corporativa",
        note: "Ficha registral del proveedor de servicios de financiación participativa.",
      },
    ],
  },
  {
    id: "residencial-altay",
    platform: "Urbanitae",
    name: "Residencial Altay",
    location: "Armilla · Granada",
    date: {
      isoDateTime: "2026-07-21T16:00:00+02:00",
      label: "21 jul 2026 · 16:00 CEST",
      type: "Apertura",
      note: "Fecha y hora de apertura publicadas por Urbanitae. La FDD mantiene el 24 de agosto como fecha límite de captación.",
    },
    status: "En captación",
    score: 4.7,
    risk: "Alto",
    returnLabel: "12% TIR preferente · no garantizada",
    term: "Capital sin vencimiento contractual",
    size: "890.000 € · 1,271 M€ de equity",
    ltv: "83,5% deuda y anticipos sobre costes",
    guarantee: "Participación societaria · sin hipoteca",
    promoter: "381.000 € · 30% del equity",
    progress: "15 de 33 viviendas reservadas",
    exit: "Construcción y venta de 33 viviendas",
    verdict:
      "Esperaría antes de invertir. La comercialización inicial es positiva, pero es una operación de equity sin garantía real, con margen estrecho y sin tasación, licencia, nota simple actualizada ni financiación bancaria comprometida en la carpeta revisada.",
    strengths: [
      "Quince de las treinta y tres viviendas figuran reservadas, un 45,5% del total.",
      "El gestor y promotor aportan aproximadamente el 30% del equity previsto.",
      "La documentación económica incluye detalle de ventas, costes y escenarios.",
    ],
    watch: [
      "No existe hipoteca ni devolución garantizada: el inversor asume riesgo societario completo.",
      "El escenario moderado deja sólo 383.983 € de margen y el adverso entra en pérdidas.",
      "La nota simple es de marzo de 2025 y no prueba titularidad, cargas o financiación actuales.",
      "No se han localizado licencia, tasación formal ni term sheet bancario.",
    ],
    facts: [
      { label: "Activo", value: "33 viviendas con garaje y trastero" },
      { label: "Emplazamiento", value: "Camino de Churriana 64 · Armilla" },
      { label: "Sociedad proyecto", value: "Atlas Opportunities 3, S.L." },
      { label: "Promotor", value: "Inversiones Blasiam, S.L." },
      { label: "Equity total", value: "1.271.000 €" },
      { label: "Inversores", value: "889.700–890.000 € · 70% del equity" },
      { label: "Gestor / promotor", value: "381.000–381.300 € · 30%" },
      { label: "Préstamo construcción", value: "5.143.718 € previsto" },
      { label: "Anticipos clientes", value: "1.270.953 € previstos" },
      { label: "Ingresos", value: "8.698.850 € detallados · 8.731.897 € en resumen" },
      { label: "Coste moderado", value: "8.347.914 €" },
      { label: "Margen moderado", value: "383.983 € · 4,4% sobre ventas" },
      { label: "Escenario adverso", value: "−135.996 €" },
      { label: "Reservas", value: "15 de 33 · 45,5%" },
      { label: "Entrada mínima", value: "No identificada con certeza en los archivos revisados" },
    ],
    company: {
      publicName: "Inversiones Blasiam",
      legalName: "Inversiones Blasiam, S.L. · vehículo Atlas Opportunities 3, S.L.",
      identity:
        "La inversión se articula mediante una ampliación de capital en Atlas Opportunities 3, S.L., gestionada por AJP Tax Legal.",
      profile:
        "El proyecto desarrolla vivienda residencial de obra nueva en el área metropolitana de Granada.",
      trackRecord:
        "La FDD identifica a las sociedades, pero la carpeta no ofrece un historial cuantificado de promociones comparables entregadas, desviaciones o retornos finales.",
      alignment:
        "Gestor y promotor aportan 381.000–381.300 €, aproximadamente el 30% del equity, por detrás de la preferencia inicial del inversor según el waterfall publicado.",
      caveat:
        "La falta de cuentas financieras, garantía real y compromiso bancario reduce la capacidad de verificar solvencia y financiación completa del desarrollo.",
    },
    deficiencies: [
      {
        severity: "Crítica",
        title: "Sin licencia acreditada",
        detail: "No se ha localizado en la carpeta una licencia de obras vigente ni certificado municipal equivalente.",
        impact: "Sin habilitación urbanística no puede validarse el calendario ni el presupuesto de inicio.",
        verify: "Licencia íntegra, justificante de vigencia, proyecto aprobado y condiciones pendientes.",
      },
      {
        severity: "Crítica",
        title: "Financiación bancaria no comprometida",
        detail: "El plan necesita 5,144 M€ de préstamo promotor, pero no se ha localizado term sheet vinculante.",
        impact: "Si el banco reduce o retrasa la financiación, el equity puede necesitar ampliación o asumir retrasos.",
        verify: "Oferta bancaria con importe, condiciones de disposición, preventas exigidas, garantías y vencimiento.",
      },
      {
        severity: "Alta",
        title: "Nota simple antigua y sin trazabilidad posterior",
        detail: "La nota simple disponible es de 28 de marzo de 2025 y la finca aún figura con numeración anterior.",
        impact: "No permite confirmar titularidad actual, cargas nuevas ni la estructura registral del préstamo futuro.",
        verify: "Nota simple de menos de treinta días, escritura de adquisición y coordinación catastral.",
      },
      {
        severity: "Alta",
        title: "Margen muy sensible",
        detail: "El escenario moderado deja un 4,4% sobre ventas y el adverso pierde 135.996 €.",
        impact: "Pequeños sobrecostes o descuentos pueden eliminar el retorno y consumir capital.",
        verify: "Presupuesto cerrado, contingencia, coste a terminación y sensibilidad conjunta de precio, plazo y tipos.",
      },
      {
        severity: "Alta",
        title: "Sin tasación formal",
        detail: "Hay estudio de mercado, pero no una tasación independiente archivada.",
        impact: "No puede contrastarse de forma homogénea el valor del suelo, el HET ni la cobertura bancaria.",
        verify: "Tasación ECO completa, vigente y con escenarios de venta y costes pendientes.",
      },
    ],
    inconsistencies: [
      {
        title: "Dos cifras de ingresos",
        published: "8.698.850 € en el detalle de ventas y 8.731.897 € en el resumen económico.",
        calculation: "Diferencia = 33.047 €",
        reading: "Debe existir un único cuadro de ventas trazable por unidad.",
      },
      {
        title: "Objetivo de captación redondeado",
        published: "890.000 € en la oferta y 889.700 € en la estructura económica.",
        calculation: "Diferencia = 300 €",
        reading: "La diferencia es pequeña, pero afecta al cierre exacto de fuentes y usos.",
      },
      {
        title: "Dirección registral",
        published: "La oportunidad usa Camino de Churriana 64; la nota simple antigua identifica el número 54.",
        calculation: "No cuantificable",
        reading: "Puede ser una renumeración, pero debe acreditarse para unir sin duda finca y proyecto.",
      },
    ],
    documents: [
      { name: "Ficha de datos fundamentales", status: "Disponible en la plataforma", note: "Estructura de equity, riesgos, derechos y plazo de captación.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000498/public-document/es_ES/Ficha_Datos_Fundamentales_para_la_Inversin.pdf" },
      { name: "Resumen económico", status: "Disponible en la plataforma", note: "Fuentes, usos, escenarios y waterfall.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000498/public-document/es_ES/Resumen_econmico.pdf" },
      { name: "Detalle de ventas", status: "Disponible en la plataforma", note: "Precios y reservas por vivienda.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000498/public-document/es_ES/Detalle_de_Ventas.pdf" },
      { name: "Estudio de mercado", status: "Disponible en la plataforma", note: "Comparables comerciales; no sustituye una tasación formal.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000498/public-document/Estudio_de_Mercado.pdf" },
      { name: "Nota simple", status: "Disponible en la plataforma", note: "Emitida el 28 de marzo de 2025; necesita actualización.", url: "https://s3-eu-west-1.amazonaws.com/urbanitae-prod-static-content/project/P000498/public-document/Nota_Simple_Registral.pdf" },
      { name: "Tasación independiente", status: "No localizado", note: "Ausencia que limita la nota provisional a un máximo de 5." },
      { name: "Licencia de obras", status: "No localizado", note: "No puede validarse el inicio sin este documento." },
      { name: "Financiación bancaria vinculante", status: "No localizado", note: "El plan prevé 5,144 M€ de préstamo promotor." },
    ],
    questions: [
      "¿Existe licencia de obras vigente y cuándo puede iniciarse materialmente la construcción?",
      "¿Qué banco ha aprobado los 5,144 M€ y qué condiciones de preventa y disposición exige?",
      "¿Puede publicarse una nota simple actual que confirme titularidad y cargas?",
      "¿Cuál es el valor de tasación ECO del suelo y del edificio terminado?",
      "¿Por qué difieren en 33.047 € los ingresos del detalle y del resumen?",
      "¿Qué parte exacta del beneficio adicional corresponde al gestor tras la preferencia del 12%?",
      "¿Cómo se cubre una pérdida superior a la aportación de 381.000 € del promotor?",
    ],
    sources: [
      {
        label: "Urbanitae",
        url: "https://urbanitae.com/es/",
        type: "Primaria",
        note: "Plataforma de origen; el análisis usa la FDD y cuatro documentos originales enlazados en esta ficha.",
      },
      {
        label: "CNMV · registro de Urbanitae",
        url: "https://www.cnmv.es/portal/consultas/servicios-financiacion-participativa/proveedor?lang=es&nif=B87516932&nreg=4",
        type: "Corporativa",
        note: "Ficha registral del proveedor de servicios de financiación participativa.",
      },
    ],
  },
  {
    id: "madrid-atlas-nuevo-ahijones",
    platform: "wecity",
    name: "Madrid Atlas Nuevo Ahijones",
    location: "Los Ahijones · Madrid",
    date: {
      isoDateTime: "2026-07-21T12:00:00+02:00",
      label: "21 jul 2026 · 12:00 CEST",
      type: "Apertura",
      note: "Fecha y hora publicadas en la página oficial de la oportunidad de wecity.",
    },
    status: "Oportunidad publicada",
    score: 2.5,
    risk: "Muy alto",
    returnLabel: "11% anual · 16,5% a 18 meses",
    term: "18 meses · +6 de prórroga",
    size: "920.000 €",
    ltv: "57,3% sobre tasación firmada",
    guarantee: "Hipoteca 1er rango sujeta a cargas urbanísticas",
    promoter: "1,021 M€ declarados",
    progress: "Suelo en urbanización · licencia pendiente",
    exit: "Aportaciones de socios y financiación bancaria futura",
    verdict:
      "No invertir con la documentación actual. El LTV nominal y la aportación declarada son atractivos, pero quedan subordinados a urbanización incompleta, licencia pendiente, cargas urbanísticas, refinanciación no comprometida y errores graves entre dossier, tasación y rating.",
    strengths: [
      "LTV calculado del 57,3% sobre la tasación firmada de 1,605 M€.",
      "Aportación declarada de cooperativistas y promotor superior a 1,02 M€.",
      "Dieciocho viviendas asignadas y retorno del 11% anual, según la plataforma.",
    ],
    watch: [
      "Afección urbanística provisional de 633.090,92 €, potencialmente preferente a la hipoteca.",
      "Urbanización incompleta y licencia de edificación todavía pendiente.",
      "El rating analiza una empresa distinta de la cooperativa prestataria.",
      "La salida depende de financiación bancaria futura sin term sheet vinculante.",
    ],
    facts: [
      { label: "Activo", value: "Parcela RMC-11.2 · etapa II de Los Ahijones" },
      { label: "Programa", value: "18 viviendas VPPL con garajes, trasteros y zonas comunes" },
      { label: "Prestataria", value: "Atlas Nuevos Desarrollos, S. Coop. Mad." },
      { label: "Gestor", value: "Coóptima Servicios Inmobiliarios, S.L." },
      { label: "Préstamo", value: "920.000 €" },
      { label: "Aportación declarada", value: "1.021.349,15 €" },
      { label: "Tasación firmada", value: "1.604.925,51 € · Gesvalt · 24 feb 2026" },
      { label: "Tasación publicada", value: "1.624.925 €" },
      { label: "LTV calculado", value: "57,32%" },
      { label: "Afección urbanística", value: "633.090,92 € provisional" },
      { label: "Coste urbanización pendiente", value: "327.369,99 € en tasación" },
      { label: "Urbanización etapa II", value: "28,29% ejecutado" },
      { label: "Urbanización sector", value: "36,87% ejecutado" },
      { label: "Licencia", value: "Pendiente" },
      {
        label: "Conversión de escala",
        value: "Riesgo local 7,5 → nota web 2,5",
        note: "El informe local usa 10 como mayor riesgo; Ladrillo Radar usa 10 como mejor calidad.",
      },
      { label: "Pago", value: "Bullet · amortización desde mes 3 con compensación" },
      { label: "Entrada mínima", value: "500 €" },
    ],
    company: {
      publicName: "Atlas Nuevo Ahijones",
      legalName: "Atlas Nuevos Desarrollos, S. Coop. Mad. · CIF F24777443",
      identity:
        "Cooperativa de vivienda gestionada por Coóptima Servicios Inmobiliarios, S.L.",
      profile:
        "La gestora declara más de veinticinco años de experiencia y cinco proyectos cooperativos previos financiados en wecity.",
      trackRecord:
        "Según la plataforma, dos operaciones previas se han devuelto y tres siguen al corriente; falta documentación independiente con resultados finales comparables.",
      alignment:
        "Se declara una aportación de 1.021.349,15 €, superior al préstamo solicitado, pero la documentación publica tres costes diferentes para la adquisición.",
      caveat:
        "Las últimas cuentas disponibles muestran 21.000 € de patrimonio neto frente a 2,63 M€ de pasivo corriente: sólo un 0,79% de los activos.",
    },
    deficiencies: [
      {
        severity: "Crítica",
        title: "Afección urbanística potencialmente preferente",
        detail: "La nota simple recoge una afección provisional de 633.090,92 €, además de afecciones fiscales.",
        impact: "Las cuotas urbanísticas pueden reducir materialmente el valor recuperable antes de atender a los inversores.",
        verify: "Certificado de la junta de compensación y del Ayuntamiento con saldo, calendario, rango y responsable de pago.",
      },
      {
        severity: "Crítica",
        title: "Licencia pendiente y urbanización inmadura",
        detail: "La tasación sitúa la urbanización de la etapa II en el 28,29% y no acredita licencia de edificación.",
        impact: "El plazo de 18–24 meses puede agotarse antes de que el activo alcance madurez bancaria o constructiva.",
        verify: "Certificado urbanístico municipal, calendario vinculante de urbanización y condiciones para licencia simultánea.",
      },
      {
        severity: "Crítica",
        title: "Rating de una sociedad distinta",
        detail: "El informe asigna AAA, pero analiza a Impulsa Proyectos Inmobiliarios, S.L., no a la cooperativa prestataria.",
        impact: "La calificación no sirve para medir la solvencia del obligado real.",
        verify: "Retirada o reemisión del rating con CIF correcto, cuentas verificadas y metodología completa.",
      },
      {
        severity: "Alta",
        title: "Salida bancaria no comprometida",
        detail: "El repago depende de futuras aportaciones y/o financiación bancaria sin oferta vinculante archivada.",
        impact: "Una entidad puede exigir más preventas, licencia, avance urbano o capital y retrasar la devolución.",
        verify: "Term sheet bancario, condiciones precedentes, importe, LTV, preventas y calendario de disposición.",
      },
      {
        severity: "Alta",
        title: "Cobertura mal calculada y tasación divergente",
        detail: "La plataforma usa 1.624.925 € y 56,61%; el certificado firmado fija 1.604.925,51 €.",
        impact: "El LTV real es 57,32% y muestra falta de conciliación en una métrica central.",
        verify: "Corrección pública y uso uniforme del certificado firmado vigente.",
      },
      {
        severity: "Alta",
        title: "Carga urbanística sin conciliar",
        detail: "La afección registral supera en 305.720,93 € el coste de urbanización pendiente de la tasación.",
        impact: "No queda claro qué obligación debe incorporarse al coste y a la cobertura real.",
        verify: "Conciliación firmada por tasador, urbanizador y asesor legal, incluida la prioridad en ejecución.",
      },
    ],
    inconsistencies: [
      {
        title: "Tasación y LTV",
        published: "1.624.925 € y LTV 56,61% en la plataforma; 1.604.925,51 € en el certificado.",
        calculation: "920.000 / 1.604.925,51 = 57,32%",
        reading: "La tasación firmada debe prevalecer y corregirse en todos los documentos.",
      },
      {
        title: "Número de viviendas",
        published: "La plataforma presenta 18 viviendas; la tasación modeliza 16 viviendas, 16 trasteros y 32 garajes.",
        calculation: "Diferencia = 2 viviendas",
        reading: "Programa, licencia, presupuesto y valoración no están alineados.",
      },
      {
        title: "Valor final",
        published: "El rating usa 6.076.540 € frente a ingresos explícitos de tasación cercanos a 5.379.251 €.",
        calculation: "Diferencia aproximada = 697.289 €",
        reading: "El rating sobreestima el escenario de salida o usa una base no documentada.",
      },
      {
        title: "Tres costes de adquisición",
        published: "Se publican 1.839.079 €, 1.910.251 € y 1.941.349,15 €.",
        calculation: "Rango máximo = 102.270,15 €",
        reading: "Fuentes y usos deben conciliar precio, estructura, comisión e impuestos en un único cuadro.",
      },
    ],
    documents: [
      { name: "Dossier de inversión", status: "Acceso restringido", note: "Descripción, estructura y cifras publicadas; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=101" },
      { name: "Información catastral", status: "Acceso restringido", note: "Información descriptiva y gráfica del activo; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=104" },
      { name: "Ficha de datos fundamentales", status: "Acceso restringido", note: "Riesgos, condiciones y datos del promotor; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=139" },
      { name: "Contrato de préstamo", status: "Acceso restringido", note: "Fechado el 20 de julio de 2026; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=204" },
      { name: "Tasación Gesvalt", status: "Acceso restringido", note: "Certificado firmado de 1.604.925,51 €; vence el 24 de agosto de 2026.", url: "https://api.wecity.com/opportunities/290/doc?file=110" },
      { name: "Nota simple", status: "Acceso restringido", note: "Contiene afección urbanística provisional y afecciones fiscales.", url: "https://api.wecity.com/opportunities/290/doc?file=107" },
      { name: "Informe de rating", status: "Acceso restringido", note: "No es válido para el prestatario porque analiza otra sociedad.", url: "https://api.wecity.com/opportunities/290/doc?file=133" },
      { name: "Mandato del agente de garantías", status: "Acceso restringido", note: "Regula la actuación de Global Security Services; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=205" },
      { name: "Mandato a WeCity", status: "Acceso restringido", note: "Regula la representación encomendada a la plataforma; el enlace oficial requiere autenticación.", url: "https://api.wecity.com/opportunities/290/doc?file=206" },
      { name: "Licencia de edificación", status: "No localizado", note: "La documentación indica que está pendiente." },
      { name: "Term sheet bancario", status: "No localizado", note: "Necesario para validar la salida prevista." },
    ],
    questions: [
      "¿Cuál es el saldo real y el rango de la afección urbanística de 633.090,92 €?",
      "¿Por qué la tasación sólo contempla 16 viviendas si la oportunidad anuncia 18?",
      "¿Cuándo estará terminada la urbanización y qué condición permite obtener licencia simultánea?",
      "¿Qué entidad bancaria ha evaluado el proyecto y bajo qué condiciones financiaría la obra?",
      "¿Por qué el rating analiza a una empresa distinta de la cooperativa prestataria?",
      "¿Cuál es la tasación válida y cuándo se corregirá el LTV publicado?",
      "¿Cómo se concilian los tres costes de adquisición y las dos comisiones?",
      "¿Quién aporta cualquier sobrecoste urbanístico o de construcción?",
      "¿Qué contratos y depósitos acreditan que las 18 viviendas están realmente asignadas?",
    ],
    sources: [
      {
        label: "wecity · Madrid Atlas Nuevo Ahijones",
        url: "https://www.wecity.com/oportunidades/madrid-atlas-nuevo-ahijones/",
        type: "Primaria",
        note: "Página de la oportunidad contrastada con nueve documentos originales enlazados en esta ficha.",
      },
      {
        label: "Madrid Crece · Los Ahijones",
        url: "https://madridcrece.madrid.es/nuevos-barrios/los-ahijones/",
        type: "Corporativa",
        note: "Estado y contexto público del desarrollo urbano.",
      },
      {
        label: "BOE · RD 1093/1997",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-1997-16469",
        type: "Normativa",
        note: "Marco registral de afecciones y actos urbanísticos.",
      },
      {
        label: "CNMV · registro de wecity",
        url: "https://www.cnmv.es/portal/consultas/servicios-financiacion-participativa/proveedor?lang=es&nif=B88317003&nreg=9",
        type: "Corporativa",
        note: "Ficha registral del proveedor de servicios de financiación participativa.",
      },
    ],
  },
];

export function isPastProject(project: Project, at: Date | number = Date.now()) {
  const referenceTime = typeof at === "number" ? at : at.getTime();
  return Date.parse(project.date.isoDateTime) <= referenceTime;
}

export const PAST_PROJECT_RETENTION_DAYS = 30;

export function isProjectWithinRetention(
  project: Project,
  at: Date | number = Date.now(),
) {
  const referenceTime = typeof at === "number" ? at : at.getTime();
  const retentionDeadline =
    Date.parse(project.date.isoDateTime) +
    PAST_PROJECT_RETENTION_DAYS * 24 * 60 * 60 * 1_000;

  return referenceTime < retentionDeadline;
}

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export type ScoreBand = "green-strong" | "green-soft" | "yellow" | "orange" | "red";

export function getScoreBand(score: number): ScoreBand {
  if (score >= 9) return "green-strong";
  if (score >= 7) return "green-soft";
  if (score >= 6) return "yellow";
  if (score >= 5) return "orange";
  return "red";
}

export function formatScore(score: number) {
  return score.toLocaleString("es-ES", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
