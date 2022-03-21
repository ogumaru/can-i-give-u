import { useState, useEffect, createContext } from "react";
import { SearchBox } from "../component/SearchBox";
import { CreateBox } from "../component/CreateBox";
import { ILikingItemClient } from "../component/typedef";
import { Box } from "@mui/material";

const getList = async () => {
  const response = await fetch("http://localhost:3000/api/liking");
  const itemList = (await response.json()) as ILikingItemClient[];
  return itemList;
};
const initialValue = [] as ILikingItemClient[];
export const RecordsContext = createContext(initialValue);

export default function App() {
  const [records, setRecords] = useState(initialValue);
  const [isReloadRequired, setIsReloadRequired] = useState(false);
  useEffect(() => {
    const initialize = async () => {
      const _dbRecords = await getList();
      setRecords(_dbRecords);
    };
    initialize();
  }, [isReloadRequired]);

  return (
    <RecordsContext.Provider value={records}>
      <Box m={2} pt={3}>
        <CreateBox setIsReloadRequired={setIsReloadRequired} />
        <SearchBox />
      </Box>
    </RecordsContext.Provider>
  );
}
