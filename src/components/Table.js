import './Table.css';
const {headers} = require('./data/headers')
function Table() {

  return (
    <div className="table">
      <table>
        <tr>
          {headers.map((heading) => {
            return <th key={heading}>{heading}</th>;
          })}
        </tr>
      </table>
    </div>
  );
}

export default Table;
