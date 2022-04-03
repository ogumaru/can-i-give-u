import { useState, useEffect, createContext } from "react";
import { SearchBox } from "../component/SearchBox";
import { CreateBox } from "../component/CreateBox";
import { DeleteButton } from "../component/DeleteButton";
import { ILikingItemClient } from "../component/typedef";
import { Box, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const [isSnackOpen, setIsSnakOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const showError = (message: string) => {
    setSnackMessage(message);
    setIsSnakOpen(true);
  };
  const action = (
    <>
      <IconButton size="small" onClick={() => setIsSnakOpen(false)}>
        <CloseIcon fontSize="small" color="inherit" />
      </IconButton>
    </>
  );
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
        <CreateBox
          setIsReloadRequired={setIsReloadRequired}
          showError={showError}
        />
        <DeleteButton
          selections={selections}
          setIsReloadRequired={setIsReloadRequired}
        />
        <SearchBox setSelections={setSelections} />
      </Box>
      <Snackbar
        open={isSnackOpen}
        action={action}
        autoHideDuration={3000}
        message={snackMessage}
      />
    </RecordsContext.Provider>
  );
}
