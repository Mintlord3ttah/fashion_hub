"use client"

import { useState, FormEvent } from 'react'

interface Product {
  id?: number
  image: string
  title: string
  description: string
  price: string
  category?: string
  isNew?: boolean
  isLimited?: boolean
}

interface Props {
  product?: Product
  onSuccess: () => void
  onCancel?: () => void
}

export default function ProductForm({ product, onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState<Product>(
    product ?? {
      image: '',
      title: '',
      description: '',
      price: '',
      category: '',
      isNew: false,
      isLimited: false,
    }
  )
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const method = product?.id ? 'PUT' : 'POST'
      const url = product?.id
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Failed')
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-lg mx-auto">
      <h3 className="text-lg font-semibold mb-4">{product?.id ? 'Edit' : 'Add'} Product</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={formData.category || ''}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isNew"
            checked={formData.isNew ?? false}
            onChange={handleChange}
          />
          <span>New Arrival</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isLimited"
            checked={formData.isLimited ?? false}
            onChange={handleChange}
          />
          <span>Limited Edition</span>
        </label>
        <div className="flex space-x-2 mt-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Save
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}