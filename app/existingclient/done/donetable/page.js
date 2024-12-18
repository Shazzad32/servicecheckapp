import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DoneTable = ({ item }) => {
  let date_formate = "N/A";
  if (item && item.probabel_call_date) {
    const date = new Date(item.probabel_call_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    date_formate = `${day}-${month}-${year}`;
  }

  return (
    <div className="h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-none  border-b-4 lg:border-none lg:shadow-md">
      <div className="hidden text-pretty lg:flex lg:gap-5 lg:justify-evenly lg:items-center w-[80%] items-center p-2 text-sm">
        <p
          style={{
            flex: 1,
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.device_id}
        </p>
        <p
          style={{
            flex: 1,
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.device_phone}
        </p>
        <p
          style={{
            flex: 1,
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.customer_phone}
        </p>
        <p
          style={{
            flex: 1,
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {date_formate}
        </p>
        <p style={{ flex: 1, fontSize: 14 }}>{item?.platform}</p>
        <p style={{ flex: 1, fontSize: 14 }}>{item?.state}</p>
        <p style={{ flex: 1, fontSize: 14 }}>{item?.after_state}</p>

        <p
          style={{
            flex: 1,
            fontSize: 14,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.comments}
        </p>
      </div>
      <div className="block lg:hidden w-full bg-white p-2">
        <p>
          <strong>
            Device Id:
            <span className="text-red-700">{item?.device_id}</span>
          </strong>
        </p>

        <p>
          <strong>Device No:</strong> {item?.device_phone}
        </p>
        <p>
          <strong>Customer No:</strong> {item?.customer_phone}
        </p>
        <p>
          <strong>Platform:</strong> {item?.platform}
        </p>
        <p>
          <strong>State:</strong> {item?.state}
        </p>
        <p>
          <strong>After State:</strong> {item?.after_state}
        </p>

        <p>
          <strong>prob Call Date:</strong> {date_formate}
        </p>
        <p>
          <strong>Comments:</strong> {item?.comments}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[30%] lg:w-[21%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/existingclient/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/existingclient/${item?._id}/delete`}>
          <DeleteForeverIcon className="text-red-700" />
        </Link>
        <div
          className={`h-[20px]
          w-[30px] lg:h-[20px] lg:w-[50px] rounded-md ${
            item?.is_complete ? "bg-green-600" : "bg-red-600"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default DoneTable;
