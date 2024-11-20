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
    <div className="h-14 w-full  flex index shadow-md ">
      <div
        style={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          padding: 10,
          fontSize: 14,
        }}
      >
        <p style={{ flex: 1.2 }}>{item?.device_id}</p>
        <p style={{ flex: 1.5 }}>{item?.reg_no}</p>
        <p style={{ flex: 1.2 }}>{item?.customer_number}</p>
        <p style={{ flex: 1 }}>{item?.district}</p>
        <p style={{ flex: 1 }}>{item?.address}</p>
        <p style={{ flex: 1 }}>{formattedDate}</p>
        <p style={{ flex: 1.5 }}>{item?.problems}</p>
      </div>
      <div className="w-[20%] h-full flex items-center justify-evenly">
        <div
          style={{
            flex: 7,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 70,
          }}
        >
          <Link href={`/servicecheck/${item?._id}/update`}>
            <FiEdit className="text-black" />
          </Link>

          <Link href={`/servicecheck/${item?._id}/delete`}>
            <AiOutlineDelete className="text-red-700" />
          </Link>
        </div>
        <div
          style={{
            flex: 3,
            padding: 1,
            borderRadius: 4,
            height: 20,
            width: 50,
            color: "black",
          }}
        >
          {item?.is_complete === true ? (
            <div className="h-[20px] w-[50px] rounded-md bg-green-600"></div>
          ) : (
            <div className="h-[20px] w-[50px] rounded-md bg-red-600"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;
