import { EthState } from "./eth";
import { NeoState } from "./neo";

interface ReducersCombinedState {
    eth: EthState,
    neo: NeoState,
    push: Function
}
export default ReducersCombinedState;