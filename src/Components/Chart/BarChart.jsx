import { Chart as ChartJS, registerables } from 'chart.js';
import { DateRange } from 'Components/DateRange';
import { Spinner } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

export const BarChart = props => {
  const { type, setType, title, data, loading, date, setDate } = props;
  ChartJS.register(...registerables);

  const typeDate = date => {
    switch (date) {
      case 0:
        return 'Ngày';
      case 1:
        return 'Tuần';
      case 2:
        return 'Tháng';
      case 3:
        return 'Năm';
      default:
    }
  };

  const styleDate = date => {
    let element;
    switch (date) {
      case 0:
        element = (
          <div className="typeDate style1">
            <p>{data ? typeDate(type) : ''}</p>
          </div>
        );
        break;
      case 1:
        element = (
          <div className="typeDate style2">
            <p>{data ? typeDate(type) : ''}</p>
          </div>
        );
        break;
      case 2:
        element = (
          <div className="typeDate style3">
            <p>{data ? typeDate(type) : ''}</p>
          </div>
        );
        break;
      case 3:
        element = (
          <div className="typeDate style4">
            <p>{data ? typeDate(type) : ''}</p>
          </div>
        );
        break;
      default:
    }
    return element;
  };

  return (
    <div className="chart">
      <div className="chart-header">
        <div className="chart-header-tab"></div>
        <div className="chart-header-title">{title}</div>
      </div>

      <div className="chart-calendar">
        <DateRange
          type={type}
          handleChangeType={setType}
          value={date}
          handleChangeValue={setDate}
        />
      </div>
      <div className="chart-content">
        {data && (
          <Bar
            data={data}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 1
                  }
                }
              },
              responsive: true,
              layout: {
                padding: {
                  right: 40
                }
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  align: 'end',
                  labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    boxHeight: 8
                  }
                }
              }
            }}
          />
        )}
        <div className="chart-content-wrapper">
          <p>{data ? 'Số Tin' : ''}</p>
        </div>
        {styleDate(type)}
      </div>
    </div>
  );
};
