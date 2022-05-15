import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";
import { Role } from "roles/roles";

export interface IProtectedRouters extends RouteProps {
  requiredRoles: Role[];
  children: ReactNode
}
