import React from "react";
import PropTypes from "prop-types";

const DataSourcesTabIcon = ({className}) => {
	return (
		<svg className={className} width='17' height='14' viewBox='0 0 17 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15.8024 3.57048C15.5343 3.25765 15.1534 3.05787 14.6918 3.00132C14.6903 2.97766 14.6878 2.95417 14.6832 2.93107C14.4701 2.1317 13.6175 1.54555 12.6582 1.54555H8.71879L7.38259 0.159908C7.276 0.0532741 7.16945 1.86752e-09 7.00958 1.86752e-09H2.26681C1.04112 -4.31001e-05 0.188477 0.74601 0.188477 1.75856V11.2441C0.188477 11.8118 0.445451 12.4247 0.862721 12.8737C0.869057 12.8811 0.874833 12.8887 0.881255 12.8962C1.20099 13.3224 1.68062 13.5356 2.21349 13.5356H2.26677H12.6583C13.7774 13.5356 14.7366 12.4698 14.9497 11.4572L16.1754 5.00919C16.2287 4.47632 16.1221 3.94345 15.8024 3.57048ZM1.25435 1.75869C1.2543 1.22578 1.89376 1.06587 2.26681 1.06587H6.79644L8.07541 2.39811C8.17028 2.49298 8.28622 2.54535 8.40449 2.55578C8.47863 2.59164 8.56514 2.61133 8.66155 2.61133H12.6583C13.0255 2.61133 13.3613 2.76758 13.5464 2.9843H3.9721C2.853 2.9843 1.89376 3.73035 1.73394 4.74286L1.2543 7.32868V1.75869H1.25435ZM15.1096 4.84954L13.8839 11.2976C13.7773 11.8838 13.2445 12.4699 12.7115 12.4699H12.6583H2.26681C2.06044 12.4699 1.84424 12.3415 1.66485 12.1528C1.55985 11.973 1.52942 11.7872 1.57403 11.564L2.79968 4.95604C2.853 4.42313 3.38587 4.05012 3.97206 4.05012L14.1504 4.10344H14.4168C14.6833 4.10344 14.8964 4.15671 15.003 4.31658C15.1096 4.42317 15.1628 4.6364 15.1096 4.84954Z'
				fill='currentColor'
			/>
		</svg>
	);
};

DataSourcesTabIcon.propTypes = {
	className: PropTypes.string,
};

DataSourcesTabIcon.defaultProps = {
	className: "",
};
export default DataSourcesTabIcon;