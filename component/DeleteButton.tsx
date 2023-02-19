import { IconButton } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ComponentProps,
} from "react";
import React from "react";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { IDeletedResponse, ILikingItemClient } from "./typedef";

export const DeleteButton = (
  props: ComponentProps<"button"> & {
    selections: number[];
    setter: Dispatch<SetStateAction<ILikingItemClient[]>>;
  }
) => {
  const deleteRecord = async (IDList: number[]) => {
    const requestInit: RequestInit = {
      method: "DELETE",
      body: JSON.stringify(IDList),
    };
    const response = await fetch(
      `${window.location.href}api/liking`,
      requestInit
    );
    if (response.ok) {
      const json = (await response.json()) as IDeletedResponse;
      props.setter(json.records);
    } else {
      // TODO: Error handling
    }
  };
  useEffect(() => {
    if (props.selections.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [props.selections]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        disabled={isButtonDisabled}
        onClick={async () => await deleteRecord(props.selections)}
      >
        <DeleteSweepOutlinedIcon />
      </IconButton>
    </>
  );
};
