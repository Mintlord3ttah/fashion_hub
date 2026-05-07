import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'products.json')

async function getProducts() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return empty array
    return []
  }
}

async function saveProducts(products: any[]) {
  await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), 'utf8')
}

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  const newProduct = await request.json()
  const products = await getProducts()

  // Generate new ID
  const maxId = products.reduce((max: number, p: any) => Math.max(max, p.id || 0), 0)
  newProduct.id = maxId + 1

  products.push(newProduct)
  await saveProducts(products)

  return NextResponse.json({ success: true, product: newProduct })
}