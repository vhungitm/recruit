import 'SCSS/_passwordRegulation.scss';

export const PasswordRegulation = props => {
  const { show, passwordRegulation, password } = props;

  return (
    show && (
      <div className="password-regulation">
        <div className="password-regulation-header">Quy định mật khẩu:</div>
        <div className="password-regulation-body">
          <div className="password-regulation-items">
            {Object.values(passwordRegulation.validations).map(item => (
              <div
                key={item.message}
                className={
                  password
                    ? item.valid
                      ? 'password-regulation-item valid'
                      : 'password-regulation-item invalid'
                    : 'password-regulation-item normal'
                }
              >
                <div className="password-regulation-item-message">
                  <span>{item.message}</span>
                </div>

                {item.validations && (
                  <div className="password-regulation-items">
                    {Object.values(item.validations).map(itemChild => (
                      <div
                        key={itemChild.message}
                        className={
                          password
                            ? itemChild.valid
                              ? 'password-regulation-item valid'
                              : 'password-regulation-item invalid'
                            : 'password-regulation-item normal'
                        }
                      >
                        <div className="password-regulation-item-message">
                          <span>{itemChild.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="password-regulation-footer">
          Nếu có thắc mắc, vui lòng liên hệ hotline: 0332376334
        </div>
      </div>
    )
  );
};
