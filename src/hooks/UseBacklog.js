import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot }
  from "firebase/firestore"
import { db } from '../lib/Firebase'

export default function useBacklog() {
  const [backlog, setBacklog] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'backlog'), orderBy('slug', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      setBacklog(querySnapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return { backlog }
}