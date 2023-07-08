import { useEffect, useState, type FC, type ReactNode } from "react";
import LoadingSkeleton from "~/components/elements/LoadingSkeleton/LoadingSkeleton";

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
  isLoading?: boolean;
  tableContents: { [key: string]: TableValueType }[] | undefined;
}

const Table: FC<TableProps> = ({ exclude, isLoading, tableContents }) => {
  const [tableHead, setTableHead] = useState<string[]>([]);
  const [tableBody, setTableBody] = useState<
    { [key: string]: TableValueType }[]
  >([]);

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

    const keys: string[] = [];

    const tableBody = arr.map((obj) => {
      // const objCopy = Object.assign({}, obj);

      const objCopy = JSON.parse(JSON.stringify(obj)) as {
        [key: string]: TableValueType;
      };

      if (exclude) {
        exclude.forEach((key) => {
          delete objCopy[key];
        });
      }

      if (keys.length === 0) {
        keys.push(...Object.keys(objCopy));
      }

      return objCopy;
    });

    return { tableBody: tableBody, tableHead: keys };
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
      {!tableContents || isLoading ? (
        <table className="min-w-full rounded leading-normal">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 bg-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-200">
                Loading...
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6).keys()].map((_, index) => (
              <tr key={index}>
                <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                  <LoadingSkeleton key={index} classes="h-6 w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="min-w-full rounded leading-normal">
          <thead>
            <tr>
              {formatKey(tableHead).map((key) => (
                <th
                  className="border-b-2 border-gray-200 bg-gray-900 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                  key={key}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableBody.map((values, i) => (
              <tr key={i}>
                {Object.values(values).map((value, j) => (
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
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
