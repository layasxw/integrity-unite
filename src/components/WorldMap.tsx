import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology, GeometryCollection } from "topojson-specification";
import geoData from "world-atlas/countries-110m.json";

// Названия стран должны совпадать с полем properties.name в topojson
// (Natural Earth naming — например "United States of America", не "USA").
const highlighted = new Set([
  "Kazakhstan",
  "Uzbekistan",
  "Belarus",
  "Ukraine",
  "Russia",
  "Kyrgyzstan",
  "United States of America",
  "Azerbaijan",
  "China",
  "Germany",
  "Mongolia",
  "Czechia",
]);

// [долгота, широта] столиц — просто для точки-маркера на карте.
const markers: { label: string; coordinates: [number, number] }[] = [
  { label: "Казахстан", coordinates: [71.446, 51.1801] },
  { label: "Узбекистан", coordinates: [69.2401, 41.2995] },
  { label: "Беларусь", coordinates: [27.559, 53.9006] },
  { label: "Украина", coordinates: [30.5234, 50.4501] },
  { label: "Россия", coordinates: [37.6173, 55.7558] },
  { label: "Кыргызстан", coordinates: [74.5698, 42.8746] },
  { label: "США", coordinates: [-77.0369, 38.9072] },
  { label: "Азербайджан", coordinates: [49.8671, 40.4093] },
  { label: "Китай", coordinates: [116.4074, 39.9042] },
  { label: "Германия", coordinates: [13.405, 52.52] },
  { label: "Монголия", coordinates: [106.9057, 47.8864] },
  { label: "Чехия", coordinates: [14.4378, 50.0755] },
];

const topology = geoData as unknown as Topology;
const countries = feature(
  topology,
  topology.objects.countries as GeometryCollection,
) as unknown as FeatureCollection<Geometry, { name: string }>;

const WIDTH = 800;
const HEIGHT = 460;

const projection = geoMercator().scale(120).center([15, 15]).translate([WIDTH / 2, HEIGHT / 2]);
const pathGenerator = geoPath(projection);

export default function WorldMap() {
  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Карта стран волонтёров">
      {countries.features.map((f) => {
        const isHighlighted = highlighted.has(f.properties.name);
        return (
          <path
            key={f.properties.name}
            d={pathGenerator(f) ?? undefined}
            fill={isHighlighted ? "var(--color-mint)" : "var(--color-navy)"}
            fillOpacity={isHighlighted ? 0.75 : 0.08}
            stroke="var(--color-navy)"
            strokeWidth={0.4}
            strokeOpacity={0.3}
          />
        );
      })}

      {markers.map((m) => {
        const point = projection(m.coordinates);
        if (!point) return null;
        const [x, y] = point;
        return (
          <circle
            key={m.label}
            cx={x}
            cy={y}
            r={4}
            className="fill-navy stroke-offwhite"
            strokeWidth={1.5}
          >
            <title>{m.label}</title>
          </circle>
        );
      })}
    </svg>
  );
}
