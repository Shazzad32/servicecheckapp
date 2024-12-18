import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ServiceTable = ({ item }) => {
  let formattedDate = "N/A";
  let probale_install_date_formate = "N/A";

  if (item && item.insert_date) {
    const date = new Date(item.insert_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    formattedDate = `${day}-${month}-${year}`;
  }
  if (item && item.probable_install_date) {
    const date = new Date(item.probable_install_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    probale_install_date_formate = `${day}-${month}-${year}`;
  }

  console.log(item?.service_fee);

  return (
    <div
      className={`h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-none  border-b-4 lg:border-none lg:shadow-md`}
    >
      <div className="hidden text-pretty lg:gap:2 lg:flex lg:gap-2 lg:justify-evenly lg:items-center w-[80%] items-center lg:p-2 text-sm">
        <p style={{ flex: 1.2 }}>{item?.device_id}</p>
        <p
          style={{
            flex: 1.3,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.reg_no}
        </p>
        <p
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.customer_number}
        </p>
        <p
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.district}
        </p>
        <p
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.address}
        </p>
        <p style={{ flex: 1 }}>{item?.service_fee}</p>
        <p style={{ flex: 1 }}>{formattedDate}</p>
        <p style={{ flex: 1 }}>{probale_install_date_formate}</p>
        <p
          style={{
            flex: 1.5,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.problems}
        </p>
      </div>
      <div className="block lg:hidden w-full bg-white p-2">
        <p>
          <strong>
            Device ID: <span className="text-red-700">{item?.device_id}</span>
          </strong>
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
          <strong>Service Fee:</strong> {item?.service_fee}
        </p>
        <p>
          <strong>Insert Date:</strong> {formattedDate}
        </p>
        <p>
          <strong>prob Install Date:</strong> {probale_install_date_formate}
        </p>
        <p>
          <strong>Problems:</strong> {item?.problems}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[30%] lg:w-[20%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/servicecheck/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/servicecheck/${item?._id}/delete`}>
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

export default ServiceTable;
