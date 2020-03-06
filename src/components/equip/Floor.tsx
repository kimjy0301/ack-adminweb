import React, { memo } from "react";
import {
  InterfacePcState,
  getInterfacePcListAsync
} from "../../modules/interfacePc";
import Laboratory from "./Laboratory";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const Floor = () => {
  const dispatch = useDispatch();
  const interfacePcStateList: InterfacePcState[] = useSelector(
    (state: RootState) => state.interfacePcList.results
  );
  if (interfacePcStateList.length === 0) {
    dispatch(getInterfacePcListAsync.request());
  }
  const isLoading = useSelector(
    (state: RootState) => state.interfacePcList.isLoading
  );
  const { floorId } = useParams();

  const interfacePcListByFloor = interfacePcStateList.filter(
    (value: InterfacePcState) => {
      if (value.equip.lab.floor === `${floorId}`) return true;
      else {
        return false;
      }
    }
  );

  let tempList: string[] = [];
  interfacePcListByFloor.map((value: InterfacePcState) =>
    tempList.push(value.equip.lab.name)
  );
  const distinctList = tempList.filter(
    (item, index) => tempList.indexOf(item) === index
  );

  return (
    <>
      <div className="flex flex-wrap border bg-white justify-center pb-10 pt-10 relative min-h-28">
        {isLoading ? (
          <div className="flex justiyafy-center items-center h-screen">
            <BeatLoader
              loading={isLoading}
              color={"#38b2ac"}
              size={40}
              key={9999}
            ></BeatLoader>
          </div>
        ) : (
          <>
            {distinctList.map((value, i) => (
              <Laboratory key={i} labname={value}></Laboratory>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default memo(Floor);
