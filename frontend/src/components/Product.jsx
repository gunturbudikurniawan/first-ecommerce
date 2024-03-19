import { Card } from 'react-bootstrap';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const globalCurrency = useSelector((state)=>state.currency)
    const formatUang = (number) => {
        // Convert USD to IDR if currency is IDR
        const convertedPrice = globalCurrency === 'IDR' ? number * 15500 : number;
        var qtyer = 1;
        var uang = String(convertedPrice);
        var hasil = '';
        for (var i = uang.length - 1; i >= 0; i--) {
            if (qtyer % 3 === 0 && i !== 0 && globalCurrency === "IDR") {
                hasil = '.' + uang[i] + hasil;
            } else {
                hasil = uang[i] + hasil;
            }
            qtyer++;
        }
        const curr = globalCurrency === "IDR" ? "Rp " : "$ "
        return `${curr} ${hasil}`;
    };
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>{formatUang(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;