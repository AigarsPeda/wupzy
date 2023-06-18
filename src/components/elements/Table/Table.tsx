import { useEffect, useState, type FC, type ReactNode } from "react";

type TableValueType =
  | null
  | string
  | number
  | object
  | boolean
  | ReactNode
  | undefined;

interface TableProps {
  exclude?: string[];
  tableContents: { [key: string]: TableValueType }[] | undefined;
}

const Table: FC<TableProps> = ({ exclude, tableContents }) => {
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [tableBody, setTableBody] = useState<TableValueType[][]>([]);

  const formatKey = (keys: string[]) => {
    return keys.map((key) => {
      return key
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join(" ");
    });
  };

  const getObjectsValues = (
    arr: { [key: string]: TableValueType }[],
    exclude?: string[]
  ) => {
    if (arr.length === 0 || arr === undefined || arr[0] === undefined) {
      return {
        tableBody: [],
        tableHead: [],
      };
    }

    const tableBody = arr.map((obj) => {
      if (exclude) {
        exclude.forEach((key) => {
          delete obj[key];
        });
      }

      return Object.values(obj);
      // return Object.values(obj).filter((value) => {
      //   if (typeof value === "object") {
      //     return false;
      //   }
      //   return true;
      // });
    });

    return { tableBody: tableBody, tableHead: Object.keys(arr[0]) };
  };

  useEffect(() => {
    if (tableContents) {
      const { tableBody, tableHead } = getObjectsValues(tableContents, exclude);

      setTableBody(tableBody);
      setTableHead(tableHead);
    }
  }, [exclude, tableContents]);

  return (
    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
      <table className="min-w-full rounded leading-normal">
        <thead>
          <tr>
            {tableHead &&
              formatKey(tableHead).map((key) => (
                <th
                  className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  key={key}
                >
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableBody &&
            tableBody.map((values, i) => (
              <tr key={i}>
                {values.map((value, j) => (
                  <td
                    key={`${i}-${j}`}
                    className="border-b border-gray-200 bg-white px-5 py-5 text-sm"
                  >
                    {value && typeof value === "object"
                      ? JSON.stringify(value)
                      : value}
                  </td>
                ))}
              </tr>
            ))}

          {/* <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                  className="h-full w-full rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap text-gray-900">
                    Vera Carpenter
                  </p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Admin</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Jan 21, 2020</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                ></span>
                <span className="relative">Activo</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                  className="h-full w-full rounded-full"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap text-gray-900">
                    Blake Bowman
                  </p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Editor</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Jan 01, 2020</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                ></span>
                <span className="relative">Activo</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                  className="h-full w-full rounded-full"
                  src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  alt=""
                />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap text-gray-900">Dana Moore</p>
                </div>
              </div>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Editor</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Jan 10, 2020</p>
            </td>
            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-orange-900">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-orange-200 opacity-50"
                ></span>
                <span className="relative">Suspended</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="bg-white px-5 py-5 text-sm">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-full w-full rounded-full"
                    src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="whitespace-no-wrap text-gray-900">Alonzo Cox</p>
                </div>
              </div>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Admin</p>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <p className="whitespace-no-wrap text-gray-900">Jan 18, 2020</p>
            </td>
            <td className="bg-white px-5 py-5 text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-red-200 opacity-50"
                ></span>
                <span className="relative">Inactive</span>
              </span>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
