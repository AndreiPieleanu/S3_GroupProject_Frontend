import {useDispatch} from "react-redux";
import {useEffect} from "react";

const AutoRefresh = ({ refreshInterval, fetchAction, children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(() => {
                dispatch(fetchAction);
            });
        }, refreshInterval);

        return () => {
            clearInterval(intervalId);
        };
    }, [refreshInterval, fetchAction, dispatch]);

    return children;
};

export default AutoRefresh;