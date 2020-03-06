import React, { useEffect } from "react";
import CPU from "./CPU";
import Memory from "./Memory";
import Disk from "./Disk";
import { useDispatch, useSelector } from "react-redux";
import { getServerStateAsync } from "../../modules/serverStatus";
import { RootState } from "../../modules";

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
      <CPU cpu={serverStatus.cpu} isLoading={serverStatus.isLoading}></CPU>
      <Memory
        free_memory={serverStatus.free_memory}
        total_memory={serverStatus.total_memory}
        isLoading={serverStatus.isLoading}
        used_memory={serverStatus.used_memory}
        percent_memory={serverStatus.percent_memory}
      ></Memory>
      <Disk
        free_disk={serverStatus.free_disk}
        total_disk={serverStatus.total_disk}
        isLoading={serverStatus.isLoading}
        used_disk={serverStatus.used_disk}
        percent_disk={serverStatus.percent_disk}
      ></Disk>
    </>
  );
}

export default ServerStatus;
