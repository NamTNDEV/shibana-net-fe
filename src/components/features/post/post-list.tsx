import { PostResponseDataType } from "@/types/post.type"
import PostItem from "./post-item"

const MOCK_POST_LIST: PostResponseDataType[] = [
    {
        "id": "378e8e95-5ad3-45d2-8633-e80fa843d3f8",
        "content": "Mỗi lần bạn bước vào Minecraft, bạn có thể là bất cứ ai: một kiến trúc sư, một thợ mỏ, hay thậm chí là một chiến binh đấu với quái vật. ⚔️\n\n🌍 Cùng nhau xây dựng những công trình huyền thoại, khai thác tài nguyên, và tìm ra những bí mật ẩn giấu trong từng block. Đừng quên, mọi thứ có thể thay đổi trong nháy mắt — mỗi cuộc phiêu lưu luôn mới mẻ và đầy thử thách.\n\nHãy chia sẻ những sáng tạo của bạn trong thế giới Minecraft! Bạn đã xây dựng được công trình nào ấn tượng chưa?\n\n#Minecraft #GamingCommunity #BlockBuilding #Adventure #Survival",
        "author": {
            "userId": "c6179751-fce5-4778-aace-0e0914cf9ef4",
            "username": "shibanatest_01",
            "displayName": "Shibana Test 1",
            "avatarMediaName": null,
            "avatarScale": null,
            "avatarPositionX": null,
            "avatarPositionY": null
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-27T15:03:17.352Z",
        "commentCount": 1
    },
    {
        "id": "d7513c6c-4946-4038-9047-2360349f0793",
        "content": "Bạn không cần kiếm nhiều tiền để giàu — bạn cần quản lý tiền tốt. 💰\nRất nhiều người lương cao nhưng vẫn “cháy túi” cuối tháng.\n\n📌 Nguyên tắc đơn giản:\n    •   50% nhu cầu\n    •   30% mong muốn\n    •   20% tiết kiệm/đầu tư",
        "author": {
            "userId": "c0820a6b-6b34-4861-9118-71ee66f3479b",
            "username": "nhatnam312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/690542fd-5b7e-4dde-989b-05b7977c4aa7.jpg",
            "avatarScale": 1.4,
            "avatarPositionX": -13.0,
            "avatarPositionY": -2.59765625
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-26T07:34:37.373Z",
        "commentCount": 0
    },
    {
        "id": "1385274f-290d-4c05-8ec5-f6450659feb3",
        "content": "Học nhiều không bằng học đúng cách. 📖\nThay vì đọc 10 trang mà không nhớ gì, hãy thử:\n👉 Tóm tắt lại bằng lời của mình\n👉 Dạy lại cho người khác\n👉 Ứng dụng ngay vào thực tế\n💡 Kiến thức chỉ thực sự “của bạn” khi bạn dùng được nó.\n\n#studytips #learning #productivity #studentlife",
        "author": {
            "userId": "c0820a6b-6b34-4861-9118-71ee66f3479b",
            "username": "nhatnam312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/690542fd-5b7e-4dde-989b-05b7977c4aa7.jpg",
            "avatarScale": 1.4,
            "avatarPositionX": -13.0,
            "avatarPositionY": -2.59765625
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-26T07:33:53.326Z",
        "commentCount": 0
    },
    {
        "id": "19369d11-5128-48f5-8770-c07906bf1ae3",
        "content": "Đi làm không chỉ là làm việc — mà là học cách làm việc với con người. 🤝\nKỹ năng chuyên môn có thể giúp bạn vào công ty, nhưng thái độ và cách giao tiếp mới giữ bạn ở lại lâu dài.\n📌 Hãy học cách:\n    •   Lắng nghe trước khi phản hồi\n    •   Chủ động thay vì chờ giao việc\n    •   Nhận lỗi nhanh, sửa lỗi nhanh\n#career #worklife #softskills #growthmindset",
        "author": {
            "userId": "c0820a6b-6b34-4861-9118-71ee66f3479b",
            "username": "nhatnam312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/690542fd-5b7e-4dde-989b-05b7977c4aa7.jpg",
            "avatarScale": 1.4,
            "avatarPositionX": -13.0,
            "avatarPositionY": -2.59765625
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-26T07:33:02.472Z",
        "commentCount": 0
    },
    {
        "id": "cc9db1a8-e970-4f6f-9d1d-59c38f5c2cd3",
        "content": "Một ly cà phê không chỉ là đồ uống, mà là khoảng thời gian để mình chậm lại. ☕\nGiữa guồng quay công việc, đôi khi chỉ cần 30 phút ngồi yên, không deadline, không áp lực — chỉ có mình và suy nghĩ của mình.\n🌿 Chill không phải là lười, mà là cách để nạp lại năng lượng.\n\n#coffeevibes #chilltime #slowliving #me-time",
        "author": {
            "userId": "c0820a6b-6b34-4861-9118-71ee66f3479b",
            "username": "nhatnam312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/690542fd-5b7e-4dde-989b-05b7977c4aa7.jpg",
            "avatarScale": 1.4,
            "avatarPositionX": -13.0,
            "avatarPositionY": -2.59765625
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-26T07:29:08.419Z",
        "commentCount": 0
    },
    {
        "id": "cacc0f4d-e42e-428a-843c-eac8f6a4700d",
        "content": "Có những ngày bạn thức dậy mà chẳng có chút động lực nào. Nhưng hãy nhớ: bạn không cần phải cảm thấy “sẵn sàng” mới bắt đầu — bạn chỉ cần bắt đầu. 💪\nMột bước nhỏ hôm nay vẫn tốt hơn là đứng yên. Thành công không đến từ cảm hứng nhất thời, mà từ sự kiên trì lặp lại mỗi ngày.\n✨ Hãy thử đặt mục tiêu đơn giản: hôm nay tốt hơn hôm qua 1%. Bạn sẽ ngạc nhiên vì sự thay đổi sau vài tuần.\n\n#motivation #dailygrind #selfimprovement #startnow",
        "author": {
            "userId": "c0820a6b-6b34-4861-9118-71ee66f3479b",
            "username": "nhatnam312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/690542fd-5b7e-4dde-989b-05b7977c4aa7.jpg",
            "avatarScale": 1.4,
            "avatarPositionX": -13.0,
            "avatarPositionY": -2.59765625
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-26T07:26:50.248Z",
        "commentCount": 0
    },
    {
        "id": "1d3f663d-ba8b-4749-90e1-797835327eb7",
        "content": "Đừng đợi đến khi hoàn hảo mới bắt đầu. Hãy bắt đầu để trở nên hoàn hảo! 🏃‍♂️ Thành công nằm ở sự kiên trì của chính bạn. 🎯",
        "author": {
            "userId": "dd2b846a-66ff-4603-97dc-9c7600758579",
            "username": "namtndev312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/4e45ecf5-e7e7-4fd7-a543-14543fd7065b.jpg",
            "avatarScale": 1.0,
            "avatarPositionX": 0.0,
            "avatarPositionY": 12.895182291666666
        },
        "privacy": "FRIENDS",
        "createdAt": "2026-03-25T15:24:25.307Z",
        "commentCount": 0
    },
    {
        "id": "123ff3a5-5570-4ad3-af35-385ef8e17c8b",
        "content": "Da đẹp không tự nhiên mà có, đó là cả một quá trình skincare tỉ mỉ. ✨ Hãy để làn da lên tiếng cho sự yêu thương của bạn! 🧖‍♀️",
        "author": {
            "userId": "dd2b846a-66ff-4603-97dc-9c7600758579",
            "username": "namtndev312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/4e45ecf5-e7e7-4fd7-a543-14543fd7065b.jpg",
            "avatarScale": 1.0,
            "avatarPositionX": 0.0,
            "avatarPositionY": 12.895182291666666
        },
        "privacy": "FRIENDS",
        "createdAt": "2026-03-25T15:23:00.637Z",
        "commentCount": 0
    },
    {
        "id": "1c52a4f7-3412-4f64-841e-d2ba66ea552e",
        "content": "Rạng rỡ như ánh nắng, ngọt ngào tựa nàng thơ. 🌷 Đừng quên yêu chiều bản thân mỗi ngày để luôn tỏa sáng nhất nhé các cô gái! 💖",
        "author": {
            "userId": "dd2b846a-66ff-4603-97dc-9c7600758579",
            "username": "namtndev312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/4e45ecf5-e7e7-4fd7-a543-14543fd7065b.jpg",
            "avatarScale": 1.0,
            "avatarPositionX": 0.0,
            "avatarPositionY": 12.895182291666666
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-25T15:22:14.573Z",
        "commentCount": 0
    },
    {
        "id": "4298885e-83dd-4cec-921f-1e4692f3d738",
        "content": "Bug là 'đặc sản', Fix bug là 'đam mê'. 👨‍💻 Thế giới vận hành bằng code, còn bạn vận hành bằng cafe. Code thôi chờ chi! 🚀",
        "author": {
            "userId": "dd2b846a-66ff-4603-97dc-9c7600758579",
            "username": "namtndev312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/4e45ecf5-e7e7-4fd7-a543-14543fd7065b.jpg",
            "avatarScale": 1.0,
            "avatarPositionX": 0.0,
            "avatarPositionY": 12.895182291666666
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-25T15:21:29.810Z",
        "commentCount": 0
    },
    {
        "id": "f5a798ef-c724-4bc1-b5ed-02d1568e1249",
        "content": "Học tiếng Nhật không khó như bạn nghĩ! 🌸 Mỗi ngày 5 từ vựng, sau 1 năm bạn đã có cả kho tàng rồi. Cùng chinh phục JLPT nhé! 💪",
        "author": {
            "userId": "dd2b846a-66ff-4603-97dc-9c7600758579",
            "username": "namtndev312002",
            "displayName": "Trần Nhật Nam",
            "avatarMediaName": "http://localhost:8888/api/v1/media/static/4e45ecf5-e7e7-4fd7-a543-14543fd7065b.jpg",
            "avatarScale": 1.0,
            "avatarPositionX": 0.0,
            "avatarPositionY": 12.895182291666666
        },
        "privacy": "PUBLIC",
        "createdAt": "2026-03-25T15:20:36.280Z",
        "commentCount": 0
    }
]

export default function PostList() {
    return (
        <div className="flex flex-col gap-4">
            {MOCK_POST_LIST.map(post => <PostItem key={post.id} post={post} displayMode="NEWSFEED" />)}
        </div>
    )
}
