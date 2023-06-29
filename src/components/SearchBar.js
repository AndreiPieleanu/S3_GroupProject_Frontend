import React, {useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {fetchCommitsByVersion} from "../redux/actionsAPI/fetchByError/fetchCommitsByVersion";
import {setCommitVersion,} from "../redux/actions";


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState();
    const dispatch = useDispatch();
    const branchId = useSelector((state) => state.branchId);
    const commitVersion = useSelector((state) => state.commitVersion);
    const currentView = useSelector((state) => state.currentView)
    const [searchAction, setSearchAction] = useState(null);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    console.log(branchId.branchId)
    useEffect(() => {
        dispatch(fetchCommitsByVersion(branchId.branchId, searchTerm));
        dispatch(setCommitVersion(searchTerm));
        setSearchAction(null);
    }, [searchAction, branchId, searchTerm, dispatch]);
    return (

        <div className="input-group mb-3">
            <div style={{color: 'red', fontSize: 'small', float: "left"}}>
                <b>Version Filter:</b>
                <input
                    style={{float: "left", clear: "left"}}
                    type="text"
                    className="form-control"
                    placeholder="Search By Version..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
}

export default connect()(SearchBar);