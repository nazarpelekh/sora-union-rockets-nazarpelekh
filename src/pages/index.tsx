import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import Form from '@/components/Form/Form'
import List from '@/components/List/List'

export default function Home() {
  const [form, setForm] = useState<boolean>(false)
  return <>
    <Head>
      <title>Rocket App</title>
      <meta name="description" content="Rocket App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={`flex justify-center min-h-screen h-full items-center my-4 md:my-10`}>
      {!form
        ? <List setForm={setForm} />
        : <Form setForm={setForm} />
      }
    </main>
  </>
}
