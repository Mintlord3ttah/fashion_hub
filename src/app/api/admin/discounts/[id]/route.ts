import { NextResponse, NextRequest } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'dashboard.json')

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const updates = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.discounts) return NextResponse.json({ error: 'Discounts not found' }, { status: 404 })

    const index = json.discounts.findIndex((d: any) => d.id === id)
    if (index === -1) return NextResponse.json({ error: 'Discount not found' }, { status: 404 })

    json.discounts[index] = { ...json.discounts[index], ...updates }
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, discount: json.discounts[index] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update discount' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json.discounts) return NextResponse.json({ error: 'Discounts not found' }, { status: 404 })

    json.discounts = json.discounts.filter((d: any) => d.id !== id)
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete discount' }, { status: 500 })
  }
}
