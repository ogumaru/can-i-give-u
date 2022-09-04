import { useState, useEffect, createContext } from "react";
import { SearchBox } from "../component/SearchBox";
import { CreateBox } from "../component/CreateBox";
import { DeleteButton } from "../component/DeleteButton";
import { ILikingItemClient, IReadResponse } from "../component/typedef";
import { Box, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const getList = async () => {
  const response = await fetch(`${window.location.href}api/liking`);
  if (response.ok) {
    const json = (await response.json()) as IReadResponse;
    return json.records;
  } else {
    throw new Error("Cannot fetch items");
    // TODO: Error handling
  }
};
const initialValue = [] as ILikingItemClient[];
export const RecordsContext = createContext(initialValue);

export default function App() {
  const [records, setRecords] = useState(initialValue);
  const [selections, setSelections] = useState([] as number[]);
  const [isSnackOpen, setIsSnakOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const isWide = useMediaQuery("(min-width:600px)");
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
    const initialize = async () => {
      const _dbRecords = await getList();
      setRecords(_dbRecords);
    };
    initialize();
  }, []);

  return (
    <RecordsContext.Provider value={records}>
      <Box m={isWide ? 2 : 0} pt={isWide ? 3 : 0}>
        <CreateBox setter={setRecords} showError={showError} />
        <DeleteButton selections={selections} setter={setRecords} />
        <SearchBox setSelections={setSelections} />
      </Box>
      <Snackbar
        open={isSnackOpen}
        action={action}
        autoHideDuration={3000}
        onClose={() => setIsSnakOpen(false)}
        message={snackMessage}
      />
    </RecordsContext.Provider>
  );
}
