import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    return NextResponse.json(json.customers || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load customers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newCustomer = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.customers) json.customers = []

    const maxId = json.customers.reduce((max: number, c: any) => Math.max(max, c.id || 0), 0)
    newCustomer.id = maxId + 1
    json.customers.push(newCustomer)

    // Recalculate activeCustomers stat
    if (!json.stats) json.stats = {}
    json.stats.activeCustomers = json.customers.length

    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, customer: newCustomer })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
  }
}
