import { useState } from "react"
import { getUsers } from "@/utils/github-api"
import useFetchRockets from '@/utils/fetchData'

import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

export default function Form({ setForm }:any) {

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    github: '',
    description: ''
  })

  const { loading, error, data, setData } = useFetchRockets()
  const [users, setUsers] = useState([])

  const handleSearch = async (query: string) => {
    const user = await getUsers(query);
    setUsers(user?.items);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const useRef = doc(db, 'rockets', 'rockets')
    await setDoc(useRef, {
      'rocket': {
        [formData.title]: {
          'title': formData.title,
          'name': formData.name,
          'github': formData.github,
          'description': formData.description
        }
      }
    }, { merge: true })
    setData({
      ...data, 
      [formData.title]: {
        'title': formData.title,
        'name': formData.name,
        'github': formData.github,
        'description': formData.description
      }
    })

    setFormData({ title: '', name: '', github: '', description: '' });
    setUsers([])
    setForm((state:any) => state = !state)

  }

  return <div className={`border-2 border-sky-500 rounded-[40px] p-10 w-1/3`}>
    <h2 className={`text-xl font-bold mb-6`}>New Rocket &#128640;</h2>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-white font-bold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="bg-transparent appearance-none border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-white font-bold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="bg-transparent appearance-none border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="github"
          className="block text-white font-bold mb-2"
        >
          Github
        </label>
        <input
          type="text"
          name="github"
          id="github"
          value={formData.github}
          onChange={(e) => {
            handleChange(e)
            e.target.value.length > 2 &&
              handleSearch(e.target.value);
          }}
          className="bg-transparent appearance-none border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />

        {users.length > 0 &&
          <select
            name='gituser'
            id='gituser'
            className='bg-transparent text-white outline-0 w-full h-[50px] border-b-2'
            defaultValue={formData.github}
            onChange={e => setFormData((prev: any) => ({ ...prev, github: e.target.value }))}
            onClick={(e: any) => setFormData((prev: any) => ({ ...prev, github: e.target.value }))}
          >
            {users.map((user: any) => (
              <option
                key={user.id}
                value={user.login}
              >
                {user.login}
              </option>
            ))}
          </select>
        }

      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-white font-bold mb-2"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="bg-transparent appearance-none border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline resize-none"
          rows={4}
        ></textarea>
      </div>
      <div className="flex items-center justify-end flex-wrap">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline w-full mb-4"
        >
          Submit
        </button>
        <button
          type="reset"
          className="text-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline w-full"
          onClick={() => setForm((state: any) => state = !state)}
        >
          Cancel
        </button>

      </div>
    </form>

  </div>
}
