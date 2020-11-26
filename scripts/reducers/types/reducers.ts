import { EthState } from "./eth";

interface ReducersCombinedState {
    eth: EthState,
    push: Function
}
export default ReducersCombinedState;