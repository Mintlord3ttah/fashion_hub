import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)
    return NextResponse.json(json.orders || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newOrder = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.orders) json.orders = []

    // Generate sequential order ID
    const maxId = json.orders.reduce((max: number, o: any) => {
      const num = parseInt(o.id?.replace('ORD-', '') || '0')
      return Math.max(max, num)
    }, 0)
    newOrder.id = `ORD-${String(maxId + 1).padStart(3, '0')}`
    json.orders.push(newOrder)

    // Recalculate dashboard stats based on updated orders
    const totalOrders = json.orders.length
    const totalRevenue = json.orders.reduce((sum: number, o: any) => {
      // Extract numeric value from amount string like "$2,850"
      const num = parseFloat(o.amount.replace(/[^0-9.-]+/g, ''))
      return sum + (isNaN(num) ? 0 : num)
    }, 0)
    // Update stats in dashboard data
    if (!json.stats) json.stats = {}
    json.stats.totalOrders = totalOrders
    json.stats.totalRevenue = `$${totalRevenue.toLocaleString()}`

    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, order: newOrder })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
