import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    const discounts = json.discounts || []
    // Only return active discounts
    const activeDiscounts = discounts.filter((d: any) => d.status === 'Active')
    return NextResponse.json(activeDiscounts)
  } catch (error) {
    return NextResponse.json([])
  }
}
