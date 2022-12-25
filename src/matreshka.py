import requests
from random import sample

class Matreshka:
	def __init__(self) -> None:
		self.api = "https://moblauncher.matrp.ru"
		self.headers = {
			"user-agent": "Dalvik/2.1.0 (Linux; U; Android 9; RMX3551 Build/PQ3A.190705.003)"
		}
		self.client = "prod"
		self.account_id = -1
		self.session_hash = None
		self.device_hash = self.generate_device_hash()

	def generate_device_hash(self) -> str:
		return "".join(sample("abcdefghijklmnopqrstuvwxyz" + "0123456789", 16))

	def login(
			self,
			email: str,
			password: str) -> dict:
		response = requests.get(
			f"{self.api}/api/Requests/Auth.php?type=email&subtype=auth&action=continue&email={email}&pass={password}&accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()
		if "account_id" in response["actions"]:
			self.account_id = response["actions"]["account_id"]
			self.session_hash = response["actions"]["session_hash"]
		return response

	def request_verification_code(
			self,
			email: str,
			password: str) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Auth.php?type=email&subtype=register&action=continue&email={email}&pass={password}&repeat_pass={password}&accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def register(
			self,
			email: str,
			password: str,
			verification_code: int = None) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Auth.php?type=email&subtype=register_code&action=continue&email={email}&pass={password}&repeat_pass={password}&code={verification_code}&accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_stories(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Stories.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_servers(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Servers.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_social_bonus_info(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/SocialBonusInfo.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_account_details(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/AccountDetails.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_cabinet(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Cabinet.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()
	
	def change_password(
			self,
			password: str) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/Auth.php?type=email&subtype=changepass_old&action=continue&pass={password}&accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_faq(self) -> dict:
		return requests.get(
			f"{self.api}/api/Requests/FAQ.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_files(self) -> dict:
		return requests.get(
			f"{self.api}/files_list.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_audios(self) -> dict:
		return requests.get(
			f"{self.api}/audio_list.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_radios(self) -> dict:
		return requests.get(
			f"{self.api}/radio_list.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()

	def get_update(self) -> dict:
		return requests.get(
			f"{self.api}/update.php?accountId={self.account_id}&sessionHash={self.session_hash}&deviceHash={self.device_hash}&client={self.client}",
			headers=self.headers).json()
