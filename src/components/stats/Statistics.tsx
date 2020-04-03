import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColumnApi, GridApi } from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { InterfacePcState } from "../../modules/interfacePc";
import { BeatLoader } from "react-spinners";
import ReactDatePicker from "react-datepicker";
import { getInterfacePcListWithDate } from "../../modules/api/InterfacePcAPI";
export type rowData = {
  dept: string;
  lab: string;
  emrifpc: string;
  equip: string;
  send_count: number;
  error_count: number;
};

const Statistics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date(
      `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    )
  );
  const [endDate, setEndDate] = useState(new Date());
  const [rowDatas, setRowDatas] = useState<rowData[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getInterfacePcListWithDate(
      startDate.toISOString().substring(0, 10),
      endDate.toISOString().substring(0, 10)
    ).then(response => {
      setIsLoading(false);
      const interfacePcList: InterfacePcState[] = response.results;
      let tempRowDatas: rowData[] = [];
      interfacePcList.map((interfacePcState: InterfacePcState) =>
        tempRowDatas.push({
          emrifpc: interfacePcState.ip,
          dept: interfacePcState.equip.lab.dept.name,
          error_count: interfacePcState.error_count,
          send_count: interfacePcState.send_count,
          lab: interfacePcState.equip.lab.name,
          equip: interfacePcState.equip.name
        })
      );
      setRowDatas(tempRowDatas);
    });
  }, [startDate, endDate]);

  const data = {
    rowSelection: "single",
    columnDefs: [
      { headerName: "부서", field: "dept", sortable: true, filter: true },
      { headerName: "검사실", field: "lab", sortable: true, filter: true },
      { headerName: "PC", field: "emrifpc", sortable: true, filter: true },
      { headerName: "장비명", field: "equip", sortable: true, filter: true },
      {
        headerName: "전송건수",
        field: "send_count",
        sortable: true,
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "에러건수",
        field: "error_count",
        sortable: true,
        filter: "agNumberColumnFilter"
      }
    ]
  };
  let gridApi = useRef<GridApi>();
  let columnApi = useRef<ColumnApi>();
  const onGridReady = (params: any) => {
    gridApi.current = params.api;
    columnApi.current = params.columnApi;

    gridApi.current?.sizeColumnsToFit();
    gridApi.current?.setSortModel([{ colId: "send_count", sort: "desc" }]);
  };

  const onBtPrint = () => {
    gridApi.current?.setDomLayout("print");
    const nav = document.getElementById("nav");
    const content = document.getElementById("content");
    if (divRef.current) {
      divRef.current.style.height = "";
      nav?.classList.toggle("hidden");
      content?.classList.toggle("mt-16");
    }
    setTimeout(function() {
      window.print();
      gridApi.current?.setDomLayout("");
      if (divRef.current) {
        divRef.current.style.height = "40rem";
        nav?.classList.toggle("hidden");
        content?.classList.toggle("mt-16");
        gridApi.current?.sizeColumnsToFit();
      }
    }, 2000);
  };
  return (
    <>
      <div className="flex justify-center items-center">
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
            <div className="flex flex-col bg-white p-10 mt-8 justify-center items-center h-auto relative">
              <div className="text-2xl bg-white px-3">EMR I/F 통계</div>
              <div className="flex items-center mt-10">
                <div>
                  <span className="mr-5 text-2xl">조회일자</span>
                </div>
                <div>
                  <ReactDatePicker
                    className="text-2xl w-56 text-center focus:outline-none focus:border-teal-400 border shadow rounded relative"
                    selected={startDate}
                    dateFormat="yyyy년 MM월 dd일"
                    onChange={date => {
                      if (date) {
                        setStartDate(date);
                      }
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                <div>
                  <span className="text-2xl mx-5">~</span>
                </div>
                <div>
                  <ReactDatePicker
                    className="text-2xl w-56 text-center focus:outline-none focus:border-teal-400 border shadow rounded"
                    selected={endDate}
                    dateFormat="yyyy년 MM월 dd일"
                    onChange={date => {
                      if (date) {
                        setEndDate(date);
                      }
                    }}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
                <div>
                  <button
                    id="printBtn"
                    className="bg-teal-400 text-white py-2 px-3 rounded absolute focus:outline-none hover:shadow-lg hover:bg-teal-500"
                    style={{ right: "10px", top: "10px" }}
                    onClick={onBtPrint}
                  >
                    Print
                  </button>
                </div>
              </div>
              <div
                ref={divRef}
                className="ag-theme-balham bg-white text-base"
                style={{ height: "40rem", width: "60rem", marginTop: "30px" }}
              >
                <AgGridReact
                  columnDefs={data.columnDefs}
                  rowData={rowDatas}
                  onGridReady={onGridReady}
                  suppressCsvExport={true}
                  rowSelection={data.rowSelection}
                  animateRows={true}
                  multiSortKey={"ctrl"}
                ></AgGridReact>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Statistics;
