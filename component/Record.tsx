import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import { IPropsRecords } from "./typedef";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";

export default function Records(
  props: IPropsRecords & { setSelections: Dispatch<SetStateAction<number[]>> }
) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight={true}
        rows={props.records}
        columns={headers}
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "desc" }],
          },
        }}
        pageSize={36}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(idList) => {
          props.setSelections(idList.map((id) => Number(id)));
        }}
      />
    </div>
  );
}

const headers: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    editable: false,
    flex: 5,
  },
  {
    field: "displayName",
    headerName: "name",
    editable: false,
    flex: 25,
  },
  {
    field: "isLike",
    headerName: "好み",
    type: "boolean",
    editable: false,
    renderCell: (arg) => {
      return <>{arg.value ? <Favorite /> : <FavoriteBorder />}</>;
    },
    flex: 20,
  },
  {
    field: "isAllergy",
    headerName: "アレルギー",
    description: "あると危険",
    type: "boolean",
    editable: false,
    renderCell: (arg) => {
      return (
        <>{arg.value ? <NoMealsOutlinedIcon /> : <RestaurantOutlinedIcon />}</>
      );
    },
    flex: 20,
  },
  {
    field: "description",
    headerName: "概要",
    editable: false,
    flex: 30,
  },
];
