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
    <div className="flex items-center justify-center">
      <div className="container">
        <table className="flex-no-wrap my-5 flex w-full flex-row overflow-hidden rounded-lg sm:bg-white sm:shadow-lg">
          <thead className="text-white">
            <tr className="flex-no wrap mb-2 flex flex-col rounded-l-lg bg-gray-400 capitalize sm:mb-0 sm:table-row sm:rounded-none">
              {tableHead &&
                formatKey(tableHead).map((key) => (
                  <th className="p-3 text-left" key={key}>
                    {key}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {tableBody &&
              tableBody.map((values, i) => (
                <tr
                  className="flex-no wrap mb-2 flex flex-col sm:mb-0 sm:table-row"
                  key={i}
                >
                  {values.map((value, j) => (
                    <td
                      key={`${i}-${j}`}
                      className="border-grey-light border p-3 hover:bg-gray-100"
                    >
                      {value && typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
