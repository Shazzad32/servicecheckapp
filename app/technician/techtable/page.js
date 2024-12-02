import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TechTable = ({ item }) => {
  return (
    <div className="h-auto w-full flex lg:flex-row lg:h-14 items-center shadow-none  border-b-4 lg:border-none lg:shadow-md">
      <div className="hidden text-pretty lg:flex lg:gap-5 lg:justify-evenly lg:items-center w-[80%] items-center p-2 text-sm">
        <p style={{ flex: 2.5 }}>{item?.tech_name}</p>
        <p
          style={{
            flex: 2.5,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.tech_phone}
        </p>

        <p
          style={{
            flex: 2.5,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.district}
        </p>
        <p
          style={{
            flex: 2.5,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {item?.address}
        </p>
      </div>
      <div className="block lg:hidden w-full bg-white p-2">
        <p>
          <strong>
            Technician Name:{" "}
            <span className="text-red-700">{item?.tech_name}</span>
          </strong>
        </p>
        <p>
          <strong>Technician Number:</strong> {item?.tech_phone}
        </p>

        <p>
          <strong>District:</strong> {item?.district}
        </p>
        <p>
          <strong>Address:</strong> {item?.address}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center  gap-6 w-[30%] lg:w-[20%] lg:mt-0 lg:flex lg:flex-row lg:gap-12">
        <Link href={`/technician/${item?._id}/update`}>
          <FiEdit className="text-black" />
        </Link>
        <Link href={`/technician/${item?._id}/delete`}>
          <DeleteForeverIcon className="text-red-700" />
        </Link>
      </div>
    </div>
  );
};

export default TechTable;
