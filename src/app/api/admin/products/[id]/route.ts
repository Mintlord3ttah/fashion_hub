import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'products.json')

async function getProducts() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

async function saveProducts(products: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const updates = await request.json()
  const products = await getProducts()

  const index = products.findIndex((p: any) => p.id === id)
  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
  }

  products[index] = { ...products[index], ...updates, id } // keep id unchanged
  await saveProducts(products)

  return NextResponse.json({ success: true, product: products[index] })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const products = await getProducts()

  const filtered = products.filter((p: any) => p.id !== id)
  if (filtered.length === products.length) {
    return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 })
  }

  await saveProducts(filtered)
  return NextResponse.json({ success: true })
}