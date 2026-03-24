module.exports = {
    GenID: function (data) {
        let ids = data.map(
            function (e) {
                return e.id
            }
        )
        return Math.max(...ids) + 1;
    },
    GetCateByID: function (id,dataCategories) {
        let result = dataCategories.filter(
            function (e) {
                return e.id == id
            }
        )
        return result[0]
    }
}