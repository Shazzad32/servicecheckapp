import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const SimTable = ({ item }) => {
  let formattedDate = "N/A";
  if (item && item.active_date) {
    const date = new Date(item.active_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    formattedDate = `${day}-${month}-${year}`;
  }

  return (
    <div className="h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-none  border-b-4 lg:border-none lg:shadow-md">
      <div className="hidden font-bold text-pretty lg:flex lg:justify-evenly lg:items-center w-[80%] items-center p-2 text-sm">
        <p style={{ flex: 2.5 }}>{item?.number}</p>
        <p style={{ flex: 2.5 }}>{item?.kcp_number}</p>
        <p style={{ flex: 2.5 }}>{formattedDate}</p>
        <div style={{ flex: 2.5 }}>
          <p
            className={`h-[30px]
          w-[60px] flex-[1.2] rounded-md ${
            item?.is_active ? "bg-green-600" : "bg-red-600"
          }`}
          ></p>
        </div>
      </div>
      <div className="block lg:hidden w-full bg-white p-2">
        <p>
          <strong>Number:</strong> {item?.number}
        </p>
        <p>
          <strong>KCP Number:</strong> {item?.kcp_number}
        </p>
        <p>
          <strong>Active Date:</strong> {formattedDate}
        </p>
        <div className="flex gap-2">
          <strong>Active</strong>
          <p
            className={`h-[25px]
          w-[30px] rounded-md ${
            item?.is_active ? "bg-green-600" : "bg-red-600"
          }`}
          ></p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[30%] lg:w-[20%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/sim/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/sim/${item?._id}/delete`}>
          <DeleteForeverIcon className="text-red-700" />
        </Link>
      </div>
    </div>
  );
};

export default SimTable;
