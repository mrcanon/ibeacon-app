#Luồng hoạt động của login:
Lần đầu đăng nhập - khi ấn nút đăng nhập
	- Bắt Device_id của thiết bị
	- Không có 	<input />: code_verify 
				<p />: login_verify
	- Ấn đăng nhập xong {
		Nếu (Đăng nhập đúng user, password) {
			- Gửi gửi mã Device_id cho server check, server sẽ tự sinh một verify code tương ứng với Device_id đó
			- Vào app luôn
		} Không thì {
			Trả về lỗi: sai user hoặc password, nhập lại
		}
	}

Lần thứ 2,... thứ n đăng nhập vào cùng thiết bị: Đăng nhập luôn không cần mã xác nhận

Lần đầu đăng nhập cùng 1 tài khoản vào thiết bị khác:
	- Ấn đăng nhập xong {
		nếu (đăng nhập đúng user, password) {
			- Báo message và sinh ra 1 input nhập mã Code Verify
			- Sinh ra 	<input />: code_verify
						<p />: login_verify
			- Disable 	<input />: user
						<input />: password
			- Gặp admin xin code nhập vào{
				Nếu Admin nhập đúng: vào app
				Nếu không thì : thông báo error sai verify, nhập lại
			}
		} không thì {
			Trả về lỗi: sai user hoặc password
		}
	}

#Test đăng nhập đã có:
	user: huynv6786
	password: 123456
	Device_id: 123456654333455
	verify_code: 1234544334

	Nếu muốn test code verify chỉ cần thay đổi Device_id của thiết bị