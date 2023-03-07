import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export default function useFetchRockets() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData]:any = useState()

    useEffect(() => {
      async function fetchData() {
        try {
          const docRef = doc(db, 'rockets', 'rockets')
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
              setData(docSnap.data().rocket)
          } else {
              setData({} as any)
          }
        } catch (err) {
          setError('Failed to load rockets')
          console.log(err)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }, [])

    return { loading, error, data, setData }
}