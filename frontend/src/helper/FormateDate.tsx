function formatDate(date: Date) {
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let res = ""
    res += month[Number(date.getMonth())]
    res+= " "+date.getDate()
    res+= " "+date.getFullYear()
    return res
}
export default formatDate