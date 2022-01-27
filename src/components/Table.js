import './Table.css'
function Table (){
  const headers = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'Mean'
  ];
  return(
    <div className="table">
      <table >
  <tr>
    {headers.map(heading => {
      return <th>{heading}</th>
    })}
  </tr>
</table>
    </div>
  )
}

export default Table