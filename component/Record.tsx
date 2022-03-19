import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IPropsRecords } from "./typedef";

export default function Records(props: IPropsRecords) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight={true}
        rows={props.records}
        columns={headers}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const headers: GridColDef[] = [
  // { field: "id", headerName: "uniqueID", editable: false, flex: 1 },
  {
    field: "displayName",
    headerName: "name",
    editable: false,
    flex: 1,
  },
  {
    field: "isLike",
    headerName: "好み",
    type: "boolean",
    editable: false,
    renderCell: arg => {
      return <>{ arg.value ? '好き' : '好きじゃない' }</>;
    },
    flex: 0.25,
  },
  {
    field: "isAllergy",
    headerName: "アレルギー",
    description: "あると危険",
    type: "boolean",
    editable: false,
    renderCell: arg => {
      return <>{ arg.value ? 'アレルギー' : 'アレルギーじゃない' }</>;
    },
    flex: 0.25,
  },
  {
    field: "description",
    headerName: "概要",
    editable: false,
    flex: 1,
  },
];
