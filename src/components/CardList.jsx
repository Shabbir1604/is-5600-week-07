import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = () => {
  const limit = 10
  const [offset, setOffset] = useState(0)
  const [products, setProducts] = useState([])

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err))
  }

  useEffect(() => {
    fetchProducts()
  }, [offset])

  const filterTags = (tagQuery) => {
    const filtered = products.filter((product) => {
      if (!tagQuery) return true
      return product.tags.find(({ title }) => title === tagQuery)
    })

    setOffset(0)
    setProducts(filtered)
  }

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(Math.max(0, offset - limit))} />
        <Button text="Next" handleClick={() => setOffset(offset + limit)} />
      </div>
    </div>
  )
}

export default CardList
