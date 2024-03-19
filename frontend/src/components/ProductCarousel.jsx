import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
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
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {product.name} ({formatUang(product.price)})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;