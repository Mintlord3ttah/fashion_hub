import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    return NextResponse.json(json.inventory || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load inventory' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newItem = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.inventory) json.inventory = []

    const maxId = json.inventory.reduce((max: number, i: any) => Math.max(max, i.id || 0), 0)
    newItem.id = maxId + 1
    json.inventory.push(newItem)

    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, item: newItem })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create inventory item' }, { status: 500 })
  }
}
