import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, isAdmin = false, keyword = '' }) {
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => {
                let linkTo = isAdmin
                    ? `/admin/productlist?keyword=${encodeURIComponent(keyword)}&page=${x + 1}`
                    : keyword
                        ? `/?keyword=${encodeURIComponent(keyword)}&page=${x + 1}`
                        : `/?page=${x + 1}`;

                return (
                    <Pagination.Item key={x + 1} active={x + 1 === page}>
                        <Link style={{
                            textDecoration: 'none',
                            color: x + 1 === page ? 'white' : 'black'
                        }} to={linkTo}>{x + 1}</Link>
                    </Pagination.Item>
                );
            })}
        </Pagination>
    );
}

export default Paginate