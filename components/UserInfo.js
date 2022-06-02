export default class UserInfo {
    
    constructor({nameSelector, jobSelector}) {
        this._userNameElement = document.querySelector(nameSelector);
        this._userJobElement = document.querySelector(jobSelector);;
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
}