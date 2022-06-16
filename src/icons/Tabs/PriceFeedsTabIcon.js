import React from "react";
import PropTypes from "prop-types";

const PriceFeedsTabIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8 16C5.86312 16 3.85413 15.1679 2.34313 13.6569C0.832125 12.1459 0 10.1369 0 8C0 5.86312 0.832156 3.85416 2.34313 2.34313C3.85409 0.832094 5.86312 0 8 0C10.1369 0 12.1459 0.832125 13.6569 2.34313C15.1679 3.85413 16 5.86312 16 8C16 10.1369 15.1678 12.1458 13.6569 13.6569C12.1459 15.1679 10.1369 16 8 16ZM8 1C4.14019 1 1 4.14019 1 8C1 11.8598 4.14019 15 8 15C11.8598 15 15 11.8598 15 8C15 4.14019 11.8598 1 8 1Z'
				fill='currentColor'
			/>
			<path
				d='M8 7.5C7.31075 7.5 6.75 6.93925 6.75 6.25C6.75 5.56075 7.31075 5 8 5C8.68925 5 9.25 5.56075 9.25 6.25C9.25 6.52612 9.47384 6.75 9.75 6.75C10.0262 6.75 10.25 6.52612 10.25 6.25C10.25 5.18122 9.50069 4.28475 8.5 4.05669V3.5C8.5 3.22387 8.27616 3 8 3C7.72384 3 7.5 3.22387 7.5 3.5V4.05669C6.49931 4.28475 5.75 5.18122 5.75 6.25C5.75 7.49066 6.75934 8.5 8 8.5C8.68925 8.5 9.25 9.06075 9.25 9.75C9.25 10.4392 8.68925 11 8 11C7.31075 11 6.75 10.4392 6.75 9.75C6.75 9.47388 6.52616 9.25 6.25 9.25C5.97384 9.25 5.75 9.47388 5.75 9.75C5.75 10.8188 6.49931 11.7153 7.5 11.9433V12.5C7.5 12.7761 7.72384 13 8 13C8.27616 13 8.5 12.7761 8.5 12.5V11.9433C9.50069 11.7153 10.25 10.8188 10.25 9.75C10.25 8.50934 9.24066 7.5 8 7.5Z'
				fill='currentColor'
			/>
		</svg>
	);
};

PriceFeedsTabIcon.propTypes = {
	className: PropTypes.string,
};

PriceFeedsTabIcon.defaultProps = {
	className: "",
};
export default PriceFeedsTabIcon;