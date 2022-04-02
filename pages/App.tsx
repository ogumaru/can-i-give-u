import { useState, useEffect, createContext } from "react";
import { SearchBox } from "../component/SearchBox";
import { CreateBox } from "../component/CreateBox";
import { DeleteButton } from "../component/DeleteButton";
import { ILikingItemClient } from "../component/typedef";
import { Box } from "@mui/material";

const getList = async () => {
  const response = await fetch(`${window.location.href}api/liking`);
  const itemList = (await response.json()) as ILikingItemClient[];
  return itemList;
};
const initialValue = [] as ILikingItemClient[];
export const RecordsContext = createContext(initialValue);

export default function App() {
  const [records, setRecords] = useState(initialValue);
  const [isReloadRequired, setIsReloadRequired] = useState(true);
  const [selections, setSelections] = useState([] as number[]);
  useEffect(() => {
    if (!isReloadRequired) {
      return;
    }
    const initialize = async () => {
      const _dbRecords = await getList();
      setRecords(_dbRecords);
    };
    initialize();
    setIsReloadRequired(false);
  }, [isReloadRequired]);

  return (
    <RecordsContext.Provider value={records}>
      <Box m={2} pt={3}>
        <CreateBox setIsReloadRequired={setIsReloadRequired} />
        <DeleteButton
          selections={selections}
          setIsReloadRequired={setIsReloadRequired}
        />
        <SearchBox setSelections={setSelections} />
      </Box>
    </RecordsContext.Provider>
  );
}
