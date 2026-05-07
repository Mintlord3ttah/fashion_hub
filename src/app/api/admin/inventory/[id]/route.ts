import { NextResponse, NextRequest } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.inventory) return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })

    const index = json.inventory.findIndex((i: any) => i.id === parseInt(id))
    if (index === -1) return NextResponse.json({ error: 'Item not found' }, { status: 404 })

    json.inventory[index] = { ...json.inventory[index], ...updates }
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, item: json.inventory[index] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inventory item' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.inventory) return NextResponse.json({ error: 'Inventory not found' }, { status: 404 })

    json.inventory = json.inventory.filter((i: any) => i.id !== parseInt(id))
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inventory item' }, { status: 500 })
  }
}
