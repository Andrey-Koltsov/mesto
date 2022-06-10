export default class UserInfo {
    
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            job: this._userJobElement.textContent,
        }
    }

    setUserInfo({name, job}) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
    }

    setUserAvatar(src) {
        this._userAvatar.src = src;
    }
}