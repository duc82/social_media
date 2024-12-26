interface TableProps {
  keys: string[];
  datas: string[][];
}

export default function Table({ keys, datas }: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {keys.map((key, i) => (
            <th key={i}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data, i) => (
          <tr key={i}>
            {data.map((value, j) => (
              <td key={j}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
