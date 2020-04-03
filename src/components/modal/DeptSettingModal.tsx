import React from "react";

export type DeptSettingModalType = {
  deptList: string[];
};

const DeptSettingModal = ({ deptList }: DeptSettingModalType) => {
  return (
    <>
      부서세팅모달
      <div>
        {deptList.map((value, i) => (
          <div key={i}>
            <input type="checkbox" id="value" name="value" value="value" />
            <label htmlFor="value">{value}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeptSettingModal;
