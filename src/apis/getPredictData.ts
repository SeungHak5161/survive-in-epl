"use server"

const getDBData = async () => {
  const dbId = "b6e42faec8b74ea4ad78115ca93fb7d7"
  const url = `https://api.notion.com/v1/databases/${dbId}/query`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
      cache: "no-store",
    })
    if (!res.ok) throw new Error("HTTP ERROR OCCURED")
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error as string)
  }
}

export default getDBData
