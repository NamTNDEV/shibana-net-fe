import { Archive, History, Pencil, Pin, Settings, Trash2 } from "lucide-react";
import { ActionItemGroupType } from "./header-actions.type";

export const actionGroupsItems: ActionItemGroupType[] = [
    {
        id: 1,
        items: [
            {
                icon: Pin,
                title: "Lưu bài viết",
                actionType: "PIN",
                description: "Thêm vào danh sách thư mục đã lưu."
            },
        ]
    },
    {
        id: 2,
        items: [
            {
                icon: History,
                actionType: "VIEW_HISTORY",
                title: "Xem lịch sử chỉnh sửa",
            },
            {
                icon: Pencil,
                actionType: "EDIT_POST",
                title: "Chỉnh sửa bài viết",
            },
            {
                icon: Settings,
                actionType: "EDIT_PRIVACY",
                title: "Chỉnh sửa đối tượng chia sẻ",
            },
        ]
    },
    {
        id: 3,
        items: [
            {
                icon: Archive,
                actionType: "STORE",
                title: "Chuyển vào kho lưu trữ",
            },
            {
                icon: Trash2,
                title: "Chuyển vào thùng rác",
                actionType: "DELETE",
                description: "Các mục trong thùng rác sẽ bị xóa vĩnh viễn sau 30 ngày.",
            }
        ]
    },
]

export const publicActions = ["PIN", "VIEW_HISTORY"];
export const onGoingDevelopmentActions = ["PIN", "VIEW_HISTORY", "EDIT_PRIVACY", "STORE", "DELETE"];