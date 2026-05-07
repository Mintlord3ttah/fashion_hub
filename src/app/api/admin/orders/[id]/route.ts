import { NextResponse, NextRequest } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const updates = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.orders) return NextResponse.json({ error: 'Orders not found' }, { status: 404 })

    const index = json.orders.findIndex((o: any) => o.id === id)
    if (index === -1) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    json.orders[index] = { ...json.orders[index], ...updates }
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, order: json.orders[index] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.orders) return NextResponse.json({ error: 'Orders not found' }, { status: 404 })

    json.orders = json.orders.filter((o: any) => o.id !== id)
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}
