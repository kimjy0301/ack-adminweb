import React, { useRef, useState, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { RootState } from '../../../modules';
import { useSelector, useDispatch } from 'react-redux';
import { AgGridReact } from "@ag-grid-community/react";
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { GridApi, ColumnApi, CsvExportParams } from 'ag-grid-community';
import { InterfacePcState, getInterfacePcListAsync } from '../../../modules/interfacePc';
import ModalPortal from '../../modal/ModalPortal';
import Modal from '../../modal/Modal';
import InterfacePcModal from '../../modal/InterfacePcModal';

type rowData = {
  id: number;
  status: string;
  dept: string;
  lab: string;
  emrifpc: string;
  equip: string;
  send_count: number;
  error_count: number;
};
const filterCondition = (interfacePc: InterfacePcState, param: string) => {
  if (
    interfacePc.equip.lab.dept.name.match(param) ||
    interfacePc.equip.lab.call_number.match(param) ||
    interfacePc.ip.match(param) ||
    interfacePc.equip.lab.name.match(param)
  ) {
    return true;
  }
};

const GridPcList = () => {

  const [viewModal, setViewModal] = useState(false);


  const [selectedRowData, setSelectedRowData] = useState<InterfacePcState>();

  const onClickCancel = (e: React.MouseEvent) => {
    setViewModal(false);
    // dispatch(setfloortimer(true));
  };
  const isLoading: boolean = useSelector(
    (state: RootState) => state.interfacePcList.isLoading
  );

  const interfacePcList: InterfacePcState[] = useSelector((state: RootState) => state.interfacePcList.results);

  const [rowDatas, setRowDatas] = useState<rowData[]>([]);

  const dispatch = useDispatch();
  if (interfacePcList.length === 0) {
    dispatch(getInterfacePcListAsync.request());
  }

  const [deptInput, setDeptInput] = useState("");
  const onChangedeptInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeptInput(e.target.value);
  };



  useEffect(() => {
    if (isLoading === false) {
      let tempRowDatas: rowData[] = [];

      if (deptInput === "") {
        interfacePcList.map((value: InterfacePcState) =>
          tempRowDatas.push({ id: value.id, status: value.status, equip: value.equip.name, dept: value.equip.lab.dept.name, lab: value.equip.lab.name, emrifpc: value.ip, send_count: value.send_count, error_count: value.error_count })
        )
      } else {
        interfacePcList
          .filter((interfacePc: InterfacePcState) =>
            filterCondition(interfacePc, deptInput)
          ).map((value: InterfacePcState) =>
            tempRowDatas.push({ id: value.id, status: value.status, equip: value.equip.name, dept: value.equip.lab.dept.name, lab: value.equip.lab.name, emrifpc: value.ip, send_count: value.send_count, error_count: value.error_count })
          )
      }
      setRowDatas(tempRowDatas);
    }
  }, [isLoading, interfacePcList, deptInput]);



  const data = {
    modules: AllCommunityModules,
    rowSelection: "single",
    columnDefs: [
      { headerName: "ID", field: "id", hide: true, sortable: true, filter: true },
      { headerName: "부서", field: "dept", sortable: true, filter: true },
      { headerName: "검사실", field: "lab", sortable: true, filter: true },
      { headerName: "PC", field: "emrifpc", sortable: true, filter: true },
      { headerName: "장비명", field: "equip", sortable: true, filter: true },
      { headerName: "상태", field: "status", sortable: true, filter: true },
      {
        headerName: "전송건수",
        field: "send_count",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "에러건수",
        field: "error_count",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
    ],
  };
  let gridApi = useRef<GridApi>();
  let columnApi = useRef<ColumnApi>();
  const onGridReady = (params: any) => {
    gridApi.current = params.api;
    columnApi.current = params.columnApi;

    gridApi.current?.sizeColumnsToFit();
    gridApi.current?.setSortModel([{ colId: "send_count", sort: "desc" }]);
  };



  const onBtnExport = () => {

    const params: CsvExportParams = {
      suppressQuotes: false,
      columnSeparator: ",",
    };
    gridApi.current?.exportDataAsCsv(params);
  };




  return (<>
    <div className="flex flex-wrap border bg-white justify-center pb-10 pt-20 relative min-h-28 px-3">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader
            loading={isLoading}
            color={"#38b2ac"}
            size={40}
            key={9999}
          ></BeatLoader>
        </div>
      ) : (
          <>
            <div className="-mt-16 text-2xl absolute left-4rem bg-white border px-3 text-gray-700 rounded shadow-lg">
              전체PC리스트
            </div>
            <input
              type="text"
              placeholder="IP,부서,검사실,전화번호"
              className="-mt-16 w-64 text-xl absolute right-4rem bg-white border py-3 px-5 text-gray-700 rounded shadow-lg focus:border-teal-400 focus:outline-none"
              value={deptInput}
              onChange={onChangedeptInput}
            ></input>

            <div
              className="ag-theme-balham bg-white text-base w-full pt-3" style={{ height: "70vh" }}
            >
              <AgGridReact
                modules={data.modules}
                columnDefs={data.columnDefs}
                rowData={rowDatas}
                onGridReady={onGridReady}
                rowSelection={data.rowSelection}
                animateRows={false}
                multiSortKey={"ctrl"}
                onRowDoubleClicked={(e) => {
                  let selectedRowData: rowData = e.data;
                  let selectedInterfacePcState = interfacePcList.find((value: InterfacePcState) => value.id === selectedRowData.id);
                  setSelectedRowData(selectedInterfacePcState);
                  setViewModal(true);
                }}

              ></AgGridReact>
            </div>
            <div className="flex w-full justify-end mt-3">
              <button onClick={onBtnExport} className="bg-teal-500 text-gray-100 shadow-md rounded px-3 py-1 focus:outline-none hover:bg-teal-400 transition duration-200">CSV Download</button>
            </div>

          </>
        )}
    </div>

    {viewModal && (
      <ModalPortal>
        <Modal onClickCancel={onClickCancel}>
          <InterfacePcModal
            interfacePcState={selectedRowData}
          ></InterfacePcModal>
        </Modal>
      </ModalPortal>
    )}
  </>);


}

export default GridPcList;
