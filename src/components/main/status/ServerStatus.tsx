import React, { useEffect } from "react";
import CPU from "./CPU";
import Memory from "./Memory";
import Disk from "./Disk";
import { useDispatch, useSelector } from "react-redux";
import { getServerStateAsync } from "../../../modules/serverStatus";
import { RootState } from "../../../modules";

function ServerStatus() {
  const serverStatus = useSelector((state: RootState) => state.serverStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServerStateAsync.request());
    let timer = setInterval(
      () => dispatch(getServerStateAsync.request()),
      60000
    );
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <>
      <CPU
        cpu2={serverStatus.cpu2}
        cpu={serverStatus.cpu}
        isLoading={serverStatus.isLoading}
      ></CPU>
      <Memory
        free_memory={serverStatus.free_memory}
        total_memory={serverStatus.total_memory}
        isLoading={serverStatus.isLoading}
        used_memory={serverStatus.used_memory}
        percent_memory={serverStatus.percent_memory}
        free_memory2={serverStatus.free_memory2}
        total_memory2={serverStatus.total_memory2}
        used_memory2={serverStatus.used_memory2}
        percent_memory2={serverStatus.percent_memory2}
      ></Memory>
      <Disk
        isLoading={serverStatus.isLoading}
        free_disk={serverStatus.free_disk}
        total_disk={serverStatus.total_disk}
        used_disk={serverStatus.used_disk}
        percent_disk={serverStatus.percent_disk}
        free_disk2={serverStatus.free_disk2}
        total_disk2={serverStatus.total_disk2}
        used_disk2={serverStatus.used_disk2}
        percent_disk2={serverStatus.percent_disk2}
      ></Disk>
    </>
  );
}

export default ServerStatus;
