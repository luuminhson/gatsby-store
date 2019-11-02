import { Link } from '../LinkWithPrev';

export default [
    {
        title: 'Free ship toàn Việt Nam',
        content: (
            <p>ORINS miễn phí giao hàng trong toàn Việt Nam. Trong trường hợp địa chỉ nhận hàng không thể được giao bởi các đơn vị giao hàng, hàng có thể được giao đến các bưu cục gần nhất. Bạn sẽ được báo trước trong trường hợp này.</p>
        )
    },
    {
        title: 'Đổi trả hàng miễn phí',
        content: (
            <div>
                <p>ORINS chấp nhận yêu cầu đổi trả hàng trong vòng 24 giờ kể từ khi sản phẩm được giao tới bạn. Chúng tôi cover chi phí đổi trả.</p>
                <p>Xem thêm về <Link to='/shipping-and-return'>quy trình đổi trả hàng.</Link></p>
            </div>
        )
    }
];