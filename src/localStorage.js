const isOverdue = Symbol('isOverdue');

export default class MyLocalStorage {
    constructor(key = 'default') {
        this.key = key;
        this.localStorage = window.localStorage;
    }
    /**
     * 通过传入的 key  和 value 设置 localStorage
     * @param {String} key 
     * @param {Object} value 
     * 
     * 说明：如果想要设置过期时间请在传入数据中传入 
     * @param { Number } expires 有效时间(单位：毫秒)
     * @param { Number } starTime 起始时间(时间戳)
     */
    setItem(value) {
        const str = JSON.stringify(value);
       this.localStorage.setItem(this.key, str);
    }

    /**
     * 获取 localStorage 中指定 key 的 value
     * @param {String} key 
     * @return {Object} 
     */
    getItem() {
        // 使用原生的 localStorage 上的获取方法 
        const str = this.localStorage.getItem(this.key)
        // 转换
        let obj = JSON.parse(str);
        // 使用 方法判断是否过期
        const isOver = this[isOverdue](obj);
        obj = isOver ? null : obj;

        return obj;
    }

    /**
     * 判断该条数据是否过期
     * @param {*} obj 
     */
    [isOverdue](obj) {
        try {
            const startTime = obj.startTime;
            const expires = obj.expires;
            const now = new Date().getTime();

            const time = startTime + expires / 1000;

            if (now >= time) {
                this.localStorage.removeItem(this.key);
                return true;
            }
           
        }catch{
            return false;
        }
    }

    remove(){
        this.localStorage.removeItem(this.key);
    }

    removeAll() {
        this.localStorage.clear();
    }

}