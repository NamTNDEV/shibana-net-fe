export const formatSocialTimeCustom = (dateInput: string | Date): string => {
    const date = dateInput !== null ? new Date(dateInput) : new Date();
    const now = new Date();

    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    // Xử lý lấy giờ phút dạng 09:12
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // 1. Dưới 1 phút
    if (diffInMinutes < 1) {
        return "Vừa xong";
    }

    // 2. Dưới 1 giờ
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút`;
    }

    // 3. Dưới 24 giờ
    if (diffInHours < 24) {
        return `${diffInHours} giờ`;
    }

    // 4. Kiểm tra Hôm qua
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    ) {
        return `Hôm qua lúc ${timeString}`;
    }

    // 5. Trong cùng năm hiện tại
    if (date.getFullYear() === now.getFullYear()) {
        return `${date.getDate()} tháng ${date.getMonth() + 1} lúc ${timeString}`;
    }

    // 6. Năm cũ
    return `${date.getDate()} tháng ${date.getMonth() + 1}, ${date.getFullYear()}`;
};