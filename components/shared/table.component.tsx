import { TTable } from '@/types';

type Props = {
  table: TTable;
};

export default function Table({ table }: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full overflow-x-auto whitespace-nowrap rounded-lg max-md:max-w-fit">
        <tbody>
          {table.rows.map((row) => (
            <tr key={row._key}>
              {row.cells.map((cell, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={index} className="max-md:min-w-[160px]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
