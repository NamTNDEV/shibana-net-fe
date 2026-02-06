import { ROLES } from "@/constants/roles";
import RoleGuard from "../auth/role-guard";

export default function ProfileItem() {
    return (
        <div>
            <h3>ProfileItem</h3>
            <RoleGuard allowedRoles={[ROLES.ADMIN]}>
                <div>Admin content</div>
            </RoleGuard>
            <RoleGuard allowedRoles={[ROLES.USER]}>
                <div>User content</div>
            </RoleGuard>
        </div>
    )
}
