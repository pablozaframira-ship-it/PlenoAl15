export type Team = {
  id: string;
  name: string;
  short: string;
  crest: string;
  kit: string;
  accent: string;
  databaseName: string;
};

export const teams: Team[] = [
  { id: "alaves", name: "Deportivo Alavés", short: "ALA", crest: "/teams/alaves-crest.webp", kit: "/teams/alaves-kit.png", accent: "#1464a5", databaseName: "Deportivo Alavés" },
  { id: "athletic", name: "Athletic Club", short: "ATH", crest: "/teams/athletic-crest.png", kit: "/teams/athletic-kit.png", accent: "#e1252f", databaseName: "Athletic Club" },
  { id: "atletico", name: "Atlético de Madrid", short: "ATM", crest: "/teams/atletico-crest.png", kit: "/teams/atletico-kit.png", accent: "#d7192d", databaseName: "Atlético de Madrid" },
  { id: "osasuna", name: "C. A. Osasuna", short: "OSA", crest: "/teams/osasuna-crest.png", kit: "/teams/osasuna-kit.png", accent: "#c9152b", databaseName: "CA Osasuna" },
  { id: "elche", name: "Elche C. F.", short: "ELC", crest: "/teams/elche-crest.png", kit: "/teams/elche-kit.png", accent: "#11834c", databaseName: "Elche CF" },
  { id: "barcelona", name: "F. C. Barcelona", short: "BAR", crest: "/teams/barcelona-crest.png", kit: "/teams/barcelona-kit.png", accent: "#a50044", databaseName: "Barcelona" },
  { id: "getafe", name: "Getafe C. F.", short: "GET", crest: "/teams/getafe-crest.png", kit: "/teams/getafe-kit.png", accent: "#0054a6", databaseName: "Getafe CF" },
  { id: "levante", name: "Levante U. D.", short: "LEV", crest: "/teams/levante-crest.png", kit: "/teams/levante-kit.png", accent: "#b31942", databaseName: "UD Levante" },
  { id: "malaga", name: "Málaga C. F.", short: "MAL", crest: "/teams/malaga-crest.png", kit: "/teams/malaga-kit.png", accent: "#0097d7", databaseName: "Málaga CF" },
  { id: "rayo", name: "Rayo Vallecano", short: "RAY", crest: "/teams/rayo-crest.png", kit: "/teams/rayo-kit.png", accent: "#df1b2f", databaseName: "Rayo Vallecano" },
  { id: "betis", name: "Real Betis", short: "BET", crest: "/teams/betis-crest.png", kit: "/teams/betis-kit.png", accent: "#0b8f55", databaseName: "Real Betis" },
  { id: "celta", name: "R. C. Celta", short: "CEL", crest: "/teams/celta-crest.png", kit: "/teams/celta-kit.png", accent: "#75bde8", databaseName: "RC Celta de Vigo" },
  { id: "deportivo", name: "R. C. Deportivo", short: "DEP", crest: "/teams/deportivo-crest.png", kit: "/teams/deportivo-kit.png", accent: "#2364aa", databaseName: "RC Deportivo de la Coruña" },
  { id: "espanyol", name: "R. C. D. Espanyol", short: "ESP", crest: "/teams/espanyol-crest.png", kit: "/teams/espanyol-kit.png", accent: "#1687c7", databaseName: "RCD Espanyol" },
  { id: "real-madrid", name: "Real Madrid C. F.", short: "RMA", crest: "/teams/real-madrid-crest.png", kit: "/teams/real-madrid-kit.png", accent: "#e6b92d", databaseName: "Real Madrid" },
  { id: "racing", name: "Racing de Santander", short: "RAC", crest: "/teams/racing-crest.png", kit: "/teams/racing-kit.png", accent: "#159447", databaseName: "Real Racing Club" },
  { id: "real-sociedad", name: "Real Sociedad", short: "RSO", crest: "/teams/real-sociedad-crest.png", kit: "/teams/real-sociedad-kit.png", accent: "#1677bc", databaseName: "Real Sociedad" },
  { id: "sevilla", name: "Sevilla F. C.", short: "SEV", crest: "/teams/sevilla-crest.png", kit: "/teams/sevilla-kit.png", accent: "#d62132", databaseName: "Sevilla FC" },
  { id: "valencia", name: "Valencia C. F.", short: "VAL", crest: "/teams/valencia-crest.png", kit: "/teams/valencia-kit.png", accent: "#ef7c00", databaseName: "Valencia CF" },
  { id: "villarreal", name: "Villarreal C. F.", short: "VIL", crest: "/teams/villarreal-crest.png", kit: "/teams/villarreal-kit.png", accent: "#f2d21b", databaseName: "Villarreal CF" },
];

export const teamById = Object.fromEntries(teams.map((team) => [team.id, team]));
