"use server"

const token = process.env.EPL_TOKEN || ""
export const getStandings = async () => {
  const url = "https://api.football-data.org/v4/competitions/PL/standings"
  const options = {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  }

  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getFurtherMatches = async () => {
  const url = "https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED"
  const options = {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  }

  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getOngoingMatches = async () => {
  const url = "https://api.football-data.org/v4/competitions/PL/matches?status=IN_PLAY"
  const options = {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  }

  try {
    const res = await fetch(url, options)
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}
