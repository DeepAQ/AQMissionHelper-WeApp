module.exports = {
    ingressmm: {
        search: key => {
            return 'get_mission.php?find=' + key + '&findby=0';
        },

        parseList: json => {
            let list = [];
            try {
                // Smart Sort
                const getNum = name => {
                    name = name.replace(/[\s-]/g, "");
                    const regs = [/[(（\[【{]*(\d+)[/)）\]】}]/i, /(\d+)$/i];
                    for (let i in regs) {
                        const matches = name.match(regs[i]);
                        if (matches && matches.length >= 2)
                            return Number(matches[1]);
                    }
                    return false;
                };
                for (let item of json.mission) {
                    list.push({
                        type: 'ingressmm',
                        id: item.id,
                        name: item.name,
                        number: getNum(item.name),
                        seq: item.sequence,
                        lat: item.latitude,
                        lng: item.longitude,
                        icon: 'https://ingressmm.com/icon/' + item.code + '.jpg'
                    });
                }
                list = list.sort((a, b) => {
                    if (a.number == b.number) return (a.name > b.name ? 1 : -1);
                    if (a.number === false) return 1;
                    if (b.number === false) return -1;
                    return a.number - b.number;
                });
            } catch (e) {
                return false;
            }
            return list;
        },

        getPortals: function (mission, callback) {
            $.getJSON(app.datasrc + '/get_portal.php?mission=' + mission.id, function (result) {
                var portals = [];
                if (result.portal) {
                    for (var key in result.portal) {
                        var po = result.portal[key];
                        if (po[0]) {
                            portals.push({
                                hidden: true
                            });
                        } else {
                            portals.push({
                                hidden: false,
                                task: po[1],
                                name: po[2].name,
                                lat: po[2].latitude,
                                lng: po[2].longitude
                            });
                        }
                    }
                }
                callback(portals);
            });
        }
    }
}