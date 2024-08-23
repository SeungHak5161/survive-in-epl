"use server"

import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const createDBItem = async (data: any) => {
  const dbId = "b6e42faec8b74ea4ad78115ca93fb7d7"
  try {
    const res = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: dbId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        predict: {
          rich_text: [
            {
              text: {
                content: data.predict,
              },
            },
          ],
        },
      },
    })
    return res
  } catch (error) {
    throw new Error(error as string)
  }
}

export default createDBItem
