"use client";

import { useMemo, useState } from "react";
import { teams, teamById, type Team } from "./team-data";
import { calendar } from "./calendar-data";
import teamDatabase from "./team-database.json";

const ranking = [
  ["1", "Marcos", "148", "+2"],
  ["2", "Lucía", "141", "—"],
  ["3", "Pablo", "136", "+1"],
  ["4", "Antonio", "129", "−2"],
];

function Crest({ team, size = "normal" }: { team: Team; size?: "normal" | "large" }) {
  return <span className={`crest ${size}`}><img src={team.crest} alt={`Escudo del ${team.name}`} /></span>;
}

export default function Home() {
  const [tab, setTab] = useState("Inicio");
  const [league, setLeague] = useState("Liga Pleno");
  const [matchday, setMatchday] = useState(1);
  const [scores, setScores] = useState<Record<string, [number, number]>>({});
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const round = calendar[matchday - 1];
  const visibleMatches = useMemo(() => round.matches.slice(0, tab === "Pronósticos" ? 10 : 3), [round, tab]);

  const changeScore = (index: number, side: 0 | 1, amount: number) => {
    const key = `${matchday}-${index}`;
    const current = scores[key] ?? [0, 0];
    const next: [number, number] = [...current] as [number, number];
    next[side] = Math.max(0, Math.min(9, next[side] + amount));
    setScores({ ...scores, [key]: next });
  };

  const selectedTeam = selectedTeamId ? teamById[selectedTeamId] : null;
  const selectedClub = selectedTeam ? teamDatabase.equipos.find((club) => club.nombre === selectedTeam.databaseName) : null;
  const title = tab === "Pronósticos" ? "Todos los pronósticos" : tab === "Ligas" ? (selectedTeam ? "Ficha del equipo" : "Los 20 clubes") : "Próximos partidos";

  const playerGroup = (position: string) => {
    if (position === "Portero") return "Porteros";
    if (position.includes("Lateral") || position === "Central") return "Defensas";
    if (position.includes("Mediocentro")) return "Centrocampistas";
    return "Atacantes";
  };

  return (
    <main>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand-mark"><span>15</span></div>
          <div className="brand-copy"><strong>PlenoAl<span>15</span></strong><small>PRONOSTICA · COMPITE · GANA</small></div>
          <button className="avatar" aria-label="Abrir perfil">PZ</button>
        </header>

        {tab === "Inicio" && (
          <>
            <section className="welcome">
              <div><p className="eyebrow">TEMPORADA 26/27</p><h1>Buenas tardes,<br /><em>Pablo.</em></h1></div>
              <div className="matchday-seal"><span>JORNADA</span><b>{String(matchday).padStart(2, "0")}</b></div>
            </section>
            <nav className="league-switch" aria-label="Seleccionar competición">
              {["Liga Pleno", "Premier", "Champions"].map((item) => <button key={item} onClick={() => setLeague(item)} className={league === item ? "active" : ""}>{item}</button>)}
            </nav>
            <section className="summary-card">
              <div><span>Tu puesto</span><b>3º</b><small>de 18 jugadores</small></div><div className="rule" />
              <div><span>Tus puntos</span><b>136</b><small><i>↑ 1</i> esta jornada</small></div><div className="rule" />
              <div><span>Aciertos</span><b>68%</b><small>temporada</small></div>
            </section>
          </>
        )}

        <section className={tab === "Inicio" ? "section-head" : "section-head page-heading"}>
          <div><p className="eyebrow">{league.toUpperCase()} · JORNADA {String(matchday).padStart(2, "0")}</p><h2>{title}</h2></div>
          {tab === "Inicio" && <button onClick={() => setTab("Pronósticos")}>Ver todos →</button>}
        </section>

        {tab !== "Ligas" ? (
          <>
          {tab === "Pronósticos" && <div className="matchday-picker">
            <button onClick={() => setMatchday((value) => Math.max(1, value - 1))} disabled={matchday === 1} aria-label="Jornada anterior">‹</button>
            <label><span>CALENDARIO 2026/27</span><select value={matchday} onChange={(event) => setMatchday(Number(event.target.value))}>{calendar.map((item) => <option value={item.number} key={item.number}>Jornada {item.number} · {item.date}</option>)}</select></label>
            <button onClick={() => setMatchday((value) => Math.min(38, value + 1))} disabled={matchday === 38} aria-label="Jornada siguiente">›</button>
          </div>}
          <section className="match-list">
            {visibleMatches.map((match, index) => {
              const home = teamById[match.home]; const away = teamById[match.away]; const score = scores[`${matchday}-${index}`] ?? [0, 0];
              return (
                <article className="match-card" key={`${match.home}-${match.away}`}>
                  <div className="match-time">JORNADA {matchday} · {round.date}</div>
                  <div className="teams">
                    <div className="team"><Crest team={home} /><strong>{home.name}</strong></div>
                    <div className="score-picker">
                      <button onClick={() => changeScore(index, 0, -1)} aria-label={`Restar gol a ${home.name}`}>−</button>
                      <b>{score[0]}</b><span>:</span><b>{score[1]}</b>
                      <button onClick={() => changeScore(index, 1, 1)} aria-label={`Sumar gol a ${away.name}`}>+</button>
                    </div>
                    <div className="team away"><strong>{away.name}</strong><Crest team={away} /></div>
                  </div>
                </article>
              );
            })}
          </section>
          </>
        ) : selectedTeam && selectedClub ? (
          <section className="club-profile" style={{ "--team": selectedTeam.accent } as React.CSSProperties}>
            <button className="back-button" onClick={() => setSelectedTeamId(null)}>← Todos los equipos</button>
            <div className="club-profile-hero">
              <div className="profile-crest"><Crest team={selectedTeam} size="large" /></div>
              <div><span className="club-code">{selectedTeam.short} · TEMPORADA 25/26</span><h3>{selectedTeam.name}</h3><p>{selectedClub.ciudad}</p></div>
            </div>
            <div className="coach-card"><span>ENTRENADOR</span><strong>{selectedClub.entrenador}</strong><small>{selectedClub.jugadores.length} jugadores en la plantilla</small></div>
            <div className="squad-groups">
              {["Porteros", "Defensas", "Centrocampistas", "Atacantes"].map((group) => {
                const players = selectedClub.jugadores.filter((player) => playerGroup(player.posicion) === group);
                return <div className="squad-group" key={group}><div className="squad-title"><h4>{group}</h4><span>{players.length}</span></div>{players.map((player, index) => <div className="player-row" key={`${player.nombre}-${player.posicion}-${index}`}><strong>{player.nombre}</strong><small>{player.posicion}</small></div>)}</div>;
              })}
            </div>
          </section>
        ) : (
          <section className="club-grid">
            {teams.map((team) => (
              <button className="club-card" key={team.id} style={{ "--team": team.accent } as React.CSSProperties} onClick={() => setSelectedTeamId(team.id)}>
                <div className="crest-frame"><Crest team={team} size="large" /></div>
                <strong>{team.name}</strong>
                <span>{team.short} · VER PLANTILLA</span>
              </button>
            ))}
          </section>
        )}

        {tab === "Inicio" && (
          <section className="ranking-card">
            <div className="ranking-title"><div><p className="eyebrow">TU LIGA PRIVADA</p><h2>Los del domingo</h2></div><button>Clasificación completa →</button></div>
            {ranking.map(([pos, name, points, trend]) => <div className={`rank-row ${name === "Pablo" ? "me" : ""}`} key={name}><span>{pos}</span><strong>{name}{name === "Pablo" && <small>TÚ</small>}</strong><i>{trend}</i><b>{points}<small> pts</small></b></div>)}
          </section>
        )}

        <nav className="bottom-nav" aria-label="Navegación principal">
          {[{n:"Inicio",i:"⌂"},{n:"Pronósticos",i:"✓"},{n:"Ligas",i:"◆"},{n:"Estadísticas",i:"▥"},{n:"Perfil",i:"○"}].map((item) => <button key={item.n} onClick={() => { setTab(item.n); if (item.n !== "Ligas") setSelectedTeamId(null); }} className={tab === item.n ? "active" : ""}><span>{item.i}</span>{item.n}</button>)}
        </nav>
      </div>
    </main>
  );
}
