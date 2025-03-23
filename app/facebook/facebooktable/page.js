// import { FiEdit } from "react-icons/fi";
// import Link from "next/link";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// const FacebookTable = ({ item }) => {
//   let formattedDate = "N/A";
//   let probale_install_date_formate = "N/A";

//   if (item && item.insert_date) {
//     const date = new Date(item.insert_date);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-4);
//     formattedDate = `${day}-${month}-${year}`;
//   }
//   if (item && item.probabel_install_date) {
//     const date = new Date(item.probabel_install_date);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = String(date.getFullYear()).slice(-4);
//     probale_install_date_formate = `${day}-${month}-${year}`;
//   }

//   const getColorClass = (state) => {
//     const stateColors = {
//       AGREE: "bg-green-600",
//       BLOCKED: "bg-red-600",
//       PENDING: "bg-pink-600",
//     };
//     return stateColors[state] || "bg-gray-400";
//   };

//   return (
//     <div className="w-full h-full flex p-3">
//       <div className="w-[92%] flex justify-between flex-[1]">
//         <p className="flex-[0.7] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.customer_name}
//         </p>
//         <p className="flex-[0.8] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.customer_phone}
//         </p>
//         <p className="flex-[0.5] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.district}
//         </p>
//         <p className="flex-[0.5] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.address}
//         </p>
//         <p className="flex-[0.5] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.device_price}
//         </p>
//         <p className="flex-[0.5] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.service_charge}
//         </p>
//         <p className="flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">
//           {formattedDate}
//         </p>
//         <p className="flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">
//           {probale_install_date_formate}
//         </p>
//         <p className="flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.reference}
//         </p>
//         <p className="flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.state}
//         </p>
//         <p className="flex-[1] overflow-hidden text-ellipsis whitespace-nowrap">
//           {item?.comments}
//         </p>
//       </div>
//       {/* <div className="block lg:hidden w-full bg-white p-2">
//         <p>
//           <strong>
//             Customer Name:
//             <span className="text-red-700">{item?.customer_name}</span>
//           </strong>
//         </p>

//         <p>
//           <strong>Customer No:</strong> {item?.customer_phone}
//         </p>
//         <p>
//           <strong>District:</strong> {item?.district}
//         </p>
//         <p>
//           <strong>Address:</strong> {item?.address}
//         </p>
//         <p>
//           <strong>Device Price:</strong> {item?.device_price}
//         </p>
//         <p>
//           <strong>Service Charge:</strong> {item?.service_charge}
//         </p>
//         <p>
//           <strong>Insert Date:</strong> {formattedDate}
//         </p>
//         <p>
//           <strong>prob Install Date:</strong> {probale_install_date_formate}
//         </p>
//         <p>
//           <strong>Reference:</strong> {item?.eference}
//         </p>

//         <p>
//           <strong>Comments:</strong> {item?.comments}
//         </p>
//       </div> */}
//       <div className="w-[8%] flex items-center justify-end gap-5">
//         <Link href={`/facebook/${item?._id}/update`}>
//           <FiEdit className="text-black" />
//         </Link>
//         <Link href={`/facebook/${item?._id}/delete`}>
//           <DeleteForeverIcon className="text-red-700" />
//         </Link>
//         <div
//           className={`h-[10px] w-[20px] lg:h-[12px] lg:w-[20px] rounded-md ${getColorClass(
//             item?.state
//           )}`}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default FacebookTable;
