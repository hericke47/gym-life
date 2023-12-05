export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  // Raio da Terra em quilômetros
  const raioTerra = 6371;

  // Converte graus para radianos
  const toRad = (valor) => (valor * Math.PI) / 180;

  // Diferença de latitudes e longitudes em radianos
  const deltaLat = toRad(lat2 - lat1);
  const deltaLon = toRad(lon2 - lon1);

  // Fórmula de Haversine
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância em quilômetros
  const distancia = raioTerra * c;

  return distancia;
}