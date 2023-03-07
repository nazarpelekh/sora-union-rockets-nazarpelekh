import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getUsers } from "@/utils/github-api"
import { doc, setDoc, getDoc, deleteField } from 'firebase/firestore'
import { db } from '../../../firebase'
import useFetchRockets from '@/utils/fetchData'

import shuttle from 'public/shuttle.jpg'

export default function Card({ title, name, description, github, setUpdate }: any) {

  const [gitUser, setGitUser] = useState([] as any)
  const { loading, error, data, setData } = useFetchRockets()

  const handleDelete = async (query: string) => {
    const useRef = doc(db, 'rockets', 'rockets')
    await setDoc(useRef, {
      'rocket': {
        [query]: deleteField()
      }
    }, { merge: true })
    let newObj = { ...data }
    delete newObj.title
    setData({ ...newObj })
  }

  {
    github &&
      useEffect(() => {
        const git = async () => {
          const user = await getUsers(github);
          setGitUser(user?.items);
        }
        git()
      }, [])
  }

  return <div className={`border-2 border-sky-500 rounded-[30px] p-4 md:p-8 mb-8`}>
    <div className='sm:flex'>
      <Image
        width={600}
        src={shuttle}
        alt='shuttle'
        className='rounded-[30px] sm:max-w-[30%]'
      />
      <div className='ml-6 w-full'>
        <div className='flex justify-between w-full items-start'>
          <div className='font-bold text-lg capitalize mb-6'>{title}</div>
          <div>
            <button className='edit mx-4'>&#128395;</button>
            <button
              className='delete'
              onClick={() => handleDelete(title)}
            >
              &#128465;
            </button>
          </div>
        </div>
        <div className='mb-4'>{name}</div>

        {description &&
          <div>{description}</div>
        }

        {gitUser.length > 0 &&
          <div className='flex items-center mt-6'>
            <img
              src={gitUser[0]?.avatar_url}
              width={50}
              height={50}
              alt=''
              className='rounded-full mr-6'
            />
            <span>{github}</span>
          </div>
        }

      </div>
    </div>

  </div>
}