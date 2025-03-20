import {Fragment} from "react";
import {useSelector} from "react-redux";

const FullScreenLoader = () => {
    const settings = useSelector(state => state.settings.loader);
    return (
        <Fragment>
            <div className={"LoadingOverlay "+settings}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default FullScreenLoader;