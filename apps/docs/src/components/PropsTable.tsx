import type { PropDoc } from '../types';

interface PropsTableProps {
  props: PropDoc[];
}

export default function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) {
    return <p>No documented props.</p>;
  }
  return (
    <div className="table-wrap">
      <table className="props-table">
        <caption className="visually-hidden">Component props</caption>
        <thead>
          <tr>
            <th scope="col">Prop</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map(prop => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
                {prop.optional ? (
                  ''
                ) : (
                  <span className="required-mark" title="Required">
                    *
                  </span>
                )}
                {prop.inherited && <span className="inherited-mark"> (inherited)</span>}
              </td>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>
                {prop.default ? (
                  <code>{prop.default}</code>
                ) : (
                  <span aria-label="no default">—</span>
                )}
              </td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
