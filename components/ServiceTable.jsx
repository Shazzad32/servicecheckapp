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
    <div className="w-[100%] h-full flex px-1 py-3 ">
      <div className="w-[90%] grid grid-cols-[repeat(11,1fr)] gap-2">
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.device_id}
        </p>
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.reg_no}
        </p>
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.customer_number}
        </p>
        <p className="min-w-[135px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.district}
        </p>
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.address}
        </p>
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.service_fee}
        </p>
        <p className="min-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">
          {formattedDate}
        </p>
        <p className="min-w-[145px] overflow-hidden text-ellipsis whitespace-nowrap">
          {probale_install_date_formate}
        </p>
        <p className="min-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap">
          {item?.problems}
        </p>
      </div>
      <div className="w-[10%] flex items-center justify-center gap-5">
        <Link href={`/servicecheck/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/servicecheck/${item?._id}/delete`}>
          <DeleteForeverIcon className="text-red-700" />
        </Link>
        <div
          className={`h-[10px] w-[20px] lg:h-[12px] lg:w-[20px] rounded-md ${
            item?.is_complete ? "bg-green-600" : "bg-red-600"
          }`}
        ></div>
      </div>
      {/* <div className="block lg:hidden w-full bg-white p-2">
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
      </div> */}
    </div>
  );
};

export default ServiceTable;
