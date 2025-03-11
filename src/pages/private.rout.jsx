import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.userId) {
        return (
            <>
                {props.children}
            </>
        )
    }
    // return (<Navigate to="/login" />);

    return (
        <Result
            status="403"
            title="Oops!"
            subTitle="bạn cần đăng nhập để truy cập."
            extra={<Button type="primary">
                <Link to="/">
                    <span>Back to homepage</span>
                </Link>
            </Button>}
        />
    )
}

export default PrivateRoute;