module.exports = {
    a: 6378245.0,
    ee: 0.00669342162296594323,

    transform: function (wgLat, wgLng) {
        if (this.isOutOfMainlandChina(wgLat, wgLng))
            return {lat: wgLat, lng: wgLng}
        const radLat = wgLat / 180.0 * Math.PI
        const magic = 1 - this.ee * (Math.pow(Math.sin(radLat), 2))
        const sqrtMagic = Math.sqrt(magic)
        const dLat = (this.transformLat(wgLng - 105.0, wgLat - 35.0) * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI)
        const dLng = (this.transformLng(wgLng - 105.0, wgLat - 35.0) * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI)
        return {lat: wgLat + dLat, lng: wgLng + dLng}
    },

    isOutOfMainlandChina: function (lat, lng) {
        if (lat >= 21.8 && lat <= 25.3 && lng >= 120.0 && lng <= 122.0) return true
        if (lng < 72.004 || lng > 137.8347) return true
        if (lat < 0.8293 || lat > 55.8271) return true
        return false
    },

    transformLat: function (x, y) {
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0
        ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0
        return ret
    },

    transformLng: function (x, y) {
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
        ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0
        ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0
        ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0
        return ret
    }
}