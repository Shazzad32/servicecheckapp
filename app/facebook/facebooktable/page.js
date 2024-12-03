import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const FacebookTable = ({ item }) => {
  console.log("facebook item is ", item);
  let formattedDate = "N/A";
  let probale_install_date_formate = "N/A";

  if (item && item.insert_date) {
    const date = new Date(item.insert_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    formattedDate = `${day}-${month}-${year}`;
  }
  if (item && item.probabel_install_date) {
    const date = new Date(item.probabel_install_date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4);
    probale_install_date_formate = `${day}-${month}-${year}`;
  }

  return (
    <div className="h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-none  border-b-4 lg:border-none lg:shadow-md">
      <div className="hidden text-pretty lg:flex lg:gap-5 lg:justify-evenly lg:items-center w-[80%] items-center p-2 text-sm">
        <p style={{ flex: 1.2 }}>{item?.customer_name}</p>
        <p
          style={{
            flex: 1.2,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.customer_phone}
        </p>
        <p
          style={{
            flex: 1.2,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.district}
        </p>
        <p
          style={{
            flex: 1.2,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.address}
        </p>
        <p style={{ flex: 1.2 }}>{formattedDate}</p>
        <p style={{ flex: 1.2 }}>{probale_install_date_formate}</p>
        <p style={{ flex: 1.2 }}>{item?.state}</p>
        <p style={{ flex: 1.6 }}>{item?.commnets}</p>
      </div>
      <div className="block lg:hidden w-full bg-white p-2">
        <p>
          <strong>
            Customer Name:
            <span className="text-red-700">{item?.customer_name}</span>
          </strong>
        </p>

        <p>
          <strong>Customer No:</strong> {item?.customer_phone}
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
          <strong>prob Install Date:</strong> {probale_install_date_formate}
        </p>
        <p>
          <strong>Comments:</strong> {item?.commnets}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[30%] lg:w-[20%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/facebook/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/facebook/${item?._id}/delete`}>
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

export default FacebookTable;
