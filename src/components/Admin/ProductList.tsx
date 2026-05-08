"use client"

import { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { showConfirm, showError, showSuccess } from '@/components/Admin/Notification'

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
    showConfirm('Delete Product', 'Are you sure you want to delete this product?', async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
        const data = await res.json()
        if (data.success) {
          showSuccess('Deleted', 'Product successfully deleted')
          fetchProducts()
        } else {
          showError('Delete Failed', data.error || 'Failed to delete product')
        }
      } catch (err: any) {
        showError('Delete Failed', err.message || 'Failed to delete product')
      }
    })
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

  if (loading) return <div className="p-4 text-gray-600 dark:text-gray-300">Loading products...</div>

  return (
    <div className="p-4 bg-white dark:bg-[#0B0B0B]">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-playfair text-gray-900 dark:text-white">Products</h2>
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
            <tr className="bg-beige dark:bg-gray-800">
              <th className="border p-2 text-gray-900 dark:text-gray-200">ID</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Image</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Title</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Price</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Category</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">New</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Limited</th>
              <th className="border p-2 text-gray-900 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.id}</td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">
                  <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.title}</td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.price}</td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.category || '-'}</td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.isNew ? 'Yes' : 'No'}</td>
                <td className="border p-2 text-gray-900 dark:text-gray-200">{product.isLimited ? 'Yes' : 'No'}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 dark:text-red-400 hover:underline dark:hover:text-red-300"
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