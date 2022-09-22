import { Spinner } from 'react-bootstrap';

export const TableTop = props => {
  const { flagTable, headers, topLists, loading, titleTopTable } = props;

  return (
    <div className="card-style">
      <div className="header-table">
        <div className="img-top">
          <img src="/Assets/images/home/number-top10.png" alt="top10" />
        </div>
        <div className="title">{titleTopTable}</div>
      </div>
      <div className="datatable" id="idtable">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} style={{ width: header.width }}>
                  <div className="item">{header.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {topLists.map(item => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={`/Assets/images/home/number-${item.id}.png`}
                      alt="number"
                    />
                  </td>
                  <td>
                    <div className="title"> {item.jobTitle}</div>
                    {item.companyName && (
                      <div className="name-corp"> {item.companyName}</div>
                    )}
                  </td>
                  <td>
                    <div
                      className={
                        flagTable === 'position' ? 'title-total' : 'title'
                      }
                    >
                      {' '}
                      {item.total}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}

          {/* Loading */}
          {loading && (
            <tbody>
              <tr>
                <td colSpan={3}>
                  <div className="loading">
                    <Spinner animation="border" />
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TableTop;
