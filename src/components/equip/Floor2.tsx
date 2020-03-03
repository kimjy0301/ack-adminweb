import React from "react";
import bgImg2 from "../../static/img/검사실3.jpg";
import { InterfacePcState, Equip, Dept, Lab } from "../../modules/interfacePc";
import Laboratory from "./Laboratory";

const Floor2 = () => {
  const dept: Dept = {
    id: 1,
    name: "구;ㅣ찮아부서"
  };
  const lab: Lab = {
    call_number: "1234",
    dept: dept,
    id: 1,
    name: "폐기능검사실",
    bg_image: "http://localhost:8000/media/%EA%B2%80%EC%82%AC%EC%8B%A43.jpg"
  };
  const equip: Equip = {
    id: 1,
    equip_company: "ACK",
    equip_name: "테스트장비",
    equip_number: "010-8807-0301",
    name: "테스트",
    lab: lab
  };

  const interfacePcState: InterfacePcState = {
    id: 1,
    ip: "127.0.0.1",
    error_count: 100,
    status: "SUCCESS",
    equip: equip
  };

  return (
    <>
      <div className="flex flex-wrap border bg-white justify-center pb-10 pt-10 relative min-h-28">
        <Laboratory
          bgImg={lab.bg_image}
          interfacePcState={interfacePcState}
        ></Laboratory>
        <Laboratory
          bgImg={bgImg2}
          interfacePcState={interfacePcState}
        ></Laboratory>
        <Laboratory
          bgImg={bgImg2}
          interfacePcState={interfacePcState}
        ></Laboratory>
        <Laboratory
          bgImg={bgImg2}
          interfacePcState={interfacePcState}
        ></Laboratory>
      </div>
    </>
  );
};

export default Floor2;
