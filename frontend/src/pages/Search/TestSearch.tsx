import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const TestSearch = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [rawResponse, setRawResponse] = useState<any>(null)

  useEffect(() => {
    if (query) {
      testSearch(query)
    }
  }, [query])

  const testSearch = async (searchQuery: string) => {
    setLoading(true)
    console.log('=== TESTING SEARCH ===')
    console.log('Query:', searchQuery)
    
    try {
      const response = await axios.get(`http://localhost:8888/api/books/search?q=${encodeURIComponent(searchQuery)}`)
      console.log('Raw response:', response)
      console.log('Response data:', response.data)
      console.log('Response data type:', typeof response.data)
      console.log('Has data property:', 'data' in response.data)
      console.log('Data property:', response.data.data)
      console.log('Data is array:', Array.isArray(response.data.data))
      
      setRawResponse(response.data)
      
      // Try different ways to extract data
      let extractedData = []
      
      if (response.data?.data && Array.isArray(response.data.data)) {
        extractedData = response.data.data
        console.log('Method 1 - Direct data array:', extractedData.length)
      } else if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
        extractedData = response.data.data.data
        console.log('Method 2 - Nested data array:', extractedData.length)
      } else if (Array.isArray(response.data)) {
        extractedData = response.data
        console.log('Method 3 - Root array:', extractedData.length)
      }
      
      console.log('Final extracted data:', extractedData)
      setResults(extractedData)
      
    } catch (error) {
      console.error('Search failed:', error)
      setRawResponse({ error: error.message })
    }
    
    setLoading(false)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Search: "{query}"</h1>
      
      {loading && <p>Loading...</p>}
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Raw Response:</h2>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-64">
          {JSON.stringify(rawResponse, null, 2)}
        </pre>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Extracted Results: {results.length}</h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item: any, index: number) => (
              <div key={item._id || index} className="border p-3 rounded">
                <h3 className="font-semibold">{item.title || 'No title'}</h3>
                <p className="text-sm text-gray-600">Price: {item.price || 'No price'}</p>
                <p className="text-sm text-gray-600">ID: {item._id || 'No ID'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results to display</p>
        )}
      </div>
    </div>
  )
}

export default TestSearch