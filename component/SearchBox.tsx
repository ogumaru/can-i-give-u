import { useContext, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material'
import { RecordsContext } from '../pages/App'
import Records from './Record'

export function SearchBox() {
  const records = useContext(RecordsContext)
  const [displayRecords, setDisplayRecords] = useState(records)
  useEffect(() => {
    setDisplayRecords(records)
  }, [records])

  return (
    <>
      <Autocomplete
      freeSolo
      onChange={(_, input) => {
        if (input === null) {
          setDisplayRecords(records)
          return
        }
        const filtered = records.filter((record) => {
          const alias = [record.displayName].concat(record.alias).join(', ')
          return alias.includes(input)
        })
        setDisplayRecords(filtered);
      }}
      options={records.map(record => record.displayName)}
      renderInput={params => <TextField key={params.id} {...params} />}
      />
      <Records records={ displayRecords } />
    </>
  )
}
