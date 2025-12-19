"use client";

import { useState, useEffect } from "react";

interface WorldMapProps {
  highlightedCountries?: string[];
  onCountryHover?: (countryCode: string | null, countryName: string | null) => void;
  onCountryClick?: (countryCode: string) => void;
}

interface GeoFeature {
  type: string;
  properties: {
    name: string;
    iso_a2: string;
    iso_a3: string;
    ADMIN?: string;
    ISO_A2?: string;
    ISO_A3?: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

// Map ISO 3-letter codes to ISO 2-letter codes for countries with missing iso_a2
const iso3ToIso2: Record<string, string> = {
  GBR: "GB",
  FRA: "FR",
  DEU: "DE",
  ITA: "IT",
  ESP: "ES",
  ARE: "AE",
  BEL: "BE",
  DNK: "DK",
  FIN: "FI",
  IRL: "IE",
  SWE: "SE",
  POL: "PL",
  AUT: "AT",
  NLD: "NL",
  NOR: "NO",
  USA: "US",
  PRT: "PT",
  CHE: "CH",
  GRC: "GR",
  CZE: "CZ",
  HUN: "HU",
  ROU: "RO",
  BGR: "BG",
  HRV: "HR",
  SVK: "SK",
  SVN: "SI",
  LTU: "LT",
  LVA: "LV",
  EST: "EE",
  LUX: "LU",
  MLT: "MT",
  CYP: "CY",
};

// Get the best available ISO 2-letter code for a country
function getCountryCode(properties: GeoFeature["properties"]): string {
  // Check all possible property names for ISO 2-letter code
  const iso2Candidates = [
    properties.ISO_A2,
    properties.iso_a2,
    (properties as Record<string, string>).ISO_A2_EH,
  ];

  for (const code of iso2Candidates) {
    if (code && code !== "-99" && code !== "-1" && code.length === 2) {
      return code;
    }
  }

  // Try to convert from ISO 3-letter code
  const iso3Candidates = [
    properties.ISO_A3,
    properties.iso_a3,
    (properties as Record<string, string>).ISO_A3_EH,
    (properties as Record<string, string>).ADM0_A3,
  ];

  for (const code of iso3Candidates) {
    if (code && iso3ToIso2[code]) {
      return iso3ToIso2[code];
    }
  }

  // Fallback
  return properties.ISO_A2 || properties.iso_a2 || "";
}

interface GeoJSON {
  type: string;
  features: GeoFeature[];
}

// Equirectangular projection - shows full world without distortion at poles
function projectPoint(lon: number, lat: number, width: number, height: number): [number, number] {
  // Map longitude (-180 to 180) to x (0 to width)
  const x = ((lon + 180) / 360) * width;
  // Map latitude (90 to -90) to y (0 to height) - note: lat 90 is top, -90 is bottom
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

// Convert coordinates to SVG path
function coordsToPath(
  coords: number[][],
  width: number,
  height: number
): string {
  if (coords.length === 0) return "";

  const points = coords.map(([lon, lat]) => projectPoint(lon, lat, width, height));
  const pathParts = points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`));
  return pathParts.join(" ") + " Z";
}

// Convert geometry to SVG path(s)
function geometryToPath(
  geometry: GeoFeature["geometry"],
  width: number,
  height: number
): string {
  if (geometry.type === "Polygon") {
    const coords = geometry.coordinates as number[][][];
    return coords.map((ring) => coordsToPath(ring, width, height)).join(" ");
  } else if (geometry.type === "MultiPolygon") {
    const multiCoords = geometry.coordinates as number[][][][];
    return multiCoords
      .map((polygon) =>
        polygon.map((ring) => coordsToPath(ring, width, height)).join(" ")
      )
      .join(" ");
  }
  return "";
}

export default function WorldMap({
  highlightedCountries = [],
  onCountryHover,
  onCountryClick,
}: WorldMapProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(true);

  const width = 1000;
  const height = 500;

  useEffect(() => {
    // Fetch world GeoJSON data from Natural Earth (smaller, better structured)
    fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        console.log("GeoJSON loaded, sample properties:", data.features[0]?.properties);
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load map data:", err);
        setLoading(false);
      });
  }, []);

  const handleMouseEnter = (index: number, countryCode: string, countryName: string) => {
    setHoveredIndex(index);
    setHoveredName(countryName);
    onCountryHover?.(countryCode, countryName);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoveredName(null);
    onCountryHover?.(null, null);
  };

  const handleClick = (countryCode: string) => {
    onCountryClick?.(countryCode);
  };

  const getCountryStyle = (index: number, countryCode: string): React.CSSProperties => {
    const isHighlighted = highlightedCountries.includes(countryCode);
    const isHovered = hoveredIndex === index;

    if (isHovered) {
      return {
        fill: "#0091d2",
        stroke: "#005f8a",
        strokeWidth: 1,
        cursor: "pointer",
        transition: "fill 0.2s ease",
      };
    }

    if (isHighlighted) {
      return {
        fill: "#0091d2",
        stroke: "#005f8a",
        strokeWidth: 0.5,
        cursor: "pointer",
        transition: "fill 0.2s ease",
      };
    }

    return {
      fill: "#d1d5db",
      stroke: "#9ca3af",
      strokeWidth: 0.3,
      cursor: "pointer",
      transition: "fill 0.2s ease",
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-blue-50 rounded-lg">
        <div className="text-blue-600 text-xl">Loading map...</div>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-red-50 rounded-lg">
        <div className="text-red-600 text-xl">Failed to load map</div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* Tooltip */}
      {hoveredName && (
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10 text-gray-800 font-semibold border border-gray-200">
          {hoveredName}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full bg-blue-50 rounded-lg"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Render countries */}
        {geoData.features.map((feature, index) => {
          const countryCode = getCountryCode(feature.properties);
          const props = feature.properties as Record<string, string>;
          const countryName = props.NAME || props.name || props.ADMIN || props.NAME_EN || "";
          const path = geometryToPath(feature.geometry, width, height);

          if (!path) return null;

          return (
            <path
              key={`country-${index}`}
              d={path}
              style={getCountryStyle(index, countryCode)}
              onMouseEnter={() => handleMouseEnter(index, countryCode, countryName)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(countryCode)}
            />
          );
        })}
      </svg>

    </div>
  );
}
