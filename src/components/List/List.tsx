import { useEffect } from 'react'
import Card from '../Card/Card'
import useFetchRockets from '@/utils/fetchData'

import { doc, getDoc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../../../firebase'

export default function List({ setForm }: any) {

  const { loading, error, data, setData } = useFetchRockets()

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
      } catch (error: any) {
        console.log(error)
      }
    }
  }, [])

  return <div className={`container mx-auto border-2 border-sky-500 rounded-[40px] pt-10 px-10 pb-6`} >
    <div className={`flex justify-between items-center mb-10`}>
      <h2 className={`text-xl font-bold`}>&#128640; List of Rockets</h2>
      <button
        className={`text-[40px] leading-[1]`}
        onClick={() => setForm((state: any) => state = !state)}
      >
        +
      </button>
    </div>

    {(!loading && data) && (
      <>
        {Object.keys(data).map((card, index) => (
          <Card
            key={index}
            title={data[card].title}
            name={data[card].name}
            github={data[card].github}
            description={data[card].description}
          />

        ))}
      </>
    )}

  </div>
}