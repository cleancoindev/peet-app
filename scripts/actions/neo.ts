export const BIND_NEOLINE: string = "BIND_NEOLINE";

export const bindNeoline = () => async dispatch => {
    window.addEventListener('NEOLine.NEO.EVENT.READY', () => {
        const neoline = new NEOLine.Init();
        //TODO: Dispatch neo provider
    });
}