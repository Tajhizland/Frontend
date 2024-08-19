import {createGlobalState} from "react-hooks-global-state";
const initialState = {
    user: []
};

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState);

