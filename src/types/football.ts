interface ITeam {
  crest: string
  id: number
  name: string
  shortName: string
  tla: string
}

interface IStandings {
  position: number
  team: ITeam
  playedGames: number
  form: string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}
