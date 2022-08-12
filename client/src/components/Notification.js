import { getALLNoti } from "../queries/Query";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
const Notification = () => {
  const { loading, error, data } = useQuery(getALLNoti);
  console.log(data?.getAllnoti);
  if (loading) return "loading...";
  if (error) return "error :(";
  return (
    <div>
      <h1>Notifications</h1>
      {data &&
        data.getAllnoti.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        ))}{" "}
    </div>
  );
};

export default Notification;
