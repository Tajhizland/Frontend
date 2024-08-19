import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
    cart: []
};

const { useGlobalState, getGlobalState, setGlobalState } = createGlobalState(initialState);

export { useGlobalState };

