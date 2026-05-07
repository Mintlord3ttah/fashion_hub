import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    return NextResponse.json(json.discounts || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load discounts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newDiscount = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.discounts) json.discounts = []

    const maxId = json.discounts.reduce((max: number, d: any) => Math.max(max, d.id || 0), 0)
    newDiscount.id = maxId + 1
    json.discounts.push(newDiscount)

    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, discount: newDiscount })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create discount' }, { status: 500 })
  }
}
