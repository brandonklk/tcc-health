import { Dispatch, SetStateAction } from "react";

export interface ISideBar {
  openNav: boolean
  setOpenNav: Dispatch<SetStateAction<boolean>>
}
