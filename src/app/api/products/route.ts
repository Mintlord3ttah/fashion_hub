import { NextResponse } from 'next/server'
import fs from 'node:fs/promises'
import path from 'node:path'

const dataFilePath = path.resolve(process.cwd(), 'data', 'products.json')

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    const products = JSON.parse(data)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json([])
  }
}
