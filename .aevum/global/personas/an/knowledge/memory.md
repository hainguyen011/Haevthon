# Project Memory & Learnings

File này lưu trữ những bài học, sở thích, và quy tắc ngầm được rút ra trong quá trình làm việc. Agent CÓ QUYỀN và PHẢI tự động cập nhật file này khi phát hiện thông tin quan trọng cần ghi nhớ lâu dài.

## User Preferences
- (Ví dụ: User thích dùng `const` thay vì `let` nếu có thể)

## Project Specifics
- (Ví dụ: API `/login` luôn trả về 200 kể cả khi lỗi, kiểm tra body.error)

## Lessons Learned
- [YYYY-MM-DD]: Lỗi XYZ xảy ra do xung đột thư viện A và B.     


### [LEARN] - 5/3/2026, 10:59:32 PM
[LEARNING FROM Modernize Landing Page UI]
The transition to a data-driven landing page was successful, allowing for zero-code content updates. The 'sturdy' UI requirement was met by replacing spring-based motion with static states while maintaining visual depth via glassmorphism and metallic effects. The Innovation section's full-screen layout serves as a strong template for other high-impact storytelling sections.


### [LEARN] - 5/3/2026, 11:06:06 PM
[LEARNING FROM modernize_event_roadmap_ui_plan.md]
The zig-zag layout with a central axis significantly enhances the visual narrative for linear event sequences. Using subtle background index numbers (01, 02) effectively adds depth without cluttering the UI. Pulsing nodes serve as micro-animations that make the page feel 'alive' and high-tech. The CSS media query override was necessary to ensure the complex grid collapses gracefully on mobile into a left-aligned vertical list.


### [LEARN] - 5/4/2026, 5:13:28 AM
[LEARNING FROM DASHBOARD_OPTIMIZATION_FINAL]
When refactoring huge React components into high-density grids, use a single source of truth for layout constants (like gap and padding) to ensure visual consistency. Avoid partial rewrites that can break syntax; full variable rewrites are safer when structural changes are major.


### [LEARN] - 5/5/2026, 9:23:17 AM
[LEARNING FROM Bổ sung ngày vào Timeline]
- Luôn chú ý đến định dạng ngày tháng đầy đủ (Full Date) khi làm việc với các mốc thời gian sự kiện.
- Kiểm tra kỹ các lỗi typo nhỏ trong chuỗi thời gian (ví dụ: missing :00).
- Sử dụng pipe (|) hoặc dot (•) một cách nhất quán trong thiết kế tech/agentic.


### [LEARN] - 5/5/2026, 9:26:56 AM
[LEARNING FROM Cập nhật lộ trình đăng ký Đợt 1 & 2]
- Luôn xác nhận trạng thái hiện tại (đang diễn ra hay đã kết thúc) của các sự kiện quan trọng.
- Cấu trúc timeline linh hoạt cho phép thêm các đợt sự kiện con (Phase 1, Phase 2) dễ dàng.


### [LEARN] - 5/5/2026, 9:29:23 AM
[LEARNING FROM Thêm nút đăng ký vào Timeline]
- Có thể tích hợp logic điều hướng vào timeline bằng cách thêm các thuộc tính điều kiện (như showRegisterBtn) vào data source.
- Sử dụng e.stopPropagation() khi click vào nút bên trong một item có sự kiện click riêng (như accordion) để tránh xung đột hành vi.


### [LEARN] - 5/5/2026, 9:29:54 AM
[LEARNING FROM Loại bỏ hiệu ứng hover nút Đăng ký]
- Một số thiết kế minimalist/pure yêu cầu các nút bấm tĩnh (static) để tránh gây xao nhãng hoặc giữ tính trang trọng.


### [LEARN] - 5/5/2026, 9:31:52 AM
[LEARNING FROM Đồng bộ múi giờ khu vực cho Timeline]
- Việc bổ sung múi giờ (Timezone) giúp người dùng ở các khu vực khác nhau nắm bắt chính xác thời gian diễn ra sự kiện.
- Sử dụng localization cho cả các ký hiệu kỹ thuật (như ICT/Giờ VN) giúp giao diện thân thiện hơn với người bản địa.


### [LEARN] - 5/5/2026, 9:33:42 AM
[LEARNING FROM Làm nổi bật ngày và đổi dấu ngăn cách thành gạch ngang]
- Dấu gạch ngang (—) thường tạo cảm giác chuyên nghiệp và hiện đại hơn dấu chấm trong các thiết kế tech/hackathon.
- Độ đậm (fontWeight: 700) và màu sắc tương phản cao giúp thông tin quan trọng (như ngày tháng) không bị chìm giữa các thông tin phụ.


### [LEARN] - 5/5/2026, 9:37:55 AM
[LEARNING FROM Chuyển màu đường viền chạy sang tím Haevthon]
- Việc sử dụng màu sắc thương hiệu (Brand Color) cho các hiệu ứng động giúp tăng tính nhận diện và đồng nhất cho ứng dụng.
- Hiệu ứng conic-gradient kết hợp với animation tạo ra cảm giác công nghệ cao (High-tech) rất phù hợp với chủ đề Agentic Hackathon.


### [LEARN] - 5/10/2026, 7:02:43 PM
[LEARNING FROM implementation_of_haevthon_participant_handbook_pdf_plan.md]
- Khi tích hợp dữ liệu từ các trang khác (như Home) vào Handbook, cần chú ý đến hệ thống đa ngôn ngữ (Translation keys).
- Việc sử dụng inline styles cho @media print giúp kiểm soát tốt hơn các thành phần UI cụ thể của từng trang mà không làm phình to file CSS tổng.
- Cần có giá trị dự phòng (fallback) khi ánh xạ dữ liệu từ object dùng chung để tránh lỗi runtime.


### [LEARN] - 5/10/2026, 10:32:28 PM
[LEARNING FROM Refine Handbook Content]
Handbook content should focus on specialized technical advice rather than general marketing info to avoid redundancy. Translation keys (hb_) must be carefully synced with the data structure to ensure multi-language support remains robust during structural refactors.


### [LEARN] - 5/10/2026, 10:34:05 PM
[LEARNING FROM Refine Handbook Content - Essentials Addition]
Adding 'human' and 'survival' elements to technical documentation increases user engagement. Using icons (lucide-react) for survival tips makes the content more scannable and 'fun'.


### [LEARN] - 5/10/2026, 10:35:18 PM
[LEARNING FROM Move Sidebar to Right]
When moving a sticky sidebar from left to right, remember to update alignment properties (textAlign, justifyContent) and absolute indicators (left/right offsets) to maintain visual balance and functionality.


### [LEARN] - 5/10/2026, 10:37:11 PM
[LEARNING FROM Optimize Handbook for Readability]
For content-heavy pages, 'integrated' designs with subtle dividers and optimized vertical rhythm work better than card-based layouts. Using Monospace fonts for structural labels adds a professional, 'system-like' feel to technical documentation.


### [LEARN] - 5/10/2026, 10:37:57 PM
[LEARNING FROM Fix ReferenceError AevumCard]
When refactoring or removing core components, always search for all occurrences across the file to prevent runtime ReferenceErrors. Grep is your friend.
