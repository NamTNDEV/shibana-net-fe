export const ERROR_DICTIONARY: Record<number, string> = {
    // --- 01: API GATEWAY & SYSTEM ---
    4010101: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.",
    4010201: "Header xác thực không hợp lệ.",
    5000101: "Hệ thống đang gặp sự cố, vui lòng thử lại sau.",
    5020101: "Không thể kết nối đến máy chủ.",

    // --- 02: IDENTITY SERVICE (Quan trọng nhất) ---
    // Nhóm 400: Validate Form
    4000102: "Token không hợp lệ.",
    4000202: "Email không đúng định dạng (ví dụ: user@example.com).",
    4000302: "Vui lòng nhập địa chỉ Email.",
    4000402: "Vui lòng nhập mật khẩu.",
    4000502: "Mật khẩu phải có ít nhất 6 ký tự.",
    4000602: "Mật khẩu hiện tại không chính xác.",
    4000702: "Bạn đã nhập sai thông tin đăng nhập.",

    // Nhóm 401, 403, 404, 409
    4010202: "Token không hợp lệ.",
    4010402: "Token đã hết hạn.",
    4030102: "Bạn không có quyền truy cập chức năng này.",
    4040102: "Tài khoản không tồn tại trong hệ thống.",
    4090102: "Email này đã được đăng ký, vui lòng chọn Email khác.",

    // --- 03: MEDIA SERVICE ---
    4000103: "File tải lên quá lớn (Tối đa 5MB).",
    4000203: "Dữ liệu file không hợp lệ.",
    4150103: "Định dạng file không được hỗ trợ.",

    // --- 04: POST SERVICE ---
    4040104: "Bài viết không tồn tại hoặc đã bị xóa.",
    4030204: "Bạn không có quyền sửa/xóa bài viết này.",

    // --- 05: PROFILE SERVICE ---
    4040105: "Không tìm thấy thông tin cá nhân.",
} as const;

export type ErrorDictionaryType = keyof typeof ERROR_DICTIONARY;