import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction, useState, ComponentProps } from "react";
import React from "react";
import { ICreatedResponse, ILikingItemClient, INewRecord } from "./typedef";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import { uniqueExists } from "../controller/collection";

const defaultValues = {
  isLike: false,
  isAllergy: true,
};

const setRecord = async (record: INewRecord) => {
  const requestInit: RequestInit = {
    method: "POST",
    body: JSON.stringify(record),
  };
  const response = await fetch(
    `${window.location.href}api/liking`,
    requestInit
  );
  return response;
};

const isValidRecord = (record: INewRecord) => {
  if (!record.displayName) return false;
  return true;
};

const ButtonSubmitNew = (
  prop: ComponentProps<"button"> & {
    setter: Dispatch<SetStateAction<ILikingItemClient[]>>;
    record: INewRecord;
    reset: () => void;
    setDisabled: Dispatch<SetStateAction<boolean>>;
    showError: (message: string) => void;
  }
) => {
  const postData = async (record: INewRecord) => {
    prop.setDisabled(true);
    if (!isValidRecord(record)) {
      prop.showError("エラー: 入力が不十分です");
    } else {
      const response = await setRecord(record);
      if (response.ok) {
        const json = (await response.json()) as ICreatedResponse;
        prop.setter(json.records);
        prop.reset();
      } else {
        prop.showError("エラー: 保存に失敗しました");
      }
    }
    prop.setDisabled(false);
  };
  return (
    <Button
      variant="contained"
      onClick={async (_) => await postData(prop.record)}
      disabled={prop.disabled}
    >
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
  setter: Dispatch<SetStateAction<ILikingItemClient[]>>;
  showError: (message: string) => void;
  isWide: boolean;
}) => {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [isLike, setIsLike] = useState(defaultValues.isLike);
  const [isAllergy, setIsAllergy] = useState(defaultValues.isAllergy);
  const [aliasList, setAlias] = useState([] as string[]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const newRecord = {
    displayName,
    description,
    alias: uniqueExists(aliasList),
    isLike,
    isAllergy,
  };

  const reset = () => {
    setDisplayName("");
    setDescription("");
    setAlias([] as string[]);
    setIsLike(defaultValues.isLike);
    setIsAllergy(defaultValues.isAllergy);
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
        <Box style={{ width: "auto" }} maxWidth="sm">
          <FormControlLabel
            style={
              prop.isWide
                ? {
                    height: "100%",
                    padding: "0 0.5em 0 0.5em",
                    display: "inline",
                  }
                : { height: "100%", padding: "0 0.5em 0 0.5em" }
            }
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
            style={
              prop.isWide
                ? {
                    height: "100%",
                    padding: "0 0.5em 0 0.5em",
                    display: "inline",
                  }
                : { height: "100%", padding: "0 0.5em 0 0.5em" }
            }
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
        </Box>
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
        <ButtonSubmitNew
          record={newRecord}
          reset={reset}
          disabled={isButtonDisabled}
          setDisabled={setIsButtonDisabled}
          setter={prop.setter}
          showError={prop.showError}
        />
      </Stack>
    </>
  );
};
