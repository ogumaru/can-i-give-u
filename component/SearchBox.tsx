import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { RecordsContext } from "../pages/App";
import Records from "./Record";

export function SearchBox(prop: {
  setSelections: Dispatch<SetStateAction<number[]>>;
}) {
  const records = useContext(RecordsContext);
  const [input, setInput] = useState<string | null>(null);
  const displayRecords = records.filter((record) => {
    if (!input) return true;
    const names = [record.displayName, record.alias].flat().join(" ");
    return names.includes(input);
  });

  return (
    <>
      <Autocomplete
        freeSolo
        onChange={(_, input) => {
          setInput(input);
        }}
        options={records.map((record) => record.displayName)}
        renderInput={(params) => <TextField key={params.id} {...params} />}
      />
      <Records records={displayRecords} setSelections={prop.setSelections} />
    </>
  );
}
