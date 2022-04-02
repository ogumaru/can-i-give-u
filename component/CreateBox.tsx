import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import { INewRecord } from "./typedef";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

const defaultValues = {
  isLike: false,
  isAllergy: true,
};

const setRecord = async (record: INewRecord) => {
  const requestInit: RequestInit = {
    method: "POST",
    body: JSON.stringify(record),
  };
  await fetch(`${window.location.href}api/liking`, requestInit);
};

const ButtonSubmitNew = (prop: { record: INewRecord; reset: () => void }) => {
  const postData = async (record: INewRecord) => {
    await setRecord(record);
    // Success
    if (true) {
      prop.reset();
    }
  };
  return (
    <Button variant="contained" onClick={(_) => postData(prop.record)}>
      保存
    </Button>
  );
};

const StoredNameField = (prop: any) => {
  return (
    <>
      <TextField
        label={prop.label}
        value={prop.value}
        onInput={(event) => {
          const value = (event.target as HTMLInputElement).value;
          prop.setter(value);
        }}
      />
    </>
  );
};

const StoredAliasField = (prop: {
  label: string;
  value: string;
  index: number;
  aliasList: string[];
  setter: (arg: string[]) => void;
}) => {
  const [currentInput, setCurrentInput] = useState(prop.value);
  return (
    <>
      <TextField
        label={prop.label}
        value={currentInput}
        onInput={(event) => {
          const inputValue = (event.target as HTMLInputElement).value as string;
          setCurrentInput(inputValue);
          prop.aliasList[prop.index] = inputValue;
          prop.setter(prop.aliasList);
        }}
      />
    </>
  );
};

const ButtonAddAlias = (prop: {
  value: string[];
  setter: (arg: string[]) => void;
}) => {
  const onClick = () => {
    prop.setter(prop.value.concat([""]));
  };
  return (
    <>
      <Button onClick={onClick}>追加</Button>
    </>
  );
};
export const CreateBox = (prop: {
  setIsReloadRequired: Dispatch<SetStateAction<boolean>>;
}) => {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [isLike, setIsLike] = useState(defaultValues.isLike);
  const [isAllergy, setIsAllergy] = useState(defaultValues.isAllergy);
  const [aliasList, setAlias] = useState([] as string[]);
  const newRecord = {
    displayName,
    description,
    alias: aliasList,
    isLike,
    isAllergy,
  };

  const reset = () => {
    setDisplayName("");
    setDescription("");
    setAlias([] as string[]);
    setIsLike(defaultValues.isLike);
    setIsAllergy(defaultValues.isAllergy);
    prop.setIsReloadRequired(true);
  };
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2, md: 4 }}
        direction={{ xs: "column", sm: "row" }}
      >
        <StoredNameField
          label={"名前"}
          value={displayName}
          setter={setDisplayName}
        />
        <StoredNameField
          label={"概要"}
          value={description}
          setter={setDescription}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isLike}
              onChange={(e) => setIsLike(e.target.checked)}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          }
          label="好み"
          labelPlacement="end"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAllergy}
              onChange={(e) => setIsAllergy(e.target.checked)}
              icon={<RestaurantOutlinedIcon />}
              checkedIcon={<NoMealsOutlinedIcon />}
            />
          }
          label="アレルギー"
          labelPlacement="end"
        />
        <ButtonAddAlias value={aliasList} setter={setAlias} />
        {aliasList.map((alias, index) => (
          <StoredAliasField
            key={`${alias}-${index}`}
            label={"別名"}
            value={alias}
            index={index}
            aliasList={aliasList}
            setter={setAlias}
          />
        ))}
        <ButtonSubmitNew record={newRecord} reset={reset} />
      </Stack>
    </>
  );
};
