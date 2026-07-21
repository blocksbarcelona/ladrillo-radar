# Ladrillo Radar

Publicación: `https://radar.uberleap.com` mediante GitHub Pages.

Web editorial 100% estática construida con seis auditorías locales de Civislend,
Urbanitae y wecity. El corte del 21 de julio de 2026 separa proyectos actuales y
pasados, permite ordenar por fecha o puntuación y genera una ficha detallada por
proyecto.

## Propuesta de producto

La interfaz visible se organiza en cinco niveles:

1. **Resumen compacto**: número de proyectos actuales y pasados sin ocultar el
   contenido principal tras una cabecera alta.
2. **Selector de plataforma**: logotipos oficiales empaquetados localmente,
   filtro de riesgo y orden por proximidad temporal o puntuación.
3. **Radar temporal**: fichas separadas automáticamente entre actuales y
   pasadas según la fecha del corte.
4. **Auditoría por proyecto**: carencias, inconsistencias, cálculos propios,
   promotor, documentación, preguntas pendientes y fuentes.
5. **Método**: ocho bloques ponderados que hacen auditable la puntuación en
   escala de 0 a 10.

La tabla comparativa permanece implementada, pero está oculta temporalmente.

El lenguaje visual usa fondo claro, tipografía legible y color funcional para
alertas y resultados. No reproduce el aspecto de las plataformas: la prioridad
es la comparabilidad y la independencia percibida.

## Estructura

- `data/projects.ts`: datos, análisis, carencias, documentos, fuentes y scoring. Todo documento localizado debe incluir su URL web oficial; nunca una ruta del equipo donde se realizó el análisis.
- `app/page.tsx`: portada, filtros, ordenación y separación temporal.
- `app/proyectos/[id]/page.tsx`: plantilla de ficha estática detallada.
- `app/components/PlatformLogo.tsx`: marcas oficiales locales.
- `app/globals.css`: sistema visual y responsive.
- `scripts/prepare-github-pages.mjs`: convierte las rutas de recursos en
  relativas y añade `.nojekyll`.
- `.github/workflows/deploy-pages.yml`: publicación automática en GitHub Pages.
- `dist/client`: exportación generada.

## Uso local

Requiere Node.js 22 o superior.

```bash
npm ci
npm run dev
```

La previsualización local se sirve en `http://localhost:3000`.

## Generar la web estática

```bash
npm run build:github
```

El resultado se escribe en `dist/client`. Puede alojarse en GitHub Pages o en
cualquier hosting de archivos estáticos.

## Publicar en GitHub Pages

1. Crear un repositorio y subir estos archivos a la rama `main`.
2. En **Settings → Pages**, elegir **GitHub Actions** como origen.
3. Cada `push` a `main` compilará y publicará automáticamente la web.

## Criterio de análisis

La puntuación global va de 0 a 10 y aplica ocho bloques: garantía y cobertura
(20%), apalancamiento y equity (15%), técnico y costes pendientes (15%), salida
y comercialización (15%), promotor (10%), legal (10%), coherencia documental
(10%) y condiciones/retorno (5%). No representa una probabilidad matemática de
impago. Una ausencia de datos reduce la confianza, pero no se presenta como
prueba de que el dato oculto sea negativo.

Los documentos protegidos se enumeran en la ficha de evidencias, pero no se
copian a la exportación pública de GitHub Pages.

La web no ofrece asesoramiento financiero. Las condiciones pueden cambiar tras
el corte y toda inversión puede implicar pérdida de capital e iliquidez.
