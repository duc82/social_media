import clsx from "clsx";

interface TableProps {
  keys: string[];
  datas: string[][];
  hasCheckbox?: boolean;
  upperCaseHeader?: boolean;
  tableClassName?: string;
  theadClassName?: string;
}

export default function Table({
  keys,
  datas,
  hasCheckbox,
  upperCaseHeader,
  tableClassName,
  theadClassName,
}: TableProps) {
  return (
    <table className={tableClassName}>
      <thead className={theadClassName}>
        <tr role="row">
          {hasCheckbox && (
            <th
              scope="col"
              style={{
                paddingRight: 0,
              }}
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name=""
                  id="checkAll"
                />
                <label htmlFor="checkAll"></label>
              </div>
            </th>
          )}
          {keys.map((key, i) => (
            <th
              scope="col"
              key={i}
              className={clsx(upperCaseHeader && "text-uppercase")}
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data, i) => (
          <tr key={i} role="row">
            {hasCheckbox && (
              <td>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name=""
                    id=""
                  />
                </div>
              </td>
            )}
            {data.map((value, j) =>
              j === 0 ? (
                <th scope="row" key={j}>
                  {value}
                </th>
              ) : (
                <td key={j}>{value}</td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
