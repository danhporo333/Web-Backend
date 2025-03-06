
import { Drawer } from 'antd';

const viewUserDetail = (props) => {
    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;
    return (
        <Drawer
            width={"40vw"}
            title="Chi tiết User"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? <>
                <p>Id: {dataDetail.id}</p>
                <br />
                <p>User name: {dataDetail.username}</p>
                <br />
                <p>Email: {dataDetail.email}</p>
                <br />
                <p>Phone number: {dataDetail.phone}</p>
                <br />
                <p>Vai trò: {dataDetail.role}</p>
            </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    )
}

export default viewUserDetail;