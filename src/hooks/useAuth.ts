import { Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AuthModel } from "src/models/Auth";
import { actions, RootAction } from "../store";
import { RootState } from "../store/reducers";

export const useAuth = () => {
    const dispatch = useDispatch<Dispatch<RootAction>>();
    const account = useSelector((state: RootState) => state.account);

    const checkPhone = useCallback((phone: string) => dispatch(actions.checkPhone(phone)), [dispatch, actions]);
    const login = useCallback((auth: AuthModel) => dispatch(actions.checkCode(auth)), [dispatch, actions]);
    const logout = useCallback(() => dispatch(actions.clearUser()), [dispatch, actions]);
    
    return { account, checkPhone, login, logout };
}