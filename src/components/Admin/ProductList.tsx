"use client"

import { useEffect, useState } from 'react'
import ProductForm from './ProductForm'

interface Product {
  id: number
  image: string
  title: string
  description: string
  price: string
  category?: string
  isNew?: boolean
  isLimited?: boolean
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to fetch products', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchProducts()
      } else {
        alert('Delete failed')
      }
    } catch (err) {
      alert('Delete failed')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingProduct(undefined)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingProduct(undefined)
    fetchProducts()
  }

  if (loading) return <div className="p-4">Loading products...</div>

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-playfair">Products</h2>
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded hover:bg-[var(--gold)] hover:text-black transition"
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false)
              setEditingProduct(undefined)
            }}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-beige">
              <th className="border p-2">ID</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">New</th>
              <th className="border p-2">Limited</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border p-2">{product.id}</td>
                <td className="border p-2">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="border p-2">{product.title}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.category || '-'}</td>
                <td className="border p-2">{product.isNew ? 'Yes' : 'No'}</td>
                <td className="border p-2">{product.isLimited ? 'Yes' : 'No'}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}