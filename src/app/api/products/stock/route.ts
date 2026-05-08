import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    const inventory = json.inventory || []
    return NextResponse.json(inventory)
  } catch (error) {
    return NextResponse.json([])
  }
}
