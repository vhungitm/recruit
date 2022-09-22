import { selectCurrentUser } from 'app/authSlice';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const TotalHeaderList = props => {
  const { data, loading } = props;

  const currentUser = useSelector(selectCurrentUser);
  const userRole = currentUser.roles[0];
  const isAdmin = userRole === 'SuperAdmin';

  const imgURL = {
    1: '/Assets/images/home/home-recruiting.png',
    2: '/Assets/images/home/home-interviewer.png',
    3: currentUser?.roles?.find(item => item === 'SuperAdmin')
      ? '/Assets/images/home/home-recruiter.png'
      : '/Assets/images/home/home-jobpost.png'
  };

  const color = {
    1: 'orange',
    2: 'green',
    3: 'blue'
  };

  const defaultData = {
    SuperAdmin: [
      { id: 1, title: 'Tổng số tin được đăng tuyển' },
      { id: 2, title: 'Tổng số ứng viên đăng ký tài khoản' },
      { id: 3, title: 'Tổng số nhà tuyển dụng đăng ký' }
    ],
    Basic: [
      { id: 1, title: 'Số lượng tin đã đăng' },
      { id: 2, title: 'Tổng số ứng viên' },
      { id: 3, title: 'Tin ứng tuyển nhiều nhất' }
    ]
  };

  return (
    <div className="total-items">
      {(loading ? defaultData[userRole] : data).map(item => (
        <div
          className={
            isAdmin ? 'total-item-container admin' : 'total-item-container'
          }
          key={item.id}
        >
          <div className="total-item">
            <div className="total-item-content">
              <div className="total-item-title">{item.title}</div>

              {!loading && (
                <div className={`total-item-value text-${color[item.id]}`}>
                  {item.total}
                </div>
              )}
              {!isAdmin && (
                <div className="item-title">
                  {item.id === 1 ? 'Tin đăng' : 'Ứng viên'}
                </div>
              )}
              {/* Loading */}
              {loading && (
                <div className="loading">
                  <Spinner animation="border" variant={color[item.id]} />
                </div>
              )}
            </div>
            <div className="total-item-icon">
              <img
                src={imgURL[item.id]}
                alt={item.title}
                width={72}
                height={72}
              />
              {!isAdmin && (
                <div className="item-applied-position">{item.content}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
