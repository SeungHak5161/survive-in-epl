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

interface IMatch {
  area: {
    id: number
    name: string
    code: string
    flag: string
  }
  competition: {
    id: number
    name: string
    code: string
    type: string
    emblem: string
  }
  season: {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: any
  }
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: any
  lastUpdated: string
  homeTeam: ITeam
  awayTeam: ITeam
  score: {
    winner: string
    duration: string
    fullTime: {
      home: number
      away: number
    }
    halfTime: {
      home: number
      away: number
    }
  }
  referees: {
    id: number
    name: string
    type: string
  }[]
}
