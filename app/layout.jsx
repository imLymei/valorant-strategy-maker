import './globals.css';
import Title from './Title';
require('dotenv').config();

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head />
			<body>
				<Title />
				{children}
			</body>
		</html>
	);
}
