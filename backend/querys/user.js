const select = (userInfo) => {

    let sql = `
        select
        *
        from user
        where 1=1
    `;
    if(Object.keys(userInfo).includes('userId')){ sql += ` and id = '${userInfo.userId}'`; }
    if(Object.keys(userInfo).includes('userPassword')){ sql += ` and password = '${userInfo.userPassword}'`; }
    sql += `;`;
    return sql;
}

module.exports = { select };