import { IconButton } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";

export const DeleteButton = (props: {
  selections: number[];
  setIsReloadRequired: Dispatch<SetStateAction<boolean>>;
}) => {
  const deleteRecord = async (IDList: number[]) => {
    const requestInit: RequestInit = {
      method: "DELETE",
      body: JSON.stringify(IDList),
    };
    const response = await fetch(
      `${window.location.href}api/liking`,
      requestInit
    );
    props.setIsReloadRequired(true);
    return response;
  };
  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={() => deleteRecord(props.selections)}
      >
        <DeleteSweepOutlinedIcon />
      </IconButton>
    </>
  );
};
