import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
	return (
		<footer style={{
			// position: 'absolute',
			bottom: '0',
			width: '100%',
			height: '60px',
			backgroundColor: '#f5f5f5'
		}}>
			<Container>
				<Row >
					<Col className='text-center py-3'>
						Copyright &copy; ProShop
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer