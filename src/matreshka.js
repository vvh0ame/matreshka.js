class Matreshka {
	constructor(countryCode = "ru") {
		this.api = "https://moblauncher.matrp.ru"
		this.headers = {
			"user-agent": "Dalvik/2.1.0 (Linux; U; Android 9; RMX3551 Build/PQ3A.190705.003)"
		}
		this.client = "prod"
		this.accountId = -1
		this.deviceHash = this.generateDeviceHash
	}

	generateDeviceHash() {
		let hash = ""
		const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
		for (let i = 0; i < 16; i++) {
			hash += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return hash
	}

	async login(email, password) {
		const response = await fetch(
			`${this.api}/api/Requests/Auth.php?type=email&subtype=auth&action=continue&email=${email}&pass=${password}&accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		const data = await response.json()
		if ("account_id" in data.actions[0]) {
			this.accountId = data.actions[0].account_id
			this.sessionHash = data.actions[0].session_hash
		}
		return data
	}

	async requestVerificationCode(email, password) {
		const response = await fetch(
			`${this.api}/api/Requests/Auth.php?type=email&subtype=register&action=continue&email=${email}&pass=${password}&repeat_pass=${password}&accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async register(email, password, verificationCode) {
		const response = await fetch(
			`${this.api}/api/Requests/Auth.php?type=email&subtype=register_code&action=continue&email=${email}&pass=${password}&repeat_pass=${password}&code=${verificationCode}&accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getStories() {
		const response = await fetch(
			`${this.api}/api/Requests/Stories.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getServers() {
		const response = await fetch(
			`${this.api}/api/Requests/Servers.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getSocialBonusInfo() {
		const response = await fetch(
			`${this.api}/api/Requests/SocialBonusInfo.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getAccountDetails() {
		const response = await fetch(
			`${this.api}/api/Requests/AccountDetails.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getCabinet() {
		const response = await fetch(
			`${this.api}/api/Requests/Cabinet.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async changePassword(password) {
		const response = await fetch(
			`${this.api}/api/Requests/Auth.php?type=email&subtype=changepass_old&action=continue&pass=${password}&accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getFaq() {
		const response = await fetch(
			`${this.api}/api/Requests/FAQ.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getAudios() {
		const response = await fetch(
			`${this.api}/audio_list.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getRadios() {
		const response = await fetch(
			`${this.api}/radio_list.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUpdate() {
		const response = await fetch(
			`${this.api}/update.php?accountId=${this.accountId}&sessionHash=${this.sessionHash}&deviceHash=${this.deviceHash}&client=${this.client}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}
}

module.exports = {Matreshka}
