import React from "react";

const CalendarIcon = ({className}) => {
	return (
		<svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M19 18.9999H5V7.99988H19V18.9999ZM16 0.999878V2.99988H8V0.999878H6V2.99988H5C3.89 2.99988 3 3.88988 3 4.99988V18.9999C3 19.5303 3.21071 20.039 3.58579 20.4141C3.96086 20.7892 4.46957 20.9999 5 20.9999H19C19.5304 20.9999 20.0391 20.7892 20.4142 20.4141C20.7893 20.039 21 19.5303 21 18.9999V4.99988C21 4.46944 20.7893 3.96074 20.4142 3.58566C20.0391 3.21059 19.5304 2.99988 19 2.99988H18V0.999878H16ZM17 11.9999H12V16.9999H17V11.9999Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default CalendarIcon;
