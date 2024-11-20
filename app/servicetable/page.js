import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";

const ServiceTable = ({ item }) => {
  let formattedDate = "N/A";

  if (item && item.insert_date) {
    const date = new Date(item.insert_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    formattedDate = `${day}-${month}-${year}`;
  }

  return (
    <div className="h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-md">
      <div className="hidden lg:flex lg:justify-evenly lg:items-center w-[80%] items-center p-2 text-sm">
        <p style={{ flex: 1.2 }}>{item?.device_id}</p>
        <p style={{ flex: 1.5 }}>{item?.reg_no}</p>
        <p style={{ flex: 1.2 }}>{item?.customer_number}</p>
        <p style={{ flex: 1 }}>{item?.district}</p>
        <p style={{ flex: 1 }}>{item?.address}</p>
        <p style={{ flex: 1 }}>{formattedDate}</p>
        <p style={{ flex: 1.5 }}>{item?.problems}</p>
      </div>
      <div className="block lg:hidden w-full bg-white p-2 border-b">
        <p>
          <strong>Device ID:</strong> {item?.device_id}
        </p>
        <p>
          <strong>Reg No:</strong> {item?.reg_no}
        </p>
        <p>
          <strong>Customer No:</strong> {item?.customer_number}
        </p>
        <p>
          <strong>District:</strong> {item?.district}
        </p>
        <p>
          <strong>Address:</strong> {item?.address}
        </p>
        <p>
          <strong>Insert Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>Problems:</strong> {item?.problems}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center  gap-8 w-full lg:w-[20%] mt-2 lg:mt-0 lg:flex lg:gap-12">
        <Link href={`/servicecheck/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/servicecheck/${item?._id}/delete`}>
          <AiOutlineDelete className="text-red-700" />
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

export default ServiceTable;
