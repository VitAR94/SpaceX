export default class FetchData {
    startURL = 'https://api.spacexdata.com/v4/';

    async getResource(url) {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Произошла ошибка: ${res.status} - ${res.statusText}`);
        }
        return await res.json();
    }

    async getRocket() {
        return await this.getResource(this.startURL + 'rockets');
    }

    async getLaunches() {
        return await this.getResource(this.startURL + 'launches/past');
    }

    async getCompany() {
        return await this.getResource(this.startURL + 'company');
    }
};