import { Rootstate } from './../Store/store';
import { TypedUseSelectorHook, useSelector } from "react-redux";


export const useTypedSelector: TypedUseSelectorHook<Rootstate> = useSelector