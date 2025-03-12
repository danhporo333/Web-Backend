import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const AdminRoute = (props) => {
    const { user } = useContext(AuthContext);
    const isAdmin = user?.roles?.includes('Admin');

    if (!isAdmin) {
        return (
            <Result
                status="403"
                title="Permission Denied"
                subTitle="bạn không có quyền truy cập."
                extra={
                    <Button type="primary">
                        <Link to="/">Back to Home</Link>
                    </Button>
                }
            />
        );
    }

    return <>{props.children}</>;
};

export default AdminRoute;
