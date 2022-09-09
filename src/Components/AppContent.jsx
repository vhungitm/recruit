import { CContainer, CSpinner } from '@coreui/react';
import React, { Suspense } from 'react';
import 'SCSS/_appContent.scss';

const AppContent = ({ element }) => {
	return (
		<CContainer lg className="wrap-container wrap-content">
			<Suspense fallback={<CSpinner color="primary" />}>{element}</Suspense>
		</CContainer>
	);
};

export default React.memo(AppContent);
