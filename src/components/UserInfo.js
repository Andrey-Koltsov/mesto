export default class UserInfo {
    
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getInfo() {
        return {
            'profile-name': this._userNameElement.textContent,
            'profile-job': this._userJobElement.textContent,
        }
    }

    getId() {
        return this._id;
    }

    setInfo({name, about, avatar, _id}) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = about;
        this._userAvatar.src = avatar;
        this._id = _id;
    }
}