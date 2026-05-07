import { NextResponse, NextRequest } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'products.json')

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updates = await request.json()
    const data = await fs.readFile(dataFilePath, 'utf8')
    const json = JSON.parse(data)

    if (!json) return NextResponse.json({ error: 'Products not found' }, { status: 404 })

    const index = json.findIndex((p: any) => p.id === parseInt(id))
    if (index === -1) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    json[index] = { ...json[index], ...updates, id: parseInt(id) }
    await fs.writeFile(dataFilePath, JSON.stringify(json, null, 2), 'utf8')
    return NextResponse.json({ success: true, product: json[index] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
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

    if (!json) return NextResponse.json({ error: 'Products not found' }, { status: 404 })

    const filtered = json.filter((p: any) => p.id !== parseInt(id))
    if (filtered.length === json.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2), 'utf8')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
